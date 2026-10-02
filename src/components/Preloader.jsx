import React, { useState, useEffect, useRef } from 'react';

/**
 * Fullscreen Video Preloader for Lavender Taxi Service
 * Uses /preload_vid.mp4 as the intro animation.
 * Features:
 * - Plays inline, muted, autoPlay for seamless iOS/Android & desktop support
 * - Automatically fades out and unmounts when the video completes (onEnded)
 * - Safe fallback timer to prevent blocking if video playback is delayed
 * - Elegant skip button for instant entry
 * - Dark black background for cinematic presentation
 */
export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      setMounted(false);
    }, 500);
  };

  useEffect(() => {
    // Respect user's motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setMounted(false);
      return;
    }

    // Attempt video playback immediately
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // Autoplay policy fallback
      });
    }

    // Safety fallback: maximum 4.5 seconds in case video event doesn't fire
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 4500);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`video-preloader-backdrop ${isExiting ? 'preloader-exit' : ''}`}
      aria-hidden="true"
      role="status"
      aria-label="Loading Lavender Taxi Service"
    >
      <div className="video-preloader-wrapper">
        <video
          ref={videoRef}
          src="/preload_vid.mp4"
          autoPlay
          muted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          onEnded={handleFinish}
          className="preloader-video"
        />

        {/* Skip button for instant entry */}
        <button
          type="button"
          onClick={handleFinish}
          className="preloader-skip-btn"
          aria-label="Skip intro animation"
        >
          Skip
        </button>
      </div>

      <style>{`
        .video-preloader-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh;
          z-index: 999999;
          background: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.5s ease;
        }

        .video-preloader-backdrop.preloader-exit {
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        }

        .video-preloader-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #000000;
        }

        .preloader-video {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          background: #000000;
          display: block;
        }

        .preloader-skip-btn {
          position: absolute;
          top: max(20px, env(safe-area-inset-top, 20px));
          right: max(20px, env(safe-area-inset-right, 20px));
          background: rgba(0, 0, 0, 0.55);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.22);
          color: rgba(255, 255, 255, 0.85);
          padding: 6px 16px;
          border-radius: 9999px;
          font-family: inherit;
          font-size: 0.80rem;
          font-weight: 700;
          letter-spacing: 0.04em;
          cursor: pointer;
          touch-action: manipulation;
          transition: all 0.18s ease;
          z-index: 10;
        }

        .preloader-skip-btn:hover {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
          transform: translateY(-1px);
        }

        .preloader-skip-btn:active {
          transform: scale(0.96);
        }
      `}</style>
    </div>
  );
}
