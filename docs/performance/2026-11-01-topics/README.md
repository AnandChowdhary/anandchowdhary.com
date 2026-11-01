# Topics, related reading and owned image reliability

## Reader discovery

Seven curated topics now cover the 46 currently published articles: AI and
agents, design and interfaces, engineering and open source, accessibility,
startups and building products, life and reflection, and tools and culture.
`/blog/topics` provides starting points; each `/blog/topics/SLUG` has an explicit
reading order. The blog and year listings link to relevant topic pages. Articles
link to their topics and up to three related articles. Suggestions prioritize
shared topics and then editorial order, with no self links or duplicate entries.
The existing chronological previous/next navigation remains available.

Membership is maintained in `src/lib/blog-topics.ts` using canonical year/slug
IDs. Newly published articles still publish normally before topic assignment.
Drafts and withdrawn/unpublished articles are filtered from topic lists and
recommendations. Empty topics are omitted from discovery and return 404. New
topic routes are included in the sitemap and HTML/text discovery endpoints.
Reserved `/blog/topics` paths are excluded from year/short-slug route generation.

All navigation and recommendations are rendered in HTML without hydration.
Topic pages have their own titles, descriptions, Open Graph and Twitter metadata.
They load no client modules; the lightbox is restricted to numeric-year article
routes. Search excludes the related-reading section so recommendations cannot
make an unrelated article match a query. The new index is byte-identical to the
previous public release across all 90 indexed documents
([comparison](search-index-comparison.json)). Search coverage remains articles and
projects; there is no usage evidence warranting fuzzy matching or new content
types yet.

## Owned illustration delivery

Decorative listing thumbnails now use the existing snapshot-backed static WebP
pipeline on blog, events, themes and open-source pages. Open-source detail-page
fallback artwork uses the same pipeline. Intrinsic dimensions and native lazy
loading are declared for thumbnails; detail heroes remain eager. Seeds, image
choices and styling remain unchanged except for the known missing source below.
This does not snapshot changing book covers, maps or badges.

The source repository contains 99 numbered images and lacks `85.png`. The new
required-image check detected its existing 404 on the open-source listings.
`src/lib/decorative-images.ts` explicitly selects 84 for index 85, shared by all
illustration consumers. All other failures still fail required collection. The
[reviewed source inventory](illustration-inventory.json) records this gap. Restore
85 only after verifying the source and deliberately updating this helper.

Across the four root listing pages, 81 distinct illustration URLs were referenced,
one missing. The 80 available PNG originals total 5,144,588 bytes; matching WebP
files total 161,874 bytes (about 97% less encoded data). These are unique encoded
file sizes, not measured page transfer or LCP. PNG sizes come from the candidate
snapshot, not a historical CDN capture. [Per-image evidence](thumbnail-bytes.json).

The full HTML audit drops from 1,158 to 1,077 unique external image URLs; no
`blog-images` originals remain in browser image attributes. Other historical
images, maps, covers, repository artwork and badges retain their current policy.
[Inventory summary](image-summary.json). The generated artifact has 134 optimized
source images, with 14,785,286 variant bytes; the previous output had 123 sources
and 14,764,824 variant bytes. Required snapshot inputs increase from 716 to 727.

## Collection observations and decision

Three successful retained production runs show 28.96s, 34.69s and 38.24s for
collection, with route validation taking 23.57–32.31s. Each records 593 resolved
sources. [Run IDs, phases and slow routes](production-profiles.json). These are
observations across different inputs/cache/network conditions, not a controlled
performance comparison.

A four-worker queue was tested as an alternative to the existing batches of
four. Three sequential, interleaved runs per scheduler used one sealed snapshot
`4955b494e77ec2f3a98718564abd59eca78b113dd34138cbd1113da3d6de7d92`,
a frozen clock and disabled TCP. Each validated the same 1,519 routes and 134
image originals. Warm medians were **10.09s batches** and **10.64s queue**. The
existing collector is retained. OS caches were uncontrolled; this measures
snapshot replay validation, not live network scheduling. An earlier exploratory
pair was excluded because concurrent checks affected its timings.
[Six measurements](queue-comparison.json).

An explicit content graph is deferred: the current source boundary is reliable,
and these profiles do not yet establish enough benefit to maintain a second
handwritten input graph. Monitor the retained profiles before changing this.

## Validation and remaining prerequisites

All 32 tests pass; type checking has zero errors, warnings and hints. Static
verification covers 1,519 routes and assets. Smoke and the expanded **809-URL**
published inventory pass. Browser checks cover topic navigation, related reading
without JavaScript, topic metadata, no topic client modules, thumbnail decoding,
mobile light/desktop dark overflow, unknown-topic 404s, search, counters, restored
article images and keyboard/pointer/focus lightbox behavior. Project-path tests
cover prefixed topic/article links and assets as well as search.

Notes and life still lack a suitable dispatch secret. Secret names were rechecked
on 2026-11-01; the previously documented GH_PAT 401/403 limitations remain, and no
interactive login token was persisted. The hourly fallback continues. Completing
those hooks requires a new repository secret with Actions write permission to
the website. No other credential change is required for this release.

## Production release

Commit `521053b3031fe8841f16d17ff7eb8ad1c22e1667` deployed successfully in
[Pages run 41291959239](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41291959239).
All build/check/test/audit/deploy/freshness/report steps succeeded. Public browser
checks pass topics, the repaired open-source illustration, no-JavaScript related
reading, metadata, responsive layouts, unknown-topic 404s, search, both counters,
17 restored article images and keyboard/pointer/focus lightbox behavior.
[Topics](nov1-production-topics.txt), [search](nov1-production-search.txt),
[existing interactions](nov1-production-interactions.txt).

All 727 retained input bodies and the manifest were hash-verified; the published
snapshot ID matches the retained artifact. Collection took 34.22s in this Actions
run, with 593 resolved-source writes and 726 network attempts (one optional input
was resolved from cache). This is an observation, not a controlled timing claim.
[Release provenance and profile summary](production-release.json).
