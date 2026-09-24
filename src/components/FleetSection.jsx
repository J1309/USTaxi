import React from 'react';
import { Users, Briefcase, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import BookingWidget from './BookingWidget';
import { smoothScrollTo } from '../hooks/useLenis';

const VEHICLES = [
  {
    id: 'lexus',
    type: 'SEDAN',
    name: 'Lexus Luxury Sedan',
    image: '/images/fleet_lexus.jpg',
    passengers: 'Up to 4 Passengers',
    luggage: '3 Luggage',
    description: 'Perfect for individuals, executives & small groups. Comfortable, quiet, reliable and economical.',
    badge: 'Executive Sedan',
  },
  {
    id: 'suburban',
    type: 'SUV',
    name: 'Chevrolet Suburban',
    image: '/images/fleet_suburban.jpg',
    passengers: 'Up to 7 Passengers',
    luggage: '6 Luggage',
    description: 'More space for families, cruise groups and airport luggage. Ideal for transfers and private group travel.',
    badge: 'Luxury Full-Size SUV',
  },
];

export default function FleetSection({ onSelectVehicleForBooking }) {
  const [selectedVehicle, setSelectedVehicle] = React.useState('suburban');

  const handleSelect = (vId) => {
    setSelectedVehicle(vId);
    if (onSelectVehicleForBooking) {
      onSelectVehicleForBooking(vId);
    }
    smoothScrollTo('#fleet-booking-card');
  };

  return (
    <section id="fleet" className="fleet-booking-combined-section">
      <div className="container">
        <div className="fleet-booking-grid">
          {/* Left Column: Fleet Header & The 2 Vehicle Cards */}
          <div className="fleet-left-column">
            <div className="fleet-header-row">
              <div className="fleet-header-text">
                <span className="section-tag-gold">OUR FLEET</span>
                <h2 className="fleet-title-white">Choose Your Ride</h2>
                <p className="fleet-subtitle-gray">
                  Clean, well-maintained vehicles for a comfortable and safe journey.
                </p>
              </div>

              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo('#services');
                }}
                className="btn-view-services"
              >
                <span>View All Services</span>
                <ArrowRight size={14} />
              </a>
            </div>

            {/* The 2 Luxury Vehicle Cards matching reference styling */}
            <div className="fleet-cards-row">
              {VEHICLES.map((v) => (
                <div key={v.id} className="reference-fleet-card">
                  <div className="fleet-card-img-wrap">
                    <img src={v.image} alt={v.name} className="fleet-card-img" />
                    <span className="fleet-card-badge">{v.badge}</span>
                  </div>

                  <div className="fleet-card-content">
                    <div className="fleet-card-title-row">
                      <h3 className="fleet-card-type">{v.type}</h3>
                      <span className="fleet-card-model">{v.name}</span>
                    </div>

                    <div className="fleet-card-specs-row">
                      <div className="fleet-spec-item">
                        <Users size={15} color="#475569" />
                        <span>{v.passengers}</span>
                      </div>
                      <div className="fleet-spec-item">
                        <Briefcase size={15} color="#475569" />
                        <span>{v.luggage}</span>
                      </div>
                    </div>

                    <p className="fleet-card-desc">{v.description}</p>

                    <button
                      type="button"
                      onClick={() => handleSelect(v.id)}
                      className="fleet-card-gold-btn"
                    >
                      <span>Book This Vehicle</span>
                      <ArrowRight size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Book Your Ride Card embedded directly */}
          <div className="booking-right-column" id="fleet-booking-card">
            <BookingWidget
              preselectedVehicle={selectedVehicle}
              onSelectVehicle={setSelectedVehicle}
            />
          </div>
        </div>
      </div>

      <style>{`
        .fleet-booking-combined-section {
          background: #0A1118;
          padding: 70px 0 80px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .fleet-booking-grid {
          display: grid;
          grid-template-columns: 1fr 440px;
          gap: 36px;
          align-items: start;
        }

        .fleet-left-column {
          display: flex;
          flex-direction: column;
        }

        .fleet-header-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 32px;
          flex-wrap: wrap;
        }

        .section-tag-gold {
          font-family: var(--font-heading);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: #F59E0B;
          display: block;
          margin-bottom: 6px;
        }

        .fleet-title-white {
          font-size: clamp(2rem, 3.2vw, 2.7rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 0 0 8px 0;
        }

        .fleet-subtitle-gray {
          font-size: 0.96rem;
          color: #94A3B8;
          margin: 0;
        }

        .btn-view-services {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: var(--radius-full);
          font-size: 0.84rem;
          font-weight: 700;
          color: #E2E8F0;
          transition: all 0.18s ease;
        }

        .btn-view-services:hover {
          border-color: #F59E0B;
          color: #F59E0B;
        }

        /* 2 Fleet Cards side by side */
        .fleet-cards-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .reference-fleet-card {
          background: #FFFFFF;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.22);
          display: flex;
          flex-direction: column;
          transition: transform 0.22s ease, box-shadow 0.22s ease;
        }

        .reference-fleet-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
        }

        .fleet-card-img-wrap {
          position: relative;
          width: 100%;
          height: 200px;
          background: #F1F5F9;
          overflow: hidden;
        }

        .fleet-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          transition: transform 0.3s ease;
        }

        .reference-fleet-card:hover .fleet-card-img {
          transform: scale(1.04);
        }

        .fleet-card-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .fleet-card-content {
          padding: 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          text-align: left;
        }

        .fleet-card-title-row {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          margin-bottom: 10px;
        }

        .fleet-card-type {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 900;
          color: #0F172A;
          letter-spacing: -0.01em;
          margin: 0;
        }

        .fleet-card-model {
          font-size: 0.8rem;
          color: #64748B;
          font-weight: 600;
        }

        .fleet-card-specs-row {
          display: flex;
          align-items: center;
          gap: 16px;
          font-size: 0.82rem;
          color: #475569;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .fleet-spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .fleet-card-desc {
          font-size: 0.88rem;
          color: #64748B;
          line-height: 1.45;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .fleet-card-gold-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #F59E0B;
          color: #0F172A;
          font-weight: 800;
          font-size: 0.92rem;
          padding: 12px 18px;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(245, 158, 11, 0.25);
          transition: background 0.18s ease;
        }

        .fleet-card-gold-btn:hover {
          background: #D97706;
        }

        .booking-right-column {
          position: sticky;
          top: 96px;
        }

        @media (max-width: 1200px) {
          .fleet-booking-grid {
            grid-template-columns: 1fr;
          }
          .booking-right-column {
            position: static;
            max-width: 600px;
            width: 100%;
            margin: 0 auto;
          }
        }

        @media (max-width: 680px) {
          .fleet-cards-row {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
