import sharp from 'sharp';
import pngToIco from 'png-to-ico';
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const svg = readFileSync(join(root, 'public', 'favicon.svg'));
const publicDir = join(root, 'public');

const sizes = [16, 32, 48];
const pngBuffers = await Promise.all(
  sizes.map((size) => sharp(svg).resize(size, size).png().toBuffer()),
);

writeFileSync(join(publicDir, 'favicon.ico'), await pngToIco(pngBuffers));
await sharp(svg).resize(48, 48).png().toFile(join(publicDir, 'favicon-48x48.png'));
await sharp(svg).resize(96, 96).png().toFile(join(publicDir, 'favicon-96x96.png'));
await sharp(svg).resize(180, 180).png().toFile(join(publicDir, 'apple-touch-icon.png'));
await sharp(svg).resize(32, 32).png().toFile(join(publicDir, 'favicon-32x32.png'));

console.log('Favicon gerado: favicon.ico, favicon-48x48.png, favicon-96x96.png, favicon.svg, apple-touch-icon.png');
