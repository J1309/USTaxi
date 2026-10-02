import React, { useState } from 'react';
import { 
  Users, 
  Briefcase, 
  ArrowRight, 
  Check, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Phone,
  Sparkles,
  VolumeX,
  Compass
} from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { openBooking } from '../utils/bookingModal';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW } from '../utils/whatsapp';

const FLEET_DATA = [
  {
    id: 'suburban',
    name: 'Chevrolet Suburban High Country',
    category: 'FLAGSHIP FULL-SIZE LUXURY SUV',
    tagline: 'The Pinnacle of American Executive & Airport Travel',
    image: '/images/suburban_img.png',
    passengers: 'Up to 7 Passengers',
    luggage: '6 Large Suitcases + Carry-ons',
    drive: 'Extended Wheelbase Luxury Chauffeur Edition',
    description: 'Our premier flagship SUV delivers unmatched presence, whisper-quiet highway ride quality, and vast multi-passenger cabin room for corporate roadshows, IAH / HOU airport transfers, and Galveston cruise groups.',
    features: [
      'Handcrafted jet-black leather interior with heated & ventilated seats',
      'Dual rear 12.6" HD entertainment displays with streaming connectivity',
      'Acoustic laminated privacy whisper glass for confidential conversations',
      'Tri-zone independent climate control with personal overhead vents',
      'Sanitized certified child car seats available (Infant, Toddler, Booster)',
      'High-speed multi-device USB-C fast charging at all rows',
    ],
    interiorViews: [
      {
        id: 'suburban-second-row',
        title: "Second Row Captain's Chairs",
        badge: "CABIN PERSPECTIVE 1 OF 5",
        subtitle: "Executive VIP Seating",
        desc: "Individual reclining captain's chairs with contoured armrests, expansive 42-inch legroom, and independent rear digital climate console.",
        src: '/images/suburban_second-row.png',
      },
      {
        id: 'suburban-third-row',
        title: 'Spacious 3rd-Row Adult Seating',
        badge: 'CABIN PERSPECTIVE 2 OF 5',
        subtitle: 'Generous Full-Size Clearance',
        desc: 'Comfortable full-size 3-passenger third row with dedicated overhead air vents, cup holders, and individual reading lamps.',
        src: '/images/suburban_third_row.png',
      },
      {
        id: 'suburban-rear-cargo',
        title: 'Extended Rear Cargo Trunk',
        badge: 'CABIN PERSPECTIVE 3 OF 5',
        subtitle: 'Vast Luggage Clearance',
        desc: 'Vast 41.5 cu. ft. luggage bay effortlessly accommodating 6+ large overseas bags, golf sets, strollers, and cruise luggage.',
        src: '/images/suburban_rear_cargo.png',
      },
      {
        id: 'suburban-cockpit',
        title: 'Chauffeur Digital Cockpit',
        badge: 'CABIN PERSPECTIVE 4 OF 5',
        subtitle: 'Advanced Navigation & Flight Tracking',
        desc: 'State-of-the-art pilot console equipped with FAA real-time radar flight monitoring, GPS traffic bypass, and premium Bose acoustics.',
        src: '/images/suburban_cockpit.png',
      },
      {
        id: 'suburban-child-seat',
        title: 'Certified Child Safety Car Seat',
        badge: 'CABIN PERSPECTIVE 5 OF 5',
        subtitle: 'Sanitized & Safety Inspected',
        desc: 'Sanitized, high-rated Infant, Convertible, and Booster seats professionally anchored upon request for safe family travel.',
        src: '/images/child_safety_carseat.jpg',
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
        badge: 'CABIN PERSPECTIVE 1 OF 4',
        subtitle: 'Quiet Acoustic Sanctuary',
        desc: 'Ultra-quiet acoustic passenger compartment with soft perforated leather seating, fold-down center armrest, and rear climate vents.',
        src: '/images/lexus_rear_seats.png',
      },
      {
        id: 'lexus-front-seats',
        title: 'Premium Front Passenger Seating',
        badge: 'CABIN PERSPECTIVE 2 OF 4',
        subtitle: 'Ergonomic Luxury Contours',
        desc: 'Contoured heated and ventilated power bucket seating tailored for long-distance comfort and smooth posture support.',
        src: '/images/lexus_front_seats.png',
      },
      {
        id: 'lexus-trunk',
        title: 'Executive Luggage Trunk',
        badge: 'CABIN PERSPECTIVE 3 OF 4',
        subtitle: 'Deep Luggage Capacity',
        desc: 'Spacious luggage trunk easily holding 3 full-size suitcases plus briefcases, laptops, and executive carry-on bags.',
        src: '/images/lexus_trunk_cargo.png',
      },
      {
        id: 'lexus-cockpit',
        title: 'Digital Chauffeur Cockpit',
        badge: 'CABIN PERSPECTIVE 4 OF 4',
        subtitle: 'Modern Intuitive Controls',
        desc: 'Sleek multimedia console featuring digital navigation, live flight updates, and hands-free route coordination.',
        src: '/images/lexus_cockpit.png',
      },
    ],
  },
];

export default function FleetSection({ onSelectVehicleForBooking }) {
  const [activeVehicleId, setActiveVehicleId] = useState('suburban');
  const [activeInteriorIndex, setActiveInteriorIndex] = useState(0);

  const activeVehicle = FLEET_DATA.find((v) => v.id === activeVehicleId) || FLEET_DATA[0];
  const activeInterior = activeVehicle.interiorViews[activeInteriorIndex] || activeVehicle.interiorViews[0];

  const handleVehicleSwitch = (vehicleId) => {
    setActiveVehicleId(vehicleId);
    setActiveInteriorIndex(0);
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
    <section id="fleet" className="dedicated-fleet-interior-section">
      <div className="container">
        
        {/* =====================================================================
            1. SECTION HEADER
            ===================================================================== */}
        <div className="fleet-header-block reveal-on-scroll">
          <div className="fleet-kicker-badge">
            <Sparkles size={14} color="#E88C2B" />
            <span>OUR FLEET & CABIN INTERIORS</span>
          </div>
          <h2 className="fleet-main-heading">
            Exceptional Vehicles & First-Class Interiors
          </h2>
          <p className="fleet-sub-heading">
            Directly examine our private collection inside and out. View complete passenger specs, executive amenities, and high-resolution interior cabin views below.
          </p>
        </div>

        {/* =====================================================================
            2. LUXURY VEHICLE SELECTOR TABS
            ===================================================================== */}
        <div className="fleet-vehicle-tabs-bar reveal-on-scroll">
          {FLEET_DATA.map((v) => {
            const isActive = v.id === activeVehicleId;
            return (
              <button
                key={v.id}
                type="button"
                onClick={() => handleVehicleSwitch(v.id)}
                className={`fleet-tab-btn ${isActive ? 'active' : ''}`}
                aria-pressed={isActive}
              >
                <div className="tab-btn-content">
                  <span className="tab-bullet">{isActive ? '✦' : '•'}</span>
                  <div className="tab-text-group">
                    <span className="tab-name">{v.name}</span>
                    <span className="tab-meta">{v.passengers} · {v.category.includes('SUV') ? 'Flagship SUV' : 'Luxury Sedan'}</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            3. PART A: VEHICLE OVERVIEW & SPECS CARD
            ===================================================================== */}
        <div className="vehicle-overview-card reveal-on-scroll">
          <div className="vehicle-overview-grid">
            
            {/* Left: Exterior Vehicle Photo with Floating Badge */}
            <div className="vehicle-photo-column">
              <div className="vehicle-photo-wrapper">
                <img
                  src={activeVehicle.image}
                  alt={activeVehicle.name}
                  className="vehicle-exterior-img"
                  loading="lazy"
                />
                <div className="vehicle-category-floating-badge">
                  <span>{activeVehicle.category}</span>
                </div>
              </div>

              {/* Quick Spec Metric Badges */}
              <div className="vehicle-specs-row">
                <div className="spec-pill">
                  <Users size={16} color="#E88C2B" />
                  <span className="spec-text">{activeVehicle.passengers}</span>
                </div>
                <div className="spec-pill">
                  <Briefcase size={16} color="#E88C2B" />
                  <span className="spec-text">{activeVehicle.luggage}</span>
                </div>
                <div className="spec-pill">
                  <VolumeX size={16} color="#E88C2B" />
                  <span className="spec-text">Whisper Quiet</span>
                </div>
              </div>
            </div>

            {/* Right: Vehicle Details, Amenities, & Action CTA */}
            <div className="vehicle-details-column">
              <span className="vehicle-tagline-kicker">{activeVehicle.tagline}</span>
              <h3 className="vehicle-headline-name">{activeVehicle.name}</h3>
              <p className="vehicle-body-description">{activeVehicle.description}</p>

              {/* Amenity Checklist */}
              <div className="vehicle-amenities-group">
                <h4 className="amenities-subheading">EXECUTIVE AMENITIES & CABIN HIGHLIGHTS</h4>
                <ul className="amenities-list">
                  {activeVehicle.features.map((feature, idx) => (
                    <li key={idx} className="amenity-item">
                      <div className="check-icon-circle">
                        <Check size={12} color="#FFFFFF" strokeWidth={3} />
                      </div>
                      <span className="amenity-text">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Booking & Dispatch Row */}
              <div className="vehicle-card-action-bar">
                <button
                  type="button"
                  onClick={() => handleSelectBooking(activeVehicle.id)}
                  className="btn-reserve-vehicle-gold"
                >
                  <span>Reserve This {activeVehicle.id === 'suburban' ? 'Suburban' : 'Lexus'}</span>
                  <ArrowRight size={16} />
                </button>

                <a
                  href={`tel:+${OWNER_PHONE_RAW}`}
                  className="btn-call-dispatch-outline"
                  title={`Call ${OWNER_PHONE_DISPLAY}`}
                >
                  <Phone size={15} />
                  <span>Call {OWNER_PHONE_DISPLAY}</span>
                </a>
              </div>
            </div>

          </div>
        </div>

        {/* =====================================================================
            4. PART B: DEDICATED IN-PAGE CABIN & INTERIOR GALLERY
               (Zero clicks/modals required: visible directly on the page!)
            ===================================================================== */}
        <div className="dedicated-interior-suite-box reveal-on-scroll">
          
          {/* Interior Suite Header */}
          <div className="interior-suite-header">
            <div className="suite-header-left">
              <span className="suite-kicker">FIRST-CLASS CABIN SUITE</span>
              <h3 className="suite-title">
                {activeVehicle.name} · Real Cabin Interior Views
              </h3>
              <p className="suite-subtitle">
                High-resolution interior photography of our active Houston chauffeur vehicle.
              </p>
            </div>

            {/* Desktop Navigation Arrows for Featured View */}
            <div className="desktop-interior-nav-arrows">
              <button
                type="button"
                onClick={prevInterior}
                className="interior-arrow-btn"
                aria-label="Previous interior photo"
              >
                <ChevronLeft size={18} />
              </button>
              <span className="interior-counter-chip">
                {activeInteriorIndex + 1} / {activeVehicle.interiorViews.length}
              </span>
              <button
                type="button"
                onClick={nextInterior}
                className="interior-arrow-btn"
                aria-label="Next interior photo"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* DESKTOP VIEW: Cinematic Featured Viewport + Direct Thumbnails Strip */}
          <div className="desktop-interior-experience">
            <div className="featured-interior-viewport">
              <img
                src={activeInterior.src}
                alt={`${activeVehicle.name} - ${activeInterior.title}`}
                className="featured-interior-img"
              />
              <div className="featured-caption-glass-pill">
                <span className="caption-badge">{activeInterior.badge}</span>
                <h4 className="caption-title">{activeInterior.title}</h4>
                <p className="caption-desc">{activeInterior.desc}</p>
              </div>
            </div>

            {/* Direct Thumbnail Cards Strip */}
            <div className="interior-thumbnails-grid">
              {activeVehicle.interiorViews.map((view, idx) => {
                const isSelected = idx === activeInteriorIndex;
                return (
                  <button
                    key={view.id}
                    type="button"
                    onClick={() => setActiveInteriorIndex(idx)}
                    className={`interior-thumb-card ${isSelected ? 'active' : ''}`}
                  >
                    <div className="thumb-photo-box">
                      <img src={view.src} alt={view.title} className="thumb-img" />
                      {isSelected && <div className="thumb-active-dot" />}
                    </div>
                    <div className="thumb-text-box">
                      <span className="thumb-title">{view.title}</span>
                      <span className="thumb-sub">{view.subtitle}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* MOBILE VIEW: Continuous Scrollable Interior Cards Reel */}
          <div className="mobile-interior-scroll-reel">
            {activeVehicle.interiorViews.map((view, idx) => (
              <div key={view.id} className="mobile-interior-card">
                <div className="mobile-interior-photo-box">
                  <img src={view.src} alt={view.title} className="mobile-interior-img" />
                  <span className="mobile-interior-badge">{view.badge}</span>
                </div>
                <div className="mobile-interior-card-body">
                  <h4 className="mobile-interior-title">{view.title}</h4>
                  <p className="mobile-interior-desc">{view.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Switcher: Quick jump to other vehicle */}
          <div className="other-vehicle-switch-bar">
            {activeVehicleId === 'suburban' ? (
              <button
                type="button"
                onClick={() => {
                  handleVehicleSwitch('lexus');
                  smoothScrollTo('#fleet');
                }}
                className="btn-switch-other-vehicle"
              >
                <span>View Lexus Luxury Sedan Specifications & Interior</span>
                <ArrowRight size={15} />
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  handleVehicleSwitch('suburban');
                  smoothScrollTo('#fleet');
                }}
                className="btn-switch-other-vehicle"
              >
                <span>View Chevrolet Suburban High Country Specifications & Interior</span>
                <ArrowRight size={15} />
              </button>
            )}
          </div>

        </div>

      </div>

      <style>{`
        /* ==========================================================================
           MAIN DEDICATED SECTION CONTAINER
           ========================================================================== */
        .dedicated-fleet-interior-section {
          background: #FEFBF3;
          padding: 85px 0 95px 0;
          position: relative;
          width: 100%;
          overflow: hidden;
        }

        /* 1. Header */
        .fleet-header-block {
          text-align: center;
          max-width: 760px;
          margin: 0 auto 36px auto;
        }

        .fleet-kicker-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(232, 140, 43, 0.12);
          border: 1px solid rgba(232, 140, 43, 0.25);
          color: #B45309;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          padding: 6px 14px;
          border-radius: 9999px;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .fleet-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(2rem, 3.4vw, 2.9rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          margin-bottom: 14px;
          text-rendering: optimizeLegibility;
        }

        .fleet-sub-heading {
          font-size: 1.02rem;
          color: #5C4D4B;
          line-height: 1.6;
          margin: 0;
        }

        /* 2. Vehicle Selector Tabs */
        .fleet-vehicle-tabs-bar {
          display: flex;
          justify-content: center;
          gap: 16px;
          margin-bottom: 40px;
          flex-wrap: wrap;
        }

        .fleet-tab-btn {
          display: flex;
          align-items: center;
          background: #FFFFFF;
          border: 2px solid rgba(78, 4, 1, 0.1);
          border-radius: 14px;
          padding: 12px 24px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 2px 10px rgba(78, 4, 1, 0.04);
        }

        .fleet-tab-btn:hover {
          border-color: #E88C2B;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(78, 4, 1, 0.08);
        }

        .fleet-tab-btn.active {
          background: #4E0401;
          border-color: #4E0401;
          box-shadow: 0 8px 24px rgba(78, 4, 1, 0.22);
        }

        .tab-btn-content {
          display: flex;
          align-items: center;
          gap: 12px;
          text-align: left;
        }

        .tab-bullet {
          font-size: 1.1rem;
          color: #E88C2B;
        }

        .fleet-tab-btn.active .tab-bullet {
          color: #FBBF24;
        }

        .tab-text-group {
          display: flex;
          flex-direction: column;
        }

        .tab-name {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #4E0401;
          line-height: 1.15;
          letter-spacing: 0.01em;
        }

        .fleet-tab-btn.active .tab-name {
          color: #FFFFFF;
        }

        .tab-meta {
          font-size: 0.74rem;
          font-weight: 700;
          color: #786C6A;
          margin-top: 2px;
        }

        .fleet-tab-btn.active .tab-meta {
          color: #E2E8F0;
        }

        /* 3. Vehicle Overview Card */
        .vehicle-overview-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.1);
          border-radius: 24px;
          padding: 38px 42px;
          box-shadow: 0 10px 32px rgba(78, 4, 1, 0.05);
          margin-bottom: 40px;
        }

        .vehicle-overview-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 48px;
          align-items: center;
        }

        .vehicle-photo-column {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .vehicle-photo-wrapper {
          position: relative;
          background: radial-gradient(circle at 50% 50%, #FAF6EE 0%, #F3ECE0 100%);
          border-radius: 18px;
          padding: 24px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid rgba(78, 4, 1, 0.06);
        }

        .vehicle-exterior-img {
          width: 100%;
          max-height: 280px;
          object-fit: contain;
          transition: transform 0.3s ease;
        }

        .vehicle-photo-wrapper:hover .vehicle-exterior-img {
          transform: scale(1.03);
        }

        .vehicle-category-floating-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: #4E0401;
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          padding: 4px 12px;
          border-radius: 9999px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
        }

        .vehicle-specs-row {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
        }

        .spec-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #FAF6EE;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 9999px;
          padding: 6px 14px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #4E0401;
        }

        .vehicle-details-column {
          text-align: left;
        }

        .vehicle-tagline-kicker {
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #E88C2B;
          text-transform: uppercase;
          display: block;
          margin-bottom: 6px;
        }

        .vehicle-headline-name {
          font-family: var(--font-heading);
          font-size: clamp(1.8rem, 2.5vw, 2.3rem);
          font-weight: 900;
          color: #4E0401;
          margin-bottom: 12px;
          text-rendering: optimizeLegibility;
        }

        .vehicle-body-description {
          font-size: 0.96rem;
          color: #5C4D4B;
          line-height: 1.6;
          margin-bottom: 22px;
        }

        .vehicle-amenities-group {
          margin-bottom: 28px;
        }

        .amenities-subheading {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #786C6A;
          margin-bottom: 12px;
          text-transform: uppercase;
        }

        .amenities-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0;
          margin: 0;
        }

        .amenity-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.9rem;
          color: #4A3E3D;
          font-weight: 600;
        }

        .check-icon-circle {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #E88C2B;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .vehicle-card-action-bar {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-reserve-vehicle-gold {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #E88C2B 0%, #D2791C 100%);
          color: #FFFFFF;
          font-size: 0.9rem;
          font-weight: 800;
          padding: 12px 24px;
          border-radius: 9999px;
          border: none;
          box-shadow: 0 4px 14px rgba(232, 140, 43, 0.35);
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-reserve-vehicle-gold:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.48);
        }

        .btn-call-dispatch-outline {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-size: 0.88rem;
          font-weight: 700;
          padding: 11px 20px;
          border-radius: 9999px;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .btn-call-dispatch-outline:hover {
          border-color: #E88C2B;
          color: #E88C2B;
        }

        /* 4. Dedicated Interior Suite Box */
        .dedicated-interior-suite-box {
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.12);
          border-radius: 24px;
          padding: 38px 42px;
          box-shadow: 0 12px 36px rgba(78, 4, 1, 0.06);
        }

        .interior-suite-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          padding-bottom: 20px;
          margin-bottom: 28px;
          text-align: left;
        }

        .suite-kicker {
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #E88C2B;
          text-transform: uppercase;
          display: block;
          margin-bottom: 4px;
        }

        .suite-title {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.2vw, 1.85rem);
          font-weight: 900;
          color: #4E0401;
          margin-bottom: 4px;
          text-rendering: optimizeLegibility;
        }

        .suite-subtitle {
          font-size: 0.9rem;
          color: #786C6A;
          margin: 0;
        }

        .desktop-interior-nav-arrows {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .interior-arrow-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FAF6EE;
          border: 1px solid rgba(78, 4, 1, 0.12);
          color: #4E0401;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .interior-arrow-btn:hover {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        .interior-counter-chip {
          font-size: 0.8rem;
          font-weight: 800;
          color: #786C6A;
          padding: 0 4px;
        }

        /* Desktop Featured Viewport */
        .desktop-interior-experience {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .featured-interior-viewport {
          position: relative;
          width: 100%;
          height: 480px;
          border-radius: 18px;
          overflow: hidden;
          background: #000000;
          box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);
        }

        .featured-interior-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .featured-caption-glass-pill {
          position: absolute;
          bottom: 18px;
          left: 18px;
          right: 18px;
          background: rgba(14, 4, 15, 0.78);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          border-radius: 14px;
          padding: 16px 22px;
          color: #FFFFFF;
          text-align: left;
        }

        .caption-badge {
          display: inline-block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #E88C2B;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .caption-title {
          font-family: var(--font-heading);
          font-size: 1.28rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 4px;
        }

        .caption-desc {
          font-size: 0.88rem;
          color: #CBD5E1;
          margin: 0;
          line-height: 1.45;
        }

        /* Thumbnails Strip */
        .interior-thumbnails-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
          gap: 14px;
        }

        .interior-thumb-card {
          display: flex;
          flex-direction: column;
          background: #FAF6EE;
          border: 2px solid transparent;
          border-radius: 14px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          padding: 6px;
          text-align: left;
        }

        .interior-thumb-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 140, 43, 0.4);
        }

        .interior-thumb-card.active {
          border-color: #E88C2B;
          background: #FFFBF5;
          box-shadow: 0 4px 16px rgba(232, 140, 43, 0.2);
        }

        .thumb-photo-box {
          position: relative;
          width: 100%;
          height: 95px;
          border-radius: 10px;
          overflow: hidden;
          background: #110204;
        }

        .thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .thumb-active-dot {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #E88C2B;
          box-shadow: 0 0 6px #E88C2B;
        }

        .thumb-text-box {
          padding: 8px 6px 4px 6px;
          display: flex;
          flex-direction: column;
        }

        .thumb-title {
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 800;
          color: #4E0401;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .thumb-sub {
          font-size: 0.7rem;
          color: #786C6A;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin-top: 1px;
        }

        /* Mobile Interior Scroll Reel (Hidden on Desktop) */
        .mobile-interior-scroll-reel {
          display: none;
        }

        /* Bottom Switcher */
        .other-vehicle-switch-bar {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(78, 4, 1, 0.08);
          display: flex;
          justify-content: center;
        }

        .btn-switch-other-vehicle {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #E88C2B;
          font-size: 0.92rem;
          font-weight: 800;
          cursor: pointer;
          transition: all 0.18s ease;
          padding: 6px 12px;
        }

        .btn-switch-other-vehicle:hover {
          color: #4E0401;
          transform: translateX(4px);
        }

        /* ==========================================================================
           RESPONSIVE REFINEMENTS (TABLET & MOBILE)
           ========================================================================== */
        @media (max-width: 900px) {
          .vehicle-overview-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .vehicle-overview-card,
          .dedicated-interior-suite-box {
            padding: 28px 22px;
          }
          .featured-interior-viewport {
            height: 380px;
          }
        }

        @media (max-width: 768px) {
          .dedicated-fleet-interior-section {
            padding: 55px 0 70px 0;
          }

          .fleet-header-block {
            margin-bottom: 24px;
          }

          .fleet-main-heading {
            font-size: 1.85rem;
          }

          .fleet-sub-heading {
            font-size: 0.92rem;
          }

          .fleet-vehicle-tabs-bar {
            flex-direction: column;
            gap: 10px;
            margin-bottom: 26px;
          }

          .fleet-tab-btn {
            width: 100%;
            justify-content: flex-start;
            padding: 12px 18px;
          }

          .vehicle-overview-card {
            padding: 20px 16px;
            border-radius: 18px;
            margin-bottom: 26px;
          }

          .vehicle-photo-wrapper {
            padding: 18px 12px;
          }

          .vehicle-exterior-img {
            max-height: 220px;
          }

          .vehicle-specs-row {
            gap: 6px;
          }

          .spec-pill {
            font-size: 0.75rem;
            padding: 5px 10px;
          }

          .vehicle-tagline-kicker {
            font-size: 0.72rem;
          }

          .vehicle-headline-name {
            font-size: 1.55rem;
          }

          .vehicle-body-description {
            font-size: 0.88rem;
            margin-bottom: 16px;
          }

          .amenity-item {
            font-size: 0.84rem;
          }

          .vehicle-card-action-bar {
            flex-direction: column;
            width: 100%;
            gap: 10px;
          }

          .btn-reserve-vehicle-gold,
          .btn-call-dispatch-outline {
            width: 100%;
            justify-content: center;
          }

          /* Dedicated Interior Suite on Mobile */
          .dedicated-interior-suite-box {
            padding: 22px 16px;
            border-radius: 18px;
          }

          .desktop-interior-nav-arrows,
          .desktop-interior-experience {
            display: none !important;
          }

          /* Smooth Mobile Horizontal Scroll Reel */
          .mobile-interior-scroll-reel {
            display: flex;
            gap: 14px;
            overflow-x: auto;
            scroll-snap-type: x mandatory;
            -webkit-overflow-scrolling: touch;
            padding-bottom: 12px;
            margin: 0 -16px;
            padding-left: 16px;
            padding-right: 16px;
          }

          .mobile-interior-scroll-reel::-webkit-scrollbar {
            height: 4px;
          }

          .mobile-interior-scroll-reel::-webkit-scrollbar-thumb {
            background: rgba(232, 140, 43, 0.4);
            border-radius: 4px;
          }

          .mobile-interior-card {
            flex: 0 0 84vw;
            max-width: 320px;
            scroll-snap-align: center;
            background: #FAF6EE;
            border: 1px solid rgba(78, 4, 1, 0.08);
            border-radius: 16px;
            overflow: hidden;
            display: flex;
            flex-direction: column;
          }

          .mobile-interior-photo-box {
            position: relative;
            width: 100%;
            height: 200px;
            background: #110204;
          }

          .mobile-interior-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mobile-interior-badge {
            position: absolute;
            top: 10px;
            left: 10px;
            background: rgba(14, 4, 15, 0.85);
            backdrop-filter: blur(8px);
            color: #E88C2B;
            font-size: 0.65rem;
            font-weight: 800;
            padding: 4px 10px;
            border-radius: 9999px;
            border: 1px solid rgba(255, 255, 255, 0.15);
          }

          .mobile-interior-card-body {
            padding: 14px;
            text-align: left;
          }

          .mobile-interior-title {
            font-family: var(--font-heading);
            font-size: 1.05rem;
            font-weight: 800;
            color: #4E0401;
            margin-bottom: 4px;
          }

          .mobile-interior-desc {
            font-size: 0.82rem;
            color: #5C4D4B;
            line-height: 1.45;
            margin: 0;
          }

          .btn-switch-other-vehicle {
            font-size: 0.82rem;
            text-align: center;
          }
        }
      `}</style>
    </section>
  );
}
