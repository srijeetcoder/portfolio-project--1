import { useEffect, useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { scrollRuntime } from '../lib/scrollRuntime';

export function SmoothScroll() {
  const reduced = useReducedMotion();
  const controller = useRef<Lenis | null>(null);
  useAnimationFrame(time => controller.current?.raf(time));

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.1, touchMultiplier: 1.4,
      smoothWheel: true, syncTouch: false, anchors: true, autoRaf: false });
    controller.current = lenis;
    scrollRuntime.smooth = true;
    const stop = lenis.on('scroll', state => {
      scrollRuntime.y = state.animatedScroll;
      scrollRuntime.lag = state.targetScroll - state.animatedScroll;
    });
    const syncDialog = () => {
      const paused = Boolean(document.querySelector('dialog[open]'));
      if (paused !== scrollRuntime.paused) {
        scrollRuntime.paused = paused;
        document.dispatchEvent(new Event('portfolio:motion-pause'));
      }
      if (paused) lenis.stop();
      else lenis.start();
    };
    const observer = new MutationObserver(syncDialog);
    observer.observe(document.body, { subtree: true, childList: true, attributes: true, attributeFilter: ['open'] });
    syncDialog();
    return () => {
      observer.disconnect();
      stop();
      lenis.destroy();
      controller.current = null;
      scrollRuntime.smooth = false;
      scrollRuntime.lag = 0;
      scrollRuntime.paused = false;
      document.dispatchEvent(new Event('portfolio:motion-pause'));
    };
  }, [reduced]);
  return null;
}
