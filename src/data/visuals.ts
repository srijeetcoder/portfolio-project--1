import hero from '../../reference/images/reference-hero.webp';
const images = import.meta.glob('../../reference/images/reference-*.webp', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;

export const visuals = { hero };
export const referencePreviews = ['mastercard-music','allaces-games','onedynamics','sawicki-legal','huuuge-games','ipg-interact','hipromine'].map(name => {
  const base = '../../reference/images/reference-' + name;
  return { poster: images[base + '.webp'], posterSources: [640,960,1280].map(width => ({
    width, src: images[base + (width === 1280 ? '' : '-' + width) + '.webp'],
  })) };
});
