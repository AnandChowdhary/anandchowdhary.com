# GitHub Pages release comparison

The original Pages matrix contains 48 runs. An empty-alt/lightbox control issue scored 99 accessibility on the image article and was fixed from its authored captions. Eight focused follow-up runs supersede that article group; final budget coverage combines 40 unaffected original runs with those 8 follow-ups, rather than claiming a second complete matrix on one deployment.

Both sites were measured sequentially from the same sandbox with the pinned Chrome/Lighthouse toolchain: five mobile and three desktop runs per route. Hosting differs (GitHub Pages versus Vercel); these results cannot isolate framework effects. Browser storage is fresh per run, CDN caches are uncontrolled, and content feeds remain live. Individual ranges, failures and timestamps remain in each report. The historical image article now has restored artwork, so its content/assets are intentionally different.

| Route | Device | Next performance | Pages performance | Next LCP s | Pages LCP s | Next image KiB | Pages image KiB |
|---|---|---:|---:|---:|---:|---:|---:|
| / | mobile | 89 | 99 | 3.33 | 2.21 | 1240.4 | 1194.1 |
| / | desktop | 99 | 100 | 0.84 | 0.73 | 7762.6 | 1194.1 |
| /blog | mobile | 91 | 99 | 3.08 | 2.14 | 2984.5 | 2665.3 |
| /blog | desktop | 100 | 100 | 0.74 | 0.42 | 2984.7 | 2665.2 |
| /blog/2026/future-ai-native-work | mobile | 95 | 100 | 2.63 | 1.22 | 2984.7 | 1.7 |
| /blog/2026/future-ai-native-work | desktop | 100 | 100 | 0.67 | 0.29 | 2984.5 | 1.7 |
| /projects | mobile | 93 | 100 | 2.77 | 1.45 | 7895.3 | 354.8 |
| /projects | desktop | 100 | 100 | 0.64 | 0.34 | 16405.6 | 587.1 |
| /life | mobile | 95 | 99 | 2.78 | 2.00 | 831.9 | 47.8 |
| /life | desktop | 100 | 100 | 0.69 | 0.54 | 832.1 | 47.8 |
| /blog/2019/state-of-the-podcasts-2019 | mobile | 83 | 100 | 3.16 | 1.21 | 3392.5 | 150.0 |
| /blog/2019/state-of-the-podcasts-2019 | desktop | 98 | 100 | 0.69 | 0.29 | 3392.6 | 164.9 |

## Release budget observations

- PASS: Complete release coverage: 40 original plus 8 focused article samples.
- PASS: home Mobile median LCP <=2500ms (2212.652).
- PASS: blog Mobile median LCP <=2500ms (2138.765).
- PASS: article-text Mobile median LCP <=2500ms (1215.144).
- PASS: projects Mobile median LCP <=2500ms (1445.257).
- PASS: life Mobile median LCP <=2500ms (1995.649).
- PASS: article-images Mobile median LCP <=2500ms (1208.200).
- PASS: CLS <=0.1 in every sample (0.012).
- PASS: Project mobile image bytes >=70% below original 7.71MiB (363269.000).
- PASS: No RSC requests in any candidate sample.
- PASS: Article external JS <=30KiB (inline scripts reported separately).
- PASS: accessibility 100 in every audited sample.
- PASS: seo 100 in every audited sample.

## Limits

Home and life retain known third-party image failures and can score 96 for best practices. Scores are not proof of complete accessibility. Public PSI/CrUX quota responses remain in the manifests; lab TBT does not establish field INP. No function/image runtime exists on Pages, but billed build usage/cost is not established here. Scheduled rebuilds can update artifacts during measurements; the candidate deployment record preserves build metadata before and after the run. The custom domain requires a separate DNS/HTTPS cutover and verification.
