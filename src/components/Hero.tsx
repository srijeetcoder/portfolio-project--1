import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';
import { m as motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { portfolio, showreel, mediaUrl } from '../data/content';
import editorWordmark from '../../reference/images/editor-wordmark.svg';
import { Availability } from './Availability';
import { ReferenceBackdrop } from './ReferenceBackdrop';
import { RollContent } from './RollContent';
import type { CSSProperties } from 'react';
import type { Project } from '../types';

export function Hero({ onPlay }: { onPlay: (project: Project) => void }) {
  const heroRef = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [height, setHeight] = useState(750);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, value => reduced ? 0 : value * height * 0.4);
  const fade = useTransform(scrollYProgress, [0.03, 0.22], [0, 1]);
  const mask = portfolio.hero.wordmarkImage ? mediaUrl(portfolio.hero.wordmarkImage) : editorWordmark;

  useEffect(() => {
    const element = heroRef.current;
    if (!element) return;
    const observer = new ResizeObserver(() => setHeight(element.offsetHeight));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="hero" className="hero" ref={heroRef} aria-labelledby="hero-title"
      style={{ '--wordmark-mask': 'url("' + mask + '")' } as CSSProperties}>
      <div className="hero-visual" aria-hidden="true">
        <motion.div className="hero__inner" style={{ y }}>
          <div className="hero__gradient"><ReferenceBackdrop kind="hero" /></div>
          <motion.div className="hero__logo-blend" aria-hidden="true"
            initial={{ opacity: 0, y: -60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 1.1, ease: [0.11, 0.06, 0.18, 1] }}>
            <div className="hero__wordmark" />
          </motion.div>
          <div className="hero__silhouette" aria-hidden="true" />
        </motion.div>
        <motion.div className="hero__fade" style={{ opacity: reduced ? 0 : fade }} />
      </div>
      <h1 className="sr-only" id="hero-title">{portfolio.identity.role}. {portfolio.hero.headline.join(' ')}</h1>
      <motion.div className="atf-what hero-copy" style={{ y }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.2 }}>
        <div className="atf-intro">
          <p className="atf-st hero-description">{portfolio.hero.introduction}</p>
          <div className="hero-actions">
            <a className="f-showall" href="#work"><RollContent label="View my work" /></a>
            <a className="f-showall" href="#contact"><RollContent label="Contact me" /></a>
          </div>
        </div>
        <div className="atf-meta hero-intro">
          <button className="hero-reel f-showall" onClick={() => onPlay(showreel)}>
            <Play size={13} fill="currentColor" strokeWidth={0} aria-hidden="true" /><RollContent label="Watch showreel" arrow={false} />
          </button>
          <Availability />
        </div>
      </motion.div>
    </section>
  );
}
