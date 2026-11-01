# Website roadmap

Keep Astro and GitHub Pages. Prioritize publishing reliability and useful ways
to explore content over replacing the build framework.

## Delivered

- Validated public content snapshots and offline rendering with build provenance.
- Native Astro contact/blog bodies; full-generator experiment and measurements.
- Collection profiling and shared source records to reduce repeated disk work.
- Static article/project search, category filters, keyboard access and browse links.
- Seven curated blog topics, static topic pages, and related reading across the
  46 currently published articles.
- Local press/homepage assets, snapshot-backed decorative thumbnails and detail
  artwork, the missing illustration fix, and an external-image inventory command.
- Publication hooks in eight repositories, hourly fallback, deployment incident
  tracking, scheduled URL/performance checks.

- Preserved selected historical article images with original hashes and provenance.
- Retained Pages artifact recovery, tested with an older-release rehearsal and
  a live same-release redeployment, with a temporary freshness window.
- Native long-article tables of contents and optional reading progress.

- Patched the dependency alerts and added repeatable accessibility checks,
  keyboard skip links, landmark/heading fixes, dark contrast and mobile life layout fixes.

## Ongoing and prerequisites

1. Finish notes/life publication hooks after a suitable Actions-write dispatch
   credential is available; keep the hourly fallback until verified. Existing
   credentials remain unsuitable and no interactive login token is persisted.
2. Continue observing production collection profiles. Three retained runs took
   29–38 seconds. A controlled scheduler experiment showed no improvement, so
   retain the existing collector and defer a handwritten content graph.
3. Use the image audit to prioritize remaining broken or slow historical sources.
   Changing covers/maps/badges retain their source policy; stable illustrations
   now build locally, including the known missing-image replacement.
4. Maintain topic membership and reading order as articles are published. Keep
   topic slugs stable and update `src/lib/blog-topics.ts` for editorial changes.
5. Review actual search needs before expanding beyond articles/projects or adding
   fuzzy matching. Current checks establish functionality, not usage demand.

[Latest implementation and validation](performance/2026-11-01-accessibility/README.md).
