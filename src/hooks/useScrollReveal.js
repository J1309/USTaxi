import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * High-performance IntersectionObserver hook for smooth scroll reveal transitions.
 * Automatically queries elements with `.reveal-on-scroll` and toggles `.is-revealed`.
 * Gracefully reveals elements already in viewport and observes elements as the user scrolls.
 */
export function useScrollReveal() {
  const location = useLocation();

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    };

    let observer = null;
    try {
      observer = new IntersectionObserver(handleIntersect, observerOptions);
    } catch (err) {
      // Fallback if IntersectionObserver is unavailable
      document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
        el.classList.add('is-revealed');
      });
      return;
    }

    const observeElements = () => {
      const elements = document.querySelectorAll('.reveal-on-scroll:not(.is-revealed)');
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // If element is already in the viewport or above, reveal immediately
        if (rect.top <= window.innerHeight * 0.94) {
          el.classList.add('is-revealed');
        } else {
          observer.observe(el);
        }
      });
    };

    // Run initial scan
    observeElements();

    // Secondary scan to catch late image renders or font calculations
    const timer = setTimeout(observeElements, 250);

    // Watch for dynamic DOM changes (such as tab switches in About section)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname, location.hash]);
}
