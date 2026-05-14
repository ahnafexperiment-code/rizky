import { useState } from 'react';
import { useNavbarScrolled, useScrollSpy } from '../hooks/index.js';

const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'explore', label: 'Explore' },
  { id: 'places', label: 'Places' },
  { id: 'story', label: 'The Story' },
  { id: 'visit', label: 'Visit' },
];

function smoothScroll(id) {
  const el = document.getElementById(id);
  if (el) {
    const offset = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top: offset, behavior: 'smooth' });
  }
}

export default function Navbar({ theme, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const scrolled = useNavbarScrolled(60);
  const active = useScrollSpy(NAV_ITEMS.map(n => n.id));

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="nav-container">
        {/* Logo */}
        <button className="nav-logo" onClick={() => smoothScroll('home')} aria-label="Go to home">
          <span className="logo-icon">⛩</span>
          <span className="logo-text">SINGOSARI</span>
        </button>

        {/* Desktop Links */}
        <ul className="nav-links" role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link${active === item.id ? ' active' : ''}`}
                id={`nav-${item.id}`}
                onClick={() => smoothScroll(item.id)}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className={`hamburger${menuOpen ? ' open' : ''}`}
          id="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`mobile-menu${menuOpen ? ' open' : ''}`}
        role="dialog"
        aria-label="Mobile navigation"
        aria-hidden={!menuOpen}
      >
        <ul role="list">
          {NAV_ITEMS.map(item => (
            <li key={item.id}>
              <button
                className="mob-link"
                id={`mob-${item.id}`}
                onClick={() => { smoothScroll(item.id); closeMenu(); }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
