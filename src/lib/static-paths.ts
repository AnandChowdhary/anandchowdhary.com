import { mkdirSync, writeFileSync } from 'node:fs';
import slugify from '@sindresorhus/slugify';
import { generateSitemap } from '@/views/llms.txt/generator';
import { getAllArchiveItems, getAllLocations, getAllProjects, getProjectTags } from '@/views/api';
import { withSourceContext } from './source';

const sections = ['blog','books','events','life','location','notes','open-source','press','projects','themes','versions','videos'];
const shortSlugSections = new Set(['blog','books','events','notes','press','projects']);
let inventory: Promise<string[]> | undefined;
export function staticInventory(): Promise<string[]> {
  return inventory ??= withSourceContext(async () => {
    const [links, archive, locations, projects] = await Promise.all([
      generateSitemap(), getAllArchiveItems(), getAllLocations(), getAllProjects(),
    ]);
    const paths = new Set(['/', '/about','/contact','/mentoring','/now','/archive','/search','/life/food',...sections.map(s=>`/${s}`)]);
    const add = (url: string) => {
      const parsed = new URL(url, 'https://anandchowdhary.com');
      if (parsed.origin !== 'https://anandchowdhary.com' || parsed.pathname.startsWith('/okrs/')) return;
      paths.add(decodeURI(parsed.pathname).replace(/\/$/, '') || '/');
    };
    links.forEach(link => add(link.url));
    archive.forEach(item => add(item.url));
    locations.forEach(item => {
      const year = new Date(item.date).getUTCFullYear();
      add(`/location/${year}`); add(`/location/${year}/${item.slug}`);
    });
    projects.flatMap(getProjectTags).forEach(tag => add(`/projects/tags/${slugify(tag.toLowerCase())}`));
    // Retain known aliases even when a content feed stops referencing them.
    ['/press/2017/your-story','/open-source/2014/essential.css','/location/2014/japan','/videos/2017/bharat-hacks-live'].forEach(add);
    for (const link of links) {
      const path = decodeURI(new URL(link.url).pathname);
      const parts = path.split('/').filter(Boolean);
      if (parts.length === 3 && /^\d{4}$/.test(parts[1]) && shortSlugSections.has(parts[0])) add(`/${parts[0]}/${parts[2]}`);
    }
    const result = [...paths].sort();
    mkdirSync('.astro', { recursive: true });
    writeFileSync('.astro/static-routes.json', JSON.stringify(result, null, 2));
    return result;
  });
}
export async function pathsFor(pattern: string) {
  const template = pattern.split('/').filter(Boolean);
  return (await staticInventory()).flatMap(path => {
    const parts = path.split('/').filter(Boolean);
    if (parts.length !== template.length) return [];
    const params: Record<string,string> = {};
    for (let i=0;i<template.length;i++) {
      if (template[i].startsWith('[')) params[template[i].slice(1,-1)] = parts[i];
      else if (template[i] !== parts[i]) return [];
    }
    // /projects/tags is an explicit nested route, never a year/slug record.
    if (params.year === 'tags' || (pattern === '/life/[year]' && params.year === 'food')) return [];
    return [{ params }];
  });
}
