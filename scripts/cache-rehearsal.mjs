import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { previewFetch, previewHeaders } from './preview-auth.mjs';

const base = new URL(process.argv[2]).origin;
assert.equal(base, new URL(process.env.VERCEL_PREVIEW_ORIGIN).origin);
const output = process.argv[3];
const report = { base, startedAt: new Date().toISOString(), note: 'Real Vercel Runtime Cache and real route/ISR; source TTL clock is advanced logically, not by waiting an hour.', samples: [] };
const runs = [randomUUID(), randomUUID()];
const save = async () => { if(output){await mkdir(path.dirname(output),{recursive:true});await writeFile(output,JSON.stringify(report,null,2)+'\n');} };
const control = async (run, state) => {
  const url = `${base}/__migration/cache?run=${run}`;
  const response = await fetch(url, { method: state ? 'POST' : 'DELETE', redirect: 'manual', headers: previewHeaders(url, { 'Content-Type': 'application/json' }), body: state && JSON.stringify(state), signal: AbortSignal.timeout(30000) });
  assert.equal(response.status, state ? 200 : 204, 'Rehearsal control endpoint');
  if(state){const result=await response.json();assert.notEqual(result.backend,'memory','Must exercise Vercel storage, not SDK in-memory fallback');assert.deepEqual(result.state,state);report.backend=result.backend;}
};
const read = async (run, stage, expected) => {
  const at = new Date().toISOString();
  const response = await previewFetch(`${base}/blog/2026/migration-rehearsal-${run}-${stage}`, { signal: AbortSignal.timeout(30000) });
  const body = await response.text();
  const sample = { at, run, stage, status: response.status, cache: response.headers.get('x-vercel-cache'), age: response.headers.get('age'), origins: JSON.parse(response.headers.get('x-migration-origin-statuses') || '[]') };
  report.samples.push(sample);await save();
  if(expected!==undefined)assert.equal(response.status,expected,stage);
  return { body, sample };
};
try {
  const run=runs[0];
  await control(run,{published:false,failFeed:false,clockMs:0});
  await read(run,'absent',404);
  await control(run,{published:true,failFeed:false,clockMs:0});
  const before=await read(run,'before',404);
  assert.deepEqual(before.sample.origins,[],'Empty source feed must remain cached on a different unseen URL before TTL expiry');
  await control(run,{published:true,failFeed:false,clockMs:3601000});
  const after=await read(run,'after',200);
  assert.ok(after.body.includes(`Published after deployment: ${run}`));
  assert.ok(after.sample.origins.some(item=>item.source==='feed'&&item.status===200));
  await control(run,{published:true,failFeed:false,clockMs:7202000});
  const conditional=await read(run,'revalidated',200);
  assert.ok(conditional.sample.origins.some(item=>item.source==='feed'&&item.status===304));
  await control(run,{published:true,failFeed:true,clockMs:10803000});
  const stale=await read(run,'stale',200);
  assert.equal(stale.sample.origins.filter(item=>item.status===503).length,2);
  const revision=93602001;
  await control(run,{published:true,failFeed:true,clockMs:revision});
  await read(run,'expired',503);
  await control(runs[1],{published:true,failFeed:true,clockMs:0});
  await read(runs[1],'absent',503);
  await control(runs[1],{published:true,failFeed:false,clockMs:0});
  await read(runs[1],'after',200);
  await control(run,{published:true,failFeed:false,clockMs:revision});
  const cached=await read(run,'after',200);
  assert.ok(cached.body.includes('Revision: 3601000.'),'HTML must still contain the cached revision before ISR expiry');
  assert.equal(cached.sample.cache,'HIT','Real HTML ISR cache must be active');
  console.log('PASS Runtime Cache persistence, unseen content after source TTL, conditional 304, stale recovery, bounded stale expiry, and cold error/recovery');
  console.log('Waiting for the real 60-second ISR expiration...');
  await new Promise(resolve=>setTimeout(resolve,Math.max(0,62000-(Date.now()-Date.parse(after.sample.at)))));
  let refreshed=false;
  for(let attempt=0;attempt<15;attempt++){
    const result=await read(run,'after',200);
    if(result.body.includes(`Revision: ${revision}.`)){refreshed=true;break;}
    await new Promise(resolve=>setTimeout(resolve,1000));
  }
  assert.ok(refreshed,'Source revision must appear after an actual ISR expiration without a rebuild');
  report.passed=true;console.log('PASS source revision appears after real ISR expiration without rebuilding');
} catch(error) {
  report.passed=false;report.error=String(error);throw error;
} finally {
  report.finishedAt=new Date().toISOString();
  await Promise.all(runs.map(run=>control(run).catch(error=>{report.cleanupError=String(error);})));await save();
}
