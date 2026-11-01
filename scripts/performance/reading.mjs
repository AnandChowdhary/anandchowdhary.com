import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';
const base = (process.argv[2] || 'http://localhost:4322').replace(/\/$/, '');
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
try {
  await page.emulateMediaFeatures([{name:'prefers-reduced-motion',value:'reduce'}]);
  await page.goto(base + '/blog/2026/future-ai-native-work', {waitUntil:'networkidle0'});
  assert.equal(await page.$eval('#article-reading-progress', p => p.hidden), false);
  assert.equal(await page.$eval('#article-reading-progress', p => p.value), 0);
  const links = await page.$$eval('nav[aria-label="On this page"] a', links => links.map(a => a.hash));
  assert.ok(links.length >= 3);
  assert.equal(await page.evaluate(links => links.every(hash => document.querySelectorAll(hash).length === 1), links), true);
  await page.$eval('[data-article-body]', el => window.scrollTo(0, el.getBoundingClientRect().bottom + scrollY - innerHeight));
  await new Promise(resolve => setTimeout(resolve, 150));
  assert.equal(await page.$eval('#article-reading-progress', p => p.value), 100);
  await page.setJavaScriptEnabled(false);
  await page.goto(base + '/blog/2026/future-ai-native-work', {waitUntil:'networkidle0'});
  assert.equal(await page.$eval('#article-reading-progress', p => p.hidden), true);
  await page.click('nav[aria-label="On this page"] summary');
  await page.click('nav[aria-label="On this page"] a');
  assert.ok(new URL(page.url()).hash.startsWith('#section-'));
  console.log('PASS static TOC/anchors without JavaScript; reduced-motion reading progress clamps at article end');
  await page.setJavaScriptEnabled(true);
  await page.goto(base + '/blog/2019/google-play-badges', {waitUntil:'networkidle0'});
  assert.equal(await page.$('#article-reading-progress'), null);
  const assets = JSON.parse(await readFile('src/lib/historical-images.json','utf8'));
  for (const route of new Set(assets.flatMap(a => a.articles))) {
    await page.goto(base + '/' + route.replace(/\/index\.html$/, ''), {waitUntil:'networkidle0'});
    const images = await page.$$eval('img[src*="/images/blog/archive/"]', async images => {
      await Promise.all(images.map(image => { image.loading = "eager"; return image.decode(); }));
      return images.length;
    });
    assert.ok(images > 0, route);
  }
  assert.deepEqual(errors, []);
  console.log('PASS short article omits reader tools; all preserved historical images decode on affected articles');
} finally { await browser.close(); }
