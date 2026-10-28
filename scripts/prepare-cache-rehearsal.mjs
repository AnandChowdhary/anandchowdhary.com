import { cp, mkdir, mkdtemp, readFile, readdir, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import assert from 'node:assert/strict';

// Create an isolated, protected test deployment. The real app's config/routes
// remain unchanged; this copy alone receives the controlled-feed middleware.
const manifest = JSON.parse(await readFile(process.argv[2], 'utf8'));
const root = await mkdtemp(path.join(tmpdir(), 'astro-cache-rehearsal-'));
const files = manifest.files.filter(file => file.sha).map(file => file.path);
files.push(...(await readdir('tests/vercel-rehearsal')).map(name => `tests/vercel-rehearsal/${name}`));
for (const file of new Set(files)) {
  assert.ok(!path.isAbsolute(file) && !file.split('/').includes('..'));
  assert.ok(!/(^|\/)\.env/.test(file));
  const target = path.join(root, file); await mkdir(path.dirname(target), { recursive: true });
  await cp(file, target);
}
await mkdir(path.join(root, '.vercel'));
await cp('.vercel/project.json', path.join(root, '.vercel/project.json'));
const configPath = path.join(root, 'astro.config.mjs');
let config = await readFile(configPath, 'utf8');
const integration = `const rehearsal = { name: 'migration-cache-rehearsal', hooks: { 'astro:config:setup'({ injectRoute, addMiddleware }) {
  injectRoute({ pattern: '/__migration/cache', entrypoint: new URL('./tests/vercel-rehearsal/cache.ts', import.meta.url).pathname, prerender: false });
  addMiddleware({ entrypoint: new URL('./tests/vercel-rehearsal/middleware.ts', import.meta.url), order: 'pre' });
} } };\n`;
assert.ok(config.includes('export default defineConfig({'));
assert.ok(config.includes('isr: { expiration: 60 }'));
config = config.replace('export default defineConfig({', integration + 'export default defineConfig({\n  integrations: [rehearsal],');
config = config.replace('isr: { expiration: 60 }', "isr: { expiration: 60, exclude: ['/__migration/cache'] }");
await writeFile(configPath, config);
console.log(root);
