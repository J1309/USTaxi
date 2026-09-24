import { useEffect, useRef } from 'react';
import Lenis from 'lenis';

let globalLenis = null;

export function smoothScrollTo(target, options = {}) {
  if (globalLenis) {
    globalLenis.scrollTo(target, { offset: -90, duration: 1.2, ...options });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}

export function useLenis() {
  const lenisRef = useRef(null);

  useEffect(() => {
    // Only initialize smooth scroll if not reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
    });

    lenisRef.current = lenis;
    globalLenis = lenis;

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
      globalLenis = null;
    };
  }, []);

  return { scrollTo: smoothScrollTo, lenis: lenisRef.current };
}
