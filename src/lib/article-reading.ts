import { Marked, Renderer } from 'marked';
import { markedSmartypants } from 'marked-smartypants';
import slugify from '@sindresorhus/slugify';
import { parseDocument, DomUtils } from 'htmlparser2';
import { preserveHistoricalImages } from './historical-images';
export interface ArticleHeading { id: string; label: string; depth: number }

export async function renderArticleReading(markdown: string) {
  const headings: ArticleHeading[] = [];
  const used = new Set([...markdown.matchAll(/\bid\s*=\s*["']([^"']+)["']/g)].map(match => match[1]));
  const renderer = new Renderer();
  renderer.heading = function ({ tokens, depth }) {
    const content = this.parser.parseInline(tokens);
    if (depth !== 2 && depth !== 3) return `<h${depth}>${content}</h${depth}>\n`;
    const label = DomUtils.textContent(parseDocument(content)).trim();
    const stem = `section-${slugify(label) || 'untitled'}`;
    let id = stem, number = 2;
    while (used.has(id)) id = `${stem}-${number++}`;
    used.add(id);
    headings.push({ id, label: label || 'Untitled section', depth });
    return `<h${depth} id="${id}">${content}</h${depth}>\n`;
  };
  const parser = new Marked(markedSmartypants());
  const html = preserveHistoricalImages(await parser.parse(markdown, { renderer }));
  const words = DomUtils.textContent(parseDocument(html)).trim().split(/\s+/u).filter(Boolean).length;
  return { html, toc: words >= 1000 && headings.length >= 3 ? headings : [] };
}
