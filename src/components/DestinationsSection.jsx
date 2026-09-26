import React from 'react';
import { ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

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
    smoothScrollTo('#booking-engine');
  };

  return (
    <section id="destinations" className="destinations-maroon-section">
      <div className="destinations-skyline-bg" />

      <div className="container destinations-container">
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

        @media (max-width: 1100px) {
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

        @media (max-width: 580px) {
          .destinations-cards-quad {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
