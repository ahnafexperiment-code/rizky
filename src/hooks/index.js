import { useState, useEffect, useCallback } from 'react';

// ── Theme hook ──────────────────────────────────────────
export function useTheme() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('bb_theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bb_theme', theme);
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme(t => (t === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}

// ── Scroll spy hook ─────────────────────────────────────
export function useScrollSpy(sectionIds) {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    const handler = () => {
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 100) current = id;
      }
      setActive(current);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [sectionIds]);

  return active;
}

// ── Navbar scroll hook ───────────────────────────────────
export function useNavbarScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > threshold);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [threshold]);

  return scrolled;
}

// ── IntersectionObserver reveal hook ────────────────────
export function useReveal(threshold = 0.15) {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold, rootMargin: '-40px 0px' }
    );
    obs.observe(ref);
    return () => obs.disconnect();
  }, [ref, threshold]);

  return [setRef, visible];
}

// ── Counter animation hook ───────────────────────────────
export function useCounter(target, active, duration = 2000) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    const steps = duration / 16;
    const step = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += step;
      if (current >= target) {
        setValue(target);
        clearInterval(interval);
      } else {
        setValue(Math.floor(current));
      }
    }, 16);
    return () => clearInterval(interval);
  }, [target, active, duration]);

  return value;
}

// ── Toast hook ───────────────────────────────────────────
export function useToast() {
  const [toast, setToast] = useState({ msg: '', show: false });

  const showToast = useCallback((msg, duration = 2500) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast({ msg: '', show: false }), duration);
  }, []);

  return { toast, showToast };
}

// ── Timeline progress hook ───────────────────────────────
export function useTimelineProgress(sectionId) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handler = () => {
      const el = document.getElementById(sectionId);
      if (!el) return;
      const top = el.offsetTop;
      const h = el.offsetHeight;
      const p = Math.max(0, Math.min(1, (window.scrollY - top) / (h - window.innerHeight)));
      setProgress(p * 100);
    };
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, [sectionId]);

  return progress;
}
