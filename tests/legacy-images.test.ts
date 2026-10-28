import { test } from 'node:test';
import assert from 'node:assert/strict';
import { prepareLegacyImages } from '../src/lib/legacy-images';

test('restored article artwork reserves its original aspect ratio and defers offscreen loads', () => {
  const source = '<h3><img src="/images/blog/state-of-the/podcasts/unbox.png" alt=""><span>Unbox</span></h3>';
  const result = prepareLegacyImages(source);
  assert.match(result, /width="300" height="300" loading="lazy"/);
  assert.ok(result.includes('<span>Unbox</span>'));
  assert.equal(prepareLegacyImages(result), result);
});

test('legacy image preparation preserves explicit author sizing/loading and unrelated images', () => {
  const authored = "<img src='/images/blog/state-of-the/podcasts/unbox.png' width='80' height='80' loading='eager' />";
  assert.equal(prepareLegacyImages(authored), authored);
  const other = '<img src="https://example.com/photo.png" alt="A photo">';
  assert.equal(prepareLegacyImages(other), other);
});
