'use client';

import { useEffect, useState } from 'react';

/** Visually hidden until keyboard focus; always available to assistive technology. */
export default function VideoMotionControl() {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncPreference = () => setPaused(preference.matches);
    syncPreference();
    preference.addEventListener('change', syncPreference);
    return () => preference.removeEventListener('change', syncPreference);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.videosPaused = String(paused);
    const stopPlayback = (event: Event) => {
      if (event.target instanceof HTMLVideoElement) event.target.pause();
    };
    if (paused) {
      document.querySelectorAll('video').forEach((video) => video.pause());
      document.addEventListener('play', stopPlayback, true);
    } else {
      document.dispatchEvent(new Event('portfolio-video-resume'));
    }
    return () => document.removeEventListener('play', stopPlayback, true);
  }, [paused]);

  return (
    <button
      type="button"
      className="video-motion-control"
      aria-pressed={paused}
      onClick={() => setPaused((current) => !current)}
    >
      Pausar vídeos
    </button>
  );
}
