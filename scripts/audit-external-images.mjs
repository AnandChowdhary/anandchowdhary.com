import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { parseDocument } from 'htmlparser2';
const directory = process.env.STATIC_OUTPUT_DIR || 'dist';
const destination = process.argv[2] || '.cache/external-images.json';
const sources = new Map();
let pages = 0;
function record(value, page) {
  if (!/^https?:\/\//.test(value)) return;
  const url = new URL(value);
  const entry = sources.get(value) || { url: value, host: url.hostname, pages: new Set() };
  entry.pages.add(page); sources.set(value, entry);
}
function walk(node, page) {
  if (['img','source'].includes(node.name)) {
    if (node.attribs.src) record(node.attribs.src, page);
    for (const part of (node.attribs.srcset || '').split(',')) record(part.trim().split(/\s+/)[0], page);
  }
  for (const match of (node.attribs?.style || '').matchAll(/url\(["']?(https?:\/\/[^\s"')]+)["']?\)/g)) record(match[1], page);
  for (const child of node.children || []) walk(child, page);
}
async function scan(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) await scan(file);
    else if (file.endsWith('.html')) { pages++; walk(parseDocument(await readFile(file, 'utf8')), path.relative(directory, file)); }
  }
}
await scan(directory);
const hosts = {};
for (const source of sources.values()) hosts[source.host] = (hosts[source.host] || 0) + 1;
const report = { scope: 'External img/source and inline background URLs in generated HTML; no network availability check', pages, uniqueSources: sources.size, hosts, sources: [...sources.values()].map(source => ({ ...source, pages: [...source.pages].sort() })).sort((a,b) => a.url.localeCompare(b.url)) };
await mkdir(path.dirname(destination), { recursive: true });
await writeFile(destination, JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({ pages, uniqueSources: sources.size, hosts, report: destination }, null, 2));
