import { useState } from 'react';
import { useReveal } from '../hooks/index.js';
import { ugcPhotos } from '../data/content.js';
import { testimonials } from '../data/content.js';

// ── Testimonials ──────────────────────────────────────
export function Testimonials() {
  // Duplicate for infinite scroll
  const all = [...testimonials, ...testimonials];
  return (
    <section className="testimonials-section">
      <div className="container">
        <div className="section-label">💬 Kata Mereka</div>
      </div>
      <div className="testimonials-track" id="testimonials-track">
        {all.map((t, i) => (
          <div key={i} className="testimonial-card">
            <div className="test-avatar">{t.avatar}</div>
            <p>{t.text}</p>
            <span>{t.author}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ── UGC Lightbox ──────────────────────────────────────
function Lightbox({ photo, onClose }) {
  if (!photo) return null;
  return (
    <div
      className="ugc-lightbox-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
      <img src={photo.img} alt={photo.user} onClick={e => e.stopPropagation()} />
      <p className="ugc-lb-user">{photo.user}</p>
      <p className="ugc-lb-tag">#SingosariHeritage</p>
    </div>
  );
}

// ── UGC Gallery ───────────────────────────────────────
export function UGCGallery() {
  const [selected, setSelected] = useState(null);
  const [ref, visible] = useReveal(0.1);

  return (
    <section className="ugc-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">UGC Gallery</div>
          <h2 className="section-title">Foto <span className="gradient-text">Dari Kamu</span></h2>
          <p className="section-desc">
            Tag <strong>#SingosariHeritage</strong> di Instagram atau TikTok, lalu tampilkan sudut favoritmu dari Singosari, Sumberawan, atau museum.
          </p>
        </div>

        <div className="ugc-masonry reveal-up revealed" id="ugc-gallery">
          {ugcPhotos.map((p, i) => (
            <div
              key={i}
              className={`ugc-item${p.cls ? ' ' + p.cls : ''}`}
              style={{ '--delay': `${i * 0.1}s` }}
              onClick={() => setSelected(p)}
              role="button"
              tabIndex={0}
              aria-label={`Photo by ${p.user}`}
            >
              <img src={p.img} alt={`Photo by ${p.user}`} loading="lazy" />
              <div className="ugc-overlay">
                <span className="ugc-user">{p.user}</span>
                <span className="ugc-tag">#SingosariHeritage</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Lightbox photo={selected} onClose={() => setSelected(null)} />
    </section>
  );
}
