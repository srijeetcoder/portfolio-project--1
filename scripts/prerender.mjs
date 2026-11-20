import { build } from 'vite';
import react from '@vitejs/plugin-react';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = resolve(root, '.qa/ssr');
await build({ root, configFile: false, plugins: [react()], logLevel: 'warn',
  build: { ssr: 'src/entry-ssr.tsx', outDir: output, emptyOutDir: true, target: 'node22', minify: false } });
const { render } = await import(pathToFileURL(resolve(output, 'entry-ssr.js')).href);
const htmlPath = resolve(root, 'dist/index.html');
const html = await readFile(htmlPath, 'utf8');
const markup = render();
await writeFile(htmlPath, html.replace('<div id="root"></div>', '<div id="root">' + markup + '</div>'));
console.log('Prerendered the portfolio for an immediate first paint and accessible static content.');
