/** Full experimental artifact builder. Network input is provided only by a sealed
 * snapshot. Existing React templates run at build time; Vite compiles CSS/JS. */
import { build } from 'vite';
import tailwind from '@tailwindcss/vite';
import { mkdir, writeFile, cp, readdir } from 'node:fs/promises';
import path from 'node:path';
import { renderPage } from '../../src/lib/render';
import { staticInventory } from '../../src/lib/static-paths';
import { discoveryResponse } from '../../src/lib/discovery';
import { metadata } from '../../src/lib/site-metadata';
import { notFoundHtml } from '../../src/lib/not-found';
import { pageRegistry, matchPage, pageModule } from '../../scripts/content/routes';
import { document, redirectDocument } from './document';
if (process.env.CONTENT_SNAPSHOT_MODE !== 'replay') throw Error('The generator requires a sealed snapshot');
const output = process.env.STATIC_OUTPUT_DIR!;
await build({
  configFile: false, plugins: [tailwind()], publicDir: path.resolve('public'), base: process.env.PAGES_BASE_PATH || '/',
  resolve: { alias: { '@': path.resolve('src') } },
  build: {
    outDir: output, emptyOutDir: true, cssCodeSplit: false, copyPublicDir: false,
    rolldownOptions: {
      input: { styles: path.resolve('experiments/static-generator/styles.ts'), lightbox: path.resolve('src/scripts/lightbox.ts'), counters: path.resolve('src/scripts/counter-loader.ts'), search: path.resolve('src/scripts/search.ts') },
      output: { entryFileNames: 'assets/[name].js', chunkFileNames: 'assets/[name]-[hash].js', assetFileNames: 'assets/[name][extname]' },
    },
  },
});
await cp('public', output, { recursive: true });
const css = (await readdir(path.join(output, 'assets'))).filter(file => file.endsWith('.css')).map(file => `/assets/${file}`);
const registry = await pageRegistry();
const routes = await staticInventory();
for (const [index, route] of routes.entries()) {
  const match = matchPage(registry, route);
  const result = await renderPage(await pageModule(match.file), match.params);
  if (result.status >= 400) throw Error(`Cannot publish ${route}: ${result.status}`);
  const directory = path.join(output, route);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), result.location ? redirectDocument(result.location) : document(result.metadata, result.html, css, route));
  if (index % 300 === 0) console.log(`Generated ${index + 1}/${routes.length} pages`);
}
await writeFile(path.join(output, '404.html'), document({ ...metadata, title: '404: This page could not be found.', robots: 'noindex' }, notFoundHtml, css, '/404'));
for (const [type, file] of [['html','llms'], ['text','llms.txt'], ['xml','sitemap.xml']] as const) {
  const response = await discoveryResponse(type);
  if (!response.ok) throw Error(`Cannot publish ${file}`);
  await writeFile(path.join(output, file), await response.text());
}
console.log(`Generated ${routes.length} pages; shared finalization will generate image variants, base paths and build provenance`);
