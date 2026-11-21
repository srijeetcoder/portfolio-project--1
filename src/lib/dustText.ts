import { scrollRuntime, subscribeScrollFrame } from './scrollRuntime';

const clamp = (value: number, low = 0, high = 1) => Math.max(low, Math.min(high, value));
const smooth = (low: number, high: number, value: number) => {
  const x = clamp((value - low) / (high - low));
  return x * x * (3 - 2 * x);
};

interface Word {
  element: HTMLElement;
  originalOpacity: string;
  opacity: number;
  delay: number;
}
interface Particle {
  x: number; y: number; fromX: number; fromY: number; bendX: number; bendY: number;
  word: number; phase: number; size: number; alpha: number; soft: boolean;
}
export interface DustTextRenderer { setProgress: (progress: number) => void; dispose: () => void }

function sprite(soft: boolean) {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 32;
  const context = canvas.getContext('2d')!;
  const gradient = context.createRadialGradient(16, 16, 0, 16, 16, 16);
  gradient.addColorStop(0, soft ? 'rgba(255,255,255,.8)' : '#fff');
  gradient.addColorStop(soft ? .16 : .46, 'rgba(255,255,255,.72)');
  gradient.addColorStop(1, 'rgba(255,255,255,0)');
  context.fillStyle = gradient; context.fillRect(0, 0, 32, 32);
  return canvas;
}

export async function mountDustText(root: HTMLElement, signal: AbortSignal): Promise<DustTextRenderer> {
  await document.fonts.ready;
  if (signal.aborted) throw new DOMException('Text setup cancelled', 'AbortError');
  const canvas = document.createElement('canvas');
  canvas.className = 'dust-field'; canvas.setAttribute('aria-hidden', 'true');
  const context = canvas.getContext('2d', { alpha: true, desynchronized: true });
  if (!context) throw new Error('Particle canvas unavailable');
  const dot = sprite(false), haze = sprite(true);
  const words: Word[] = [...root.querySelectorAll<HTMLElement>('.f-w:not(.f-face)')].map((element, index, all) => ({
    element, originalOpacity: element.style.opacity, opacity: -1, delay: index / Math.max(1, all.length - 1) * .46,
  }));
  const face = root.querySelector<HTMLElement>('.f-face');
  const originalFaceOpacity = face?.style.opacity || '';
  let particles: Particle[] = [], progress = 0, disposed = false, visible = false, settled = false;
  let width = 1, height = 1, ratio = 1, lastTime = 0, elapsed = 0, layoutKey = '';
  let seed = 2166136261;
  for (const character of root.textContent || '') seed = Math.imul(seed ^ character.charCodeAt(0), 16777619);
  const random = () => {
    seed ^= seed << 13; seed ^= seed >>> 17; seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
  root.append(canvas);

  function wordOpacity(word: Word, value: number) {
    if (Math.abs(word.opacity - value) < .002 && value !== 1) return;
    if (word.opacity === value) return;
    word.opacity = value; word.element.style.opacity = value.toFixed(3);
  }
  function finish() {
    settled = true;
    words.forEach(word => wordOpacity(word, 1));
    if (face) face.style.opacity = '1';
    context!.clearRect(0, 0, width, height);
    root.dataset.dustState = 'settled';
  }
  function measure() {
    if (disposed) return;
    const bounds = root.getBoundingClientRect();
    const measurements = words.map(word => ({ box: word.element.getBoundingClientRect(), style: getComputedStyle(word.element) }));
    const nextLayout = [innerWidth, devicePixelRatio, root.offsetHeight, bounds.left,
      ...measurements.map(({ box, style }, index) => [box.left - bounds.left, box.top - bounds.top, box.width, box.height,
        style.font, style.letterSpacing, words[index].element.textContent].join(','))].join('|');
    if (nextLayout === layoutKey) return;
    layoutKey = nextLayout;
    width = innerWidth; height = Math.ceil(root.offsetHeight + 200);
    ratio = Math.min(1.5, devicePixelRatio || 1, Math.sqrt(1200000 / Math.max(1, width * height)));
    canvas.width = Math.max(1, Math.ceil(width * ratio)); canvas.height = Math.max(1, Math.ceil(height * ratio));
    canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    canvas.style.left = `${-bounds.left}px`; canvas.style.top = '-100px';
    context!.setTransform(ratio, 0, 0, ratio, 0, 0);
    if (settled || progress >= .98) { finish(); return; }
    const limit = width < 810 ? 2800 : 6400;
    const next: Particle[] = [];
    let candidates = 0;
    const mask = document.createElement('canvas'), paint = mask.getContext('2d', { willReadFrequently: true })!;
    const stride = width < 810 ? 1.8 : 2.3;
    words.forEach((word, index) => {
      const { box, style } = measurements[index];
      mask.width = Math.max(1, Math.ceil(box.width + 10)); mask.height = Math.max(1, Math.ceil(box.height + 10));
      paint.font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      paint.textBaseline = 'alphabetic'; paint.fontKerning = 'normal';
      if ('letterSpacing' in paint) paint.letterSpacing = style.letterSpacing === 'normal' ? '0px' : style.letterSpacing;
      const text = word.element.textContent || '', metrics = paint.measureText(text);
      const ascent = metrics.fontBoundingBoxAscent || metrics.actualBoundingBoxAscent;
      const descent = metrics.fontBoundingBoxDescent || metrics.actualBoundingBoxDescent;
      const baseline = (box.height - ascent - descent) / 2 + ascent;
      paint.fillStyle = '#fff'; paint.fillText(text, 5, baseline + 5);
      const pixels = paint.getImageData(0, 0, mask.width, mask.height).data;
      for (let y = 1; y < mask.height; y += stride) for (let x = 1; x < mask.width; x += stride) {
        const sx = Math.min(mask.width - 1, Math.floor(x + random() * .6));
        const sy = Math.min(mask.height - 1, Math.floor(y + random() * .6));
        const alpha = pixels[(sy * mask.width + sx) * 4 + 3] / 255;
        if (alpha < .23) continue;
        const targetX = box.left + sx - 5, targetY = box.top - bounds.top + sy + 95;
        const direction = random();
        const fromX = direction < .14 ? -70 - random() * 180 : width + 50 + random() * 260;
        const fromY = direction > .86 ? height + 30 + random() * 90 : targetY + (random() - .5) * 230;
        const particle: Particle = {
          x: targetX, y: targetY, fromX, fromY,
          bendX: targetX + (direction < .14 ? -1 : 1) * (80 + random() * width * .24),
          bendY: targetY + (random() - .5) * 165,
          word: index, phase: random() * Math.PI * 2, size: .7 + random() * .8,
          alpha: (.3 + random() * .7) * Math.sqrt(alpha), soft: random() < .22,
        };
        candidates++;
        if (next.length < limit) next.push(particle);
        else {
          const position = Math.floor(random() * candidates);
          if (position < limit) next[position] = particle;
        }
      }
    });
    particles = next;
    words.forEach(word => { if (word.opacity < 0) wordOpacity(word, 0); });
    canvas.dataset.particleCount = String(particles.length);
    root.dataset.dustState = 'forming';
    render(lastTime || performance.now(), 0);
  }
  function render(time: number, delta: number) {
    lastTime = time;
    if (disposed || settled || !visible || document.hidden || scrollRuntime.paused) return;
    elapsed += Math.min(delta, 40) / 1000;
    if (progress >= .98) { finish(); return; }
    context!.clearRect(0, 0, width, height);
    const values = words.map(word => {
      const local = smooth(0, 1, clamp((progress - word.delay) / .52));
      const opacity = smooth(.8, .995, local);
      wordOpacity(word, opacity);
      return { local, opacity };
    });
    if (face) face.style.opacity = smooth(.12, .4, progress).toFixed(3);
    for (const particle of particles) {
      const { local, opacity } = values[particle.word];
      if (local <= 0 || opacity >= .999) continue;
      const travel = 1 - Math.pow(1 - local, 2.7), remaining = 1 - travel;
      const x = remaining * remaining * particle.fromX + 2 * remaining * travel * particle.bendX + travel * travel * particle.x
        + Math.sin(particle.phase + elapsed * .7) * (1 - local) * 11;
      const y = remaining * remaining * particle.fromY + 2 * remaining * travel * particle.bendY + travel * travel * particle.y
        + Math.cos(particle.phase * 1.7 + elapsed * .55) * (1 - local) * 8;
      if (x < -10 || x > width + 10 || y < -10 || y > height + 10) continue;
      const size = particle.size * (1 + (1 - local) * (particle.soft ? 2.2 : .6));
      context!.globalAlpha = particle.alpha * smooth(0, .12, local) * (1 - opacity);
      context!.drawImage(particle.soft ? haze : dot, x - size, y - size, size * 2, size * 2);
    }
    context!.globalAlpha = 1; context!.globalCompositeOperation = 'source-in';
    context!.fillStyle = '#ff3b32';
    context!.fillStyle = `color-mix(in srgb, ${getComputedStyle(root).color} ${Math.round(smooth(.12, .8, progress) * 100)}%, #ff3b32)`;
    context!.fillRect(0, 0, width, height);
    context!.globalCompositeOperation = 'source-over';
  }

  const unsubscribe = subscribeScrollFrame(render);
  const intersection = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) render(performance.now(), 0);
  }, { rootMargin: '100px 0px' });
  intersection.observe(root);
  const resize = new ResizeObserver(measure);
  resize.observe(root); words.forEach(word => resize.observe(word.element));
  measure();
  return {
    setProgress(value) {
      progress = Math.max(progress, clamp(value));
      root.dataset.dustProgress = progress.toFixed(3);
      if (progress >= .98) finish();
      else render(lastTime || performance.now(), 0);
    },
    dispose() {
      disposed = true; unsubscribe(); intersection.disconnect(); resize.disconnect(); canvas.remove();
      words.forEach(word => { word.element.style.opacity = word.originalOpacity; });
      if (face) face.style.opacity = originalFaceOpacity;
      delete root.dataset.dustState; delete root.dataset.dustProgress;
      particles = [];
    },
  };
}
