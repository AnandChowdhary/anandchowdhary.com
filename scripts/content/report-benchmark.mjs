import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
import path from 'node:path';
const source=process.argv[2], dir=process.argv[3];
await fs.mkdir(dir,{recursive:true});
const b=JSON.parse(await fs.readFile(path.join(source,'benchmark.json'),'utf8'));
const median=values=>values.sort((a,b)=>a-b)[Math.floor(values.length/2)];
let text=`# Complete build pipeline comparison\n\nBaseline: ${b.baselineCommit}. Candidate: ${b.candidateCommit}.\n\n${b.methodology}\n\nSnapshot ${b.snapshot.id}: ${b.snapshot.inputs} inputs; ${(b.snapshot.collectionMs/1000).toFixed(2)} seconds for one shared collection/validation pass.\n\n| Pipeline | Cold image cache s | Warm median s | Warm CPU median s | Peak process RSS median MiB | Output MiB | HTML gzip MiB | CSS gzip KiB | JS gzip KiB |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|\n`;
for(const variant of [...new Set(b.runs.map(run=>run.variant))]) {
 const cold=b.runs.find(run=>run.variant===variant&&run.imageCache==='cold');
 const warm=b.runs.filter(run=>run.variant===variant&&run.imageCache==='warm');
 for(const run of warm)assert.deepEqual(run.artifact,warm[0].artifact);
 const a=warm[0].artifact;
 text+=`| ${variant} | ${cold.elapsedSeconds.toFixed(2)} | ${median(warm.map(r=>r.elapsedSeconds)).toFixed(2)} | ${median(warm.map(r=>r.userSeconds+r.systemSeconds)).toFixed(2)} | ${(median(warm.map(r=>r.maxProcessRssKiB))/1024).toFixed(1)} | ${(a.totalBytes/1024**2).toFixed(2)} | ${(a.htmlGzipBytes/1024**2).toFixed(2)} | ${(a.cssGzipBytes/1024).toFixed(2)} | ${(a.jsGzipBytes/1024).toFixed(2)} |\n`;
}
const lock=JSON.parse(await fs.readFile('package-lock.json','utf8'));
text+=`\nAll builds share the installed, pinned toolchain to control dependency-version differences. The candidate lockfile has ${Object.keys(lock.packages).length-1} resolved package entries, including platform-specific optional packages. No package removal or installed-size reduction is claimed. The generator uses React, Vite and the shared project installation/TypeScript configuration; it bypasses Astro compilation/routing, not all frameworks.\n`;
await fs.writeFile(path.join(dir,'BENCHMARK.md'),text);
await fs.copyFile(path.join(source,'benchmark.json'),path.join(dir,'benchmark.json'));
