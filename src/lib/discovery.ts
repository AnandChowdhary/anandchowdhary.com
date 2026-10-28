import { generateSitemap } from '@/views/llms.txt/generator';
import { withSourceContext } from './source';
export const discoveryLinks = () => withSourceContext(generateSitemap);
export const escapeXml = (value: string) => value.replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&apos;' })[char]!);
export async function discoveryResponse(type: 'xml' | 'html' | 'text') {
  try {
    const links = await discoveryLinks();
    const body = type === 'xml'
      ? `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${links.map(link => `<url><loc>${escapeXml(link.url)}</loc>${link.lastModified ? `<lastmod>${link.lastModified.toISOString()}</lastmod>` : ''}</url>`).join('')}</urlset>`
      : type === 'html'
        ? `<h1>Links for LLMs</h1><ul>${links.map(link => `<li><a href="${escapeXml(link.url)}">${escapeXml(link.url)}</a></li>`).join('\n')}</ul>`
        : `# Anand Chowdhary\n\n## Links\n\n${links.map(link => `- ${link.url}`).join('\n')}`;
    return new Response(body, { headers: { 'Content-Type': `${{ xml: 'application/xml', html: 'text/html', text: 'text/plain' }[type]}; charset=utf-8` } });
  } catch (error) {
    console.error('Discovery endpoint failed', error);
    return new Response('Temporarily unavailable', { status: 503, headers: { 'Cache-Control': 'no-store', 'Retry-After': '60' } });
  }
}
