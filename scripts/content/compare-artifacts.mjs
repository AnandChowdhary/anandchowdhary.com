import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';
import { htmlRedirectTarget } from '../static-redirect.mjs';
const [reference, candidate, destination] = process.argv.slice(2);
const routes = JSON.parse(await readFile('.astro/static-routes.json', 'utf8'));
const normalize = value => value.replace(/\s+/g, ' ').trim();
const children = node => node.children || [];
const text = node => node.type === 'text' ? node.data : ['script','style','svg'].includes(node.name) ? '' : children(node).map(text).join('');
const walk = (node, predicate) => [...(predicate(node) ? [node] : []), ...children(node).flatMap(child => walk(child, predicate))];
function semantics(html) {
  const doc = parseDocument(html);
  const body = walk(doc, node => node.name === 'body')[0];
  if (!body) throw Error('Missing body');
  const elements = walk(body, node => Boolean(node.name));
  return {
    title: normalize(text(walk(doc, node => node.name === 'title')[0] || {})),
    meta: walk(doc, node => node.name === 'meta' && (node.attribs.name || node.attribs.property)).map(node => [node.attribs.name || node.attribs.property, node.attribs.content]).sort(),
    text: normalize(text(body)),
    headings: elements.filter(node => /^h[1-6]$/.test(node.name)).map(node => [node.name, normalize(text(node))]),
    links: elements.filter(node => node.name === 'a').map(node => node.attribs.href).sort(),
    images: elements.filter(node => node.name === 'img').map(node => Object.fromEntries(['src','srcset','sizes','alt','width','height','loading','decoding','fetchpriority'].filter(key => key in node.attribs).map(key => [key,node.attribs[key]]))),
  };
}
const mismatches = [];
for (const route of [...routes, '__404__']) {
  const filename = route === '__404__' ? '404.html' : path.join(route,'index.html');
  const a = await readFile(path.join(reference, filename), 'utf8');
  const b = await readFile(path.join(candidate, filename), 'utf8');
  const targetA = htmlRedirectTarget(a, 'https://anandchowdhary.com');
  const targetB = htmlRedirectTarget(b, 'https://anandchowdhary.com');
  if (targetA || targetB) { if (targetA !== targetB) mismatches.push({ route, field: 'redirect' }); continue; }
  const left = semantics(a), right = semantics(b);
  for (const key of Object.keys(left)) if (JSON.stringify(left[key]) !== JSON.stringify(right[key])) mismatches.push({ route, field: key });
}
for (const file of ['sitemap.xml','llms/index.html','llms.txt']) {
  if (!(await readFile(path.join(reference,file))).equals(await readFile(path.join(candidate,file)))) mismatches.push({route:file,field:'bytes'});
}
for (const file of await readdir(path.join(reference,'_images'))) {
  const a=await readFile(path.join(reference,'_images',file));const b=await readFile(path.join(candidate,'_images',file));
  if (!a.equals(b)) mismatches.push({route:file,field:'image bytes'});
}
const result = { reference, candidate, routes: routes.length, includes404: true, discoveryFiles: 3, checks: ['metadata','visible text','headings','links','image attributes','redirect destinations','discovery bytes','optimized image bytes'], passed: mismatches.length === 0, mismatches };
console.log(JSON.stringify(result, null, 2));
if (destination) { await mkdir(path.dirname(destination), {recursive:true}); await writeFile(destination,JSON.stringify(result,null,2)+'\n'); }
if (mismatches.length) process.exitCode = 1;
