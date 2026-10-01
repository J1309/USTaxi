import React, { useState, useEffect } from 'react';

/**
 * Premium Luxury Preloader for Lavender Taxi Service
 * 
 * Features:
 * - Deep obsidian dark luxury background matching brand aesthetic (#06010B)
 * - New Chevrolet Suburban illustration logo with lavender swooshes (/images/new_suburban_logo_cropped.png)
 * - Luminous lilac & amber ambient halo breathing effect
 * - Smooth entrance and floating animation
 * - Clean dissolve unmount
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

    // Step 1: Hold the brand presentation for 1.4s
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, 1400);

    // Step 2: Unmount cleanly after the exit transition completes (600ms)
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
      aria-label="Loading Lavender Taxi Service"
    >
      <div className={`preloader-content-cluster ${isExiting ? 'content-exit' : ''}`}>
        {/* Soft Lilac Ambient Halo */}
        <div className="emblem-halo-glow" />

        {/* New Suburban Logo (Emblem with Car + Lavender Swoosh + Typography) */}
        <div className="preloader-logo-wrap">
          <img
            src="/images/new_suburban_logo_cropped.png"
            alt="Lavender Taxi Service"
            className="preloader-logo-img"
          />
        </div>

        {/* Subtle Luxury Loading Indicator Bar */}
        <div className="preloader-progress-track">
          <div className="preloader-progress-fill" />
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
          background: radial-gradient(circle at 50% 48%, #12041A 0%, #08020D 60%, #030006 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: all;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          overflow: hidden;
        }

        .luxury-preloader-backdrop.preloader-exit {
          opacity: 0;
          pointer-events: none;
          transform: scale(1.02);
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
          transform: translateY(-8px) scale(0.98);
        }

        /* Ambient Glow behind Suburban logo */
        .emblem-halo-glow {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 380px;
          height: 220px;
          border-radius: 50%;
          background: radial-gradient(ellipse at center, rgba(168, 85, 247, 0.32) 0%, rgba(232, 140, 43, 0.12) 45%, rgba(0, 0, 0, 0) 70%);
          filter: blur(28px);
          pointer-events: none;
          animation: haloPulse 2.4s ease-in-out infinite alternate;
        }

        /* Logo Wrap & Animation */
        .preloader-logo-wrap {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          animation: logoEntrance 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .preloader-logo-img {
          width: clamp(280px, 48vw, 460px);
          height: auto;
          object-fit: contain;
          filter: drop-shadow(0 14px 32px rgba(0, 0, 0, 0.6)) drop-shadow(0 2px 14px rgba(168, 85, 247, 0.35));
          animation: logoFloat 2.8s ease-in-out infinite alternate;
        }

        /* Subtle Progress Line */
        .preloader-progress-track {
          width: 140px;
          height: 2px;
          background: rgba(255, 255, 255, 0.12);
          border-radius: 9999px;
          margin-top: 24px;
          overflow: hidden;
          position: relative;
        }

        .preloader-progress-fill {
          position: absolute;
          top: 0;
          left: 0;
          height: 100%;
          width: 100%;
          background: linear-gradient(90deg, #A855F7 0%, #E88C2B 50%, #C084FC 100%);
          border-radius: 9999px;
          transform: translateX(-100%);
          animation: progressFill 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        /* KEYFRAMES */
        @keyframes logoEntrance {
          0% {
            opacity: 0;
            transform: scale(0.9) translateY(12px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes logoFloat {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-5px);
          }
        }

        @keyframes haloPulse {
          0% {
            transform: translate(-50%, -50%) scale(0.92);
            opacity: 0.5;
          }
          100% {
            transform: translate(-50%, -50%) scale(1.15);
            opacity: 0.9;
          }
        }

        @keyframes progressFill {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(0%);
          }
        }

        /* Mobile Refinements */
        @media (max-width: 600px) {
          .preloader-logo-img {
            width: clamp(240px, 78vw, 320px);
          }
          .emblem-halo-glow {
            width: 260px;
            height: 160px;
          }
          .preloader-progress-track {
            width: 110px;
            margin-top: 18px;
          }
        }
      `}</style>
    </div>
  );
}
