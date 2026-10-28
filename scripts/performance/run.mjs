import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import { gzipSync } from 'node:zlib';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import lighthouse from 'lighthouse';
import desktopConfig from 'lighthouse/core/config/desktop-config.js';
import puppeteer from 'puppeteer';
import { previewFetch as fetch, authorizeBrowser } from '../preview-auth.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const options = Object.fromEntries(process.argv.slice(2).map(arg => {
  const match = /^--([\w-]+)=(.+)$/.exec(arg);
  if (!match) throw new Error(`Expected --name=value, got ${arg}`);
  return [match[1], match[2]];
}));
for (const key of Object.keys(options)) {
  if (!['base', 'output', 'mobile', 'desktop', 'route'].includes(key)) throw new Error(`Unknown option: ${key}`);
}
const base = (options.base || 'https://anandchowdhary.com').replace(/\/$/, '');
const output = path.resolve(options.output || path.join(here, '../../docs/performance', new Date().toISOString().replace(/[:.]/g, '-')));
const counts = { mobile: Number(options.mobile ?? 5), desktop: Number(options.desktop ?? 3) };
for (const count of Object.values(counts)) if (!Number.isInteger(count) || count < 0 || count > 20) throw new Error('Run counts must be integers from 0 to 20');
const routes = JSON.parse(await readFile(path.join(here, 'routes.json'), 'utf8')).filter(r => !options.route || r.id === options.route);
if (!routes.length || !Object.values(counts).some(Boolean)) throw new Error('No routes or runs selected');
await mkdir(path.dirname(output), { recursive: true });
await mkdir(output); // Refuse to overwrite a previous experiment.
await mkdir(path.join(output, 'raw'));
const manifest = {
  startedAt: new Date().toISOString(), base, counts, routes,
  sourceCommit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: here, encoding: 'utf8' }).trim(),
  node: process.version, platform: `${os.platform()} ${os.arch()} ${os.release()}`,
  toolchain: JSON.parse(await readFile(path.join(here, 'package.json'), 'utf8')).dependencies,
  methodology: 'Sequential Lighthouse navigations; fresh Chrome process/profile per run; cold browser storage; simulated default mobile/desktop throttling; production CDN cache uncontrolled.',
  location: 'Nebula sandbox; physical runner location unverified. See HTTP x-vercel-id for observed CDN routing.',
  http: [], fieldData: [], runs: [],
  previewAuthenticated: Boolean(process.env.VERCEL_PREVIEW_ORIGIN && process.env.VERCEL_AUTOMATION_BYPASS_SECRET && new URL(process.env.VERCEL_PREVIEW_ORIGIN).origin === base),
};
const save = () => writeFile(path.join(output, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
await save();
// Repeated GETs observe cache behavior; these are not controlled cold-CDN tests.
for (const route of routes) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    const started = performance.now();
    try {
      const res = await fetch(new URL(base + route.path), { signal: AbortSignal.timeout(30000) });
      const headersMs = performance.now() - started;
      const body = await res.arrayBuffer();
      manifest.http.push({ route: route.id, attempt, at: new Date().toISOString(), status: res.status, finalUrl: res.url, headersMs, totalMs: performance.now() - started, decodedBodyBytes: body.byteLength, headers: Object.fromEntries([...res.headers].filter(([key])=>key !== 'set-cookie')) });
      if (res.status !== 200) throw new Error(`${route.id} returned ${res.status}`);
    } catch (error) { manifest.http.push({ route: route.id, attempt, error: String(error) }); }
  }
}
// PSI exposes CrUX URL/origin data when available. Quota failures are saved, never treated as missing traffic.
for (const strategy of ['mobile', 'desktop']) {
  if (manifest.previewAuthenticated) {
    manifest.fieldData.push({ strategy, skipped: 'Protected preview: public field-data service cannot authenticate to this deployment' });
    continue;
  }
  try {
    const url = new URL('https://www.googleapis.com/pagespeedonline/v5/runPagespeed');
    url.searchParams.set('url', base);
    url.searchParams.set('strategy', strategy);
    const res = await fetch(url, { signal: AbortSignal.timeout(90000) });
    const body = await res.json();
    manifest.fieldData.push({ strategy, status: res.status, loadingExperience: body.loadingExperience, originLoadingExperience: body.originLoadingExperience, error: body.error });
  } catch (error) { manifest.fieldData.push({ strategy, error: String(error) }); }
}
await save();
let failed = false;
// Interleave routes across repetitions so a single route is not measured only in one time window.
for (let repetition = 1; repetition <= Math.max(...Object.values(counts)); repetition++) {
  for (const route of routes) {
    for (const [device, count] of Object.entries(counts)) {
      if (repetition > count) continue;
      const id = `${route.id}-${device}-${repetition}`;
      let browser;
      console.log(`${new Date().toISOString()} ${id}`);
      try {
        browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage', '--remote-debugging-port=0'] });
        const authenticated = await authorizeBrowser(browser, base);
        manifest.chrome = await browser.version();
        const result = await lighthouse(new URL(base + route.path).href, {
          port: Number(new URL(browser.wsEndpoint()).port), logLevel: 'error', output: 'json',
          onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
          maxWaitForLoad: 45000,
          disableStorageReset: authenticated,
        }, device === 'desktop' ? desktopConfig : undefined);
        const lhr = result.lhr;
        await writeFile(path.join(output, 'raw', `${id}.json.gz`), gzipSync(JSON.stringify(lhr)));
        const error = lhr.runtimeError || (typeof lhr.categories.performance?.score !== 'number' ? { message: 'No performance score produced' } : undefined) || (lhr.audits['http-status-code']?.score === 0 ? { message: 'HTTP status audit failed' } : undefined);
        manifest.runs.push({ id, route: route.id, device, repetition, fetchTime: lhr.fetchTime, lighthouseVersion: lhr.lighthouseVersion, finalDisplayedUrl: lhr.finalDisplayedUrl, report: `raw/${id}.json.gz`, warnings: lhr.runWarnings, error });
        if (error) { failed = true; console.error(id, error); }
        console.log(`${id}: performance=${lhr.categories.performance.score} LCP=${lhr.audits['largest-contentful-paint'].numericValue}`);
      } catch (error) {
        failed = true;
        manifest.runs.push({ id, route: route.id, device, repetition, error: String(error) });
        console.error(id, error);
      } finally {
        if (browser) await browser.close();
        await save();
      }
    }
  }
}
manifest.finishedAt = new Date().toISOString();
await save();
execFileSync(process.execPath, [path.join(here, 'summarize.mjs'), output], { stdio: 'inherit' });
if (failed) process.exitCode = 1;
