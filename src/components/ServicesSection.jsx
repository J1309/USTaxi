import React from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

const AIRPORTS = [
  {
    id: 'iah',
    title: 'George Bush Intercontinental Airport (IAH)',
    image: '/images/service_airport.jpg',
    features: [
      'Airport pickup & drop-off',
      'Flight monitoring',
      'Luggage assistance',
      'Professional drivers',
    ],
  },
  {
    id: 'hou',
    title: 'William P. Hobby Airport (HOU)',
    image: '/images/destination_houston.jpg',
    features: [
      'Airport pickup & drop-off',
      'Flight monitoring',
      'Luggage assistance',
      'Professional drivers',
    ],
  },
];

export default function ServicesSection() {
  const handleBookAirport = () => {
    smoothScrollTo('#fleet-booking-card');
  };

  return (
    <section id="services" className="airport-transfers-section">
      <div className="container">
        <div className="airport-transfers-layout">
          {/* Left Column: Headlines & CTA */}
          <div className="airport-left-info">
            <span className="section-tag-small">HOUSTON AIRPORT TRANSPORTATION</span>
            <h2 className="airport-heading-text">IAH & HOU Airport Transfers</h2>
            <p className="airport-desc-text">
              Reliable and on-time airport pickup and drop-off services. We track your flight and ensure a smooth, comfortable ride to or from the airport.
            </p>

            <button
              type="button"
              onClick={handleBookAirport}
              className="airport-gold-btn"
            >
              <span>Book Airport Transfer</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right Column: The 2 Airport Cards */}
          <div className="airport-cards-grid">
            {AIRPORTS.map((airport) => (
              <div key={airport.id} className="airport-item-card">
                <div className="airport-card-img-box">
                  <img
                    src={airport.image}
                    alt={airport.title}
                    className="airport-img"
                  />
                </div>

                <div className="airport-card-body">
                  <h3 className="airport-card-title">{airport.title}</h3>
                  <ul className="airport-checklist">
                    {airport.features.map((feat, i) => (
                      <li key={i} className="airport-check-item">
                        <span className="check-icon-circle">
                          <Check size={12} color="#D97706" strokeWidth={3} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .airport-transfers-section {
          background: #FFFFFF;
          padding: 70px 0;
          border-bottom: 1px solid #E2E8F0;
        }

        .airport-transfers-layout {
          display: grid;
          grid-template-columns: 380px 1fr;
          gap: 48px;
          align-items: center;
        }

        .airport-left-info {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .airport-heading-text {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3vw, 2.6rem);
          font-weight: 900;
          color: #0F172A;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 8px 0 14px 0;
        }

        .airport-desc-text {
          font-size: 0.95rem;
          color: #64748B;
          line-height: 1.55;
          margin-bottom: 24px;
        }

        .airport-gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F59E0B;
          color: #0F172A;
          font-weight: 800;
          font-size: 0.92rem;
          padding: 12px 22px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(245, 158, 11, 0.28);
          transition: background 0.18s ease;
        }

        .airport-gold-btn:hover {
          background: #D97706;
        }

        /* 2 Airport Cards on Right */
        .airport-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .airport-item-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05);
          display: grid;
          grid-template-columns: 140px 1fr;
          align-items: center;
          text-align: left;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .airport-item-card:hover {
          border-color: #BAE6FD;
          box-shadow: 0 8px 24px rgba(2, 132, 199, 0.08);
        }

        .airport-card-img-box {
          width: 140px;
          height: 100%;
          min-height: 170px;
          background: #E2E8F0;
        }

        .airport-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .airport-card-body {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .airport-card-title {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.25;
          margin: 0;
        }

        .airport-checklist {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 0;
          padding: 0;
        }

        .airport-check-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 600;
          color: #475569;
        }

        .check-icon-circle {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #FEF3C7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        @media (max-width: 1024px) {
          .airport-transfers-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .airport-left-info {
            max-width: 600px;
          }
        }

        @media (max-width: 680px) {
          .airport-cards-grid {
            grid-template-columns: 1fr;
          }
          .airport-item-card {
            grid-template-columns: 1fr;
          }
          .airport-card-img-box {
            width: 100%;
            height: 140px;
          }
        }
      `}</style>
    </section>
  );
}
