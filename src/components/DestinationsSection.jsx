import React from 'react';
import { ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

import { openBooking } from '../utils/bookingModal';

const DESTINATIONS = [
  {
    id: 'airports',
    title: 'Airports',
    subtitle: 'IAH Bush & Hobby (HOU)',
    image: '/images/service_airport.jpg',
  },
  {
    id: 'business',
    title: 'Business Districts',
    subtitle: 'Downtown & Galleria',
    image: '/images/destination_houston.jpg',
  },
  {
    id: 'hotels',
    title: 'Hotels & Medical',
    subtitle: 'TMC, Post Oak & Luxury Stays',
    image: '/images/service_corporate.jpg',
  },
  {
    id: 'tourist',
    title: 'Tourist & Cruises',
    subtitle: 'Galveston Port & Space Center',
    image: '/images/service_cruise.jpg',
  },
];

export default function DestinationsSection() {
  const handleDestinationClick = () => {
    openBooking('suburban');
  };

  return (
    <section id="destinations" className="destinations-maroon-section">
      <div className="destinations-skyline-bg" />

      <div className="container destinations-container">
        {/* Desktop Layout Grid (Visible > 768px) */}
        <div className="destinations-layout-grid">
          {/* Left Column: Heading & Button */}
          <div className="destinations-left-block reveal-on-scroll">
            <span className="destinations-kicker">POPULAR DESTINATIONS</span>
            <h2 className="destinations-headline">
              EXPLORE<br />
              THE CITY<br />
              IN COMFORT
            </h2>

            <p className="destinations-sub-text">
              Direct point-to-point luxury transfers across Greater Houston, Texas Medical Center, and Galveston Island with zero surge pricing.
            </p>

            <button
              type="button"
              onClick={handleDestinationClick}
              className="btn-view-destinations"
            >
              <span>VIEW ALL DESTINATIONS</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right Column: 4 Vertical Destination Cards */}
          <div className="destinations-cards-quad">
            {DESTINATIONS.map((d, idx) => (
              <div
                key={d.id}
                className={`destination-vertical-card reveal-on-scroll reveal-delay-${idx + 1}`}
                onClick={handleDestinationClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleDestinationClick();
                  }
                }}
              >
                <img
                  src={d.image}
                  alt={d.title}
                  className="dest-card-bg-img"
                />
                <div className="dest-card-gradient-overlay" />

                <div className="dest-card-label-box">
                  <span className="dest-card-title">{d.title}</span>
                  <span className="dest-card-sub">{d.subtitle}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile-Only Layout (Screen 7 - Visible ONLY on <= 768px) */}
        <div className="mobile-destinations-layout">
          <div className="destinations-mobile-header reveal-on-scroll">
            <span className="destinations-kicker">POPULAR DESTINATIONS</span>
            <h2 className="destinations-mobile-title">Explore the City in Comfort</h2>
            <p className="destinations-mobile-sub">
              Direct point-to-point luxury transfers across Greater Houston, Texas Medical Center, and Galveston Island with zero surge pricing.
            </p>
          </div>

          {/* Featured Large Card: Business Districts */}
          <div 
            className="mob-featured-dest-card"
            onClick={handleDestinationClick}
            role="button"
            tabIndex={0}
          >
            <img
              src="/images/destination_houston.jpg"
              alt="Business Districts Downtown & Galleria"
              className="mob-feat-bg-img"
            />
            <div className="mob-feat-gradient-overlay" />
            <div className="mob-feat-content">
              <div>
                <h3 className="mob-feat-title">Business Districts</h3>
                <p className="mob-feat-sub">Downtown & Galleria</p>
              </div>
              <div className="mob-feat-circle-btn">
                <ArrowRight size={16} color="#4E0401" />
              </div>
            </div>
          </div>

          {/* 3 Compact Columns Row Below */}
          <div className="mob-compact-dest-row">
            <div 
              className="mob-compact-dest-card"
              onClick={handleDestinationClick}
              role="button"
              tabIndex={0}
            >
              <img src="/images/service_airport.jpg" alt="Airports" className="mob-compact-img" />
              <div className="mob-compact-overlay" />
              <div className="mob-compact-info">
                <h4 className="mob-compact-title">Airports</h4>
                <p className="mob-compact-sub">IAH & HOU</p>
              </div>
            </div>

            <div 
              className="mob-compact-dest-card"
              onClick={handleDestinationClick}
              role="button"
              tabIndex={0}
            >
              <img src="/images/service_corporate.jpg" alt="Hotels & Medical" className="mob-compact-img" />
              <div className="mob-compact-overlay" />
              <div className="mob-compact-info">
                <h4 className="mob-compact-title">Hotels & Medical</h4>
                <p className="mob-compact-sub">TMC & Luxury</p>
              </div>
            </div>

            <div 
              className="mob-compact-dest-card"
              onClick={handleDestinationClick}
              role="button"
              tabIndex={0}
            >
              <img src="/images/service_cruise.jpg" alt="Tourist & Cruises" className="mob-compact-img" />
              <div className="mob-compact-overlay" />
              <div className="mob-compact-info">
                <h4 className="mob-compact-title">Tourist & Cruises</h4>
                <p className="mob-compact-sub">Galveston & Space</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .destinations-maroon-section {
          position: relative;
          background: #4E0401;
          background: linear-gradient(135deg, #4E0401 0%, #350200 60%, #200100 100%);
          padding: 95px 0 105px 0;
          overflow: hidden;
          color: #FFFFFF;
        }

        .destinations-skyline-bg {
          position: absolute;
          inset: 0;
          background-image: url('/images/destination_houston.jpg');
          background-size: cover;
          background-position: center;
          opacity: 0.12;
          mix-blend-mode: luminosity;
          pointer-events: none;
        }

        .destinations-container {
          position: relative;
          z-index: 2;
        }

        .destinations-layout-grid {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 48px;
          align-items: center;
        }

        /* Left Side */
        .destinations-left-block {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .destinations-kicker {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #E88C2B;
          margin-bottom: 14px;
          display: block;
        }

        .destinations-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 3.4rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 18px 0;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .destinations-sub-text {
          font-size: 0.96rem;
          color: rgba(254, 251, 243, 0.8);
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 340px;
        }

        .btn-view-destinations {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 13px 26px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(232, 140, 43, 0.35);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-view-destinations:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 140, 43, 0.45);
        }

        /* Right 4 Cards Grid */
        .destinations-cards-quad {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .destination-vertical-card {
          position: relative;
          height: 310px;
          border-radius: 16px;
          overflow: hidden;
          cursor: pointer;
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
          transition: all 0.26s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .destination-vertical-card:hover {
          transform: translateY(-6px);
          border-color: #E88C2B;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
        }

        .dest-card-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .destination-vertical-card:hover .dest-card-bg-img {
          transform: scale(1.08);
        }

        .dest-card-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(78, 4, 1, 0.1) 0%,
            rgba(53, 2, 0, 0.4) 45%,
            rgba(32, 1, 0, 0.92) 100%
          );
          transition: background 0.3s ease;
        }

        .destination-vertical-card:hover .dest-card-gradient-overlay {
          background: linear-gradient(
            180deg,
            rgba(78, 4, 1, 0.05) 0%,
            rgba(53, 2, 0, 0.3) 40%,
            rgba(32, 1, 0, 0.95) 100%
          );
        }

        .dest-card-label-box {
          position: absolute;
          bottom: 20px;
          left: 16px;
          right: 16px;
          z-index: 2;
          text-align: left;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dest-card-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
          -webkit-text-stroke: 0.3px currentColor;
        }

        .dest-card-sub {
          font-size: 0.72rem;
          color: #E88C2B;
          font-weight: 600;
          letter-spacing: 0.02em;
        }

        .mobile-destinations-layout {
          display: none;
        }

        @media (max-width: 1100px) and (min-width: 769px) {
          .destinations-layout-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .destinations-cards-quad {
            grid-template-columns: repeat(2, 1fr);
          }
          .destination-vertical-card {
            height: 240px;
          }
        }

        /* Strictly Mobile (<= 768px): Screen 7 Layout */
        @media (max-width: 768px) {
          .destinations-maroon-section {
            padding: 55px 0 65px 0;
          }

          .destinations-layout-grid {
            display: none !important;
          }

          .mobile-destinations-layout {
            display: flex !important;
            flex-direction: column;
            gap: 20px;
          }

          .destinations-mobile-header {
            text-align: center;
            margin-bottom: 6px;
          }

          .destinations-mobile-title {
            font-family: var(--font-heading);
            font-size: 2.1rem;
            font-weight: 900;
            color: #FFFFFF;
            line-height: 1.15;
            margin: 6px 0 10px 0;
            -webkit-text-stroke: 0.3px currentColor;
          }

          .destinations-mobile-sub {
            font-size: 0.88rem;
            color: rgba(255, 255, 255, 0.78);
            line-height: 1.5;
            margin: 0;
          }

          /* Featured Top Card */
          .mob-featured-dest-card {
            position: relative;
            width: 100%;
            height: 220px;
            border-radius: 18px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.16);
            box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
            cursor: pointer;
          }

          .mob-feat-bg-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mob-feat-gradient-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(32, 1, 0, 0.1) 0%,
              rgba(32, 1, 0, 0.5) 50%,
              rgba(32, 1, 0, 0.95) 100%
            );
          }

          .mob-feat-content {
            position: absolute;
            bottom: 16px;
            left: 16px;
            right: 16px;
            display: flex;
            align-items: flex-end;
            justify-content: space-between;
            z-index: 2;
          }

          .mob-feat-title {
            font-family: var(--font-heading);
            font-size: 1.25rem;
            font-weight: 900;
            color: #FFFFFF;
            margin: 0 0 4px 0;
            -webkit-text-stroke: 0.3px currentColor;
          }

          .mob-feat-sub {
            font-size: 0.78rem;
            color: #E88C2B;
            font-weight: 700;
            margin: 0;
          }

          .mob-feat-circle-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          }

          /* 3 Compact Row Below */
          .mob-compact-dest-row {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }

          .mob-compact-dest-card {
            position: relative;
            height: 120px;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid rgba(255, 255, 255, 0.12);
            cursor: pointer;
          }

          .mob-compact-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mob-compact-overlay {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              180deg,
              rgba(32, 1, 0, 0.2) 0%,
              rgba(32, 1, 0, 0.88) 100%
            );
          }

          .mob-compact-info {
            position: absolute;
            bottom: 8px;
            left: 8px;
            right: 8px;
            z-index: 2;
            text-align: left;
          }

          .mob-compact-title {
            font-size: 0.76rem;
            font-weight: 800;
            color: #FFFFFF;
            margin: 0 0 2px 0;
            line-height: 1.15;
          }

          .mob-compact-sub {
            font-size: 0.62rem;
            color: #E88C2B;
            font-weight: 600;
            margin: 0;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      `}</style>
    </section>
  );
}
