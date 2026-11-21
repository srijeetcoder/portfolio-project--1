import { useEffect, useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'motion/react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';
import { emitScrollFrame, scrollRuntime } from '../lib/scrollRuntime';

export function SmoothScroll() {
  const reduced = useReducedMotion();
  const controller = useRef<Lenis | null>(null);
  useAnimationFrame((_time, delta) => {
    const time = performance.now();
    const lenis = controller.current;
    // Hash changes, keyboard navigation and native scrollbar jumps can land
    // between Lenis' own scroll events. Adopt their position before another
    // wheel gesture so its target starts from the visible section.
    if (lenis && lenis.isScrolling !== 'smooth' && !scrollRuntime.paused) {
      lenis.animatedScroll = window.scrollY;
      lenis.targetScroll = window.scrollY;
    }
    lenis?.raf(time);
    const smooth = lenis?.isScrolling === 'smooth';
    emitScrollFrame(time, delta, smooth ? lenis.animatedScroll : window.scrollY,
      smooth ? lenis.targetScroll - lenis.animatedScroll : null, Boolean(reduced));
    document.documentElement.dataset.scrollMode = scrollRuntime.paused ? 'paused' : smooth ? 'smooth' : 'native';
  });

  useEffect(() => {
    if (reduced) return;
    const lenis = new Lenis({ lerp: 0.09, wheelMultiplier: 1.1, touchMultiplier: 1.4,
      smoothWheel: true, syncTouch: false, anchors: true, autoRaf: false });
    controller.current = lenis;
    scrollRuntime.smooth = true;
    scrollRuntime.lastY = window.scrollY;
    lenis.raf(performance.now());
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
    const keyboard = (event: KeyboardEvent) => {
      if (!['ArrowUp', 'ArrowDown', 'PageUp', 'PageDown', 'Home', 'End', ' '].includes(event.key)) return;
      const target = event.target as HTMLElement | null;
      if (scrollRuntime.paused || target?.closest('input, textarea, select, video, button, [contenteditable="true"]')) return;
      if (lenis.isScrolling === 'smooth') { lenis.stop(); lenis.start(); }
    };
    document.addEventListener('keydown', keyboard, { capture: true });
    syncDialog();
    return () => {
      observer.disconnect();
      document.removeEventListener('keydown', keyboard, { capture: true });
      lenis.destroy();
      controller.current = null;
      scrollRuntime.smooth = false;
      scrollRuntime.lag = 0;
      scrollRuntime.velocity = 0;
      scrollRuntime.lastY = null;
      scrollRuntime.paused = false;
      delete document.documentElement.dataset.scrollMode;
      document.dispatchEvent(new Event('portfolio:motion-pause'));
    };
  }, [reduced]);
  return null;
}
