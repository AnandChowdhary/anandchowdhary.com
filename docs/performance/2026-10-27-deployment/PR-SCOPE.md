# Pull request scope — 2026-10-28

This PR publishes the verified Astro migration without changing GitHub Actions
workflow files. The GitHub connection can publish repository code but lacks the
workflow permission required to create the proposed build/contracts workflow.
Existing production smoke and weekly link-audit workflows are preserved unchanged;
they already use Node 24 on the base revision.

The exact proposed workflow additions/comment changes are retained in
`proposed-workflow-changes.patch` for a later authorized update. The new automated
PR build/contracts job is not active in this PR. Equivalent type checks, all 13
contracts, clean cloud builds, build-output checks and isolated runtime checks
passed during the recorded rehearsal. Vercel's configured build command still
runs output and isolated-runtime guards on every deployment.

Earlier reports describe the initial push rejection and proposed workflow job.
This separate branch resolves source publication by omitting workflow mutations;
it does not change the integration's permissions or use another credential.
Production promotion remains pending; creating this PR does not merge the source
or switch the public custom domains. See COMPARISON.md and staged-verification.json
for measured evidence and limitations.
