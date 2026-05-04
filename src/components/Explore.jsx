import { useEffect, useRef, useState } from 'react';
import { useReveal } from '../hooks/index.js';
import { panoSpots, mapZones } from '../data/content.js';

// ── 360 Virtual Tour ──────────────────────────────────
function VirtualTour() {
  const viewerRef = useRef(null);
  const pannellumRef = useRef(null);
  const [activeSpot, setActiveSpot] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible || loaded) return;
    setLoaded(true);
  }, [visible, loaded]);

  useEffect(() => {
    if (!loaded || !viewerRef.current || typeof window.pannellum === 'undefined') return;

    const spot = panoSpots.find(s => s.id === activeSpot);
    if (!spot) return;

    if (pannellumRef.current) {
      try { pannellumRef.current.destroy(); } catch (_) {}
    }

    try {
      pannellumRef.current = window.pannellum.viewer(viewerRef.current, {
        type: 'equirectangular',
        panorama: spot.imageUrl,
        title: spot.label,
        autoLoad: true,
        autoRotate: -1.5,
        compass: false,
        showZoomCtrl: false,
        showFullscreenCtrl: true,
        hfov: 100,
        pitch: spot.pitch,
        yaw: spot.yaw,
        mouseZoom: false,
      });
    } catch (_) {
      // pannellum not ready yet — retry after delay
      setTimeout(() => setLoaded(l => !l || l), 500);
    }

    return () => {
      try { pannellumRef.current?.destroy(); } catch (_) {}
    };
  }, [loaded, activeSpot]);

  return (
    <div className="virtual-tour-wrapper reveal-up revealed" ref={ref}>
      <div className="tour-header">
        <h3>🔭 Virtual Tour 360°</h3>
        <p>Gunakan mouse atau jari untuk menjelajahi</p>
      </div>

      <div className="panorama-viewer" ref={viewerRef}>
        {!loaded && (
          <div className="panorama-placeholder">
            <div className="pano-icon">🔭</div>
            <p>Memuat panorama 360°…</p>
          </div>
        )}
      </div>

      <div className="tour-controls">
        {panoSpots.map(spot => (
          <button
            key={spot.id}
            className={`tour-spot-btn${activeSpot === spot.id ? ' active' : ''}`}
            id={`spot-btn-${spot.id}`}
            onClick={() => setActiveSpot(spot.id)}
          >
            {spot.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Interactive Map ───────────────────────────────────
function InteractiveMap() {
  const [selected, setSelected] = useState(null);
  const zone = mapZones.find(z => z.id === selected);

  return (
    <div className="map-section">
      <h3 className="subsection-title">🗺️ Peta Interaktif Kompleks</h3>
      <div className="interactive-map" id="interactive-map">
        <div className="map-canvas">
          {mapZones.map(z => (
            <div
              key={z.id}
              className="map-zone"
              id={z.id}
              style={{ top: z.top, left: z.left }}
              onClick={() => setSelected(z.id)}
              role="button"
              tabIndex={0}
              aria-label={z.name}
              onKeyDown={e => e.key === 'Enter' && setSelected(z.id)}
            >
              <div className={`zone-dot pulse${selected === z.id ? ' active-zone' : ''}`} />
              <div className="zone-tooltip">
                {z.name}<br /><small>{z.emoji}</small>
              </div>
            </div>
          ))}
          <svg className="map-svg" viewBox="0 0 300 400">
            <polygon
              points="150,20 250,120 230,130 240,200 220,210 230,280 210,290 220,360 80,360 90,290 70,280 80,210 60,200 70,130 50,120"
              fill="none" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5"
            />
            <line x1="80" y1="360" x2="220" y2="360" stroke="rgba(212,175,55,0.6)" strokeWidth="2" />
            <line x1="70" y1="280" x2="230" y2="280" stroke="rgba(212,175,55,0.5)" strokeWidth="1.5" />
            <line x1="60" y1="200" x2="240" y2="200" stroke="rgba(212,175,55,0.4)" strokeWidth="1.5" />
            <line x1="70" y1="130" x2="230" y2="130" stroke="rgba(212,175,55,0.3)" strokeWidth="1.5" />
            <circle cx="150" cy="35" r="15" fill="none" stroke="rgba(212,175,55,0.7)" strokeWidth="2" />
          </svg>
        </div>

        <div className="map-info-panel" id="map-info-panel">
          {zone ? (
            <div className="map-zone-info">
              <div style={{ fontSize: '3rem', marginBottom: '.75rem' }}>{zone.emoji}</div>
              <h4>{zone.name}</h4>
              <p>{zone.desc}</p>
            </div>
          ) : (
            <div className="map-info-default">
              <span>👆 Klik titik di peta untuk info detail</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

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

        <VirtualTour />
        <InteractiveMap />
      </div>
    </section>
  );
}
