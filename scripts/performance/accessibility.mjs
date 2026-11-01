import assert from 'node:assert/strict';
import { appendFile, writeFile } from 'node:fs/promises';
import puppeteer from 'puppeteer';
import axe from 'axe-core';
const base = (process.argv[2] || 'http://localhost:4322').replace(/\/$/, '');
const output = process.argv[3] || '/tmp/site-accessibility.json';
const routes = ['/', '/blog', '/blog/topics', '/blog/topics/ai', '/blog/2026/future-ai-native-work', '/blog/2019/state-of-the-podcasts-2019', '/projects', '/books', '/notes', '/events', '/open-source', '/press', '/themes', '/versions', '/videos', '/archive', '/about', '/now', '/mentoring', '/life/food', '/life', '/location', '/contact', '/search?q=agents', '/404.html'];
const browser = await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
const results = [];
try {
  for (const mode of [{name:'desktop-light',width:1280,height:900,theme:'light'},{name:'mobile-dark',width:390,height:844,theme:'dark'}]) {
    const page = await browser.newPage();
    await page.setViewport({width:mode.width,height:mode.height});
    await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:mode.theme},{name:'prefers-reduced-motion',value:'reduce'}]);
    for (const route of routes) {
      try {
        const response = await page.goto(base+route,{waitUntil:'networkidle0'});
        assert.ok((route === '/404.html' ? [200,404] : [200]).includes(response.status()), `${route}: HTTP ${response.status()}`);
        await page.addScriptTag({content:axe.source});
        const audit = await page.evaluate(async () => {
          const result = await axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa','best-practice']}});
          return {violations:result.violations,incomplete:result.incomplete,passes:result.passes.length};
        });
        await page.keyboard.press('Tab');
        const skipVisible = await page.evaluate(() => document.activeElement?.classList.contains('skip-link') && document.activeElement.getBoundingClientRect().top >= 0);
        await page.keyboard.press('Enter');
        const skipWorks = await page.evaluate(() => document.activeElement?.id === 'main-content');
        const structure = await page.evaluate(() => ({main:document.querySelectorAll('main').length,h1:document.querySelectorAll('h1').length,overflow:document.documentElement.scrollWidth>innerWidth}));
        results.push({route,mode:mode.name,skipVisible,skipWorks,...structure,...audit});
        console.log(`${mode.name} ${route}: ${audit.violations.map(v => v.id+'('+v.nodes.length+')').join(', ') || 'PASS'}; main=${structure.main}, h1=${structure.h1}, overflow=${structure.overflow}, skip=${skipVisible && skipWorks}`);
      } catch (error) {
        results.push({route,mode:mode.name,error:String(error)});
        console.error(`${mode.name} ${route}: ${error}`);
      }
    }
    await page.close();
  }
} finally { await browser.close(); }
const failed = results.filter(r=>r.error||!r.skipVisible||!r.skipWorks||r.violations.length||r.main!==1||r.h1!==1||r.overflow);
await writeFile(output,JSON.stringify({base,axeVersion:axe.version,checkedAt:new Date().toISOString(),passed:failed.length===0,results},null,2)+'\n');
if (process.env.GITHUB_STEP_SUMMARY) await appendFile(process.env.GITHUB_STEP_SUMMARY, `## Accessibility audit\n\n${results.length-failed.length}/${results.length} route/theme checks passed. Axe ${axe.version}; WCAG 2 A/AA, 2.1 A/AA and best practices, main/heading structure, overflow and keyboard skip link. Automated checks do not establish full WCAG conformance; inspect incomplete rules in the retained JSON.\n`);
if(failed.length) process.exitCode=1;
