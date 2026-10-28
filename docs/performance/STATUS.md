# Astro migration status — 2026-10-28

**Current release:** GitHub Pages is implemented and its hosted checks pass.
The custom domain is registered on Pages; Cloudflare DNS and final HTTPS checks
remain pending. See [Pages release evidence](2026-10-28-pages-release/COMPARISON.md)
and [DNS cutover instructions](2026-10-28-pages-release/DNS-CUTOVER.md).

**Hosting update:** The user approved conversion to GitHub Pages. The active PR
now builds static HTML and build-time images, with official artifact deployment.
See [current Pages work](GITHUB-PAGES.md). The Vercel evidence below is historical;
it does not establish Pages performance or completion of the domain cutover.

The repository root now runs Astro on the Vercel adapter. Production has not been
deployed or promoted from this workspace. Migration implementation is complete;
release verification is still in progress. The original Next.js deployment remains
the visual reference and rollback target.

## Implementation

- All 45 original page templates, explicit 404, sitemap and both LLM endpoints.
- Existing JSX rendered to HTML on the server, without RSC or page hydration.
  Only the two homepage counters hydrate; the article lightbox uses native browser
  JavaScript. Ordinary links replace client routing/prefetch.
- Original styles, fonts, metadata, aliases, screenshot mode and content sources.
- Responsive project/hero images using the Vercel image service; local preview
  uses a separate Sharp implementation and cannot prove production service behavior.
- Source fetch deduplication, TTLs, conditional requests, bounded stale recovery,
  error statuses and Vercel runtime cache. Adapter ISR expires after 60 seconds.
- Node 24 build/runtime, CI checks and no Next.js packages in the dependency tree.

See [architecture and release gates](MIGRATION.md) and [measurement plan](PLAN.md).

## Evidence collected

| Check | Result / scope |
|---|---|
| Clean installation | Node 24 `npm ci` passed |
| Type check | No errors or warnings; two hints |
| Contract tests | 13 passed (10 original contracts plus legacy image sizing/loading): cache/deduplication, 304, stale recovery, invalid JSON, optional 404, unseen content, redirects/errors, sanitizer/image restrictions |
| Production build | Passed; emitted Vercel runtime is `nodejs24.x` |
| Build contract | ISR expiration, image formats/widths/allowlist, special routes and absence of Next packages verified |
| Built-function smoke | Passed locally |
| Published URL inventory | 801/801 URLs passed locally, using the union of sitemap and archive feed |
| Interaction checks | No-JS article, counters, keyboard lightbox, focus/scroll restoration passed; strengthened pointer/network assertions also passed |
| Initial visual matrix | 48 viewport pairs; all non-home pages had zero pixels differing above threshold 20; homepage at most 0.041% due live counters |

The [initial visual report](astro-parity/VISUAL.md) predates final responsive-image
optimization and a screenshot-mode bottom-padding correction. It is intermediate
evidence, not the final release sign-off. Full-page checks across all 45 templates are complete: 90 desktop/mobile light
comparisons, 63 pixel-identical at threshold 20, no browser exceptions. Two version
detail captures initially had a 0.5 CSS-pixel geometry difference caused by font
variables being scoped to html rather than body. This was fixed; both follow-up
[full-page captures](astro-version-parity/VISUAL.md) are pixel-identical. Other differences include
optimized images and third-party embeds/maps. See the [full-page report](astro-template-parity/VISUAL.md)
and [comparison data](astro-template-parity/visual.json). The final [48-pair theme/screenshot matrix](astro-final-parity/VISUAL.md) is
complete: matching dimensions and metadata throughout, no browser exceptions,
zero differing pixels on blog, both articles and life at that time (before
legacy-image restoration below); home differences at most
0.064% from live counters, projects at most 1.62% after image optimization.
The complete [48-sample local performance diagnostic](astro-local-performance/REPORT.md)
passed the proposed lab timing/transfer budgets. All six mobile median LCP values
were 1.36–2.29 seconds; median performance scores were 98–100. Every sample had
CLS below 0.1. Projects transferred 363,151 image bytes on mobile (about 355 KiB).
The candidate has no RSC traffic or article React hydration. External-script byte
counts do not include inline scripts embedded in HTML.

These measurements precede the final semantic homepage landmark and hidden
descriptive life-link text changes. The homepage was rechecked in all eight visual
modes with matching dimensions and at most 0.048% pixel differences from moving
counters; follow-up Lighthouse checks are complete: [homepage](astro-home-final-performance/REPORT.md)
accessibility 100, and [life](astro-life-final-performance/REPORT.md) accessibility
and SEO 100. Mobile median performance remains 98 and 100 respectively.
The [source digest](astro-local-performance/source.json) identifies the measured
uncommitted candidate; the base Git SHA alone does not. Subsequent same-major
Vercel dependency overrides passed build, all 10 contracts, output verification,
smoke and the full 801-URL audit. They do not change browser assets; the earlier
measurement source manifests remain historical rather than being overwritten.

Additional focused full-page checks closed two earlier differences:
[code-heavy open-source detail](astro-code-font-parity/VISUAL.md) now differs by
0% on desktop and 0.0003% on mobile after the font fix. The notes page's 0.13%
difference was a date mismatch caused by the preview inheriting the shell's
Europe/Amsterdam timezone. The preview now explicitly uses UTC; the
[follow-up notes capture](astro-notes-utc-parity/VISUAL.md) is pixel-identical.
Verify deployed dates against the source timestamps as part of the rehearsal.
 Raw screenshots and Lighthouse reports are ignored by
Git and must be archived separately when sharing evidence.

The local server executes the generated Vercel function, but does not emulate CDN
ISR, distributed runtime caching, deployment protection or production native image
transforms. Local performance cannot establish a production improvement.

## Baseline and known limitations

The [production baseline](2026-10-26-baseline/REPORT.md) contains 48 Lighthouse
runs. Mobile median LCP ranged from 2.67 seconds on the text article to 11.05
seconds on projects; projects transferred 7.71 MiB of images. These measurements
motivate image work as well as removing framework/prefetch traffic.

- Historical `/images/blog/...` assets return 404 on the original production
  deployment. They are now repaired in the candidate: 56 byte-identical originals
  were recovered from this site's Git history at commit
  `82c8a7a9cd1fd2ff9f0a4bed9e08bc3574c18686` (2,338,005 bytes). The
  [provenance manifest](legacy-assets.json) records source URLs and Git blob hashes;
  build verification checks every emitted file against those hashes and verifies
  the declared PNG dimensions. All 17
  podcast article images load in the interaction test without interception or
  fixtures, and keyboard/pointer lightbox checks pass against the restored images.
  This intentionally changes the broken-image appearance in earlier parity
  reports. Restored raw HTML images reserve their original dimensions and use
  native lazy loading; explicit author dimensions/loading are preserved. The
  [8-run repaired-article audit](astro-restored-lazy-performance/REPORT.md) scores
  100 performance on both devices, with mobile median LCP 1.58 seconds and
  zero CLS. The [intermediate eager-image audit](astro-restored-article-performance/REPORT.md)
  documented the contention that this lazy-loading change fixed. These results
  supersede the older image-article measurements, which included broken assets.
  [Eight full-page light/dark normal/screenshot comparisons](astro-restored-article-parity/VISUAL.md)
  record this intentional content repair: the candidate contains the original
  artwork, so its full-page dimensions differ from the broken production page.
  Styling, metadata and route structure remain unchanged; do not interpret these
  expected differences as pixel-identical production captures.
- All 54 Google Books HTTP cover URLs are normalized to the same HTTPS URLs;
  article originals and cover pixels are preserved. Third-party
  Mapbox/YouTube/avatar/book assets can fail or render differently
  between origins/captures. Full-page event captures show these differences;
  production-domain Mapbox behavior must be checked on the deployed candidate.
- PageSpeed field-data requests returned quota errors (429). Field INP and other
  CrUX metrics remain unknown; lab TBT is not a substitute for INP.
- Scoped same-major Vercel dependency updates removed all high-severity findings.
  The current audit reports 3 affected entries (1 low, 2 moderate, 0 high). See
  [dependency assessment](DEPENDENCIES.md) for remaining build-tool exposure and
  compatibility checks. No breaking override has been applied.

## Deployed verification — 2026-10-27

Vercel authentication and linking succeeded. The existing project is
`anandchowdhary-com`, in `anand-chowdharys-projects`; preview protection remains
enabled. The current normal candidate is
[`dpl_CrZ6mtm18TyJ5Umki8QwFfpiAhjX`](https://anandchowdhary-mx4xbr5bd-anand-chowdharys-projects.vercel.app),
source digest `3e5497ef862107c04f6c3c75720642a91e33dfc577a2b07e887c31fc9550ae5e`.
See [source manifest](2026-10-27-deployment/runtime-fixed-upload.json).

- Cloud clean install, build, output contract and isolated packaged-runtime checks pass.
- Authenticated deployed smoke and all **801/801** published URLs pass.
- Browser checks pass: decoded native hero, no RSC/Next requests, readable no-JS
  content, animated counters, HTTPS book covers, all 17 restored podcast images,
  pointer/keyboard lightbox, focus and scroll restoration; no browser exceptions.
- [48 deployed visual pairs](astro-deployed-parity/VISUAL.md) have matching
  viewport geometry and metadata. Differences reflect repaired historical artwork,
  optimized image encoding and moving counters; they are not all pixel-identical.
- Native image service returns WebP for supported Accept headers, and rejects
  unapproved origins. Remote image cache HIT and portrait MISS were observed.
- A sampled 30-minute candidate runtime log query returned no warnings/errors.
- [Controlled cache rehearsal](2026-10-27-deployment/cache-rehearsal.json) passed
  on a separate protected deployment, using actual persistent Vercel Runtime Cache
  and actual blog routes/ISR. It proves absent/new content, conditional 304,
  bounded stale fallback, expired/cold-source 503, recovery and actual wall-clock
  60-second ISR regeneration without rebuilding. Source TTL advances used a
  logical clock; the test did not wait an hour. Test records were cleaned up.

Two earlier previews exposed deployed-only sanitizer packaging failures: CJS/ESM
loading and an untraced `dayjs` dependency. Explicit bundling fixes both. The new
`verify:runtime` check copies the generated function outside this repository and
executes it with strict Node loading, preventing workspace dependencies from
masking missing deployed files. CI and Vercel builds both run this guard.

The rehearsal deployment contains isolated test routes and **must never be
promoted**. The normal candidate contains no injected rehearsal middleware/routes.

## Final candidate measurements and source release

The deferred-counter candidate is `dpl_BGKZKDxmnFUHQajm8Waed77vP4qD`; the same
application is staged with production environment settings as
`dpl_GtvrCfeU4whTETEfRTZqr2JLe7rK`, without moving either public custom domain.
The source manifest is [lazy-counter-upload.json](2026-10-27-deployment/lazy-counter-upload.json).

The [fresh deployed comparison](2026-10-27-deployment/COMPARISON.md) now contains
48 candidate runs, 48 fresh production runs and 16 raw-image control runs.
All automated timing/transfer gates pass: six mobile median LCP values
**1.22–2.05 seconds**, performance **99–100**, every sample CLS below 0.1,
project mobile image transfer **362,480 bytes** (about 354 KiB, 95.5% below the
initial 7.71 MiB baseline), and no RSC requests. The
[article script check](2026-10-27-deployment/article-script-budget.json) records
1,570 compressed inline bytes per article and no application React script.

The raw-image control is essential: projects still take about 10.6 seconds with
original images, versus 1.38 seconds optimized. Most of that page's LCP gain comes
from image delivery. The text article improves with framework/prefetch removal
before image optimization as well. These are measured slices, not attribution of
every improvement to Astro. Full reports retain ranges and audit limitations.

Final Node 24 type checks and all 13 contracts pass. The staged production build
passes smoke and strengthened browser checks, including deferred counter hydration,
no-JS article content, all 17 restored images and lightbox interactions. The cloud
build also passed output verification and the isolated packaged-runtime guard.
See [rehearsal details](2026-10-27-deployment/REHEARSAL.md).

The migration is published in [PR #304](https://github.com/AnandChowdhary/anandchowdhary.com/pull/304).
The account owner enabled workflow edits on 2026-10-28, resolving the initial
GitHub OAuth permission blocker. The proposed Node 24 build/contracts workflow
has now been added to the PR, alongside the retained production smoke/link audit.

## Remaining release work

The staged production full inventory passes **801/801**. The final
[homepage visual recheck](astro-deferred-home-parity/VISUAL.md) covers all eight
desktop/mobile light/dark normal/screenshot modes; dimensions and metadata match,
with at most 0.0632% pixel differences from live counters.
[Verification record](2026-10-27-deployment/staged-verification.json).

1. Review PR #304 and its repository CI; align project framework/Node defaults
   with Astro/Node 24 as part of source cutover.
2. Switch production atomically using the validated application source, then rerun
   smoke, browser interactions, native image/query/error checks, full inventory,
   crawlability checks and observation through an ISR expiry.

Original production/rollback deployment remains
`dpl_Hp4R8Z5uCBdUWdT1bdUPhnZCC14N`. Its immutable URL and original project settings
are recorded in [before.json](2026-10-27-deployment/before.json). The original
project defaults remain Next.js/Node 22; candidates explicitly use Astro/Node 24.
Production has not yet been switched. No cost savings or field-metric improvement
is claimed from these checks.
