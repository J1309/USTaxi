import React from 'react';
import { ArrowRight } from 'lucide-react';
import { openBooking } from '../utils/bookingModal';

export default function MobileStickyBar() {
  const handleBookClick = () => {
    openBooking('suburban');
  };

  return (
    <aside className="mobile-bottom-bar" aria-label="Mobile quick action">
      <div className="mobile-bar-container">
        {/* Primary Action: Book a Ride */}
        <button
          type="button"
          onClick={handleBookClick}
          className="mobile-primary-book-btn"
          aria-label="Book a Ride"
        >
          <span>Book a Ride</span>
          <ArrowRight size={17} strokeWidth={2.4} />
        </button>
      </div>

      <style>{`
        /* Desktop: Strictly Hidden */
        .mobile-bottom-bar {
          display: none;
        }

        /* Mobile (<= 768px): Sleek Executive Floating Action Button */
        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: block;
            position: fixed;
            bottom: max(16px, env(safe-area-inset-bottom, 16px));
            left: 16px;
            right: 16px;
            z-index: 2500;
            pointer-events: none;
          }

          .mobile-bar-container {
            pointer-events: auto;
            max-width: 440px;
            margin: 0 auto;
            display: flex;
            align-items: center;
          }

          .mobile-primary-book-btn {
            width: 100%;
            height: 52px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #E88C2B 0%, #D2791C 100%);
            color: #FFFFFF;
            border: 1px solid rgba(255, 255, 255, 0.28);
            font-family: inherit;
            font-size: 0.98rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            text-transform: uppercase;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            cursor: pointer;
            touch-action: manipulation;
            transition: all 0.18s ease;
            box-shadow: 0 8px 28px rgba(232, 140, 43, 0.48), 0 2px 10px rgba(0, 0, 0, 0.35);
          }

          .mobile-primary-book-btn:active {
            transform: scale(0.97);
            filter: brightness(0.94);
            box-shadow: 0 4px 16px rgba(232, 140, 43, 0.4);
          }
        }
      `}</style>
    </aside>
  );
}
