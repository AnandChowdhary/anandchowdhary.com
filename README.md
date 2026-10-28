# anandchowdhary.com

Anand Chowdhary's personal site, built as static HTML with Astro, TypeScript,
server-rendered React and Tailwind CSS. GitHub Actions builds and publishes a
Pages artifact directly using the official Pages actions; no gh-pages branch,
Next.js, server functions, ISR or runtime image service is required.

The existing JSX, typography, metadata and design are retained. Only the homepage
counters load React in the browser as they approach the viewport. Articles use a
small accessible lightbox; normal links provide navigation. Responsive WebP image
variants are generated during the build with Sharp, preserving SVG/GIF originals.

## Development and verification

Use Node 24:

```sh
npm ci
npm run dev
```

| Command | Purpose |
|---|---|
| `npm run dev` | Astro development on port 4321 |
| `npm run check` | TypeScript/Astro diagnostics |
| `npm test` | Source, route, image, redirect and build-failure contracts |
| `npm run build` | Render all routes and generate optimized static images in dist |
| `npm run verify:build` | Validate routes, assets, original artwork hashes and Pages size limit |
| `npm start` | Serve dist on port 4322 for verification |
| `npm run smoke -- https://example.com` | Published pages, unknown-slug 404s and alias destinations |
| `npm run link-audit -- https://example.com` | Sitemap plus external archive-feed URL coverage |

The build runs in UTC. `PAGES_BASE_PATH` supports a project Pages deployment
such as `/anandchowdhary.com`; leave it unset for the custom domain. The Pages
workflow obtains this value from configure-pages. The static preview accepts the
same environment variable when checking a project-prefixed build.

## Content and deployment

`.github/workflows/pages.yml` builds on PRs and publishes main through the
`github-pages` environment. It uses configure-pages, upload-pages-artifact and
deploy-pages, with bounded deployment concurrency. Builds run on main pushes,
hourly at minute 17, manual workflow_dispatch and a `content-published`
repository_dispatch. Content repositories can send that event when publishing;
those outbound integrations are not automatically installed by this repository.
GitHub scheduled runs may be delayed.

Pages is configured to publish via Actions. The workflow derives the project or
custom-domain base from Pages settings. The custom-domain DNS cutover is separate;
see [Pages implementation/release status](docs/performance/GITHUB-PAGES.md).
Vercel Git deployments are disabled in vercel.json so merging this hosting change
does not independently switch the existing production domains on Vercel.

Every route is generated from the content feeds, including location, project tags,
archive years, canonical aliases and known short slugs. A new post appears after
its next successful build. Mandatory source/render/image failures fail the build,
leaving the last successful Pages deployment live. No server exists to discover
unbuilt slugs or refresh source data per request. `build-info.json` records the
published timestamp; smoke --check-freshness checks that rather than CDN Age.

Known aliases use HTML redirect pages, with visible canonical links, because
Pages cannot issue the original application's HTTP 307/308 responses. Unknown
URLs use 404.html. The HTML LLM endpoint is served at /llms/; /llms.txt and
/sitemap.xml retain their file paths. Vercel Web Analytics is removed with the
adapter; no replacement tracker is added.

## Structure and evidence

- `src/pages/`: explicit Astro routes and discovery endpoints.
- `src/lib/static-paths.ts`: build-time inventory and dynamic-route parameters.
- `src/lib/render.tsx`: server-render JSX to HTML during builds; no RSC payloads.
- `src/lib/source.ts`: deduplicated build inputs and optional-source handling.
- `scripts/finalize-static.mjs`: bounded image generation and project-path rewriting.
- `scripts/verify-static.mjs`: artifact integrity and route/asset verification.
- `src/scripts/`: lightbox, visibility loader and counter hydration.
- `public/fonts/`: original Geist faces and license.

[Performance and migration evidence](docs/performance/STATUS.md) includes historical
Vercel measurements. They describe that candidate and do not establish Pages
performance. New Pages measurements must identify their deployment and hosting.
Raw screenshots and full Lighthouse reports live in ignored raw directories;
retain them with tracked summaries when sharing measurement evidence.
