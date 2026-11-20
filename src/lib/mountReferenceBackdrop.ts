import { getShaderNoiseTexture, grainGradientFragmentShader } from '@paper-design/shaders';
import { createGradientMount } from './GradientMount';

const settings = {
  hero: {
    colors: [[208, 1, 0], [255, 0, 0], [255, 48, 36]],
    scale: 1.82, offsetX: 0.04, offsetY: 0.02,
  },
  closing: {
    colors: [[240, 0, 0], [255, 10, 10], [255, 43, 43]],
    scale: 1.7, offsetX: 0.06, offsetY: 0.14,
  },
};

const waveLine = 'float wave = cos(.5 * shape_uv.x - 4. * t) * sin(1.5 * shape_uv.x + 2. * t) * (.75 + .25 * cos(6. * t));';
const heroShader = grainGradientFragmentShader
  .replace('void main()', 'float boundedWave(float x, float t) { return cos(.5 * x - 4. * t) * sin(1.5 * x + 2. * t) * (.75 + .25 * cos(6. * t)); }\nvoid main()')
  .replace(waveLine, 'float wave = boundedWave(shape_uv.x, 1.75) + .25 * (boundedWave(shape_uv.x, t) - boundedWave(shape_uv.x, 1.75));');

// Keep shader parsing and setup outside the module that hydrates the page.
export async function mountReferenceBackdrop(element: HTMLElement, kind: 'hero' | 'closing', speed: number, signal: AbortSignal) {
  const noise = getShaderNoiseTexture();
  if (!noise) return null;
  await noise.decode();
  if (signal.aborted) return null;
  const params = settings[kind];
  // These bytes match the original OKLCH shader uniforms exactly.
  const colors = params.colors.map(([r, g, b]) => [r / 255, g / 255, b / 255, 1]);
  const pixelRatio = window.devicePixelRatio;
  const pixelCount = pixelRatio >= 2 || innerWidth * innerHeight * pixelRatio ** 2 > 4000000
    ? 1600000 : 2600000;
  return createGradientMount(element, kind === 'hero' ? heroShader : grainGradientFragmentShader, {
    u_colorBack: [0, 0, 0, 0], u_colors: colors, u_colorsCount: params.colors.length,
    u_softness: 1, u_intensity: 0.08, u_noise: 0, u_shape: 1, u_fit: 1,
    u_scale: params.scale, u_rotation: 180, u_originX: 0.5, u_originY: 0.5,
    u_offsetX: params.offsetX, u_offsetY: params.offsetY,
    u_worldWidth: 0, u_worldHeight: 0, u_noiseTexture: noise,
  }, speed, 10500, pixelCount, signal);
}
