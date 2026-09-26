import React, { useState } from 'react';
import { Users, Briefcase, ArrowRight, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

const VEHICLES = [
  {
    id: 'suburban',
    name: 'Chevrolet Suburban High Country',
    tagline: 'Flagship Executive Full-Size SUV',
    image: '/images/fleet_suburban.jpg',
    passengers: 'Up to 7 Passengers',
    luggage: '6 Large Suitcases',
    features: [
      'Handcrafted jet-black leather interior',
      'Dual rear 12.6" HD entertainment displays',
      'Acoustic laminated privacy whisper glass',
      'Tri-zone automatic climate control',
      'Certified child car seats available (Infant, Convertible, Booster)',
    ],
    description: 'The pinnacle of American executive travel. Spacious, powerful, and whisper-quiet for executive airport transfers, family travel, and Galveston cruise groups.',
  },
  {
    id: 'lexus',
    name: 'Lexus Luxury Sedan',
    tagline: 'Executive Luxury Sedan',
    image: '/images/fleet_lexus.jpg',
    passengers: 'Up to 4 Passengers',
    luggage: '3 Suitcases',
    features: [
      'Whisper-quiet acoustic hybrid cabin',
      'Plush perforated leather seating',
      'Rear seat climate & power charging',
      'Direct airport curbside service',
      'Immaculate executive condition',
    ],
    description: 'A perfect blend of elegance, smooth comfort, and discreet luxury for business roadshows, airport arrivals, and private city transportation.',
  },
];

export default function FleetSection({ onSelectVehicleForBooking }) {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [showInteriorModal, setShowInteriorModal] = useState(false);

  const handleSelect = (vId) => {
    if (onSelectVehicleForBooking) {
      onSelectVehicleForBooking(vId);
    }
    smoothScrollTo('#booking-engine');
  };

  const handleNext = () => {
    setActiveVehicleIndex((prev) => (prev + 1) % VEHICLES.length);
  };

  const handlePrev = () => {
    setActiveVehicleIndex((prev) => (prev - 1 + VEHICLES.length) % VEHICLES.length);
  };

  return (
    <section id="fleet" className="fleet-reference-section">
      <div className="container">
        {/* Top Header Row with Title & Controls */}
        <div className="fleet-top-bar reveal-on-scroll">
          <div className="fleet-title-block">
            <span className="fleet-kicker">OUR FLEET</span>
            <h2 className="fleet-headline">
              EXCEPTIONAL<br />
              VEHICLES FOR<br />
              EVERY JOURNEY
            </h2>
          </div>

          <div className="fleet-intro-block">
            <p className="fleet-intro-text">
              Choose from our private collection of executive vehicles, meticulously detailed and maintained to the highest standards for your comfort and safety.
            </p>

            <div className="fleet-carousel-nav">
              <button
                type="button"
                onClick={handlePrev}
                className="carousel-circle-btn"
                aria-label="Previous vehicle"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={handleNext}
                className="carousel-circle-btn"
                aria-label="Next vehicle"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* 2 Exclusive Vehicle Cards Matching Reference Grid */}
        <div className="fleet-grid-cards">
          {VEHICLES.map((v, idx) => (
            <div key={v.id} className={`fleet-vehicle-card reveal-on-scroll reveal-delay-${idx + 1}`}>
              <div className="vehicle-photo-container">
                <img
                  src={v.image}
                  alt={v.name}
                  className="vehicle-photo-img"
                />
                <span className="vehicle-tagline-badge">{v.tagline}</span>
              </div>

              <div className="vehicle-card-body">
                <div className="vehicle-card-header">
                  <h3 className="vehicle-name-title">{v.name}</h3>
                  <button
                    type="button"
                    onClick={() => handleSelect(v.id)}
                    className="vehicle-card-arrow-btn"
                    aria-label={`Select ${v.name}`}
                  >
                    <ArrowRight size={15} color="#4E0401" />
                  </button>
                </div>

                <p className="vehicle-desc-text">{v.description}</p>

                {/* Specs Row */}
                <div className="vehicle-specs-bar">
                  <div className="spec-item">
                    <Users size={14} color="#E88C2B" />
                    <span>{v.passengers}</span>
                  </div>
                  <div className="spec-item">
                    <Briefcase size={14} color="#E88C2B" />
                    <span>{v.luggage}</span>
                  </div>
                </div>

                {/* Feature Checklist */}
                <ul className="vehicle-amenity-list">
                  {v.features.slice(0, 3).map((feat, i) => (
                    <li key={i} className="amenity-item">
                      <span className="amenity-bullet">•</span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Bottom Actions */}
                <div className="vehicle-card-actions">
                  <button
                    type="button"
                    onClick={() => handleSelect(v.id)}
                    className="btn-book-vehicle"
                  >
                    <span>Reserve Ride</span>
                    <ArrowRight size={14} />
                  </button>

                  {v.id === 'suburban' && (
                    <button
                      type="button"
                      onClick={() => setShowInteriorModal(true)}
                      className="btn-view-interior"
                    >
                      <Eye size={14} />
                      <span>Cabin & Car Seats</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Interior & Child Safety Modal */}
      {showInteriorModal && (
        <div className="interior-modal-backdrop" onClick={() => setShowInteriorModal(false)}>
          <div className="interior-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-kicker">EXECUTIVE CABIN PREVIEW</span>
                <h3 className="modal-title">Suburban High Country & Child Safety</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowInteriorModal(false)}
                className="modal-close-btn"
              >
                ✕
              </button>
            </div>

            <div className="modal-body-grid">
              <div className="modal-media-wrap">
                <img
                  src="/images/suburban_interior.jpg"
                  alt="Chevrolet Suburban High Country Interior"
                  className="modal-img"
                />
                <span className="modal-caption">Jet-Black Handcrafted Leather Cabin</span>
              </div>

              <div className="modal-media-wrap">
                <img
                  src="/images/child_safety_carseat.jpg"
                  alt="Certified Child Car Seat"
                  className="modal-img"
                />
                <span className="modal-caption">Sanitized Certified Car Seats On Request</span>
              </div>
            </div>

            <div className="modal-actions-bar">
              <button
                type="button"
                onClick={() => {
                  setShowInteriorModal(false);
                  handleSelect('suburban');
                }}
                className="btn-book-vehicle"
              >
                <span>Reserve Suburban With Car Seats</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .fleet-reference-section {
          background: #FEFBF3;
          padding: 85px 0 95px 0;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
        }

        .fleet-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          margin-bottom: 45px;
          gap: 30px;
          flex-wrap: wrap;
        }

        .fleet-title-block {
          text-align: left;
        }

        .fleet-kicker {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #E88C2B;
          margin-bottom: 12px;
          display: block;
        }

        .fleet-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 3.4rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .fleet-intro-block {
          max-width: 440px;
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 16px;
        }

        .fleet-intro-text {
          font-size: 0.95rem;
          color: #786C6A;
          line-height: 1.6;
          margin: 0;
        }

        .fleet-carousel-nav {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .carousel-circle-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4E0401;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .carousel-circle-btn:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
        }

        /* 2 Vehicle Cards Grid */
        .fleet-grid-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .fleet-vehicle-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 18px;
          overflow: hidden;
          box-shadow: 0 6px 20px rgba(78, 4, 1, 0.04);
          transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          display: flex;
          flex-direction: column;
        }

        .fleet-vehicle-card:hover {
          transform: translateY(-5px);
          border-color: rgba(232, 140, 43, 0.4);
          box-shadow: 0 16px 36px -8px rgba(78, 4, 1, 0.12);
        }

        .vehicle-photo-container {
          position: relative;
          width: 100%;
          height: 240px;
          background: #F9F5EC;
          overflow: hidden;
        }

        .vehicle-photo-img {
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 16px;
          transition: transform 0.35s ease;
        }

        .fleet-vehicle-card:hover .vehicle-photo-img {
          transform: scale(1.04);
        }

        .vehicle-tagline-badge {
          position: absolute;
          top: 14px;
          right: 14px;
          background: rgba(78, 4, 1, 0.9);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 4px 10px;
          border-radius: 9999px;
          border: 1px solid rgba(232, 140, 43, 0.3);
        }

        .vehicle-card-body {
          padding: 26px 24px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .vehicle-card-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 10px;
        }

        .vehicle-name-title {
          font-family: var(--font-heading);
          font-size: 1.38rem;
          font-weight: 900;
          color: #4E0401;
          margin: 0;
          line-height: 1.2;
          -webkit-text-stroke: 0.38px currentColor;
          text-rendering: optimizeLegibility;
        }

        .vehicle-card-arrow-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }

        .fleet-vehicle-card:hover .vehicle-card-arrow-btn {
          background: #E88C2B;
          border-color: #E88C2B;
          transform: translateX(3px);
        }

        .fleet-vehicle-card:hover .vehicle-card-arrow-btn svg {
          stroke: #FFFFFF;
        }

        .vehicle-desc-text {
          font-size: 0.9rem;
          color: #786C6A;
          line-height: 1.55;
          margin-bottom: 16px;
        }

        .vehicle-specs-bar {
          display: flex;
          align-items: center;
          gap: 18px;
          padding-bottom: 14px;
          margin-bottom: 14px;
          border-bottom: 1px solid rgba(78, 4, 1, 0.06);
        }

        .spec-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #4A3E3D;
        }

        .vehicle-amenity-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 22px;
          flex-grow: 1;
        }

        .amenity-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.84rem;
          color: #4A3E3D;
          line-height: 1.4;
        }

        .amenity-bullet {
          color: #E88C2B;
          font-weight: bold;
        }

        .vehicle-card-actions {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-wrap: wrap;
        }

        .btn-book-vehicle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.86rem;
          font-weight: 800;
          padding: 11px 20px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 12px rgba(232, 140, 43, 0.28);
          transition: all 0.18s ease;
        }

        .btn-book-vehicle:hover {
          background: #D2791C;
          transform: translateY(-1px);
        }

        .btn-view-interior {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.16);
          color: #4E0401;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 10px 16px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .btn-view-interior:hover {
          border-color: #E88C2B;
          color: #E88C2B;
          background: #FDF3E7;
        }

        /* Modal Styles */
        .interior-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 2000;
          background: rgba(28, 12, 11, 0.75);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .interior-modal-content {
          background: #FFFFFF;
          border-radius: 20px;
          max-width: 800px;
          width: 100%;
          padding: 32px;
          box-shadow: 0 24px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(232, 140, 43, 0.2);
          text-align: left;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .modal-kicker {
          font-size: 0.75rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #E88C2B;
          text-transform: uppercase;
        }

        .modal-title {
          font-family: var(--font-heading);
          font-size: 1.5rem;
          font-weight: 900;
          color: #4E0401;
          margin: 4px 0 0 0;
        }

        .modal-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #EFE8DC;
          background: #FEFBF3;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .modal-body-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 24px;
        }

        .modal-media-wrap {
          border-radius: 12px;
          overflow: hidden;
          background: #F9F5EC;
          border: 1px solid #EFE8DC;
        }

        .modal-img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
        }

        .modal-caption {
          display: block;
          padding: 10px 14px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #4E0401;
          background: #FEFBF3;
        }

        .modal-actions-bar {
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 900px) {
          .fleet-grid-cards {
            grid-template-columns: 1fr;
          }
          .modal-body-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
