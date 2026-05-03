export default function Footer() {
  const smoothScroll = (id) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">⛩ SINGOSARI</div>
            <p>Ruang budaya untuk mengenal jejak Singhasari, merawat cagar budaya, dan berbagi cerita lokal.</p>
            <div className="footer-social">
              <a href="#" className="social-btn" id="footer-ig" aria-label="Instagram">📸</a>
              <a href="#" className="social-btn" id="footer-tiktok" aria-label="TikTok">🎵</a>
              <a href="#" className="social-btn" id="footer-yt" aria-label="YouTube">▶️</a>
              <a href="#" className="social-btn" id="footer-tw" aria-label="Twitter/X">🐦</a>
            </div>
          </div>

          <div className="footer-links-col">
            <h4>Jelajahi</h4>
            <ul>
              <li><button onClick={() => smoothScroll('home')}>Home</button></li>
              <li><button onClick={() => smoothScroll('explore')}>Virtual Tour</button></li>
              <li><button onClick={() => smoothScroll('story')}>Sejarah</button></li>
              <li><button onClick={() => smoothScroll('quiz-section')}>Kuis</button></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Komunitas</h4>
            <ul>
              <li><button onClick={() => smoothScroll('tribe')}>Join The Tribe</button></li>
              <li><button onClick={() => smoothScroll('tribe')}>Volunteer</button></li>
              <li><button onClick={() => smoothScroll('tribe')}>Merchandise</button></li>
              <li><a href="#">Discord</a></li>
            </ul>
          </div>

          <div className="footer-links-col">
            <h4>Kunjungan</h4>
            <ul>
              <li><button onClick={() => smoothScroll('visit')}>Info Tiket</button></li>
              <li><button onClick={() => smoothScroll('visit')}>Jam Kunjungan</button></li>
              <li><button onClick={() => smoothScroll('visit')}>Peta & Rute</button></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2026 Singosari Cultural Site. Made for pegiat budaya Indonesia.</p>
          <p className="footer-hashtag">#SingosariHeritage</p>
        </div>
      </div>
    </footer>
  );
}
