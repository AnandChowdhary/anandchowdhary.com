// Capture PR before/after screenshots.
// Usage: node scripts/performance/screenshot.mjs <base-url> <out-dir> <label> /path [/path ...]
// Writes <out-dir>/<slug>-<label>-<desktop|mobile>.png for each path.
import puppeteer from 'puppeteer';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [base, outDir, label, ...paths] = process.argv.slice(2);
if (!base || !outDir || !label || !paths.length) {
  console.error('Usage: screenshot.mjs <base-url> <out-dir> <label> /path [/path ...]');
  process.exit(1);
}
const viewports = {
  desktop: { width: 1280, height: 900, deviceScaleFactor: 1 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 2 },
};
await mkdir(outDir, { recursive: true });
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-dev-shm-usage'] });
try {
  for (const route of paths) {
    const slug = route.replace(/^\/|\/$/g, '').replace(/[^\w-]+/g, '-') || 'home';
    for (const [device, viewport] of Object.entries(viewports)) {
      const page = await browser.newPage();
      await page.setViewport(viewport);
      await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
      await page.goto(base.replace(/\/$/, '') + route, { waitUntil: 'networkidle0', timeout: 60000 });
      const file = path.join(outDir, `${slug}-${label}-${device}.png`);
      await page.screenshot({ path: file, fullPage: false });
      console.log(file);
      await page.close();
    }
  }
} finally {
  await browser.close();
}
