import type { Metadata } from '../../src/lib/metadata';
const escape = (value: string) => value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const meta = (name: string, content?: string, property = false) => content ? `<meta ${property ? 'property' : 'name'}="${name}" content="${escape(content)}">` : '';
export function document(metadata: Metadata, html: string, css: string[], pathname: string) {
  const lightbox = /^\/blog\/[^/]+\/[^/]+$/.test(pathname);
  const og = metadata.openGraph ? { title: metadata.title, description: metadata.description, ...metadata.openGraph } : undefined;
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${escape(metadata.title || '')}</title>
<meta name="description"${metadata.description === undefined ? '' : ` content="${escape(metadata.description)}"`}>${meta('robots', metadata.robots)}
${metadata.authors?.map(author => `${author.url ? `<link rel="author" href="${escape(author.url)}">` : ''}${meta('author', author.name)}`).join('') || ''}
${meta('creator', metadata.creator)}${meta('publisher', metadata.publisher)}
${Object.entries(og || {}).filter(([key]) => key !== 'images').map(([key, value]) => meta(`og:${key === 'siteName' ? 'site_name' : key}`, value as string, true)).join('')}
${og?.images?.map(image => meta('og:image', image.url, true) + meta('twitter:image', image.url)).join('') || ''}
${Object.entries(metadata.twitter || {}).map(([key, value]) => meta('twitter:' + key, value)).join('')}
<link rel="icon" href="/favicon.ico" sizes="32x32" type="image/x-icon"><link rel="icon" href="/icon.png" sizes="481x481" type="image/png">
<link rel="preload" href="/fonts/caa3a2e1cccd8315-s.p.0zr6hhvz-h9nw.woff2" as="font" type="font/woff2" crossorigin><link rel="preload" href="/fonts/797e433ab948586e-s.p.1v5bejj26fx9h.woff2" as="font" type="font/woff2" crossorigin>
${css.map(file => `<link rel="stylesheet" href="${file}">`).join('')}
<script>if(new URLSearchParams(location.search).get('screenshot')==='true')document.documentElement.dataset.screenshot='true';</script>
<style>html[data-screenshot='true'] .site-container{padding:2rem;padding-bottom:5rem}html[data-screenshot='true'] .site-container>:not(:last-child){margin-block-end:3rem}html[data-screenshot='true'] .home-main>:not(:last-child){margin-block-end:3rem}html[data-screenshot='true'] .site-container>header{zoom:.66}#image-lightbox::backdrop{background:transparent}@view-transition{navigation:auto}header a[href='/'] svg{view-transition-name:signature}@media(prefers-reduced-motion:reduce){::view-transition-group(*){animation-duration:0s!important}}</style>
</head><body class="antialiased selection:bg-neutral-500/20">${html}${pathname === '/search' ? '<script type="module" src="/assets/search.js"></script>' : ''}${lightbox ? '<script type="module" src="/assets/lightbox.js"></script>' : ''}${pathname === '/' ? '<script type="module" src="/assets/counters.js"></script>' : ''}</body></html>`;
}

export function redirectDocument(location: string) { return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta http-equiv="refresh" content="0;url=${escape(location)}"><meta name="robots" content="noindex"><title>Redirecting</title></head><body><a href="${escape(location)}">Continue</a></body></html>`; }
