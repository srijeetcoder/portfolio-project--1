import { Play } from 'lucide-react';
import { durationLabel, mediaUrl } from '../data/content';
import { visuals } from '../data/visuals';
import type { Project } from '../types';

export function MediaPanel({ item, onPlay, hero = false }: {
  item: Project;
  onPlay: (project: Project) => void;
  hero?: boolean;
}) {
  const poster = item.poster?.startsWith('/posters/') ? mediaUrl(item.poster) : (item.poster || visuals.hero);
  return (
    <figure className={'media-panel' + (hero ? ' hero-media' : ' showreel-media')}>
      <button className="media-panel-button" onClick={() => onPlay(item)} aria-label={
        item.isPlaceholder ? 'Preview the showreel space, original footage coming soon' : 'Play showreel'
      }>
        <img
          src={poster}
          alt={item.isPlaceholder ? 'Red grain artwork for the upcoming showreel' : 'Showreel poster'}
          width={item.width || 1800}
          height={item.height || 1200}
          loading={hero ? 'eager' : 'lazy'}
          fetchPriority={hero ? 'high' : 'auto'}
          decoding="async"
        />
        <span className="media-shade" aria-hidden="true" />
        <span className="media-play" aria-hidden="true">
          <span className="play-circle"><Play size={24} fill="currentColor" strokeWidth={0} /></span>
          <span className="play-label">Watch showreel</span>
        </span>
      </button>
      <figcaption className="media-caption">
        <span>{hero ? 'The showreel' : 'Dedicated showreel'}</span>
        <span className="muted">{item.isPlaceholder ? 'Original footage coming soon' : durationLabel(item.duration)}</span>
      </figcaption>
    </figure>
  );
}
