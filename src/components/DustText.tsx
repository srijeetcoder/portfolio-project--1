'use client';

import { Fragment, useEffect, useRef } from 'react';
import { useInView, useMotionValueEvent, useReducedMotion, useScroll } from 'motion/react';
import type { ReactNode } from 'react';
import type { MotionValue } from 'motion/react';
import type { DustTextRenderer } from '../lib/dustText';

export function DustLede({ className, text, children, progress }: {
  className: string; text: string; children: ReactNode; progress?: MotionValue<number>;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const renderer = useRef<DustTextRenderer | null>(null);
  const maximum = useRef(0);
  const reduced = useReducedMotion();
  const nearby = useInView(ref, { margin: '600px 0px', once: true });
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.94', 'end 0.55'] });
  const drive = progress ?? scrollYProgress;
  useMotionValueEvent(drive, 'change', value => {
    maximum.current = Math.max(maximum.current, value);
    renderer.current?.setProgress(maximum.current);
  });

  useEffect(() => {
    if (!nearby || reduced || !ref.current) return;
    const root = ref.current, controller = new AbortController();
    let cancelled = false, instance: DustTextRenderer | null = null;
    void import('../lib/dustText').then(async ({ mountDustText }) => {
      if (cancelled) return;
      const mounted = await mountDustText(root, controller.signal);
      if (cancelled) { mounted.dispose(); return; }
      instance = mounted; renderer.current = mounted;
      maximum.current = Math.max(maximum.current, drive.get());
      mounted.setProgress(maximum.current);
    }).catch(() => { /* Static typography remains readable if canvas setup fails. */ });
    return () => {
      cancelled = true; controller.abort(); instance?.dispose();
      if (renderer.current === instance) renderer.current = null;
    };
  }, [nearby, reduced, drive, text]);

  const words = text.split(/\s+/);
  return (
    <p className={className + ' dust-text'} ref={ref}>
      {children}{' '}
      {words.map((word, index) => <Fragment key={index}><span className="f-w">{word}</span>{index < words.length - 1 ? ' ' : ''}</Fragment>)}
    </p>
  );
}
