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
    .replace(/\$\{([TMPDkR])\}/g, (_, name) => expand(pieces[name]));
}
const vertex = '#version 300 es\nprecision highp float;\nin vec3 position;\nin vec2 uv;\nuniform mat4 modelMatrix;\nuniform mat4 viewMatrix;\nuniform mat4 projectionMatrix;\n' +
  expand(pieces.W).replaceAll('varying ', 'out ');
const fragment = '#version 300 es\nprecision highp float;\nuniform vec3 cameraPosition;\nout vec4 fragmentColor;\n' +
  expand(pieces.A).replaceAll('varying ', 'in ').replaceAll('texture2D(', 'texture(').replaceAll('gl_FragColor', 'fragmentColor')
    .replace('uniform float u_alpha;', 'uniform float u_alpha;\nuniform float u_focus;')
    .replace('float aa = max(fwidth(d), 0.0001);', `float aa = max(fwidth(d), 0.0001);
        // Keyboard focus follows the same curved surface as the artwork.
        float focusEdge = 1.0 - smoothstep(1.5 * aa, 2.5 * aa, -d);
        float focusInner = 1.0 - smoothstep(3.5 * aa, 4.5 * aa, -d);
        tex.rgb = mix(tex.rgb, vec3(0.035, 0.0, 0.0), u_focus * focusInner);
        tex.rgb = mix(tex.rgb, vec3(1.0), u_focus * focusEdge);`);
if (/\$\{/.test(vertex + fragment)) throw new Error('A reference shader include was not expanded.');
const destination = resolve(root, 'src/lib/ribbon/shaders.ts');
await mkdir(dirname(destination), { recursive: true });
await writeFile(destination,
  '// Adapted from the preserved reference ribbon shader for native WebGL 2.\n' +
  '// Regenerate with scripts/extract-reference-shaders.mjs.\n\n' +
  'export const ribbonVertexShader = `' + vertex.replaceAll('`', '\\`') + '`;\n\n' +
  'export const ribbonFragmentShader = `' + fragment.replaceAll('`', '\\`') + '`;\n');
console.log('Recovered the reference ribbon geometry, lighting, cursor dent, and texture transition shaders.');
