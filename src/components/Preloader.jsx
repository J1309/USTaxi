import React, { useState, useEffect, useRef } from 'react';

/**
 * Mobile-First Fullscreen Video Preloader for Lavender Taxi Service
 * Features:
 * - Full cross-platform support: iOS Safari, Android Chrome, and Desktop
 * - Guaranteed mobile autoplay compliance (muted DOM properties & WebKit attributes)
 * - Scaled portrait presentation for mobile screens so the car & branding look bold and custom-fitted
 * - Seamless edge-to-edge pure white background (#ffffff) with zero borders or black bars
 * - Automatic smooth fade-out and unmount once the video completes
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
    const video = videoRef.current;
    if (!video) return;

    // Critical for iOS Safari, iPadOS, and Android Chrome autoplay compliance:
    // React JSX attributes alone do not set DOM properties early enough for WebKit.
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;
    video.setAttribute('playsinline', '');
    video.setAttribute('webkit-playsinline', '');
    video.setAttribute('x5-playsinline', '');
    video.setAttribute('muted', '');

    const startPlayback = () => {
      if (!video) return;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          // Autoplay policy prevented playback, attempt on next tick or allow interaction
          console.warn('Video preloader autoplay caught:', err);
        });
      }
    };

    // Attempt playback immediately and listen for metadata load
    startPlayback();
    video.addEventListener('loadedmetadata', startPlayback);
    video.addEventListener('canplay', startPlayback);

    // Safety fallback: maximum 4.5 seconds so user is never stuck
    const safetyTimer = setTimeout(() => {
      handleFinish();
    }, 4500);

    return () => {
      video.removeEventListener('loadedmetadata', startPlayback);
      video.removeEventListener('canplay', startPlayback);
      clearTimeout(safetyTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className={`video-preloader-backdrop ${isExiting ? 'preloader-exit' : ''}`}
      aria-hidden="true"
      role="status"
      aria-label="Lavender Taxi Service Intro"
      onTouchStart={() => {
        // Fallback for strict battery-saver / iOS low power mode
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }}
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
          touch-action: manipulation;
          -webkit-user-select: none;
          user-select: none;
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
          overflow: hidden;
        }

        .preloader-video {
          width: 100%;
          height: 100%;
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
          background: #ffffff;
          display: block;
          transform: scale(1);
          transform-origin: center center;
          transition: transform 0.3s ease;
        }

        /* Mobile Version Optimization:
           Enlarge and center the SUV + Lavender Taxi logo in portrait screens
           so it fills the mobile screen nicely and feels native rather than a tiny strip */
        @media (max-width: 768px), (orientation: portrait) {
          .preloader-video {
            transform: scale(1.36);
          }
        }

        @media (max-width: 480px) {
          .preloader-video {
            transform: scale(1.42);
          }
        }
      `}</style>
    </div>
  );
}
