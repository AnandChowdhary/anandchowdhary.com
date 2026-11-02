# Notes, Life and Everything publication watcher

The website's Watch upstream publications workflow checks the public latest
legacy Pages build in `AnandChowdhary/notes`, `life` and `everything` every ten
minutes. Only `status: built` publications newer than the public website's
`build-info.json` timestamp qualify. It dispatches `pages.yml` in its own repo
with its scoped `GITHUB_TOKEN` (Actions write), skips when a website build is
already pending, and reassesses on the next check. No long-lived secret is added.

You can run `API CI` / `api.yml` in `AnandChowdhary/everything` manually. Once its
API changes reach a successful Pages publication, this watcher requests a site
build. The upstream token alone cannot dispatch across repositories. This
watcher is polling, not an immediate webhook. No-op API runs need no site build.

Hourly website rebuilding remains the fallback. GitHub schedules can be delayed.
A failed or unavailable publication API fails the watcher visibly; it does not
block the independent hourly website workflow. A failed site build leaves its
published timestamp old, so later checks retry. Publication timestamps are a
trigger heuristic, not proof that every CDN response already has the new bytes;
the normal content collection checks and hourly refresh remain necessary.

Run Watch upstream publications manually after an upstream publication to check
without waiting for the scheduler. It has no app dependencies or external token.
