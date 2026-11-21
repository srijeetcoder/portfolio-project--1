import { m as motion, useReducedMotion } from 'motion/react';
import { easeOutExpo, revealTiming } from '../lib/motionSettings';
import type { ReactNode } from 'react';

export function Reveal({ children, className = '', delay = 0 }: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: revealTiming.rise.distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: reducedMotion ? 0 : revealTiming.rise.duration, delay: reducedMotion ? 0 : delay, ease: easeOutExpo }}
      data-reveal
    >
      {children}
    </motion.div>
  );
}
