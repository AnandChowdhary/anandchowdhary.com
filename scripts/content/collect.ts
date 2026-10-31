import { readFile } from 'node:fs/promises';
import { staticInventory } from '../../src/lib/static-paths';
import { renderPage } from '../../src/lib/render';
import { discoveryResponse } from '../../src/lib/discovery';
import { pageRegistry, matchPage, pageModule } from './routes';
const routes = await staticInventory();
const registry = await pageRegistry();
const images = new Set<string>();
for (let start = 0; start < routes.length; start += 4) {
  await Promise.all(routes.slice(start, start + 4).map(async route => {
    const match = matchPage(registry, route);
    const result = await renderPage(await pageModule(match.file), match.params);
    if (result.status >= 400) throw Error(`Cannot collect ${route}: ${result.status}`);
    for (const [, hash] of result.html.matchAll(/\/_images\/([a-f0-9]{24})-/g)) images.add(hash);
  }));
  if (start % 100 === 0) console.log(`Validated ${Math.min(start + 4, routes.length)}/${routes.length} route inputs`);
}
for (const type of ['html', 'text', 'xml'] as const) {
  if (!(await discoveryResponse(type)).ok) throw Error(`Cannot collect ${type} discovery inputs`);
}
const sources = await Promise.all([...images].map(async hash => JSON.parse(await readFile(`.astro/image-sources/${hash}.json`, 'utf8')) as { src: string }));
for (let i = 0; i < sources.length; i += 4) {
  await Promise.all(sources.slice(i, i + 4).map(async ({ src }) => {
    if (src.startsWith('/')) return;
    const response = await fetch(src, { signal: AbortSignal.timeout(30000) });
    if (!response.ok) throw Error(`Cannot collect image ${src}: ${response.status}`);
    await response.arrayBuffer();
  }));
}
console.log(`Collected and validated ${routes.length} routes and ${images.size} responsive image originals`);
