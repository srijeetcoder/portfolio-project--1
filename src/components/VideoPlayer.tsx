import { useEffect, useId, useRef, useState } from 'react';
import { Film, LoaderCircle, RotateCcw, X } from 'lucide-react';
import { mediaUrl } from '../data/content';
import { visuals } from '../data/visuals';
import type { Project } from '../types';

export default function VideoPlayer({ project, onClose }: { project: Project; onClose: () => void }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
    return () => {
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

  function retry() {
    failedSources.current.clear();
    setError(false);
    setLoading(true);
    videoRef.current?.load();
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
      className="video-dialog"
      aria-labelledby={titleId}
      onCancel={event => { event.preventDefault(); onClose(); }}
      onClick={event => { if (event.target === event.currentTarget) onClose(); }}
    >
      <div className="player-shell">
        <div className="player-header">
          <div>
            <h2 id={titleId}>{project.title}</h2>
            <p>{project.isPlaceholder ? 'Layout preview' : project.category}{project.year ? ' / ' + project.year : ''}</p>
          </div>
          <button className="icon-button" onClick={onClose} autoFocus aria-label="Close video player">
            <X size={24} strokeWidth={1.5} aria-hidden="true" />
          </button>
        </div>
        {project.isPlaceholder ? (
          <div className="player-empty">
            <Film size={40} strokeWidth={1.1} aria-hidden="true" />
            <h3>Original footage coming soon.</h3>
            <p>{project.categoryId === 'showreel' ? 'The dedicated showreel will appear here.' : 'This project will be available soon.'}</p>
            <button className="button button-outline" onClick={onClose}>Back to the portfolio</button>
          </div>
        ) : (
          <>
            <div className="player-video-wrap">
              <video ref={videoRef} className="player-video" controls autoPlay muted playsInline preload="metadata" poster={poster}
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
            <div className="playback-status" role="status">
              {loading && <><LoaderCircle className="loading-spinner" size={15} aria-hidden="true" /> Loading video...</>}
            </div>
          </>
        )}
        {!project.isPlaceholder && project.description && <p className="player-description">{project.description}</p>}
      </div>
    </dialog>
  );
}
