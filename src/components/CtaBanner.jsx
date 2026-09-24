import React from 'react';
import { Phone, ArrowRight } from 'lucide-react';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW } from '../utils/whatsapp';
import { smoothScrollTo } from '../hooks/useLenis';

export default function CtaBanner() {
  return (
    <section className="cta-banner-blue">
      <div className="container cta-container-layout">
        {/* Left Side: Headlines */}
        <div className="cta-left-text">
          <span className="cta-sub-tag">READY FOR YOUR NEXT RIDE?</span>
          <h2 className="cta-main-title">Book Your Ride Today</h2>
          <p className="cta-pillars-line">Safe. Reliable. Professional.</p>
        </div>

        {/* Right Side: Phone Pill & Book a Ride Button */}
        <div className="cta-right-actions">
          <div className="cta-slogan-tag">
            <span>HOUSTON MOVES PEOPLE</span>
            <span className="cta-slogan-sub">WE KEEP YOU MOVING</span>
          </div>

          <div className="cta-buttons-cluster">
            <a
              href={`tel:+${OWNER_PHONE_RAW}`}
              className="cta-white-phone-pill"
            >
              <Phone size={16} color="#0284C7" />
              <span>{OWNER_PHONE_DISPLAY}</span>
            </a>

            <button
              type="button"
              onClick={() => smoothScrollTo('#booking-section')}
              className="cta-orange-book-pill"
            >
              <span>Book a Ride</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .cta-banner-blue {
          background: #0284C7;
          color: #FFFFFF;
          padding: 48px 0;
        }
        .cta-container-layout {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 32px;
        }
        .cta-left-text {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .cta-sub-tag {
          font-size: 0.78rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
        }
        .cta-main-title {
          font-size: clamp(2rem, 3.2vw, 2.6rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.1;
        }
        .cta-pillars-line {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.9);
          font-weight: 500;
        }
        .cta-right-actions {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 12px;
        }
        .cta-slogan-tag {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: rgba(255, 255, 255, 0.75);
        }
        .cta-slogan-sub {
          font-size: 0.65rem;
          color: rgba(255, 255, 255, 0.6);
        }
        .cta-buttons-cluster {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .cta-white-phone-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          color: #0F172A;
          font-weight: 700;
          font-size: 0.94rem;
          padding: 12px 22px;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          transition: transform 0.15s ease;
        }
        .cta-white-phone-pill:hover {
          transform: translateY(-1px);
        }
        .cta-orange-book-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F97316;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.94rem;
          padding: 12px 24px;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.15);
          transition: background 0.15s ease, transform 0.15s ease;
        }
        .cta-orange-book-pill:hover {
          background: #EA580C;
          transform: translateY(-1px);
        }

        @media (max-width: 900px) {
          .cta-container-layout {
            flex-direction: column;
            align-items: flex-start;
          }
          .cta-right-actions {
            align-items: flex-start;
            width: 100%;
          }
          .cta-slogan-tag {
            align-items: flex-start;
          }
          .cta-buttons-cluster {
            width: 100%;
            flex-direction: column;
          }
          .cta-white-phone-pill,
          .cta-orange-book-pill {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
