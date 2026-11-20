import { useEffect, useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'motion/react';
import { createRibbonRenderer } from '../lib/ribbon/renderer';
import type { RibbonRenderer } from '../lib/ribbon/renderer';
import type { RefObject } from 'react';

export function RibbonGallery({ section, signature }: { section: RefObject<HTMLElement | null>; signature: string }) {
  const renderer = useRef<RibbonRenderer | null>(null);
  const reduced = useReducedMotion();
  useAnimationFrame((time, delta) => renderer.current?.frame(time, delta));
  useEffect(() => {
    if (reduced || !section.current) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'ribbon-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    section.current.append(canvas);
    try { renderer.current = createRibbonRenderer(canvas, section.current); }
    catch (error) { canvas.dataset.rendererError = error instanceof Error ? error.message : 'Renderer unavailable'; }
    return () => { renderer.current?.dispose(); renderer.current = null; canvas.remove(); };
  }, [section, signature, reduced]);
  return null;
}
