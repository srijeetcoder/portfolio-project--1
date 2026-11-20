import { useEffect, useRef } from 'react';
import { useAnimationFrame, useReducedMotion } from 'motion/react';
import { createRibbonRenderer } from '../lib/ribbon/renderer';
import type { RibbonRenderer } from '../lib/ribbon/renderer';
import type { RefObject } from 'react';

export function RibbonGallery({ section, signature }: { section: RefObject<HTMLElement | null>; signature: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<RibbonRenderer | null>(null);
  const reduced = useReducedMotion();
  useAnimationFrame((time, delta) => renderer.current?.frame(time, delta));
  useEffect(() => {
    if (reduced || !canvas.current || !section.current) return;
    try { renderer.current = createRibbonRenderer(canvas.current, section.current); }
    catch (error) { canvas.current.dataset.rendererError = error instanceof Error ? error.message : 'Renderer unavailable'; }
    return () => { renderer.current?.dispose(); renderer.current = null; };
  }, [section, signature, reduced]);
  return <canvas className="ribbon-canvas" ref={canvas} aria-hidden="true" />;
}
