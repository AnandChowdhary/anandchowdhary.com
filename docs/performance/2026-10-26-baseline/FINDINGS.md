# Findings and recommended next step

All 48 production Lighthouse runs completed successfully on 2026-10-26:
five mobile and three desktop runs for each of six fixed URLs. See the
[full report](REPORT.md), [sample metrics](summary.json), and
[provenance and HTTP observations](manifest.json). The pinned runner and
[experiment plan](../PLAN.md) are ready for repeat measurements.

## Decision

Start with targeted improvements in Next.js. This baseline identifies specific
image-delivery and prefetch problems worth testing before paying for a framework
migration. It does not establish the benefit of an Astro or Hono implementation.

## Largest opportunities

1. **Project images.** `/projects` has a mobile median LCP of **11.05 seconds**
   (range **2.78–12.59**) and performance **69** (64–94). It transfers about
   **7.71 MiB of images**, versus **157 KiB of JavaScript**. The first mobile
   audit estimates **7,223 KiB of image savings**. Its LCP element is a lazy-loaded
   project card whose source PNG is 2880 pixels wide. Serve responsive image
   sizes/formats and prioritize the first visible card, then rerun this route and
   the homepage. These estimates are opportunities, not measured savings.
2. **Prefetch-triggered image traffic.** The text article's initial HTML contains
   one image, but all eight article measurements request **87 images** marked as
   link preloads and six RSC requests. It transfers about **2.91 MiB of images**
   and **164 KiB of JavaScript**. Requests for `/` and `/blog` RSC payloads precede
   images belonging to those listings. Test shared-navigation prefetch reduction
   and listing image loading to confirm causation; compare subsequent navigation
   too. Do not interpret all downloaded images as article content.
3. **Mobile responsiveness and stability.** Homepage median LCP is **3.27 s**,
   blog index **2.99 s**, text article **2.67 s**, image article **3.10 s**, life
   **2.73 s**. Article CLS is intermittent: median zero, maximum **0.150** on the
   text article and **0.164** on the image article. Inspect font and image timing;
   the pilot also identified font-related shifts. Desktop medians are 99–100 for
   performance except projects at 91. Mobile and desktop transfer totals differ
   because viewport size affects loading and prefetch behavior.
4. **Independent audit fixes.** Accessibility scores are **94–96**; signature
   home links lack accessible names. Best practices scores are **73** throughout;
   audits report HTTP book-cover URLs (mixed content) and a broken Twitter image.
   All 48 reports contain failed network requests, so a successful audit is not
   a clean network result. SEO is **100** except life at **91**, where generic
   link text is flagged. Check these individually; replacing the framework does
   not inherently fix them.

## Interpretation limits

These are lab results from one sandbox with unverified physical location and
simulated throttling, not global real-user performance. Wide LCP and score ranges
are retained, not discarded. Sequential HTTP GETs returned 200 and mostly Vercel
HIT responses, with an initial STALE response for the image article; this does not
establish freshness or control the CDN cache. The deployed Git SHA is unknown;
the manifest records the inspected checkout separately.

The public PageSpeed API returned **429 quota errors on both devices**. Real-user
p75 LCP, INP and CLS remain unmeasured here. This is not evidence that CrUX lacks
traffic. TBT is not INP. No build-duration or hosting-cost comparison was made.

Full compressed Lighthouse results remain in the local `raw/` folder, ignored by
Git; preserve them when archiving/sharing the baseline. Application code and
hosting have not changed. The next experiment is responsive project images,
followed by navigation prefetch, using the same measurement matrix.
