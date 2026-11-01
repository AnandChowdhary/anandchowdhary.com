import { test } from 'node:test';
import assert from 'node:assert/strict';
import { renderArticleReading } from '../src/lib/article-reading';

test('long articles get unique text-based anchors and an ordered TOC, including inline formatting', async () => {
  const text = '<div id="section-repeated"></div>\n\n## Repeated\n\n' + 'word '.repeat(1100) + '\n\n### Repeated\n\n## Café *design*\n';
  const result = await renderArticleReading(text);
  assert.deepEqual(result.toc.map(heading => heading.id), ['section-repeated-2','section-repeated-3','section-cafe-design']);
  assert.deepEqual(result.toc.map(heading => heading.depth), [2,3,2]);
  assert.equal(result.toc[2].label,'Café design');
  assert.match(result.html,/<h2 id="section-cafe-design">Café <em>design<\/em><\/h2>/);
});
test('short or unstructured articles do not get reading tools; code does not become a heading', async () => {
  assert.deepEqual((await renderArticleReading('## One\n\n## Two\n\n## Three')).toc, []);
  const text = 'word '.repeat(1100) + '\n\n## One\n\n```md\n## Code heading\n```';
  assert.deepEqual((await renderArticleReading(text)).toc, []);
  const a=await Promise.all([renderArticleReading('## Same'),renderArticleReading('## Same')]);
  assert.equal(a[0].html,a[1].html,'Concurrent rendering must not share ID counters');
});
