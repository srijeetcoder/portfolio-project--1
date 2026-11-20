import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const archive = resolve(root, 'references/melon.studio/_next/static/immutable/chunks/2nhq-9s68oz_i.js');
const source = await readFile(archive, 'utf8');
const pieces = {};
for (const name of ['T', 'M', 'P', 'D', 'k', 'R', 'W', 'A']) {
  const match = source.match(new RegExp('(?:^|\\n)\\s+' + name + ' = `([\\s\\S]*?)`'));
  if (!match) throw new Error('Reference ribbon shader not found: ' + name);
  pieces[name] = match[1];
}
function expand(text) {
  return text.replaceAll('${z(s.p)}', '0.25').replaceAll('${z(s.N)}', '0.45')
    .replace(/\$\{([TM PDkR])\}/g, (_, name) => expand(pieces[name]));
}
const vertex = '#version 300 es\nprecision highp float;\nin vec3 position;\nin vec2 uv;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\n' +
  expand(pieces.W).replaceAll('varying ', 'out ');
const fragment = '#version 300 es\nprecision highp float;\nuniform vec3 cameraPosition;\nout vec4 fragmentColor;\n' +
  expand(pieces.A).replaceAll('varying ', 'in ').replaceAll('texture2D(', 'texture(').replaceAll('gl_FragColor', 'fragmentColor');
if (/\$\{/.test(vertex + fragment)) throw new Error('A reference shader include was not expanded.');
const destination = resolve(root, 'src/lib/ribbon/shaders.ts');
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination,
  '// Adapted from the preserved reference ribbon shader for native WebGL 2.\n' +
  '// Regenerate with scripts/extract-reference-shaders.mjs.\n\n' +
  'export const ribbonVertexShader = `' + vertex.replaceAll('`', '\\`') + '`;\n\n' +
  'export const ribbonFragmentShader = `' + fragment.replaceAll('`', '\\`') + '`;\n');
console.log('Recovered the reference ribbon geometry, lighting, cursor dent, and texture transition shaders.');
