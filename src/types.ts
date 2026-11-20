export interface VideoSource {
  src: string;
  type: string;
}

export interface MediaItem {
  id: string;
  file: string;
  filename: string;
  sources: VideoSource[];
  poster: string | null;
  width: number | null;
  height: number | null;
  duration: number | null;
  category: string;
  categoryId: string;
  fingerprint: string;
}

export interface MediaLibrary {
  showreel: MediaItem | null;
  projects: MediaItem[];
  unsupportedFiles: string[];
  warnings: string[];
}

export interface ProjectDetails {
  title?: string;
  description?: string;
  category?: string;
  year?: string;
  poster?: string;
}

export interface Project extends MediaItem {
  title: string;
  description: string;
  year?: string;
  isPlaceholder: boolean;
  imageAspect?: string;
}

export interface PortfolioConfig {
  identity: { name: string; role: string; isPlaceholder: boolean; logo?: string };
  availability: { status: string; label: string };
  hero: { headline: string[]; introduction: string; wordmarkImage?: string };
  about: {
    headline: string;
    biography: string;
    approach: string;
    background: string;
    photograph: string;
    isPlaceholder: boolean;
  };
  services: { title: string; description: string }[];
  servicesArePlaceholders: boolean;
  software: string[];
  skills: string[];
  experience: { company: string; role: string; period: string; description?: string }[];
  clients: { name: string; logo: string; url?: string }[];
  testimonials: { quote: string; name: string; role: string; isPlaceholder?: boolean }[];
  contact: { email: string; instagram: string; youtube: string; whatsapp: string };
  seo: { title: string; description: string; url: string };
  projects: Record<string, ProjectDetails>;
}
