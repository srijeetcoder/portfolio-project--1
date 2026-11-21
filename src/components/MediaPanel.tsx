import { Play } from 'lucide-react';
import { useEffect, useRef } from 'react';
import { animate, m as motion, useInView, useMotionValue, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { durationLabel, mediaUrl } from '../data/content';
import { visuals } from '../data/visuals';
import { easeOutExpo, revealTiming } from '../lib/motionSettings';
import type { Project } from '../types';
import type { MotionValue } from 'motion/react';
import type { CSSProperties, RefObject } from 'react';

export interface TheaterFocus {
  x: MotionValue<number>;
  y: MotionValue<number>;
  scale: MotionValue<number>;
  captionOpacity: MotionValue<number>;
}

export function MediaPanel({ item, onPlay, hero = false, buttonRef, focus }: {
  item: Project;
  onPlay: (project: Project) => void;
  hero?: boolean;
  buttonRef?: RefObject<HTMLButtonElement | null>;
  focus?: TheaterFocus;
}) {
  const ownRef = useRef<HTMLButtonElement>(null);
  const ref = buttonRef ?? ownRef;
  const reduced = useReducedMotion();
  const entered = useInView(ref, { once: true, margin: revealTiming.margin });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const imageY = useTransform(scrollYProgress, value => reduced ? '0%' : `${(0.5 - value) * 7}%`);
  const visible = reduced || entered;
  const ratio = item.width && item.height ? item.width / item.height : 16 / 9;
  const portrait = ratio < 1;
  const captionEntrance = useMotionValue(0);
  const fullOpacity = useMotionValue(1);
  const captionOpacity = useTransform([captionEntrance, focus?.captionOpacity ?? fullOpacity], values =>
    (values[0] as number) * (values[1] as number));
  useEffect(() => {
    const control = animate(captionEntrance, visible ? 1 : 0, { duration: reduced ? 0 : 0.7, delay: reduced ? 0 : 0.12 });
    return () => control.stop();
  }, [visible, reduced, captionEntrance]);
  const poster = item.poster?.startsWith('/posters/') ? mediaUrl(item.poster) : (item.poster || visuals.hero);
  return (
    <figure className={'media-panel' + (hero ? ' hero-media' : ' showreel-media') + (portrait ? ' media-panel--portrait' : '')}
      style={{ '--media-ratio': ratio } as CSSProperties}>
      <motion.button ref={ref} className="media-panel-button" onClick={() => onPlay(item)} aria-label={
        item.isPlaceholder ? 'Preview the showreel space, original footage coming soon' : 'Play showreel'
      }
        style={{ aspectRatio: ratio, ...(focus ? { x: focus.x, y: focus.y, scale: focus.scale, transformOrigin: '0% 0%' } : {}) }}
        initial={reduced ? false : { clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={{ clipPath: visible ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }}
        transition={{ duration: reduced ? 0 : revealTiming.figure.duration, ease: easeOutExpo }}>
        <motion.span className="media-parallax" style={{ y: imageY }} aria-hidden="true">
          <span className="media-hover-zoom">
            <motion.img
              src={poster}
              srcSet={item.posterSources?.map(source => mediaUrl(source.src) + ' ' + source.width + 'w').join(', ')}
              sizes={portrait ? '(max-width: 809px) 45vw, 35vw' : '(max-width: 809px) calc(100vw - 40px), 72vw'}
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
      <motion.figcaption className="media-caption" style={{ opacity: captionOpacity }}>
        <span>{hero ? 'The showreel' : item.categoryId === 'showreel' ? 'Dedicated showreel' : 'Featured edit: ' + item.title}</span>
        <span className="muted">{item.isPlaceholder ? 'Original footage coming soon' : durationLabel(item.duration)}</span>
      </motion.figcaption>
    </figure>
  );
}
