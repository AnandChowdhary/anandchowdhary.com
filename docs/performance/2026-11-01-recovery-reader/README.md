# Historical images, Pages recovery and long-article reading

## Implementation

- Preserved 31 available historical Medium/Svbtle/Oswald originals and replaced
  one broken image URL (which returned an article page) with the matching owned
  Agastya Read Aloud screenshot. The targeted inventory covers these selected
  hosts, not every external image on the site. Source URLs, original SHA-256,
  dimensions and affected pages are in `src/lib/historical-images.json`.
  The 32 manifest entries share one identical file. Originals are committed
  byte-for-byte; the 31 unique files total 3,394,582 bytes. Article hyperlinks and
  authored image attributes are preserved.
- Added retained-artifact recovery through official Pages Actions, a rehearsal
  mode, seven-day retention, source/commit validation, safe TAR extraction,
  offline verification and a separate six-hour recovery receipt. See the
  [runbook](../../operations/PAGES-RECOVERY.md).
- Articles with at least 1,000 whitespace-separated words and three Markdown
  h2/h3 headings get a native details TOC and a small reading-progress module.
  Heading IDs are stable and deduplicated. Raw HTML headings are not collected.
  TOC links work without JavaScript; progress stays hidden until JavaScript runs.
  Progress has an accessible label and no animation or smooth scrolling.

## Local validation

- Astro check: zero errors, warnings or hints. All 40 tests pass.
- Fresh snapshot: 727 inputs; 1,519 routes plus 404. Static verification checks
  all preserved image hashes. URL audit: 809/809 OK.
- Downloaded real production artifact from run 41292791577, safely extracted
  1,970 files / 50,530,072 bytes, verified commit and assets, and passed local
  smoke with expected commit. Original build timestamp stayed unchanged;
  [recovery receipt](local-recovery.json) records the added marker.
- Search index is byte-identical to that previous production artifact.

Release/browser/prefix results are appended after completion. No claim is made
that every historical external source has been repaired.

Browser checks pass for reader anchors without JavaScript, reduced-motion
progress, short-article omission, and decoding all archived images across their
affected pages. Existing interactions, search and topic suites also pass.
The same reader/image suite and smoke pass under `/anandchowdhary.com`; prefixed
static verification passes. Both workflows pass actionlint.
