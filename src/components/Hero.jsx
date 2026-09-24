import React from 'react';
import { ArrowRight, Phone, Car, Plane } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { OWNER_PHONE_RAW } from '../utils/whatsapp';

export default function Hero() {
  const handleBookRideClick = () => {
    smoothScrollTo('#fleet-booking');
  };

  return (
    <section id="home" className="hero-reference-section">
      {/* Background Image: sub_car_img.png with Dark Night/Dusk Overlay */}
      <div className="hero-bg-media">
        <img
          src="/images/sub_car_img.png"
          alt="Lavender Taxi Houston Luxury Chevrolet Suburban"
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

            <a
              href={`tel:+${OWNER_PHONE_RAW}`}
              className="hero-dark-outline-btn"
            >
              <Phone size={16} />
              <span>+1 (832) 879-8685</span>
            </a>
          </div>

          <div className="hero-airports-strip">
            <div className="airport-bullet">
              <Plane size={15} color="#F59E0B" />
              <span>IAH Airport</span>
            </div>
            <span className="strip-divider">|</span>
            <div className="airport-bullet">
              <Plane size={15} color="#F59E0B" />
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
        .hero-reference-section {
          position: relative;
          width: 100%;
          min-height: 560px;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #0A1118;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          padding: 80px 0 70px 0;
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
            #0A1118 0%,
            rgba(10, 17, 24, 0.95) 44%,
            rgba(10, 17, 24, 0.45) 75%,
            rgba(10, 17, 24, 0.75) 100%
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
          max-width: 640px;
          text-align: left;
        }

        .hero-eyebrow-pills {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #94A3B8;
          margin-bottom: 14px;
        }

        .hero-eyebrow-pills .dot {
          color: #F59E0B;
        }

        .hero-main-heading {
          font-size: clamp(2.6rem, 4.2vw, 3.8rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.08;
          letter-spacing: -0.025em;
          margin-bottom: 16px;
        }

        .gold-text {
          color: #F59E0B;
        }

        .hero-sub-description {
          font-size: 1.05rem;
          color: #CBD5E1;
          line-height: 1.55;
          margin-bottom: 28px;
          max-width: 580px;
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
          box-shadow: 0 4px 16px rgba(245, 158, 11, 0.3);
          transition: all 0.18s ease;
        }

        .hero-gold-action-btn:hover {
          background: #D97706;
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(245, 158, 11, 0.4);
        }

        .hero-dark-outline-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(15, 23, 42, 0.7);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.25);
          font-weight: 700;
          font-size: 0.95rem;
          padding: 13px 22px;
          border-radius: 8px;
          backdrop-filter: blur(8px);
          transition: all 0.18s ease;
        }

        .hero-dark-outline-btn:hover {
          border-color: #F59E0B;
          color: #F59E0B;
          background: rgba(15, 23, 42, 0.9);
        }

        .hero-airports-strip {
          display: flex;
          align-items: center;
          gap: 14px;
          color: #94A3B8;
          font-size: 0.85rem;
          font-weight: 600;
          flex-wrap: wrap;
        }

        .airport-bullet {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #E2E8F0;
        }

        .strip-divider {
          color: #475569;
        }

        @media (max-width: 768px) {
          .hero-reference-section {
            padding: 60px 0 50px 0;
            min-height: auto;
          }
          .hero-main-heading {
            font-size: 2.3rem;
          }
          .hero-cta-buttons-row {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-gold-action-btn,
          .hero-dark-outline-btn {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
