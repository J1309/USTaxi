import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { OWNER_PHONE_RAW } from '../utils/whatsapp';
import { openBooking } from '../utils/bookingModal';

export default function MobileStickyBar() {
  const handleBookClick = () => {
    openBooking('suburban');
  };

  return (
    <aside className="mobile-bottom-bar" aria-label="Mobile quick actions">
      <div className="mobile-bar-flex">
        {/* Primary Action: Book a Ride */}
        <button
          type="button"
          onClick={handleBookClick}
          className="mobile-sticky-btn book-ride-btn"
          aria-label="Book a Ride"
        >
          <span>Book a Ride</span>
          <ArrowRight size={16} />
        </button>

        {/* Secondary Action: Call Directly */}
        <a
          href={`tel:+${OWNER_PHONE_RAW}`}
          className="mobile-sticky-btn call-pill-btn"
          aria-label="Call Dispatch"
        >
          <Phone size={15} color="#E88C2B" />
          <span>Call</span>
        </a>
      </div>

      <style>{`
        /* Desktop: Strictly Hidden */
        .mobile-bottom-bar {
          display: none;
        }

        /* Mobile (<= 768px): Sticky Floating Bar matching mockup */
        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: block;
            position: fixed;
            bottom: 12px;
            left: 16px;
            right: 16px;
            z-index: 2500;
            pointer-events: none;
          }

          .mobile-bar-flex {
            pointer-events: auto;
            display: flex;
            align-items: center;
            gap: 10px;
            max-width: 440px;
            margin: 0 auto;
          }

          .mobile-sticky-btn {
            height: 48px;
            border-radius: 9999px;
            font-family: inherit;
            font-size: 0.92rem;
            font-weight: 800;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            transition: all 0.18s ease;
            text-decoration: none;
            box-shadow: 0 8px 24px rgba(78, 4, 1, 0.18);
          }

          .mobile-sticky-btn.book-ride-btn {
            flex: 2.2;
            background: #E88C2B;
            color: #FFFFFF;
            border: none;
            letter-spacing: 0.02em;
          }

          .mobile-sticky-btn.book-ride-btn:hover {
            background: #D2791C;
          }

          .mobile-sticky-btn.call-pill-btn {
            flex: 1;
            background: #FFFFFF;
            color: #4E0401;
            border: 1.5px solid rgba(78, 4, 1, 0.14);
          }

          .mobile-sticky-btn.call-pill-btn:hover {
            border-color: #E88C2B;
          }
        }
      `}</style>
    </aside>
  );
}
