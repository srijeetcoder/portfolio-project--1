// The reference uses GSAP's cubic, quartic and exponential easing curves.
// These functions keep the same pacing on the portfolio's shared Motion clock.
export const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);
export const easeOutQuart = (progress: number) => 1 - Math.pow(1 - progress, 4);
export const easeOutExpo = (progress: number) => progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

export const revealTiming = {
  margin: '0px 0px -18% 0px',
  lines: { duration: 1, desktopStagger: 0.11, phoneStagger: 0.09, delay: 0.05 },
  masked: { duration: 0.7, stagger: 0.035 },
  rise: { duration: 0.9, distance: 24 },
  figure: { duration: 1.2, scale: 1.08, travel: '18%' },
} as const;
