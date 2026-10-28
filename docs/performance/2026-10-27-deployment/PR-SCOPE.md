# Pull request scope — 2026-10-28

This PR publishes the verified Astro migration, including the Node 24
build/contracts workflow. The account owner enabled workflow edits for the
Nebula GitHub connection after the initial push was rejected.

The build/contracts job runs clean installation, type checks, all contract tests,
production build, emitted-output verification and the isolated packaged-runtime
check. Existing production smoke and weekly link-audit workflows remain in place;
the smoke workflow comments now describe the framework-independent checks.

The original proposed changes are retained in `proposed-workflow-changes.patch`
for historical reference; they have now been applied. Earlier reports of the
workflow permission blocker describe the initial rejected push and are superseded
by this update. No alternate credential was used.

Production promotion remains pending. Updating this PR does not merge the source
or switch the public custom domains. See COMPARISON.md and staged-verification.json
for measured evidence and limitations.
