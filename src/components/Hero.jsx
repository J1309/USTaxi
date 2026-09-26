import React from 'react';
import { ArrowRight, Phone } from 'lucide-react';
import { openBooking } from '../utils/bookingModal';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW } from '../utils/whatsapp';
import BookingWidget from './BookingWidget';

export default function Hero({ onSelectVehicle }) {
  const handleBookRideClick = () => {
    openBooking('suburban');
  };

  return (
    <section id="home" className="hero-editorial-section">
      {/* Background Image: Our Chevrolet Suburban High Country at Airport Terminal */}
      <div className="hero-bg-media">
        <img
          src="/images/hero_new.png"
          alt="Lavender Taxi Luxury Chevrolet Suburban High Country Airport Chauffeur Service"
          className="hero-bg-img"
        />
      </div>

      <div className="container hero-content-container">
        {/* Left Side: Headlines, CTAs */}
        <div className="hero-text-block reveal-on-scroll">
          <div className="hero-kicker-tag">
            <span>ARRIVE IN STYLE</span>
          </div>

          <h1 className="hero-main-heading">
            <span className="desktop-heading">
              PREMIUM<br />
              TAXI SERVICES<br />
              <span className="orange-accent">IN HOUSTON</span>
            </span>
            <span className="mobile-heading">
              Premium<br />
              Taxi Services<br />
              <span className="orange-accent italic-city">in Houston</span>
            </span>
          </h1>

          <p className="hero-sub-description">
            Luxury, Punctuality, Peace of Mind. Your journey deserves more than just a ride. Experience executive chauffeur service with hands-on owner accountability.
          </p>

          <div className="hero-cta-buttons-row">
            <button
              type="button"
              onClick={handleBookRideClick}
              className="hero-primary-btn"
            >
              <span>BOOK A RIDE</span>
              <ArrowRight size={16} />
            </button>

            <a
              href={`tel:+${OWNER_PHONE_RAW}`}
              className="hero-secondary-btn"
              title={`Call ${OWNER_PHONE_DISPLAY}`}
              aria-label={`Call ${OWNER_PHONE_DISPLAY}`}
            >
              <Phone size={15} />
              <span className="desktop-call-text">{OWNER_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Floating Booking Engine Widget overlapping bottom of Hero */}
      <div className="hero-booking-dock reveal-on-scroll reveal-delay-1">
        <BookingWidget onSelectVehicle={onSelectVehicle} />
      </div>

      <style>{`
        .hero-editorial-section {
          position: relative;
          width: 100%;
          min-height: calc(100vh - 76px);
          min-height: calc(100dvh - 76px);
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          background: #FEFBF3;
          padding-top: 48px;
          padding-bottom: 50px;
          overflow: visible;
        }

        .hero-bg-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right 30%;
        }

        .hero-content-container {
          position: relative;
          z-index: 2;
          width: 100%;
          margin-bottom: 50px;
        }

        .hero-text-block {
          max-width: 620px;
          text-align: left;
        }

        .hero-kicker-tag {
          display: inline-block;
          font-family: inherit;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #E88C2B;
          text-transform: uppercase;
          margin-bottom: 8px;
        }

        .hero-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 3.8vw, 3.5rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.05;
          letter-spacing: -0.025em;
          margin-bottom: 12px;
          -webkit-text-stroke: 0.4px currentColor;
          text-rendering: optimizeLegibility;
        }

        .desktop-heading {
          display: block;
        }

        .mobile-heading {
          display: none;
        }

        .orange-accent {
          color: #E88C2B;
        }

        .italic-city {
          font-style: italic;
        }

        .hero-sub-description {
          font-size: 0.98rem;
          color: #4A3E3D;
          line-height: 1.5;
          margin-bottom: 20px;
          max-width: 520px;
        }

        .hero-cta-buttons-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .hero-primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #E88C2B;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.9rem;
          letter-spacing: 0.04em;
          padding: 12px 26px;
          border-radius: 9999px;
          box-shadow: 0 4px 16px rgba(232, 140, 43, 0.35);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hero-primary-btn:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 140, 43, 0.45);
        }

        .hero-secondary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.92);
          border: 1px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 11px 22px;
          border-radius: 9999px;
          backdrop-filter: blur(8px);
          transition: all 0.2s ease;
        }

        .hero-secondary-btn:hover {
          border-color: #E88C2B;
          color: #E88C2B;
          background: #FFFFFF;
        }

        /* Floating Booking Dock */
        .hero-booking-dock {
          position: relative;
          z-index: 10;
          margin-top: 40px;
        }

        @media (max-width: 768px) {
          .desktop-heading {
            display: none;
          }
          .mobile-heading {
            display: block;
          }
          .hero-editorial-section {
            min-height: auto;
            padding-top: 24px;
            padding-bottom: 24px;
          }
          .hero-content-container {
            margin-bottom: 20px;
          }
          .hero-booking-dock {
            margin-top: 14px;
          }
          .hero-main-heading {
            font-size: clamp(2.2rem, 7.5vw, 2.75rem);
            margin-bottom: 10px;
          }
          .hero-sub-description {
            font-size: 0.92rem;
            margin-bottom: 16px;
          }
          .desktop-call-text {
            display: none;
          }
          .hero-secondary-btn {
            width: 44px;
            height: 44px;
            padding: 0;
            border-radius: 50%;
            background: #FFFFFF;
            border: 1px solid rgba(78, 4, 1, 0.14);
            box-shadow: 0 4px 12px rgba(78, 4, 1, 0.08);
          }
        }
      `}</style>
    </section>
  );
}
