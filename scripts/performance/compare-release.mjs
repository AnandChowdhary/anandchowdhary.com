import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
const root = path.resolve('docs/performance');
const load = async name => JSON.parse(await readFile(path.join(root, name, 'summary.json'), 'utf8'));
const baseline = await load('2026-10-27-production');
const candidate = await load('2026-10-27-astro-lazy-counters');
const controls = [await load('2026-10-27-control-text'), await load('2026-10-27-control-projects')];
const median = (group, metric) => group.metrics[metric]?.median;
const find = (data, group) => data.groups.find(g => g.route === group.route && g.device === group.device);
const budgets = [];
let md = '# Deployed release comparison\n\nSame sandbox, Chrome and Lighthouse versions; sequential fresh-browser samples, five mobile and three desktop runs per route. Both builds use the existing Vercel project. Browser-cold is not CDN-cold. See each manifest for exact timestamps and individual ranges.\n\n| Route | Device | Next LCP s | Astro LCP s | Next performance | Astro performance | Next image KiB | Astro image KiB |\n|---|---|---:|---:|---:|---:|---:|---:|\n';
const fmt = (v, divisor = 1, digits = 2) => v == null ? 'unknown' : (v / divisor).toFixed(digits);
for (const group of candidate.groups) {
 const old = find(baseline, group);
 md += `| ${group.path} | ${group.device} | ${fmt(median(old,'lcpMs'),1000)} | ${fmt(median(group,'lcpMs'),1000)} | ${fmt(median(old,'performance'),1,0)} | ${fmt(median(group,'performance'),1,0)} | ${fmt(median(old,'imageBytes'),1024,1)} | ${fmt(median(group,'imageBytes'),1024,1)} |\n`;
 if(group.device==='mobile')budgets.push({route:group.route,metric:'median LCP <=2500ms',value:median(group,'lcpMs'),passed:median(group,'lcpMs')<=2500});
 for(const metric of group.device==='desktop'?['lcpMs']:['tbtMs']) {
  const before=median(old,metric),after=median(group,metric);
  if(after-before>=100&&after>before*1.1)budgets.push({route:group.route,device:group.device,metric:`Investigate ${metric} regression`,before,after,passed:false});
 }
}
const clsMax=Math.max(...candidate.samples.map(s=>s.cls));budgets.push({metric:'CLS <=0.1 every run',value:clsMax,passed:clsMax<=0.1});
const projects=candidate.groups.find(g=>g.route==='projects'&&g.device==='mobile');
const originalImageBytes=7.71*1024*1024;const projectBytes=median(projects,'imageBytes');
budgets.push({metric:'Project images >=70% lower than initial 7.71MiB baseline',value:projectBytes,reduction:1-projectBytes/originalImageBytes,passed:projectBytes<=originalImageBytes*0.3});
budgets.push({metric:'No RSC requests in candidate samples',passed:candidate.samples.every(s=>s.rscRequests===0)});
md += '\n## Raw-image vertical-slice control\n\nThe control uses Astro with direct original image URLs; project cards retain original lazy loading. Other non-image migration fixes remain, so this isolates image delivery more closely than a pure framework-only experiment. The repaired historical article is excluded.\n\n| Route | Device | Next LCP s | Astro raw-image LCP s | Astro optimized LCP s | Raw images KiB | Optimized images KiB | Next JS KiB | Raw Astro JS KiB |\n|---|---|---:|---:|---:|---:|---:|---:|---:|\n';
for(const control of controls)for(const group of control.groups){const old=find(baseline,group),optimized=find(candidate,group);md+=`| ${group.path} | ${group.device} | ${fmt(median(old,'lcpMs'),1000)} | ${fmt(median(group,'lcpMs'),1000)} | ${fmt(median(optimized,'lcpMs'),1000)} | ${fmt(median(group,'imageBytes'),1024,1)} | ${fmt(median(optimized,'imageBytes'),1024,1)} | ${fmt(median(old,'jsBytes'),1024,1)} | ${fmt(median(group,'jsBytes'),1024,1)} |\n`;}
md += '\n## Automated budget observations\n\n';for(const budget of budgets)md+=`- ${budget.passed?'PASS':'REVIEW'}: ${budget.route?budget.route+' ':''}${budget.metric}${budget.value===undefined?'':` (${budget.value})`}.\n`;
md += '\n## Interpretation limits\n\nPreview SEO scores reflect Vercel noindex protection and must be rechecked on the production custom domain. Desktop previews include an external Vercel feedback toolbar, retained in transfer totals. Home and life inherit broken third-party avatar/contribution assets, preventing a blanket 100 best-practices claim. Restored podcast artwork intentionally differs from the broken production page. Source feeds remain live; the captures are close in time, not immutable content fixtures. No field INP, global speed, billed usage or cost improvement is established by these lab results.\n';
await writeFile(path.join(root,'2026-10-27-deployment/COMPARISON.md'),md);
await writeFile(path.join(root,'2026-10-27-deployment/budgets.json'),JSON.stringify({budgets,passed:budgets.every(b=>b.passed)},null,2)+'\n');
if(budgets.some(b=>!b.passed))process.exitCode=1;
