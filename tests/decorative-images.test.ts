import { test } from 'node:test';
import assert from 'node:assert/strict';
import { decorativeImageSource } from '../src/lib/decorative-images';
test('seeded illustrations preserve existing choices and avoid the known missing 85.png', () => {
  for (let i = 1; i <= 100; i++) assert.equal(decorativeImageSource(i), `https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${i === 85 ? 84 : i}.png`);
  assert.throws(() => decorativeImageSource(0));
  assert.throws(() => decorativeImageSource(1.5));
  assert.throws(() => decorativeImageSource(101));
});
