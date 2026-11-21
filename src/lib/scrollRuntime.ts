type ScrollFrame = (time: number, delta: number) => void;
interface ScrollRuntime {
  y: number;
  lag: number;
  velocity: number;
  smooth: boolean;
  paused: boolean;
  time: number;
  lastY: number | null;
  frames: Set<ScrollFrame>;
}

function createRuntime(): ScrollRuntime {
  return { y: 0, lag: 0, velocity: 0, smooth: false, paused: false, time: 0, lastY: null, frames: new Set() };
}

// Keep one clock and one state object across live module replacements.
const client = typeof window === 'undefined' ? null : window as Window & { __portfolioScroll?: ScrollRuntime };
export const scrollRuntime = client ? (client.__portfolioScroll ??= createRuntime()) : createRuntime();

export function subscribeScrollFrame(frame: ScrollFrame) {
  scrollRuntime.frames.add(frame);
  return () => { scrollRuntime.frames.delete(frame); };
}

export function emitScrollFrame(time: number, delta: number, y: number, smoothLag: number | null, reduced: boolean) {
  const dt = Math.min(64, Math.max(1, delta));
  const velocity = scrollRuntime.lastY === null ? 0 : (y - scrollRuntime.lastY) * (1000 / 60) / dt;
  scrollRuntime.lastY = y;
  scrollRuntime.y = y;
  scrollRuntime.time = time;
  scrollRuntime.velocity = velocity;
  // Native keyboard, scrollbar and touch movement also drive the surface.
  // 10.6 frames is the lag/velocity ratio of the reference's 0.09 lerp.
  scrollRuntime.lag = reduced || scrollRuntime.paused ? 0 : smoothLag ?? Math.max(-3200, Math.min(3200, velocity * 10.6));
  for (const frame of scrollRuntime.frames) frame(time, delta);
}
