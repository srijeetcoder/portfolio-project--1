import configData from './portfolio.json';
import mediaData from './media.generated.json';
import { visuals, referencePreviews } from './visuals';
import type { MediaLibrary, PortfolioConfig, Project } from '../types';

export const portfolio: PortfolioConfig = configData;
export const mediaLibrary: MediaLibrary = mediaData;

export function mediaUrl(path: string) {
  return import.meta.env.BASE_URL + path.replace(/^\//, '');
}

export function durationLabel(duration: number | null) {
  if (duration === null) return '';
  const seconds = Math.floor(duration);
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
}

function enrichProject(item: MediaLibrary['projects'][number]): Project {
  const details = portfolio.projects[item.file] ?? {};
  return {
    ...item,
    title: details.title || item.filename,
    description: details.description || '[Add a short project description.]',
    category: details.category || item.category,
    categoryId: details.category || item.categoryId,
    poster: details.poster || item.poster,
    year: details.year,
    isPlaceholder: false,
  };
}

const placeholderImages = referencePreviews.map(poster => ({ poster, imageAspect: '16 / 9' }));

export const projects: Project[] = mediaLibrary.projects.length
  ? mediaLibrary.projects.map(enrichProject)
  : placeholderImages.map((visual, index) => ({
      id: 'placeholder-' + index,
      file: '',
      filename: '',
      sources: [],
      width: null,
      height: null,
      duration: null,
      category: 'Reference layout preview',
      categoryId: 'placeholder',
      fingerprint: '',
      title: '[Project title]',
      description: '[A few words about this project.]',
      isPlaceholder: true,
      ...visual,
    }));

export const showreel: Project = mediaLibrary.showreel
  ? { ...enrichProject(mediaLibrary.showreel), title: 'Showreel', description: '', category: 'Showreel' }
  : {
      id: 'showreel-placeholder',
      file: '',
      filename: '',
      sources: [],
      poster: visuals.hero,
      width: null,
      height: null,
      duration: null,
      category: 'Showreel',
      categoryId: 'showreel',
      fingerprint: '',
      title: 'Showreel',
      description: '',
      isPlaceholder: true,
    };
