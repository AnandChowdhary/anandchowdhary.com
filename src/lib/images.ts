/** Widths must match astro.config.mjs / Vercel's image allowlist. */
export const IMAGE_WIDTHS = [384, 640, 828, 1080, 1280, 1920] as const;
export const CARD_SIZES = '(min-width: 1312px) 352px, (min-width: 768px) calc((100vw - 256px) / 3), calc(100vw - 64px)';
export const ARTICLE_SIZES = '(min-width: 832px) 672px, (min-width: 640px) calc(100vw - 160px), calc(100vw - 64px)';
export function optimizableImage(src: string): boolean {
  if (/\.(svg|gif)(?:\?|$)/i.test(src)) return false;
  if (src === '/anand.jpg') return true;
  try {
    const url = new URL(src);
    return url.protocol === 'https:' && url.hostname === 'raw.githubusercontent.com' && url.pathname.startsWith('/AnandChowdhary/');
  } catch { return false; }
}
export function optimizedImageUrl(src: string, width: number, quality = 90) {
  if (!IMAGE_WIDTHS.includes(width as typeof IMAGE_WIDTHS[number])) throw new Error('Unsupported image width');
  return `/_vercel/image?${new URLSearchParams({ url: src, w: String(width), q: String(quality) })}`;
}
