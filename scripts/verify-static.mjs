import assert from 'node:assert/strict';
import { readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
const outputDirectory=process.env.STATIC_OUTPUT_DIR || 'dist';
const routes=JSON.parse(await readFile('.astro/static-routes.json','utf8'));
const lock=JSON.parse(await readFile('package-lock.json','utf8'));
assert.equal(Object.keys(lock.packages).some(p=>/(^|\/)node_modules\/(?:next(?:\/|$)|@next\/|@astrojs\/vercel(?:\/|$))/.test(p)),false);
assert.equal(Boolean(lock.packages[''].dependencies['@vercel/functions']),false);
async function exists(file){try{return(await stat(file)).isFile();}catch{return false;}}
for(const route of routes){const file=path.join(outputDirectory,route,'index.html');assert.ok(await exists(file),`Missing route: ${route}`);const html=await readFile(file,'utf8');assert.doesNotMatch(html,/(?:src|href)=["'][^"']*(?:\/_next\/|\/_vercel\/image)/,route);assert.doesNotMatch(html,/An error occurred while fetching/);assert.ok(!html.includes('<h1>Temporarily unavailable</h1>'),`Failed render published: ${route}`);}
for(const file of ['404.html','sitemap.xml','llms/index.html','llms.txt','.nojekyll','build-info.json'])assert.ok(await exists(`${outputDirectory}/${file}`),`Missing ${file}`);
const {base}=JSON.parse(await readFile(`${outputDirectory}/build-info.json`,'utf8'));
let bytes=0,files=0;
async function walk(dir) {
 for (const entry of await readdir(dir,{withFileTypes:true})) {
  const file=path.join(dir,entry.name);
  if(entry.isDirectory()){await walk(file);continue;}
  bytes+=(await stat(file)).size;files++;
  if(!file.endsWith('.html'))continue;
  const html=await readFile(file,'utf8');
  for(const match of html.matchAll(/\b(src|href|poster|imagesrcset|srcset)=["']([^"']*)["']/gi)) {
   const key=match[1].toLowerCase();
   const values=key.endsWith('srcset')?match[2].split(',').map(part=>part.trim().split(/\s+/)[0]):[match[2]];
   for(const value of values) {
    if(!value.startsWith('/')||value.startsWith('//'))continue;
    if(base!=='/')assert.ok(value.startsWith(base+'/'),`Unprefixed local URL ${value} in ${file}`);
    const pathname=decodeURI(new URL(value,'https://static.test').pathname);
    const relative=base==='/'?pathname:pathname.slice(base.length);
    if(key==='href'&&!/^\/(?:_astro|_images|assets|fonts|images)\//.test(relative))continue;
    assert.ok(await exists(path.join(outputDirectory,relative)),`Missing asset ${value} in ${file}`);
   }
  }
 }
}

await walk(outputDirectory);assert.ok(bytes<1024**3,'GitHub Pages site must stay below 1 GiB');
const legacy=JSON.parse(await readFile('docs/performance/legacy-assets.json','utf8'));
for(const asset of legacy.files){const body=await readFile(path.join(outputDirectory,asset.path));assert.equal(createHash('sha1').update(`blob ${body.length}\0`).update(body).digest('hex'),asset.gitBlobSha1,asset.path);}
console.log(`Verified ${routes.length} routes, discovery/404 files and local assets; ${files} files, ${(bytes/1024**2).toFixed(1)} MiB; no Next/Vercel runtime dependencies.`);
