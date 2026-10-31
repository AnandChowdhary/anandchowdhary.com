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
        if(String(url).endsWith('/blog/2026/new-article.md'))return new Response('# New article\n\nNew content in the next static build.');
        throw new Error(`Unexpected network request: ${url}`);
      },
    }),
  };
}

test('a refreshed build input discovers a newly published post without changing route templates',async()=>{
  const h=fixtures();
  assert.equal((await h.run(()=>renderPage(article,{year:'2026',slug:'new-article'}))).status,404);
  h.publish();h.setTime(3601000);
  const page=await h.run(()=>renderPage(article,{year:'2026',slug:'new-article'}));
  assert.equal(page.status,200);assert.match(page.html,/New content in the next static build/);
  assert.equal(page.metadata.title,'New article / 2026 / Blog / Anand Chowdhary');
  assert.doesNotMatch(page.html,/_next|__next|self\.__next/);
});

test('route loaders retain short-slug destinations and reject invalid years',async()=>{
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
  assert.match(url.pathname,/^\/_images\/[a-f0-9]{24}-640-90\.webp$/);
  assert.throws(()=>optimizedImageUrl('https://example.test/private.png',640),/Unapproved image source/);
  assert.throws(()=>optimizedImageUrl('/anand.jpg',999),/Unsupported image width/);
});

test('static builds fail on mandatory source errors rather than publishing error HTML',async()=>{
  const h=fixtures();h.fail();const previous=process.env.SITE_STATIC_BUILD;
  process.env.SITE_STATIC_BUILD='1';
  try { await assert.rejects(h.run(()=>renderPage(article,{year:'2026',slug:'new-article'})),/503/); }
  finally { if(previous===undefined)delete process.env.SITE_STATIC_BUILD;else process.env.SITE_STATIC_BUILD=previous; }
});

test('native article data preserves metadata, rendered content and one static hero variant', async () => {
  const { blogArticle } = await import('../src/lib/blog-article');
  const h = fixtures(); h.publish();
  const result = await h.run(() => blogArticle('2026', 'new-article'));
  assert.equal(result.metadata.title, 'New article / 2026 / Blog / Anand Chowdhary');
  assert.match(result.html, /New content in the next static build/);
  assert.match(result.hero, /^\/_images\/[a-f0-9]{24}-384-90\.webp$/);
  assert.equal(result.srcset, `${result.hero} 384w`);
  assert.equal(result.previous, undefined);
  assert.equal(result.next, undefined);
});

test('native article data rejects invalid/missing articles and propagates mandatory source outages', async () => {
  const { blogArticle } = await import('../src/lib/blog-article');
  const missing = fixtures();
  await assert.rejects(() => blogArticle('invalid', 'missing'), (error: any) => error.status === 404);
  await assert.rejects(() => missing.run(() => blogArticle('2026', 'missing')), (error: any) => error.status === 404);
  const failed = fixtures(); failed.fail();
  await assert.rejects(() => failed.run(() => blogArticle('2026', 'new-article')), /503/);
});
