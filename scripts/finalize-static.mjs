import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
const outputDirectory = process.env.STATIC_OUTPUT_DIR || 'dist';
const imageCacheDirectory = process.env.STATIC_IMAGE_CACHE_DIR || '.cache/static-images';
sharp.concurrency(1); sharp.cache({ memory: 64 });
async function files(dir) {
 const result=[];
 for(const entry of await readdir(dir,{withFileTypes:true})) {
  const file=path.join(dir,entry.name); result.push(...(entry.isDirectory()?await files(file):[file]));
 }
 return result;
}
const refs=new Map();
for(const file of (await files(outputDirectory)).filter(f=>f.endsWith('.html'))) {
 const html=await readFile(file,'utf8');
 for(const match of html.matchAll(/\/_images\/([a-f0-9]{24})-(384|640|828|1080|1280|1920)-(\d+)\.webp/g)) {
  const [,hash,width,quality]=match; const variants=refs.get(hash)??new Map();
  variants.set(`${width}-${quality}`,{width:Number(width),quality:Number(quality)});refs.set(hash,variants);
 }
}
await mkdir(`${outputDirectory}/_images`,{recursive:true});await mkdir(imageCacheDirectory,{recursive:true});
const entries=[...refs];let bytes=0;
async function processImage([hash,variants]) {
 const {src}=JSON.parse(await readFile(`.astro/image-sources/${hash}.json`,'utf8'));
 let source;
 if(src==='/anand.jpg') source=await readFile('public/anand.jpg');
 else {
  const url=new URL(src);
  if(url.protocol!=='https:'||url.hostname!=='raw.githubusercontent.com'||!url.pathname.startsWith('/AnandChowdhary/'))throw Error(`Unapproved source: ${src}`);
  let error;
  for(let attempt=0;attempt<3;attempt++) {
   try {const response=await fetch(url,{signal:AbortSignal.timeout(30000)});if(!response.ok)throw Error(`Image ${response.status}: ${src}`);source=Buffer.from(await response.arrayBuffer());break;}catch(e){error=e;}
  }
  if(!source)throw error;
 }
 const contentHash=createHash('sha256').update(source).digest('hex');
 for(const [key,{width,quality}]of variants) {
  const cache=`${imageCacheDirectory}/${contentHash}-${key}.webp`;
  let output;
  try{output=await readFile(cache);}catch{output=await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality}).toBuffer();await writeFile(cache,output);}
  await writeFile(`${outputDirectory}/_images/${hash}-${key}.webp`,output);bytes+=output.length;
 }
}
// Bound image CPU and decoded-raster memory independently of host CPU reporting.
for(let i=0;i<entries.length;i+=2)await Promise.all(entries.slice(i,i+2).map(processImage));
await writeFile(`${outputDirectory}/.nojekyll`,'');
// GitHub Pages serves the extensionless HTML discovery endpoint as a directory.
// Astro's API output is a file; convert only that HTML endpoint to index.html.
try { const llms=await stat(`${outputDirectory}/llms`); if(llms.isFile()) {
 const body=await readFile(`${outputDirectory}/llms`);const {unlink}=await import('node:fs/promises');await unlink(`${outputDirectory}/llms`);await mkdir(`${outputDirectory}/llms`);await writeFile(`${outputDirectory}/llms/index.html`,body);
}}catch(error){if(error.code!=='ENOENT')throw error;}
const routes=JSON.parse(await readFile('.astro/static-routes.json','utf8'));
const base = (process.env.PAGES_BASE_PATH || '/').replace(/\/$/, '');
if (base) {
 const prefix = value => value.startsWith('/') && !value.startsWith('//') && value !== base && !value.startsWith(base+'/') ? base+value : value;
 for (const file of (await files(outputDirectory)).filter(f=>f.endsWith('.html'))) {
  let html=await readFile(file,'utf8');
  html=html.replace(/\b(src|href|poster|action)=(["'])(\/[^"']*)\2/g,(_,key,quote,value)=>`${key}=${quote}${prefix(value)}${quote}`);
  html=html.replace(/\b(srcset|imagesrcset)=(["'])([^"']*)\2/gi,(_,key,quote,value)=>`${key}=${quote}${value.split(',').map(part=>part.replace(/^(\s*)(\/\S+)/,(_,space,url)=>space+prefix(url))).join(',')}${quote}`);
  html=html.replace(/(content=["']\d+;\s*url=)(\/[^"']*)/gi,(_,start,url)=>start+prefix(url));
  await writeFile(file,html);
 }
}
const contentSnapshot = process.env.CONTENT_SNAPSHOT_DIR ? JSON.parse(await readFile(path.join(process.env.CONTENT_SNAPSHOT_DIR, 'manifest.json'), 'utf8')) : null;
await writeFile(`${outputDirectory}/build-info.json`,JSON.stringify({contentSnapshot: contentSnapshot ? { id: contentSnapshot.id, collectedAt: contentSnapshot.collectedAt, inputs: contentSnapshot.entries.length } : undefined,builtAt:new Date().toISOString(),commit:process.env.GITHUB_SHA??null,base:base||'/',routes:routes.length,optimizedSources:refs.size,imageBytes:bytes},null,2));
console.log(`Generated ${refs.size} responsive image sources (${bytes} bytes); ${routes.length} inventoried routes.`);
