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
