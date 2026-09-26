import React, { useState, useEffect } from 'react';

/**
 * Premium Luxury Minimal Preloader for Lavender Taxi & Chauffeur
 * 
 * Features:
 * - Serene calming white & warm ivory background (#FEFBF3)
 * - New winged golden emblem (/images/new_logo_transparent.png) displayed prominently
 * - Majestic entrance and gentle floating/breathing animation on the emblem
 * - Cinematic letter-tracking reveal & golden shimmer sweep on the brand name "LAVENDER"
 * - Clean: No loader bar and no subtitle text under the name
 * - Smooth cubic-bezier dissolve that unmounts cleanly from DOM
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

    // Step 1: Hold the brand presentation for 1.35s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1350);

    // Step 2: Unmount cleanly after the exit transition completes (650ms)
    const unmountTimer = setTimeout(() => {
      setMounted(false);
    }, 2000);

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
        {/* Soft Golden Ambient Halo */}
        <div className="emblem-halo-glow" />

        {/* New Winged Emblem (Large & Animated) */}
        <div className="preloader-wings-wrap">
          <img
            src="/images/new_logo_transparent.png"
            alt="Lavender Luxury Wings"
            className="preloader-wings-img"
          />
        </div>

        {/* Brand Name (Animated with tracking expansion & shimmer) */}
        <div className="preloader-title-wrap">
          <h1 className="preloader-brand-title">LAVENDER</h1>
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
          transform: translateY(-8px);
        }

        .preloader-content-cluster {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 24px;
          transition: opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .preloader-content-cluster.content-exit {
          opacity: 0;
          transform: translateY(-12px) scale(0.97);
        }

        /* Ambient Glow behind wings */
        .emblem-halo-glow {
          position: absolute;
          top: 25px;
          left: 50%;
          transform: translateX(-50%);
          width: 280px;
          height: 160px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(232, 140, 43, 0.22) 0%, rgba(232, 140, 43, 0) 70%);
          filter: blur(20px);
          pointer-events: none;
          animation: haloBreathing 2.2s ease-in-out infinite alternate;
        }

        /* Large Winged Emblem Wrap & Animation */
        .preloader-wings-wrap {
          position: relative;
          margin-bottom: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: wingsEnter 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .preloader-wings-img {
          width: clamp(220px, 34vw, 320px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 10px 24px rgba(78, 4, 1, 0.12)) drop-shadow(0 2px 8px rgba(232, 140, 43, 0.25));
          animation: wingsFloat 2.6s ease-in-out infinite alternate;
        }

        /* Brand Name Wrap & Typography Animation */
        .preloader-title-wrap {
          overflow: visible;
        }

        .preloader-brand-title {
          font-family: var(--font-heading, 'Attera', serif);
          font-size: clamp(1.8rem, 4vw, 2.4rem);
          font-weight: 900;
          margin: 0;
          line-height: 1.15;
          letter-spacing: 0.38em;
          text-indent: 0.38em; /* Visually balances wide letter tracking */
          text-transform: uppercase;
          -webkit-text-stroke: 0.35px rgba(78, 4, 1, 0.25);
          
          /* Golden Light Sheen Sweep across deep maroon */
          background: linear-gradient(
            110deg,
            #4E0401 0%,
            #4E0401 35%,
            #E88C2B 48%,
            #FFF5E6 52%,
            #E88C2B 56%,
            #4E0401 68%,
            #4E0401 100%
          );
          background-size: 260% 100%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          
          animation: 
            titleTrackingReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) forwards,
            titleShimmerSweep 2.8s ease-in-out infinite 0.4s;
        }

        /* ==========================================================================
           KEYFRAME ANIMATIONS
           ========================================================================== */
        
        /* 1. Wings Entrance */
        @keyframes wingsEnter {
          0% {
            opacity: 0;
            transform: scale(0.85) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        /* 2. Wings Subtle Levitation & Float */
        @keyframes wingsFloat {
          0% {
            transform: translateY(0) scale(1);
            filter: drop-shadow(0 10px 24px rgba(78, 4, 1, 0.12)) drop-shadow(0 2px 8px rgba(232, 140, 43, 0.20));
          }
          100% {
            transform: translateY(-6px) scale(1.02);
            filter: drop-shadow(0 16px 32px rgba(78, 4, 1, 0.16)) drop-shadow(0 4px 14px rgba(232, 140, 43, 0.35));
          }
        }

        /* 3. Ambient Halo Pulsing */
        @keyframes haloBreathing {
          0% {
            transform: translateX(-50%) scale(0.9);
            opacity: 0.4;
          }
          100% {
            transform: translateX(-50%) scale(1.2);
            opacity: 0.85;
          }
        }

        /* 4. Title Tracking Expansion & Fade-in */
        @keyframes titleTrackingReveal {
          0% {
            opacity: 0;
            letter-spacing: 0.18em;
            text-indent: 0.18em;
            transform: translateY(8px);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            letter-spacing: 0.38em;
            text-indent: 0.38em;
            transform: translateY(0);
            filter: blur(0);
          }
        }

        /* 5. Golden Luminous Sheen Sweep across typography */
        @keyframes titleShimmerSweep {
          0% {
            background-position: 100% 0;
          }
          100% {
            background-position: -160% 0;
          }
        }

        /* Mobile Refinements */
        @media (max-width: 600px) {
          .preloader-wings-img {
            width: clamp(200px, 65vw, 260px);
          }
          .preloader-brand-title {
            font-size: 1.65rem;
            letter-spacing: 0.30em;
            text-indent: 0.30em;
          }
          .emblem-halo-glow {
            width: 220px;
            height: 130px;
          }
        }
      `}</style>
    </div>
  );
}
