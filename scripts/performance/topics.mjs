import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const base = (process.argv[2] || 'http://localhost:4322').replace(/\/$/, '');
const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox','--disable-dev-shm-usage'] });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', error => errors.push(String(error)));
try {
  await page.goto(base + '/blog', { waitUntil: 'networkidle0' });
  const topics = await page.$$eval('nav[aria-label="Blog topics"] a', links => links.map(link => link.href));
  assert.equal(topics.length, 8);
  assert.ok(topics.every(url => url.startsWith(base + '/blog/topics')));
  assert.equal(await page.$$eval('main img', images => images.every(image => image.getAttribute('src').includes('/_images/'))), true);
  for (const route of ['/blog','/events','/themes','/open-source']) {
    await page.goto(base + route, { waitUntil: 'networkidle0' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += innerHeight) { scrollTo(0,y); await new Promise(resolve => setTimeout(resolve, 40)); }
    });
    await page.waitForNetworkIdle({ idleTime: 500 });
    assert.equal(await page.$$eval('main img[src*="/_images/"]', images => images.length > 0 && images.every(image => image.complete && image.naturalWidth > 0)), true, route);
    assert.equal(await page.$$eval('main img', images => images.some(image => image.getAttribute('src')?.includes('blog-images/'))), false);
  }
  console.log('PASS topic navigation and decoded local thumbnails on blog/events/themes/open-source');
  await page.goto(base + '/open-source/2026/gpu-utils', {waitUntil:'networkidle0'});
  assert.equal(await page.$eval('main > div.relative > img', image => image.getAttribute('src').includes('/_images/') && image.complete && image.naturalWidth > 0), true);
  console.log('PASS previously missing open-source illustration is a decoded local hero');
  await page.setJavaScriptEnabled(false);
  await page.goto(base + '/blog/topics', { waitUntil: 'networkidle0' });
  assert.equal(await page.$$eval('main > section', sections => sections.length), 7);
  await page.goto(base + '/blog/topics/ai', { waitUntil: 'networkidle0' });
  assert.equal(await page.$$eval('main ol > li', items => items.length), 5);
  assert.equal(await page.$eval('h1', element => element.textContent), 'AI and agents');
  assert.equal(await page.$eval('meta[property="og:title"]', element => element.content), await page.title());
  assert.equal(await page.$eval('meta[property="og:url"]', element => element.content), 'https://anandchowdhary.com/blog/topics/ai');
  assert.equal(await page.$$eval('script[type="module"]', scripts => scripts.length), 0);
  const article = base + '/blog/2026/future-ai-native-work';
  await page.goto(article, { waitUntil: 'networkidle0' });
  assert.ok(await page.$('nav[aria-label="Article topics"] a'));
  const related = await page.$$eval('section[data-search-exclude] a', links => links.map(link => link.href));
  assert.equal(related.length, 3);
  assert.equal(new Set(related).size, related.length);
  assert.ok(related.every(url => url.startsWith(base + '/blog/') && url !== article));
  assert.ok(related.some(url => url.endsWith('/running-claude-code-in-a-loop')));
  console.log('PASS topics and curated related reading without JavaScript; no topic client modules');
  await page.setJavaScriptEnabled(true);
  for (const [width,height,theme] of [[390,844,'light'],[1280,1000,'dark']]) {
    await page.setViewport({width,height});
    await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:theme}]);
    await page.goto(base + '/blog/topics/ai', {waitUntil:'networkidle0'});
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
  }
  const missing = await page.goto(base + '/blog/topics/does-not-exist', { waitUntil: 'networkidle0' });
  assert.equal(missing.status(), 404);
  assert.deepEqual(errors, []);
  console.log('PASS mobile light/desktop dark layout, unknown topic 404 and no browser exceptions');
} finally { await browser.close(); }
