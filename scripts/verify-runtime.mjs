import assert from 'node:assert/strict';
import { cp, mkdtemp, rm } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

// Test outside the checkout so a missing traced dependency cannot accidentally
// resolve from the developer's node_modules. Invalid years exercise lazy route
// imports without fetching external content or requiring production credentials.
const isolated = await mkdtemp(path.join(tmpdir(), 'astro-runtime-'));
try {
  await cp(fileURLToPath(new URL('../.vercel/output/functions/_isr.func', import.meta.url)), path.join(isolated, 'function'), { recursive: true, dereference: true });
  const entry = pathToFileURL(path.join(isolated, 'function/dist/server/entry.mjs')).href;
  const code = `
    import assert from 'node:assert/strict';
    const { default: app } = await import(process.argv[1]);
    for (const section of ['open-source', 'projects', 'blog', 'events']) {
      const response = await app.fetch(new Request('https://example.invalid/' + section + '/invalid-year/missing'));
      assert.equal(response.status, 404, section + ' must import and return 404 in the isolated Vercel bundle');
      await response.body?.cancel();
    }
    console.log('Isolated Vercel bundle imports and error routes passed with require(ESM) disabled.');
  `;
  const result = spawnSync(process.execPath, ['--no-experimental-require-module', '--input-type=module', '-e', code, entry], {
    encoding: 'utf8', timeout: 20000, env: { ...process.env, VERCEL: '', NODE_PATH: '', TZ: 'UTC' },
  });
  assert.equal(result.status, 0, [result.error?.message, result.stdout, result.stderr].filter(Boolean).join('\n'));
  process.stdout.write(result.stdout);
} finally {
  await rm(isolated, { recursive: true, force: true });
}
