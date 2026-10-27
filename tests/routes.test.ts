import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderPage } from '../src/lib/render';
import { withSourceContext, type CachedSource } from '../src/lib/source';
import * as article from '../src/views/blog/[year]/[slug]/page';
import * as year from '../src/views/blog/[year]/page';
import { sanitizeRepositoryHtml } from '../src/views/lib/markdown';

const post={title:'New article',date:'2026-10-26T12:00:00Z',slug:'new-article.md',excerpt:'An excerpt',emoji:'📝',source:'https://example.test/source',attributes:{date:'2026-10-26'}};
function fixtures() {
  let published=false;
  let failed=false;
  let now=0;
  const records=new Map<string,CachedSource>();
  return {
    publish(){published=true;}, fail(){failed=true;}, setTime(value:number){now=value;},
    run:<T>(fn:()=>T)=>withSourceContext(fn,{
      now:()=>now, cache:{async get(k){return records.get(k);},async set(k,v){records.set(k,v);}},
      fetcher:async url=>{
        if(failed)return new Response(null,{status:503});
        if(String(url).endsWith('/blog/api.json'))return Response.json(published?[post]:[]);
        if(String(url).endsWith('/blog/2026/new-article.md'))return new Response('# New article\n\nNew content without rebuilding.');
        throw new Error(`Unexpected network request: ${url}`);
      },
    }),
  };
}

test('a post absent from the build becomes reachable after feed expiry without changing route files',async()=>{
  const h=fixtures();
  assert.equal((await h.run(()=>renderPage(article,{year:'2026',slug:'new-article'}))).status,404);
  h.publish();h.setTime(3601000);
  const page=await h.run(()=>renderPage(article,{year:'2026',slug:'new-article'}));
  assert.equal(page.status,200);assert.match(page.html,/New content without rebuilding/);
  assert.equal(page.metadata.title,'New article / 2026 / Blog / Anand Chowdhary');
  assert.doesNotMatch(page.html,/_next|__next|self\.__next/);
});

test('short-slug lookup preserves its 307 redirect and invalid years are real 404 responses',async()=>{
  const h=fixtures();h.publish();
  const result=await h.run(()=>renderPage(year,{year:'new-article'}));
  assert.equal(result.status,307);assert.equal(result.location,'/blog/2026/new-article');
  assert.equal((await h.run(()=>renderPage(article,{year:'not-a-year',slug:'new-article'}))).status,404);
});

test('a cold upstream failure yields 503, never a misleading missing-post 404',async()=>{
  const h=fixtures();h.fail();
  assert.equal((await h.run(()=>renderPage(article,{year:'2026',slug:'new-article'}))).status,503);
});

test('repository HTML sanitization retains content and rejects executable markup',()=>{
  const html=sanitizeRepositoryHtml('<p>Read me</p><script>alert(1)</script><img src="https://example.test/image.png" onerror="alert(1)">');
  assert.match(html,/Read me/);assert.match(html,/image.png/);assert.doesNotMatch(html,/script|onerror/);
});

test('responsive image URLs restrict transforms and preserve formats that need their original source',async()=>{
  const { optimizableImage, optimizedImageUrl }=await import('../src/lib/images');
  assert.equal(optimizableImage('https://raw.githubusercontent.com/AnandChowdhary/projects/main/assets/card.png'),true);
  assert.equal(optimizableImage('https://raw.githubusercontent.com/someone-else/image.png'),false);
  assert.equal(optimizableImage('https://example.test/private.png'),false);
  assert.equal(optimizableImage('https://raw.githubusercontent.com/AnandChowdhary/projects/main/assets/animated.gif'),false);
  assert.equal(optimizableImage('/anand.jpg'),true);
  const url=new URL(optimizedImageUrl('/anand.jpg',640),'https://anandchowdhary.com');
  assert.equal(url.pathname,'/_vercel/image');assert.equal(url.searchParams.get('url'),'/anand.jpg');
  assert.throws(()=>optimizedImageUrl('/anand.jpg',999),/Unsupported image width/);
});
