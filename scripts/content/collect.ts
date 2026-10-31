import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { staticInventory } from '../../src/lib/static-paths';
import { renderPage } from '../../src/lib/render';
import { discoveryResponse } from '../../src/lib/discovery';
import { pageRegistry, matchPage, pageModule } from './routes';
import { withSourceContext } from '../../src/lib/source';
// A collection is one immutable input set, even when multiple routes read it.
// Share source promises and recording across routes, not response body streams.
await withSourceContext(async () => {
  const started = performance.now();
  const phases: Record<string, number> = {};
  const routeTimings: { route: string; durationMs: number }[] = [];
  const routes = await staticInventory();
  phases.inventoryMs = performance.now() - started;
  const registry = await pageRegistry();
  const images = new Set<string>();
  const renderingStarted = performance.now();
  for (let start = 0; start < routes.length; start += 4) {
    await Promise.all(routes.slice(start, start + 4).map(async route => {
      const routeStarted = performance.now();
      const match = matchPage(registry, route);
      const result = await renderPage(await pageModule(match.file), match.params);
      if (result.status >= 400) throw Error(`Cannot collect ${route}: ${result.status}`);
      for (const [, hash] of result.html.matchAll(/\/_images\/([a-f0-9]{24})-/g)) images.add(hash);
      routeTimings.push({ route, durationMs: performance.now() - routeStarted });
    }));
    if (start % 100 === 0) console.log(`Validated ${Math.min(start + 4, routes.length)}/${routes.length} route inputs`);
  }
  phases.routeValidationMs = performance.now() - renderingStarted;
  const discoveryStarted = performance.now();
  for (const type of ['html', 'text', 'xml'] as const) {
    if (!(await discoveryResponse(type)).ok) throw Error(`Cannot collect ${type} discovery inputs`);
  }
  phases.discoveryMs = performance.now() - discoveryStarted;
  const imagesStarted = performance.now();
  const sources = await Promise.all([...images].map(async hash => JSON.parse(await readFile(`.astro/image-sources/${hash}.json`, 'utf8')) as { src: string }));
  for (let i = 0; i < sources.length; i += 4) {
    await Promise.all(sources.slice(i, i + 4).map(async ({ src }) => {
      if (src.startsWith('/')) return;
      const response = await fetch(src, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw Error(`Cannot collect image ${src}: ${response.status}`);
      await response.arrayBuffer();
    }));
  }
  phases.imagesMs = performance.now() - imagesStarted;
  const network = (globalThis as Record<symbol, any>)[Symbol.for('site.collectionMetrics')];
  const profile = { version: 1, mode: process.env.CONTENT_SNAPSHOT_MODE, collectedAt: new Date().toISOString(), elapsedMs: performance.now() - started, phases, routes: routes.length, images: images.size, slowestRoutes: routeTimings.sort((a,b) => b.durationMs - a.durationMs).slice(0, 30), network };
  const profileFile = process.env.CONTENT_PROFILE_PATH || '.cache/collection-profile.json';
  await mkdir(path.dirname(profileFile), { recursive: true });
  await writeFile(profileFile, JSON.stringify(profile, null, 2) + '\n');
  console.log(`Collection profile: ${profileFile}; phases ${JSON.stringify(phases)}`);
  console.log(`Collected and validated ${routes.length} routes and ${images.size} responsive image originals`);
});
