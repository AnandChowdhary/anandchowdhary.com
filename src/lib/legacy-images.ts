import sizes from './legacy-image-sizes.json';

const dimensions: Record<string, number[]> = sizes;

/** Reserve the restored originals' space and defer offscreen article artwork. */
export function prepareLegacyImages(markdown: string): string {
  return markdown.replace(/<img\b[^>]*>/gi, tag => {
    const source = /\bsrc\s*=\s*(["'])([^"']+)\1/i.exec(tag)?.[2];
    const size = source && dimensions[source];
    if (!size) return tag;
    let attributes = '';
    if (!/\b(?:width|height)\s*=/i.test(tag)) attributes += ` width="${size[0]}" height="${size[1]}"`;
    if (!/\bloading\s*=/i.test(tag)) attributes += ' loading="lazy"';
    return tag.replace(/\s*\/?>$/, ending => `${attributes}${ending}`);
  });
}
