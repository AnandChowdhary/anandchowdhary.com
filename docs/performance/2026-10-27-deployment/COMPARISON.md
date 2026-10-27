# Deployed release comparison

Same sandbox, Chrome and Lighthouse versions; sequential fresh-browser samples, five mobile and three desktop runs per route. Both builds use the existing Vercel project. Browser-cold is not CDN-cold. See each manifest for exact timestamps and individual ranges.

| Route | Device | Next LCP s | Astro LCP s | Next performance | Astro performance | Next image KiB | Astro image KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 3.65 | 2.04 | 88 | 99 | 1240.5 | 1194.3 |
| / | desktop | 0.72 | 0.52 | 100 | 100 | 7775.5 | 1194.3 |
| /blog | mobile | 2.81 | 2.04 | 93 | 99 | 2984.4 | 2665.2 |
| /blog | desktop | 0.69 | 0.60 | 100 | 100 | 2984.4 | 2665.2 |
| /blog/2026/future-ai-native-work | mobile | 2.60 | 1.24 | 96 | 100 | 2984.7 | 1.8 |
| /blog/2026/future-ai-native-work | desktop | 0.57 | 0.32 | 100 | 100 | 2984.4 | 1.8 |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 3.06 | 1.22 | 84 | 100 | 3392.8 | 149.7 |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 0.60 | 0.30 | 100 | 100 | 3392.6 | 164.5 |
| /projects | mobile | 11.05 | 1.38 | 65 | 100 | 7895.4 | 354.0 |
| /projects | desktop | 0.63 | 0.36 | 100 | 100 | 16405.3 | 584.9 |
| /life | mobile | 2.79 | 1.78 | 95 | 100 | 832.0 | 47.8 |
| /life | desktop | 0.68 | 0.56 | 100 | 100 | 832.1 | 47.8 |

## Raw-image vertical-slice control

The control uses Astro with direct original image URLs; project cards retain original lazy loading. Other non-image migration fixes remain, so this isolates image delivery more closely than a pure framework-only experiment. The repaired historical article is excluded.

| Route | Device | Next LCP s | Astro raw-image LCP s | Astro optimized LCP s | Raw images KiB | Optimized images KiB | Next JS KiB | Raw Astro JS KiB |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| /blog/2026/future-ai-native-work | mobile | 2.60 | 1.84 | 1.24 | 65.8 | 1.8 | 164.0 | 2.4 |
| /blog/2026/future-ai-native-work | desktop | 0.57 | 0.54 | 0.32 | 65.8 | 1.8 | 164.0 | 25.3 |
| /projects | mobile | 11.05 | 10.59 | 1.38 | 7576.3 | 354.0 | 157.4 | 2.4 |
| /projects | desktop | 0.63 | 3.68 | 0.36 | 16086.3 | 584.9 | 157.4 | 25.3 |

## Automated budget observations

- PASS: home median LCP <=2500ms (2035.8274999999999).
- PASS: blog median LCP <=2500ms (2044.1445000000003).
- PASS: article-text median LCP <=2500ms (1235.942).
- PASS: article-images median LCP <=2500ms (1222.693).
- PASS: projects median LCP <=2500ms (1376.5845).
- PASS: life median LCP <=2500ms (1782.2714999999998).
- PASS: CLS <=0.1 every run (0.03871853748942007).
- PASS: Project images >=70% lower than initial 7.71MiB baseline (362480).
- PASS: No RSC requests in candidate samples.

## Interpretation limits

Preview SEO scores reflect Vercel noindex protection and must be rechecked on the production custom domain. Desktop previews include an external Vercel feedback toolbar, retained in transfer totals. Home and life inherit broken third-party avatar/contribution assets, preventing a blanket 100 best-practices claim. Restored podcast artwork intentionally differs from the broken production page. Source feeds remain live; the captures are close in time, not immutable content fixtures. No field INP, global speed, billed usage or cost improvement is established by these lab results.
