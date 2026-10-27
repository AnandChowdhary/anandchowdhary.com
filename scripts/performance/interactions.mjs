import assert from 'node:assert/strict';
import puppeteer from 'puppeteer';
import { authorizeBrowser } from '../preview-auth.mjs';
const base=process.argv[2]||'http://localhost:4322';
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
await authorizeBrowser(browser, base);
const errors=[];
const page=await browser.newPage();page.on('pageerror',error=>errors.push(String(error)));
await page.setViewport({width:1280,height:1000});
const cdp = await page.createCDPSession();
const accessibleName = async selector => {
 const { root } = await cdp.send('DOM.getDocument');
 const { nodeId } = await cdp.send('DOM.querySelector', { nodeId: root.nodeId, selector });
 const { nodes } = await cdp.send('Accessibility.getPartialAXTree', { nodeId, fetchRelatives: false });
 return nodes.find(node => !node.ignored)?.name?.value;
};
try {
 const requests=[];page.on('request',r=>requests.push(r.url()));
 await page.goto(base+'/blog/2026/future-ai-native-work',{waitUntil:'networkidle0'});
 assert.match(await page.title(),/future of AI-native work/);
 assert.ok((await page.$eval('main',el=>el.textContent)).length>2000);
 assert.equal(requests.some(url=>url.includes('/_next/')||url.includes('_rsc=')),false);
 assert.equal(await page.$$eval('main > div.relative > img',images => images.length),1);
 assert.equal(await page.$eval('main > div.relative > img',image=>image.complete&&image.naturalWidth>0),true,'The native Vercel hero image must decode successfully');
 assert.equal(requests.filter(url=>url.includes('blog-images')).length,1);
 console.log('PASS article content, one hero image, no Next or RSC requests');
 await page.setJavaScriptEnabled(false);
 await page.reload({waitUntil:'networkidle0'});
 assert.ok((await page.$eval('main',el=>el.textContent)).length>2000);
 console.log('PASS article readable with JavaScript disabled');
 await page.setJavaScriptEnabled(true);
 await page.goto(base+'/?screenshot=true',{waitUntil:'networkidle0'});
 const coverSources=await page.$$eval('img',images=>images.map(image=>image.getAttribute('src')||'').filter(src=>src.includes('books.google.com/')));
 assert.ok(coverSources.length>0);
 assert.ok(coverSources.every(src=>src.startsWith('https://books.google.com/')));
 console.log('PASS Google Books covers use HTTPS');
 const padding=await page.$eval('.site-container',el=>{const s=getComputedStyle(el);return [s.paddingTop,s.paddingBottom];});
 assert.deepEqual(padding,['32px','80px']);
 // Each island must hydrate when approached, including below-fold counters.
 for (const kind of ['birthday', 'fitness']) {
  await page.$eval(`[data-counter="${kind}"]`,element=>element.scrollIntoView());
  await page.waitForFunction(kind=>!!document.querySelector(`[data-counter="${kind}"] number-flow-react`)?.shadowRoot,{},kind);
 }
 const birthdayBefore=await accessibleName('[data-counter="birthday"] number-flow-react');
 const fitnessBefore=await accessibleName('[data-counter="fitness"] number-flow-react');
 await new Promise(resolve=>setTimeout(resolve,9200));
 assert.notEqual(birthdayBefore, undefined);
 assert.notEqual(fitnessBefore, undefined);
 assert.notEqual(await accessibleName('[data-counter="birthday"] number-flow-react'),birthdayBefore);
 assert.notEqual(await accessibleName('[data-counter="fitness"] number-flow-react'),fitnessBefore);
 console.log('PASS screenshot spacing and both animated counters');
 await page.goto(base+'/blog/2019/state-of-the-podcasts-2019',{waitUntil:'networkidle0'});
 await page.evaluate(async()=>{
  for(let y=0;y<document.body.scrollHeight;y+=innerHeight){scrollTo(0,y);await new Promise(resolve=>setTimeout(resolve,80));}
  scrollTo(0,0);
 });
 await page.waitForNetworkIdle({idleTime:500});
 const legacyImages=await page.$$eval('main img[src^="/images/blog/"]',images=>images.map(image=>({src:image.getAttribute('src'),loaded:image.complete&&image.naturalWidth>0})));
 assert.equal(legacyImages.length,17);
 assert.deepEqual(legacyImages.filter(image=>!image.loaded),[],'Restored article images must load without request interception');
 console.log('PASS all 17 original podcast images load without fixtures');
 await page.waitForSelector('[data-lightbox-ready]',{timeout:15000});
 const image=await page.$('[data-lightbox-ready]');await image.scrollIntoView();await image.focus();await page.keyboard.press('Enter');
 await page.waitForSelector('#image-lightbox[open]',{visible:true});
 assert.equal(await page.evaluate(()=>document.body.style.overflow),'hidden');
 assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Close image preview');
 await page.keyboard.press('Tab');
 assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('aria-label')),'Close image preview');
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('#image-lightbox')?.hasAttribute('open'));
 assert.equal(await page.evaluate(()=>document.activeElement?.getAttribute('data-lightbox-ready')),'true');
 assert.notEqual(await page.evaluate(()=>document.body.style.overflow),'hidden');
 await image.click();
 await page.waitForSelector('#image-lightbox[open]',{visible:true});
 await page.click('#image-lightbox button');
 await page.waitForFunction(()=>!document.querySelector('#image-lightbox')?.hasAttribute('open'));
 console.log('PASS lightbox keyboard/pointer open, focus trap, Escape/button close, scroll restoration and focus return');
 assert.deepEqual(errors,[]);
 console.log('PASS no browser exceptions');
}finally{await browser.close();}
