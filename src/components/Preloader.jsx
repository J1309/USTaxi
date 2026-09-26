import React, { useState, useEffect } from 'react';

/**
 * Premium Luxury Minimal Preloader for Lavender Taxi & Chauffeur
 * 
 * Design Philosophy:
 * - Rich imperial burgundy & obsidian background (#4E0401 -> #150000)
 * - Hardware-accelerated (transform & opacity only)
 * - Brand emblem with soft ambient golden aura
 * - Precision serif typography with generous letter tracking
 * - Ultra-minimalist hairline progress beam
 * - Buttery smooth curtain reveal that unmounts cleanly from DOM
 * - Respects prefers-reduced-motion
 */
export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setMounted(false);
      return;
    }

    // Step 1: Smooth progress beam animation
    const startTime = Date.now();
    const duration = 1200; // 1.2s loading duration

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed >= duration) {
        clearInterval(interval);
        // Step 2: Trigger exit animation
        setTimeout(() => {
          setIsExiting(true);
        }, 150);

        // Step 3: Unmount cleanly after exit transition completes
        setTimeout(() => {
          setMounted(false);
        }, 850);
      }
    }, 25);

    return () => clearInterval(interval);
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
        {/* Ambient Warm Golden Halo behind emblem */}
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

        {/* Minimal Luxury Hairline Progress Indicator */}
        <div className="preloader-track-bar">
          <div 
            className="preloader-fill-beam" 
            style={{ width: `${progress}%` }}
          />
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
          background: radial-gradient(circle at 50% 45%, #4E0401 0%, #2A0201 60%, #140000 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
          transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .luxury-preloader-backdrop.preloader-exit {
          opacity: 0;
          pointer-events: none;
          transform: translateY(-8px);
        }

        .preloader-content-cluster {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 20px;
          animation: preloaderClusterEnter 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          transition: opacity 0.45s ease, transform 0.45s ease;
        }

        .preloader-content-cluster.content-exit {
          opacity: 0;
          transform: translateY(-12px) scale(0.97);
        }

        /* Ambient Glowing Aura */
        .emblem-halo-glow {
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(232, 140, 43, 0.22) 0%, rgba(232, 140, 43, 0) 70%);
          filter: blur(14px);
          pointer-events: none;
          animation: preloaderPulseAura 2s ease-in-out infinite alternate;
        }

        /* Emblem Box */
        .preloader-emblem-wrap {
          position: relative;
          width: 76px;
          height: 76px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 22px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(232, 140, 43, 0.25);
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.4),
            0 0 20px rgba(232, 140, 43, 0.15);
        }

        .preloader-logo-img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
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
          font-size: 1.45rem;
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: 0.32em;
          text-indent: 0.32em; /* Centers tracked out text visually */
          line-height: 1.2;
          -webkit-text-stroke: 0.3px currentColor;
          text-shadow: 0 4px 16px rgba(0, 0, 0, 0.45);
        }

        .preloader-brand-sub {
          font-size: 0.64rem;
          font-weight: 700;
          letter-spacing: 0.26em;
          text-indent: 0.26em;
          text-transform: uppercase;
          color: #E88C2B;
          opacity: 0.92;
        }

        /* Hairline Progress Bar */
        .preloader-track-bar {
          width: 140px;
          height: 2px;
          background: rgba(255, 255, 255, 0.10);
          border-radius: 9999px;
          overflow: hidden;
          margin-top: 28px;
          position: relative;
        }

        .preloader-fill-beam {
          height: 100%;
          background: linear-gradient(90deg, #E88C2B 0%, #FFFFFF 85%, #E88C2B 100%);
          border-radius: 9999px;
          box-shadow: 0 0 10px rgba(232, 140, 43, 0.7);
          transition: width 0.05s linear;
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
            transform: translateX(-50%) scale(0.9);
            opacity: 0.5;
          }
          100% {
            transform: translateX(-50%) scale(1.15);
            opacity: 0.9;
          }
        }

        @keyframes preloaderEmblemBreathe {
          0% {
            transform: scale(0.97);
          }
          100% {
            transform: scale(1.02);
          }
        }

        @media (max-width: 600px) {
          .preloader-emblem-wrap {
            width: 68px;
            height: 68px;
            margin-bottom: 18px;
          }
          .preloader-logo-img {
            width: 44px;
            height: 44px;
          }
          .preloader-brand-title {
            font-size: 1.25rem;
            letter-spacing: 0.28em;
            text-indent: 0.28em;
          }
          .preloader-brand-sub {
            font-size: 0.58rem;
            letter-spacing: 0.22em;
            text-indent: 0.22em;
          }
          .preloader-track-bar {
            width: 120px;
            margin-top: 24px;
          }
        }
      `}</style>
    </div>
  );
}
