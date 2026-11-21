import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'motion/react';
import { scrollRuntime, subscribeScrollFrame } from '../lib/scrollRuntime';

type RGB = [number, number, number];
const clamp = (x: number) => Math.min(1, Math.max(0, x));
const linear = (x: number) => x <= 0.04045 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
const srgb = (x: number) => Math.round(255 * clamp(x <= 0.0031308 ? 12.92 * x : 1.055 * Math.pow(x, 1 / 2.4) - 0.055));
function toLab(rgb: RGB): RGB {
  const [r, g, b] = rgb.map(value => linear(value / 255));
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function fromLab([l, a, b]: RGB): RGB {
  const x = Math.pow(l + 0.3963377774 * a + 0.2158037573 * b, 3);
  const y = Math.pow(l - 0.1055613458 * a - 0.0638541728 * b, 3);
  const z = Math.pow(l - 0.0894841775 * a - 1.291485548 * b, 3);
  return [srgb(4.0767416621 * x - 3.3077115913 * y + 0.2309699292 * z),
    srgb(-1.2684380046 * x + 2.6097574011 * y - 0.3413193965 * z),
    srgb(-0.0041960863 * x - 0.7034186147 * y + 1.707614701 * z)];
}
const luminance = (rgb: RGB) => rgb.reduce((sum, channel, index) => sum + linear(channel / 255) * [0.2126, 0.7152, 0.0722][index], 0);
const contrast = (a: RGB, b: RGB) => (Math.max(luminance(a), luminance(b)) + 0.05) / (Math.min(luminance(a), luminance(b)) + 0.05);

// Precompute the reference's perceptual palette and contrast choices. Scroll
// frames only select a sample; there are no pixel reads or React updates.
function createPalette() {
  // The reference's OKLCH colours, converted to the same sRGB bytes once.
  // Runtime canvas readbacks can stall the first frame on a cold GPU.
  const dark: RGB = [15, 0, 0];
  const paper: RGB = [246, 239, 237];
  const light: RGB = [255, 255, 255], a = toLab(dark), b = toLab(paper);
  return Array.from({ length: 256 }, (_, index) => {
    const t = index / 255;
    const background = fromLab(a.map((channel, i) => channel + (b[i] - channel) * t) as RGB);
    const ink = contrast(dark, background) > contrast(light, background) ? dark : light;
    let alpha = ink === dark ? 0.62 : 0.55;
    while (alpha < 1 && contrast(ink.map((channel, i) => Math.round(channel * alpha + background[i] * (1 - alpha))) as RGB, background) < 4.5) alpha = Math.min(1, alpha + 0.01);
    return { background: `rgb(${background.join(' ')})`, foreground: `rgb(${ink.join(' ')})`,
      secondary: `rgb(${ink.join(' ')} / ${alpha.toFixed(2)})`,
      rule: `rgb(${ink.join(' ')} / .16)`, invert: ink === dark ? '1' : '0' };
  });
}

export function SceneTransitions() {
  const reduced = useReducedMotion();
  const update = useRef<(position: number) => void>(() => {});
  useEffect(() => subscribeScrollFrame(() => update.current(scrollRuntime.y)), []);
  useEffect(() => {
    const about = document.getElementById('about'), services = document.getElementById('services');
    const showreel = document.getElementById('showreel'), closing = document.querySelector<HTMLElement>('.closing-region');
    const main = document.querySelector('main');
    if (!about || !services || !showreel || !closing || !main) return;
    const palette = createPalette();
    const targets = [1, 0, 1, 0];
    let bands: number[][] = [], phone = false, last = -1;
    const progress = (position: number, [start, end]: number[]) => {
      const raw = clamp((position - start) / (end - start));
      if (reduced) return raw >= 0.5 ? 1 : 0;
      const pace = phone ? 0.06 : 0.14;
      const x = clamp((raw - pace) / (1 - 2 * pace));
      const smooth = phone ? x : x * x * (3 - 2 * x);
      return (1 - Math.cos(Math.PI * smooth)) / 2;
    };
    update.current = position => {
      let value = 0;
      for (let index = 0; index < bands.length; index++) {
        if (position < bands[index][0]) break;
        const p = progress(position, bands[index]);
        value += (targets[index] - value) * p;
        if (position < bands[index][1]) break;
        value = targets[index];
      }
      const index = Math.round(value * 255);
      if (index === last) return;
      last = index;
      const sample = palette[index], style = document.body.style;
      style.setProperty('--f-bg', sample.background); style.setProperty('--f-fg', sample.foreground);
      style.setProperty('--f-fg2', sample.secondary); style.setProperty('--f-rule', sample.rule); style.setProperty('--f-inv', sample.invert);
      document.documentElement.dataset.sceneTone = value.toFixed(3);
    };
    const measure = () => {
      phone = innerWidth <= 809.98;
      const halfBand = (phone ? 0.85 : 0.6) / 2;
      const limit = Math.max(0, document.documentElement.scrollHeight - innerHeight);
      bands = [about, services, showreel, closing].map(section => {
        const top = section.getBoundingClientRect().top + window.scrollY;
        let start = top - innerHeight * (0.48 + halfBand), end = top - innerHeight * (0.48 - halfBand);
        if (end > limit) { start -= end - limit; end = limit; }
        return [start, end];
      });
      last = -1;
      update.current(window.scrollY);
    };
    document.documentElement.classList.add('scene-transitions');
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(main);
    addEventListener('resize', measure);
    return () => {
      observer.disconnect(); removeEventListener('resize', measure); update.current = () => {};
      document.documentElement.classList.remove('scene-transitions');
      delete document.documentElement.dataset.sceneTone;
      for (const name of ['--f-bg', '--f-fg', '--f-fg2', '--f-rule', '--f-inv']) document.body.style.removeProperty(name);
    };
  }, [reduced]);
  return <div className="page-tone" aria-hidden="true" />;
}
