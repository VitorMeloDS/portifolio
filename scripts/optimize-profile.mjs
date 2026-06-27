import sharp from 'sharp';
import { statSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const source = join(root, 'src/assets/images/profile.jpg');
const outputDir = join(root, 'src/assets/images');

const variants = [
  { width: 320, webp: 'profile-320.webp', jpeg: 'profile-320.jpg' },
  { width: 640, webp: 'profile-640.webp', jpeg: null },
];

for (const { width, webp, jpeg } of variants) {
  await sharp(source)
    .rotate()
    .resize(width, width, { fit: 'cover', position: 'centre' })
    .webp({ quality: 82 })
    .toFile(join(outputDir, webp));

  if (jpeg) {
    await sharp(source)
      .rotate()
      .resize(width, width, { fit: 'cover', position: 'centre' })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(join(outputDir, jpeg));
  }
}

const files = ['profile-320.webp', 'profile-640.webp', 'profile-320.jpg', 'profile.jpg'];
for (const file of files) {
  const { size } = statSync(join(outputDir, file));
  console.log(`${file}: ${(size / 1024).toFixed(1)} KiB`);
}
