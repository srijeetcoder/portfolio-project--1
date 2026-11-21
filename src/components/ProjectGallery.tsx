import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useInView, useReducedMotion } from 'motion/react';
import { mediaUrl, projects } from '../data/content';
import { visuals } from '../data/visuals';
import { LiquidHeading } from './LiquidText';
import { RibbonGallery } from './RibbonGallery';
import { RollContent } from './RollContent';
import type { CSSProperties, PointerEvent } from 'react';
import type { Project } from '../types';

function ProjectCard({ project, activePreview, onPreview, onPlay }: {
  project: Project;
  activePreview: string | null;
  onPreview: (id: string | null) => void;
  onPlay: (project: Project) => void;
}) {
  const cardRef = useRef<HTMLButtonElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const visible = useInView(cardRef);
  const reducedMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const previewing = !reducedMotion && visible && activePreview === project.id && project.sources.length > 0;
  const portrait = Boolean(project.width && project.height && project.height > project.width);
  const aspect = project.imageAspect || (project.width && project.height ? project.width + ' / ' + project.height : '16 / 9');
  const poster = project.poster?.startsWith('/posters/') ? mediaUrl(project.poster) : (project.poster || visuals.hero);

  function endPreview() {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = null;
    if (activePreview === project.id) onPreview(null);
  }

  function beginPreview(event: PointerEvent<HTMLButtonElement>) {
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    if (event.pointerType !== 'mouse' || reducedMotion || connection?.saveData || project.sources.length === 0) return;
    hoverTimer.current = setTimeout(() => onPreview(project.id), 350);
  }

  useEffect(() => {
    if (!visible && activePreview === project.id) onPreview(null);
  }, [visible, activePreview, project.id, onPreview]);

  useEffect(() => {
    setVideoReady(false);
    if (!previewing || !videoRef.current) return;
    const video = videoRef.current;
    void video.play().catch(() => {});
    return () => {
      video.pause();
      video.querySelectorAll('source').forEach(source => source.removeAttribute('src'));
      video.removeAttribute('src');
      video.load();
    };
  }, [previewing]);

  useEffect(() => () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
  }, []);

  return (
    <article data-project-id={project.id} className={'proj project-wrap' + (portrait ? ' project-portrait' : '')}
      style={{ '--project-ratio': aspect } as CSSProperties}>
      <button ref={cardRef} className="proj__card project-card"
        onPointerEnter={beginPreview} onPointerLeave={endPreview} onBlur={endPreview}
        onClick={() => { endPreview(); onPreview(null); onPlay(project); }}
        aria-label={project.isPlaceholder ? 'Preview project placeholder' : 'Watch ' + project.title}>
        <span className="project-media">
          <img className="proj__img" src={poster}
            srcSet={project.posterSources?.map(source => (source.src.startsWith('/posters/') ? mediaUrl(source.src) : source.src) + ' ' + source.width + 'w').join(', ')}
            sizes={portrait ? '(max-width: 809px) 70vw, 30vw' : '(max-width: 809px) calc(100vw - 48px), 52vw'}
            alt={project.isPlaceholder ? 'Reference layout preview awaiting original video work' : project.title + ' poster'}
            width={project.width || 1280} height={project.height || 720} loading="lazy" decoding="async"
            onError={event => {
              if (event.currentTarget.src !== new URL(visuals.hero, location.href).href) event.currentTarget.src = visuals.hero;
            }} />
          {previewing && (
            <video ref={videoRef} className={'preview-video' + (videoReady ? ' preview-ready' : '')}
              muted loop playsInline autoPlay preload="none" aria-hidden="true" tabIndex={-1}
              onPlaying={() => setVideoReady(true)} onError={() => setVideoReady(false)}>
              {(project.previewSources?.length ? project.previewSources : project.sources).map(source =>
                <source key={source.src} src={mediaUrl(source.src)} type={source.type} />)}
            </video>
          )}
          <span className="project-play-cue" aria-hidden="true">
            <span className="project-cue-label">Click to play video</span>
            <span className="project-cue-arrow"><ArrowUpRight size={19} strokeWidth={1.3} /></span>
          </span>
        </span>
      </button>
      <div className="proj__cap project-caption">
        <h3 className="proj__title project-title">{project.title}</h3>
        {project.description && <p className="project-description">{project.description}</p>}
        <p className="proj__kind project-category">{project.category}{project.year ? ', ' + project.year : ''}</p>
        <span className="project-touch-cue" aria-hidden="true">Tap to play video <ArrowUpRight size={14} strokeWidth={1.3} /></span>
      </div>
    </article>
  );
}

export function ProjectGallery({ onPlay, playerOpen }: { onPlay: (project: Project) => void; playerOpen: boolean }) {
  const sectionRef = useRef<HTMLElement>(null);
  const [filter, setFilter] = useState('all');
  const [activePreview, setActivePreview] = useState<string | null>(null);
  const placeholders = projects.every(project => project.isPlaceholder);
  const categories = Array.from(new Map(projects.filter(project => !project.isPlaceholder).map(project => [project.categoryId, project.category])).entries());
  const displayedProjects = filter === 'all' ? projects : projects.filter(project => project.categoryId === filter);
  const signature = displayedProjects.map(project => project.id).join('|');

  useEffect(() => {
    const wrappers = [...(sectionRef.current?.querySelectorAll<HTMLElement>('.project-wrap') || [])];
    const captions = wrappers.map(wrapper => wrapper.querySelector<HTMLElement>('.project-caption')!);
    // Read all caption sizes before changing spacing. This also serves the
    // native gallery when reduced motion or a missing WebGL context is used.
    const measure = () => {
      const heights = captions.map(caption => Math.ceil(caption.getBoundingClientRect().height) + 'px');
      wrappers.forEach((wrapper, index) => {
        if (wrapper.style.getPropertyValue('--caption-height') !== heights[index]) {
          wrapper.style.setProperty('--caption-height', heights[index]);
        }
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    captions.forEach(caption => observer.observe(caption));
    return () => observer.disconnect();
  }, [signature]);

  useEffect(() => {
    const stopPreviews = () => setActivePreview(null);
    document.addEventListener('visibilitychange', stopPreviews);
    window.addEventListener('blur', stopPreviews);
    return () => {
      document.removeEventListener('visibilitychange', stopPreviews);
      window.removeEventListener('blur', stopPreviews);
    };
  }, []);

  useEffect(() => {
    if (playerOpen) setActivePreview(null);
  }, [playerOpen]);

  return (
    <section id="work" className="work work-section" ref={sectionRef} aria-labelledby="work-title">
      <div className="f-work__head">
        <LiquidHeading id="work-title" className="work__heading">Latest Work</LiquidHeading>
        <a className="f-showall" href="#track" onClick={() => { setFilter('all'); setActivePreview(null); }}>
          <RollContent label="Show all" />
        </a>
        {placeholders && <p className="reference-preview-note">Reference previews. Original videos coming soon.</p>}
      </div>
      {categories.length > 1 && (
        <div className="project-filters" role="group" aria-label="Filter projects by category">
          <button className={filter === 'all' ? 'filter-active' : ''} aria-pressed={filter === 'all'}
            onClick={() => { setFilter('all'); setActivePreview(null); }}>All work</button>
          {categories.map(([id, label]) => <button key={id} className={filter === id ? 'filter-active' : ''} aria-pressed={filter === id}
            onClick={() => { setFilter(id); setActivePreview(null); }}>{label}</button>)}
        </div>
      )}
      <div id="track" className="gallery-grid">
        {displayedProjects.map(project => <ProjectCard key={project.id} project={project}
          activePreview={playerOpen ? null : activePreview} onPreview={setActivePreview} onPlay={onPlay} />)}
      </div>
      <RibbonGallery section={sectionRef} signature={signature} />
    </section>
  );
}
