import { parseDocument } from 'htmlparser2';
import { htmlRedirectTarget } from '../static-redirect.mjs';
const children = node => node.children || [];
function find(node, predicate) {
  if (predicate(node)) return node;
  for (const child of children(node)) { const found = find(child, predicate); if (found) return found; }
}
const text = node => !node ? '' : node.type === 'text' ? node.data : ['script','style','svg','nav','footer'].includes(node.name) || node.attribs?.['aria-hidden'] === 'true' ? '' : children(node).map(text).join(' ');
const plain = node => text(node).replace(/\s+/g, ' ').trim();

export function searchDocument(route, html, base = '') {
  const section = /^\/(blog|projects)\/\d{4}\/[^/]+$/.exec(route)?.[1];
  if (!section || htmlRedirectTarget(html, 'https://anandchowdhary.com')) return null;
  const doc = parseDocument(html);
  const main = find(doc, node => node.name === 'main');
  const title = plain(find(main || doc, node => node.name === 'h1'));
  const description = find(doc, node => node.name === 'meta' && node.attribs?.name === 'description')?.attribs.content || '';
  if (!main || !title) throw Error(`Cannot index search document: ${route}`);
  return { url: base + route, section, title, description, text: plain(main) };
}
