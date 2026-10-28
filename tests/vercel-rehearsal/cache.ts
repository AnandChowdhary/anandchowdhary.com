import type { APIRoute } from 'astro';
import { backend, enabled, feedUrl, probeCache, validRun, type ProbeState } from './state';

// Injected only into the temporary rehearsal build; not an application route.
export const ALL: APIRoute = async ({ request, url }) => {
  if (!enabled()) return new Response(null, { status: 404 });
  const run = url.searchParams.get('run') || '';
  if (!validRun(run)) return new Response('Invalid rehearsal id', { status: 400 });
  const cache = probeCache(run);
  if (request.method === 'DELETE') {
    await cache.delete('state'); await cache.delete(`source-v1:${feedUrl}`);
    return new Response(null, { status: 204 });
  }
  if (request.method === 'POST') {
    const body = await request.text();
    if (body.length > 1024) return new Response(null, { status: 413 });
    let state: ProbeState;
    try { state = JSON.parse(body); } catch { return new Response(null, { status: 400 }); }
    if (typeof state.published !== 'boolean' || typeof state.failFeed !== 'boolean' || !Number.isFinite(state.clockMs) || state.clockMs < 0 || state.clockMs > 604800000) return new Response(null, { status: 400 });
    await cache.set('state', state, { ttl: 3600 });
  } else if (request.method !== 'GET') return new Response(null, { status: 405 });
  return Response.json({ backend: backend(), state: await cache.get('state') }, { headers: { 'Cache-Control': 'no-store' } });
};
