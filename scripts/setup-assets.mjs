import { mkdir, readFile, writeFile, copyFile, access } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
await import('./extract-reference-shaders.mjs');
const images = resolve(root, 'reference/images');
const fonts = resolve(root, 'reference/fonts');
await mkdir(images, { recursive: true });
await mkdir(fonts, { recursive: true });
await mkdir(resolve(root, 'public'), { recursive: true });

const referenceRoot = resolve(root, 'references/melon.studio');
const styles = {
  'reference-base.css': '1b967k6eh-6_s.css',
  'reference-home.css': '1swvy3_z4mygo.css',
  'reference-header.css': '2urdhtrov04tv.css',
  'reference-about.css': '0dk2ziwd7lsjo.css',
  'reference-contact.css': '2je0aa25by6ca.css',
  'reference-footer.css': '3ds8r7-xy7tf_.css',
};
for (const [name, file] of Object.entries(styles)) {
  let css = await readFile(resolve(referenceRoot, '_next/static/immutable/chunks', file), 'utf8');
  for (const [original, local] of [
    ['/brand/hero-still-1600.webp', '../images/reference-hero.webp'],
    ['/brand/hero-still-800.webp', '../images/reference-hero.webp'],
    ['/brand/melon-gradient-tlo.svg', '../images/editor-wordmark.svg'],
    ['/brand/kind-words-grain-desktop.webp', '../images/reference-closing.webp'],
    ['/brand/kind-words-grain-phone.webp', '../images/reference-closing.webp'],
  ]) css = css.replaceAll(original, local);
  await writeFile(resolve(root, 'reference/css', name), css);
}

await copyFile(resolve(referenceRoot, 'brand/hero-still-800.webp'), resolve(images, 'reference-hero.webp'));
await copyFile(resolve(referenceRoot, 'brand/kind-words-grain-phone.webp'), resolve(images, 'reference-closing.webp'));
const previews = ['mastercard-music', 'allaces-games', 'onedynamics', 'sawicki-legal', 'huuuge-games', 'ipg-interact', 'hipromine'];
for (const name of previews) {
  await sharp(resolve(referenceRoot, 'media/projects', name, 'thumbnail.webp'))
    .resize({ width: 1280, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(resolve(images, 'reference-' + name + '.webp'));
}

const fontCSS = await readFile(resolve(root, 'references/use.typekit.net/omg1nuw.css'), 'utf8');
const fontFaces = [...fontCSS.matchAll(/font-family:\s*"([^"]+)"[\s\S]*?src:\s*url\("([^"]+)"\)/g)].slice(0, 3);
const fontFiles = ['lekick.woff2', 'early-sans.woff2', 'early-sans-italic.woff2'];
for (const [index, face] of fontFaces.entries()) {
  const destination = resolve(fonts, fontFiles[index]);
  let valid = false;
  try {
    const bytes = await readFile(destination);
    valid = bytes.subarray(0, 4).toString() === 'wOF2';
  } catch {
    // Missing downloaded fonts can be recovered from the reference font kit.
  }
  if (valid) continue;
  const response = await fetch(face[2], { headers: { Referer: 'https://melon.studio/' } });
  const bytes = Buffer.from(await response.arrayBuffer());
  if (!response.ok || bytes.subarray(0, 4).toString() !== 'wOF2') {
    throw new Error('Reference font unavailable: ' + face[1]);
  }
  await writeFile(destination, bytes);
}
await copyFile(
  resolve(root, 'node_modules/@fontsource-variable/geist-mono/files/geist-mono-latin-wght-normal.woff2'),
  resolve(fonts, 'geist-mono.woff2'),
);
await access(resolve(images, 'editor-wordmark.svg'));
await access(resolve(images, 'editor-logo.svg'));
await sharp(resolve(images, 'reference-hero.webp'))
  .resize(1200, 630, { fit: 'cover' }).webp({ quality: 80 }).toFile(resolve(root, 'public/social-cover.webp'));
await sharp({ create: { width: 64, height: 64, channels: 4, background: '#ff0000' } })
  .composite([{ input: await sharp(resolve(images, 'editor-logo.svg')).resize(54, 34).png().toBuffer(), gravity: 'centre' }])
  .png().toFile(resolve(root, 'public/favicon.png'));
await writeFile(resolve(images, 'sources.json'), JSON.stringify({
  purpose: 'Downloaded reference layout previews. Replace these with the editor original project posters.',
  reference: 'https://melon.studio/',
  previews: previews.map(name => ({ name, original: 'references/melon.studio/media/projects/' + name + '/thumbnail.webp' })),
  fonts: fontFaces.map(face => ({ family: face[1], source: face[2] })),
}, null, 2) + '\n');
console.log('Prepared reference styles, local fonts, background textures, compressed layout previews, favicon, and sharing image.');
