# Publishing and reader experience follow-up

## Collection profiling and deduplication

Collection profiles now record inventory, route validation, discovery and image
phases, slow routes, actual network attempts (status/bytes/duration), and resolved
source record writes. `performance.now()` measures elapsed time independently of
the frozen content clock. Durations of concurrent operations overlap; summing
network or record durations does not give wall time or CPU time.

The initial live sample took 61.26s: inventory 8.21s, route validation 47.06s,
discovery 0.15s, image originals 5.78s. There were 21,184 resolved source record
writes for 716 unique inputs. Collection now shares one source context across
route validation and records each logical source/policy once, while returning
independent response bodies to consumers. Required sources still refresh each
new collection; optional expiry, validation and outage policy remain unchanged.
A failed snapshot write fails every consumer. Discovery still walks reference
views; a fully explicit content graph is future work.

The controlled comparison pre-populated two unsealed directories with the same
716 inputs and collection timestamp. Both used the record path, with no network
requests. Before: **25.44s**, 21,184 records; after: **13.89s**, 593 records.
The candidate validates one additional route, `/search` (1,511 vs 1,510).
Both seal to the exact same snapshot ID:
`dfd2c7ab1e21fd11710805ad2541a871477af5548eda9136e1985518f4cde3fa`.
Bodies, headers and statuses are identical. These are single local samples, not
repeated production benchmarks. See [before](fixed-before.json) and
[after](fixed-after.json).

A subsequent fresh-network candidate collection took **33.98s**. The
[live samples](live-after.json) are diagnostics; network/cache conditions differ
from [the initial sample](live-before.json), so do not claim a controlled 61→34s
network speedup. Profiles are copied into the retained input artifact and phase
summaries appear in Actions. `CONTENT_PROFILE_PATH` overrides the local profile
path, which defaults to `.cache/collection-profile.json`.

## Static search and discovery

`/search` indexes the full visible body of 90 canonical articles and projects,
plus titles/descriptions. Aliases, other page types and shared navigation are
excluded. The index is generated from published HTML; no additional sources or
browser services are needed. Drafts omitted from production are not indexed.
Title matches rank above description/body matches; every query term must match.
Queries normalize accents/case and support article/project filtering.

The JSON index is 311,873 bytes, about 100.6 KiB gzipped in this capture. Only the
search page loads search code, and it fetches the index only after a nonempty
query. Matching runs in the browser without a search API or analytics service. URLs
preserve queries and category selection; sharing or reloading those URLs sends
the query in the normal page request to the host. Results use DOM text nodes. Keyboard users can
Tab through results or use ArrowDown from the input; Escape clears the query.
Counts and load errors use a polite status region. A failed download can be
retried; recent article/project links and archive navigation remain available
without JavaScript. Search is noindex to avoid query-page duplication.

Search entry links appear on the blog, archive and footer. Browser checks cover
ranking, filters, URL reload, keyboard focus, empty/no results, no-JavaScript
browsing, failure/retry, and both root and project base paths. Mobile light and
desktop dark layouts were inspected without horizontal overflow.

## Local homepage images

Four inline logos and four project preview backgrounds now use committed WebP
files: 93,352 bytes total. They replace eight remote URLs, including all four
homepage wsrv.nl calls. Inline logos declare dimensions. Builds no longer fetch
these assets. [Sources and hashes](../../operations/home-assets.json) document
provenance; `npm run assets:refresh` is an explicit maintenance command that
requires network access and changes files for review. Some refresh source URLs
still use the original image proxy; visitor requests do not.

The generated HTML image audit drops from 1,166 to 1,158 unique external image
URLs. [Audit summary](external-images.json). This is a URL inventory, not an
availability test or browser request count. `npm run audit:images` writes the full
inventory locally. Book covers, maps, badges, historical content and other
external images remain; they require separate freshness/size decisions.

All eight full-page [homepage comparisons](home-visual/VISUAL.md) retain document
and shared layout dimensions with no browser exceptions. Pixel changes are
expected from WebP conversion, the new footer link and live counters; the maximum
fraction above RGB threshold 20 is 0.411%. Mobile rendering was inspected.

## Remaining roadmap

- Notes/life publication hooks still need a valid credential with Actions write
  access to the website. Available secret names were rechecked; no suitable
  dispatch secret was added. The documented earlier 401/403 results still apply;
  hourly publishing remains in place. No interactive login token was persisted.
- Profile additional production collections before deciding whether replacing
  reference-view input discovery with an explicit graph is worth maintaining.
- Extend image localization selectively using the audit, preserving freshness for
  changing book covers, maps and service badges.
- Curate article topics and related reading before generating topic pages;
  existing chronological navigation and the new full-text search are available.

## Validation

All 28 tests pass, including concurrent consumers/record deduplication, failed
snapshot writes, search ranking, canonical HTML extraction and aliases. Astro
reports zero errors, warnings or hints. Offline output verification covers 1,511
routes and search result destinations; smoke and the 801-URL published inventory
pass. Existing browser interactions pass image decoding, both animated counters,
17 restored article images, keyboard/pointer/focus lightbox behavior and no
exceptions. Root/project search checks pass all scenarios listed above.

## Production release

Commit `42cb70ba31427c3f9479cd77b86b296fdcd85672` deployed successfully in
[Pages run 41234325454](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41234325454).
Build, type checks, all 28 tests, offline verification, 801-URL audit, snapshot
retention, deployment, freshness smoke and incident reporting all succeeded.
Production search and existing article/counter/lightbox browser suites pass.
All eight local homepage assets byte-match their committed files on the CDN.

The downloaded production artifact includes `collection-profile.json` and all
716 input bodies; manifest and body hashes were verified. Its collection took
28.24s on the Actions runner, with 593 resolved-source writes and 716 network
attempts. This is a production observation, not a controlled speed comparison.
See [profile summary](roadmap-production-profile-summary.json),
[release receipt](roadmap-production-release.json),
[search checks](roadmap-production-search.txt) and
[existing interactions](roadmap-production-interactions.txt).

The retained full-generator experiment also passes output verification and the
new search browser suite; it remains an experiment, not the deployed renderer.
