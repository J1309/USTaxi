import React, { useState, useRef } from 'react';
import { 
  Users, 
  Briefcase, 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  Phone,
  ShieldCheck,
  VolumeX,
  Maximize2
} from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { openBooking } from '../utils/bookingModal';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW } from '../utils/whatsapp';

const FLEET_DATA = [
  {
    id: 'suburban',
    name: 'Chevrolet Suburban',
    category: 'FLAGSHIP FULL-SIZE LUXURY SUV',
    tagline: 'The Pinnacle of American Executive & Airport Travel',
    image: '/images/suburban_img.png',
    passengers: 'Up to 7 Passengers',
    luggage: '6 Large Suitcases + Carry-ons',
    drive: 'Extended Wheelbase Luxury Chauffeur Edition',
    description: 'Our premier flagship SUV delivers unmatched road presence, whisper-quiet highway ride quality, and vast multi-passenger cabin room for corporate roadshows, IAH / HOU airport transfers, and Galveston cruise groups.',
    specs: [
      { label: 'SEATING CAPACITY', value: '7 Passengers', detail: 'Captain\'s chairs + full 3rd row' },
      { label: 'LUGGAGE BAY', value: '6 Large Suitcases', detail: '41.5 cu. ft. extended cargo' },
      { label: 'CHASSIS / DRIVETRAIN', value: 'Extended Wheelbase', detail: 'Magnetic ride acoustic chassis' },
      { label: 'CABIN ACOUSTICS', value: 'Whisper Quiet', detail: 'Acoustic laminated privacy glass' },
    ],
    features: [
      'Handcrafted jet-black leather interior with heated & ventilated seating',
      'Dual rear 12.6" HD executive entertainment displays with streaming connectivity',
      'Acoustic laminated privacy whisper glass for confidential conversations',
      'Tri-zone independent climate control with personal overhead ventilation',
      'Complimentary chilled bottled spring water, mints, and executive Wi-Fi hotspot',
      'High-speed multi-device USB-C fast charging accessible at all rows',
    ],
    interiorViews: [
      {
        id: 'suburban-second-row',
        title: "Second-Row Captain's Chairs",
        indexLabel: '01 OF 03',
        subtitle: 'Executive VIP Seating',
        desc: "Individual reclining captain's chairs with contoured armrests, expansive 42-inch legroom, and independent rear digital climate console.",
        src: '/images/suburban_second-row.png',
      },
      {
        id: 'suburban-third-row',
        title: 'Spacious 3rd-Row Adult Seating',
        indexLabel: '02 OF 03',
        subtitle: 'Full-Size Legroom Clearance',
        desc: 'Comfortable full-size 3-passenger third row with dedicated overhead air vents, cup holders, and individual reading illumination.',
        src: '/images/suburban_third_row.png',
      },
      {
        id: 'suburban-rear-cargo',
        title: 'Extended Rear Cargo Trunk',
        indexLabel: '03 OF 03',
        subtitle: 'Vast Luggage Clearance',
        desc: 'Expansive 41.5 cu. ft. luggage bay effortlessly accommodating 6+ large overseas bags, golf sets, strollers, and cruise luggage.',
        src: '/images/suburban_rear_cargo.png',
      },
    ],
  },
  {
    id: 'lexus',
    name: 'Lexus Luxury Sedan',
    category: 'EXECUTIVE LUXURY SEDAN',
    tagline: 'Discreet Elegance, Smooth Comfort & Hybrid Silence',
    image: '/images/lexus_img.png',
    passengers: 'Up to 4 Passengers',
    luggage: '3 Suitcases + Carry-ons',
    drive: 'Whisper-Quiet Executive Hybrid Sedan',
    description: 'Engineered for tranquil journeys across Houston. Plush perforated leather, smooth acoustic dampening, and executive prestige make it the preferred vehicle for business leaders and solo travelers.',
    specs: [
      { label: 'SEATING CAPACITY', value: '4 Passengers', detail: 'Plush contoured leather seats' },
      { label: 'LUGGAGE BAY', value: '3 Suitcases', detail: 'Deep luggage trunk + carry-ons' },
      { label: 'CHASSIS / DRIVETRAIN', value: 'Lexus Hybrid Drive', detail: 'Ultra-smooth acoustic suspension' },
      { label: 'CABIN ACOUSTICS', value: 'Silent Sanctuary', detail: 'Active cabin noise cancellation' },
    ],
    features: [
      'Whisper-quiet acoustic hybrid engineering with noise-cancelling cabin',
      'Plush perforated leather seating with lumbar contour support',
      'Rear passenger climate controls and rapid device power ports',
      'Direct curbside terminal arrival and expedited VIP pick-up',
      'Immaculate executive condition and detailed daily sanitization',
    ],
    interiorViews: [
      {
        id: 'lexus-rear-seats',
        title: 'Executive Rear Passenger Cabin',
        indexLabel: '01 OF 02',
        subtitle: 'Quiet Acoustic Sanctuary',
        desc: 'Ultra-quiet acoustic passenger compartment with soft perforated leather seating, fold-down center armrest, and rear climate vents.',
        src: '/images/lexus_rear_seats.png',
      },
      {
        id: 'lexus-trunk',
        title: 'Executive Luggage Trunk',
        indexLabel: '02 OF 02',
        subtitle: 'Deep Luggage Capacity',
        desc: 'Spacious luggage trunk easily holding 3 full-size suitcases plus briefcases, laptops, and executive carry-on bags.',
        src: '/images/lexus_trunk_cargo.png',
      },
    ],
  },
];

export default function FleetSection({ onSelectVehicleForBooking }) {
  const [activeVehicleId, setActiveVehicleId] = useState('suburban');
  const [activeInteriorIndex, setActiveInteriorIndex] = useState(0);
  const [activeMobileInteriorIndex, setActiveMobileInteriorIndex] = useState(0);
  const mobileInteriorReelRef = useRef(null);

  const activeVehicle = FLEET_DATA.find((v) => v.id === activeVehicleId) || FLEET_DATA[0];
  const activeInterior = activeVehicle.interiorViews[activeInteriorIndex] || activeVehicle.interiorViews[0];

  const handleVehicleSwitch = (vehicleId) => {
    setActiveVehicleId(vehicleId);
    setActiveInteriorIndex(0);
    setActiveMobileInteriorIndex(0);
    if (mobileInteriorReelRef.current) {
      mobileInteriorReelRef.current.scrollTo({ left: 0, behavior: 'instant' });
    }
  };

  const handleMobileInteriorScroll = () => {
    if (!mobileInteriorReelRef.current) return;
    const scrollLeft = mobileInteriorReelRef.current.scrollLeft;
    const cardWidth = mobileInteriorReelRef.current.offsetWidth * 0.86;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx >= 0 && newIdx < activeVehicle.interiorViews.length && newIdx !== activeMobileInteriorIndex) {
      setActiveMobileInteriorIndex(newIdx);
    }
  };

  const handleSelectBooking = (vId) => {
    if (onSelectVehicleForBooking) {
      onSelectVehicleForBooking(vId);
    }
    openBooking(vId);
  };

  const nextInterior = () => {
    setActiveInteriorIndex((prev) => (prev + 1) % activeVehicle.interiorViews.length);
  };

  const prevInterior = () => {
    setActiveInteriorIndex((prev) => (prev - 1 + activeVehicle.interiorViews.length) % activeVehicle.interiorViews.length);
  };

  return (
    <section id="fleet" className="luxury-fleet-section" aria-label="Executive Fleet & Interior Suite">
      <div className="container">
        
        {/* =====================================================================
            1. SECTION HEADER (NO PILLS / NO SPARKLES / THICK HEADINGS)
            ===================================================================== */}
        <header className="fleet-header-block reveal-on-scroll">
          <span className="fleet-pre-heading">THE PRIVATE FLEET</span>
          <h2 className="fleet-main-heading">
            EXCEPTIONAL VEHICLES & FIRST-CLASS INTERIORS
          </h2>
          <p className="fleet-sub-heading">
            Directly examine our private collection inside and out. Transparent passenger specifications, executive appointments, and high-resolution cabin photography.
          </p>
        </header>

        {/* =====================================================================
            2. ARCHITECTURAL VEHICLE SELECTOR
            ===================================================================== */}
        <div className="fleet-selector-track reveal-on-scroll" role="tablist" aria-label="Select vehicle model">
          {FLEET_DATA.map((v) => {
            const isActive = v.id === activeVehicleId;
            return (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleVehicleSwitch(v.id)}
                className={`fleet-selector-tab ${isActive ? 'is-active' : ''}`}
              >
                <div className="selector-tab-header">
                  <span className="selector-tab-code">
                    {v.id === 'suburban' ? '01 / FLAGSHIP SUV' : '02 / EXECUTIVE SEDAN'}
                  </span>
                  <span className="selector-tab-indicator" />
                </div>
                <div className="selector-tab-body">
                  <h3 className="selector-tab-name">{v.name}</h3>
                  <p className="selector-tab-meta">{v.passengers} · {v.luggage}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            3. VEHICLE SPECIFICATION & PRESENTATION CARD
            ===================================================================== */}
        <div className="vehicle-presentation-card reveal-on-scroll">
          <div className="vehicle-presentation-grid">
            
            {/* Left: Exterior Vehicle Photo & Telemetry Spec Grid */}
            <div className="vehicle-visual-side">
              <div className="vehicle-photo-stage">
                <div className="vehicle-stage-topbar">
                  <span className="vehicle-badge-category">{activeVehicle.category}</span>
                  <span className="vehicle-badge-edition">HOUSTON CHAUFFEUR EDITION</span>
                </div>
                <div className="vehicle-photo-canvas">
                  <img
                    src={activeVehicle.image}
                    alt={activeVehicle.name}
                    className="vehicle-exterior-img"
                    loading="lazy"
                  />
                </div>
              </div>

              {/* 4 Clean Minimalist Spec Data Blocks */}
              <div className="vehicle-specs-grid">
                {activeVehicle.specs.map((item, idx) => (
                  <div key={idx} className="spec-metric-box">
                    <span className="spec-label">{item.label}</span>
                    <strong className="spec-value">{item.value}</strong>
                    <span className="spec-detail">{item.detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Narrative Editorial, Amenities Checklist & Actions */}
            <div className="vehicle-editorial-side">
              <div className="vehicle-editorial-header">
                <span className="vehicle-tagline-lead">{activeVehicle.tagline}</span>
                <h3 className="vehicle-title-thick">{activeVehicle.name}</h3>
                <p className="vehicle-body-text">{activeVehicle.description}</p>
              </div>

              {/* Amenities */}
              <div className="vehicle-amenities-section">
                <h4 className="amenities-title-thick">CABIN HIGHLIGHTS & EXECUTIVE APPOINTMENTS</h4>
                <ul className="amenities-checklist">
                  {activeVehicle.features.map((feature, idx) => (
                    <li key={idx} className="amenity-row">
                      <div className="amenity-bullet-icon">
                        <Check size={13} strokeWidth={3} />
                      </div>
                      <span className="amenity-label">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Reservation & Phone Dispatch */}
              <div className="vehicle-action-deck">
                <button
                  type="button"
                  onClick={() => handleSelectBooking(activeVehicle.id)}
                  className="btn-reserve-luxury"
                >
                  <span>RESERVE THIS {activeVehicle.id === 'suburban' ? 'SUBURBAN' : 'LEXUS'}</span>
                  <ArrowRight size={17} strokeWidth={2.4} />
                </button>

                <a
                  href={`tel:+${OWNER_PHONE_RAW}`}
                  className="btn-dispatch-call"
                  title={`Call Chauffeur Dispatch: ${OWNER_PHONE_DISPLAY}`}
                >
                  <Phone size={15} strokeWidth={2.4} />
                  <span>CALL {OWNER_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================================
            4. FIRST-CLASS PASSENGER CABIN SUITE (REAL IN-CABIN VIEWS)
            ===================================================================== */}
        <div className="cabin-suite-container reveal-on-scroll">
          
          {/* Cabin Header */}
          <div className="cabin-suite-header">
            <div className="cabin-suite-title-block">
              <span className="cabin-suite-pre">CABIN INSPECTION</span>
              <h3 className="cabin-suite-title">
                {activeVehicle.name.toUpperCase()} · PASSENGER INTERIOR
              </h3>
              <p className="cabin-suite-subtitle">
                High-resolution interior photography of our active Houston chauffeur vehicle.
              </p>
            </div>

            {/* Viewport Nav Controls */}
            <div className="cabin-nav-controls">
              <button
                type="button"
                onClick={prevInterior}
                className="cabin-arrow-button"
                aria-label="Previous interior photo"
              >
                <ChevronLeft size={18} strokeWidth={2.4} />
              </button>
              <span className="cabin-counter-label">
                {activeInteriorIndex + 1} / {activeVehicle.interiorViews.length}
              </span>
              <button
                type="button"
                onClick={nextInterior}
                className="cabin-arrow-button"
                aria-label="Next interior photo"
              >
                <ChevronRight size={18} strokeWidth={2.4} />
              </button>
            </div>
          </div>

          {/* DESKTOP EXPERIENCE: Cinema Viewport & Thumbnails */}
          <div className="desktop-cabin-suite">
            <div className="cabin-cinema-viewport">
              <img
                src={activeInterior.src}
                alt={`${activeVehicle.name} - ${activeInterior.title}`}
                className="cabin-cinema-img"
              />
              
              {/* Architectural Caption Bar */}
              <div className="cabin-caption-plate">
                <div className="caption-plate-meta">
                  <span className="caption-perspective-tag">{activeInterior.indexLabel}</span>
                  <span className="caption-category-tag">{activeInterior.subtitle}</span>
                </div>
                <h4 className="caption-title-thick">{activeInterior.title}</h4>
                <p className="caption-desc-text">{activeInterior.desc}</p>
              </div>
            </div>

            {/* Direct Thumbnail Strip */}
            <div className="cabin-thumbnails-grid">
              {activeVehicle.interiorViews.map((view, idx) => {
                const isSelected = idx === activeInteriorIndex;
                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveInteriorIndex(idx)}
                    className={`cabin-thumb-item ${isSelected ? 'is-selected' : ''}`}
                  >
                    <div className="cabin-thumb-image-wrap">
                      <img src={view.src} alt={view.title} className="cabin-thumb-img" />
                      <span className="cabin-thumb-number">0{idx + 1}</span>
                    </div>
                    <div className="cabin-thumb-text">
                      <strong className="cabin-thumb-heading">{view.title}</strong>
                      <span className="cabin-thumb-sub">{view.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE EXPERIENCE: Touch-friendly horizontal swipe cards */}
          <div className="mobile-cabin-suite">
            <div className="mobile-cabin-counter-bar">
              <span className="mobile-swipe-hint">Swipe to inspect all perspectives</span>
              <span className="mobile-index-chip">
                {activeMobileInteriorIndex + 1} / {activeVehicle.interiorViews.length}
              </span>
            </div>

            <div 
              className="mobile-cabin-reel"
              ref={mobileInteriorReelRef}
              onScroll={handleMobileInteriorScroll}
            >
              {activeVehicle.interiorViews.map((view, idx) => (
                <div key={view.id} className="mobile-cabin-card">
                  <div className="mobile-cabin-photo">
                    <img src={view.src} alt={view.title} className="mobile-cabin-img" />
                    <span className="mobile-perspective-label">{view.indexLabel}</span>
                  </div>
                  <div className="mobile-cabin-info">
                    <span className="mobile-cabin-sub">{view.subtitle}</span>
                    <h4 className="mobile-cabin-title">{view.title}</h4>
                    <p className="mobile-cabin-desc">{view.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mobile-cabin-dots">
              {activeVehicle.interiorViews.map((_, idx) => (
                <span 
                  key={idx} 
                  className={`cabin-dot ${activeMobileInteriorIndex === idx ? 'is-active' : ''}`} 
                />
              ))}
            </div>
          </div>

          {/* Alternate Vehicle Quick Switcher */}
          <div className="fleet-alternate-bar">
            {activeVehicleId === 'suburban' ? (
              <button
                type="button"
                onClick={() => {
                  handleVehicleSwitch('lexus');
                  smoothScrollTo('#fleet');
                }}
                className="btn-alternate-vehicle"
              >
                <span>SWITCH TO LEXUS LUXURY SEDAN SPECIFICATIONS</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleVehicleSwitch('suburban');
                  smoothScrollTo('#fleet');
                }}
                className="btn-alternate-vehicle"
              >
                <span>SWITCH TO CHEVROLET SUBURBAN SPECIFICATIONS</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

        </div>

      </div>

      <style>{`
        /* ==========================================================================
           LUXURY FLEET & FIRST-CLASS INTERIORS — AESTHETIC MINIMAL REDESIGN
           ========================================================================== */
        .luxury-fleet-section {
          background: #FEFBF3;
          padding: 100px 0 110px 0;
          position: relative;
          width: 100%;
          color: #1C0C0B;
        }

        /* 1. Header */
        .fleet-header-block {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 48px auto;
        }

        .fleet-pre-heading {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #E88C2B;
          display: block;
          margin-bottom: 12px;
        }

        .fleet-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 16px;
          text-transform: uppercase;
          text-rendering: optimizeLegibility;
        }

        .fleet-sub-heading {
          font-size: 1.05rem;
          color: #5C4D4B;
          line-height: 1.65;
          max-width: 680px;
          margin: 0 auto;
        }

        /* 2. Architectural Vehicle Selector Track */
        .fleet-selector-track {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          max-width: 980px;
          margin: 0 auto 44px auto;
        }

        .fleet-selector-tab {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.12);
          border-radius: 16px;
          padding: 20px 24px;
          text-align: left;
          cursor: pointer;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(78, 4, 1, 0.04);
          position: relative;
          overflow: hidden;
        }

        .fleet-selector-tab:hover {
          border-color: #E88C2B;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(78, 4, 1, 0.08);
        }

        .fleet-selector-tab.is-active {
          background: #4E0401;
          border-color: #4E0401;
          box-shadow: 0 12px 30px rgba(78, 4, 1, 0.24);
        }

        .selector-tab-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .selector-tab-code {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #E88C2B;
          text-transform: uppercase;
        }

        .fleet-selector-tab.is-active .selector-tab-code {
          color: #FBBF24;
        }

        .selector-tab-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: rgba(78, 4, 1, 0.2);
          transition: all 0.2s ease;
        }

        .fleet-selector-tab.is-active .selector-tab-indicator {
          background: #FBBF24;
          box-shadow: 0 0 8px #FBBF24;
        }

        .selector-tab-name {
          font-family: var(--font-heading);
          font-size: 1.35rem;
          font-weight: 900;
          color: #4E0401;
          margin: 0 0 4px 0;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .fleet-selector-tab.is-active .selector-tab-name {
          color: #FFFFFF;
        }

        .selector-tab-meta {
          font-size: 0.85rem;
          color: #786C6A;
          margin: 0;
          font-weight: 600;
        }

        .fleet-selector-tab.is-active .selector-tab-meta {
          color: #E2E8F0;
        }

        /* 3. Main Vehicle Presentation Card */
        .vehicle-presentation-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.1);
          border-radius: 24px;
          padding: 44px;
          box-shadow: 0 16px 40px rgba(78, 4, 1, 0.05);
          margin-bottom: 48px;
        }

        .vehicle-presentation-grid {
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          gap: 52px;
          align-items: center;
        }

        /* Left Visual Side */
        .vehicle-visual-side {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .vehicle-photo-stage {
          background: radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F1E9DC 100%);
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 20px;
          padding: 24px;
          position: relative;
          overflow: hidden;
        }

        .vehicle-stage-topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 12px;
        }

        .vehicle-badge-category {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #4E0401;
          text-transform: uppercase;
        }

        .vehicle-badge-edition {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #E88C2B;
          text-transform: uppercase;
        }

        .vehicle-photo-canvas {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 16px 0;
        }

        .vehicle-exterior-img {
          width: 100%;
          max-height: 290px;
          object-fit: contain;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          filter: drop-shadow(0 14px 24px rgba(78, 4, 1, 0.12));
        }

        .vehicle-photo-stage:hover .vehicle-exterior-img {
          transform: scale(1.03);
        }

        /* Minimalist 4-block Spec Grid */
        .vehicle-specs-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .spec-metric-box {
          background: #FAF6EE;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 14px;
          padding: 14px 16px;
          text-align: left;
        }

        .spec-label {
          display: block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #786C6A;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .spec-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 900;
          color: #4E0401;
          line-height: 1.15;
          margin-bottom: 2px;
        }

        .spec-detail {
          display: block;
          font-size: 0.75rem;
          color: #8C7B79;
          font-weight: 600;
        }

        /* Right Editorial Side */
        .vehicle-editorial-side {
          text-align: left;
        }

        .vehicle-tagline-lead {
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #E88C2B;
          text-transform: uppercase;
          display: block;
          margin-bottom: 8px;
        }

        .vehicle-title-thick {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 2.7vw, 2.5rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
          text-transform: uppercase;
          text-rendering: optimizeLegibility;
        }

        .vehicle-body-text {
          font-size: 1rem;
          color: #5C4D4B;
          line-height: 1.65;
          margin-bottom: 26px;
        }

        /* Amenities */
        .vehicle-amenities-section {
          margin-bottom: 32px;
          border-top: 1px solid rgba(78, 4, 1, 0.08);
          padding-top: 22px;
        }

        .amenities-title-thick {
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: #786C6A;
          text-transform: uppercase;
          margin-bottom: 14px;
        }

        .amenities-checklist {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 11px;
        }

        .amenity-row {
          display: flex;
          align-items: flex-start;
          gap: 12px;
        }

        .amenity-bullet-icon {
          width: 20px;
          height: 20px;
          border-radius: 6px;
          background: #FAF6EE;
          border: 1px solid rgba(232, 140, 43, 0.4);
          color: #E88C2B;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .amenity-label {
          font-size: 0.92rem;
          font-weight: 600;
          color: #4A3E3D;
          line-height: 1.45;
        }

        /* Action Deck */
        .vehicle-action-deck {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-reserve-luxury {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 15px 30px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.35);
        }

        .btn-reserve-luxury:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(232, 140, 43, 0.48);
        }

        .btn-dispatch-call {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 14px 22px;
          border-radius: 12px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-dispatch-call:hover {
          border-color: #E88C2B;
          color: #E88C2B;
        }

        /* 4. First-Class Passenger Cabin Suite */
        .cabin-suite-container {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.1);
          border-radius: 24px;
          padding: 44px;
          box-shadow: 0 16px 40px rgba(78, 4, 1, 0.05);
        }

        .cabin-suite-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          padding-bottom: 24px;
          margin-bottom: 32px;
          text-align: left;
        }

        .cabin-suite-pre {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #E88C2B;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .cabin-suite-title {
          font-family: var(--font-heading);
          font-size: clamp(1.5rem, 2.3vw, 2rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.15;
          letter-spacing: -0.01em;
          margin: 0 0 6px 0;
          text-rendering: optimizeLegibility;
        }

        .cabin-suite-subtitle {
          font-size: 0.94rem;
          color: #786C6A;
          margin: 0;
        }

        .cabin-nav-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .cabin-arrow-button {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #FAF6EE;
          border: 1px solid rgba(78, 4, 1, 0.12);
          color: #4E0401;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .cabin-arrow-button:hover {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        .cabin-counter-label {
          font-size: 0.85rem;
          font-weight: 800;
          color: #786C6A;
          padding: 0 6px;
          font-variant-numeric: tabular-nums;
        }

        /* Desktop Viewport */
        .desktop-cabin-suite {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .cabin-cinema-viewport {
          position: relative;
          width: 100%;
          height: 500px;
          border-radius: 20px;
          overflow: hidden;
          background: #0B030A;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.22);
        }

        .cabin-cinema-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .cabin-caption-plate {
          position: absolute;
          bottom: 20px;
          left: 20px;
          right: 20px;
          background: rgba(14, 3, 16, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 16px;
          padding: 20px 26px;
          color: #FFFFFF;
          text-align: left;
        }

        .caption-plate-meta {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 6px;
        }

        .caption-perspective-tag {
          font-size: 0.70rem;
          font-weight: 900;
          letter-spacing: 0.14em;
          color: #E88C2B;
          text-transform: uppercase;
        }

        .caption-category-tag {
          font-size: 0.70rem;
          font-weight: 700;
          color: #CBD5E1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .caption-title-thick {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          color: #FFFFFF;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
        }

        .caption-desc-text {
          font-size: 0.92rem;
          color: #E2E8F0;
          line-height: 1.5;
          margin: 0;
          max-width: 820px;
        }

        /* Thumbnails Strip */
        .cabin-thumbnails-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 16px;
        }

        .cabin-thumb-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: #FAF6EE;
          border: 2px solid transparent;
          border-radius: 14px;
          padding: 8px 12px 8px 8px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .cabin-thumb-item:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 140, 43, 0.45);
        }

        .cabin-thumb-item.is-selected {
          border-color: #E88C2B;
          background: #FFFDF9;
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.18);
        }

        .cabin-thumb-image-wrap {
          position: relative;
          width: 80px;
          height: 60px;
          border-radius: 8px;
          overflow: hidden;
          background: #110204;
          flex-shrink: 0;
        }

        .cabin-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .cabin-thumb-number {
          position: absolute;
          top: 4px;
          left: 4px;
          background: rgba(0, 0, 0, 0.7);
          color: #FFFFFF;
          font-size: 0.6rem;
          font-weight: 800;
          padding: 1px 4px;
          border-radius: 4px;
        }

        .cabin-thumb-text {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .cabin-thumb-heading {
          font-family: var(--font-heading);
          font-size: 0.90rem;
          font-weight: 900;
          color: #4E0401;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .cabin-thumb-sub {
          font-size: 0.74rem;
          color: #786C6A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 2px;
        }

        /* Mobile Cabin (Hidden on Desktop) */
        .mobile-cabin-suite {
          display: none;
        }

        /* Alternate Bar */
        .fleet-alternate-bar {
          margin-top: 36px;
          padding-top: 24px;
          border-top: 1px solid rgba(78, 4, 1, 0.08);
          display: flex;
          justify-content: center;
        }

        .btn-alternate-vehicle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          color: #E88C2B;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 8px 16px;
        }

        .btn-alternate-vehicle:hover {
          color: #4E0401;
          transform: translateX(4px);
        }

        /* ==========================================================================
           RESPONSIVE REFINEMENTS
           ========================================================================== */
        @media (max-width: 1024px) {
          .vehicle-presentation-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .cabin-cinema-viewport {
            height: 420px;
          }
        }

        @media (max-width: 768px) {
          .luxury-fleet-section {
            padding: 60px 0 75px 0;
          }

          .fleet-header-block {
            text-align: left;
            margin-bottom: 28px;
          }

          .fleet-pre-heading {
            font-size: 0.72rem;
            margin-bottom: 8px;
          }

          .fleet-main-heading {
            font-size: 2rem;
            margin-bottom: 12px;
          }

          .fleet-sub-heading {
            font-size: 0.94rem;
          }

          .fleet-selector-track {
            grid-template-columns: 1fr;
            gap: 12px;
            margin-bottom: 30px;
          }

          .fleet-selector-tab {
            padding: 16px 18px;
          }

          .selector-tab-name {
            font-size: 1.2rem;
          }

          .vehicle-presentation-card,
          .cabin-suite-container {
            padding: 24px 18px;
            border-radius: 20px;
            margin-bottom: 32px;
          }

          .vehicle-photo-stage {
            padding: 16px 12px;
          }

          .vehicle-exterior-img {
            max-height: 220px;
          }

          .vehicle-specs-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .vehicle-title-thick {
            font-size: 1.7rem;
          }

          .vehicle-body-text {
            font-size: 0.92rem;
            margin-bottom: 20px;
          }

          .vehicle-action-deck {
            flex-direction: column;
            width: 100%;
          }

          .btn-reserve-luxury,
          .btn-dispatch-call {
            width: 100%;
            justify-content: center;
            text-align: center;
          }

          /* Hide desktop cabin viewport on mobile */
          .desktop-cabin-suite,
          .cabin-nav-controls {
            display: none !important;
          }

          .mobile-cabin-suite {
            display: block;
          }

          .mobile-cabin-counter-bar {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 12px;
          }

          .mobile-swipe-hint {
            font-size: 0.74rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            color: #E88C2B;
            text-transform: uppercase;
          }

          .mobile-index-chip {
            font-size: 0.74rem;
            font-weight: 800;
            color: #4E0401;
            background: #FAF6EE;
            border: 1px solid rgba(78, 4, 1, 0.1);
            padding: 2px 8px;
            border-radius: 6px;
          }

          .mobile-cabin-reel {
            display: flex;
            gap: 14px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 10px;
            margin: 0 -18px;
            padding-left: 18px;
            padding-right: 18px;
            scrollbar-width: none;
          }

          .mobile-cabin-reel::-webkit-scrollbar {
            display: none;
          }

          .mobile-cabin-card {
            flex: 0 0 85vw;
            max-width: 320px;
            scroll-snap-align: center;
            background: #FAF6EE;
            border: 1px solid rgba(78, 4, 1, 0.08);
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .mobile-cabin-photo {
            position: relative;
            width: 100%;
            height: 200px;
            background: #0B030A;
          }

          .mobile-cabin-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mobile-perspective-label {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(14, 3, 16, 0.85);
            color: #E88C2B;
            font-size: 0.65rem;
            font-weight: 900;
            letter-spacing: 0.1em;
            padding: 3px 8px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .mobile-cabin-info {
            padding: 16px;
            text-align: left;
          }

          .mobile-cabin-sub {
            font-size: 0.70rem;
            font-weight: 800;
            letter-spacing: 0.1em;
            color: #786C6A;
            text-transform: uppercase;
            display: block;
            margin-bottom: 4px;
          }

          .mobile-cabin-title {
            font-family: var(--font-heading);
            font-size: 1.15rem;
            font-weight: 900;
            color: #4E0401;
            margin-bottom: 6px;
          }

          .mobile-cabin-desc {
            font-size: 0.85rem;
            color: #5C4D4B;
            line-height: 1.45;
            margin: 0;
          }

          .mobile-cabin-dots {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 6px;
            margin-top: 14px;
          }

          .cabin-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: rgba(78, 4, 1, 0.2);
            transition: all 0.2s ease;
          }

          .cabin-dot.is-active {
            width: 20px;
            border-radius: 6px;
            background: #E88C2B;
          }
        }
      `}</style>
    </section>
  );
}
