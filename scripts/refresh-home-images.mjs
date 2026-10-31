// Explicit maintenance command; production builds use the committed assets offline.
import { readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import sharp from 'sharp';
const manifest = 'docs/operations/home-assets.json';
const assets = JSON.parse(await readFile(manifest, 'utf8'));
for (const asset of assets) {
  const response = await fetch(asset.url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw Error(`${asset.name}: HTTP ${response.status}`);
  const source = Buffer.from(await response.arrayBuffer());
  const body = await sharp(source).resize({ width: asset.width, withoutEnlargement: true }).webp({ quality: 85 }).toBuffer();
  await writeFile(`public${asset.file}`, body);
  asset.sourceSha256 = createHash('sha256').update(source).digest('hex');
  asset.bytes = body.length;
}
await writeFile(manifest, JSON.stringify(assets, null, 2) + '\n');
