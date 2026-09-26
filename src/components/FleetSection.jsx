import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Eye, 
  ArrowLeft,
  Check 
} from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { openBooking } from '../utils/bookingModal';

const VEHICLES = [
  {
    id: 'suburban',
    name: 'Chevrolet Suburban High Country',
    tagline: 'Flagship Executive Full-Size SUV',
    badge: 'FLAGSHIP SUV',
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
    mobileChecklist: [
      'Handcrafted jet-black leather interior',
      'Dual rear 12.6" HD entertainment displays',
      'Acoustic laminated privacy glass',
    ],
    description: 'The pinnacle of American executive travel. Spacious, powerful, and whisper-quiet for executive airport transfers, family travel, and Galveston cruise groups.',
  },
  {
    id: 'lexus',
    name: 'Lexus Luxury Sedan',
    tagline: 'Executive Luxury Sedan',
    badge: 'EXECUTIVE SEDAN',
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
    mobileChecklist: [
      'Whisper-quiet acoustic hybrid cabin',
      'Plush perforated leather seating',
      'Rear seat climate & power charging',
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
        title: "Second Row Captain's Chairs",
        desc: "Spacious and comfortable captain's chairs with premium leather seating, climate control and ample legroom for a first-class experience.",
      },
      {
        src: '/images/suburban_third_row.png',
        title: 'Spacious 3rd-Row Seating',
        desc: 'Comfortable full-size seating for adults with dedicated rear AC climate vents and individual reading lamps.',
      },
      {
        src: '/images/suburban_rear_cargo.png',
        title: 'Extended Rear Cargo Trunk',
        desc: 'Accommodates 6+ large suitcases plus carry-on bags and cruise luggage effortlessly.',
      },
      {
        src: '/images/suburban_cockpit.png',
        title: 'Chauffeur Digital Cockpit',
        desc: 'Advanced digital navigation, FAA flight tracking interface, and premium Bose surround audio.',
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
        desc: 'Whisper-quiet acoustic cabin with plush perforated leather seating and independent climate control.',
      },
      {
        src: '/images/lexus_front_seats.png',
        title: 'Premium Front Passenger Seating',
        desc: 'Ergonomic heated and ventilated contoured luxury seating designed for long-distance comfort.',
      },
      {
        src: '/images/lexus_trunk_cargo.png',
        title: 'Executive Luggage Trunk',
        desc: 'Deep trunk space comfortably holding up to 3 full-size bags and executive carry-on luggage.',
      },
      {
        src: '/images/lexus_cockpit.png',
        title: 'Digital Chauffeur Cockpit',
        desc: 'Modern intuitive console, tri-zone climate controls, and flight monitoring display.',
      },
    ],
    childSeat: {
      available: false,
    },
  },
};

export default function FleetSection({ onSelectVehicleForBooking }) {
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [interiorModalVehicle, setInteriorModalVehicle] = useState(null); // Desktop modal: 'suburban' | 'lexus' | null
  const [mobileViewingInterior, setMobileViewingInterior] = useState(false); // Mobile Screen 6
  const [mobileInteriorIndex, setMobileInteriorIndex] = useState(0);

  const handleSelect = (vId) => {
    if (onSelectVehicleForBooking) {
      onSelectVehicleForBooking(vId);
    }
    openBooking(vId);
  };

  const handleNext = () => {
    setActiveVehicleIndex((prev) => (prev + 1) % VEHICLES.length);
  };

  const handlePrev = () => {
    setActiveVehicleIndex((prev) => (prev - 1 + VEHICLES.length) % VEHICLES.length);
  };

  const currentVeh = VEHICLES[activeVehicleIndex];
  const activeInterior = interiorModalVehicle 
    ? VEHICLE_INTERIORS[interiorModalVehicle] 
    : VEHICLE_INTERIORS[currentVeh.id];

  return (
    <section id="fleet" className="fleet-reference-section">
      <div className="container">
        
        {/* =====================================================================
            TOP HEADER ROW: Title & Desktop Controls
            ===================================================================== */}
        <div className="fleet-top-bar reveal-on-scroll">
          <div className="fleet-title-block">
            <span className="fleet-kicker">OUR FLEET</span>
            <h2 className="fleet-headline">
              <span className="desktop-fleet-title">
                EXCEPTIONAL<br />
                VEHICLES FOR<br />
                EVERY JOURNEY
              </span>
              <span className="mobile-fleet-title">
                Exceptional Vehicles for Every Journey
              </span>
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

        {/* =====================================================================
            DESKTOP VIEW: 2-Column Side-by-Side Cards (100% UNTOUCHED)
            ===================================================================== */}
        <div className="fleet-grid-cards desktop-fleet-cards">
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

        {/* =====================================================================
            MOBILE VIEW (<= 768px): Screen 5 (Carousel) & Screen 6 (Interior View)
            ===================================================================== */}
        <div className="mobile-fleet-wrapper">
          
          {/* SCREEN 5: Swipeable / Scrollable Vehicle Cards (No count, smooth swipe) */}
          {!mobileViewingInterior && (
            <div className="mobile-fleet-scroll-track">
              {VEHICLES.map((v) => (
                <div key={v.id} className="mobile-vehicle-swipe-card">
                  {/* Photo Box with Badge */}
                  <div className="mobile-veh-photo-box">
                    <img
                      src={v.image}
                      alt={v.name}
                      className="mobile-veh-img"
                    />
                    <span className="mobile-veh-badge">{v.badge}</span>
                  </div>

                  {/* Body */}
                  <div className="mobile-veh-body">
                    <h3 className="mobile-veh-title">{v.name}</h3>

                    {/* Specs */}
                    <div className="mobile-specs-row">
                      <div className="mob-spec-item">
                        <Users size={14} color="#E88C2B" />
                        <span>{v.passengers}</span>
                      </div>
                      <div className="mob-spec-item">
                        <Briefcase size={14} color="#E88C2B" />
                        <span>{v.luggage}</span>
                      </div>
                    </div>

                    {/* Checklist with checkmarks */}
                    <ul className="mobile-checklist">
                      {v.mobileChecklist.map((item, i) => (
                        <li key={i} className="mob-check-item">
                          <Check size={14} color="#E88C2B" strokeWidth={2.5} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Action Buttons */}
                    <div className="mobile-veh-actions">
                      <button
                        type="button"
                        onClick={() => handleSelect(v.id)}
                        className="btn-reserve-mobile"
                      >
                        <span>Reserve Ride</span>
                        <ArrowRight size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setActiveVehicleIndex(VEHICLES.findIndex((item) => item.id === v.id));
                          setMobileViewingInterior(true);
                          setMobileInteriorIndex(0);
                        }}
                        className="btn-interior-mobile"
                      >
                        <Eye size={14} />
                        <span>View Interior</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* SCREEN 6: Vehicle Interior Detailed View */}
          {mobileViewingInterior && (
            <div className="mobile-interior-screen-view">
              
              {/* Header with Back Arrow and Counter Badge */}
              <div className="interior-screen-top-bar">
                <button
                  type="button"
                  onClick={() => setMobileViewingInterior(false)}
                  className="mobile-back-circle-btn"
                  aria-label="Back to fleet"
                >
                  <ArrowLeft size={18} color="#4E0401" />
                </button>
                <div className="interior-counter-badge">
                  {mobileInteriorIndex + 1} / {activeInterior.gallery.length}
                </div>
              </div>

              {/* Large Main Photo */}
              <div className="mobile-main-interior-frame">
                <img
                  src={activeInterior.gallery[mobileInteriorIndex].src}
                  alt={activeInterior.gallery[mobileInteriorIndex].title}
                  className="mobile-main-interior-img"
                />
              </div>

              {/* 4 Thumbnails Row */}
              <div className="mobile-thumbs-row">
                {activeInterior.gallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setMobileInteriorIndex(idx)}
                    className={`thumb-box-btn ${mobileInteriorIndex === idx ? 'active' : ''}`}
                    aria-label={`View ${thumb.title}`}
                  >
                    <img
                      src={thumb.src}
                      alt={thumb.title}
                      className="thumb-mini-img"
                    />
                  </button>
                ))}
              </div>

              {/* Title & Description */}
              <div className="mobile-interior-info-box">
                <h4 className="interior-view-heading">
                  {activeInterior.gallery[mobileInteriorIndex].title}
                </h4>
                <p className="interior-view-paragraph">
                  {activeInterior.gallery[mobileInteriorIndex].desc}
                </p>
              </div>

              {/* Bottom Reserve CTA */}
              <div className="mobile-interior-actions">
                <button
                  type="button"
                  onClick={() => handleSelect(currentVeh.id)}
                  className="btn-reserve-mobile full-width"
                >
                  <span>Reserve This {currentVeh.id === 'suburban' ? 'Suburban' : 'Lexus'}</span>
                  <ArrowRight size={15} />
                </button>
              </div>

            </div>
          )}

        </div>

      </div>

      {/* =====================================================================
          DESKTOP VIEW: High-Resolution Interior Modal (100% UNTOUCHED)
          ===================================================================== */}
      {interiorModalVehicle && activeInterior && (
        <div className="interior-modal-backdrop" onClick={() => setInteriorModalVehicle(null)}>
          <div className="interior-modal-content" onClick={(e) => e.stopPropagation()}>
            
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
        /* =====================================================================
           DESKTOP STYLES (100% PRESERVED & UNTOUCHED)
           ===================================================================== */
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

        .desktop-fleet-title {
          display: block;
        }

        .mobile-fleet-title {
          display: none;
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

        /* Desktop Modal */
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

        /* Desktop: Hide Mobile Section */
        .mobile-fleet-wrapper {
          display: none;
        }

        /* =====================================================================
           MOBILE STYLES (<= 768px): Screen 5 & Screen 6 from Mockup
           ===================================================================== */
        @media (max-width: 768px) {
          .desktop-fleet-cards {
            display: none !important;
          }

          .desktop-fleet-title {
            display: none;
          }

          .mobile-fleet-title {
            display: block;
            font-family: var(--font-heading);
            font-size: 2.1rem;
            font-weight: 900;
            color: #4E0401;
            line-height: 1.15;
            -webkit-text-stroke: 0.3px currentColor;
          }

          .fleet-intro-block {
            display: none;
          }

          .fleet-top-bar {
            margin-bottom: 24px;
          }

          .mobile-fleet-wrapper {
            display: block;
            width: 100%;
            overflow: hidden;
          }

          /* Screen 5: Carousel Card */
          .mobile-vehicle-carousel-card {
            background: #FFFFFF;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(78, 4, 1, 0.08);
            box-shadow: 0 8px 30px rgba(78, 4, 1, 0.06);
            text-align: left;
          }

          .mobile-veh-photo-box {
            position: relative;
            width: 100%;
            height: 200px;
            background: #F9F5EC;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .mobile-veh-img {
            width: 100%;
            height: 100%;
            object-fit: contain;
            padding: 12px;
          }

          .mobile-veh-badge {
            position: absolute;
            top: 12px;
            right: 12px;
            background: #4E0401;
            color: #FFFFFF;
            font-size: 0.68rem;
            font-weight: 800;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            padding: 4px 10px;
            border-radius: 6px;
          }

          .mobile-nav-arrow-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 32px;
            height: 32px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: 1px solid rgba(78, 4, 1, 0.12);
            color: #4E0401;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          }

          .mobile-nav-arrow-btn.left {
            left: 10px;
          }

          .mobile-nav-arrow-btn.right {
            right: 10px;
          }

          .mobile-veh-body {
            padding: 20px 18px;
          }

          .mobile-veh-title {
            font-family: var(--font-heading);
            font-size: 1.35rem;
            font-weight: 900;
            color: #4E0401;
            margin: 0 0 12px 0;
            line-height: 1.2;
          }

          .mobile-specs-row {
            display: flex;
            align-items: center;
            gap: 16px;
            margin-bottom: 14px;
            padding-bottom: 12px;
            border-bottom: 1px solid rgba(78, 4, 1, 0.06);
          }

          .mob-spec-item {
            display: flex;
            align-items: center;
            gap: 6px;
            font-size: 0.78rem;
            font-weight: 700;
            color: #4A3E3D;
          }

          .mobile-checklist {
            list-style: none;
            padding: 0;
            margin: 0 0 20px 0;
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .mob-check-item {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 0.8rem;
            color: #4A3E3D;
            line-height: 1.4;
          }

          .mobile-veh-actions {
            display: flex;
            align-items: center;
            gap: 10px;
            margin-bottom: 20px;
          }

          .btn-reserve-mobile {
            flex: 1.2;
            height: 44px;
            background: #E88C2B;
            color: #FFFFFF;
            font-family: inherit;
            font-size: 0.86rem;
            font-weight: 800;
            border-radius: 9999px;
            border: none;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
          }

          .btn-reserve-mobile.full-width {
            width: 100%;
            height: 48px;
            margin-top: 10px;
          }

          .btn-interior-mobile {
            flex: 1;
            height: 44px;
            background: #FFFFFF;
            border: 1px solid rgba(78, 4, 1, 0.16);
            color: #4E0401;
            font-family: inherit;
            font-size: 0.82rem;
            font-weight: 700;
            border-radius: 9999px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            cursor: pointer;
          }

          .mobile-fleet-scroll-track {
            display: flex;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            overscroll-behavior-x: contain;
            gap: 16px;
            padding: 4px 0 20px 0;
            margin: 0;
            scrollbar-width: none;
          }

          .mobile-fleet-scroll-track::-webkit-scrollbar {
            display: none;
          }

          .mobile-vehicle-swipe-card {
            min-width: 90%;
            max-width: 90%;
            flex-shrink: 0;
            scroll-snap-align: center;
            background: #FFFFFF;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(78, 4, 1, 0.08);
            box-shadow: 0 8px 30px rgba(78, 4, 1, 0.06);
            text-align: left;
          }

          /* Screen 6: Detailed Interior View */
          .mobile-interior-screen-view {
            background: #FFFFFF;
            border-radius: 20px;
            overflow: hidden;
            border: 1px solid rgba(78, 4, 1, 0.08);
            box-shadow: 0 8px 30px rgba(78, 4, 1, 0.06);
            padding: 16px;
            text-align: left;
          }

          .interior-screen-top-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }

          .mobile-back-circle-btn {
            width: 34px;
            height: 34px;
            border-radius: 50%;
            background: #FEFBF3;
            border: 1px solid rgba(78, 4, 1, 0.12);
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
          }

          .interior-counter-badge {
            background: rgba(78, 4, 1, 0.85);
            color: #FFFFFF;
            font-size: 0.72rem;
            font-weight: 700;
            padding: 4px 10px;
            border-radius: 9999px;
          }

          .mobile-main-interior-frame {
            width: 100%;
            height: 240px;
            border-radius: 14px;
            overflow: hidden;
            background: #F9F5EC;
            margin-bottom: 12px;
          }

          .mobile-main-interior-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mobile-thumbs-row {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 8px;
            margin-bottom: 16px;
          }

          .thumb-box-btn {
            height: 52px;
            border-radius: 8px;
            overflow: hidden;
            border: 2px solid transparent;
            background: #F9F5EC;
            padding: 0;
            cursor: pointer;
            transition: all 0.15s ease;
          }

          .thumb-box-btn.active {
            border-color: #E88C2B;
            box-shadow: 0 0 0 2px rgba(232, 140, 43, 0.2);
          }

          .thumb-mini-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mobile-interior-info-box {
            margin-bottom: 16px;
          }

          .interior-view-heading {
            font-family: var(--font-heading);
            font-size: 1.15rem;
            font-weight: 900;
            color: #4E0401;
            margin: 0 0 6px 0;
          }

          .interior-view-paragraph {
            font-size: 0.82rem;
            color: #786C6A;
            line-height: 1.5;
            margin: 0;
          }
        }
      `}</style>
    </section>
  );
}
