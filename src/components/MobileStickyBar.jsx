import React from 'react';
import { Phone, MessageCircle, ArrowUpRight } from 'lucide-react';
import { OWNER_PHONE_RAW, getDirectWhatsAppChatUrl } from '../utils/whatsapp';
import { smoothScrollTo } from '../hooks/useLenis';

export default function MobileStickyBar() {
  const handleWhatsApp = () => {
    window.open(getDirectWhatsAppChatUrl(), '_blank', 'noopener,noreferrer');
  };

  return (
    <aside className="mobile-bottom-bar" aria-label="Mobile quick actions">
      <div className="mobile-bar-pill">
        <a
          href={`tel:+${OWNER_PHONE_RAW}`}
          className="mobile-btn phone"
          aria-label="Call Dispatch"
        >
          <Phone size={15} />
          <span>Call 832-879-8685</span>
        </a>

        <button
          type="button"
          onClick={() => smoothScrollTo('#booking-section')}
          className="mobile-btn quote"
          aria-label="Book Ride"
        >
          <span>Book Ride</span>
          <ArrowUpRight size={15} />
        </button>

        <button
          type="button"
          onClick={handleWhatsApp}
          className="mobile-btn wa"
          aria-label="WhatsApp Dispatch"
        >
          <MessageCircle size={16} />
          <span>WhatsApp</span>
        </button>
      </div>

      <style>{`
        .mobile-bottom-bar {
          display: none;
          position: fixed;
          bottom: 12px;
          left: 12px;
          right: 12px;
          z-index: 95;
          pointer-events: none;
        }
        .mobile-bar-pill {
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.96);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid #CBD5E1;
          border-radius: var(--radius-full);
          padding: 6px;
          display: grid;
          grid-template-columns: 1.2fr 1fr 1fr;
          gap: 6px;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.15);
        }
        .mobile-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 10px 8px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 700;
          border: none;
        }
        .mobile-btn.phone {
          background: #0284C7;
          color: #FFFFFF;
        }
        .mobile-btn.quote {
          background: #F97316;
          color: #FFFFFF;
        }
        .mobile-btn.wa {
          background: #25D366;
          color: #FFFFFF;
        }

        @media (max-width: 768px) {
          .mobile-bottom-bar {
            display: block;
          }
        }
      `}</style>
    </aside>
  );
}
