import puppeteer from 'puppeteer';
import { authorizeBrowser } from '../preview-auth.mjs';
import sharp from 'sharp';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const here=path.dirname(fileURLToPath(import.meta.url));
const args=Object.fromEntries(process.argv.slice(2).map(arg=>{
 const match=/^--([\w-]+)=(.+)$/.exec(arg);if(!match)throw new Error(`Expected --name=value: ${arg}`);return [match[1],match[2]];
}));
const base=args.base||'http://localhost:4322';
const reference=args.reference||'https://anandchowdhary.com';
const output=path.resolve(args.output||'/tmp/astro-visual-comparison');
await mkdir(path.join(output,'raw'),{recursive:true});
const routes=JSON.parse(await readFile(path.resolve(here,args['route-file']||'routes.json'),'utf8')).filter(r=>!args.route||r.id===args.route);
const browser=await puppeteer.launch({headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
await authorizeBrowser(browser);
const results=[];
const manifest={startedAt:new Date().toISOString(),base,reference,browser:await browser.version(),scope:args['full-page']==='true'?'full page':'first viewport',pixelThreshold:20,results};
const save=()=>writeFile(path.join(output,'visual.json'),JSON.stringify(manifest,null,2)+'\n');
try {
 for(const route of routes)for(const device of (args.devices||'desktop,mobile').split(','))for(const theme of (args.themes||'light,dark').split(','))for(const mode of (args.modes||'normal,screenshot').split(',')){
  const id=`${route.id}-${device}-${theme}-${mode}`;
  const captures=[];
  console.log(id);
  for(const [name,origin]of[['reference',reference],['candidate',base]]){
   const page=await browser.newPage();
   try {
    await page.setViewport(device==='mobile'?{width:390,height:844,deviceScaleFactor:1}:{width:1280,height:1000,deviceScaleFactor:1});
    await page.emulateMediaFeatures([{name:'prefers-color-scheme',value:theme},{name:'prefers-reduced-motion',value:'reduce'}]);
    const errors=[];page.on('pageerror',error=>errors.push(String(error)));
    const requests=[];page.on('request',request=>requests.push(request.url()));
    const response=await page.goto(origin+route.path+(mode==='screenshot'?'?screenshot=true':''),{waitUntil:'networkidle0',timeout:60000});
    await page.evaluate(()=>document.fonts.ready);
    if (args['full-page']==='true') {
      await page.evaluate(async () => {
        for (let y=0; y<document.body.scrollHeight; y+=innerHeight) {
          scrollTo(0,y); await new Promise(resolve=>setTimeout(resolve,80));
        }
        scrollTo(0,0);
      });
      await page.waitForNetworkIdle({idleTime:500,timeout:20000}).catch(()=>{});
    }
    const data=await page.evaluate(()=>{
     const box=selector=>document.querySelector(selector)?.getBoundingClientRect().toJSON()||null;
     const meta={};document.querySelectorAll('meta[name],meta[property]').forEach(el=>{
      const key=el.getAttribute('name')||el.getAttribute('property');if(key==='next-size-adjust')return;
      (meta[key]||=[]).push(el.getAttribute('content'));
     });
     return {title:document.title,meta,header:box('header'),main:box('main'),footer:box('footer'),bodyHeight:document.body.scrollHeight,scripts:[...document.scripts].map(s=>s.src).filter(Boolean)};
    });
    const file=`raw/${id}-${name}.png`;
    await page.screenshot({path:path.join(output,file),fullPage:args['full-page']==='true'});
    captures.push({name,status:response.status(),errors,requests,file,...data});
   }finally{await page.close();}
  }
  const a=await sharp(path.join(output,captures[0].file)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  const b=await sharp(path.join(output,captures[1].file)).ensureAlpha().raw().toBuffer({resolveWithObject:true});
  let changed=0;
  const dimensionsMatch=a.info.width===b.info.width&&a.info.height===b.info.height;
  if(dimensionsMatch){
   const diff=Buffer.alloc(a.data.length);
   for(let i=0;i<a.data.length;i+=4){
    const different=Math.max(Math.abs(a.data[i]-b.data[i]),Math.abs(a.data[i+1]-b.data[i+1]),Math.abs(a.data[i+2]-b.data[i+2]))>20;
    if(different)changed++;
    diff[i]=different?255:a.data[i];diff[i+1]=different?0:a.data[i+1];diff[i+2]=different?100:a.data[i+2];diff[i+3]=255;
   }
   await sharp(diff,{raw:{width:a.info.width,height:a.info.height,channels:4}}).png().toFile(path.join(output,`raw/${id}-diff.png`));
  }
  results.push({id,route:route.path,device,theme,mode,dimensionsMatch,differentPixelPercent:dimensionsMatch?100*changed/(a.info.width*a.info.height):null,captures});
  await save();
 }
 manifest.finishedAt=new Date().toISOString();await save();
 let md=`# Visual comparison\n\n${manifest.startedAt} to ${manifest.finishedAt}. ${manifest.scope}; ${manifest.browser}.\n\nReference: ${reference}. Candidate: ${base}.\n\nPixels differ when any RGB channel changes by more than 20. Live content/counters, image delivery, antialiasing and timestamps can affect results; inspect diff images and geometry before claiming parity. This report does not cover unlisted routes or content below the viewport unless full-page mode was used.\n\n| Route | Device | Theme | Mode | Different pixels |\n|---|---|---|---|---:|\n`;
 for(const r of results)md+=`| ${r.route} | ${r.device} | ${r.theme} | ${r.mode} | ${r.differentPixelPercent===null?'Dimensions differ':r.differentPixelPercent.toFixed(4)+'%'} |\n`;
 md+='\nRaw screenshots and highlighted diffs are saved locally in raw/. visual.json includes metadata, geometry, browser errors, requests and script URLs for each capture.\n';
 await writeFile(path.join(output,'VISUAL.md'),md);
 console.log(`Saved ${output}/VISUAL.md`);
}finally{await browser.close();}
