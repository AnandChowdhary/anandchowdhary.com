import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getGitHubContributionCount } from '../src/views/api';
import { fetchSource, withSourceContext } from '../src/lib/source';

test('optional contributions outage does not block static builds; mandatory sources still fail', async () => {
  const previous = process.env.SITE_STATIC_BUILD;
  process.env.SITE_STATIC_BUILD = '1';
  try {
    for (const fetcher of [
      async () => new Response(null, { status: 503 }),
      async () => { throw new TypeError('DNS lookup failed'); },
      async () => new Response('{invalid', { headers: { 'content-type': 'application/json' } }),
    ]) {
      await withSourceContext(async () => {
        assert.equal(await getGitHubContributionCount(), null);
        await assert.rejects(() => fetchSource('https://required.test/content'), /Content source unavailable/);
      }, { fetcher, cache: { async get() { return null; }, async set() {} } });
    }
  } finally {
    if (previous === undefined) delete process.env.SITE_STATIC_BUILD;
    else process.env.SITE_STATIC_BUILD = previous;
  }
});

test('available contributions retain the real count', async () => {
  const count = await withSourceContext(() => getGitHubContributionCount(), {
    fetcher: async () => Response.json({ totalContributions: 1234 }),
    cache: { async get() { return null; }, async set() {} },
  });
  assert.equal(count, 1234);
});
