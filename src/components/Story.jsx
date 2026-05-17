import { useReveal, useTimelineProgress } from '../hooks/index.js';
import { storyChapters, infoCards, artifactItems } from '../data/content.js';

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

function ArtifactCard({ item }) {
  return (
    <article className="artifact-card" id={item.id}>
      <img src={item.img} alt={item.title} loading="lazy" />
      <div className="artifact-body">
        <h4>{item.title}</h4>
        <p>{item.desc}</p>
      </div>
    </article>
  );
}

// ── Story Section ──────────────────────────────────────
export default function Story() {
  const progress = useTimelineProgress('story');
  const [headerRef, headerVisible] = useReveal(0.15);
  const [infoRef, infoVisible] = useReveal(0.15);
  const [artifactRef, artifactVisible] = useReveal(0.15);

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

        <div className={`artifacts-section reveal-up${artifactVisible ? ' revealed' : ''}`} ref={artifactRef}>
          <h3 className="subsection-title">🏺 Artefak Utama</h3>
          <p className="section-desc">Koleksi artefak memperjelas detail sejarah yang tidak selalu terlihat langsung di situs.</p>
          <div className="artifacts-grid">
            {artifactItems.map((item) => (
              <ArtifactCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
