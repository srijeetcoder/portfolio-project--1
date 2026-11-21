import { useEffect, useRef } from 'react';
import { Play } from 'lucide-react';
import { animate, m as motion, useMotionValue, useMotionValueEvent, useReducedMotion, useTransform } from 'motion/react';
import { portfolio, showreel, mediaUrl } from '../data/content';
import editorWordmark from '../../reference/images/editor-wordmark.svg';
import heroPoster from '../../reference/images/reference-hero.webp';
import { Availability } from './Availability';
import { ReferenceBackdrop } from './ReferenceBackdrop';
import { RollContent } from './RollContent';
import { usePinnedScene } from '../lib/usePinnedScene';
import type { CSSProperties } from 'react';
import type { Project } from '../types';

export function Hero({ onPlay }: { onPlay: (project: Project) => void }) {
  const sceneRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const scene = usePinnedScene(sceneRef, heroRef);
  const entrance = useMotionValue(0);
  const shot = useTransform(scene.progress, value => value * value * (3 - 2 * value));
  const cameraY = useTransform(shot, value => -scene.height * 0.2 * value);
  const cameraScale = useTransform(shot, [0, 1], [1, 1.26]);
  const cameraTilt = useTransform(shot, [0, 1], [0, -5]);
  const copyY = useTransform(scene.progress, value => -scene.height * 0.08 * value);
  const copyExit = useTransform(scene.progress, [0.12, 0.75], [1, 0]);
  const copyOpacity = useTransform([entrance, copyExit], values => (values[0] as number) * (values[1] as number));
  const fade = useTransform(scene.progress, [0.25, 1], [0, 1]);
  const mask = portfolio.hero.wordmarkImage ? mediaUrl(portfolio.hero.wordmarkImage) : editorWordmark;
  useMotionValueEvent(scene.progress, 'change', value => {
    if (copyRef.current) copyRef.current.inert = value >= 0.75;
  });
  useEffect(() => {
    const element = copyRef.current;
    if (!element) return;
    element.inert = scene.progress.get() >= 0.75;
    return () => { element.inert = false; };
  }, [scene.progress]);

  useEffect(() => {
    const control = animate(entrance, 1, { duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.2 });
    return () => control.stop();
  }, [reduced, entrance]);

  return (
    <section id="hero" className="scroll-scene hero-scroll-scene" ref={sceneRef} aria-labelledby="hero-title"
      data-pin-state={scene.mode} style={scene.style}>
    <div className="hero" ref={heroRef} style={{ '--wordmark-mask': 'url("' + mask + '")' } as CSSProperties}>
      <div className="hero-visual" aria-hidden="true">
        <motion.div className="hero__inner" style={{ y: cameraY, scale: cameraScale, rotateX: cameraTilt }}>
          <div className="hero__gradient">
            <img className="hero-poster" src={heroPoster} alt="" aria-hidden="true" width={800} height={1417}
              loading="eager" fetchPriority="high" decoding="async" />
            <ReferenceBackdrop kind="hero" />
          </div>
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
      <motion.div className="atf-what hero-copy" ref={copyRef} style={{ y: copyY, opacity: copyOpacity }}>
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
    </div>
    </section>
  );
}
