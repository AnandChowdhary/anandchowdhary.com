# GitHub Pages conversion proposal

Requested 2026-10-28. The Astro application in PR #304 currently uses server
output on Vercel; it is not yet a static GitHub Pages artifact. Production still
runs the original Next.js deployment. No hosting or DNS switch is part of this
proposal until the static build and deployment have been verified.

## Resulting behavior

Every published page is rendered to HTML during a GitHub Actions build. The
existing CSS, fonts, counters and accessible lightbox remain. A failed content
fetch or rendering error fails the build, leaving the last successful deployment
live rather than publishing an incomplete site.

New posts and dashboard data become visible after a successful rebuild. Proposed
triggers are pushes to main, hourly scheduled builds, manual workflow_dispatch,
and repository_dispatch from content-publishing repositories when available.
GitHub schedules can be delayed; hourly scheduling is not a publication SLA.
Counters continue animating from their build-time values after hydration.

GitHub Pages has no per-request server, runtime source cache, ISR or Vercel image
service. Static HTML redirect pages can preserve navigation for known aliases,
but cannot preserve the original HTTP 307/308 response codes. Unknown URLs use
the generated 404.html. These behavior changes require the user's preference
before proceeding with the hosting conversion.

## Implementation

1. Change Astro to static output and remove the Vercel adapter/runtime cache and
   analytics integration. Keep source deduplication in the build process; fail
   builds on mandatory-source errors rather than rendering 503 HTML into a release.
2. Build a validated route inventory from all content families, including year
   pages, location, project tags and food pages omitted from the existing sitemap.
   Add getStaticPaths for every dynamic template. Generate known alias HTML
   redirects explicitly; do not assume every historical short slug is enumerable.
3. Replace responsive Vercel image URLs with local build-time Sharp output using
   the existing widths, aspect ratios, sizes and WebP quality. Preserve original
   SVG/GIF sources and lightbox originals. Validate local asset references.
4. Generate sitemap, LLM endpoints, fonts/icons and 404.html into dist. Verify
   extensionless LLM URLs/content behavior on GitHub Pages; it cannot set arbitrary
   Content-Type or Cache-Control headers through application handlers.
5. Add an official Pages Actions workflow using configure-pages,
   upload-pages-artifact and deploy-pages. Build on PRs without deploying; deploy
   main artifacts through the github-pages environment with pages:write and
   id-token:write. Use current verified action versions and deployment concurrency.
   This publishes an artifact directly, with no gh-pages branch.
6. Verify type checks/contracts, all static routes/assets, no-JS content,
   responsive images and browser interactions. Repeat visual and performance
   comparisons for the actual static deployment; Vercel measurements cannot
   establish GitHub Pages performance or compression behavior.
7. Enable Pages' Actions source, validate a reachable deployment and custom-domain
   ownership, then switch the custom domain/DNS and verify HTTPS, aliases, 404s,
   indexing and all published URLs. Keep the existing Vercel deployment for rollback.

## Release requirements that change

Runtime cache/ISR/new-slug tests become build inventory, content-trigger and failed
build retention tests. HTTP redirect parity becomes documented HTML redirect
behavior. No cold-source 503 behavior can be supplied by GitHub Pages. Preserve
remaining design, metadata, accessibility and transfer budgets; investigate any
regression using a fresh baseline on comparable measurements.

The GitHub Pages API currently returns 404 for this repository. Confirm whether
Pages needs enabling and whether the connection can manage Pages settings before
assuming deployment access. Custom-domain DNS changes require the DNS provider's
access and remain separate from creating the deployment workflow.
