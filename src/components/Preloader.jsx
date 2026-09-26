import React, { useState, useEffect } from 'react';

/**
 * Premium Luxury Minimal Preloader for Lavender Taxi & Chauffeur
 * 
 * Design Philosophy:
 * - Serene calming white & warm ivory background (#FEFBF3)
 * - Deep signature maroon typography (#4E0401) with warm gold subtitle (#E88C2B)
 * - Transparent brand crest enclosed in a refined circular white medallion
 * - Minimalist luxury editorial entrance and smooth curtain dissolve
 * - No loader bar (pure brand poise & elegance)
 * - Clean unmount from DOM when complete
 * - Respects prefers-reduced-motion
 */
export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setMounted(false);
      return;
    }

    // Step 1: Hold the refined brand presentation for 1.1s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1100);

    // Step 2: Unmount cleanly after the exit fade completes (650ms transition)
    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 1750);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(unmountTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`luxury-preloader-backdrop ${isExiting ? 'preloader-exit' : ''}`}
      aria-hidden="true"
      role="status"
      aria-label="Loading Lavender Taxi & Chauffeur"
    >
      <div className={`preloader-content-cluster ${isExiting ? 'content-exit' : ''}`}>
        {/* Soft Golden Ambient Aura */}
        <div className="emblem-halo-glow" />

        {/* Brand Crest / Logo */}
        <div className="preloader-emblem-wrap">
          <img
            src="/images/logo_lavender_transparent.png"
            alt="Lavender Emblem"
            className="preloader-logo-img"
          />
        </div>

        {/* Brand Wordmark & Descriptor */}
        <div className="preloader-text-group">
          <span className="preloader-brand-title">LAVENDER</span>
          <span className="preloader-brand-sub">TAXI & CHAUFFEUR · HOUSTON</span>
        </div>
      </div>

      <style>{`
        .luxury-preloader-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          z-index: 999999;
          background: radial-gradient(circle at 50% 48%, #FFFFFF 0%, #FEFBF3 65%, #F7F1E4 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
          transition: opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1), transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .luxury-preloader-backdrop.preloader-exit {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-6px);
        }

        .preloader-content-cluster {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
          animation: preloaderClusterEnter 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .preloader-content-cluster.content-exit {
          opacity: 0;
          transform: translateY(-10px) scale(0.97);
        }

        /* Subtle Ambient Aura */
        .emblem-halo-glow {
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 160px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232, 140, 43, 0.16) 0%, rgba(232, 140, 43, 0) 70%);
          filter: blur(12px);
          pointer-events: none;
          animation: preloaderPulseAura 2s ease-in-out infinite alternate;
        }

        /* Circular Emblem Medallion */
        .preloader-emblem-wrap {
          position: relative;
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 20px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.12);
          box-shadow: 
            0 12px 32px rgba(78, 4, 1, 0.08),
            0 0 0 5px rgba(232, 140, 43, 0.08);
        }

        .preloader-logo-img {
          width: 52px;
          height: 52px;
          object-fit: contain;
          animation: preloaderEmblemBreathe 2.4s ease-in-out infinite alternate;
        }

        /* Typography */
        .preloader-text-group {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .preloader-brand-title {
          font-family: var(--font-heading, 'Attera', serif);
          font-size: 1.55rem;
          font-weight: 900;
          color: #4E0401;
          letter-spacing: 0.32em;
          text-indent: 0.32em; /* Visually balances wide letter tracking */
          line-height: 1.2;
          -webkit-text-stroke: 0.3px currentColor;
        }

        .preloader-brand-sub {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.28em;
          text-indent: 0.28em;
          text-transform: uppercase;
          color: #E88C2B;
        }

        /* Keyframe Animations */
        @keyframes preloaderClusterEnter {
          0% {
            opacity: 0;
            transform: scale(0.95) translateY(6px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes preloaderPulseAura {
          0% {
            transform: translateX(-50%) scale(0.92);
            opacity: 0.4;
          }
          100% {
            transform: translateX(-50%) scale(1.15);
            opacity: 0.85;
          }
        }

        @keyframes preloaderEmblemBreathe {
          0% {
            transform: scale(0.98);
          }
          100% {
            transform: scale(1.02);
          }
        }

        @media (max-width: 600px) {
          .preloader-emblem-wrap {
            width: 70px;
            height: 70px;
            margin-bottom: 16px;
          }
          .preloader-logo-img {
            width: 46px;
            height: 46px;
          }
          .preloader-brand-title {
            font-size: 1.3rem;
            letter-spacing: 0.28em;
            text-indent: 0.28em;
          }
          .preloader-brand-sub {
            font-size: 0.58rem;
            letter-spacing: 0.22em;
            text-indent: 0.22em;
          }
        }
      `}</style>
    </div>
  );
}
