import { spawn, execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir, readdir, stat, lstat, rename, symlink } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
const root=process.cwd();
const baseline=path.resolve(process.argv[2]);
const output=path.resolve(process.argv[3]);
await mkdir(output); // Refuse to overwrite an experiment.
const snapshot=JSON.parse(await readFile('.cache/content-snapshot.json','utf8'));
const manifest=JSON.parse(await readFile(path.join(snapshot.directory,'manifest.json'),'utf8'));
const variants=[{name:'astro-react',cwd:baseline,args:[path.resolve('scripts/content/benchmark-baseline.mjs')],dist:path.join(baseline,'dist')},{name:'astro-native-blog',cwd:root,args:['scripts/build.mjs','render'],dist:path.resolve('dist')},{name:'custom-generator',cwd:root,args:['scripts/build.mjs','generator'],dist:path.resolve('.cache/full-generator')}];
const baselineCache=path.join(baseline,'.cache/static-images');
await mkdir(path.dirname(baselineCache),{recursive:true});
try{await lstat(baselineCache);await rename(baselineCache,baselineCache+'-before-'+Date.now());}catch(error){if(error.code!=='ENOENT')throw error;}
await mkdir(path.join(output,'image-caches','astro-react'),{recursive:true});
await symlink(path.join(output,'image-caches','astro-react'),baselineCache);
const runs=[];
const result={startedAt:new Date().toISOString(),baselineCommit:execFileSync('git',['rev-parse','HEAD'],{cwd:baseline,encoding:'utf8'}).trim(),candidateCommit:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),node:process.version,snapshot:{id:manifest.id,collectedAt:manifest.collectedAt,inputs:manifest.entries.length,collectionMs:snapshot.collectionMs},methodology:'Sequential complete artifact builds on one sandbox, fixed inputs and clock, all TCP disabled. One cold image-cache run and three warm image-cache runs per variant, interleaved in fixed order. OS/filesystem caches uncontrolled. Linux RUSAGE_CHILDREN RSS is maximum single-process RSS, not aggregate process-tree memory. Collection is shared, measured once, and not included in render timings.',runs};
async function artifactStats(directory){
 const metrics={files:0,totalBytes:0,htmlBytes:0,htmlGzipBytes:0,cssBytes:0,cssGzipBytes:0,jsBytes:0,jsGzipBytes:0,imageBytes:0};
 async function walk(dir){for(const file of await readdir(dir,{withFileTypes:true})){
  const name=path.join(dir,file.name);if(file.isDirectory()){await walk(name);continue;}
  const bytes=(await stat(name)).size;metrics.files++;metrics.totalBytes+=bytes;
  const type=name.endsWith('.html')?'html':name.endsWith('.css')?'css':name.endsWith('.js')?'js':null;
  if(type){metrics[type+'Bytes']+=bytes;metrics[type+'GzipBytes']+=gzipSync(await readFile(name)).length;}
  if(name.includes('/_images/'))metrics.imageBytes+=bytes;
 }}await walk(directory);return metrics;
}
for(let repetition=0;repetition<4;repetition++)for(const variant of variants){
 const id=`${variant.name}-${repetition===0?'cold':'warm-'+repetition}`;
 const timeFile=path.join(output,id+'-time.json');const logFile=path.join(output,id+'.log');
 const {openSync,closeSync}=await import('node:fs');const fd=openSync(logFile,'w');
 const env={...process.env,CONTENT_SNAPSHOT_DIR:snapshot.directory,CONTENT_SNAPSHOT_MODE:'replay',SNAPSHOT_HOOK:path.resolve('scripts/content/hook.mjs'),SITE_STATIC_BUILD:'1',TZ:'UTC',NODE_ENV:'production',ASTRO_TELEMETRY_DISABLED:'1',STATIC_IMAGE_CACHE_DIR:path.join(output,'image-caches',variant.name),GITHUB_SHA:variant.name==='astro-react'?result.baselineCommit:result.candidateCommit};
 const code=await new Promise((resolve,reject)=>{const child=spawn('python3',[path.resolve('scripts/content/time-build.py'),timeFile,process.execPath,...variant.args],{cwd:variant.cwd,env,stdio:['ignore',fd,fd]});child.on('error',reject);child.on('exit',resolve);});closeSync(fd);
 if(code!==0)throw Error(`Benchmark failed ${id}; see ${logFile}`);
 const timing=JSON.parse(await readFile(timeFile,'utf8'));
 runs.push({id,variant:variant.name,imageCache:repetition===0?'cold':'warm',...timing,artifact:await artifactStats(variant.dist)});
 await writeFile(path.join(output,'benchmark.json'),JSON.stringify(result,null,2)+'\n');
 console.log(id,JSON.stringify(timing));
}
result.finishedAt=new Date().toISOString();await writeFile(path.join(output,'benchmark.json'),JSON.stringify(result,null,2)+'\n');
