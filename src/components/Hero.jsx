import React from 'react';
import { CheckCircle2, Plane } from 'lucide-react';
import BookingWidget from './BookingWidget';

export default function Hero({ onSelectVehicle }) {
  return (
    <section id="home" className="hero-fullscreen-section">
      {/* Full-Screen Background Image Spanning 100% of the Hero Viewport */}
      <div className="hero-fullscreen-media">
        <img
          src="/images/hero_houston.jpg"
          alt="Lavender Taxi Houston Airport Chauffeur Service"
          className="hero-fullscreen-img"
        />
        {/* Crisp White Left-Fade Overlay for Legibility */}
        <div className="hero-fullscreen-overlay" />
      </div>

      <div className="container hero-fullscreen-container">
        {/* Left Column: Headlines, Trust Badges & Floating Booking Card */}
        <div className="hero-left-content-block">
          <div className="hero-eyebrow-text">
            <span>AIRPORT</span>
            <span className="dot">•</span>
            <span>CITY</span>
            <span className="dot">•</span>
            <span>BUSINESS</span>
            <span className="dot">•</span>
            <span>BEYOND</span>
          </div>

          <h1 className="hero-h1-clean">
            Houston Rides.<br />
            <span className="hero-blue-word">Made Easy.</span>
          </h1>

          <p className="hero-lead-text">
            Airport transfers, hourly rentals, NASA service, cruise terminal transportation and corporate travel — safe, comfortable and always on time.
          </p>

          <div className="hero-pills-horizontal">
            <div className="hero-pill-white">
              <CheckCircle2 size={16} color="#0284C7" />
              <span>Safe</span>
            </div>
            <div className="hero-pill-white">
              <CheckCircle2 size={16} color="#0284C7" />
              <span>Reliable</span>
            </div>
            <div className="hero-pill-white">
              <CheckCircle2 size={16} color="#0284C7" />
              <span>Professional</span>
            </div>
          </div>

          {/* Floating White Booking Widget Card */}
          <div className="hero-booking-slot">
            <BookingWidget preselectedVehicle="suburban" onSelectVehicle={onSelectVehicle} />
          </div>
        </div>

        {/* Right Corner Badges: Floating over the Full-Screen Image */}
        <div className="hero-right-overlay-elements">
          {/* Top Right Airport Signboard */}
          <div className="airport-terminal-signboard">
            <div className="signboard-icon-box">
              <Plane size={18} color="#FFFFFF" />
            </div>
            <div className="signboard-text-block">
              <div className="signboard-main">Welcome to Houston</div>
              <div className="signboard-airport">George Bush Intercontinental Airport (IAH)</div>
            </div>
          </div>

          {/* Bottom Right Chauffeur Slogan */}
          <div className="hero-cursive-slogan">
            <span>More Than a Ride.</span>
            <span className="slogan-blue"> A Better Journey.</span>
          </div>
        </div>
      </div>

      <style>{`
        .hero-fullscreen-section {
          position: relative;
          width: 100%;
          min-height: 92vh;
          min-height: 92dvh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: #F8FAFC;
          border-bottom: 1px solid #E2E8F0;
        }
        .hero-fullscreen-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        .hero-fullscreen-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center right;
        }
        .hero-fullscreen-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.97) 0%,
            rgba(255, 255, 255, 0.93) 38%,
            rgba(255, 255, 255, 0.55) 54%,
            rgba(255, 255, 255, 0.12) 72%,
            rgba(255, 255, 255, 0.0) 100%
          );
        }
        .hero-fullscreen-container {
          position: relative;
          z-index: 2;
          width: 100%;
          min-height: 86vh;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 40px;
          padding-bottom: 40px;
          gap: 40px;
        }
        .hero-left-content-block {
          max-width: 560px;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .hero-eyebrow-text {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #64748B;
          margin-bottom: 8px;
        }
        .hero-eyebrow-text .dot {
          color: #0284C7;
        }
        .hero-h1-clean {
          font-size: clamp(2.8rem, 4.4vw, 4rem);
          font-weight: 900;
          color: #0F172A;
          line-height: 1.04;
          letter-spacing: -0.03em;
          text-align: left;
          margin-bottom: 12px;
        }
        .hero-blue-word {
          color: #0284C7;
        }
        .hero-lead-text {
          font-size: 1.05rem;
          color: #334155;
          line-height: 1.55;
          text-align: left;
          max-width: 520px;
          margin-bottom: 16px;
        }
        .hero-pills-horizontal {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
          margin-bottom: 22px;
        }
        .hero-pill-white {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          font-size: 0.85rem;
          font-weight: 700;
          color: #0F172A;
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.06);
        }
        .hero-booking-slot {
          width: 100%;
        }
        .hero-right-overlay-elements {
          align-self: stretch;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: flex-end;
          padding: 20px 0;
          pointer-events: none;
        }
        .airport-terminal-signboard {
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(15, 23, 42, 0.92);
          backdrop-filter: blur(10px);
          padding: 12px 18px;
          border-radius: 12px;
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.22);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
        }
        .signboard-icon-box {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #0284C7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .signboard-main {
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: -0.01em;
        }
        .signboard-airport {
          font-size: 0.72rem;
          color: #CBD5E1;
        }
        .hero-cursive-slogan {
          pointer-events: auto;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          padding: 8px 18px;
          border-radius: 10px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 700;
          font-style: italic;
          color: #0F172A;
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.1);
        }
        .slogan-blue {
          color: #0284C7;
        }

        @media (max-width: 1100px) {
          .hero-fullscreen-container {
            flex-direction: column;
            align-items: flex-start;
          }
          .hero-right-overlay-elements {
            display: none;
          }
          .hero-fullscreen-overlay {
            background: rgba(255, 255, 255, 0.94);
          }
        }
      `}</style>
    </section>
  );
}
