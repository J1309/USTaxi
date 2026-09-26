import React from 'react';
import { MapPin, Star } from 'lucide-react';

const SERVICE_AREAS = [
  'Houston',
  'Sugar Land',
  'Katy',
  'The Woodlands',
  'Pearland',
  'Pasadena',
  'Humble',
  'Missouri City',
  'Bellaire',
  'West University',
];

export default function HoustonGuide() {
  return (
    <section className="service-areas-reviews-section">
      <div className="container">
        <div className="areas-reviews-split-grid">
          {/* Left Column: Service Areas */}
          <div className="service-areas-block">
            <div className="block-header-row">
              <div className="area-pin-icon-circle">
                <MapPin size={18} color="#D97706" />
              </div>
              <div className="block-title-wrap">
                <h3 className="block-title">Service Areas</h3>
                <p className="block-sub">Serving Houston & Surrounding Areas</p>
              </div>
            </div>

            <div className="areas-pills-wrap">
              {SERVICE_AREAS.map((area, i) => (
                <span key={i} className="area-name-pill">
                  {area}
                </span>
              ))}
            </div>
          </div>

          {/* Right Column: Customer Reviews */}
          <div className="customer-reviews-block">
            <div className="block-header-row">
              <div className="review-star-icon-circle">
                <Star size={18} color="#D97706" fill="#D97706" />
              </div>
              <div className="block-title-wrap">
                <h3 className="block-title">Customer Reviews</h3>
              </div>
            </div>

            <div className="google-review-card-clean">
              <div className="google-rating-score-row">
                <span className="google-g-logo">G</span>
                <span className="rating-num">5.0</span>
                <div className="stars-row-gold">
                  {[...Array(5)].map((_, idx) => (
                    <Star key={idx} size={15} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>

              <blockquote className="google-review-quote">
                “Excellent service from start to finish. The driver was on time, very professional and the vehicle was clean and comfortable. Highly recommended!”
              </blockquote>

              <span className="google-review-source">- Google Review</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .service-areas-reviews-section {
          background: #F8FAFC;
          padding: 60px 0;
          border-bottom: 1px solid #E2E8F0;
        }

        .areas-reviews-split-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 48px;
          align-items: start;
        }

        .service-areas-block,
        .customer-reviews-block {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 32px;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.04);
          text-align: left;
        }

        .block-header-row {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .area-pin-icon-circle,
        .review-star-icon-circle {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #FEF3C7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .block-title-wrap {
          display: flex;
          flex-direction: column;
        }

        .block-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
          -webkit-text-stroke: 0.32px currentColor;
          text-rendering: optimizeLegibility;
        }

        .block-sub {
          font-size: 0.8rem;
          color: #64748B;
          margin: 2px 0 0 0;
        }

        .areas-pills-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .area-name-pill {
          display: inline-block;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          padding: 7px 14px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          transition: background 0.15s ease, border-color 0.15s ease;
        }

        .area-name-pill:hover {
          background: #E2E8F0;
          border-color: #CBD5E1;
        }

        /* Review Card */
        .google-review-card-clean {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .google-rating-score-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .google-g-logo {
          font-family: var(--font-heading);
          font-weight: 900;
          font-size: 1.1rem;
          color: #4285F4;
          background: #EFF6FF;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .rating-num {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 800;
          color: #0F172A;
        }

        .stars-row-gold {
          display: flex;
          align-items: center;
          gap: 2px;
        }

        .google-review-quote {
          font-size: 0.92rem;
          color: #475569;
          line-height: 1.55;
          margin: 0;
          font-style: italic;
        }

        .google-review-source {
          font-size: 0.78rem;
          color: #94A3B8;
          font-weight: 600;
        }

        @media (max-width: 900px) {
          .areas-reviews-split-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
        }
      `}</style>
    </section>
  );
}
