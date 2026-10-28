import { getCache } from '@vercel/functions';

export const feedUrl = 'https://anandchowdhary.github.io/blog/api.json';
export type ProbeState = { published: boolean; failFeed: boolean; clockMs: number };
export const stages = ['absent', 'before', 'after', 'revalidated', 'stale', 'expired'];
export const validRun = (run: string) => /^[0-9a-f-]{36}$/.test(run);
export const enabled = () => process.env.VERCEL_ENV === 'preview' && process.env.MIGRATION_REHEARSAL === '1';
export const probeCache = (run: string) => getCache({ namespace: `migration-rehearsal-v1:${run}` });
export function backend() {
  // Diagnostic only: distinguish the SDK's real runtime provider from its local
  // in-memory fallback. No context values or environment credentials are exposed.
  const global = globalThis as unknown as Record<symbol, { get?: () => { cache?: unknown } }>;
  if (global[Symbol.for('@vercel/request-context')]?.get?.()?.cache) return 'request-context';
  if (process.env.RUNTIME_CACHE_ENDPOINT && process.env.RUNTIME_CACHE_HEADERS && process.env.RUNTIME_CACHE_DISABLE_BUILD_CACHE !== 'true') return 'runtime-endpoint';
  return 'memory';
}
export function posts(run: string) {
  return stages.map(stage => ({
    title: `Migration rehearsal ${stage}`, slug: `migration-rehearsal-${run}-${stage}.md`,
    date: '2026-10-27T12:00:00Z', excerpt: 'Private deployment rehearsal fixture',
    source: 'https://example.invalid/rehearsal', attributes: { date: '2026-10-27' },
  }));
}
