/** Read only same-origin, immediate HTML redirects emitted by static Astro. */
export function htmlRedirectTarget(html, from) {
  for (const tag of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (!/http-equiv\s*=\s*["']refresh["']/i.test(tag[0])) continue;
    const content=tag[0].match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1];
    const target=content?.match(/^\s*0\s*;\s*url\s*=\s*(.+?)\s*$/i)?.[1]?.replaceAll('&amp;','&');
    if (!target) continue;
    try { const url=new URL(target,from);if(url.origin===new URL(from).origin)return url.href; } catch {}
  }
  return null;
}
