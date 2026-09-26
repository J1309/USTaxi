import React from 'react';
import { ArrowRight, Car, Plane } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

export default function Hero() {
  const handleBookRideClick = () => {
    smoothScrollTo('#fleet-booking-card');
  };

  return (
    <section id="home" className="hero-light-luxury-section">
      {/* Background Image: hero_suburban_light.jpg with Light Elegant Fade */}
      <div className="hero-bg-media">
        <img
          src="/images/hero_suburban_light.jpg"
          alt="Lavender Taxi Houston Luxury Chevrolet Suburban High Country"
          className="hero-bg-img"
        />
        <div className="hero-bg-overlay" />
      </div>

      <div className="container hero-content-container">
        {/* Left Side: Headlines, CTAs, Airport Badges */}
        <div className="hero-text-block">
          <div className="hero-eyebrow-pills">
            <span>RELIABLE</span>
            <span className="dot">•</span>
            <span>SAFE</span>
            <span className="dot">•</span>
            <span>COMFORTABLE</span>
          </div>

          <h1 className="hero-main-heading">
            Reliable Transportation<br />
            Across <span className="gold-text">Houston</span>
          </h1>

          <p className="hero-sub-description">
            Airport Transfers, Local Rides, Corporate Travel and Private Transportation — Anytime, Anywhere.
          </p>

          <div className="hero-cta-buttons-row">
            <button
              type="button"
              onClick={handleBookRideClick}
              className="hero-gold-action-btn"
            >
              <Car size={18} />
              <span>Book a Ride</span>
              <ArrowRight size={16} />
            </button>
          </div>

          <div className="hero-airports-strip">
            <div className="airport-bullet">
              <Plane size={15} color="#D97706" />
              <span>IAH Airport</span>
            </div>
            <span className="strip-divider">|</span>
            <div className="airport-bullet">
              <Plane size={15} color="#D97706" />
              <span>HOU Airport</span>
            </div>
            <span className="strip-divider">|</span>
            <div className="airport-bullet">
              <span>Houston & Surrounding Areas</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-light-luxury-section {
          position: relative;
          width: 100%;
          min-height: 580px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #FFFFFF;
          border-bottom: 1px solid #E2E8F0;
          padding: 85px 0 75px 0;
        }

        .hero-bg-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .hero-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: right center;
        }

        .hero-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.80) 0%,
            rgba(255, 255, 255, 0.62) 26%,
            rgba(255, 255, 255, 0.20) 46%,
            rgba(255, 255, 255, 0.0) 64%
          );
        }

        .hero-content-container {
          position: relative;
          z-index: 2;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .hero-text-block {
          max-width: 620px;
          text-align: left;
        }

        .hero-eyebrow-pills {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #64748B;
          margin-bottom: 14px;
        }

        .hero-eyebrow-pills .dot {
          color: #D97706;
        }

        .hero-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(3.3rem, 5.0vw, 4.75rem);
          font-weight: 900;
          color: #0F172A;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
          -webkit-text-stroke: 0.5px currentColor;
          text-rendering: optimizeLegibility;
        }

        .gold-text {
          color: #D97706;
        }

        .hero-sub-description {
          font-size: 1.05rem;
          color: #334155;
          line-height: 1.55;
          margin-bottom: 28px;
          max-width: 540px;
        }

        .hero-cta-buttons-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 32px;
        }

        .hero-gold-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #F59E0B;
          color: #0F172A;
          font-weight: 800;
          font-size: 0.98rem;
          padding: 13px 24px;
          border-radius: 8px;
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.32);
          transition: all 0.18s ease;
        }

        .hero-gold-action-btn:hover {
          background: #D97706;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.42);
        }


        .hero-airports-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #64748B;
          font-size: 0.86rem;
          font-weight: 700;
          flex-wrap: wrap;
        }

        .airport-bullet {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #1E293B;
        }

        .strip-divider {
          color: #CBD5E1;
        }

        @media (max-width: 768px) {
          .hero-light-luxury-section {
            padding: 60px 0 50px 0;
            min-height: auto;
          }
          .hero-bg-overlay {
            background: linear-gradient(
              180deg,
              rgba(255, 255, 255, 0.85) 0%,
              rgba(255, 255, 255, 0.65) 50%,
              rgba(255, 255, 255, 0.20) 100%
            );
          }
          .hero-main-heading {
            font-size: 2.3rem;
          }
          .hero-cta-buttons-row {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-gold-action-btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
