import { spawn } from 'node:child_process';
import path from 'node:path';
for (const args of [['node_modules/astro/bin/astro.mjs','build'],['scripts/finalize-static.mjs']]) {
  await new Promise((resolve,reject)=>{
    const child=spawn(process.execPath,['--import',path.resolve(process.env.SNAPSHOT_HOOK),...args],{stdio:'inherit',env:process.env});
    child.on('error',reject);child.on('exit',code=>code===0?resolve():reject(Error(`Baseline failed: ${code}`)));
  });
}
