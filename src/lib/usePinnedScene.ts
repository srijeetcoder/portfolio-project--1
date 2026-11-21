import { useEffect, useRef, useState } from 'react';
import { useReducedMotion, useScroll, useTransform } from 'motion/react';
import type { CSSProperties, RefObject } from 'react';

type Mode = 'auto' | 'on' | 'off';
interface Options { minimumWidth?: number; minimumHeight?: number; fitStage?: boolean; arrival?: boolean }

export function usePinnedScene(scene: RefObject<HTMLElement | null>, stage: RefObject<HTMLElement | null>, {
  minimumWidth = 0, minimumHeight = 500, fitStage = false, arrival = false,
}: Options = {}) {
  const reduced = useReducedMotion();
  const [metrics, setMetrics] = useState<{ height: number; mode: Mode }>({ height: 0, mode: 'auto' });
  const { scrollYProgress } = useScroll({ target: scene,
    offset: [arrival ? 'start 0.75' : 'start start', `end ${metrics.height}px`] });
  const progress = useTransform(scrollYProgress, value => metrics.mode === 'on' && !reduced ? Math.max(0, Math.min(1, value)) : 0);
  const measured = useRef(false);

  useEffect(() => {
    const element = stage.current;
    if (!element) return;
    let cancelled = false;
    const measure = () => {
      if (cancelled) return;
      const height = element.offsetHeight;
      const eligible = !reduced && innerWidth >= minimumWidth && innerHeight >= minimumHeight
        && (!fitStage || height <= innerHeight + 1);
      const mode = eligible ? 'on' : 'off';
      measured.current = true;
      setMetrics(previous => previous.height === height && previous.mode === mode ? previous : { height, mode });
    };
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    addEventListener('resize', measure);
    measure();
    void document.fonts.ready.then(measure);
    return () => { cancelled = true; observer.disconnect(); removeEventListener('resize', measure); };
  }, [scene, stage, reduced, minimumWidth, minimumHeight, fitStage]);

  return { progress, enabled: metrics.mode === 'on', mode: metrics.mode, height: metrics.height,
    style: (metrics.height ? { '--scene-stage-height': `${metrics.height}px` } : {}) as CSSProperties };
}
