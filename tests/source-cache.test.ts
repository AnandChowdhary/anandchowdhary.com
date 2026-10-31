import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, rm, readdir, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { createBuildSourceCache } from '../src/lib/source-cache';

test('only optional snapshots survive process caches, and corrupt snapshots are ignored', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'optional-source-test-'));
  try {
    const record = { body: '{"count":1}', fetchedAt: Date.now(), contentType: 'application/json' };
    const first = createBuildSourceCache(directory);
    await first.set('source-v1:required', record);
    await first.set('optional-source-v1:widget', record);
    const second = createBuildSourceCache(directory);
    assert.equal(await second.get('source-v1:required'), null);
    assert.deepEqual(await second.get('optional-source-v1:widget'), record);
    const [file] = await readdir(directory);
    await writeFile(path.join(directory, file), '{broken');
    assert.equal(await createBuildSourceCache(directory).get('optional-source-v1:widget'), null);
  } finally { await rm(directory, { recursive: true }); }
});

test('concurrent optional snapshot writes remain atomic', async () => {
  const directory = await mkdtemp(path.join(os.tmpdir(), 'optional-source-concurrent-'));
  try {
    const cache = createBuildSourceCache(directory);
    await Promise.all(Array.from({ length: 5 }, (_, index) => cache.set('optional-source-v1:widget', {
      body: JSON.stringify({ count: index }), fetchedAt: Date.now(), contentType: 'application/json',
    })));
    const record = await createBuildSourceCache(directory).get('optional-source-v1:widget');
    assert.ok(record);
    assert.ok(Number.isInteger(JSON.parse(record.body).count));
    assert.equal((await readdir(directory)).length, 1);
  } finally { await rm(directory, { recursive: true }); }
});
