let painted: Promise<void> | null = null;

// A worker's WebGL driver setup can still occupy the browser's shared GPU.
// Let the prerendered artwork reach the screen before starting that work.
export function afterFirstPaint(): Promise<void> {
  if (typeof window === 'undefined' || performance.getEntriesByName('first-contentful-paint').length) return Promise.resolve();
  if (painted) return painted;
  painted = new Promise(resolve => {
    let observer: PerformanceObserver | null = null, frame = 0, finished = false;
    const timeout = setTimeout(finish, 1800);
    function finish() {
      if (finished) return;
      finished = true;
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      observer?.disconnect();
      resolve();
    }
    if (typeof PerformanceObserver !== 'undefined' && PerformanceObserver.supportedEntryTypes.includes('paint')) {
      observer = new PerformanceObserver(list => {
        if (list.getEntries().some(entry => entry.name === 'first-contentful-paint')) finish();
      });
      observer.observe({ type: 'paint', buffered: true });
    } else frame = requestAnimationFrame(() => { frame = requestAnimationFrame(finish); });
  });
  return painted;
}
