import { test } from 'node:test';
import assert from 'node:assert/strict';
import { preserveHistoricalImages } from '../src/lib/historical-images';
import assets from '../src/lib/historical-images.json';
import { readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';

test('archived originals are intact and a broken article-page image has an owned replacement', async () => {
  for (const asset of assets) {
    const body = await readFile('public'+asset.file);
    assert.equal(createHash('sha256').update(body).digest('hex'), asset.sha256);
    assert.equal(body.length,asset.bytes);
  }
  const asset = assets.find(asset => 'alt' in asset)!;
  const html = preserveHistoricalImages(`<p><a href="${asset.source}">Original article link</a></p><img src="${asset.source}" alt="">`);
  assert.ok(html.includes(`href="${asset.source}"`));
  assert.ok(html.includes(`src="${asset.file}"`));
  assert.match(html,/alt="Agastya Read Aloud/);
  assert.match(html,/width="1024" height="512" loading="lazy" decoding="async"/);
});
test('preservation keeps authored sizing, loading and captions and ignores unlisted images', () => {
  const asset = assets[0];
  const html = `<img src="${asset.source}" width="300" loading="eager" alt="Authored caption">`;
  assert.equal(preserveHistoricalImages(html), html.replace(asset.source,asset.file).replace('>',' decoding="async">'));
  assert.equal(preserveHistoricalImages('<img src="https://example.com/image.png" alt="Other">'),'<img src="https://example.com/image.png" alt="Other">');
});
