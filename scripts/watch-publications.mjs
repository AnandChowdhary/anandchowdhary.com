import assert from 'node:assert/strict';
const repository = process.env.GITHUB_REPOSITORY || 'AnandChowdhary/anandchowdhary.com';
const sources = ['notes','life','everything'];
const headers = {Accept:'application/vnd.github+json',Authorization:`Bearer ${process.env.GITHUB_TOKEN}`};
async function api(route, options = {}) {
  const response = await fetch('https://api.github.com/repos/'+route,{headers,...options,signal:AbortSignal.timeout(20000)});
  if (!response.ok) throw Error(`GitHub ${response.status}: ${route}`);
  return response.status === 204 ? null : response.json();
}
const response = await fetch('https://anandchowdhary.com/build-info.json',{signal:AbortSignal.timeout(20000),cache:'no-store'});
assert.ok(response.ok,'Published build record unavailable');
const published = await response.json();
const builtAt = Date.parse(published.builtAt);
assert.ok(Number.isFinite(builtAt),'Invalid published build timestamp');
const changed = [];
for (const source of sources) {
  const build = await api(`AnandChowdhary/${source}/pages/builds/latest`);
  if (build.status === 'built' && Date.parse(build.updated_at) > builtAt) changed.push({repository:source,commit:build.commit,publishedAt:build.updated_at});
}
console.log(JSON.stringify({builtAt:published.builtAt,changed},null,2));
if (!changed.length || process.argv.includes('--dry-run')) process.exit(0);
const runs = await api(`${repository}/actions/workflows/pages.yml/runs?branch=main&per_page=20`);
if (runs.workflow_runs.some(run => ['queued','in_progress','waiting','pending','requested'].includes(run.status))) {
  console.log('A production build is already pending; next check will reassess.');
  process.exit(0);
}
await api(`${repository}/actions/workflows/pages.yml/dispatches`,{method:'POST',body:JSON.stringify({ref:'main'})});
console.log('Dispatched production build after successful upstream Pages publication.');
