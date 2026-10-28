# Next.js → Astro migration

**2026-10-28:** The user superseded the Vercel hosting decision and approved
GitHub Pages. See [the active static conversion](GITHUB-PAGES.md); runtime ISR,
source-cache and HTTP redirect requirements below describe the former Vercel
candidate, not GitHub Pages capabilities.

Status: implemented in the repository root; production promotion remains pending.
The separate Astro candidate was built, type-checked and exercised against the
original site before replacing the root app. See [implementation status and
verification evidence](STATUS.md). The original Next.js deployment remains the
comparison/rollback reference; this workspace has not promoted a Vercel deployment.

## Architecture decisions

| Area | Decision | Reason |
|---|---|---|
| Framework | Astro with TypeScript and a server-only React HTML renderer | HTML-first routing; reuse existing JSX without automatically hydrating it |
| Hosting | Keep Vercel and Node 24; use the official Vercel adapter | Isolate the framework change from DNS, CDN and hosting changes |
| Rendering | On-demand rendering with adapter ISR, explicit 60-second expiration for content routes | New external content must appear without rebuilding the site |
| Static output | Prerender only genuinely fixed pages/assets after checking their data dependencies | Avoid freezing dynamic feeds into a static build |
| Navigation | Ordinary anchors; no router or automatic prefetch | Remove RSC prefetch and its observed image traffic |
| CSS | Keep Tailwind v4, typography, scrollbar plugin, existing classes and dark mode | Preserve the design while moving rendering |
| Fonts | Self-host the same Geist Sans/Mono faces, subsets and weights | Replace `next/font` while retaining metrics and avoiding shifts |
| Images | Responsive HTML image component with Vercel image service | Fix oversized project assets without adding a new image provider |
| Interactivity | Browser script for lightbox; two narrowly scoped React hydration roots for counters | Preserve behavior while restricting hydration to the components that need it |
| Analytics | Adapter's Vercel Web Analytics integration, enabled only once | Replace `@vercel/analytics/next` without double counting |
| Content | Keep external GitHub/GitHub Pages sources and existing normalization/lookup logic | No CMS or content-repository migration |

The isolated candidate phase is complete. `src/pages/` now contains explicit Astro
routes, and the retained JSX lives in `src/views/`. Root development/build scripts,
TypeScript config and dependency lockfile use Astro; the Next.js configs and
packages have been removed. A clean Node 24 install/build has been exercised.

Astro owns the document, metadata, routes and deployment. Existing async JSX
sections are resolved by a small server-only bridge using
`ReactDOMServer.renderToReadableStream()` and `allReady`. This preserves the JSX
markup without sending RSC or hydrating page containers. It does not require the
Astro React integration. Only the homepage counter module imports ReactDOM's
browser hydration API. The old plan to rewrite every async section into a separate
loader was unnecessary once this rendering path was built and verified.

## Source inventory and route parity

The checkout contains **45 page templates**, **12 section families**, two explicit
route handlers, and the generated sitemap. This is a file-template count, not the
number of published URLs. Build the published URL inventory from a fresh sitemap
and archive feed at implementation time; the baseline does not freeze those feeds.

| Existing URL shape | Families / pages | Candidate behavior |
|---|---|---|
| `/`, `/about`, `/now`, `/mentoring`, `/contact` | Five top-level pages | Same content, metadata, layout and source links |
| `/{section}`, `/{section}/{year}`, `/{section}/{year}/{slug}` | blog, books, events, life, location, notes, open-source, press, projects, themes, versions, videos | Explicit Astro routes and shared pure loaders; live lookup on an unseen slug |
| `/archive`, `/archive/{year}` | Aggregated external archive | Keep chronological grouping, year navigation and OKR exclusion |
| `/life/food` | Nutrition view | Keep CSV parsing, date handling and derived totals |
| `/projects/tags/{tag}` | Project tags | Keep slugification, tag Markdown, image resolution and filtering |
| `/sitemap.xml` | Generated sitemap | Same production origin and existing published URLs |
| `/llms`, `/llms.txt` | HTML and plain-text discovery endpoints | Preserve content types and links from shared sitemap data |
| favicon, icon and public assets | Existing static files | Preserve published paths or explicit compatibility redirects |

Extract route-independent code from `app/api.ts`, `app/lib/markdown.ts`,
`app/lib/opengraph.ts`, `app/projects/get-image-url.ts`, and the sitemap generator.
Replace Next metadata types with plain domain types. Preserve URL and Unicode
normalization, UTC year extraction, stable seeded hero-image selection, relative
Markdown asset resolution, repository HTML sanitization, and previous/next order.

Use named routes, not a universal catch-all. Preserve `/life/food` and
`/projects/tags/*` precedence. Characterize existing empty-year responses before
changing them: an absent item is a 404, but an empty four-digit year is not
necessarily a 404 in the current implementation.

### Redirect and error contracts

Keep existing 307 legacy short-slug redirects and 308 canonical-alias redirects,
including their destinations. At minimum, retain these smoke-test cases:

- `/press/2017/your-story` → `/press/2017/yourstory` (308).
- `/open-source/2014/essential.css` → `/open-source/2014/essential-css` (308).
- `/location/2014/japan` → `/location/2014/tokyo-jp` (308).
- `/videos/2017/bharat-hacks-live` → `/videos/2017/bharathacks-live` (308).

Keep press publisher matching, repository slug/name matching, and the location
country-to-city commit-hash/country-code fallback. Unknown slugs must return a real
404; upstream fetch failures must return an error status rather than impersonating
missing content. A newly published item absent from the build must resolve on a
new request after source cache expiry. Do not replace this with build-only
`getStaticPaths()` enumeration.

The README mentions `/api/blog` and `/api/projects`, but this checkout contains no
handlers for them. Check production and archive links before deciding whether any
compatibility route is needed; do not invent replacement APIs from stale README
text. Preserve current sitemap scope initially, including its omission of location
URLs; any expansion is a separate SEO change.

## Content caching, freshness and failure behavior

Use two explicit layers to replace the current Next route/data caches:

1. **Rendered HTML:** Vercel adapter ISR, expiration 60 seconds for dynamic content.
   Set expiration explicitly: enabling ISR alone can retain a page for a deployment.
2. **Source data:** a `SourceCache` interface backed by Vercel Runtime Cache via
   `@vercel/functions` `getCache()`, with an injected deterministic implementation
   for local tests. Preserve the existing 3600-second TTL on the helpers that use
   it. Audit raw Markdown and other fetches individually; do not silently assign
   every request a one-hour TTL. Deduplicate repeated reads within a render.

Store only successful, validated data. Include fetched timestamp and optional
ETag/Last-Modified, use conditional requests when supported, and bound fetch
timeouts/retries and concurrency. Treat the runtime cache as evictable and
region-local; a cache miss must work on a cold function. Never depend on a module
Map or local filesystem for persistence across Vercel instances.

For a source record beyond its fresh TTL, attempt refresh. On upstream failure,
serve a previous successful source record only if it remains within a documented
24-hour maximum stale window and is still present; log that fallback. Otherwise
return 503 with Retry-After. Keep a last-good record up to that stale bound instead
of deleting it at the fresh TTL. Do not cache invalid JSON, error bodies or a false
empty result. A removed item becomes a 404 once a successful fresh source confirms
its absence. Optional sections may retain existing fallback behavior where it is
already intentional.

Adapter ISR can extend staleness on refresh failure independently of source data.
The deployed spike must establish that interaction, error caching and recovery;
the source stale bound alone is not an end-to-end HTML freshness guarantee. Exclude
routes requiring stricter behavior from ISR if necessary. Keep unknown-slug negative
caches short enough that new posts become reachable; prove the chosen response
headers/adapter behavior on Vercel rather than assuming them from a local server.

TTL-based expiry is the initial invalidation policy. A one-hour source TTL plus a
one-minute page TTL is an approximate healthy refresh envelope, not a guaranteed
publication SLA. Verify it with a mutable fixture. Add publish-trigger invalidation
only if a shorter freshness requirement emerges; no new webhook infrastructure is
required for the migration.

### Screenshot mode and query parameters

The official adapter documents that **ISR function requests omit search params**.
Do not port `useSearchParams()` to server frontmatter and expect screenshot mode
to work. Put a tiny synchronous inline script in `<head>` that checks
`location.search` for `screenshot=true` and sets a root data attribute before paint.
CSS applies the current compact padding, spacing and header zoom from that
attribute. The same cached HTML can then safely serve both modes.

Scope it to presentation; content, metadata and routing cannot depend on this
client flag. Preserve the screenshot service URL generated by
`buildScreenshotOpenGraphImageUrl()`. Test both modes in both request orders on a
warm deployment, at the screenshot viewport, with fonts loaded. Do not introduce a
hydrated Container island. Default content remains readable with JavaScript off;
screenshot styling requires the small script, as the current client query handling
does. If a CSP is introduced, account for this inline script explicitly.

## Component and asset migration

| Current dependency / behavior | Replacement and parity check |
|---|---|
| `next/link` | `<a href>`; keep accessible labels, focus rings, active links, modifier-click and back/forward behavior |
| Async page/section functions | Astro frontmatter or plain loaders, followed by synchronous rendering |
| `next/navigation` | Astro params/redirect/response status; explicit 404 page and exact redirect codes |
| Next metadata/layout | Shared Astro document layout with per-route metadata; no duplicated head tags |
| `next/font/google` | Local licensed WOFF2 assets, matched font-face metrics/display, critical preloads |
| `next/image` and raw content images | Astro image pipeline for cards/hero; retain direct original for lightbox; remote allowlist, widths, sizes, aspect ratio and priority |
| Static signature and location `useMemo` | Server-rendered markup/calculations, no hydration |
| `BlogContentWithLightbox` | Small page-local script with image delegation, focus return, Escape, close button, scroll lock and existing animation; works only on images |
| Birthday and fitness counters | Two small `client:visible` React islands with stable SSR values; preserve formats, intervals, reduced motion, and no layout jump |
| React `ViewTransition` | Native cross-document CSS transitions with the signature named; normal navigation fallback; respect reduced motion |
| Vercel Analytics Next component | Adapter web analytics; exactly one integration and one pageview per navigation |

Keep existing counter semantics initially: the fitness display increments locally
every 8.8 seconds; it is not a live sensor feed. Avoid changing that behavior as an
accidental side effect of moving frameworks. Keep NumberFlow React for the first
parity pass; a smaller native replacement can be evaluated separately.

Article routes must not load React/ReactDOM in the browser merely because some
markup was rendered by React on the server. Expected browser code there is the
screenshot script, analytics, and lightbox only where needed. No global Astro
client router or automatic prefetch. Native CSS transitions do not require one.

Convert remote images using a reusable card/hero component with explicit sizing,
responsive widths and `sizes`. The first visible project card must not be lazily
loaded; below-fold cards remain lazy. Handle SVG/GIF assets intentionally and do
not destroy animation/transparency. Restrict remote origins/paths to known content
sources. Verify the generated Vercel image endpoint on a deployed candidate and
record image transformation usage/cost. Do not assume changing `<img>` tags alone
optimizes Markdown images.

## Implementation sequence and reviewable deliverables

| Step | Work | Completion evidence |
|---|---|---|
| 1. Contracts and scaffold | Isolated Astro app, pinned tools, Node 24, adapter/React/Tailwind, extracted domain types, frozen representative fixtures and route inventory | Candidate builds independently; root Next app still builds; alias/year/missing-content contracts have focused tests |
| 2. Deployed vertical slice | Shared document/header/footer, blog index/year/detail, both baseline articles, lightbox, screenshot mode, source cache and ISR | Accessible candidate deployment serves new unseen fixture content, 404/503 correctly, refreshes after TTL, isolates screenshot styling, and loads no article React runtime |
| 3. Images and remaining content | Projects including tags, books/notes/events/themes/versions, open-source/press/videos/location | All route-specific content/aliases match; responsive images verified; repository sanitization and relative assets retained |
| 4. Aggregations and islands | Home, life/food, archive, other top-level pages, counters, fonts, native transitions | Light/dark responsive screenshot comparisons, keyboard checks, counter tests, full route inventory and endpoints pass |
| 5. Deployment rehearsal | Sitemap/LLM outputs, analytics, adapted audits, cache/error recovery checks, full performance matrix and build measurement | Deployed candidate passes correctness and performance gates; exact candidate SHA and toolchain recorded |
| 6. Cutover and cleanup | Promote candidate using an atomic Vercel deployment switch; verify project settings and promote the root Astro app | Production smoke succeeds; rollback target retained; Next dependencies removed only after imports/output are clean |

The implementation and deployed correctness/visual/interaction/cache rehearsals
are complete. Step 5 performance comparison and step 6 production cutover remain
open. The isolated packaged-runtime guard also passes in Vercel's clean build.
See [STATUS.md](STATUS.md) for measured evidence and immutable deployment IDs.

Validate route families in the candidate, then cut over atomically. This avoids
mixed asset paths and broken cross-framework navigation. Production remains on
the original deployment until the release gates below pass.

## Validation and release gates

**Correctness:** Run the current smoke and link-audit scripts against a deployed
candidate and production after promotion. Expand coverage to sitemap-omitted pages
(`/location`, tags, food), temporary short-slug redirects, invalid years, real
missing slugs and the four canonical aliases. Compare the union of sitemap and
external archive-feed URLs; retain the explicit OKR exception. Assert metadata,
content types, embeds, image URLs, Open Graph screenshot output, raw response
status, and representative body content. No silent redirects to the homepage.

Use deterministic fixtures for data transformations, Markdown sanitization and
new-content/TTL/error tests; use live external sources for deployed smoke checks.
Use browser checks for lightbox accessibility, no-JS content, islands, back/forward,
screenshot query behavior, font/layout stability and responsive/dark design.
Build success alone cannot catch the runtime Vercel failure this repo previously
experienced. Existing `Age` monitoring is only a coarse canary; also exercise a
controlled source update and verify the new content appears after expiry.

**Performance:** Run the pinned six-route, five-mobile/three-desktop matrix from
[scripts/performance](../../scripts/performance/README.md) on the deployed candidate.
Re-measure current production close in time on the same runner and toolchain;
compare equivalent content/assets and record both deployment SHAs where available.
Do not compare a local Astro build with remote production Next.js as the release
benchmark. Separate the framework-only vertical-slice result from the later
image-optimized result so image savings are not attributed entirely to Astro.

Require removal of RSC requests and unrelated-page image preloads. Proposed lab
budgets: no browser React on article pages; <=30 KiB compressed first-party article
JavaScript (excluding the separately reported analytics payload); project mobile
image transfer at least 70% lower than the 7.71 MiB baseline; all six mobile median
LCP values <=2.5 seconds and CLS <=0.1 in every release run. These are targets, not
measured outcomes. Inspect variances and failures rather than masking them with a
median. Investigate any >10% median regression in desktop LCP or mobile TBT with an
absolute >=100 ms impact. Document and resolve a failed budget before cutover.

Correct the existing accessible-name, HTTP book-cover, broken-image and generic
life-link findings as part of component parity work. Target 100 accessibility,
SEO and best-practice scores for the audited pages; manually check keyboard and
screen-reader naming as well. A score is not proof of full accessibility.

Real-user goals remain p75 LCP <=2.5 s, INP <=200 ms and CLS <=0.1 by device. Field
data was blocked by API quota in the baseline; obtain it when available and monitor
after release. Do not delay validation by pretending lab TBT measures INP. Record
build time, cold/warm response behavior, function errors and image/runtime cache
usage; no cost or build-time improvement is assumed in advance.

**Operations:** Candidate authentication must permit whichever deployed audits are
used. Preserve protection; use the existing project's approved access mechanism or
run checks within an authenticated context. Do not assume previews are public.
Keep the current production smoke-on-deployment and weekly link audit; update their
implementation-specific comments without weakening status, alias or freshness
checks. Do not change DNS or move to Cloudflare in this migration.

## Cutover and rollback

Before promotion, save the existing production deployment identifier, candidate
identifier/SHA, validation results and project build/root settings. Verify both old
and new asset URLs remain deploy-addressable. Avoid deleting the old deployment.
On promotion, immediately run smoke plus the targeted query/image/unknown-slug
checks, then the full link audit. Watch function errors and representative pages
through initial cold requests and at least one ISR expiry cycle.

Rollback immediately for unexpected 5xx responses, missing content/aliases,
cache-mode contamination or a failed critical interaction. Restore the previous
production deployment and any changed root/build settings, rerun smoke, and retain
the Astro candidate for a fix. Domain and content stores stay in place, so rollback
does not require data conversion. The local root candidate already removes Next packages/config. Keep the old
production deployment and its source revision available independently so this
cleanup does not remove the rollback path.

## References checked while planning

- [Astro Vercel adapter](https://docs.astro.build/en/guides/integrations-guide/vercel/):
  on-demand rendering, image service, web analytics, ISR expiration and the warning
  that ISR requests omit search parameters.
- [Vercel Functions package](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#getcache):
  `getCache()` runtime cache interface. Verify limits, availability and behavior
  under the actual account during the deployed vertical slice.
- [Measured production baseline](2026-10-26-baseline/REPORT.md) and
  [findings](2026-10-26-baseline/FINDINGS.md).
