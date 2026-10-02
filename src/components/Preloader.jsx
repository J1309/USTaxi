import React, { useState, useEffect, useRef } from 'react';

/**
 * Fullscreen Seamless Video Preloader for Lavender Taxi Service
 * Uses /preload_vid.mp4 as the intro animation.
 * Features:
 * - Plays inline, muted, autoPlay for seamless iOS/Android & desktop support
 * - Pure white background seamlessly matching the video's background (zero black letterbox/pillarbox bars)
 * - Automatically fades out and unmounts cleanly when the video completes (onEnded)
 * - Safe fallback timer to prevent blocking if video playback is delayed
 */
export default function Preloader() {
  const [mounted, setMounted] = useState(true);
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);

  const handleFinish = () => {
    setIsExiting(true);
    setTimeout(() => {
      setMounted(false);
    }, 600);
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
          background: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.6s ease;
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
          background: #ffffff;
        }

        .preloader-video {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          background: #ffffff;
          display: block;
        }
      `}</style>
    </div>
  );
}
