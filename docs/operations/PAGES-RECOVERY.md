# Recover a retained GitHub Pages artifact

Use **Recover GitHub Pages artifact** in Actions, from `main`. Select a completed,
successful run of `.github/workflows/pages.yml` on `main` in this repository.
Normal production artifacts are retained for seven days after this change; older
runs may already have expired under the previous one-day retention policy.

First rehearse the chosen run without changing the public site:

```sh
gh workflow run pages-recover.yml -f source_run_id=RUN_ID -f operation=rehearse
```

Inspect the completed prepare job and its recovery receipt. To publish that same
artifact through the official Pages deployment action:

```sh
gh workflow run pages-recover.yml -f source_run_id=RUN_ID -f operation=deploy
```

Recovery downloads the retained artifact without installing app dependencies,
rebuilding, or fetching content feeds. It checks source provenance, safely
extracts the TAR, verifies the original commit/base, sitemap routes and local
assets, then serves and smoke-tests the recovered site. Forks, failed runs,
expired artifacts and artifacts from the recovery workflow are rejected.

Original files, including `build-info.json` and its build timestamp, remain
unchanged. An additive `recovery.json` records the source run, snapshot, payload
hash, original timestamp, recovery timestamp and six-hour expiry. The receipt is
retained for 30 days. Freshness checks accept an older build only within this
matching recovery window. This is temporary incident recovery, not permission
to keep stale content indefinitely. The original failed-build incident remains
open until a normal fresh publication succeeds.

Production builds and recovery share the `pages-production` concurrency group.
The next normal successful build (including the hourly fallback) supersedes a
recovery and removes its marker. After resolving the cause, run the normal Pages
workflow and confirm its public smoke check succeeds.

Rehearsal validates an older release without downgrading production. A live
exercise can publish the latest successful release's artifact, then run the
normal workflow again to return to fresh publication.
