import { useEffect, useRef, useState } from 'react';
import { useAnimationFrame, useReducedMotion } from 'motion/react';
import { createRibbonRenderer } from '../lib/ribbon/renderer';
import type { RibbonRenderer } from '../lib/ribbon/renderer';
import type { RefObject } from 'react';

export function RibbonGallery({ section, signature }: { section: RefObject<HTMLElement | null>; signature: string }) {
  const renderer = useRef<RibbonRenderer | null>(null);
  const reduced = useReducedMotion();
  const [epoch, setEpoch] = useState(0);
  useAnimationFrame((time, delta) => renderer.current?.frame(time, delta));
  useEffect(() => {
    if (reduced || !section.current) return;
    const canvas = document.createElement('canvas');
    canvas.className = 'ribbon-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    section.current.append(canvas);
    const restored = () => setEpoch(value => value + 1);
    canvas.addEventListener('webglcontextrestored', restored);
    try { renderer.current = createRibbonRenderer(canvas, section.current); }
    catch (error) { canvas.dataset.rendererError = error instanceof Error ? error.message : 'Renderer unavailable'; }
    return () => { canvas.removeEventListener('webglcontextrestored', restored); renderer.current?.dispose(); renderer.current = null; canvas.remove(); };
  }, [section, signature, reduced, epoch]);
  return null;
}
