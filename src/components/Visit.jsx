import { useReveal } from '../hooks/index.js';

export default function Visit({ showToast }) {
  const [ref, visible] = useReveal(0.1);

  return (
    <section id="visit" className="visit-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">📍 Kunjungi Singosari</div>
          <h2 className="section-title">
            Rencanakan <span className="gradient-text">Kunjungan Budayamu</span>
          </h2>
          <p className="section-desc">Semua yang kamu butuhkan sebelum berangkat.</p>
        </div>

        <div className="visit-grid reveal-up revealed">
          {/* Ticket Card */}
          <div className="ticket-card">
            <h3>🎟️ Harga Tiket</h3>
            <div className="ticket-table">
              <div className="ticket-row header">
                <span>Kategori</span><span>Harga</span>
              </div>
              {[
                { cat: '🇮🇩 WNI Dewasa', price: 'Rp 50.000' },
                { cat: '👦 WNI Anak', price: 'Rp 25.000' },
                { cat: '🌏 WNA Dewasa', price: 'USD 25' },
                { cat: '👶 WNA Anak', price: 'USD 15' },
              ].map(r => (
                <div key={r.cat} className="ticket-row">
                  <span>{r.cat}</span><span className="price">{r.price}</span>
                </div>
              ))}
              <div className="ticket-row highlight">
                <span>⭐ Sunrise Package</span>
                <span className="price">Rp 450.000</span>
              </div>
            </div>
            <button
              className="btn btn-primary btn-full"
              id="visit-ticket-btn"
              onClick={() => showToast('🎟️ Pembelian tiket online segera tersedia!')}
            >
              Beli Tiket Online
            </button>
          </div>

          {/* Hours Card */}
          <div className="visit-info-card">
            <h3>🕐 Jam Kunjungan</h3>
            <div className="hours-list">
              <div className="hour-item">
                <span className="hour-day">Senin – Minggu</span>
                <span className="hour-time">06:00 – 17:00 WIB</span>
              </div>
              <div className="hour-item highlight">
                <span className="hour-day">⭐ Sunrise Tour</span>
                <span className="hour-time">04:30 – 06:30 WIB</span>
              </div>
            </div>
            <h4>🌟 Pro Tips Gen Z</h4>
            <ul className="tips-list">
              {[
                '📸 Spot terbaik foto: Teras ke-5, sisi timur',
                '🌅 Datang jam 4:30 untuk sunrise epic',
                '☀️ Bawa topi & sunscreen, sangat panas!',
                '👟 Pakai sepatu nyaman, bukan heels',
                '💧 Bawa air minum sendiri',
                '📴 Matikan flash — hargai reliefnya',
              ].map(tip => <li key={tip}>{tip}</li>)}
            </ul>
          </div>

          {/* Map Card */}
          <div className="map-card">
            <h3>🗺️ Lokasi & Rute</h3>
            <div className="google-map-wrapper" id="google-map-wrapper">
              <iframe
                src="https://www.google.com/maps/embed?pb=!4v1713360000000!6m8!1m7!1sCAoSLEFGMVFpcE9icHJYbG1PRm9YV0JzYjEwQzZ2SVA3S1FmN0VjYVM0a2owLVBB!2m2!1d-7.8925672!2d112.6645272!3f260!4f5!5f0.7820865974627469"
                width="100%"
                height="280"
                style={{ border: 0, borderRadius: '12px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Street View Candi Singosari"
              />
            </div>
            <div className="route-options">
              <a
                href="https://maps.google.com/?q=Candi+Singosari+Malang"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
                id="visit-gmaps-btn"
              >
                📍 Buka Google Maps
              </a>
              <a
                href="https://waze.com/ul?q=Candi+Singosari+Malang"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost btn-sm"
                id="visit-waze-btn"
              >
                🚗 Buka Waze
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
