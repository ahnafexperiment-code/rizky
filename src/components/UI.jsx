// ── Audio Player Widget ─────────────────────────────
import { useState, useRef, useEffect } from 'react';

export function AudioWidget({ showToast }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      showToast('🔇 Musik dimatikan');
    } else {
      audioRef.current.play().catch(() => {});
      showToast('🎵 Musik ambient menyala');
    }
    setPlaying(p => !p);
  };

  return (
    <div className="audio-widget" id="audio-widget" aria-label="Ambient music control">
      <audio ref={audioRef} loop>
        <source src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3" type="audio/mpeg" />
      </audio>
      <button className="audio-btn" id="audio-toggle" onClick={toggle} aria-pressed={playing} title="Toggle ambient music">
        {playing ? (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
            <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
          </svg>
        )}
      </button>
      <div className="audio-label">Ambient</div>
    </div>
  );
}

// ── Theme Toggle ────────────────────────────────────
export function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      className="theme-toggle"
      id="theme-toggle"
      onClick={onToggle}
      title="Toggle dark/light mode"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="theme-icon">{theme === 'dark' ? '🌙' : '☀️'}</span>
    </button>
  );
}

// ── Toast ───────────────────────────────────────────
export function Toast({ toast }) {
  return (
    <div className={`toast${toast.show ? ' show' : ''}`} id="toast" aria-live="polite">
      {toast.msg}
    </div>
  );
}

// ── Video Modal ─────────────────────────────────────
export function VideoModal({ open, onClose }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="modal-overlay open"
      id="video-modal"
      role="dialog"
      aria-modal="true"
      aria-label="Video player"
      onClick={onClose}
    >
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" id="modal-close-btn" onClick={onClose} aria-label="Close video">✕</button>
        <div className="modal-video-placeholder">
          <div className="modal-icon">▶️</div>
          <p>Video akan tersedia segera.<br />Ikuti kami di TikTok & YouTube!</p>
          <div className="modal-socials">
            <a href="#" className="btn btn-primary btn-sm">🎵 TikTok</a>
            <a href="#" className="btn btn-ghost btn-sm">▶️ YouTube</a>
          </div>
        </div>
      </div>
    </div>
  );
}
