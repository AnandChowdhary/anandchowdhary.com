import type { ImgHTMLAttributes } from 'react';
import { IMAGE_WIDTHS, CARD_SIZES, optimizableImage, optimizedImageUrl } from '@/lib/images';

/** Keep the original element/classes and intrinsic sizing; Vercel resizes the source without cropping. */
export function ResponsiveImage({ src, sizes = CARD_SIZES, loading = 'lazy', ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  if (typeof src !== 'string' || !optimizableImage(src)) return <img {...props} src={src} sizes={sizes} loading={loading} />;
  // The decorative hero originals are only 384px wide; don't manufacture larger variants.
  const widths = src.includes('/384x256/') ? [384] : IMAGE_WIDTHS;
  const width = widths.length === 1 ? 384 : 828;
  return <img {...props} src={optimizedImageUrl(src, width)} srcSet={widths.map(w => `${optimizedImageUrl(src, w)} ${w}w`).join(', ')} sizes={sizes} loading={loading} decoding="async" />;
}
