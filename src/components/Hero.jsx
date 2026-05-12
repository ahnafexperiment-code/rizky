import { useEffect, useRef } from 'react';
import { useReveal, useCounter } from '../hooks/index.js';

function Particle({ style }) {
  return <div className="particle" style={style} />;
}

function StatItem({ target, unit, label, active }) {
  const value = useCounter(target, active);
  return (
    <div className="stat-item">
      <span className="stat-num">{value.toLocaleString('id-ID')}</span>
      {unit && <span className="stat-unit">{unit}</span>}
      <span className="stat-label">{label}</span>
    </div>
  );
}

// Generate particles once
const PARTICLES = Array.from({ length: 25 }, (_, i) => ({
  key: i,
  style: {
    width: `${Math.random() * 4 + 1}px`,
    height: `${Math.random() * 4 + 1}px`,
    left: `${Math.random() * 100}%`,
    '--dur': `${Math.random() * 8 + 5}s`,
    '--delay': `${Math.random() * 8}s`,
    '--drift': `${(Math.random() - 0.5) * 200}px`,
  },
}));

export default function Hero() {
  const [statsRef, statsVisible] = useReveal(0.2);

  return (
    <section id="home" className="hero-section">
      {/* Background */}
      <div className="hero-bg-container">
        <img
          src="assets/img/singosari/singosari-1.jpeg"
          alt="Candi Singosari at golden hour"
          className="hero-bg-img"
        />
        <div className="hero-particles">
          {PARTICLES.map(p => <Particle key={p.key} style={p.style} />)}
        </div>
        <div className="hero-overlay" />
      </div>

      {/* Content */}
      <div className="hero-content">
        <div className="hero-badge reveal-up revealed">Warisan Budaya Singhasari</div>

        <h1 className="hero-headline reveal-up revealed">
          Jelajahi Masa Lalu,<br />
          <span className="gradient-text">Temukan Inspirasi</span><br />
          Masa Depan.
        </h1>

        <p className="hero-sub reveal-up revealed">
          Jelajahi tiga titik budaya: Candi Singosari, Candi Sumberawan, dan Museum Singhasari.
        </p>

        <div className="hero-cta reveal-up revealed">
          <button
            className="btn btn-primary"
            id="hero-explore-btn"
            onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <span>Mulai Jelajah</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
              <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z" />
            </svg>
          </button>
          <button
            className="btn btn-ghost"
            id="hero-story-btn"
            onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
          >
            <span>Lihat Kisahnya</span>
          </button>
        </div>

        {/* Stats */}
        <div
          className={`hero-stats reveal-up${statsVisible ? ' revealed' : ''}`}
          ref={statsRef}
        >
          <StatItem target={13} unit="th" label="Jejak Sejarah" active={statsVisible} />
          <div className="stat-divider" />
          <StatItem target={3} label="Titik Utama" active={statsVisible} />
          <div className="stat-divider" />
          <StatItem target={1} label="Rute Budaya" active={statsVisible} />
        </div>
      </div>

      <div className="scroll-indicator" id="scroll-indicator">
        <span>Scroll</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  );
}
