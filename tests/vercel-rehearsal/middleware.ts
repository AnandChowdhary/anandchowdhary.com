import type { MiddlewareHandler } from 'astro';
import { withSourceContext, type CachedSource } from '../../src/lib/source';
import { enabled, feedUrl, posts, probeCache, type ProbeState } from './state';

export const onRequest: MiddlewareHandler = async ({ url }, next) => {
  const match = /^\/blog\/2026\/migration-rehearsal-([0-9a-f-]{36})-(absent|before|after|revalidated|stale|expired)\/?$/.exec(url.pathname);
  if (!enabled() || !match) return next();
  const run = match[1];
  const cache = probeCache(run);
  const state = await cache.get('state') as ProbeState | null;
  if (!state) return new Response('Rehearsal state unavailable', { status: 503 });
  const originStatuses: Array<{ source: string; status: number }> = [];
  const result = await withSourceContext(() => next(), {
    now: () => state.clockMs,
    cache: {
      get: async key => await cache.get(key) as CachedSource | null,
      set: async (key, value) => cache.set(key, value, { ttl: 86400 }),
    },
    fetcher: async (input, init) => {
      const source = String(input);
      if (source === feedUrl) {
        const etag = state.published ? '"published"' : '"empty"';
        const status = state.failFeed ? 503 : new Headers(init?.headers).get('if-none-match') === etag ? 304 : 200;
        originStatuses.push({ source: 'feed', status });
        if (status !== 200) return new Response(null, { status });
        return Response.json(state.published ? posts(run) : [], { headers: { ETag: etag } });
      }
      if (source.startsWith('https://raw.githubusercontent.com/AnandChowdhary/blog/refs/heads/main/blog/2026/migration-rehearsal-')) {
        originStatuses.push({ source: 'article', status: 200 });
        return new Response(`# Fixture\n\nPublished after deployment: ${run}.\n\nRevision: ${state.clockMs}.`);
      }
      return globalThis.fetch(input, init);
    },
  });
  const headers = new Headers(result.headers);
  headers.set('x-migration-origin-statuses', JSON.stringify(originStatuses));
  return new Response(result.body, { status: result.status, headers });
};
