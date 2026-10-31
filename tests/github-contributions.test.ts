import { test } from 'node:test';
import assert from 'node:assert/strict';
import { getGitHubContributionCount } from '../src/views/api';
import { parseContributions } from '../src/lib/github-contributions';
import { fetchSource, withSourceContext } from '../src/lib/source';

const calendar = '<h2 id="js-contribution-activity-description">1,234 contributions in the last year</h2>' +
  Array.from({ length: 365 }, (_, index) => {
    const date = new Date(Date.UTC(2025, 0, index + 1)).toISOString().slice(0, 10);
    return `<td data-date="${date}" data-level="${index % 5}"></td>`;
  }).join('');

test('optional contributions outage does not block static builds; mandatory sources still fail', async () => {
  const previous = process.env.SITE_STATIC_BUILD;
  process.env.SITE_STATIC_BUILD = '1';
  try {
    for (const fetcher of [
      async () => new Response(null, { status: 503 }),
      async () => { throw new TypeError('DNS lookup failed'); },
      async () => new Response('<h1>Upstream unavailable</h1>'),
    ]) {
      await withSourceContext(async () => {
        assert.equal(await getGitHubContributionCount(), null);
        await assert.rejects(() => fetchSource('https://required.test/content', { validate: () => false }), /Content source unavailable/);
      }, { fetcher, cache: { async get() { return null; }, async set() {} } });
    }
  } finally {
    if (previous === undefined) delete process.env.SITE_STATIC_BUILD;
    else process.env.SITE_STATIC_BUILD = previous;
  }
});

test('available calendar retains the real count and validated activity levels', async () => {
  const count = await withSourceContext(() => getGitHubContributionCount(), {
    fetcher: async () => new Response(calendar),
    cache: { async get() { return null; }, async set() {} },
  });
  assert.equal(count, 1234);
  assert.equal(parseContributions(calendar)?.days.length, 365);
  assert.equal(parseContributions('<script>alert(1)</script>'), null);
  assert.equal(parseContributions(calendar.replace(/data-level="[0-4]"/g, 'data-level="99"')), null);
});
