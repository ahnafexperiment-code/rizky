import { useState, useEffect } from 'react';
import { useTheme, useToast } from './hooks/index.js';

import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import { Testimonials, UGCGallery } from './components/Gallery.jsx';
import Explore from './components/Explore.jsx';
import Museum from './components/Museum.jsx';
import Story from './components/Story.jsx';
import Quiz from './components/Quiz.jsx';
import Tribe from './components/Tribe.jsx';
import Visit from './components/Visit.jsx';
import Reviews from './components/Reviews.jsx';
import Footer from './components/Footer.jsx';
import { ThemeToggle, Toast, VideoModal } from './components/UI.jsx';

export default function App() {
  const { theme, toggle: toggleTheme } = useTheme();
  const { toast, showToast } = useToast();
  const [videoOpen, setVideoOpen] = useState(false);

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

  // Keyboard close modal
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') setVideoOpen(false); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Log branding
  useEffect(() => {
    console.log('%cSINGOSARI CULTURAL SITE', 'font-size:32px;font-weight:900;color:#d4af37;');
    console.log('%cSingosari, Sumberawan, dan Museum Singhasari', 'color:#a78bfa;font-size:14px');
  }, []);

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
        <Explore />
        <Museum />
        <Story onVideoOpen={() => setVideoOpen(true)} />
        <Quiz showToast={showToast} />
        <UGCGallery />
        <Reviews />
        <Tribe showToast={showToast} />
        <Visit showToast={showToast} />
      </main>

      <Footer />

      {/* Overlays */}
      <VideoModal open={videoOpen} onClose={() => setVideoOpen(false)} />
      <Toast toast={toast} />
    </>
  );
}
