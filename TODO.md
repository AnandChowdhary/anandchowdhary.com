# 404/500 audit

Crawled the live site (anandchowdhary.com) starting from the homepage, following every internal link recursively (1,035 pages visited). Found **211 broken links**: 206 404s and 5 500s.

Full raw crawl results (url, status, referring pages): see the bottom of this file for the summary; ping me if you want the complete JSON dump re-generated.

## Fixable in this repo (do these as separate PRs, one at a time)

### 1. `/location/[year]` 500s for 2013, 2015, 2016, 2025, 2026 (the original bug report)

- **Where**: `app/location/[year]/page.tsx`
- **Root cause**: this route (and `app/location/component.tsx`) filters `getAllCountries()` (fed by `history-countries.json`, which only contains "first visit to a new country" milestones) by year. The `/location` index page instead uses `getAllLocations()` (fed by `history.json`, the full location history) to render the year headings/links. Years that have full-history entries but no "new country" milestone (2013, 2015, 2016, 2025, 2026) produce an empty filtered array; `component.tsx` then does `[...countriesDataFiltered].sort(...)​[0]` and dereferences the result unguarded (`location.country_code`), crashing with a 500.
- **Affected URLs**: `/location/2013`, `/location/2015`, `/location/2016`, `/location/2025`, `/location/2026`
- **Fix**: switch `app/location/[year]/page.tsx` to use `getAllLocations()` (matching the index page), and guard against an empty result with `notFound()` instead of crashing.

### 2. Every individual location detail link 404s (biggest bug, 142 URLs)

- **Where**: `app/api.ts` (`getAllCountries`/`getAllLocations`, `slug: country.country_code`), `app/location/component.tsx` (link `href`), `app/location/[year]/[slug]/page.tsx` (`generateStaticParams`), `getLocationByYearAndSlug`
- **Root cause**: `api.ts` sets each location's `slug` to just the **country code** (e.g. `"nl"`). But the actual links rendered in `component.tsx` use `` `${slugify(item.label)}-${item.country_code}` `` (e.g. `"utrecht-nl"`). `generateStaticParams` and `getLocationByYearAndSlug` both key off `location.slug` (country-code-only), so no statically generated page ever matches a link a user can actually click — 100% of location detail links are dead. It also means multiple visits to different cities in the same country in the same year would collide on one slug.
- **Affected URLs**: e.g. `/location/2024/portugal-pt`, `/location/2026/san-francisco-us`, `/location/2021/amsterdam-nl`, and ~140 more across every year from 1997–2026 (full list in crawl output, category `locationSlug404`).
- **Fix**: make the `slug` field match what the UI links to — set `slug: ${slugify(country.label)}-${country.country_code}` in `api.ts`, so `generateStaticParams`/`getLocationByYearAndSlug` line up with the rendered hrefs.

### 3. Open-source repo README embeds don't rewrite relative links (22 URLs)

- **Where**: `app/open-source/[year]/[slug]/page.tsx` (renders `marked.parse(details ?? repo.description)` and `marked.parse(readMe)`), `getRepositoryReadMe`/`getRepositoryDetails` in `app/api.ts`
- **Root cause**: READMEs fetched from GitHub contain relative links/paths (`./add_url.py`, `.github/workflows/x.yml`, `LICENSE`, `CNAME`, etc.). They're rendered as-is with `marked.parse`, so clicking them resolves against `anandchowdhary.com` instead of the actual GitHub repo. `getBlogPostContent` already does this kind of rewriting for blog post images — the open-source README renderer needs the same treatment for links (and ideally images).
- **Affected URLs**: e.g. `/LICENSE`, `/CNAME`, `/agent.ts`, `/index.html`, `/script.js`, `/.github/workflows/*.yml`, `/portfolio.json`, and more (full list: category `openSourceReadme`), linked from various `/open-source/YYYY/slug` pages.
- **Fix**: before rendering, rewrite relative link/image targets to `https://github.com/{full_name}/blob/HEAD/...` (or `raw.githubusercontent.com` for images), similar to the existing regex rewriting in `getBlogPostContent`.

## Not fixable in this repo (data lives elsewhere — flagging for awareness)

### 4. `/archive` renders stale/incorrect links from the external "everything" feed (20 URLs)

- **Where**: `app/archive/item.tsx` — `const url = item.url.replace(...)` uses the URL verbatim from `https://anandchowdhary.github.io/everything/api.json`.
- **Root cause**: that feed (from a separate `AnandChowdhary/everything` repo) has stale URLs: location links missing the country-code suffix (e.g. `/location/2018/belgium` instead of `/location/2018/brussels-be`), press links with mismatched slugs (`/press/2021/git-hub` used for two different years), and one video slug typo (`/videos/2017/bharat-hacks-live` vs. the real `bharathacks-live`).
- **Fix requires editing the `AnandChowdhary/everything` repo**, not this one. Once bug #2 above is fixed, some of the location ones may need the feed regenerated too.

### 5. Dead links baked into old blog/notes markdown content (5 URLs)

- `/blog/state-of-the/podcasts/2018` — hardcoded inside `blog/2019/state-of-the-podcasts-2019.md` from a pre-migration URL scheme; should be `/blog/2018/state-of-the-podcasts-2018`.
- `/projects/open-source/uppload` — hardcoded inside `blog/2020/introducing-uppload-v2.md`, same pre-migration scheme; should point at the current `/open-source/*/uppload` page.
- `/blog/2025/move-fast-and-save-things` — linked from `/notes/2026/hidden-risks-baked-into-models`; no post with this slug/title exists in the blog feed at all (likely a typo or renamed/deleted post).
- `/blog/2025/accidentally-founding-koj` and `/blog/2025/the-life-of-pabio` — linked from `/projects/tags/pabio`, but both posts are marked `draft: true` and are correctly excluded from the site per #277. They'll 404 until published (or the Pabio project content stops linking them early).
- **Fix requires editing the `AnandChowdhary/blog` / `AnandChowdhary/notes` repos**, not this one.

## Plan

Ship #1 (original bug report) first, then #2, then #3, each as its own PR — verify CI is green before merging each. #4–#6 are cross-repo content issues; flagging here rather than fixing in this repo.
