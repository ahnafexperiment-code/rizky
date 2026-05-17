import { useReveal } from '../hooks/index.js';
import { sitePages } from '../data/content.js';

export default function Places() {
  const [ref, visible] = useReveal(0.1);

  return (
    <section id="places" className="places-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">Tiga Titik Utama</div>
          <h2 className="section-title">
            Rute <span className="gradient-text">Singosari</span>
          </h2>
          <p className="section-desc">
            Setiap lokasi punya karakter berbeda. Berikut penjelasan singkat untuk Candi Singosari, Candi Sumberawan, dan Museum Singhasari.
          </p>
        </div>

        <div className="places-stack">
          {sitePages.map((place) => (
            <section key={place.slug} id={`place-${place.slug}`} className="place-card">
              <img src={place.image} alt={place.name} className="place-image" loading="lazy" />
              <div className="place-content">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <div className="place-meta">
                  <span><strong>Tiket:</strong> {place.ticket}</span>
                  <span><strong>Jam:</strong> {place.hours}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a href={`#/site/${place.slug}`} className="btn btn-primary btn-sm">
                    Buka Halaman
                  </a>
                  <a
                    href={place.mapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-ghost btn-sm"
                  >
                    Buka Lokasi
                  </a>
                </div>
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
