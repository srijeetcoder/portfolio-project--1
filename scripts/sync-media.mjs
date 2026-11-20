import { createHash } from 'node:crypto';
import { execFile } from 'node:child_process';
import { access, mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { basename, dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';

const run = promisify(execFile);
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const videoRoot = resolve(root, 'videos');
const posterRoot = resolve(root, 'public/posters');
const manifestPath = resolve(root, 'src/data/media.generated.json');
const supported = new Map([['.mp4', 'video/mp4'], ['.webm', 'video/webm'], ['.m4v', 'video/mp4']]);
const otherVideoFormats = new Set(['.mov', '.mkv', '.avi', '.wmv', '.mpeg', '.mpg']);
const imageFormats = ['.webp', '.jpg', '.jpeg', '.png', '.avif'];
const categoryNames = {
  commercial: 'Commercial advertisements',
  cinematic: 'Cinematic films',
  reels: 'Social media reels',
  youtube: 'YouTube videos',
  promotional: 'Promotional videos',
  wedding: 'Wedding films',
  motion: 'Motion graphics',
  other: 'Other work',
};
const warnings = [];
await mkdir(videoRoot, { recursive: true });
await mkdir(posterRoot, { recursive: true });

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function walk(directory, prefix = '') {
  const entries = await readdir(directory, { withFileTypes: true });
  const paths = [];
  for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
    const relative = prefix + entry.name;
    if (entry.isDirectory()) {
      paths.push(...await walk(resolve(directory, entry.name), relative + '/'));
    } else if (entry.isFile()) {
      paths.push(relative);
    }
  }
  return paths;
}

async function findThumbnail(relativeVideo) {
  const extension = extname(relativeVideo);
  const stem = relativeVideo.slice(0, -extension.length);
  const folder = dirname(relativeVideo);
  const name = basename(stem);
  const candidateStems = [
    stem,
    stem + '.poster',
    stem + '-poster',
    stem + '.thumbnail',
    stem + '-thumbnail',
    folder + '/thumbnails/' + name,
    folder + '/posters/' + name,
  ];
  for (const candidate of candidateStems) {
    for (const imageExtension of imageFormats) {
      const path = resolve(videoRoot, candidate + imageExtension);
      if (await exists(path)) return path;
    }
  }
  return null;
}

async function readMetadata(path) {
  if (!ffmpeg) return { width: null, height: null, duration: null };
  let diagnostic = '';
  try {
    const result = await run(ffmpeg, ['-hide_banner', '-i', path], { timeout: 20000, windowsHide: true });
    diagnostic = result.stderr;
  } catch (error) {
    diagnostic = String(error.stderr ?? '');
  }
  const durationMatch = diagnostic.match(/Duration:\s*(\d+):(\d+):(\d+(?:\.\d+)?)/);
  const dimensions = diagnostic.match(/Video:[^\r\n]*?\b(\d{2,6})x(\d{2,6})\b/);
  let width = dimensions ? Number(dimensions[1]) : null;
  let height = dimensions ? Number(dimensions[2]) : null;
  const rotation = diagnostic.match(/rotation of (-?\d+(?:\.\d+)?)/);
  if (rotation && Math.abs(Number(rotation[1])) % 180 === 90) {
    [width, height] = [height, width];
  }
  return {
    width,
    height,
    duration: durationMatch
      ? Number(durationMatch[1]) * 3600 + Number(durationMatch[2]) * 60 + Number(durationMatch[3])
      : null,
  };
}

async function compressedPoster(input, output) {
  await sharp(input)
    .rotate()
    .resize({ width: 1280, height: 1280, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: 78, effort: 4 })
    .toFile(output);
}

async function createPoster(video, thumbnail, metadata, output) {
  if (thumbnail) {
    try {
      await compressedPoster(await readFile(thumbnail), output);
      return true;
    } catch {
      warnings.push('The thumbnail for ' + video + ' could not be read. A video frame will be used.');
    }
  }
  if (!ffmpeg) {
    warnings.push('Poster extraction is unavailable for ' + video + '. Add a matching thumbnail.');
    return false;
  }
  try {
    const seek = metadata.duration ? Math.min(2, metadata.duration / 4) : 0;
    const result = await run(ffmpeg, [
      '-hide_banner', '-loglevel', 'error',
      '-ss', String(seek), '-i', resolve(videoRoot, video),
      '-frames:v', '1', '-vf', 'scale=1280:-2:force_original_aspect_ratio=decrease',
      '-f', 'image2pipe', '-vcodec', 'png', 'pipe:1',
    ], { encoding: 'buffer', maxBuffer: 32 * 1024 * 1024, timeout: 45000, windowsHide: true });
    await compressedPoster(result.stdout, output);
    return true;
  } catch {
    warnings.push('A poster could not be generated for ' + video + '. The portfolio will show a fallback image.');
    return false;
  }
}

async function posterSources(output) {
  const info = await sharp(output).metadata();
  const sources = [{ src: '/posters/' + basename(output), width: info.width }];
  for (const width of [640, 960]) {
    if (width >= info.width) continue;
    const path = output.replace(/\.webp$/, '-' + width + '.webp');
    await sharp(output).resize({ width }).webp({ quality: 78, effort: 4 }).toFile(path);
    sources.push({ src: '/posters/' + basename(path), width });
  }
  return sources.sort((a, b) => a.width - b.width);
}

function category(relative) {
  const folder = relative.includes('/') ? relative.split('/')[0] : '';
  return {
    categoryId: folder || 'video',
    category: categoryNames[folder.toLowerCase()] || (folder ? folder.replaceAll('-', ' ').replaceAll('_', ' ') : 'Video projects'),
  };
}

let previous = { showreel: null, projects: [] };
try {
  previous = JSON.parse(await readFile(manifestPath, 'utf8'));
} catch {
  // The library can be rebuilt from the original files.
}
const cached = new Map(
  [previous.showreel, ...previous.projects].filter(Boolean).map(item => [item.id, item]),
);
const allFiles = await walk(videoRoot);
const unsupportedFiles = allFiles.filter(file => otherVideoFormats.has(extname(file).toLowerCase()));
const groups = new Map();
for (const file of allFiles.filter(file => supported.has(extname(file).toLowerCase()))) {
  const key = file.slice(0, -extname(file).length);
  groups.set(key, [...(groups.get(key) || []), file]);
}

const media = [];
for (const [key, variants] of groups) {
  variants.sort((a, b) => (extname(a).toLowerCase() === '.mp4' ? 0 : 1) - (extname(b).toLowerCase() === '.mp4' ? 0 : 1));
  const file = variants[0];
  const thumbnail = await findThumbnail(file);
  const id = createHash('sha256').update(key).digest('hex').slice(0, 12);
  const fileStats = await Promise.all(variants.map(variant => stat(resolve(videoRoot, variant))));
  const thumbnailStats = thumbnail ? await stat(thumbnail) : null;
  const fingerprint = createHash('sha256').update(JSON.stringify({
    files: fileStats.map(info => [info.size, info.mtimeMs]),
    thumbnail: thumbnail ? [thumbnail, thumbnailStats.size, thumbnailStats.mtimeMs] : null,
  })).digest('hex');
  const output = resolve(posterRoot, 'project-' + id + '.webp');
  const cachedItem = cached.get(id);
  if (cachedItem?.fingerprint === fingerprint && cachedItem.poster && cachedItem.posterSources?.length && await exists(output) &&
      (await Promise.all(cachedItem.posterSources.map(source => exists(resolve(root, 'public', source.src.slice(1)))))).every(Boolean)) {
    media.push(cachedItem);
    continue;
  }
  const metadata = await readMetadata(resolve(videoRoot, file));
  const hasPoster = await createPoster(file, thumbnail, metadata, output);
  media.push({
    id,
    file,
    filename: basename(file),
    sources: variants.map(variant => ({
      src: '/videos/' + variant.split('/').map(segment => encodeURIComponent(segment)).join('/'),
      type: supported.get(extname(variant).toLowerCase()),
    })),
    poster: hasPoster ? '/posters/project-' + id + '.webp' : null,
    posterSources: hasPoster ? await posterSources(output) : [],
    ...metadata,
    ...category(file),
    fingerprint,
  });
}

const showreels = media.filter(item => /^(show[\s_-]?reel|demo[\s_-]?reel)([\s_-].*)?$/i.test(basename(item.file, extname(item.file))));
showreels.sort((a, b) => (a.file.toLowerCase() === 'showreel.mp4' ? 0 : 1) - (b.file.toLowerCase() === 'showreel.mp4' ? 0 : 1));
const showreel = showreels[0] || null;
const manifest = {
  showreel,
  projects: media.filter(item => !showreels.includes(item)),
  unsupportedFiles,
  warnings,
};
const serialized = JSON.stringify(manifest, null, 2) + '\n';
let oldContent = '';
try {
  oldContent = await readFile(manifestPath, 'utf8');
} catch {
  // A first scan creates the manifest.
}
if (oldContent !== serialized) await writeFile(manifestPath, serialized);
console.log('Media ready: ' + manifest.projects.length + ' project(s), ' + (showreel ? '1 showreel' : 'showreel awaiting footage') + '.');
for (const warning of warnings) console.warn(warning);
for (const file of unsupportedFiles) console.warn('Unsupported browser video format: ' + file + '. Add an MP4 or WebM export.');
