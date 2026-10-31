import { spawn } from 'node:child_process';
import { mkdir, readFile, writeFile, appendFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { sealSnapshot } from './content/snapshot.mjs';
const root = process.cwd();
const hook = path.resolve('scripts/content/hook.mjs');
const pointer = '.cache/content-snapshot.json';
const phase = process.argv[2] || 'all';
if (!['all','collect','render','generator'].includes(phase)) throw Error('Expected all, collect or render');
function run(args, environment) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, ['--import', hook, ...args], { stdio: 'inherit', env: { ...process.env, SITE_STATIC_BUILD: '1', TZ: 'UTC', NODE_ENV: 'production', ASTRO_TELEMETRY_DISABLED: '1', ...environment } });
    child.on('error', reject);
    child.on('exit', code => code === 0 ? resolve() : reject(Error(`Build subprocess failed: ${code}`)));
  });
}
let directory = process.env.CONTENT_SNAPSHOT_DIR;
if (phase === 'all' || phase === 'collect') {
  directory = path.resolve('.cache/content-snapshots', randomUUID());
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'manifest.json'), JSON.stringify({ version: 1, state: 'collecting', collectedAt: new Date().toISOString() }));
  const started = performance.now();
  await run(['--import','tsx','scripts/content/collect.ts'], { CONTENT_SNAPSHOT_DIR: directory, CONTENT_SNAPSHOT_MODE: 'record' });
  const manifest = await sealSnapshot(directory);
  await writeFile(pointer, JSON.stringify({ directory, id: manifest.id, collectionMs: performance.now() - started, inputs: manifest.entries.length }));
  console.log(`Sealed content snapshot ${manifest.id}: ${manifest.entries.length} inputs`);
  if (process.env.GITHUB_OUTPUT) await appendFile(process.env.GITHUB_OUTPUT, `snapshot=${directory}\n`);
}
if (phase !== 'collect') {
  directory ??= JSON.parse(await readFile(pointer, 'utf8')).directory;
  const environment = { CONTENT_SNAPSHOT_DIR: directory, CONTENT_SNAPSHOT_MODE: 'replay', ...(phase === 'generator' ? { STATIC_OUTPUT_DIR: path.resolve('.cache/full-generator') } : {}) };
  await run(phase === 'generator' ? ['--import', 'tsx', 'experiments/static-generator/build.ts'] : ['node_modules/astro/bin/astro.mjs','build'], environment);
  await run(['scripts/finalize-static.mjs'], environment);
}
