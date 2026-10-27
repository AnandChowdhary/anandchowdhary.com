# Vercel migration rehearsal — 2026-10-27

Production remains on `dpl_Hp4R8Z5uCBdUWdT1bdUPhnZCC14N` until the final release
checks pass. Authentication succeeded as the project owner; preview protection
remains enabled. No DNS or content-source changes were needed.

| Deployment | Purpose | Result |
|---|---|---|
| `dpl_5VAYQnFnAMhW6zNt4b3gLf1LRjR9` | Initial Astro preview | Rejected: sanitizer CJS/ESM runtime failure |
| `dpl_9i76RLuVYR3qCFqWH1wvTd8en9Kv` | Partial sanitizer bundle | Rejected: untraced `dayjs`, 77 open-source detail failures |
| `dpl_CrZ6mtm18TyJ5Umki8QwFfpiAhjX` | Correct packaged runtime | Smoke, 801 URLs, interactions, 48 visual pairs pass; homepage LCP budget failed |
| `dpl_GuAE4jb7L9LB3K9ECTJygovkNSYy` | Isolated cache fixtures | All 11 samples pass; never promote |
| `dpl_F99ftap5jDCDPbgk6pJ3N4uJeQcv` | Raw-image control | Protected measurement only; never promote |
| `dpl_BGKZKDxmnFUHQajm8Waed77vP4qD` | Deferred counter runtime | 48 samples complete; all mobile median LCP budgets pass |

The corrected-runtime source is captured in `runtime-fixed-upload.json`. The
counter candidate is captured in `lazy-counter-upload.json`; its digest hashes
JSON of the path-sorted uploaded-file records. Upload manifests exclude environment
files, authentication config, local builds and raw browser artifacts.

## Cache and freshness

[cache-rehearsal.json](cache-rehearsal.json) records actual Vercel Runtime Cache
(request-context backend), real blog page rendering and actual 60-second ISR.
The isolated copy adds guarded fixture control/middleware; production app files
receive no test routes. Source TTL is advanced with a logical clock, not an hour
of wall-clock waiting. ISR expiry is observed with real elapsed time:
HIT age 2 → STALE age 61 → HIT age 0, with updated content without rebuilding.

The samples establish absent/new slug behavior, fresh source reuse, source
refresh, conditional 304, upstream retry and bounded stale fallback, expired
and cold failures returning 503 rather than 404, and recovery. The test uses
separate cache namespaces; its control/source records were deleted after use.
The normal candidate's source feeds remain the original public repositories.

## Runtime and images

`verify:runtime` executes the emitted function outside the checkout with empty
NODE_PATH and strict Node module loading. This reproduces the dependency-tracing
failure that local execution inside the workspace concealed. The fixed cloud
build passes this guard. All 801 live published URLs then passed on Vercel.

Native image probes with WebP Accept returned a 1,568-byte remote WebP (HIT),
a 9,086-byte portrait WebP (MISS), and 400 for an unapproved origin. Requests
without WebP Accept can correctly return JPEG/PNG. These are service/cache
observations, not billed transformation counts or cost estimates.

API building-to-ready interval: original deployment 47.234 seconds; deferred
counter preview 40.666 seconds, including output/runtime guards. These builds
have different source, cache and target conditions; they do not establish a
repeatable build-time improvement. Actual billed function/image usage and cost
have not been obtained. No cost-saving claim is justified.

## Measurement qualifications

The first full deployed 48-run matrix has five mobile and three desktop samples
per route. All mobile medians except home meet LCP ≤2.5 seconds; home is 2.737
seconds (range 2.537–3.110). Its 77.1 KiB script transfer included the counter
runtime fetched eagerly despite visibility-based hydration. The next candidate
puts the dynamic import inside the visibility observer, preserving server HTML
and downloading the runtime only when a counter approaches the viewport.

Protected previews intentionally receive Vercel `x-robots-tag: noindex`; their
SEO score of 63 reflects that protection. Production crawlability must be checked
on the custom domain after cutover. Desktop previews also load Vercel's external
feedback toolbar (23,581 bytes in the sampled text article); reports retain its
transfer rather than pretending it is application code. Mobile text articles
load only analytics externally; the inline screenshot script is reported
separately when checking the first-party JavaScript budget.

Existing external assets return 404: the homepage's Forbes Twitter avatar and
the life page's GitHub contributions SVG. These reduce best-practices to 96 in
some samples. The migration preserves those sources; no replacement artwork or
fabricated contributions have been introduced. This is an explicit limitation
against the 100 best-practices target. Accessibility is 100 across the initial
full deployed matrix. Historical podcast artwork has instead been repaired with
byte-identical originals and is an intentional content difference from production.

The raw-image control retains Astro and non-image migration fixes, restores
project-card lazy loading and bypasses responsive transformations. It is measured
only on text and projects, whose assets are unchanged, to distinguish removal of
framework/prefetch traffic from image delivery. It is not a claim that every
non-framework variable is held constant. The repaired historical image article
is excluded from this control because production has broken images.

The deferred-counter matrix is complete: home mobile median LCP **2.036 seconds**
(range 1.952–2.161), performance 99 in all five runs. Mobile medians across all
six routes are 1.22–2.05 seconds; all sample CLS values are below 0.1. The
counter runtime still downloads within these complete Lighthouse navigations
when the visibility observer triggers; total home script bytes are not reduced.
The change moves the fetch behind the observer rather than reducing bundle size.

The fresh production and raw-image control runs are now complete; see
[COMPARISON.md](COMPARISON.md) and [budgets.json](budgets.json). All automated
release timing/transfer budgets pass. The raw-image project control has a desktop
LCP regression (3.68 seconds versus 0.63 seconds on Next); this unoptimized
experimental variant is not a release candidate. The responsive-image release
candidate resolves it (0.36 seconds). Original lazy loading and different largest
paint candidates make raw-image framework attribution unsuitable for a blanket
speed claim.

A production-target build is staged as `dpl_GtvrCfeU4whTETEfRTZqr2JLe7rK` (Node
24/Astro), with no custom-domain promotion. Its building-to-ready interval was
49.408 seconds. Both public custom domains were verified by the alias API to
remain on the original Next deployment after staging. Its smoke, browser
interactions and article script budgets pass.

Source publication is currently blocked by GitHub OAuth workflow scope. The
initial push was refused; no source was pushed and no substitute credential was
used. The migration source is committed locally. The owner must enable workflow
edits for this GitHub integration before source cutover and production promotion.
