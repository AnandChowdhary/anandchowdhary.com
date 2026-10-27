import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const json = async path => JSON.parse(await readFile(new URL(`../${path}`,import.meta.url),'utf8'));
const config=await json('.vercel/output/config.json');
const runtime=await json('.vercel/output/functions/_isr.func/.vc-config.json');
const isr=await json('.vercel/output/functions/_isr.prerender-config.json');
const lock=await json('package-lock.json');
assert.equal(runtime.runtime,'nodejs24.x','Build using Node 24 so the emitted function uses the production runtime');
assert.equal(isr.expiration,60);
assert.deepEqual(config.images.sizes,[384,640,828,1080,1280,1920]);
assert.deepEqual(config.images.formats,['image/webp']);
assert.ok(config.images.remotePatterns.some(p=>p.protocol==='https'&&p.hostname==='raw.githubusercontent.com'&&p.pathname==='/AnandChowdhary/**'),'Vercel output must authorize the remote image URLs actually emitted by the app');
assert.equal(Object.keys(lock.packages).some(p=>/(^|\/)node_modules\/(next|@next\/)/.test(p)),false);
assert.ok(config.routes.some(r=>r.src?.includes('projects/tags/')));
assert.ok(config.routes.some(r=>r.src?.includes('life/food')));
const legacy=await json('docs/performance/legacy-assets.json');
const legacySizes=await json('src/lib/legacy-image-sizes.json');
for(const asset of legacy.files) {
  const body=await readFile(new URL(`../.vercel/output/static${asset.path}`,import.meta.url));
  assert.equal(body.length,asset.bytes,asset.path);
  assert.equal(createHash('sha1').update(`blob ${body.length}\0`).update(body).digest('hex'),asset.gitBlobSha1,asset.path);
  assert.deepEqual(legacySizes[asset.path],[body.readUInt32BE(16),body.readUInt32BE(20)],`PNG dimensions: ${asset.path}`);
}
console.log(`Verified ${legacy.files.length} historical blog assets against their original Git blob hashes.`);
console.log('Verified Node 24 function, 60-second ISR, image allowlist/widths, special routes, and no Next.js packages.');
