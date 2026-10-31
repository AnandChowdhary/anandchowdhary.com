import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import os from 'node:os';
import { writeInput, readInput, sealSnapshot, inputUrl, verifyManifest } from '../scripts/content/snapshot.mjs';

test('sealed snapshots replay immutable inputs, freeze time, and forbid all TCP/network fallback', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'content-snapshot-'));
  try {
    await writeFile(path.join(directory, 'manifest.json'), JSON.stringify({ version: 1, state: 'collecting', collectedAt: '2026-10-31T12:00:00.000Z' }));
    const url = 'https://raw.githubusercontent.com/owner/repo/main/data.json';
    await writeInput(directory, url, Response.json({ value: 42 }, { headers: { 'X-Source-Fetched-At': '1793448000000', 'X-Source-Stale': 'true' } }));
    const manifest = await sealSnapshot(directory);
    verifyManifest(manifest);
    const script = `
      import assert from 'node:assert/strict';
      import net from 'node:net';
      import { fetchSource } from './src/lib/source.ts';
      assert.equal(new Date().toISOString(), '2026-10-31T12:00:00.000Z');
      assert.equal(new Date('2020-01-01').getUTCFullYear(), 2020);
      assert.deepEqual(await (await fetchSource('${url}')).json(), {value:42});
      assert.equal((await fetchSource('${url}')).headers.get('X-Source-Stale'), 'true');
      await assert.rejects(() => fetchSource('https://raw.githubusercontent.com/missing/file', {optional:true}), /Missing snapshot input/);
      assert.throws(() => net.connect(443, 'github.com'), /TCP access is disabled/);
    `;
    const child = spawnSync(process.execPath, ['--import', path.resolve('scripts/content/hook.mjs'), '--import', 'tsx', '--input-type=module', '--eval', script], { cwd: process.cwd(), env: { ...process.env, CONTENT_SNAPSHOT_DIR: directory, CONTENT_SNAPSHOT_MODE: 'replay', SITE_STATIC_BUILD: '1' }, encoding: 'utf8' });
    assert.equal(child.status, 0, child.stderr);
    const entry = manifest.entries[0];
    await writeFile(path.join(directory, 'bodies', entry.sha256), 'corrupt');
    await assert.rejects(() => readInput(directory, url, { [url]: entry }), /Corrupt snapshot input/);
    assert.throws(() => verifyManifest({ ...manifest, id: 'bad' }), /Invalid or unsealed/);
  } finally { await rm(directory, { recursive: true }); }
});

test('snapshot collection rejects credentials, arbitrary origins, and unsupported requests', () => {
  for (const url of ['http://raw.githubusercontent.com/file','https://example.com/data','https://github.com/private/data','https://raw.githubusercontent.com/file?token=secret']) assert.throws(() => inputUrl(url), /Unapproved/);
  assert.throws(() => inputUrl('https://raw.githubusercontent.com/file', {headers:{authorization:'test'}}), /Unapproved/);
});
