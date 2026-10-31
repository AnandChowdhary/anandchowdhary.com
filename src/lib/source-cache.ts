import { createHash, randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';
import type { CachedSource, SourceCache } from './source';

/** Persist only explicitly optional sources. Required content is always fetched
 * again in a new build. Expiry remains enforced by the source loader. */
export function createBuildSourceCache(directory: string): SourceCache {
  const records = new Map<string, CachedSource>();
  const filename = (key: string) => path.join(directory, createHash('sha256').update(key).digest('hex') + '.json');
  return {
    async get(key) {
      if (records.has(key)) return records.get(key);
      if (!key.startsWith('optional-source-v1:')) return null;
      try {
        const record = JSON.parse(await readFile(filename(key), 'utf8'));
        if (typeof record.body !== 'string' || typeof record.contentType !== 'string' ||
            !Number.isFinite(record.fetchedAt) || record.fetchedAt > Date.now()) return null;
        if (record.contentType.includes('json')) JSON.parse(record.body);
        records.set(key, record);
        return record;
      } catch { return null; }
    },
    async set(key, record) {
      records.set(key, record);
      if (!key.startsWith('optional-source-v1:')) return;
      await mkdir(directory, { recursive: true });
      const file = filename(key);
      const temporary = file + `.${process.pid}.${randomUUID()}.tmp`;
      await writeFile(temporary, JSON.stringify(record));
      await rename(temporary, file);
    },
  };
}
