// Local-only image transformation matching the configured Vercel URL contract.
// Production uses Vercel's image service, not this module.
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
const widths = new Set([384, 640, 828, 1080, 1280, 1920]);
const pending = new Map();
export async function previewImage(url) {
  const src = url.searchParams.get('url') || '';
  const width = Number(url.searchParams.get('w'));
  const quality = Number(url.searchParams.get('q') || 90);
  let allowed = src === '/anand.jpg';
  if (!allowed) {
    try {
      const remote = new URL(src);
      allowed = remote.protocol === 'https:' && remote.hostname === 'raw.githubusercontent.com' && remote.pathname.startsWith('/AnandChowdhary/') && !/\.(svg|gif)(?:\?|$)/i.test(src);
    } catch {}
  }
  if (!allowed || !widths.has(width) || !Number.isInteger(quality) || quality < 1 || quality > 100) return new Response('Invalid image transform', {status:400});
  const key = `${src}:${width}:${quality}`;
  if (!pending.has(key)) {
    const transform = async () => {
      const input = src === '/anand.jpg' ? await readFile(fileURLToPath(new URL('../public/anand.jpg',import.meta.url))) : await (await fetch(src,{signal:AbortSignal.timeout(20000)}).then(response=>{if(!response.ok)throw new Error(`Image source: ${response.status}`);return response;})).arrayBuffer();
      return sharp(Buffer.from(input)).resize({width,withoutEnlargement:true}).webp({quality}).toBuffer();
    };
    pending.set(key,transform().catch(error=>{pending.delete(key);throw error;}));
    if (pending.size > 200) pending.delete(pending.keys().next().value);
  }
  return new Response(await pending.get(key),{headers:{'Content-Type':'image/webp','Cache-Control':'public, max-age=3600'}});
}
