# GitHub Pages conversion — approved 2026-10-28

The user approved the conversion and its rebuild/HTML redirect tradeoffs. PR #304
now uses Astro static output and official Pages artifact deployment. The existing
custom domain still serves the original Next.js deployment on Vercel until DNS
cutover. GitHub Pages is enabled for this repository with build_type=workflow.

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
the generated 404.html. The user accepted these behavior changes before implementation.

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

## Implemented and verified locally

- 1,511 inventoried paths and 1,512 rendered HTML pages, plus sitemap/LLM files,
  404.html, original fonts/icons and .nojekyll.
- 123 original image sources generate static responsive WebP assets; image
  variants total 14,764,824 bytes. The complete prefixed artifact is about 48 MiB.
- Both root-domain and /anandchowdhary.com/ builds pass route, asset and original
  artwork hash verification. HTML links, srcsets, image preloads and redirects
  support the project prefix; counter/lightbox selection strips it correctly.
- 801/801 published URLs pass on both builds. Alias destinations are checked
  through immediate same-origin HTML redirects, and unknown URLs return real 404s.
- All 15 contracts pass, including fatal mandatory-source errors in static builds.
  Type checks pass with zero errors, warnings or hints.
- Browser checks pass on root and project-prefixed builds: no-JS article content,
  one optimized hero, both animated counters, all 17 podcast images and accessible
  keyboard/pointer lightbox behavior, with no exceptions.
- The 48-pair local visual matrix matches dimensions throughout with no browser
  exceptions. Expected pixel differences include restored original article art
  (maximum 6.02%), image encoding and counters. See astro-pages-local-parity.
- The 2017 MD5 article's root /images/... reference now uses a compatibility copy
  of its byte-identical /images/blog/... original. The provenance manifest records
  both paths; no replacement artwork was invented.
- Vercel's adapter, runtime cache use, analytics integration and deployment helper
  scripts are removed. Astro's optional storage dependency may install unused
  Vercel SDK tooling during builds; none is deployed in the static artifact.
- Git deployments are disabled in vercel.json to keep source merging from
  independently switching the existing Vercel custom domains.

## Publication and domain cutover

The official workflow uses configure-pages@v6, upload-pages-artifact@v5 and
deploy-pages@v5 (release tags verified), with Node 24 and content-addressed image
caching. PRs build/check without deploying; main publishes through github-pages.
The initial public staging URL will be
https://anandchowdhary.github.io/anandchowdhary.com/ and needs its own deployed
smoke, URL, browser and performance verification. Local/Vercel numbers do not
establish Pages performance.

The domain's nameservers are anna.ns.cloudflare.com and jonah.ns.cloudflare.com.
No DNS-management connection is available in this workspace. Once Pages is
verified, the owner must update the Cloudflare DNS records for the final custom
domain switch. No DNS changes have been made. Keep the original Vercel deployment
available for rollback until the final custom-domain checks pass.

## Published project-site verification

PR #304 is merged. Official artifact deployment and the hourly scheduled workflow
have succeeded on main. The first run published successfully but its final smoke
step lacked a checkout; follow-up commits add checkout/Node 24 and explicitly use
HTTPS for verification. Subsequent build/deploy/smoke runs are green.

The project site passed the live 801-URL audit and complete browser interaction
checks. A new 48-run Pages matrix and fresh 48-run Next.js baseline are complete.
The image article's initial accessibility score of 99 exposed interactive images
with empty alt text. Naming them from authored headings/captions fixes that; all
eight focused follow-ups score 100. Final budget coverage explicitly combines the
40 unaffected initial samples and those eight follow-ups.

[The hosted comparison](2026-10-28-pages-release/COMPARISON.md) passes all release
budgets: mobile median performance 99–100, median LCP 1.21–2.21 seconds, CLS below
0.1 throughout, no RSC and 95.5% less project image transfer than the initial
7.71 MiB baseline. Accessibility and SEO are 100 in final audited samples.
Article inline JavaScript is 1,463 compressed bytes, with no external application
script/React bundle. Home/life retain inherited external image failures affecting
best-practices scores. Field INP and billed build usage remain unknown.

Pages now registers anandchowdhary.com; DNS still points to Vercel. The root-path
artifact is being staged before the owner makes the Cloudflare changes in
[DNS-CUTOVER.md](2026-10-28-pages-release/DNS-CUTOVER.md). The project github.io
URL redirects to the custom domain during this stage, so it is no longer an
independent preview. Do not mark the overall migration complete until DNS, HTTPS,
custom-domain smoke and the full URL audit pass.
