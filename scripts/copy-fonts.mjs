import { copyFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outputDir = join(root, 'public/fonts');

const files = [
  { pkg: '@fontsource/inter/files', name: 'inter-latin-400-normal.woff2' },
  { pkg: '@fontsource/inter/files', name: 'inter-latin-600-normal.woff2' },
  { pkg: '@fontsource/inter/files', name: 'inter-latin-700-normal.woff2' },
  { pkg: '@fontsource/inter/files', name: 'inter-latin-800-normal.woff2' },
  { pkg: '@fontsource/jetbrains-mono/files', name: 'jetbrains-mono-latin-400-normal.woff2' },
  { pkg: '@fontsource/jetbrains-mono/files', name: 'jetbrains-mono-latin-500-normal.woff2' },
];

mkdirSync(outputDir, { recursive: true });

for (const { pkg, name } of files) {
  copyFileSync(join(root, 'node_modules', pkg, name), join(outputDir, name));
  console.log(`Copied ${name}`);
}
