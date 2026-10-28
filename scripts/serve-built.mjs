// Local verification of the exact Vercel function bundle and static output.
// This is not a CDN/ISR emulator; deployed cache behavior is checked separately.
// For Vercel loader compatibility, run Node with --no-experimental-require-module.
import { createServer } from 'node:http';
import { previewImage } from './preview-image.mjs';
import { readFile, stat } from 'node:fs/promises';
import { Readable } from 'node:stream';
import { createGzip } from 'node:zlib';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
// Vercel's Node runtime uses UTC. Do not let a developer shell's TZ alter dates
// while comparing this bundle with the production deployment.
process.env.TZ = 'UTC';
const output = fileURLToPath(new URL('../.vercel/output/', import.meta.url));
const { default: app } = await import(new URL('../.vercel/output/functions/_isr.func/dist/server/entry.mjs', import.meta.url));
const port = Number(process.env.PORT || 4322);
const mime = { '.css': 'text/css', '.js': 'text/javascript', '.mjs': 'text/javascript', '.json': 'application/json', '.woff2': 'font/woff2', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.txt': 'text/plain' };
function send(req, res, response) {
  const headers = Object.fromEntries(response.headers);
  const acceptsGzip = (req.headers['accept-encoding'] || '').split(',').some(value => {
    const [encoding, ...parameters] = value.trim().split(';');
    return encoding === 'gzip' && !parameters.some(p => /^\s*q=0(?:\.0*)?\s*$/.test(p));
  });
  // Vercel compresses text at the edge. Approximate transport compression locally;
  // this does not emulate its cache, region, protocol or compression negotiation.
  const compress = response.body && response.status === 200 && acceptsGzip &&
    !headers['content-encoding'] && /^(text\/|application\/(json|xml|javascript)|image\/svg)/.test(headers['content-type'] || '');
  if (compress) {
    headers['content-encoding'] = 'gzip';
    headers.vary = headers.vary ? `${headers.vary}, Accept-Encoding` : 'Accept-Encoding';
    delete headers['content-length'];
  }
  res.writeHead(response.status, headers);
  if (!response.body || req.method === 'HEAD') return res.end();
  const stream = Readable.fromWeb(response.body);
  stream.on('error', error => res.destroy(error));
  if (compress) stream.pipe(createGzip()).on('error', error => res.destroy(error)).pipe(res);
  else stream.pipe(res);
}
createServer(async (req, res) => {
  try {
    const url = new URL(req.url || '/', `http://localhost:${port}`);
    if (url.pathname === '/_vercel/image') {
      const response = await previewImage(url);
      send(req, res, response);
      return;
    }
    const root = path.join(output, 'static');
    const file = path.resolve(root, `.${decodeURIComponent(url.pathname)}`);
    if (file.startsWith(root + path.sep)) {
      const info = await stat(file).catch(() => null);
      if (info?.isFile()) {
        send(req, res, new Response(await readFile(file), { headers: { 'Content-Type': mime[path.extname(file)] || 'application/octet-stream' } }));
        return;
      }
    }
    const response = await app.fetch(new Request(url, { method: req.method, headers: req.headers }));
    send(req, res, response);
  } catch (error) {
    console.error(error);
    res.writeHead(500);res.end('Local function failed');
  }
}).listen(port, '0.0.0.0', () => console.log(`Built Vercel output listening on http://localhost:${port}`));
