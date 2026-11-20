let ready: Promise<void> | null = null;

export function prewarmRibbon(): Promise<void> {
  if (ready) return ready;
  if (typeof window === 'undefined' || typeof Worker === 'undefined' || typeof OffscreenCanvas === 'undefined'
    || matchMedia('(prefers-reduced-motion: reduce)').matches) return Promise.resolve();
  ready = new Promise(resolve => {
    let worker: Worker | null = null;
    const timeout = setTimeout(finish, 4500);
    function finish() {
      clearTimeout(timeout);
      worker?.terminate();
      resolve();
    }
    try {
      worker = new Worker(new URL('./warmup.worker.ts', import.meta.url), { type: 'module' });
      worker.onmessage = finish;
      worker.onerror = finish;
      worker.postMessage({ type: 'warmup' });
    } catch { finish(); }
  });
  return ready;
}
