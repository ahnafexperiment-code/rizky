import { useState, useEffect } from 'react';
import { useTheme, useToast } from './hooks/index.js';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import { Testimonials, UGCGallery } from './components/Gallery.jsx';
import Places from './components/Places.jsx';
import Story from './components/Story.jsx';
import Quiz from './components/Quiz.jsx';
import Visit from './components/Visit.jsx';
import Reviews from './components/Reviews.jsx';
import Footer from './components/Footer.jsx';
import SitePage from './components/SitePage.jsx';
import { sitePages } from './data/content.js';
import { ThemeToggle, Toast } from './components/UI.jsx';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { toast, showToast } = useToast();
  const [route, setRoute] = useState(() => window.location.hash || '#/');

  // Ripple effect on all .btn elements
  useEffect(() => {
    const handler = (e) => {
      const btn = e.target.closest('.btn');
      if (!btn) return;
      const ripple = document.createElement('span');
      const rect = btn.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.cssText = `
        position:absolute;
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size / 2}px;
        top:${e.clientY - rect.top - size / 2}px;
        background:rgba(255,255,255,0.25);
        border-radius:50%;
        transform:scale(0);
        animation:rippleEffect 0.5s ease-out forwards;
        pointer-events:none;
        z-index:0;
      `;
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  // Log branding
  useEffect(() => {
    console.log('%cSINGOSARI CULTURAL SITE', 'font-size:32px;font-weight:900;color:#d4af37;');
    console.log('%cSingosari, Sumberawan, dan Museum Singhasari', 'color:#a78bfa;font-size:14px');
  }, []);

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/');
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const siteMatch = route.match(/^#\/site\/([\w-]+)/);
  const activeSite = siteMatch ? sitePages.find((s) => s.slug === siteMatch[1]) : null;

  useEffect(() => {
    if (siteMatch) {
      document.title = activeSite
        ? `${activeSite.name} | Singosari Cultural Site`
        : 'Halaman Tidak Ditemukan | Singosari Cultural Site';
      return;
    }
    document.title = 'Singosari Cultural Site';
  }, [siteMatch, activeSite]);

  if (siteMatch) {
    return (
      <>
        <ThemeToggle theme={theme} onToggle={toggleTheme} />
        {activeSite ? (
          <SitePage site={activeSite} />
        ) : (
          <main className="site-page">
            <section className="site-page-hero">
              <div className="container">
                <a href="#/" className="btn btn-ghost btn-sm">Kembali ke Beranda</a>
                <div className="site-page-head">
                  <h1>Halaman tidak ditemukan</h1>
                  <p>Rute situs yang diminta tidak tersedia.</p>
                </div>
              </div>
            </section>
          </main>
        )}
        <Toast toast={toast} />
      </>
    );
  }

  return (
    <>
      {/* Floating Controls */}
      <ThemeToggle theme={theme} onToggle={toggleTheme} />

      {/* Navigation */}
      <Navbar theme={theme} onThemeToggle={toggleTheme} />

      {/* Main Content */}
      <main>
        <Hero />
        <Testimonials />
        <Places />
        <Story />
        <Quiz showToast={showToast} />
        <UGCGallery />
        <Reviews />
        <Visit />
      </main>

      <Footer />

      {/* Overlays */}
      <Toast toast={toast} />
    </>
  );
}
