import React from 'react';
import { ArrowRight, Phone, MessageCircle } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW } from '../utils/whatsapp';
import BookingWidget from './BookingWidget';

export default function Hero({ onSelectVehicle }) {
  const handleBookRideClick = () => {
    smoothScrollTo('#booking-engine');
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
            PREMIUM<br />
            TAXI SERVICES<br />
            <span className="orange-accent">IN HOUSTON</span>
          </h1>

          <p className="hero-sub-description">
            Luxury. Punctuality. Peace of Mind. Your journey deserves more than just a ride. Experience executive chauffeur service with hands-on owner accountability.
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
            >
              <Phone size={15} />
              <span>{OWNER_PHONE_DISPLAY}</span>
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
          min-height: 720px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: #FEFBF3;
          padding-top: 90px;
          padding-bottom: 60px;
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
          margin-bottom: 40px;
        }

        .hero-text-block {
          max-width: 650px;
          text-align: left;
        }

        .hero-kicker-tag {
          display: inline-block;
          font-family: inherit;
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          color: #E88C2B;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .hero-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(3.2rem, 5.0vw, 4.75rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.06;
          letter-spacing: -0.025em;
          margin-bottom: 18px;
          -webkit-text-stroke: 0.5px currentColor;
          text-rendering: optimizeLegibility;
        }

        .orange-accent {
          color: #E88C2B;
        }

        .hero-sub-description {
          font-size: 1.08rem;
          color: #4A3E3D;
          line-height: 1.6;
          margin-bottom: 30px;
          max-width: 540px;
        }

        .hero-cta-buttons-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .hero-primary-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.95rem;
          letter-spacing: 0.05em;
          padding: 14px 30px;
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
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-weight: 700;
          font-size: 0.92rem;
          padding: 13px 24px;
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
          margin-top: 20px;
        }

        @media (max-width: 900px) {
          .hero-editorial-section {
            padding-top: 50px;
            padding-bottom: 40px;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
