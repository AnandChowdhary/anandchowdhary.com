import { appendFile } from 'node:fs/promises';
import { validateRecoverySource } from './recovery-policy.mjs';
const repository = process.env.GITHUB_REPOSITORY;
const id = process.env.SOURCE_RUN_ID;
if (!/^\d+$/.test(id || '')) throw Error('Source run ID must contain only digits');
if (process.env.GITHUB_REF !== 'refs/heads/main') throw Error('Recovery must run from main');
async function api(path) {
  const response = await fetch(`https://api.github.com/repos/${repository}/${path}`, { headers: { Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' } });
  if (!response.ok) throw Error(`GitHub ${response.status}: ${path}`);
  return response.json();
}
const run = await api(`actions/runs/${id}`);
const artifacts = (await api(`actions/runs/${id}/artifacts?per_page=100`)).artifacts.filter(artifact => artifact.name === 'github-pages');
if (artifacts.length !== 1) throw Error('Expected one retained github-pages artifact');
const source = validateRecoverySource(run, artifacts[0], repository);
await appendFile(process.env.GITHUB_OUTPUT, `commit=${source.commit}\nartifact_id=${source.artifactId}\n`);
console.log(`Validated production run ${id}, commit ${source.commit}, artifact ${source.artifactId}`);
