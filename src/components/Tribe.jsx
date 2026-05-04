import { useState } from 'react';
import { useReveal } from '../hooks/index.js';

export default function Tribe({ showToast }) {
  const [ref, visible] = useReveal(0.1);
  const [email, setEmail] = useState('');
  const [subDone, setSubDone] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubDone(true);
    showToast(`✅ ${email} berhasil didaftarkan!`);
    setTimeout(() => { setSubDone(false); setEmail(''); }, 3000);
  };

  return (
    <section id="tribe" className="tribe-section">
      <div className="container">
        <div className={`section-header reveal-up${visible ? ' revealed' : ''}`} ref={ref}>
          <div className="section-label">🤝 Join The Tribe</div>
          <h2 className="section-title">
            Jadilah <span className="gradient-text">Penjaga Budaya</span> Generasi Baru
          </h2>
          <p className="section-desc">
            Bergabung dengan komunitas anak muda yang peduli warisan nusantara.
          </p>
        </div>

        <div className="tribe-grid reveal-up revealed">
          {/* Volunteer */}
          <div className="tribe-card" id="tribe-volunteer">
            <div className="tribe-icon">🌱</div>
            <h3>Volunteer Program</h3>
            <p>Jadi relawan pemandu, fotografer komunitas, atau kreator konten untuk kawasan Singhasari dan museum.</p>
            <div className="tribe-badge-preview">Badge: 🥉 Penjaga Muda</div>
            <button
              className="btn btn-outline"
              id="btn-volunteer"
              onClick={() => showToast('🌱 Formulir relawan akan segera tersedia!')}
            >
              Daftar Sekarang
            </button>
          </div>

          {/* Merch (Featured) */}
          <div className="tribe-card featured" id="tribe-merch">
            <div className="tribe-new-tag">🔥 Terbaru</div>
            <div className="tribe-icon">👕</div>
            <h3>Merch Eksklusif</h3>
            <p>Koleksi terbatas berupa kaos, tote bag, dan aksesoris dengan visual Singhasari, Sumberawan, dan Museum Singhasari.</p>
            <div className="tribe-badge-preview">Badge: 🥈 Duta Budaya</div>
            <button
              className="btn btn-primary"
              id="btn-merch"
              onClick={() => showToast('👕 Koleksi merch segera launch!')}
            >
              Lihat Koleksi
            </button>
          </div>

          {/* Community */}
          <div className="tribe-card" id="tribe-community">
            <div className="tribe-icon">💬</div>
            <h3>Komunitas Digital</h3>
            <p>Discord server aktif dengan 5.000+ anggota, event virtual, dan challenge foto mingguan.</p>
            <div className="tribe-badge-preview">Badge: 🥇 Penjelajah Sejati</div>
            <button
              className="btn btn-outline"
              id="btn-community"
              onClick={() => showToast('💬 Link Discord akan segera aktif!')}
            >
              Gabung Discord
            </button>
          </div>
        </div>

        {/* Newsletter */}
        <div className="newsletter-box reveal-up revealed">
          <h3>📬 Stay in The Loop</h3>
          <p>Dapatkan update event, konten eksklusif, dan info tiket lebih awal.</p>
          <form className="newsletter-form" id="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              id="email-input"
              placeholder="email kamu@gmail.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="btn btn-primary"
              id="newsletter-submit-btn"
              disabled={subDone}
              style={subDone ? { opacity: 0.7 } : {}}
            >
              {subDone ? '✅ Subscribed!' : 'Subscribe'}
            </button>
          </form>
          <p className="newsletter-note">✅ No spam. Unsubscribe kapan aja.</p>
        </div>
      </div>
    </section>
  );
}
