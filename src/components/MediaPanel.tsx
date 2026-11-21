import { Play } from 'lucide-react';
import { useRef } from 'react';
import { m as motion, useInView, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { durationLabel, mediaUrl } from '../data/content';
import { visuals } from '../data/visuals';
import { easeOutExpo, revealTiming } from '../lib/motionSettings';
import type { Project } from '../types';

export function MediaPanel({ item, onPlay, hero = false }: {
  item: Project;
  onPlay: (project: Project) => void;
  hero?: boolean;
}) {
  const ref = useRef<HTMLButtonElement>(null);
  const reduced = useReducedMotion();
  const entered = useInView(ref, { once: true, margin: revealTiming.margin });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, value => reduced ? '0%' : `${(0.5 - value) * 7}%`);
  const visible = reduced || entered;
  const poster = item.poster?.startsWith('/posters/') ? mediaUrl(item.poster) : (item.poster || visuals.hero);
  return (
    <figure className={'media-panel' + (hero ? ' hero-media' : ' showreel-media')}>
      <motion.button ref={ref} className="media-panel-button" onClick={() => onPlay(item)} aria-label={
        item.isPlaceholder ? 'Preview the showreel space, original footage coming soon' : 'Play showreel'
      }
        initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: reduced ? 0 : revealTiming.figure.duration, ease: easeOutExpo }}>
        <motion.span className="media-parallax" style={{ y: imageY }} aria-hidden="true">
          <span className="media-hover-zoom">
        <motion.img
          src={poster}
          srcSet={item.posterSources?.map(source => mediaUrl(source.src) + ' ' + source.width + 'w').join(', ')}
          sizes="(max-width: 809px) calc(100vw - 40px), 72vw"
          alt={item.isPlaceholder ? 'Red grain artwork for the upcoming showreel' : 'Showreel poster'}
          width={item.width || 1800}
          height={item.height || 1200}
          loading={hero ? 'eager' : 'lazy'}
          fetchPriority={hero ? 'high' : 'auto'}
          decoding="async"
          initial={reduced ? false : { y: revealTiming.figure.travel, scale: revealTiming.figure.scale }}
          animate={{ y: visible ? '0%' : revealTiming.figure.travel, scale: visible ? 1 : revealTiming.figure.scale }}
          transition={{ duration: reduced ? 0 : revealTiming.figure.duration, ease: easeOutExpo }}
        />
          </span>
        </motion.span>
        <span className="media-shade" aria-hidden="true" />
        <span className="media-play" aria-hidden="true">
          <span className="play-circle"><Play size={24} fill="currentColor" strokeWidth={0} /></span>
          <span className="play-label">Watch showreel</span>
        </span>
      </motion.button>
      <motion.figcaption className="media-caption" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: visible ? 1 : 0 }}
        transition={{ duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.12 }}>
        <span>{hero ? 'The showreel' : 'Dedicated showreel'}</span>
        <span className="muted">{item.isPlaceholder ? 'Original footage coming soon' : durationLabel(item.duration)}</span>
      </motion.figcaption>
    </figure>
  );
}
