# Active hosting update — 2026-10-28

The user approved GitHub Pages using official Actions artifact deployment. Follow
[GITHUB-PAGES.md](GITHUB-PAGES.md) for the current implementation and release
status. All Vercel performance results below remain historical measurements; do
not present them as Pages hosting results. Static rebuild and HTML redirect
behavior supersede the former runtime ISR/status-code release gates.

# Performance work and migration status

The production baseline is complete: 48 Lighthouse runs across six URLs, five
mobile and three desktop runs each. See [results](2026-10-26-baseline/REPORT.md)
and the [initial findings](2026-10-26-baseline/FINDINGS.md).

After reviewing the baseline, the user requested a migration plan. The earlier
recommendation to optimize Next.js before choosing a framework is superseded by
that direction. **Proceed with the [Astro migration plan](MIGRATION.md).** Retain
the measurements as release criteria and to distinguish framework improvements
from image-delivery improvements. The findings file records the original baseline
recommendation, not the current implementation sequence.

## Measurement protocol

Use the six fixed URLs in [routes.json](../../scripts/performance/routes.json):
homepage, blog listing, text article, image article, projects and life dashboard.
The two articles had one and 18 image elements respectively in their initial HTML
when selected. Collect five mobile and three desktop runs per URL sequentially,
with fresh browser profiles and a pinned toolchain. Use the same runner and
comparable hosting; record deployment identity separately from checkout SHA.

Report medians and ranges for scores, LCP/FCP/TBT/CLS, speed index, JavaScript
execution/main-thread time, Lighthouse long tasks, unused-JS estimates and
transferred asset bytes. Keep raw reports, individual samples and failed requests.
Do not compare unlike asset/content versions or a local build with remote
production as evidence of a framework improvement. Re-measure production alongside
the candidate because the baseline has substantial run variability.

Record HTTP status, redirect destinations, cache headers, repeated GET timings,
and routing observations. Browser-cold does not mean CDN-cold. Test source updates
and errors on the actual deployment; `Age` is not sufficient proof of freshness.
Measure build duration and runtime/image-cache usage during the candidate rehearsal.

Query available CrUX URL/origin data by device for p75 LCP, INP and CLS. The baseline
public PageSpeed API returned 429 quota errors, which is not proof of insufficient
traffic. Lab TBT cannot establish INP. Field goals remain LCP <=2.5 seconds,
INP <=200 ms and CLS <=0.1 at p75; the migration plan defines lab and parity gates.

## Current milestone

The root application has been migrated to Astro. All 45 page templates and the
three discovery endpoints are implemented; Next.js dependencies/configuration
have been removed. Clean Node 24 install, type check, contract tests and the Vercel
build pass. The built function has passed smoke checks and the 801-URL inventory.
See [implementation status](STATUS.md) for evidence and limitations.

Full-page coverage now includes all 45 templates on desktop/mobile; a separate
48-pair matrix covers the six baseline routes in light/dark and normal/screenshot
modes. A font-scope mismatch found on the versions detail page was corrected and
both follow-up full-page captures are pixel-identical. Optimized-image and
third-party asset differences remain documented for deployed review.

The 48-sample local Lighthouse diagnostic is complete: mobile median performance
scores 98–100 and LCP 1.36–2.29 seconds, with CLS below 0.1 in every sample. The
homepage landmark and descriptive life-link fixes have targeted follow-up audits.
Local results are diagnostic; release requires a deployed candidate and a fresh
production comparison on comparable hosting. See [status and evidence](STATUS.md).

The protected Vercel candidate now passes the 801-URL audit, browser interactions,
48 visual comparisons, native image restrictions and a separate real cache/ISR
rehearsal. The 48-run deployed candidate and 48-run fresh production comparison are complete,
with 16 raw-image control runs; all automated release budgets pass.
See [status](STATUS.md) for immutable deployment identities and rollback settings.
Production has not been changed by this workspace.

Follow the [runner instructions](../../scripts/performance/README.md) to reproduce
measurements. Complete compressed reports are in the local baseline `raw/` folder,
ignored by Git; archive them with the tracked summaries when sharing the results.
