import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const directory = path.resolve(process.argv[2]);
const { groups, samples } = JSON.parse(await readFile(path.join(directory, 'summary.json'), 'utf8'));
const routes = JSON.parse(await readFile(new URL('./routes.json', import.meta.url), 'utf8'));
const checks = [];
for (const route of routes) {
  const group = groups.find(group => group.route === route.id && group.device === 'mobile');
  checks.push({ route: route.id, metric: 'three mobile samples', passed: samples.filter(sample => sample.route === route.id && sample.device === 'mobile').length === 3 });
  for (const [metric, limit, direction] of [['performance', 95, 'min'], ['lcpMs', 2500, 'max'], ['cls', 0.1, 'max'], ['accessibility', 100, 'min'], ['seo', 100, 'min']]) {
    const statistic = metric === 'cls' ? 'max' : ['accessibility', 'seo'].includes(metric) ? 'min' : 'median';
    const value = group?.metrics[metric]?.[statistic];
    checks.push({ route: route.id, metric, value: value ?? null, limit, passed: typeof value === 'number' && (direction === 'min' ? value >= limit : value <= limit) });
  }
}
const passed = checks.every(check => check.passed);
await writeFile(path.join(directory, 'budgets.json'), JSON.stringify({ passed, checks }, null, 2) + '\n');
for (const check of checks.filter(check => !check.passed)) console.error('Budget failed:', check);
if (!passed) process.exitCode = 1;
else console.log('All scheduled mobile performance budgets passed.');
