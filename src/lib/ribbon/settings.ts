// Camera, surface, lighting and easing values recovered from the reference.
export const ribbonCamera = { fov: 53.4, z: 41.18, near: 0.1, far: 2000 };
export const ribbonDesktop = {
  velocityNorm: 400, velocitySmooth: 0.35, velocityTwist: 0.9, velocityBulge: 0.5,
  rearY: 0.05, rearZ: 0.1, depth: 0.12, span: 1.15, shift: -0.2,
  bank: -0.1, door: -0.06, tail: 1, curve: 1, diagonal: 0.18,
  shade: 0.5, shadeSpread: 3, warmth: 0.16,
  light: [-0.09, 1, 0.61], specular: 0.31, diffuse: 0.3, gloss: 48,
  radius: 6, dent: 0.065, dentRadius: 0.24, dentFollow: 0.41, dentLight: 0.55,
  captionFrom: 0.28, captionTo: 0.62, captionPinned: false, captionFade: true,
};
export const ribbonPhone = { ...ribbonDesktop, diagonal: 0, bank: 0, rearY: 0,
  velocityTwist: 0.15, depth: 0.08, door: -0.03, captionPinned: true, captionFade: false };
export type RibbonSettings = typeof ribbonDesktop;
