# Freshness, assistive semantics and upstream publishing

Life and Location distinguish the page refresh time from the newest location
record. Steps, Sleep and Coding Time show their latest source dates; GitHub
activity displays its check date, including a cached label where applicable.
Dates do not imply new records were generated at refresh time. The refresh time
uses the snapshot clock, so it identifies collection rather than render finish.
Music has no source date in its current API and is not assigned an invented one.

Search status is atomic and polite, its result list has a name, and the GitHub
chart summary includes the total and what the calendar represents.
`assistive-semantics.mjs` checks the browser accessibility tree, keyboard search
navigation/reset and freshness text. A real spoken VoiceOver/NVDA session is
not available here and has not been performed. The
[VoiceOver review guide](../../operations/SCREEN-READER-REVIEW.md) records the
remaining human acceptance checks.

[Upstream publication watcher](../../operations/UPSTREAM-PUBLICATIONS.md)
uses this website's token to detect successful public Pages publications in
Notes, Life and Everything and dispatch its own build. It does not install a
cross-repository token or claim instant webhook delivery. Hourly fallback stays.
A dry-run check against the real APIs succeeded without requesting a build.
Manual Everything API run 41447654887 succeeded and initiated its Pages build.

Local Astro check has zero diagnostics; all 41 tests pass. Browser semantics
checks pass. Release and full accessibility results are appended after checking.

## Validation

- [Release 41447824665](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41447824665)
  passed build, deployment and public smoke.
- All 50 local accessibility route/theme checks pass; all 809 audited URLs pass.
  [Local accessibility output](local-accessibility.txt).
- Public browser accessibility-tree/keyboard/freshness checks pass.
  [Public semantics output](public-semantics.txt), [build identity](public-build-info.json).
- [Watcher 41447836151](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41447836151)
  authenticated with the website's GITHUB_TOKEN, detected Everything's successful
  publication and skipped dispatch while a website build was already pending.
- [Watcher 41448156414](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41448156414)
  confirmed no upstream changes after the release and requested no duplicate build.
- A second manual Everything API run 41448180372 succeeded with no source
  changes and no Pages publication, correctly requiring no website refresh.
  For the positive-path exercise, its same-content Pages rebuild completed at
  12:53:50 UTC (commit `450ee1ca0032a6f2fd8325e0c0e27df1c204eaa1`).
- [Watcher 41448437422](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41448437422)
  then detected that publication and successfully dispatched production run
  41448484950 using its own Actions token. This verifies the dispatch permission
  and positive path without introducing a cross-repository credential.
- [Dispatched production run 41448484950](https://github.com/AnandChowdhary/anandchowdhary.com/actions/runs/41448484950)
  passed build, deploy, public smoke and reporting. The
  [final build record](final-build-info.json) is newer than the tested upstream
  publication, completing the Everything publication → watcher → website path.

The shared API detection path is enabled for Notes and Life, but this exercise
did not create a synthetic Note or mutate life data to force their publications.
Their future successful Pages publications use the same watcher logic.
