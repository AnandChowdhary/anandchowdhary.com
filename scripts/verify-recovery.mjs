import { readFile, readdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { RECOVERY_WINDOW_MS } from './recovery-policy.mjs';
const root = path.resolve(process.argv[2]);
const info = JSON.parse(await readFile(path.join(root, 'build-info.json'), 'utf8'));
assert.equal(info.commit, process.env.SOURCE_COMMIT, 'Artifact commit differs from selected source run');
assert.equal(info.base, process.env.EXPECTED_BASE || '/', 'Artifact base differs from configured Pages path');
async function exists(relative) { try { return (await stat(path.join(root, relative))).isFile(); } catch { return false; } }
for (const file of ['index.html','404.html','sitemap.xml','llms.txt','llms/index.html','blog/index.html']) assert.ok(await exists(file), `Incomplete artifact: ${file}`);
const sitemap = await readFile(path.join(root,'sitemap.xml'),'utf8');
for (const match of sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)) {
  const url = new URL(match[1]);
  let route = decodeURI(url.pathname);
  if (info.base !== '/' && route.startsWith(info.base + '/')) route = route.slice(info.base.length);
  assert.ok(await exists(path.join(route,'index.html')), `Missing sitemap route: ${route}`);
}
const digests = [];
let bytes = 0;
async function walk(directory) {
  for (const entry of await readdir(directory,{withFileTypes:true})) {
    const file = path.join(directory,entry.name);
    if (entry.isDirectory()) { await walk(file); continue; }
    assert.ok(entry.isFile(), 'Artifact must contain regular files only');
    if (path.relative(root,file) === 'recovery.json') continue;
    const body = await readFile(file); bytes += body.length;
    digests.push([path.relative(root,file),createHash('sha256').update(body).digest('hex')]);
    if (!file.endsWith('.html')) continue;
    const html = body.toString();
    assert.doesNotMatch(html, /<h1>Temporarily unavailable<\/h1>|An error occurred while fetching/);
    for (const match of html.matchAll(/\b(src|href|poster|data-index|srcset|imagesrcset)=["']([^"']*)["']/gi)) {
     const values = match[1].toLowerCase().endsWith('srcset') ? match[2].split(',').map(part => part.trim().split(/\s+/)[0]) : [match[2]];
     for (const value of values) {
      if (!value.startsWith('/') || value.startsWith('//')) continue;
      const pathname = decodeURI(new URL(value,'https://static.test').pathname);
      const relative = info.base === '/' ? pathname : pathname.slice(info.base.length);
      if (!/^\/(?:_astro|_images|images|assets|fonts)\//.test(relative) && !relative.endsWith('/search-index.json')) continue;
      if (info.base !== '/') assert.ok(pathname.startsWith(info.base+'/'), 'Unprefixed asset');
      assert.ok(await exists(relative), `Missing asset ${value}`);
     }
    }
  }
}
await walk(root);
assert.ok(bytes < 1024**3, 'Artifact exceeds Pages size limit');
digests.sort((a,b) => a[0].localeCompare(b[0]));
const recoveredAt = Date.now();
const marker = { version: 1, sourceRunId: process.env.SOURCE_RUN_ID, sourceCommit: info.commit, sourceSnapshot: info.contentSnapshot?.id ?? null, originalBuiltAt: info.builtAt, recoveredAt: new Date(recoveredAt).toISOString(), expiresAt: new Date(recoveredAt+RECOVERY_WINDOW_MS).toISOString(), contentSha256: createHash('sha256').update(JSON.stringify(digests)).digest('hex'), files: digests.length, bytes };
// Remove any previous recovery marker before preparation, so this is one explicit recovery.
await writeFile(path.join(root,'recovery.json'),JSON.stringify(marker,null,2)+'\n');
console.log(JSON.stringify(marker,null,2));
