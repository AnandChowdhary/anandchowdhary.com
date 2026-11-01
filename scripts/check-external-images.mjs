// Explicit network audit of selected inventory hosts; never runs during a build.
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const [inventoryFile, outputFile, hostList] = process.argv.slice(2);
if (!inventoryFile || !outputFile || !hostList) throw Error('Usage: node scripts/check-external-images.mjs INVENTORY OUTPUT HOSTS_COMMA_SEPARATED');
const hosts = new Set(hostList.split(','));
const inventory = JSON.parse(await readFile(inventoryFile, 'utf8'));
const selected = inventory.sources.filter(source => hosts.has(source.host));
if (!selected.length) throw Error('No inventory sources matched the selected hosts');
const bodyDirectory = outputFile.replace(/\.json$/, '') + '-bodies';
await mkdir(bodyDirectory, {recursive:true});
sharp.concurrency(1);
const results = new Array(selected.length);
let next = 0;
await Promise.all(Array.from({length:3}, async () => {
  while (next < selected.length) {
    const index = next++, source = selected[index], started = performance.now();
    try {
      const response = await fetch(source.url, {signal:AbortSignal.timeout(15000)});
      const result = {...source,status:response.status,finalUrl:response.url,type:response.headers.get('content-type')};
      if (!response.ok) {
        await response.body?.cancel();
        results[index] = {...result,decoded:false,durationMs:Math.round(performance.now()-started)};
        continue;
      }
      const reader = response.body.getReader(), chunks = [];
      let bytes = 0;
      while (true) {
        const {done,value} = await reader.read();
        if (done) break;
        bytes += value.length;
        if (bytes > 16*1024*1024) { await reader.cancel(); throw Error('Image exceeds 16 MiB audit limit'); }
        chunks.push(value);
      }
      const body = Buffer.concat(chunks);
      const image = sharp(body, {limitInputPixels:40_000_000});
      const metadata = await image.metadata();
      await image.resize({width:1,height:1}).raw().toBuffer();
      const bodyFile = path.join(bodyDirectory,String(index));
      await writeFile(bodyFile,body);
      results[index] = {...result,decoded:true,bytes,width:metadata.width,height:metadata.height,format:metadata.format,bodyFile,durationMs:Math.round(performance.now()-started)};
    } catch (error) {
      results[index] = {...source,decoded:false,error:String(error),durationMs:Math.round(performance.now()-started)};
    }
    console.log(`${results[index].decoded ? 'OK' : 'CHECK'} ${source.url}`);
  }
}));
await writeFile(outputFile,JSON.stringify({checkedAt:new Date().toISOString(),scope:[...hosts],selected:selected.length,results},null,2)+'\n');
console.log(`${results.filter(r=>r.decoded).length}/${results.length} selected sources fetched and decoded. Report: ${outputFile}`);
if (results.some(r=>!r.decoded)) process.exitCode=1;
