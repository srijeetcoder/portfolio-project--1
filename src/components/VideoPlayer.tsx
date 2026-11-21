import { useEffect, useId, useRef, useState } from 'react';
import { Film, LoaderCircle, Play, RotateCcw, X } from 'lucide-react';
import { mediaUrl } from '../data/content';
import { visuals } from '../data/visuals';
import { useReducedMotion } from 'motion/react';
import { ribbonBridge } from '../lib/ribbon/bridge';
import { PlayerControls } from './PlayerControls';
import type { Project } from '../types';

export default function VideoPlayer({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const figureRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reduced = useReducedMotion();
  const [opening, setOpening] = useState(true);
  const [closing, setClosing] = useState(false);
  const [flying, setFlying] = useState(false);
  const titleId = useId();
  const [loading, setLoading] = useState(!project.isPlaceholder);
  const [error, setError] = useState(false);
  const failedSources = useRef(new Set<string>());
  const poster = project.poster?.startsWith('/posters/') ? mediaUrl(project.poster) : (project.poster || visuals.hero);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const video = videoRef.current;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    dialog.showModal();
    if (video) void video.play().catch(() => {});
    let cancelled = false;
    const target = () => {
      const box = figureRef.current!.getBoundingClientRect();
      const ratio = project.width && project.height ? project.width / project.height : 16 / 9;
      const width = Math.min(box.width, box.height * ratio), height = width / ratio;
      return { left: box.left + (box.width - width) / 2, top: box.top + (box.height - height) / 2, width, height };
    };
    const bridge = ribbonBridge.current;
    const promise = !reduced && bridge && figureRef.current ? bridge.open(project.id, dialog, target, video) : Promise.resolve(false);
    setFlying(Boolean(bridge?.holding(project.id)));
    void promise.then(() => { if (!cancelled && !closingRef.current) setOpening(false); });
    return () => {
      cancelled = true;
      if (closeTimer.current) clearTimeout(closeTimer.current);
      if (ribbonBridge.current?.holding(project.id)) ribbonBridge.current.cancel();
      if (video) {
        video.pause();
        if (!video.isConnected) {
          video.querySelectorAll('source').forEach(source => source.removeAttribute('src'));
          video.removeAttribute('src');
          video.load();
        }
      }
      dialog.close();
      document.documentElement.style.overflow = previousOverflow;
      previousFocus?.focus({ preventScroll: true });
    };
  }, []);

  function requestClose() {
    if (closingRef.current) return;
    closingRef.current = true;
    if (dialogRef.current) dialogRef.current.dataset.playbackClosing = 'true';
    videoRef.current?.pause();
    const close = () => {
      setClosing(true);
      const bridge = ribbonBridge.current;
      const native = !reduced && bridge?.holding(project.id);
      dialogRef.current?.style.setProperty('--close-duration', native ? '660ms' : reduced ? '0ms' : '340ms');
      if (native) void bridge!.close(project.id).then(onClose);
      else if (reduced) onClose();
      else closeTimer.current = setTimeout(onClose, 340);
    };
    if (document.fullscreenElement === dialogRef.current) void document.exitFullscreen().catch(() => {}).then(close);
    else close();
  }

  function retry() {
    failedSources.current.clear();
    setError(false);
    setLoading(true);
    videoRef.current?.load();
    void videoRef.current?.play().catch(() => {});
  }

  function sourceFailed(src: string) {
    failedSources.current.add(src);
    if (failedSources.current.size === project.sources.length) {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={'video-dialog' + (flying ? ' has-ribbon-flight' : '') + (closing ? ' is-closing' : '')}
      aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); requestClose(); }}
      onClick={event => { if (event.target === event.currentTarget) requestClose(); }}
    >
      <div className="player-shell" data-opening={opening} data-lenis-prevent>
        <div className="player-header">
          <div>
            <h2 id={titleId}>{project.title}</h2>
            <p>{project.isPlaceholder ? 'Layout preview' : project.category}{project.year ? ' / ' + project.year : ''}</p>
          </div>
          <button className="player-close" onClick={requestClose} autoFocus aria-label="Close video player">
            <span className="player-close-halo" aria-hidden="true" />
            <span className="player-close-orbit" aria-hidden="true" />
            <X size={22} strokeWidth={1.2} aria-hidden="true" />
          </button>
        </div>
        {project.isPlaceholder ? (
          <div className="player-empty" ref={figureRef}>
            <Film size={40} strokeWidth={1.1} aria-hidden="true" />
            <h3>Original footage coming soon.</h3>
            <p>{project.categoryId === 'showreel' ? 'The dedicated showreel will appear here.' : 'This project will be available soon.'}</p>
            <button className="button button-outline" onClick={requestClose}>Back to the portfolio</button>
          </div>
        ) : (
          <>
            <div className="player-video-wrap" ref={figureRef}>
              <video ref={videoRef} className="player-video" autoPlay muted playsInline preload="metadata" poster={poster}
                aria-label={project.title} tabIndex={-1}
                onClick={event => {
                  const video = event.currentTarget, box = video.getBoundingClientRect();
                  const ratio = video.videoWidth && video.videoHeight ? video.videoWidth / video.videoHeight : 16 / 9;
                  const width = Math.min(box.width, box.height * ratio), height = width / ratio;
                  if (event.clientX < box.left + (box.width - width) / 2 || event.clientX > box.right - (box.width - width) / 2
                    || event.clientY < box.top + (box.height - height) / 2 || event.clientY > box.bottom - (box.height - height) / 2) { requestClose(); return; }
                  if (video.paused || video.ended) { if (video.ended) video.currentTime = 0; void video.play().catch(() => {}); }
                  else video.pause();
                }}
                onCanPlay={() => setLoading(false)} onPlaying={() => setLoading(false)}
                onWaiting={() => setLoading(true)} onPause={() => setLoading(false)}
                onError={event => {
                  if (event.target === event.currentTarget) {
                    setError(true);
                    setLoading(false);
                  }
                }}>
                {project.sources.map(source => (
                  <source key={source.src} src={mediaUrl(source.src)} type={source.type}
                    onError={() => sourceFailed(source.src)} />
                ))}
                Your browser does not support this video.
              </video>
              <button className="player-center-play" onClick={() => void videoRef.current?.play().catch(() => {})} aria-label="Resume video" tabIndex={-1}>
                <Play size={30} fill="currentColor" strokeWidth={0} aria-hidden="true" />
              </button>
              <div className="playback-status" role="status">
                {loading && !error && <><LoaderCircle className="loading-spinner" size={18} aria-hidden="true" /><span className="sr-only">Loading video</span></>}
              </div>
              {error && (
                <div className="player-error" role="alert">
                  <h3>The video could not be played.</h3>
                  <p>Please try again, or use a browser that supports MP4 and WebM.</p>
                  <button className="button button-outline" onClick={retry}>
                    <RotateCcw size={16} strokeWidth={1.5} aria-hidden="true" /> Try again
                  </button>
                </div>
              )}
            </div>
            <PlayerControls videoRef={videoRef} dialogRef={dialogRef} disabled={error} />
          </>
        )}
        {!project.isPlaceholder && project.description && <p className="player-description">{project.description}</p>}
      </div>
    </dialog>
  );
}
