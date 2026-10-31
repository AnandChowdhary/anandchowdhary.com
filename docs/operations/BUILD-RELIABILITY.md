# Static publishing and source policy

The production site remains static Astro on GitHub Pages. React renders most
views at build time; it is not an article runtime. The contact page and blog bodies use native Astro markup, sharing the existing
header/footer and icons.

## Source classification

| Source | Policy | Failure behavior |
|---|---|---|
| Canonical content APIs, archive, location history, markdown and repository content | Required (existing explicitly optional missing README/404 behavior retained) | A failed required source fails the build; do not publish error HTML or erase content |
| Life, food, coding, walking, sleep and music datasets used by published pages | Required | Fail rather than replace real measurements with invented zeroes |
| GitHub contribution count/calendar | Optional, public GitHub calendar | Validate calendar structure before caching; bounded last-good snapshot, then explicit unavailable state |
| Owned article and responsive image sources | Required | Image processing/source failures fail the build |
| Decorative external avatars | Browser assets | Press icons are local, sized WebP assets; other avatars retain their sources |

`fetchSource(..., { optional: true, ttl: 3600, validate })` is the explicit
optional-source boundary. The default remains required. Optional snapshots live
in `.cache/optional-sources`; only successful, validated responses enter them.
The Actions cache carries these across builds on main; PRs cannot save them.
Required sources are never persisted by this cache. Their process-local cache
continues to deduplicate requests within a build.

After one hour, optional sources revalidate. On a network failure, 429 or 5xx,
a last-good snapshot can be used for at most 24 hours from its last successful
fetch/revalidation. A 404 does not revive old data. Corrupt cache files are cache
misses. An HTML error page from GitHub cannot replace a valid calendar. Stale
calendar output shows its last update date; an unavailable calendar renders a
link to the profile. GitHub controls this public HTML format, so parser changes
remain possible and safely fall back rather than blocking publishing.

The locally rendered calendar uses only validated dates and numeric levels, not
upstream HTML. It replaces the dead deno.dev JSON/SVG service. Forbes and CSS-Tricks icons come from their official homepages; other press
icons retain the authored image sources. All eight are stored locally as 32px
WebP assets for their 16px rendered size. Source URLs, hashes and byte counts are
recorded in [press-assets.json](press-assets.json). This removes two broken
Twitter URLs and the remaining press-avatar CDN dependency.

## Publication triggers

The website supports main pushes, manual dispatch, content dispatch and hourly
scheduled fallback builds. Eight content repositories now have
`.github/workflows/rebuild-site.yml`: blog, location, books, events, themes,
versions, projects and featured. Their existing `WORKFLOW_DISPATCH_TOKEN`
credentials were tested successfully against the website. Hooks receive the
legacy Pages `page_build` event and dispatch only when the publication is built.
They deliberately do not trigger on their own source commits before publication.
The website itself continues using official Actions artifact deployment.

The shared template is [rebuild-site-workflow.yml](rebuild-site-workflow.yml).
[Installation receipts](publication-hooks.json) record commits. Location's real
Pages publication triggered successful hook run 41216858552, establishing the
publication-to-rebuild path. Manual dispatch tests also passed in all eight repos.

Notes' old GH_PAT returned 401, and life's GH_PAT lacked dispatch permission (403).
Their trial hooks were removed. Notes, life, everything, food and top-artists
remain covered by hourly website builds. To add event hooks there, provide a
repository secret with Actions write access to this website; do not put tokens in
source or use a content repository's GITHUB_TOKEN for cross-repository dispatch.
Hourly GitHub schedules may be delayed, so they are not a publication SLA.

## Operations and monitoring

The Pages workflow maintains one bot-owned incident issue on production build or
deployment failure and closes it after a successful deployment. It avoids opening
an issue per hourly failure. Native GitHub issue/Actions notifications follow the
owner's subscription settings; no email or chat destination is assumed.

The public smoke workflow now recognizes the github-pages environment and checks
build freshness. Weekly link auditing remains enabled. Production performance
runs weekly and on manual dispatch, sequentially measuring three mobile runs for
each of the six representative routes. Workflow summaries and 30-day artifacts
retain the measurements. Gates require complete coverage, median performance
>=95, median LCP <=2.5s, every CLS <=0.1, and accessibility/SEO 100. CDN/network
variance can cause failures; inspect all samples before changing a budget.

## Reproducible content inputs

`npm run build` collects and validates public content, seals a hash-verified
snapshot, then renders offline. To run phases separately:

```sh
npm run content:snapshot
npm run build:render
npm run verify:build
```

Node 24 is required. `.cache/content-snapshot.json` points to the latest local
snapshot. To reproduce an older build, download its `content-inputs-RUN_ID`
Actions artifact and set `CONTENT_SNAPSHOT_DIR` to the extracted directory
containing `manifest.json` before `npm run build:render`. The workflow retains
these public inputs for three days; retain an artifact separately for longer
investigations. Snapshots are not committed to the repository.

Replay verifies the manifest and each body hash, freezes the build clock to the
collection timestamp, and blocks TCP. Missing or corrupt inputs fail rendering,
even for optional sources; replay cannot silently fetch newer data. Optional
source fallback is resolved during collection and recorded with its stale state.
Only approved public HTTPS GET sources are accepted, without queries, cookies or
authorization. Build provenance includes snapshot ID, collection time and count.
This reproduces inputs and time; byte-identical toolchain output additionally
requires the same pinned dependencies, Node version and build environment.

Collection currently walks reference React views to discover and validate their
inputs and responsive image originals. It publishes no HTML, but remains coupled
to those views. A declarative source graph is a possible later optimization.

## Rendering experiment

Blog index and canonical articles now use native Astro bodies, preserving shared
chrome, aliases and lightbox behavior. The full custom generator remains an
experiment. It shares React/Vite and the installed dependency graph, and saves
only 2.6 seconds over native Astro in the controlled warm comparison. Keep Astro;
see [complete benchmark and limitations](../performance/2026-10-31-pipeline/BENCHMARK.md).


## Collection diagnostics and search

Collection now shares a source context across route validation and writes each
resolved source/policy once. Each consumer still receives a fresh Response. A
failed snapshot write fails the collection. Required inputs refresh in a new
collection; this does not extend optional cache lifetimes. The local profile is
`.cache/collection-profile.json` (override with `CONTENT_PROFILE_PATH`); it is also
copied into the input artifact and summarized in Actions. Phase timings use a
monotonic clock. Network/record durations overlap under concurrency and must not
be summed as elapsed time. Profiles include only approved public input URLs.

The finalizer creates `search-index.json` from canonical published blog/project
HTML. `/search` loads it only after a query. Adding new searchable content types
requires extending the indexer, UI filters and verification together. Ordinary
pages do not load search code/index. Local homepage artwork and its source hashes
are in [home-assets.json](home-assets.json). Run `npm run assets:refresh` explicitly
to refresh those committed files; builds use them offline. `npm run audit:images`
inventories external HTML image/background URLs without contacting those hosts.

See [follow-up evidence](../performance/2026-10-31-roadmap/README.md) for timings,
search behavior, asset inventory and remaining work.
