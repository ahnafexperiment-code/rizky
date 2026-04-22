import { useState } from 'react';
import { useReveal, useTimelineProgress } from '../hooks/index.js';
import { storyChapters, infoCards, videoItems } from '../data/content.js';

// ── Story Chapter ──────────────────────────────────────
function Chapter({ chapter, index }) {
  const cls = chapter.dir === 'right' ? 'reveal-slide-right' : 'reveal-slide-left';
  const [ref, visible] = useReveal(0.2);

  return (
    <div
      className={`story-chapter ${cls}${visible ? ' revealed' : ''}`}
      data-year={chapter.year}
      ref={ref}
    >
      <div className={`chapter-year${chapter.year === 'Kini' ? ' gradient-text' : ''}`}>
        {chapter.year}
      </div>
      <div className="chapter-content">
        <div className="chapter-img-wrapper">
          <img src={chapter.img} alt={chapter.title} loading="lazy" />
        </div>
        <div className="chapter-text">
          <h3>{chapter.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: chapter.body }} />
          <div className="chapter-fact">{chapter.fact}</div>
        </div>
      </div>
    </div>
  );
}

// ── Info Card ──────────────────────────────────────────
function InfoCard({ card }) {
  return (
    <div className="info-card" id={card.id} tabIndex={0}>
      <div className="info-icon">{card.icon}</div>
      <div className="info-number">{card.number}</div>
      <div className="info-label">{card.label}</div>
      <div className="info-popup">
        <span dangerouslySetInnerHTML={{ __html: card.popup }} />
      </div>
    </div>
  );
}

// ── Video Card ─────────────────────────────────────────
function VideoCard({ item, onOpen }) {
  return (
    <div className="video-card" id={item.id} onClick={onOpen} role="button" tabIndex={0}>
      <div className="video-thumb">
        <img src={item.img} alt={item.title} loading="lazy" />
        <div className="video-play-btn">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
        <div className="video-duration">{item.dur}</div>
      </div>
      <div className="video-info">
        <div className="video-tag">{item.tag}</div>
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
      </div>
    </div>
  );
}

// ── Story Section ──────────────────────────────────────
export default function Story({ onVideoOpen }) {
  const progress = useTimelineProgress('story');
  const [headerRef, headerVisible] = useReveal(0.15);
  const [infoRef, infoVisible] = useReveal(0.15);
  const [videoRef, videoVisible] = useReveal(0.15);

  return (
    <section id="story" className="story-section">
      {/* Fixed timeline progress bar */}
      <div className="timeline-progress-bar" id="timeline-progress" style={{ width: `${progress}%` }} />

      <div className="container">
        <div
          className={`section-header reveal-up${headerVisible ? ' revealed' : ''}`}
          ref={headerRef}
        >
          <div className="section-label">📖 The Story</div>
          <h2 className="section-title">
            1.200 Tahun dalam <span className="gradient-text">Satu Scroll</span>
          </h2>
          <p className="section-desc">Scroll ke bawah untuk menjelajahi perjalanan waktu.</p>
        </div>
      </div>

      {/* Scrollytelling chapters */}
      <div className="scrollytelling-wrapper">
        {storyChapters.map((ch, i) => (
          <Chapter key={ch.year} chapter={ch} index={i} />
        ))}
      </div>

      {/* Infographics */}
      <div className="container">
        <div className={`infographic-section reveal-up${infoVisible ? ' revealed' : ''}`} ref={infoRef}>
          <h3 className="subsection-title">📊 Fakta dalam Angka</h3>
          <div className="infographic-grid">
            {infoCards.map(card => <InfoCard key={card.id} card={card} />)}
          </div>
        </div>

        {/* Short-form Videos */}
        <div className={`videos-section reveal-up${videoVisible ? ' revealed' : ''}`} ref={videoRef}>
          <h3 className="subsection-title">🎬 Hidden Gems — Sisi yang Jarang Dilihat</h3>
          <div className="video-grid">
            {videoItems.map(item => (
              <VideoCard key={item.id} item={item} onOpen={onVideoOpen} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
