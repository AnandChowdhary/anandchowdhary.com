import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, readFile, mkdir, rm, unlink } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { validateRecoverySource, publicationFreshness, RECOVERY_WINDOW_MS } from '../scripts/recovery-policy.mjs';
const sha = 'a'.repeat(40);
test('recovery accepts only completed successful main production artifacts from this repository', () => {
  const run = {id:1,status:'completed',conclusion:'success',path:'.github/workflows/pages.yml',head_branch:'main',head_sha:sha,event:'push',repository:{full_name:'owner/site'},head_repository:{full_name:'owner/site'}};
  const artifact = {id:2,name:'github-pages',expired:false,workflow_run:{id:1,head_sha:sha}};
  assert.equal(validateRecoverySource(run,artifact,'owner/site').commit,sha);
  for (const override of [{conclusion:'failure'},{status:'in_progress'},{head_branch:'feature'},{path:'.github/workflows/other.yml'},{event:'pull_request'},{head_repository:{full_name:'fork/site'}}]) assert.throws(() => validateRecoverySource({...run,...override},artifact,'owner/site'));
  assert.throws(() => validateRecoverySource(run,{...artifact,expired:true},'owner/site'));
  assert.throws(() => validateRecoverySource(run,{...artifact,workflow_run:{id:3,head_sha:sha}},'owner/site'));
});
test('recovery freshness preserves old build time and expires after six hours with matching provenance', () => {
  const now=Date.parse('2026-11-01T12:00:00Z');
  const info={commit:sha,builtAt:'2026-10-29T00:00:00Z',contentSnapshot:{id:'snapshot'}};
  const marker={version:1,sourceCommit:sha,sourceRunId:'1',sourceSnapshot:'snapshot',recoveredAt:new Date(now).toISOString(),expiresAt:new Date(now+RECOVERY_WINDOW_MS).toISOString()};
  assert.equal(publicationFreshness(info,null,now).ok,false);
  assert.equal(publicationFreshness(info,marker,now).ok,true);
  assert.equal(publicationFreshness(info,marker,now+RECOVERY_WINDOW_MS).ok,false);
  assert.equal(publicationFreshness(info,{...marker,sourceCommit:'b'.repeat(40)},now).ok,false);
  assert.equal(publicationFreshness(info,{...marker,expiresAt:new Date(now+RECOVERY_WINDOW_MS*2).toISOString()},now).ok,false);
  assert.equal(publicationFreshness({...info,builtAt:new Date(now+3600000).toISOString()},marker,now).ok,false);
  assert.equal(info.builtAt,'2026-10-29T00:00:00Z');
});
test('recovery archive extraction rejects traversal and link entries', async () => {
  const dir=await mkdtemp(path.join(os.tmpdir(),'recovery-tar-'));
  try {
    const script=`import importlib.util,io,tarfile,pathlib
spec=importlib.util.spec_from_file_location('extractor','scripts/extract-recovery.py')
m=importlib.util.module_from_spec(spec);spec.loader.exec_module(m)
root=pathlib.Path(${JSON.stringify(dir)})
for index,name in enumerate(['index.html','../escape','/absolute','link']):
 archive=root/(str(index)+'.tar')
 with tarfile.open(archive,'w') as out:
  item=tarfile.TarInfo(name)
  if name=='link': item.type=tarfile.SYMTYPE;item.linkname='/etc/passwd';out.addfile(item)
  else: item.size=2;out.addfile(item,io.BytesIO(b'ok'))
 try: m.extract(archive,root/('out'+str(index)))
 except ValueError:
  assert index!=0
 else:
  assert index==0
assert (root/'out0/index.html').read_text()=='ok'
`;
    const child=spawnSync('python3',['-c',script],{encoding:'utf8',env:{...process.env,PYTHONDONTWRITEBYTECODE:'1'}});
    assert.equal(child.status,0,child.stderr);
  } finally {await rm(dir,{recursive:true,force:true});}
});
test('artifact verification preserves original content/provenance and rejects missing assets or wrong commits', async () => {
  const dir=await mkdtemp(path.join(os.tmpdir(),'recovery-site-'));
  try {
    const info={commit:sha,builtAt:'2026-10-29T00:00:00Z',base:'/'};
    await mkdir(path.join(dir,'blog'));await mkdir(path.join(dir,'llms'));await mkdir(path.join(dir,'images'));
    for(const file of ['index.html','404.html','blog/index.html','llms/index.html'])await writeFile(path.join(dir,file),'<img src="/images/test.png">');
    await writeFile(path.join(dir,'llms.txt'),'links');await writeFile(path.join(dir,'images/test.png'),'image');
    await writeFile(path.join(dir,'sitemap.xml'),'<urlset><url><loc>https://anandchowdhary.com/blog</loc></url></urlset>');
    await writeFile(path.join(dir,'build-info.json'),JSON.stringify(info));
    const run=(commit=sha)=>spawnSync(process.execPath,['scripts/verify-recovery.mjs',dir],{encoding:'utf8',env:{...process.env,SOURCE_COMMIT:commit,SOURCE_RUN_ID:'1',EXPECTED_BASE:'/'}});
    const valid=run();assert.equal(valid.status,0,valid.stderr);
    assert.deepEqual(JSON.parse(await readFile(path.join(dir,'build-info.json'),'utf8')),info);
    assert.equal(JSON.parse(await readFile(path.join(dir,'recovery.json'),'utf8')).sourceCommit,sha);
    assert.notEqual(run('b'.repeat(40)).status,0);
    await unlink(path.join(dir,'images/test.png'));assert.notEqual(run().status,0);
  } finally {await rm(dir,{recursive:true,force:true});}
});
