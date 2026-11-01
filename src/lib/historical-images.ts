import assets from './historical-images.json';
const originals = new Map(assets.map(asset => [asset.source, asset]));
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;');

/** Rewrite image elements only, preserving article links and authored sizing.
 * These committed originals are independent of the availability of old CDNs. */
export function preserveHistoricalImages(html: string): string {
  return html.replace(/<img\b[^>]*>/gi, tag => {
    const source = /\bsrc\s*=\s*(["'])([^"']+)\1/i.exec(tag)?.[2];
    const asset = source && originals.get(source);
    if (!asset) return tag;
    tag = tag.replace(/(\bsrc\s*=\s*)(["'])([^"']*)\2/i, `$1"${asset.file}"`);
    if ('alt' in asset && asset.alt && /\balt\s*=\s*(["'])\1/i.test(tag)) tag = tag.replace(/\balt\s*=\s*(["'])\1/i, `alt="${escape(asset.alt)}"`);
    let attributes = '';
    if (!/\b(?:width|height)\s*=/i.test(tag)) attributes += ` width="${asset.width}" height="${asset.height}"`;
    if (!/\bloading\s*=/i.test(tag)) attributes += ' loading="lazy"';
    if (!/\bdecoding\s*=/i.test(tag)) attributes += ' decoding="async"';
    return tag.replace(/\s*\/?>$/, ending => attributes + ending);
  });
}
