import React, { useState } from 'react';
import { Users, Briefcase, ArrowRight, ShieldCheck, Sparkles, ChevronLeft, ChevronRight, Eye, Check } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

const VEHICLES = [
  {
    id: 'suburban',
    name: 'Chevrolet Suburban High Country',
    tagline: 'Flagship Executive Full-Size SUV',
    image: '/images/suburban_img.png',
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
    image: '/images/lexus_img.png',
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

const VEHICLE_INTERIORS = {
  suburban: {
    title: 'Chevrolet Suburban High Country',
    kicker: 'EXECUTIVE SUV CABIN & CARGO',
    subtitle: 'Handcrafted jet-black leather, spacious 3-row comfort, and vast luggage clearance for up to 7 guests.',
    gallery: [
      {
        src: '/images/suburban_second-row.png',
        title: 'Executive 2nd-Row Captain Chairs',
        desc: 'Reclining leather seats with independent armrests and expansive legroom',
      },
      {
        src: '/images/suburban_third_row.png',
        title: 'Spacious 3rd-Row Seating',
        desc: 'Comfortable full-size seating for adults with dedicated rear AC climate vents',
      },
      {
        src: '/images/suburban_rear_cargo.png',
        title: 'Massive Rear Cargo Trunk',
        desc: 'Easily accommodates 6+ large suitcases and cruise luggage',
      },
      {
        src: '/images/suburban_cockpit.png',
        title: 'Chauffeur Digital Cockpit',
        desc: 'Advanced GPS navigation, FAA radar tracking, and Bose premium audio',
      },
    ],
    childSeat: {
      available: true,
      image: '/images/child_safety_carseat.jpg',
      title: 'Certified Child Safety Car Seats',
      desc: 'Sanitized Infant, Toddler, and Booster car seats pre-installed upon request.',
    },
  },
  lexus: {
    title: 'Lexus Luxury Sedan',
    kicker: 'EXECUTIVE SEDAN CABIN & CARGO',
    subtitle: 'Whisper-quiet acoustic engineering, plush perforated leather, and discreet executive comfort for up to 4 guests.',
    gallery: [
      {
        src: '/images/lexus_rear_seats.png',
        title: 'Executive Rear Passenger Cabin',
        desc: 'Whisper-quiet acoustic cabin with plush perforated leather seating',
      },
      {
        src: '/images/lexus_front_seats.png',
        title: 'Premium Front Passenger Seating',
        desc: 'Ergonomic heated and ventilated contoured luxury seating',
      },
      {
        src: '/images/lexus_trunk_cargo.png',
        title: 'Executive Luggage Trunk',
        desc: 'Deep trunk space comfortably holding up to 3 full-size bags',
      },
      {
        src: '/images/lexus_cockpit.png',
        title: 'Digital Chauffeur Cockpit',
        desc: 'Modern intuitive console, tri-zone climate controls, and flight monitoring',
      },
    ],
    childSeat: {
      available: false,
    },
  },
};

export default function FleetSection({ onSelectVehicleForBooking }) {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [interiorModalVehicle, setInteriorModalVehicle] = useState(null); // 'suburban' | 'lexus' | null

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

  const activeInterior = interiorModalVehicle ? VEHICLE_INTERIORS[interiorModalVehicle] : null;

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
                  loading="lazy"
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

                  <button
                    type="button"
                    onClick={() => setInteriorModalVehicle(v.id)}
                    className="btn-view-interior"
                    title={`View ${v.name} interior & cabin images`}
                  >
                    <Eye size={14} />
                    <span>View Cabin & Interior</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* High-Resolution Interior & Cabin Gallery Modal */}
      {interiorModalVehicle && activeInterior && (
        <div className="interior-modal-backdrop" onClick={() => setInteriorModalVehicle(null)}>
          <div className="interior-modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="modal-header">
              <div>
                <span className="modal-kicker">{activeInterior.kicker}</span>
                <h3 className="modal-title">{activeInterior.title}</h3>
                <p className="modal-subtitle">{activeInterior.subtitle}</p>
              </div>
              <button
                type="button"
                onClick={() => setInteriorModalVehicle(null)}
                className="modal-close-btn"
                aria-label="Close cabin preview"
              >
                ✕
              </button>
            </div>

            {/* Vehicle Switcher Inside Modal */}
            <div className="modal-vehicle-tabs">
              <button
                type="button"
                onClick={() => setInteriorModalVehicle('suburban')}
                className={`modal-veh-tab ${interiorModalVehicle === 'suburban' ? 'active' : ''}`}
              >
                <span>Chevrolet Suburban SUV (7 Pax)</span>
              </button>
              <button
                type="button"
                onClick={() => setInteriorModalVehicle('lexus')}
                className={`modal-veh-tab ${interiorModalVehicle === 'lexus' ? 'active' : ''}`}
              >
                <span>Lexus Luxury Sedan (4 Pax)</span>
              </button>
            </div>

            {/* 4-Photo Interior Grid */}
            <div className="modal-body-grid">
              {activeInterior.gallery.map((item, idx) => (
                <div key={idx} className="modal-media-wrap">
                  <img
                    src={item.src}
                    alt={item.title}
                    className="modal-img"
                    loading="lazy"
                  />
                  <div className="modal-caption-box">
                    <span className="modal-caption-title">{item.title}</span>
                    <span className="modal-caption-desc">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Child Seat Callout for Suburban */}
            {activeInterior.childSeat?.available && (
              <div className="modal-child-seat-bar">
                <div className="child-seat-thumb">
                  <img
                    src={activeInterior.childSeat.image}
                    alt="Sanitized Child Safety Car Seat"
                    className="child-seat-img"
                  />
                </div>
                <div className="child-seat-text">
                  <div className="child-seat-badge">FAMILY COMFORT</div>
                  <span className="child-seat-title">{activeInterior.childSeat.title}</span>
                  <span className="child-seat-desc">{activeInterior.childSeat.desc}</span>
                </div>
              </div>
            )}

            {/* Bottom Modal Actions */}
            <div className="modal-actions-bar">
              <button
                type="button"
                onClick={() => {
                  const targetVeh = interiorModalVehicle;
                  setInteriorModalVehicle(null);
                  handleSelect(targetVeh);
                }}
                className="btn-book-vehicle-modal"
              >
                <span>Book This {interiorModalVehicle === 'suburban' ? 'Suburban SUV' : 'Lexus Sedan'}</span>
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
          background: rgba(28, 12, 11, 0.78);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
          overflow-y: auto;
        }

        .interior-modal-content {
          background: #FFFFFF;
          border-radius: 24px;
          max-width: 860px;
          width: 100%;
          max-height: 90vh;
          overflow-y: auto;
          padding: 32px;
          box-shadow: 0 24px 70px rgba(0, 0, 0, 0.35);
          border: 1.5px solid rgba(232, 140, 43, 0.25);
          text-align: left;
          position: relative;
        }

        .modal-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 18px;
          gap: 16px;
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
          font-size: clamp(1.4rem, 2.5vw, 1.8rem);
          font-weight: 900;
          color: #4E0401;
          margin: 4px 0 6px 0;
          line-height: 1.2;
        }

        .modal-subtitle {
          font-size: 0.88rem;
          color: #786C6A;
          margin: 0;
          line-height: 1.5;
        }

        .modal-close-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1.5px solid rgba(78, 4, 1, 0.14);
          background: #FEFBF3;
          color: #4E0401;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }

        .modal-close-btn:hover {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        /* Vehicle Switcher Tabs Inside Modal */
        .modal-vehicle-tabs {
          display: flex;
          gap: 10px;
          margin-bottom: 20px;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          padding-bottom: 14px;
        }

        .modal-veh-tab {
          padding: 8px 16px;
          border-radius: 9999px;
          border: 1px solid rgba(78, 4, 1, 0.14);
          background: #FEFBF3;
          color: #4E0401;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .modal-veh-tab:hover {
          border-color: #E88C2B;
          color: #E88C2B;
        }

        .modal-veh-tab.active {
          background: #4E0401;
          border-color: #4E0401;
          color: #FFFFFF;
          box-shadow: 0 4px 12px rgba(78, 4, 1, 0.2);
        }

        /* 4-Photo Interior Grid */
        .modal-body-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 22px;
        }

        .modal-media-wrap {
          border-radius: 14px;
          overflow: hidden;
          background: #F9F5EC;
          border: 1.5px solid rgba(78, 4, 1, 0.08);
          display: flex;
          flex-direction: column;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .modal-media-wrap:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(78, 4, 1, 0.08);
          border-color: rgba(232, 140, 43, 0.35);
        }

        .modal-img {
          width: 100%;
          height: 190px;
          object-fit: cover;
          display: block;
        }

        .modal-caption-box {
          padding: 12px 14px;
          background: #FFFFFF;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .modal-caption-title {
          font-size: 0.86rem;
          font-weight: 800;
          color: #4E0401;
        }

        .modal-caption-desc {
          font-size: 0.76rem;
          color: #786C6A;
          line-height: 1.4;
        }

        /* Child Seat Callout */
        .modal-child-seat-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          background: #FEFBF3;
          border: 1.5px solid rgba(232, 140, 43, 0.3);
          border-radius: 14px;
          padding: 14px 18px;
          margin-bottom: 22px;
        }

        .child-seat-thumb {
          width: 64px;
          height: 64px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          border: 1px solid rgba(78, 4, 1, 0.1);
        }

        .child-seat-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .child-seat-text {
          display: flex;
          flex-direction: column;
          gap: 2px;
          text-align: left;
        }

        .child-seat-badge {
          display: inline-block;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #E88C2B;
          text-transform: uppercase;
        }

        .child-seat-title {
          font-size: 0.88rem;
          font-weight: 800;
          color: #4E0401;
        }

        .child-seat-desc {
          font-size: 0.78rem;
          color: #786C6A;
          line-height: 1.4;
        }

        /* Modal Actions */
        .modal-actions-bar {
          display: flex;
          justify-content: flex-end;
          gap: 12px;
        }

        .btn-book-vehicle-modal {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 14px 28px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(232, 140, 43, 0.35);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-book-vehicle-modal:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 140, 43, 0.45);
        }

        @media (max-width: 900px) {
          .fleet-grid-cards {
            grid-template-columns: 1fr;
          }
          .modal-body-grid {
            grid-template-columns: 1fr;
          }
          .modal-vehicle-tabs {
            flex-wrap: wrap;
          }
          .interior-modal-content {
            padding: 22px 18px;
          }
        }
      `}</style>
    </section>
  );
}
