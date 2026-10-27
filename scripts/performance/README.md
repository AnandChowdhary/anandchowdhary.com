# Production performance measurements

This toolchain is isolated from the app dependencies. Use Node 24 (Node >=22.19
also works). Installation downloads a pinned Chrome for Testing through Puppeteer.

```sh
npm ci --prefix scripts/performance
node scripts/performance/run.mjs --output=docs/performance/my-baseline
```

The default matrix is six fixed routes, five mobile runs and three desktop runs
each. It takes several minutes. Runs are sequential, with a fresh Chrome process
and browser profile each time. Mobile uses Lighthouse defaults; desktop uses
Lighthouse's desktop config. Both use simulated throttling. Never benchmark the
Next.js development server or run a build alongside the measurements.

To smoke-test the harness or compare a production-mode local build / accessible
preview, use the same routes and toolchain:

```sh
node scripts/performance/run.mjs --route=article-text --mobile=1 --desktop=1 --output=/tmp/performance-pilot
node scripts/performance/run.mjs --base=http://localhost:3000 --output=docs/performance/local-candidate
```

Options use `--name=value`. `--route` selects an ID from routes.json. Counts can
be zero to skip a device, but at least one run is required. Use a new output folder
per experiment. The run manifest is checkpointed after every measurement. A failed
navigation/audit is recorded and makes the command exit nonzero; it is excluded
from the summary rather than counted as a score of zero.

Outputs:

- `REPORT.md`: median and range per route and device, category scores, limitations.
- `summary.json`: individual and aggregate metrics, asset bytes, failed requests,
  audit findings and full Lighthouse settings for each sample.
- `manifest.json`: tools, timestamps, source checkout, warnings, three consecutive
  HTTP GET observations per route and PageSpeed/CrUX responses.
- `raw/*.json.gz`: complete Lighthouse result objects including screenshots and
  detailed diagnostics. These large artifacts are ignored by Git; retain/archive
  the directory when sharing results. Regenerate a summary with
  `node scripts/performance/summarize.mjs <output-directory>`.

The local checkout SHA does not identify the production deployment. Before an
experiment, record the deployed SHA separately if available. Physical test region
is unverified in this sandbox; Vercel routing IDs are observations of CDN routing,
not proof of runner location. Keep runner/location/tool versions consistent for
comparisons. CDN cache is uncontrolled: cold browser storage does not mean a cold
CDN. HTTP `headersMs` includes network overhead, not just server processing time.

PageSpeed's public API is queried once per device for URL/origin field data. Quota
or permission errors are preserved; they do not establish that CrUX lacks traffic.
For local/preview origins, field data is generally unavailable. Real-user INP
cannot be inferred from Lighthouse TBT. Do not mix this sandbox's lab numbers with
PageSpeed scores or treat them as global user experience.

Chrome's sandbox is disabled only to run inside this container; this is an audit
tool for trusted targets, not an application deployment setting.

## Visual and interaction checks

Build the app with Node 24 and run `npm start` to serve its actual Vercel bundle
locally on port 4322. The local preview transforms `/_vercel/image` requests with
Sharp using the same width/quality contract; Vercel performs those transforms in
production. This is not proof of CDN cache or production encoder behavior.

```sh
node scripts/performance/visual.mjs --base=http://localhost:4322 --output=docs/performance/my-visual-check
node scripts/performance/visual.mjs --base=http://localhost:4322 --route=article-text --devices=desktop --themes=light --modes=normal,screenshot --full-page=true --output=docs/performance/my-full-page-check
node scripts/performance/interactions.mjs http://localhost:4322
```

The default visual matrix is six routes × two viewports × two color themes ×
normal/screenshot mode. It captures the first viewport unless `--full-page=true`.
Screenshots/diffs are saved in ignored `raw/` folders; `visual.json` includes
metadata, geometry, errors and requests. Diffs are diagnostics, not an automatic
pixel-parity claim: changing counters, live feeds and image encoders need review.
The interaction checks exercise no-JS article content, screenshot padding, animated
counter accessibility, and keyboard/focus behavior of the lightbox.

For a representative URL for every original page template, add
`--route-file=parity-routes.json`. That inventory contains 45 templates, including
location, project tags and food pages omitted by the baseline sitemap matrix.
It is a fixed visual sample, not a list of every published content URL. The full
link audit remains responsible for published URL/status coverage. The lightbox
interaction check uses the restored original article artwork without interception.
All 17 podcast images must actually load after scrolling.

The built-function local server (`npm start`, port 4322) negotiates gzip for text
responses and serves a local Sharp approximation of Vercel image transforms.
These transport approximations do not reproduce CDN caching, image encoders,
HTTP protocol or geographic latency. Label such results local diagnostics; use
an actual deployment for release comparisons.

The local verification server fixes its timezone to UTC to match production date
formatting. An inherited shell timezone (for example Europe/Amsterdam) can shift
late-night timestamps to a different day and create false visual differences.

Protected previews use `VERCEL_PREVIEW_ORIGIN` and
`VERCEL_AUTOMATION_BYPASS_SECRET` through `scripts/preview-auth.mjs`. Supply the
secret through a private environment, never a URL or command argument. HTTP
redirects rescope headers to the exact preview origin. Browser checks obtain a
host-scoped HTTP-only bypass cookie; third-party requests receive no bypass header.
Lighthouse still starts a fresh Chrome process/profile for each sample; for an
authenticated preview only, `disableStorageReset` preserves this freshly seeded
cookie. No target-page navigation or asset warming precedes the run. The manifest
records authentication as a boolean and removes Set-Cookie values. Public
production measurements use the default storage reset. PSI is skipped for a
protected preview; public API quota errors remain recorded for production.
