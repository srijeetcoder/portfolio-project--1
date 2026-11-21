'use client';

import { useEffect, useRef, useState } from 'react';
import { Maximize, Minimize, Pause, Play, Volume2, VolumeX } from 'lucide-react';
import type { RefObject } from 'react';

const clock = (time: number) => {
  const seconds = Math.max(0, Math.floor(Number.isFinite(time) ? time : 0));
  return Math.floor(seconds / 60) + ':' + String(seconds % 60).padStart(2, '0');
};
const bound = (value: number, duration: number) => Math.max(0, Math.min(duration, value));

export function PlayerControls({ videoRef, dialogRef, disabled }: {
  videoRef: RefObject<HTMLVideoElement | null>; dialogRef: RefObject<HTMLDialogElement | null>; disabled: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const [duration, setDuration] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [canFullscreen, setCanFullscreen] = useState(false);
  const controls = useRef<HTMLDivElement>(null), seek = useRef<HTMLInputElement>(null), current = useRef<HTMLSpanElement>(null);
  const volume = useRef<HTMLInputElement>(null);
  const dragging = useRef(false), resume = useRef(false);
  const update = useRef<() => void>(() => {});
  const reveal = useRef<() => void>(() => {});

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused || video.ended) { if (video.ended) video.currentTime = 0; void video.play().catch(() => {}); }
    else video.pause();
    reveal.current();
  };
  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    video.muted = !video.muted;
    if (!video.muted && video.volume === 0) video.volume = .75;
    reveal.current();
  };
  const toggleFullscreen = async () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await dialog.requestFullscreen();
    } catch { /* The viewport theater remains available if fullscreen is declined. */ }
    reveal.current();
  };
  const seekTo = (time: number) => {
    const video = videoRef.current;
    if (!video || !Number.isFinite(video.duration)) return;
    video.currentTime = bound(time, video.duration); update.current(); reveal.current();
  };

  useEffect(() => {
    const video = videoRef.current, dialog = dialogRef.current, bar = controls.current;
    if (!video || !dialog || !bar) return;
    let alive = true, idle: ReturnType<typeof setTimeout> | null = null, frame: number | null = null;
    let lastClock = '';
    const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
    const show = () => {
      bar.dataset.visible = 'true';
      if (idle) clearTimeout(idle);
      if (finePointer.matches && !video.paused && !dragging.current) {
        idle = setTimeout(() => {
          if (!bar.contains(document.activeElement) && !video.paused && !dragging.current) bar.dataset.visible = 'false';
        }, 2600);
      }
    };
    reveal.current = show;
    const tick = () => {
      const total = Number.isFinite(video.duration) ? video.duration : 0;
      const time = video.currentTime || 0;
      bar.style.setProperty('--playback-progress', String(total ? time / total : 0));
      if (seek.current && !dragging.current) seek.current.value = String(time);
      const label = clock(time);
      if (label !== lastClock) {
        lastClock = label;
        if (current.current) current.current.textContent = label;
        seek.current?.setAttribute('aria-valuetext', `${label} of ${clock(total)}`);
      }
    };
    update.current = tick;
    const cancelFrame = () => {
      if (frame !== null && video.cancelVideoFrameCallback) video.cancelVideoFrameCallback(frame);
      frame = null;
    };
    const nextFrame = () => {
      tick();
      if (alive && !video.paused && !document.hidden && video.requestVideoFrameCallback) frame = video.requestVideoFrameCallback(nextFrame);
      else frame = null;
    };
    const status = () => {
      setPlaying(!video.paused && !video.ended);
      dialog.dataset.paused = String(video.paused || video.ended);
      cancelFrame();
      if (!video.paused && video.requestVideoFrameCallback && !document.hidden) frame = video.requestVideoFrameCallback(nextFrame);
      tick(); show();
    };
    const metadata = () => {
      setDuration(Number.isFinite(video.duration) ? video.duration : 0); tick();
    };
    const sound = () => {
      setMuted(video.muted || video.volume === 0);
      if (volume.current) volume.current.value = String(video.muted ? 0 : video.volume);
    };
    const screen = () => setFullscreen(document.fullscreenElement === dialog);
    const release = () => {
      if (!dragging.current) return;
      dragging.current = false; delete dialog.dataset.scrubbing;
      if (resume.current && alive && dialog.open && dialog.dataset.playbackClosing !== 'true') void video.play().catch(() => {});
      resume.current = false; tick(); show();
    };
    const keyboard = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (event.defaultPrevented || event.ctrlKey || event.metaKey || event.altKey || target?.closest('input, textarea, select, [contenteditable="true"]')) return;
      const key = event.key.toLowerCase();
      if (key === 'k' || (key === ' ' && !target?.closest('button, a'))) { event.preventDefault(); togglePlay(); }
      else if (key === 'm') { event.preventDefault(); toggleMute(); }
      else if (key === 'f' && document.fullscreenEnabled) { event.preventDefault(); void toggleFullscreen(); }
      else if (key === 'arrowleft' || key === 'arrowright') { event.preventDefault(); seekTo(video.currentTime + (key === 'arrowleft' ? -5 : 5)); }
    };
    const visibility = () => { cancelFrame(); if (!document.hidden) status(); };
    setCanFullscreen(Boolean(document.fullscreenEnabled && dialog.requestFullscreen));
    metadata(); sound(); status(); screen();
    video.addEventListener('loadedmetadata', metadata); video.addEventListener('durationchange', metadata);
    video.addEventListener('play', status); video.addEventListener('pause', status); video.addEventListener('ended', status);
    video.addEventListener('timeupdate', tick); video.addEventListener('seeking', tick); video.addEventListener('volumechange', sound);
    dialog.addEventListener('pointermove', show); dialog.addEventListener('pointerdown', show); dialog.addEventListener('focusin', show);
    dialog.addEventListener('keydown', keyboard); document.addEventListener('fullscreenchange', screen);
    document.addEventListener('pointerup', release); document.addEventListener('pointercancel', release);
    document.addEventListener('visibilitychange', visibility); finePointer.addEventListener('change', show);
    return () => {
      alive = false; if (idle) clearTimeout(idle); cancelFrame(); update.current = () => {}; reveal.current = () => {};
      video.removeEventListener('loadedmetadata', metadata); video.removeEventListener('durationchange', metadata);
      video.removeEventListener('play', status); video.removeEventListener('pause', status); video.removeEventListener('ended', status);
      video.removeEventListener('timeupdate', tick); video.removeEventListener('seeking', tick); video.removeEventListener('volumechange', sound);
      dialog.removeEventListener('pointermove', show); dialog.removeEventListener('pointerdown', show); dialog.removeEventListener('focusin', show);
      dialog.removeEventListener('keydown', keyboard); document.removeEventListener('fullscreenchange', screen);
      document.removeEventListener('pointerup', release); document.removeEventListener('pointercancel', release);
      document.removeEventListener('visibilitychange', visibility); finePointer.removeEventListener('change', show);
    };
  }, [videoRef, dialogRef]);

  return (
    <div className="player-controls" ref={controls} data-visible="true" role="group" aria-label="Video playback controls" data-lenis-prevent>
      <div className="player-seek">
        <span className="player-seek-track" aria-hidden="true"><span className="player-seek-fill" /></span>
        <input ref={seek} type="range" min={0} max={duration || 1} step={.1} defaultValue={0} disabled={disabled || duration === 0}
          aria-label="Seek video" onInput={event => seekTo(event.currentTarget.valueAsNumber)}
          onPointerDown={() => {
            if (!videoRef.current) return;
            dragging.current = true; resume.current = !videoRef.current.paused; videoRef.current.pause();
            if (dialogRef.current) dialogRef.current.dataset.scrubbing = 'true';
          }}
          onKeyDown={event => {
            if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
              event.preventDefault(); seekTo((videoRef.current?.currentTime || 0) + (event.key === 'ArrowLeft' ? -1 : 1) * (event.shiftKey ? 1 : 5));
            }
          }} />
      </div>
      <div className="player-control-row">
        <button className="player-control-button" onClick={togglePlay} disabled={disabled} aria-label={playing ? 'Pause video' : 'Play video'}>
          {playing ? <Pause size={20} fill="currentColor" strokeWidth={0} /> : <Play size={20} fill="currentColor" strokeWidth={0} />}
        </button>
        <span className="player-time"><span ref={current}>0:00</span><span aria-hidden="true"> / </span><span>{clock(duration)}</span></span>
        <div className="player-sound">
          <button className="player-control-button" onClick={toggleMute} disabled={disabled} aria-label={muted ? 'Unmute video' : 'Mute video'}>
            {muted ? <VolumeX size={20} strokeWidth={1.4} /> : <Volume2 size={20} strokeWidth={1.4} />}
          </button>
          <input ref={volume} className="player-volume" type="range" min={0} max={1} step={.05} defaultValue={0} aria-label="Video volume" disabled={disabled}
            onInput={event => {
              if (!videoRef.current) return;
              videoRef.current.volume = event.currentTarget.valueAsNumber;
              videoRef.current.muted = event.currentTarget.valueAsNumber === 0;
              reveal.current();
            }} />
        </div>
        {canFullscreen && <button className="player-control-button player-fullscreen" onClick={() => void toggleFullscreen()} aria-label={fullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}>
          {fullscreen ? <Minimize size={19} strokeWidth={1.4} /> : <Maximize size={19} strokeWidth={1.4} />}
        </button>}
      </div>
    </div>
  );
}
