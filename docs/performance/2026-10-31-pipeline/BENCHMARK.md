# Complete build pipeline comparison

Baseline: ead192dcef5e0d78e64881ed6769ee856abb4c63. Candidate: 3648b702b6ce175cf6926b33267d13d6fb6bc8d5.

Sequential complete artifact builds on one sandbox, fixed inputs and clock, all TCP disabled. One cold image-cache run and three warm image-cache runs per variant, interleaved in fixed order. OS/filesystem caches uncontrolled. Linux RUSAGE_CHILDREN RSS is maximum single-process RSS, not aggregate process-tree memory. Collection is shared, measured once, and not included in render timings.

Snapshot 60f673a6433c26c1be5d6bf7739037a5db300f76c88c0b58fb18631f4d7e1a40: 716 inputs; 40.11 seconds for one shared collection/validation pass.

| Pipeline | Cold image cache s | Warm median s | Warm CPU median s | Peak process RSS median MiB | Output MiB | HTML gzip MiB | CSS gzip KiB | JS gzip KiB |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| astro-react | 37.68 | 18.82 | 21.10 | 807.0 | 47.10 | 5.32 | 10.00 | 73.39 |
| astro-native-blog | 35.53 | 16.53 | 20.05 | 802.7 | 47.27 | 5.34 | 10.00 | 73.39 |
| custom-generator | 31.82 | 13.94 | 16.05 | 750.9 | 47.54 | 5.47 | 9.84 | 74.66 |

All builds share the installed, pinned toolchain to control dependency-version differences. The candidate lockfile has 473 resolved package entries, including platform-specific optional packages. No package removal or installed-size reduction is claimed. The generator uses React, Vite and the shared project installation/TypeScript configuration; it bypasses Astro compilation/routing, not all frameworks.

The collector walks existing reference views to discover and validate their
inputs; it emits no published HTML. This avoids a second handwritten source list
but retains a build-time React dependency in collection. Collection timing is one
observed network-dependent sample, not a controlled before/after comparison.

Native blog pages lower the warm render/build time by about 12% versus the prior
Astro implementation. The generator saves a further 2.6 seconds (about 16%) versus
native Astro. With the observed common collection phase, that is about 5% of the
publishing cycle. These are lab results on one sandbox, not field performance or
hosting cost estimates. Per-file gzip sums are diagnostics, not browser transfer.

The generator now handles the full inventory, aliases, 404, discovery outputs,
CSS/JS, counters, image generation, asset copying and project base paths. It
shares the production finalizer and inventory, but owns another HTML document
renderer, route-to-view registry and a reference contact template. Native blog
markup and reference React markup coexist for this experiment. Adoption requires
owning this plumbing and replacing the shared Astro-dependent TypeScript setup
before removing the Astro package.

**Decision:** deploy the reproducible input pipeline and native blog pages; retain
Astro. A 2.6-second render saving does not presently justify a second production
build system. Optimize collection next if build latency becomes a concern.
