import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { scrollRuntime } from '../lib/scrollRuntime';
import {
  getShaderNoiseTexture,
  grainGradientFragmentShader,
} from '@paper-design/shaders';
import { createGradientMount } from '../lib/GradientMount';
import type { GradientMount } from '../lib/GradientMount';

const settings = {
  hero: {
    colors: ['oklch(53.9% 0.221 29.23)', 'oklch(62.8% 0.2577 29.23)', 'oklch(64.6% 0.2402 29.15)'],
    scale: 1.82, offsetX: 0.04, offsetY: 0.02,
  },
  closing: {
    colors: ['oklch(60% 0.2461 29.23)', 'oklch(63% 0.2557 28.99)', 'oklch(64.3% 0.2423 27.5)'],
    scale: 1.7, offsetX: 0.06, offsetY: 0.14,
  },
};

const waveLine = 'float wave = cos(.5 * shape_uv.x - 4. * t) * sin(1.5 * shape_uv.x + 2. * t) * (.75 + .25 * cos(6. * t));';
const heroShader = grainGradientFragmentShader
  .replace('void main()', 'float boundedWave(float x, float t) { return cos(.5 * x - 4. * t) * sin(1.5 * x + 2. * t) * (.75 + .25 * cos(6. * t)); }\nvoid main()')
  .replace(waveLine, 'float wave = boundedWave(shape_uv.x, 1.75) + .25 * (boundedWave(shape_uv.x, t) - boundedWave(shape_uv.x, 1.75));');

export function ReferenceBackdrop({ kind }: { kind: 'hero' | 'closing' }) {
  const host = useRef<HTMLDivElement>(null);
  const shader = useRef<GradientMount | null>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(host, { margin: '700px 0px', once: true });
  const shouldMount = kind === 'hero' || inView;
  const reduced = useRef(reducedMotion);
  reduced.current = reducedMotion;

  useEffect(() => {
    const element = host.current;
    if (!element || !shouldMount) return;
    let cancelled = false;
    const controller = new AbortController();
    const params = settings[kind];
    async function mount() {
      try {
        const noise = getShaderNoiseTexture();
        if (!noise) return;
        await noise.decode();
        if (cancelled) return;
        const colorCanvas = document.createElement('canvas');
        colorCanvas.width = colorCanvas.height = 1;
        const colorContext = colorCanvas.getContext('2d', { willReadFrequently: true });
        if (!colorContext) return;
        const colors = params.colors.map(color => {
          colorContext.fillStyle = color;
          colorContext.fillRect(0, 0, 1, 1);
          const pixel = colorContext.getImageData(0, 0, 1, 1).data;
          return [pixel[0] / 255, pixel[1] / 255, pixel[2] / 255, 1];
        });
        const pixelRatio = window.devicePixelRatio;
        const pixelCount = pixelRatio >= 2 || innerWidth * innerHeight * pixelRatio ** 2 > 4000000
          ? 1600000 : 2600000;
        const instance = await createGradientMount(
          element!,
          kind === 'hero' ? heroShader : grainGradientFragmentShader,
          {
            u_colorBack: [0, 0, 0, 0],
            u_colors: colors,
            u_colorsCount: params.colors.length,
            u_softness: 1, u_intensity: 0.08, u_noise: 0, u_shape: 1, u_fit: 1,
            u_scale: params.scale, u_rotation: 180,
            u_originX: 0.5, u_originY: 0.5,
            u_offsetX: params.offsetX, u_offsetY: params.offsetY,
            u_worldWidth: 0, u_worldHeight: 0, u_noiseTexture: noise,
          },
          reduced.current || scrollRuntime.paused ? 0 : 0.8, 10500, pixelCount, controller.signal,
        );
        if (cancelled) { instance.dispose(); return; }
        shader.current = instance;
        element!.classList.add('is-live');
      } catch {
        // The downloaded reference still provides the non-WebGL appearance.
      }
    }
    void mount();
    return () => {
      cancelled = true;
      controller.abort();
      shader.current?.dispose();
      shader.current = null;
      element.classList.remove('is-live');
    };
  }, [kind, shouldMount]);

  useEffect(() => {
    shader.current?.setSpeed(reducedMotion || scrollRuntime.paused ? 0 : 0.8);
  }, [reducedMotion]);
  useEffect(() => {
    const update = () => shader.current?.setSpeed(reduced.current || scrollRuntime.paused ? 0 : 0.8);
    document.addEventListener('portfolio:motion-pause', update);
    return () => document.removeEventListener('portfolio:motion-pause', update);
  }, []);

  return <div className={'reference-backdrop reference-backdrop-' + kind} ref={host} aria-hidden="true" />;
}
