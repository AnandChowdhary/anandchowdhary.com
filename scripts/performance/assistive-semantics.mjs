// Browser accessibility-tree checks, not a spoken screen-reader session.
import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
const base=(process.argv[2]||'http://localhost:4322').replace(/\/$/,'');
const browser=await puppeteer.launch({args:['--no-sandbox','--disable-dev-shm-usage']});
try {
 const page=await browser.newPage();
 const session=await page.createCDPSession();
 async function tree(){return (await session.send('Accessibility.getFullAXTree')).nodes.filter(n=>!n.ignored)}
 await page.goto(base+'/search?q=agents',{waitUntil:'networkidle0'});
 let nodes=await tree();
 assert.ok(nodes.some(n=>n.role?.value==='searchbox'&&n.name?.value==='Search articles and projects'));
 assert.ok(nodes.some(n=>n.role?.value==='list'&&n.name?.value==='Search results'));
 const status=await page.$eval('#search-status',e=>({role:e.getAttribute('role'),atomic:e.getAttribute('aria-atomic'),text:e.textContent}));
 assert.equal(status.role,'status');assert.equal(status.atomic,'true');assert.match(status.text,/result/);
 await page.focus('#search-query');await page.keyboard.press('ArrowDown');
 assert.ok(await page.evaluate(()=>document.activeElement.closest('#search-results')));
 await page.focus('#search-query');await page.keyboard.press('Escape');
 await page.waitForFunction(()=>document.querySelector('#search-status').textContent==='Enter a few words to search.');
 await page.goto(base+'/life',{waitUntil:'networkidle0'});nodes=await tree();
 assert.ok(nodes.some(n=>n.role?.value==='image'&&/GitHub contributions in the last year/.test(n.name?.value||'')&&/daily activity/.test(n.name.value)));
 console.log('PASS browser accessibility tree: named search, results, atomic status, keyboard results/reset, and chart summary. Spoken output not tested.');
} finally {await browser.close()}
