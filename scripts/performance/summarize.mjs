import { readFile, writeFile } from 'node:fs/promises';
import { gunzipSync } from 'node:zlib';
import path from 'node:path';

const output = path.resolve(process.argv[2]);
const manifest = JSON.parse(await readFile(path.join(output, 'manifest.json'), 'utf8'));
const samples = [];
for (const run of manifest.runs) {
  if (run.error || !run.report) continue;
  const lhr = JSON.parse(gunzipSync(await readFile(path.join(output, run.report))));
  const value = id => lhr.audits[id]?.numericValue ?? null;
  const resources = lhr.audits['resource-summary']?.details?.items || [];
  const resource = type => resources.find(r => r.resourceType === type)?.transferSize ?? null;
  const requests = lhr.audits['network-requests']?.details?.items || [];
  const lcpDetails = lhr.audits['lcp-breakdown-insight']?.details?.items || [];
  const lcpParts = lcpDetails.find(item => item.type === 'table')?.items || [];
  const opportunities = Object.values(lhr.audits).filter(a => a.score !== null && a.score < 1 && a.details)
    .map(a => ({ id: a.id, title: a.title, score: a.score, displayValue: a.displayValue, savingsMs: a.details?.overallSavingsMs, savingsBytes: a.details?.overallSavingsBytes }));
  samples.push({
    id: run.id, route: run.route, device: run.device,
    performance: lhr.categories.performance.score * 100,
    accessibility: lhr.categories.accessibility.score * 100,
    bestPractices: lhr.categories['best-practices'].score * 100,
    seo: lhr.categories.seo.score * 100,
    fcpMs: value('first-contentful-paint'), lcpMs: value('largest-contentful-paint'),
    tbtMs: value('total-blocking-time'), cls: value('cumulative-layout-shift'),
    speedIndexMs: value('speed-index'), serverResponseMs: value('server-response-time'),
    observedTtfbMs: lcpParts.find(item => item.subpart === 'timeToFirstByte')?.duration ?? null,
    imageRequests: requests.filter(r => r.resourceType === 'Image').length,
    preloadedImages: requests.filter(r => r.resourceType === 'Image' && r.isLinkPreload).length,
    rscRequests: requests.filter(r => r.url.includes('_rsc=')).length,
    lcpElement: lcpDetails.find(item => item.type === 'node'),
    jsExecutionMs: value('bootup-time'), mainThreadMs: value('mainthread-work-breakdown'),
    longTasks: lhr.audits['long-tasks']?.details?.debugData?.tasks?.length ?? lhr.audits['long-tasks']?.details?.items?.length ?? null,
    unusedJsBytes: lhr.audits['unused-javascript']?.details?.overallSavingsBytes ?? null,
    totalBytes: resource('total'), jsBytes: resource('script'), cssBytes: resource('stylesheet'),
    htmlBytes: resource('document'), imageBytes: resource('image'), fontBytes: resource('font'),
    opportunities,
    failedRequests: requests.filter(r => r.statusCode >= 400 || r.statusCode === 0).map(r => ({ url: r.url, statusCode: r.statusCode })),
    settings: lhr.configSettings,
  });
}
const stats = values => {
  const sorted = values.filter(v => typeof v === 'number' && Number.isFinite(v)).sort((a, b) => a - b);
  if (!sorted.length) return null;
  const mid = Math.floor(sorted.length / 2);
  return { median: sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2, min: sorted[0], max: sorted.at(-1), n: sorted.length };
};
const groups = [];
for (const route of manifest.routes) for (const device of ['mobile', 'desktop']) {
  const selected = samples.filter(s => s.route === route.id && s.device === device);
  if (!selected.length) continue;
  const metrics = Object.fromEntries(Object.keys(selected[0]).filter(k => typeof selected[0][k] === 'number' || selected[0][k] === null).map(k => [k, stats(selected.map(s => s[k]))]));
  groups.push({ route: route.id, path: route.path, device, metrics });
}
await writeFile(path.join(output, 'summary.json'), JSON.stringify({ groups, samples }, null, 2) + '\n');
const fmt = (stat, digits = 0, divisor = 1) => stat ? `${(stat.median / divisor).toFixed(digits)} (${(stat.min / divisor).toFixed(digits)}–${(stat.max / divisor).toFixed(digits)})` : 'n/a';
const local = ['localhost', '127.0.0.1'].includes(new URL(manifest.base).hostname);
let md = `# ${local ? 'Local performance diagnostic' : 'Production performance measurements'}\n\nStarted: ${manifest.startedAt}. Finished: ${manifest.finishedAt || 'in progress'}.\n\nBase: ${manifest.base}. Source checkout: ${manifest.sourceCommit}; this does not establish the deployed commit.\n\n${manifest.chrome || 'Chrome unknown'}; Lighthouse ${manifest.toolchain.lighthouse}; Node ${manifest.node}.\n\n${manifest.methodology}\n\n${manifest.location}\n\nAll cells show median (minimum–maximum). Bytes are transferred KiB; unused JS is Lighthouse estimated savings, not necessarily transferred bytes.\n\n| Route | Device | Valid runs | Performance | LCP seconds | TBT ms | CLS | JS KiB | Total KiB |\n|---|---|---:|---:|---:|---:|---:|---:|---:|\n`;
for (const g of groups) {
  const m = g.metrics;
  md += `| ${g.path} | ${g.device} | ${m.performance?.n || 0} | ${fmt(m.performance)} | ${fmt(m.lcpMs, 2, 1000)} | ${fmt(m.tbtMs)} | ${fmt(m.cls, 3)} | ${fmt(m.jsBytes, 1, 1024)} | ${fmt(m.totalBytes, 1, 1024)} |\n`;
}
md += '\n## Timing and JavaScript diagnostics\n\nTTFB is the observed LCP breakdown value; LCP/FCP/TBT use simulated throttling. Long-task timings also use Lighthouse simulation.\n\n| Route | Device | FCP s | Observed TTFB ms | JS execution ms | Main-thread ms | Long tasks | Unused JS KiB |\n|---|---|---:|---:|---:|---:|---:|---:|\n';
for (const g of groups) {
  const m = g.metrics;
  md += `| ${g.path} | ${g.device} | ${fmt(m.fcpMs, 2, 1000)} | ${fmt(m.observedTtfbMs)} | ${fmt(m.jsExecutionMs)} | ${fmt(m.mainThreadMs)} | ${fmt(m.longTasks)} | ${fmt(m.unusedJsBytes, 1, 1024)} |\n`;
}
md += '\n## Transferred resources\n\n| Route | Device | HTML KiB | CSS KiB | Images KiB | Fonts KiB | RSC requests | Preloaded images |\n|---|---|---:|---:|---:|---:|---:|---:|\n';
for (const g of groups) {
  const m = g.metrics;
  md += `| ${g.path} | ${g.device} | ${fmt(m.htmlBytes, 1, 1024)} | ${fmt(m.cssBytes, 1, 1024)} | ${fmt(m.imageBytes, 1, 1024)} | ${fmt(m.fontBytes, 1, 1024)} | ${fmt(m.rscRequests)} | ${fmt(m.preloadedImages)} |\n`;
}
md += '\n## Audit categories\n\n| Route | Device | Accessibility | Best practices | SEO |\n|---|---|---:|---:|---:|\n';
for (const g of groups) md += `| ${g.path} | ${g.device} | ${fmt(g.metrics.accessibility)} | ${fmt(g.metrics.bestPractices)} | ${fmt(g.metrics.seo)} |\n`;
md += '\n## Repeated HTTP GET observations\n\nHeaders latency includes network overhead. Age values and HIT/STALE headers do not prove end-to-end content freshness.\n\n| Route | Status | Vercel cache | Age seconds | Headers latency ms |\n|---|---|---|---:|---:|\n';
for (const route of manifest.routes) {
  const rows = manifest.http.filter(r => r.route === route.id && !r.error);
  const unique = key => [...new Set(rows.map(key).filter(v => v !== undefined && v !== null))].join(', ');
  const ages = rows.map(r => r.headers.age === undefined ? null : Number(r.headers.age));
  md += `| ${route.path} | ${unique(r => r.status)} | ${unique(r => r.headers['x-vercel-cache']) || 'n/a'} | ${fmt(stats(ages))} | ${fmt(stats(rows.map(r => r.headersMs)))} |\n`;
}
for (const row of manifest.http.filter(r => r.error)) md += `\nHTTP request failure: ${row.route} attempt ${row.attempt}: ${row.error}\n`;
md += '\n## Field data\n\n';
for (const field of manifest.fieldData) md += `- ${field.strategy}: ${field.status || 'request failed'}${field.error ? `; ${typeof field.error === 'string' ? field.error : field.error.message}` : '; see manifest for URL/origin data'}.\n`;
md += '\nA quota/API failure does not mean insufficient CrUX traffic. Lab TBT is not real-user INP. HTTP timings in manifest.json include this runner’s network overhead and are not field TTFB. Repeated GETs do not force a cold CDN cache.\n\n## Report integrity\n\n';
const errors = manifest.runs.filter(r => r.error);
md += `${samples.length} successful reports; ${errors.length} failed runs.\n`;
for (const e of errors) md += `- ${e.id}: ${JSON.stringify(e.error)}\n`;
const failures = samples.filter(s => s.failedRequests.length);
md += `${failures.length} reports contain failed network requests; inspect summary.json and raw reports before interpreting scores.\n\nFull audit details and settings are in raw/*.json.gz. summary.json contains all samples, aggregated metrics, failed requests, and audit findings. manifest.json contains provenance, warnings, repeated HTTP requests, and field-data responses.\n`;
await writeFile(path.join(output, 'REPORT.md'), md);
console.log(`Saved ${output}/REPORT.md`);
