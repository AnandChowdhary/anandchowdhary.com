import { AsyncLocalStorage } from 'node:async_hooks';

export interface CachedSource { body: string; fetchedAt: number; contentType: string; etag?: string; lastModified?: string }
export interface SourceCache {
  get(key: string): Promise<CachedSource | null | undefined>;
  set(key: string, value: CachedSource): Promise<void>;
}
export class SourceError extends Error {
  constructor(public url: string, public status: number, options?: ErrorOptions) {
    super(`Content source unavailable: ${url} (${status})`, options);
  }
}
const MAX_STALE_MS = 24 * 60 * 60 * 1000;
const localRecords = new Map<string, CachedSource>();
const localCache: SourceCache = {
  async get(key) { return localRecords.get(key); },
  async set(key, value) { localRecords.set(key, value); },
};
interface Context {
  pending: Map<string, Promise<CachedSource>>;
  cache: SourceCache;
  fetcher: typeof globalThis.fetch;
  now: () => number;
}
const contexts = new AsyncLocalStorage<Context>();
export function withSourceContext<T>(callback: () => T, overrides: Partial<Omit<Context, 'pending'>> = {}): T {
  if (contexts.getStore() && Object.keys(overrides).length === 0) return callback();
  return contexts.run({ pending: new Map(), cache: localCache, fetcher: globalThis.fetch, now: Date.now, ...overrides }, callback);
}

async function load(url: string, ttl: number, context: Context): Promise<CachedSource> {
  const key = `source-v1:${url}`;
  let previous: CachedSource | null | undefined;
  try { previous = ttl > 0 ? await context.cache.get(key) : null; }
  catch (error) { console.warn('Source cache read failed; fetching origin', url, error); }
  if (previous && context.now() - previous.fetchedAt < ttl * 1000) return previous;
  let failure: unknown;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const headers: Record<string, string> = {};
      if (previous?.etag) headers['If-None-Match'] = previous.etag;
      if (previous?.lastModified) headers['If-Modified-Since'] = previous.lastModified;
      const response = await context.fetcher(url, { headers, signal: AbortSignal.timeout(15000) });
      let record: CachedSource;
      if (response.status === 304 && previous) record = { ...previous, fetchedAt: context.now() };
      else {
        if (!response.ok) throw new SourceError(url, response.status);
        const body = await response.text();
        const contentType = response.headers.get('content-type') || 'text/plain';
        if (contentType.includes('json')) JSON.parse(body); // Never poison the shared cache with invalid JSON.
        record = { body, fetchedAt: context.now(), contentType, etag: response.headers.get('etag') || undefined, lastModified: response.headers.get('last-modified') || undefined };
      }
      if (ttl > 0) {
        try { await context.cache.set(key, record); }
        catch (error) { console.warn('Source cache write failed', url, error); }
      }
      return record;
    } catch (error) {
      failure = error;
      if (error instanceof SourceError && error.status >= 400 && error.status < 500 && error.status !== 429) break;
    }
  }
  if (previous && context.now() - previous.fetchedAt <= MAX_STALE_MS) {
    console.warn('Serving last successful source after refresh failure', url, previous.fetchedAt);
    return previous;
  }
  throw failure instanceof SourceError ? failure : new SourceError(url, 503, { cause: failure });
}

/** Returns a new Response per consumer; duplicate reads share the underlying source, never a consumed body. */
export async function fetchSource(url: string, { ttl = 0 }: { ttl?: number } = {}): Promise<Response> {
  const context = contexts.getStore();
  if (!context) return withSourceContext(() => fetchSource(url, { ttl }));
  const key = `${ttl}:${url}`;
  let pending = context.pending.get(key);
  if (!pending) { pending = load(url, ttl, context); context.pending.set(key, pending); }
  try {
    const record = await pending;
    return new Response(record.body, { headers: { 'Content-Type': record.contentType } });
  } catch (error) {
    // Match fetch semantics so explicitly optional sources can keep their existing fallback.
    if (error instanceof SourceError) {
      if (process.env.SITE_STATIC_BUILD === '1' && error.status !== 404) throw error;
      return new Response(null, { status: error.status });
    }
    throw error;
  }
}
