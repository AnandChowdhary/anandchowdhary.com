# anandchowdhary.com

Personal website and portfolio of Anand Chowdhary, built with Astro, TypeScript,
React for server rendering, and Tailwind CSS v4. Deployed to Vercel with a
60-second HTML ISR cache and an explicit cache for external content sources.

Pages are complete HTML. There is no Next.js dependency, RSC payload or browser
router. Most existing JSX and Tailwind classes are retained to preserve the
original design. Only the homepage's birthday and fitness counters hydrate React
in the browser. Articles use a small keyboard-accessible image-lightbox script;
screenshot mode uses a pre-paint script and CSS. Navigation uses ordinary links
and native cross-document view transitions when supported.

## Development

Use **Node 24**, matching the Vercel function runtime and CI.

```sh
npm ci
npm run dev
```

Astro serves development on port 4321. The commands are:

| Command | Purpose |
|---|---|
| `npm run dev` | Astro development server |
| `npm run check` / `npm run lint` | Astro and TypeScript diagnostics |
| `npm test` | Deterministic cache, routing and content contracts |
| `npm run build` | Build the Vercel function and static assets |
| `npm run verify:build` | Verify emitted runtime, routes, images and original assets |
| `npm run verify:runtime` | Execute the packaged function outside the repository with strict Node loading |
| `npm start` | Serve the built Vercel bundle locally on port 4322 (`PORT` overrides) |
| `npm run smoke -- https://example.com` | Index, detail, alias and unknown-slug checks |
| `npm run link-audit -- https://example.com` | Every sitemap and external archive-feed URL |

The built-output local server is a verification tool. It runs the actual bundled
function and serves emitted static assets; it does not emulate Vercel CDN caching,
ISR regeneration or production Runtime Cache. Verify those on a deployment.

## Structure

- `src/pages/`: explicit Astro routes for all 45 original page templates, 404,
  sitemap and LLM discovery endpoints.
- `src/layouts/Document.astro`: document metadata, fonts, screenshot mode and
  page-specific scripts.
- `src/views/`: retained JSX page/content components and external data utilities.
- `src/lib/render.tsx`: server-only HTML rendering bridge, including async JSX
  sections, metadata and HTTP control flow. It emits no hydration payload.
- `src/lib/source.ts`: request deduplication, timeouts, conditional requests,
  source TTLs and bounded last-good fallback. Production uses Vercel Runtime Cache;
  local development and deterministic tests use an injected/local cache.
- `src/scripts/`: article lightbox and narrowly scoped counter hydration.
- `public/fonts/`: the same Geist/Geist Mono font files and fallback metrics as
  the original deployment, with their OFL license.
- `scripts/`: smoke/link audits, built-output server and isolated performance tools.

The site retains blog, books, projects/tags, events, notes, videos, press,
open-source, location, themes, versions, life/food, archive and top-level pages.
External content stays in the existing GitHub repositories. New detail URLs render
on demand after data-cache expiry and do not require a site rebuild. Source caches
are evictable and regional; they are not durable content storage.

## Vercel deployment and production checks

Use the **Astro** framework preset, repository root, Node **24.x**, the build/check command in `vercel.json`
and the official Vercel adapter's Build Output API artifacts. Do not use the old
Next.js preset or a nested migration directory. `astro.config.mjs` explicitly sets
ISR expiration to 60 seconds; source helpers retain their existing one-hour TTLs
where configured. TTLs are not an end-to-end publishing SLA, especially during
upstream failures. See the migration document for the freshness/recovery checks.

`?screenshot=true` preserves the compact Open Graph screenshot layout. It is a
presentation-only flag applied before paint, so the same ISR HTML can safely serve
both modes even though adapter ISR requests do not expose query parameters.

The existing deployment-status workflow smoke-tests production after Vercel
reports a successful Production deployment. The weekly link audit checks the
sitemap plus external archive links; it preserves the known alias redirects and
unknown-slug 404 canaries. These checks remain important: a previous runtime
failure appeared only in the deployed function while build/local checks passed.
Preview authentication must be respected when running candidate deployment checks.

## Migration and performance evidence

The [migration plan and status](docs/performance/MIGRATION.md) describes architecture,
parity requirements, release gates and rollback. The [performance status](docs/performance/PLAN.md)
links the original [48-run production baseline](docs/performance/2026-10-26-baseline/REPORT.md)
and the [visual comparison](docs/performance/astro-parity/VISUAL.md).

Install measurement dependencies independently with
`npm ci --prefix scripts/performance`. The [runner instructions](scripts/performance/README.md)
cover repeatable Lighthouse audits. `visual.mjs` compares production and a candidate
across viewport, theme and screenshot mode; `interactions.mjs` checks browser
behavior. Full local screenshots/Lighthouse reports live under ignored `raw/`
folders; tracked summaries describe their scope and limitations.
