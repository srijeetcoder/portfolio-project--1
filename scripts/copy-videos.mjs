import { cp, mkdir, lstat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destination = resolve(root, 'dist/videos');
await mkdir(destination, { recursive: true });
await cp(resolve(root, 'videos'), destination, {
  recursive: true,
  filter: async path => !path.endsWith('.gitkeep') && !(await lstat(path)).isSymbolicLink(),
});
console.log('Copied local video assets into the production build.');
