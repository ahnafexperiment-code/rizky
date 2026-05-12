import { useReveal } from '../hooks/index.js';

// ── Explore Section ───────────────────────────────────
export default function Explore() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section id="explore" className="explore-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">Explore</div>
          <h2 className="section-title">Masuk ke <span className="gradient-text">Dunia Lain</span></h2>
          <p className="section-desc">Telusuri tiga titik utama kawasan Singhasari dalam satu alur kunjungan digital.</p>
        </div>
      </div>
    </section>
  );
}
