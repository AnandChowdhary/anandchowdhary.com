import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, writeFile, rename, readdir } from 'node:fs/promises';
import path from 'node:path';
export const hash = value => createHash('sha256').update(value).digest('hex');
export function inputUrl(input, init) {
  const url = new URL(typeof input === 'string' || input instanceof URL ? input : input.url);
  const headers = new Headers(init?.headers ?? (input instanceof Request ? input.headers : undefined));
  if ((init?.method ?? (input instanceof Request ? input.method : 'GET')) !== 'GET' || headers.has('authorization') || headers.has('cookie') || url.username || url.password || url.search || url.protocol !== 'https:' ||
      !(['raw.githubusercontent.com', 'anandchowdhary.github.io'].includes(url.hostname) || url.href === 'https://github.com/users/AnandChowdhary/contributions')) {
    throw new Error(`Unapproved content input: ${url.origin}${url.pathname}`);
  }
  return url.href;
}
export class SnapshotError extends Error {
  code = 'CONTENT_SNAPSHOT_MISS';
}
export async function writeInput(directory, url, response) {
  const body = Buffer.from(await response.arrayBuffer());
  const sha256 = hash(body);
  const headers = Object.fromEntries([...response.headers].filter(([key]) => ['content-type','etag','last-modified','x-source-fetched-at','x-source-stale'].includes(key)));
  const entry = { url, status: response.status, headers, sha256, bytes: body.length };
  await mkdir(path.join(directory, 'bodies'), { recursive: true });
  await mkdir(path.join(directory, 'records'), { recursive: true });
  const atomic = async (file, value) => { const tmp = file + '.' + randomUUID(); await writeFile(tmp, value); await rename(tmp, file); };
  await atomic(path.join(directory, 'bodies', sha256), body);
  await atomic(path.join(directory, 'records', hash(url) + '.json'), JSON.stringify(entry));
  return entry;
}
export async function readInput(directory, url, entries) {
  let entry;
  try { entry = entries ? entries[url] : JSON.parse(await readFile(path.join(directory, 'records', hash(url) + '.json'), 'utf8')); }
  catch { throw new SnapshotError(`Missing snapshot input: ${url}`); }
  if (!entry || entry.url !== url || !/^[a-f0-9]{64}$/.test(entry.sha256)) throw new SnapshotError(`Missing snapshot input: ${url}`);
  const body = await readFile(path.join(directory, 'bodies', entry.sha256)).catch(() => { throw new SnapshotError(`Missing snapshot body: ${url}`); });
  if (body.length !== entry.bytes || hash(body) !== entry.sha256) throw new SnapshotError(`Corrupt snapshot input: ${url}`);
  return new Response([204, 304].includes(entry.status) ? null : body, { status: entry.status, headers: entry.headers });
}
export async function sealSnapshot(directory) {
  const manifest = JSON.parse(await readFile(path.join(directory, 'manifest.json'), 'utf8'));
  const entries = [];
  for (const file of await readdir(path.join(directory, 'records'))) {
    if (!file.endsWith('.json')) continue;
    const entry = JSON.parse(await readFile(path.join(directory, 'records', file), 'utf8'));
    await readInput(directory, entry.url, { [entry.url]: entry });
    entries.push(entry);
  }
  entries.sort((a, b) => a.url.localeCompare(b.url));
  const id = hash(JSON.stringify({ version: 1, collectedAt: manifest.collectedAt, entries }));
  const sealed = { version: 1, state: 'sealed', collectedAt: manifest.collectedAt, id, entries };
  await writeFile(path.join(directory, 'manifest.json'), JSON.stringify(sealed, null, 2) + '\n');
  return sealed;
}
export function verifyManifest(manifest) {
  const { version, collectedAt, entries } = manifest;
  if (manifest.state !== 'sealed' || version !== 1 || !Array.isArray(entries) ||
      hash(JSON.stringify({ version, collectedAt, entries })) !== manifest.id) throw new SnapshotError('Invalid or unsealed content snapshot');
}
