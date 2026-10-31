/** A deliberately partial experiment: Vite for CSS/JS, existing React templates
 * at build time, plain HTML document generation. No Astro rendering/compiler.
 * Image variants are copied from dist to keep the image pipeline constant. */
import { build } from 'vite';
import tailwind from '@tailwindcss/vite';
import { mkdir, readFile, writeFile, cp, readdir } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { renderPage } from '../../src/lib/render';
import type { Metadata } from '../../src/lib/metadata';
import * as blog from '../../src/views/blog/page';
import * as article from '../../src/views/blog/[year]/[slug]/page';
import * as location from '../../src/views/location/[year]/page';

const started = performance.now();
process.env.SITE_STATIC_BUILD = '1';
const output = path.resolve('.cache/static-generator');
await build({
  configFile: false,
  plugins: [tailwind()],
  publicDir: false,
  resolve: { alias: { '@': path.resolve('src') } },
  build: {
    outDir: output, emptyOutDir: true, cssCodeSplit: false,
    rolldownOptions: {
      input: { styles: path.resolve('experiments/static-generator/styles.ts'), lightbox: path.resolve('src/scripts/lightbox.ts') },
      output: { entryFileNames: 'assets/[name].js', assetFileNames: 'assets/[name][extname]' },
    },
  },
});
await cp('public', output, { recursive: true });
await cp('dist/_images', path.join(output, '_images'), { recursive: true });
const css = (await readdir(path.join(output, 'assets'))).filter(file => file.endsWith('.css')).map(file => `/assets/${file}`);
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const meta = (name: string, content?: string, property = false) => content ? `<meta ${property ? 'property' : 'name'}="${name}" content="${escape(content)}">` : '';
function document(metadata: Metadata, html: string, lightbox: boolean) {
  const og = metadata.openGraph ? { title: metadata.title, description: metadata.description, ...metadata.openGraph } : undefined;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(metadata.title || '')}</title>
${meta('description', metadata.description)}${meta('robots', metadata.robots)}
${metadata.authors?.map(author => `${author.url ? `<link rel="author" href="${escape(author.url)}">` : ''}${meta('author', author.name)}`).join('') || ''}
${meta('creator', metadata.creator)}${meta('publisher', metadata.publisher)}
${Object.entries(og || {}).filter(([key]) => key !== 'images').map(([key, value]) => meta(`og:${key === 'siteName' ? 'site_name' : key}`, value as string, true)).join('')}
${og?.images?.map(image => meta('og:image', image.url, true) + meta('twitter:image', image.url)).join('') || ''}
${Object.entries(metadata.twitter || {}).map(([key, value]) => meta('twitter:' + key, value)).join('')}
<link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon"><link rel="icon" href="/icon.png" sizes="481x481" type="image/png">
<link rel="preload" href="/fonts/caa3a2e1cccd8315-s.p.0zr6hhvz-h9nw.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/797e433ab948586e-s.p.1v5bejj26fx9h.woff2" as="font" type="font/woff2" crossorigin>
${css.map(file => `<link rel="stylesheet" href="${file}">`).join('')}
<script>if(new URLSearchParams(location.search).get('screenshot')==='true')document.documentElement.dataset.screenshot='true';</script>
<style>html[data-screenshot='true'] .site-container{padding:2rem;padding-bottom:5rem}html[data-screenshot='true'] .site-container>:not(:last-child){margin-block-end:3rem}html[data-screenshot='true'] .home-main>:not(:last-child){margin-block-end:3rem}html[data-screenshot='true'] .site-container>header{zoom:.66}#image-lightbox::backdrop{background:transparent}@view-transition{navigation:auto}header a[href='/'] svg{view-transition-name:signature}@media(prefers-reduced-motion:reduce){::view-transition-group(*){animation-duration:0s!important}}</style>
</head><body class="antialiased selection:bg-neutral-500/20">${html}${lightbox ? '<script type="module" src="/assets/lightbox.js"></script>' : ''}</body></html>`;
}
const routes = [
  { path: '/blog', page: blog, params: {}, lightbox: false },
  { path: '/blog/2026/future-ai-native-work', page: article, params: { year: '2026', slug: 'future-ai-native-work' }, lightbox: true },
  { path: '/location/2026', page: location, params: { year: '2026' }, lightbox: false },
];
const results = [];
for (const route of routes) {
  const start = performance.now();
  const result = await renderPage(route.page as Parameters<typeof renderPage>[0], route.params);
  if (result.status !== 200) throw Error(`Cannot publish ${route.path}: ${result.status}`);
  const html = document(result.metadata, result.html, route.lightbox);
  const directory = path.join(output, route.path);
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, 'index.html'), html);
  const reference = await readFile(path.join('dist', route.path, 'index.html'), 'utf8');
  results.push({ path: route.path, renderMs: performance.now() - start, gzipBytes: gzipSync(html).length, astroGzipBytes: gzipSync(reference).length });
}
await writeFile(path.join(output, 'experiment.json'), JSON.stringify({ at: new Date().toISOString(), totalMs: performance.now() - started, scope: 'Three routes only. Vite + existing build-time React templates; prebuilt image variants reused. Not an end-to-end generator replacement or comparable full-build benchmark.', results }, null, 2) + '\n');
console.log('Experiment written to', output);
