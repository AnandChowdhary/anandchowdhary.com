import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createSearch, type SearchDocument } from '../src/lib/search';
import { searchDocument } from '../scripts/content/search-index.mjs';

test('search ranks titles, requires every term, folds accents, and filters sections', () => {
  const documents: SearchDocument[] = [
    { url: '/blog/2026/cafe', title: 'Café design', section: 'blog', description: '', text: 'A guide for founders.' },
    { url: '/projects/2026/tool', title: 'A tool', section: 'projects', description: 'Design for founders', text: 'Building a café design tool.' },
  ];
  const search = createSearch(documents);
  assert.deepEqual(search('cafe design').map(doc => doc.url), documents.map(doc => doc.url));
  assert.deepEqual(search('founders', 'projects'), [documents[1]]);
  assert.equal(search('design absent').length, 0);
  assert.equal(search('   !!!').length, 0);
  assert.equal(search('<script>malicious</script>').length, 0);
});

test('index includes canonical published article text and omits redirects and chrome', () => {
  const html = '<title>Page</title><meta name="description" content="A &amp; B"><header>Other pages</header><main><h1>Café &amp; code</h1><p>Useful text</p><nav>Next article</nav><script>secret</script><svg>icon</svg></main><footer>Other links</footer>';
  assert.deepEqual(searchDocument('/blog/2026/cafe', html, '/site'), { url: '/site/blog/2026/cafe', section: 'blog', title: 'Café & code', description: 'A & B', text: 'Café & code Useful text' });
  assert.equal(searchDocument('/blog/cafe', html), null);
  assert.equal(searchDocument('/blog/2026/alias', '<meta http-equiv="refresh" content="0;url=/blog/2026/cafe">'), null);
  assert.throws(() => searchDocument('/projects/2026/broken', '<main>No title</main>'), /Cannot index/);
});
