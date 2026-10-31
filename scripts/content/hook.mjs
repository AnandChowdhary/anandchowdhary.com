import { readFile } from 'node:fs/promises';
import path from 'node:path';
import net from 'node:net';
import { SnapshotError } from './snapshot.mjs';
import { inputUrl, readInput, writeInput, verifyManifest } from './snapshot.mjs';
const directory = process.env.CONTENT_SNAPSHOT_DIR;
const mode = process.env.CONTENT_SNAPSHOT_MODE;
if (!directory || !['record', 'replay'].includes(mode)) throw Error('Content snapshot hook requires a directory and record/replay mode');
const manifest = JSON.parse(await readFile(path.join(directory, 'manifest.json'), 'utf8'));
if (mode === 'replay') verifyManifest(manifest);
else if (manifest.state !== 'collecting') throw Error('A sealed snapshot cannot be changed');
const timestamp = Date.parse(manifest.collectedAt);
if (!Number.isFinite(timestamp)) throw Error('Invalid snapshot timestamp');
const RealDate = Date;
globalThis.Date = new Proxy(RealDate, {
  apply: () => new RealDate(timestamp).toString(),
  construct: (target, args, newTarget) => Reflect.construct(target, args.length ? args : [timestamp], newTarget),
  get: (target, property) => property === 'now' ? () => timestamp : Reflect.get(target, property),
});
const entries = Object.fromEntries((manifest.entries || []).map(entry => [entry.url, entry]));
if (mode === 'replay') {
  const connect = net.Socket.prototype.connect;
  net.Socket.prototype.connect = function (...args) {
    const first = args[0];
    if (!(typeof first === 'string' && first.startsWith('/')) && !(first && typeof first === 'object' && first.path && !first.port)) {
      throw new SnapshotError('TCP access is disabled during snapshot rendering');
    }
    return connect.apply(this, args);
  };
}
const networkFetch = globalThis.fetch;
const verified = new Map();
async function replay(url) {
  if (!verified.has(url)) verified.set(url, (async () => {
    const response = await readInput(directory, url, entries);
    return { body: Buffer.from(await response.arrayBuffer()), status: response.status, headers: response.headers };
  })());
  const record = await verified.get(url);
  return new Response([204, 304].includes(record.status) ? null : record.body, { status: record.status, headers: record.headers });
}
const pending = new Map();
const metrics = { calls: 0, network: [], records: 0, recordMs: 0 };
globalThis[Symbol.for('site.collectionMetrics')] = metrics;
async function recordedFetch(input, init) {
  metrics.calls++;
  const url = inputUrl(input, init);
  if (mode === 'replay') return replay(url);
  let promise = pending.get(url);
  if (!promise) {
    promise = (async () => {
      try { const cached = await readInput(directory, url); if (cached.ok || cached.status === 404) return; } catch {}
      const started = performance.now();
      let status = 0;
      let bytes = 0;
      try {
        const response = await networkFetch(input, init);
        status = response.status;
        bytes = (await writeInput(directory, url, response.clone())).bytes;
        if (!response.ok && response.status !== 404) pending.delete(url);
      } catch (error) {
        await writeInput(directory, url, new Response(null, { status: 503 }));
        pending.delete(url);
        throw error;
      } finally {
        metrics.network.push({ url, status, bytes, durationMs: performance.now() - started });
      }
    })();
    pending.set(url, promise);
  }
  await promise;
  return readInput(directory, url);
}
globalThis.fetch = recordedFetch;
globalThis[Symbol.for('site.contentSnapshot')] = {
  mode, timestamp, id: manifest.id,
  read: url => replay(inputUrl(url)),
  record: async (url, response) => {
    if (mode !== 'record') throw new SnapshotError('A sealed snapshot is read-only');
    const started = performance.now();
    try { return await writeInput(directory, inputUrl(url), response); }
    finally { metrics.records++; metrics.recordMs += performance.now() - started; }
  },
};
