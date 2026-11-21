import { cp, mkdir, lstat } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destination = resolve(root, 'dist/videos');
const previews = resolve(root, 'videos/.previews');
await mkdir(destination, { recursive: true });
await cp(resolve(root, 'videos'), destination, {
  recursive: true,
  filter: async path => path !== previews && !path.endsWith('.gitkeep') && !(await lstat(path)).isSymbolicLink(),
});
await cp(previews, resolve(root, 'dist/previews'), { recursive: true });
console.log('Copied local video assets into the production build.');
