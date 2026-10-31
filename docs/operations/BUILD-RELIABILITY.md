# Static publishing and source policy

The production site remains static Astro on GitHub Pages. React renders most
views at build time; it is not an article runtime. The contact page now uses
native Astro markup for its body, sharing the existing header/footer and icons.

## Source classification

| Source | Policy | Failure behavior |
|---|---|---|
| Canonical content APIs, archive, location history, markdown and repository content | Required (existing explicitly optional missing README/404 behavior retained) | A failed required source fails the build; do not publish error HTML or erase content |
| Life, food, coding, walking, sleep and music datasets used by published pages | Required | Fail rather than replace real measurements with invented zeroes |
| GitHub contribution count/calendar | Optional, public GitHub calendar | Validate calendar structure before caching; bounded last-good snapshot, then explicit unavailable state |
| Owned article and responsive image sources | Required | Image processing/source failures fail the build |
| Decorative external avatars | Browser assets | Local Forbes icon replaces the known broken Twitter URL; other avatars retain their sources |

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
upstream HTML. It replaces the dead deno.dev JSON/SVG service. The Forbes icon is
a byte-for-byte copy of https://i.forbesimg.com/48X48-F.png, linked from Forbes'
official homepage, stored at public/images/press/forbes.png.

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

## Rendering experiment

See [the simplification evidence](../performance/2026-10-31-simplification/README.md).
Keep Astro until a broader generator experiment establishes a maintenance benefit
and equivalent route/asset/error handling. The current experiment is not a
production replacement and does not prove a full-build speedup.
