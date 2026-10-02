import React from 'react';
import { Phone, MessageCircle, ArrowRight } from 'lucide-react';
import { OWNER_PHONE_RAW, getDirectWhatsAppChatUrl } from '../utils/whatsapp';
import { openBooking } from '../utils/bookingModal';

export default function MobileStickyBar() {
  const handleBookClick = () => {
    openBooking('suburban');
  };

  return (
    <aside className="mobile-bottom-bar" aria-label="Mobile quick actions">
      <div className="mobile-bar-container">
        {/* Quick Call */}
        <a
          href={`tel:+${OWNER_PHONE_RAW}`}
          className="mobile-quick-btn call-btn"
          aria-label="Call Dispatch"
          title="Call Dispatch"
        >
          <Phone size={17} color="#E88C2B" />
          <span className="quick-label">Call</span>
        </a>

        {/* Quick WhatsApp */}
        <a
          href={getDirectWhatsAppChatUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mobile-quick-btn whatsapp-btn"
          aria-label="Chat on WhatsApp"
          title="Chat on WhatsApp"
        >
          <MessageCircle size={17} color="#25D366" />
          <span className="quick-label">Chat</span>
        </a>

        {/* Primary Action: Book a Ride */}
        <button
          type="button"
          onClick={handleBookClick}
          className="mobile-primary-book-btn"
          aria-label="Book a Ride"
        >
          <span>Book a Ride</span>
          <ArrowRight size={15} />
        </button>
      </div>

      <style>{`
        /* Desktop: Strictly Hidden */
        .mobile-bottom-bar {
          display: none;
        }

        /* Mobile (<= 768px): Executive Floating Glassmorphic Dock */
        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: block;
            position: fixed;
            bottom: max(10px, env(safe-area-inset-bottom, 10px));
            left: 12px;
            right: 12px;
            z-index: 2500;
            pointer-events: none;
          }

          .mobile-bar-container {
            pointer-events: auto;
            display: flex;
            align-items: center;
            gap: 8px;
            max-width: 430px;
            margin: 0 auto;
            background: rgba(14, 3, 5, 0.92);
            backdrop-filter: blur(20px);
            -webkit-backdrop-filter: blur(20px);
            padding: 7px 8px;
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.14);
            box-shadow: 0 12px 36px rgba(0, 0, 0, 0.5), 0 2px 10px rgba(0, 0, 0, 0.25);
          }

          .mobile-quick-btn {
            height: 44px;
            padding: 0 14px;
            border-radius: 9999px;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #FFFFFF;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            font-family: inherit;
            font-size: 0.82rem;
            font-weight: 700;
            text-decoration: none;
            touch-action: manipulation;
            transition: all 0.16s ease;
            flex-shrink: 0;
          }

          .mobile-quick-btn:active {
            transform: scale(0.95);
            background: rgba(255, 255, 255, 0.16);
          }

          .quick-label {
            display: inline-block;
            letter-spacing: 0.01em;
          }

          .mobile-primary-book-btn {
            flex: 1;
            height: 44px;
            border-radius: 9999px;
            background: linear-gradient(135deg, #E88C2B 0%, #D2791C 100%);
            color: #FFFFFF;
            border: none;
            font-family: inherit;
            font-size: 0.90rem;
            font-weight: 800;
            letter-spacing: 0.02em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
            touch-action: manipulation;
            transition: all 0.16s ease;
            box-shadow: 0 4px 16px rgba(232, 140, 43, 0.45);
          }

          .mobile-primary-book-btn:active {
            transform: scale(0.97);
            filter: brightness(0.95);
          }
        }
      `}</style>
    </aside>
  );
}
