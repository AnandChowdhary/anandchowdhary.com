import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fetchSource, withSourceContext, type CachedSource, type SourceCache } from '../src/lib/source';

function harness(fetcher: typeof fetch) {
  const records = new Map<string, CachedSource>();
  const cache: SourceCache = { async get(k) { return records.get(k); }, async set(k,v) { records.set(k,v); } };
  let now = 1000;
  return { records, setTime(value: number) { now = value; }, request: <T>(fn: () => T) => withSourceContext(fn, { cache, fetcher, now: () => now }) };
}

test('parallel consumers receive independent bodies and one origin request; fresh data persists between renders', async () => {
  let calls=0;
  const h=harness(async () => {calls++; return Response.json({value:1});});
  const read=async () => (await fetchSource('https://source.test/feed', {ttl:60})).json();
  assert.deepEqual(await h.request(() => Promise.all([read(),read()])),[{value:1},{value:1}]);
  assert.deepEqual(await h.request(read),{value:1});
  assert.equal(calls,1);
});

test('expired source refreshes and handles conditional 304 without losing the cached body', async () => {
  let calls=0;
  const h=harness(async (_url, options) => {
    calls++;
    if (calls===1) return new Response('first',{headers:{etag:'"v1"'}});
    assert.equal((options?.headers as Record<string,string>)['If-None-Match'],'"v1"');
    return new Response(null,{status:304});
  });
  const read=async () => (await fetchSource('https://source.test/doc',{ttl:60})).text();
  assert.equal(await h.request(read),'first');h.setTime(62000);
  assert.equal(await h.request(read),'first');h.setTime(63000);
  assert.equal(await h.request(read),'first');assert.equal(calls,2);
});

test('refresh failure can serve a last-good source, but not beyond the 24-hour stale bound', async () => {
  let fail=false;
  const h=harness(async () => fail?new Response(null,{status:503}):new Response('good'));
  const read=() => fetchSource('https://source.test/doc',{ttl:60});
  await h.request(read);fail=true;h.setTime(62000);
  assert.equal(await (await h.request(read)).text(),'good');
  h.setTime(24*60*60*1000+2000);
  assert.equal((await h.request(read)).status,503);
});

test('invalid JSON never replaces the shared successful source', async () => {
  const h=harness(async () => new Response('{broken',{headers:{'content-type':'application/json'}}));
  assert.equal((await h.request(() => fetchSource('https://source.test/feed',{ttl:3600}))).status,503);
  assert.equal(h.records.size,0);
});

test('optional missing documents retain fetch-style 404 semantics and are never cached', async () => {
  const h=harness(async () => new Response(null,{status:404}));
  assert.equal((await h.request(() => fetchSource('https://source.test/readme',{ttl:3600}))).status,404);
  assert.equal(h.records.size,0);
});

test('optional validated source uses last-good data for transient outages only, within 24 hours', async () => {
  let body = 'valid';
  let status = 200;
  const h = harness(async () => new Response(body, { status }));
  const read = () => fetchSource('https://source.test/optional', { ttl: 60, optional: true, validate: value => value === 'valid' });
  assert.equal(await (await h.request(read)).text(), 'valid');
  body = 'invalid'; h.setTime(62000);
  assert.equal(await (await h.request(read)).text(), 'valid');
  assert.equal([...h.records.values()][0].body, 'valid');
  status = 503; h.setTime(24 * 60 * 60 * 1000 + 2000);
  assert.equal((await h.request(read)).status, 503);
  status = 404; h.setTime(63000);
  assert.equal((await h.request(read)).status, 404);
});
