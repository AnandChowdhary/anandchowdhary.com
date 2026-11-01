import assert from 'node:assert/strict';
export const RECOVERY_WINDOW_MS = 6 * 60 * 60 * 1000;

export function validateRecoverySource(run, artifact, repository) {
  assert.equal(run.status, 'completed', 'Source run has not completed');
  assert.equal(run.conclusion, 'success', 'Source run must have succeeded');
  assert.equal(run.path, '.github/workflows/pages.yml', 'Source must be the production Pages workflow');
  assert.equal(run.head_branch, 'main', 'Source must be main');
  assert.equal(run.repository.full_name.toLowerCase(), repository.toLowerCase(), 'Wrong repository');
  assert.equal(run.head_repository.full_name.toLowerCase(), repository.toLowerCase(), 'Fork artifacts cannot be recovered');
  assert.ok(['push','schedule','workflow_dispatch','repository_dispatch'].includes(run.event), 'Unapproved source event');
  assert.match(run.head_sha, /^[a-f0-9]{40}$/, 'Invalid source commit');
  assert.equal(artifact.name, 'github-pages', 'Wrong artifact');
  assert.equal(artifact.expired, false, 'Source artifact has expired');
  if (artifact.workflow_run?.id) assert.equal(artifact.workflow_run.id, run.id, 'Artifact run mismatch');
  if (artifact.workflow_run?.head_sha) assert.equal(artifact.workflow_run.head_sha, run.head_sha, 'Artifact commit mismatch');
  return { commit: run.head_sha, artifactId: artifact.id, sourceRunId: run.id };
}

export function publicationFreshness(info, recovery, now = Date.now()) {
  const builtAt = Date.parse(info.builtAt);
  const age = now - builtAt;
  if (!Number.isFinite(age) || age < -300000) return { ok: false, detail: 'Invalid build timestamp' };
  if (age < RECOVERY_WINDOW_MS) return { ok: true, detail: `built ${info.builtAt}` };
  const restored = Date.parse(recovery?.recoveredAt);
  const expires = Date.parse(recovery?.expiresAt);
  const matches = recovery?.version === 1 && recovery.sourceCommit === info.commit &&
    recovery.sourceSnapshot === (info.contentSnapshot?.id ?? null) &&
    /^\d+$/.test(String(recovery.sourceRunId)) &&
    Number.isFinite(restored) && restored <= now + 300000 &&
    expires - restored === RECOVERY_WINDOW_MS && now < expires;
  return { ok: matches, detail: matches ? `recovered ${recovery.recoveredAt}; original build ${info.builtAt}; recovery expires ${recovery.expiresAt}` : `stale build ${info.builtAt}; no matching unexpired recovery` };
}
