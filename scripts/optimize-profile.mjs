import sharp from 'sharp';
import { renameSync, statSync, unlinkSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const input = join(root, 'src/assets/images/profile.jpg');
const outputDir = join(root, 'src/assets/images');
const tempJpg = join(outputDir, 'profile.optimized.jpg');

const SIZE = 640;

await sharp(input)
  .rotate()
  .resize(SIZE, SIZE, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(tempJpg);

unlinkSync(input);
renameSync(tempJpg, input);

await sharp(input)
  .webp({ quality: 82 })
  .toFile(join(outputDir, 'profile.webp'));

for (const file of ['profile.jpg', 'profile.webp']) {
  const { size } = statSync(join(outputDir, file));
  console.log(`${file}: ${(size / 1024).toFixed(1)} KiB`);
}
