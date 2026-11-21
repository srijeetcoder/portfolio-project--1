import { useEffect, useRef } from 'react';
import { useInView, useReducedMotion } from 'motion/react';
import { scrollRuntime } from '../lib/scrollRuntime';
import { afterFirstPaint } from '../lib/afterFirstPaint';
import type { GradientMount } from '../lib/GradientMount';

export function ReferenceBackdrop({ kind }: { kind: 'hero' | 'closing' }) {
  const host = useRef<HTMLDivElement>(null);
  const shader = useRef<GradientMount | null>(null);
  const reducedMotion = useReducedMotion();
  const inView = useInView(host, { margin: '700px 0px', once: true });
  const shouldMount = kind === 'hero' || inView;
  const reduced = useRef(reducedMotion);
  reduced.current = reducedMotion;

  useEffect(() => {
    const element = host.current;
    if (!element || !shouldMount) return;
    let cancelled = false;
    const controller = new AbortController();
    async function mount() {
      try {
        await afterFirstPaint();
        if (cancelled) return;
        const { mountReferenceBackdrop } = await import('../lib/mountReferenceBackdrop');
        if (cancelled) return;
        const instance = await mountReferenceBackdrop(element!, kind,
          reduced.current || scrollRuntime.paused ? 0 : 0.8, controller.signal);
        if (!instance) return;
        if (cancelled) { instance.dispose(); return; }
        shader.current = instance;
        instance.setSpeed(reduced.current || scrollRuntime.paused ? 0 : 0.8);
        element!.classList.add('is-live');
      } catch {
        // The downloaded reference still provides the non-WebGL appearance.
      }
    }
    void mount();
    return () => {
      cancelled = true;
      controller.abort();
      shader.current?.dispose();
      shader.current = null;
      element.classList.remove('is-live');
    };
  }, [kind, shouldMount]);

  useEffect(() => {
    shader.current?.setSpeed(reducedMotion || scrollRuntime.paused ? 0 : 0.8);
  }, [reducedMotion]);
  useEffect(() => {
    const update = () => shader.current?.setSpeed(reduced.current || scrollRuntime.paused ? 0 : 0.8);
    document.addEventListener('portfolio:motion-pause', update);
    return () => document.removeEventListener('portfolio:motion-pause', update);
  }, []);

  return <div className={'reference-backdrop reference-backdrop-' + kind} ref={host} aria-hidden="true" />;
}
