/** The authored background collection has no 85.png. Preserve all other seeded
 * choices and use 84 for that known gap, rather than publishing a broken image.
 * Other missing/failed sources still fail the required-image collection stage. */
export function decorativeImageSource(index: number): string {
  if (!Number.isInteger(index) || index < 1 || index > 100) throw Error('Invalid decorative image index');
  return `https://raw.githubusercontent.com/AnandChowdhary/blog-images/refs/heads/main/384x256/${index === 85 ? 84 : index}.png`;
}
