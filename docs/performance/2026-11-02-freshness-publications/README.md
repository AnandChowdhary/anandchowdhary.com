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
