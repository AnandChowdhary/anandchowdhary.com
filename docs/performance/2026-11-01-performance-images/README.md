# Performance baseline and remaining blog images

## Production baseline

[Actions run 41306562097](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41306562097)
measured the public custom domain with three mobile Lighthouse samples on each
of the six fixed benchmark routes (18 samples). All existing budgets passed:
performance >=95, median LCP <=2.5s, maximum CLS <=0.1, and minimum accessibility
and SEO scores of 100. Every sample scored 100 for performance. Median LCP
ranged from 1.20 to 1.65 seconds; measured CLS was zero across these samples.

[Report](baseline/REPORT.md), [summary](baseline/summary.json),
[manifest](baseline/manifest.json), [budgets](baseline/budgets.json).
Raw compressed Lighthouse reports remain in the workflow artifact for 30 days.
The original report incorrectly labels the runner as Nebula; this was actually
GitHub Actions. Its source checkout is also not proof of the deployed commit.
The harness now identifies Actions runners correctly and observes the deployed
build record before and after measurements, reporting publication changes.

These are browser-cold lab measurements with uncontrolled CDN caches. They do
not establish field INP, global latency, or improvements caused by this change.
Existing budget limits were retained.

## Targeted image audit

The inventory found five remaining external images in canonical blog articles:
four 2022 life-data charts and the 2025 year-of-discovery illustration. All five
were fetched and decoded, then committed byte-for-byte with original SHA-256,
dimensions and commit-pinned retrieval URLs in `src/lib/historical-images.json`.
The five originals total 2,397,437 bytes. Article links and captions are retained.
The generated canonical blog articles now have no external img/source/background
URLs under the inventory's scope. Other page types still contain external images.

The broader targeted check covered 48 URLs: these five blog images, 41 older
GitHub attachment URLs, one artist-hosted artwork, and one retired Koj footer.
47 fetched and decoded. `kojcdn.com` fails DNS resolution; a possible Cloudinary
origin also returned 404 and is not accepted as a replacement. The broken footer
appears in seven open-source README excerpts, whose images are hidden by the
existing README presentation. It remains an explicit unresolved source, not a
silently replaced asset. This check does not cover all 1,040 remaining external
URLs, including changing covers, maps, badges and avatars.

[Network results](image-check.json) include checked URLs, page references,
status, dimensions, decode results and request duration. Durations are single
observations, not performance benchmarks. The new opt-in checker uses three
workers, a 15-second timeout, a 16 MiB body limit and a 40-million-pixel decode
limit. It contacts only selected inventory hosts and never runs during builds:

```sh
node scripts/audit-external-images.mjs /tmp/image-inventory.json
node scripts/check-external-images.mjs /tmp/image-inventory.json /tmp/image-check.json cloud.githubusercontent.com,user-images.githubusercontent.com
```

The checker exits nonzero if any selected source is unavailable, invalid or
exceeds its limits. Transport failures are inconclusive about permanent removal.

## Local validation

Astro check: zero errors/warnings/hints. All 40 tests pass. Fresh collection
sealed 727 inputs and rendered 1,519 routes plus 404. Static verification passes
with all 37 historical source records and their original hashes. The reader/image
browser suite decodes the new images on affected articles; all 809 audited URLs
pass. The existing performance report remains readable by the updated summarizer
and passes unchanged budget checks. Prefixed rendering is verified separately.

## Public release

[Pages release 41307063686](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41307063686)
passed build, deploy and incident reporting. The public build record identifies
commit `ad623326343c898b0e560d515b3004e75a01250d` and its 727-input snapshot.
[Public build record](public-build-info.json). The complete preserved-image and
reader suite passes on the custom domain, including the new 2022/2025 originals:
[public browser results](public-browser.txt).

## Final production measurements

[Performance run 41307265168](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41307265168)
passes all unchanged budgets after deployment. All 18 mobile samples score 100
for performance; each route's minimum accessibility and SEO score is 100.
Median LCP ranges from 1.20 to 1.61 seconds; all measured CLS values are zero.
These small differences from the earlier baseline are not evidence of an
image-change speed improvement: those five images are on different article
routes and runner/network variation is uncontrolled.

The corrected harness records **GitHub Actions Linux X64** and observes the
same deployed commit, built timestamp and content snapshot before and after all
measurements. [Final report](release/REPORT.md),
[manifest with publication identity](release/manifest.json),
[summary](release/summary.json), [budgets](release/budgets.json).
The raw reports remain in the workflow artifact for 30 days.
