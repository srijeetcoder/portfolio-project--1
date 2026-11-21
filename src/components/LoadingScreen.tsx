'use client';

import { useEffect, useRef, useState } from 'react';
import { animate, m as motion, useMotionValue, useMotionValueEvent, useReducedMotion } from 'motion/react';
import { bootRuntime, completeBootTask, releasePortfolio, settleBootFallbacks, useBootProgress } from '../lib/bootRuntime';
import { mediaUrl, projects } from '../data/content';
import editorLogo from '../../reference/images/editor-logo.svg';
import type { mountLoadingMarble } from '../lib/loadingMarble';

export function LoadingScreen() {
  const preview = typeof location !== 'undefined' && import.meta.env.DEV && new URLSearchParams(location.search).has('loader-preview');
  const [visible, setVisible] = useState(() => !bootRuntime.released || preview);
  const [exiting, setExiting] = useState(false);
  const visual = useRef<HTMLDivElement>(null);
  const digits = useRef<HTMLSpanElement>(null);
  const started = useRef(typeof performance === 'undefined' ? 0 : performance.now());
  const progress = useBootProgress();
  const displayed = useMotionValue(0);
  const reduced = useReducedMotion();
  useMotionValueEvent(displayed, 'change', value => { if (digits.current) digits.current.textContent = String(Math.round(value)); });

  useEffect(() => {
    const control = animate(displayed, progress, { duration: reduced ? 0 : 0.24, ease: 'easeOut' });
    return () => control.stop();
  }, [progress, displayed, reduced]);

  useEffect(() => {
    if (!visible) return;
    const previousOverflow = document.documentElement.style.overflow;
    const targets = [...document.querySelectorAll<HTMLElement>('main, .site-header, .site-footer, .skip-link')];
    const previousInert = targets.map(element => element.inert);
    document.documentElement.style.overflow = 'hidden';
    targets.forEach(element => { element.inert = true; });
    const image = document.querySelector<HTMLImageElement>('.hero-poster');
    void (image?.decode() ?? Promise.resolve()).catch(() => {}).then(() => completeBootTask('hero'));
    const poster = new Image();
    poster.src = projects[0]?.poster ? mediaUrl(projects[0].poster) : image?.src || '';
    void poster.decode().catch(() => {}).then(() => completeBootTask('poster'));
    void document.fonts.ready.then(() => completeBootTask('fonts'));
    const fallback = setTimeout(settleBootFallbacks, 12000);
    return () => {
      clearTimeout(fallback);
      document.documentElement.style.overflow = previousOverflow;
      targets.forEach((element, index) => { element.inert = previousInert[index]; });
    };
  }, [visible]);

  useEffect(() => {
    const host = visual.current;
    if (!visible || !host) return;
    let cancelled = false, marble: Awaited<ReturnType<typeof mountLoadingMarble>> | null = null;
    const controller = new AbortController();
    void import('../lib/loadingMarble').then(async module => {
      if (cancelled) return;
      try {
        const instance = await module.mountLoadingMarble(host, Boolean(reduced), controller.signal);
        if (cancelled) { instance.dispose(); return; }
        marble = instance; completeBootTask('marble');
      } catch (error) {
        if (!cancelled) {
          host.dataset.marbleError = error instanceof Error ? error.message : 'Marble unavailable';
          completeBootTask('marble');
        }
      }
    });
    return () => { cancelled = true; controller.abort(); marble?.dispose(); };
  }, [visible, reduced]);

  useEffect(() => {
    if (!visible || progress !== 100 || preview) return;
    const remaining = Math.max(0, (reduced ? 2000 : 2500) - (performance.now() - started.current));
    const timer = setTimeout(() => { releasePortfolio(); setExiting(true); }, remaining);
    return () => clearTimeout(timer);
  }, [progress, visible, reduced, preview]);

  if (!visible) return null;
  return (
    <motion.div className="loading-screen" data-loader-active="true" initial={{ opacity: 1 }} animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: reduced ? 0.25 : 0.8, ease: [0.65, 0, 0.35, 1] }}
      onAnimationComplete={() => { if (exiting) setVisible(false); }}>
      <div className="loading-visual" ref={visual} aria-hidden="true">
        <picture className="loading-marble-poster">
          <source media="(max-width: 809px)" srcSet={mediaUrl('/loading/marble-phone.webp')} />
          <img src={mediaUrl('/loading/marble-desktop.webp')} alt="" width={1440} height={900} decoding="async" />
        </picture>
        <div className="loading-grain" />
      </div>
      <img className="loading-brand" src={editorLogo} alt="" aria-hidden="true" width={110} height={50} />
      <div className="loading-progress" role="progressbar" aria-label="Loading portfolio" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
        <div className="loading-percentage"><span ref={digits}>0</span><span>%</span></div>
        <span className="loading-label">Loading portfolio</span>
      </div>
    </motion.div>
  );
}
