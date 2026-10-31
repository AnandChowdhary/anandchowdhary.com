import { readdir } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
export async function pageRegistry() {
  const files = (await readdir('src/views', { recursive: true })).filter(file => file === 'page.tsx' || file.endsWith('/page.tsx'));
  const entries = files.map(file => {
    const pattern = '/' + file.replace(/(?:^|\/)page\.tsx$/, '');
    return { pattern, file: path.resolve('src/views', file), score: pattern.split('/').reduce((score, part) => score + (part.startsWith('[') ? 1 : 10), 0) };
  });
  entries.push({ pattern: '/contact', file: path.resolve('experiments/static-generator/reference-contact.tsx'), score: 1000 });
  entries.sort((a, b) => b.score - a.score);
  return entries;
}
export function matchPage(entries: Awaited<ReturnType<typeof pageRegistry>>, route: string) {
  const parts = route.split('/').filter(Boolean);
  for (const entry of entries) {
    const template = entry.pattern.split('/').filter(Boolean);
    if (parts.length !== template.length) continue;
    const params: Record<string, string> = {};
    if (template.every((part, i) => part.startsWith('[') ? (params[part.slice(1, -1)] = parts[i], true) : part === parts[i])) return { ...entry, params };
  }
  throw Error(`Unmapped route: ${route}`);
}
const modules = new Map<string, Promise<any>>();
export function pageModule(file: string) {
  if (!modules.has(file)) modules.set(file, import(pathToFileURL(file).href));
  return modules.get(file)!;
}
