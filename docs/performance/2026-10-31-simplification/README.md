# Rendering simplification experiment — 2026-10-31

The contact page's content is now native Astro markup. Its header, footer and
icons still use existing build-time React components to keep this a small change.
The old full-page React template was removed. All eight full-page comparisons
(desktop/mobile × light/dark × normal/screenshot) have 0% changed pixels at the
existing RGB threshold of 20, matching geometry and no browser exceptions.
See contact-visual.md and contact-visual.json. This is measured parity for this
page, not proof that all rendering approaches have identical output.

## Custom generator

Run `npm run build` once for the image variants, then
`npm run experiment:generator` with Node 24. Output goes to
`.cache/static-generator`, separate from the deployable dist directory. Preview:

```
STATIC_DIR=.cache/static-generator PORT=4331 node scripts/serve-static.mjs
```

The prototype uses Vite for CSS/lightbox JavaScript, existing React views rendered
at build time, and an escaped plain HTML document renderer. It generates a blog
index, one article and /location/2026 without Astro's compiler or routing. It
copies public assets and the reference build's responsive image variants, keeping
image processing constant for the rendering experiment. It is not framework-free:
React remains a build dependency and Vite remains the asset compiler.

It does not implement the full route inventory, redirects, discovery endpoints,
404 behavior, counter roots, base-path rewriting, image generation or deployment
verification. These are existing production responsibilities that a replacement
must own. Its duplicated document renderer is experimental, not a second public
layout to maintain.

The recorded partial build took about 1.30 seconds for three routes, including
Vite compilation. The full Astro build covered 1,510 paths and responsive images;
these timings are not comparable and do not demonstrate an end-to-end speedup.
All 24 full-page visual pairs for these three routes match at the RGB threshold
of 20, with matching metadata, geometry and no browser exceptions. See
generator-visual.md and generator-visual.json.

Compressed HTML changes vary by route: the index/year page grow slightly while
the article shrinks. This gives no general payload advantage.

## Decision

Keep Astro in production and use native markup for straightforward pages when it
reduces code. The first conversion preserves the measured appearance. A custom
generator is feasible, but currently replaces mature plumbing with project-owned
code while retaining the same client behavior. Do not migrate all templates based
on this partial build time. A future decision requires all route families,
metadata/error parity, a reproducible full build comparison and a clear reason to
own the additional infrastructure.

## Published performance and release checks

Release workflow 41217162865 passed all 20 contracts, type checks, the full
1,510-route artifact verification, 801-URL audit and custom-domain freshness smoke.
Live browser interactions pass. See release-verification.json and
production-interactions.txt.

The first weekly-performance workflow test (41217392406) passed all 18 mobile
samples. Median performance was 99–100, median LCP 1.23–2.27s, CLS 0, and all
accessibility/SEO scores 100. The life page also scored 100 best practices. See
production-REPORT.md, production-summary.json and production-budgets.json.

That run exposed one more broken CSS-Tricks Twitter avatar on the homepage
(best practices 96). All eight press icons are now local 32px WebP assets,
using the authored originals plus official website icons for the broken sources.
The source images total 84,193 bytes versus 4,856 bytes for the local variants.
A focused homepage follow-up validates that change separately; the initial full
matrix is retained rather than claimed as a new full-site run on the icon commit.

The focused follow-up passed all three homepage samples: performance median 99,
median LCP 2.105s, CLS 0, accessibility/best practices/SEO 100, and no failed
network requests. See homepage-followup-REPORT.md and release-verification.json.
The full matrix used a GitHub Actions runner; this focused follow-up used Nebula.
Do not interpret their timing difference as a controlled before/after experiment.
The icon release workflow 41217845682 also passed its build/deploy/report jobs.
