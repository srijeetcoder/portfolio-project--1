import { useEffect, useRef, useState } from 'react';
import { m as motion, useTransform } from 'motion/react';
import { showreel } from '../data/content';
import { MediaPanel } from './MediaPanel';
import { LiquidHeading } from './LiquidText';
import { usePinnedScene } from '../lib/usePinnedScene';
import type { Project } from '../types';

export function Showreel({ onPlay }: { onPlay: (project: Project) => void }) {
  const sceneRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const mediaRef = useRef<HTMLButtonElement>(null);
  const scene = usePinnedScene(sceneRef, stageRef);
  const [target, setTarget] = useState({ x: 0, y: 0, scale: 1 });
  const focusProgress = useTransform(scene.progress, value => {
    const t = Math.max(0, Math.min(1, (value - 0.08) / 0.72));
    return t * t * (3 - 2 * t);
  });
  const x = useTransform(focusProgress, value => target.x * value);
  const y = useTransform(focusProgress, value => target.y * value);
  const scale = useTransform(focusProgress, value => 1 + (target.scale - 1) * value);
  const captionOpacity = useTransform(scene.progress, [0, 0.25], [1, 0]);
  const headingY = useTransform(focusProgress, [0, 1], [0, -64]);
  const headingOpacity = useTransform(scene.progress, [0.1, 0.45], [1, 0]);

  useEffect(() => {
    const stage = stageRef.current, media = mediaRef.current;
    if (!stage || !media) return;
    const measure = () => {
      let left = 0, top = 0, element: HTMLElement | null = media;
      // Layout offsets stay stable while the GPU transforms the surface.
      while (element && element !== stage) {
        left += element.offsetLeft; top += element.offsetTop;
        element = element.offsetParent as HTMLElement | null;
      }
      const width = media.offsetWidth, height = media.offsetHeight;
      const viewportWidth = document.documentElement.clientWidth;
      const inset = viewportWidth <= 809.98 ? 48 : 88;
      const zoom = Math.min(viewportWidth / Math.max(1, width), (innerHeight - inset * 2) / Math.max(1, height));
      const next = { x: (viewportWidth - width * zoom) / 2 - left,
        y: (innerHeight - height * zoom) / 2 - top, scale: zoom };
      setTarget(previous => previous.x === next.x && previous.y === next.y && previous.scale === next.scale ? previous : next);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(stage); observer.observe(media);
    addEventListener('resize', measure);
    measure();
    return () => { observer.disconnect(); removeEventListener('resize', measure); };
  }, []);

  return (
    <section id="showreel" className="f-sec showreel-section chapter-section scroll-scene showreel-scroll-scene" data-tone="white" aria-labelledby="showreel-title"
      ref={sceneRef} data-pin-state={scene.mode} style={scene.style}>
      <div className="scene-stage showreel-story" ref={stageRef}>
      <div className="f-grid">
        <motion.div className="showreel-heading" style={{ y: headingY, opacity: headingOpacity }}>
          <LiquidHeading id="showreel-title" className="f-title">Showreel</LiquidHeading>
        </motion.div>
        <div className="showreel-wrap"><MediaPanel item={showreel} onPlay={onPlay} buttonRef={mediaRef}
          focus={scene.enabled ? { x, y, scale, captionOpacity } : undefined} /></div>
      </div>
      </div>
    </section>
  );
}
