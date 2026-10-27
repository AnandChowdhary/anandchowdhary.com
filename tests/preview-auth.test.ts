import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createServer } from 'node:http';
import { once } from 'node:events';
import { previewFetch, previewHeaders } from '../scripts/preview-auth.mjs';

test('preview credentials reach only the configured origin, including across redirects', async () => {
  const received: Array<string | undefined> = [];
  const destination = createServer((req,res) => { received.push(req.headers['x-vercel-protection-bypass'] as string | undefined); res.end('destination'); });
  destination.listen(0, '127.0.0.1'); await once(destination, 'listening');
  const destinationPort = (destination.address() as {port:number}).port;
  const origin = createServer((req,res) => {
    received.push(req.headers['x-vercel-protection-bypass'] as string | undefined);
    res.writeHead(302,{Location:`http://127.0.0.1:${destinationPort}/`}); res.end();
  });
  origin.listen(0,'127.0.0.1'); await once(origin,'listening');
  const originUrl = `http://127.0.0.1:${(origin.address() as {port:number}).port}`;
  const beforeOrigin = process.env.VERCEL_PREVIEW_ORIGIN;
  const beforeSecret = process.env.VERCEL_AUTOMATION_BYPASS_SECRET;
  try {
    process.env.VERCEL_PREVIEW_ORIGIN = originUrl;
    process.env.VERCEL_AUTOMATION_BYPASS_SECRET = 'test-only-bypass-value';
    assert.equal(await (await previewFetch(originUrl)).text(), 'destination');
    assert.deepEqual(received,['test-only-bypass-value',undefined]);
    assert.equal(previewHeaders('https://unrelated.example/', {'x-vercel-protection-bypass':'test-only-bypass-value'}).has('x-vercel-protection-bypass'),false);
    const manual = await previewFetch(originUrl,{redirect:'manual'});
    assert.equal(manual.status,302); await manual.body?.cancel();
  } finally {
    if(beforeOrigin===undefined)delete process.env.VERCEL_PREVIEW_ORIGIN;else process.env.VERCEL_PREVIEW_ORIGIN=beforeOrigin;
    if(beforeSecret===undefined)delete process.env.VERCEL_AUTOMATION_BYPASS_SECRET;else process.env.VERCEL_AUTOMATION_BYPASS_SECRET=beforeSecret;
    origin.close(); destination.close();
  }
});
