import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithSkeleton } from './SkeletonLoader';
import { smoothScrollTo } from '../hooks/useLenis';

const DESTINATIONS = [
  {
    title: 'Houston City',
    subtitle: 'Downtown & Attractions',
    image: '/images/destination_houston.jpg',
  },
  {
    title: 'NASA Johnson',
    subtitle: 'Space Center',
    image: '/images/service_nasa.jpg',
  },
  {
    title: 'Port of Houston',
    subtitle: 'Cruise Terminal',
    image: '/images/service_cruise.jpg',
  },
];

export default function HoustonGuide() {
  const handleCardClick = () => {
    smoothScrollTo('#booking-section');
  };

  return (
    <section id="houston-guide" className="section-spacing houston-section-clean">
      <div className="container">
        <div className="houston-split-grid">
          {/* Left Column: Headline & Action strictly left-aligned */}
          <div className="houston-left-block">
            <span className="section-tag-small">EXPLORE HOUSTON</span>
            <h2 className="section-title-large">
              More Than a Ride.<br />
              Discover Houston.
            </h2>
            <p className="section-desc-sub" style={{ marginTop: '10px' }}>
              From business trips to family vacations, we take you to the heart of Houston and beyond.
            </p>

            <div style={{ marginTop: '24px' }}>
              <button
                type="button"
                onClick={() => smoothScrollTo('#booking-section')}
                className="btn-cta-gold"
              >
                <span>Book a Ride</span>
                <ArrowRight size={16} />
              </button>
            </div>
          </div>

          {/* Right Column: 3 Destination Cards */}
          <div className="houston-cards-triplet">
            {DESTINATIONS.map((dest, i) => (
              <div
                key={i}
                className="dest-clean-card"
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
              >
                <div className="dest-image-box">
                  <ImageWithSkeleton
                    src={dest.image}
                    alt={dest.title}
                    aspectRatio="4/3"
                  />
                </div>

                <div className="dest-bottom-overlay">
                  <div className="dest-title-group">
                    <h3 className="dest-card-heading">{dest.title}</h3>
                    <p className="dest-card-subheading">{dest.subtitle}</p>
                  </div>
                  <div className="dest-round-arrow">
                    <ArrowRight size={14} color="#FFFFFF" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .houston-section-clean {
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
        }
        .houston-split-grid {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 48px;
          align-items: center;
        }
        .houston-left-block {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .houston-cards-triplet {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 20px;
        }
        .dest-clean-card {
          position: relative;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: var(--shadow-sm);
          transition: all 0.2s var(--ease-snappy);
          background: #0F172A;
          border: 1px solid #E2E8F0;
        }
        .dest-clean-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }
        .dest-image-box {
          width: 100%;
          height: 100%;
        }
        .dest-bottom-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(0deg, rgba(15, 23, 42, 0.95) 0%, rgba(15, 23, 42, 0.4) 65%, transparent 100%);
          padding: 16px 14px;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          z-index: 2;
        }
        .dest-title-group {
          display: flex;
          flex-direction: column;
          text-align: left;
        }
        .dest-card-heading {
          font-size: 1rem;
          font-weight: 700;
          color: #FFFFFF;
          line-height: 1.2;
          text-align: left;
        }
        .dest-card-subheading {
          font-size: 0.76rem;
          color: #CBD5E1;
          text-align: left;
        }
        .dest-round-arrow {
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 0.15s ease;
        }
        .dest-clean-card:hover .dest-round-arrow {
          background: #0284C7;
        }

        @media (max-width: 1024px) {
          .houston-split-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
        @media (max-width: 600px) {
          .houston-cards-triplet {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
