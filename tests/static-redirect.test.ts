import { test } from 'node:test';
import assert from 'node:assert/strict';
import { htmlRedirectTarget } from '../scripts/static-redirect.mjs';
test('static aliases resolve only immediate same-origin HTML redirects, including project Pages bases',()=>{
 assert.equal(htmlRedirectTarget('<meta http-equiv="refresh" content="0;url=/site/blog/2026/post">','https://example.test/site/blog/post'),'https://example.test/site/blog/2026/post');
 assert.equal(htmlRedirectTarget('<meta content="0;url=/target?a=1&amp;b=2" http-equiv="refresh">','https://example.test/'),'https://example.test/target?a=1&b=2');
 for(const url of ['https://other.test/','javascript:alert(1)','//other.test/'])assert.equal(htmlRedirectTarget(`<meta http-equiv="refresh" content="0;url=${url}">`,'https://example.test/'),null);
 assert.equal(htmlRedirectTarget('<meta http-equiv="refresh" content="20;url=/target">','https://example.test/'),null);
});
