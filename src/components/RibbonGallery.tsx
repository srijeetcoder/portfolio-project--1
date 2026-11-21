import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';
import { subscribeScrollFrame } from '../lib/scrollRuntime';
import type { RibbonRenderer } from '../lib/ribbon/renderer';
import type { RefObject } from 'react';

export function RibbonGallery({ section, signature }: { section: RefObject<HTMLElement | null>; signature: string }) {
  const renderer = useRef<RibbonRenderer | null>(null);
  const reduced = useReducedMotion();
  const [epoch, setEpoch] = useState(0);
  useEffect(() => subscribeScrollFrame((time, delta) => renderer.current?.frame(time, delta)), []);
  useEffect(() => {
    if (reduced || !section.current) return;
    const parent = section.current;
    const canvas = document.createElement('canvas');
    canvas.className = 'ribbon-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    const restored = () => setEpoch(value => value + 1);
    canvas.addEventListener('webglcontextrestored', restored);
    let cancelled = false;
    const controller = new AbortController();
    const grid = parent.querySelector('.gallery-grid');
    const initialCards = [...parent.querySelectorAll<HTMLElement>('.project-wrap')];
    let refreshPending = false;
    const replacements = new MutationObserver(() => {
      if (cancelled || refreshPending) return;
      const current = [...parent.querySelectorAll<HTMLElement>('.project-wrap')];
      // A changed filter already reinitializes this effect through signature.
      // Card replacements with the same IDs (including Fast Refresh) also
      // need fresh texture sources and event targets.
      if (current.map(card => card.dataset.projectId).join('|') !== signature) return;
      if (current.some((card, index) => card !== initialCards[index])) {
        refreshPending = true;
        setEpoch(value => value + 1);
      }
    });
    if (grid) replacements.observe(grid, { childList: true });
    void import('../lib/ribbon/renderer').then(async ({ createRibbonRenderer }) => {
      if (cancelled) return;
      parent.append(canvas);
      try {
        const instance = await createRibbonRenderer(canvas, parent, controller.signal);
        if (cancelled) { instance.dispose(); return; }
        renderer.current = instance;
      }
      catch (error) { canvas.dataset.rendererError = error instanceof Error ? error.message : 'Renderer unavailable'; }
    });
    return () => { cancelled = true; replacements.disconnect(); controller.abort(); canvas.removeEventListener('webglcontextrestored', restored); renderer.current?.dispose(); renderer.current = null; canvas.remove(); };
  }, [section, signature, reduced, epoch]);
  return null;
}
