import React, { useState } from 'react';
import { 
  Tv, 
  Wind, 
  VolumeX, 
  BatteryCharging, 
  Sparkles, 
  Luggage, 
  ShieldCheck, 
  Wifi, 
  Check, 
  Zap, 
  Sliders, 
  Thermometer,
  Maximize2
} from 'lucide-react';

export default function VehicleInteriorSection() {
  const [activeComfortMode, setActiveComfortMode] = useState('legroom');
  const [activeHotspot, setActiveHotspot] = useState(null);

  const comfortModes = {
    legroom: {
      label: '42.0" Reclining Legroom',
      desc: 'Generous executive clearance allowing tall passengers to stretch out, recline, and relax without knees touching front seats.',
    },
    climate: {
      label: 'Heated & Ventilated Cushions',
      desc: 'Rapid heating for brisk winter mornings or ventilated cooling airflow designed specifically for humid Houston summers.',
    },
    armrests: {
      label: 'Individual Captain Armrests',
      desc: 'Independent contoured armrests with dual cup holders, deep side bolsters, and ergonomic lumbar support.',
    },
  };

  return (
    <section id="interior" className="vehicle-interior-section-champagne">
      <div className="container">
        {/* Section Header */}
        <div className="interior-header-block">
          <div className="interior-tag-pill">
            <Sparkles size={14} color="#B45309" />
            <span>FIRST-CLASS AMENITIES</span>
          </div>
          <h2 className="interior-main-title">Step Inside Pure Executive Luxury</h2>
          <p className="interior-sub-title">
            Your transit time shouldn't feel like transit. Our Chevrolet Suburban High Country cabin is custom-engineered for silence, productivity, and supreme relaxation.
          </p>
        </div>

        {/* Showcase Grid: Panoramic Viewport on Left, Creative Asymmetrical Suite on Right */}
        <div className="interior-showcase-grid">
          
          {/* LEFT: Panoramic Cabin Viewport + Interactive Hotspot Overlay */}
          <div className="interior-visual-column">
            <div className="interior-photo-frame">
              <img
                src="/images/suburban_interior.jpg"
                alt="Chevrolet Suburban High Country Luxury Cabin Interior"
                className="interior-panoramic-img"
              />

              {/* Interactive Hotspot Pins */}
              <button 
                type="button"
                className={`cabin-hotspot-pin pin-seats ${activeHotspot === 'seats' ? 'active' : ''}`}
                onClick={() => setActiveHotspot(activeHotspot === 'seats' ? null : 'seats')}
                title="Captain's Chairs"
              >
                <span className="pin-pulse" />
                <span className="pin-dot">1</span>
                <span className="pin-tooltip">Captain's Chairs</span>
              </button>

              <button 
                type="button"
                className={`cabin-hotspot-pin pin-screens ${activeHotspot === 'screens' ? 'active' : ''}`}
                onClick={() => setActiveHotspot(activeHotspot === 'screens' ? null : 'screens')}
                title="Dual 12.6-Inch Screens"
              >
                <span className="pin-pulse" />
                <span className="pin-dot">2</span>
                <span className="pin-tooltip">Dual 12.6" Screens</span>
              </button>

              <button 
                type="button"
                className={`cabin-hotspot-pin pin-climate ${activeHotspot === 'climate' ? 'active' : ''}`}
                onClick={() => setActiveHotspot(activeHotspot === 'climate' ? null : 'climate')}
                title="Digital Climate & Power"
              >
                <span className="pin-pulse" />
                <span className="pin-dot">3</span>
                <span className="pin-tooltip">Climate & Power</span>
              </button>

              <div className="interior-photo-glass-bar">
                <div className="glass-spec-item">
                  <span className="spec-label">MODEL</span>
                  <span className="spec-value">High Country Executive</span>
                </div>
                <div className="glass-divider" />
                <div className="glass-spec-item">
                  <span className="spec-label">CAPACITY</span>
                  <span className="spec-value">7 Passengers (Lounge Seating)</span>
                </div>
                <div className="glass-divider" />
                <div className="glass-spec-item">
                  <span className="spec-label">SANIFIED</span>
                  <span className="spec-value">UV-C & Steam Cleansed</span>
                </div>
              </div>
            </div>

            {/* Spec Sheet Plaque under Photo */}
            <div className="interior-specs-strip">
              <div className="spec-pill-badge">
                <ShieldCheck size={15} color="#059669" />
                <span>NHTSA 5-Star Safety Architecture</span>
              </div>
              <div className="spec-pill-badge">
                <Wifi size={15} color="#0284C7" />
                <span>Complimentary High-Speed Wi-Fi Ready</span>
              </div>
              <div className="spec-pill-badge">
                <Sparkles size={15} color="#D97706" />
                <span>French-Stitched Mulan Leather</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Creative Asymmetric Amenity Cards */}
          <div className="interior-creative-suite">

            {/* CARD 1: Executive Captain's Quarters (Interactive Modes) */}
            <div className={`creative-card card-captain ${activeHotspot === 'seats' ? 'highlighted' : ''}`}>
              <div className="card-top-header">
                <div className="card-kicker">SEATING ARCHITECTURE</div>
                <div className="card-status-dot">
                  <span className="dot-live" />
                  <span>VIP Row</span>
                </div>
              </div>

              <h3 className="card-creative-title">
                Perforated High Country Captain's Chairs
              </h3>
              
              {/* Interactive Comfort Mode Chips */}
              <div className="comfort-chips-row">
                <button
                  type="button"
                  onClick={() => setActiveComfortMode('legroom')}
                  className={`comfort-mode-chip ${activeComfortMode === 'legroom' ? 'selected' : ''}`}
                >
                  <Maximize2 size={13} />
                  <span>42" Legroom</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveComfortMode('climate')}
                  className={`comfort-mode-chip ${activeComfortMode === 'climate' ? 'selected' : ''}`}
                >
                  <Thermometer size={13} />
                  <span>Climate Cushions</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveComfortMode('armrests')}
                  className={`comfort-mode-chip ${activeComfortMode === 'armrests' ? 'selected' : ''}`}
                >
                  <Sliders size={13} />
                  <span>Dual Armrests</span>
                </button>
              </div>

              <p className="card-dynamic-desc">
                {comfortModes[activeComfortMode].desc}
              </p>
            </div>

            {/* 2-CARD GRID: Displays & Sound Meter */}
            <div className="creative-dual-row">
              
              {/* CARD 2: Dual 12.6" Displays */}
              <div className={`creative-card card-screens ${activeHotspot === 'screens' ? 'highlighted' : ''}`}>
                <div className="card-kicker">IN-CABIN ENTERTAINMENT</div>
                <div className="card-icon-pill">
                  <Tv size={18} color="#D97706" />
                </div>
                <h4 className="card-medium-title">Twin 12.6" HD Rear Displays</h4>
                <p className="card-compact-desc">
                  Independent touchscreen displays with streaming connectivity, HDMI laptop input, and dual wireless headphone sets.
                </p>
                <div className="screen-status-bezel">
                  <span className="screen-indicator">● HDMI 2.0</span>
                  <span className="screen-divider">/</span>
                  <span>4K HDR Ready</span>
                  <span className="screen-divider">/</span>
                  <span>AirPlay Cast</span>
                </div>
              </div>

              {/* CARD 3: Acoustic Whisper Sanctuary with Visual Decibel Meter */}
              <div className="creative-card card-acoustic">
                <div className="card-kicker">SOUND ISOLATION</div>
                <div className="card-icon-pill">
                  <VolumeX size={18} color="#059669" />
                </div>
                <h4 className="card-medium-title">Acoustic Whisper Sanctuary</h4>
                <p className="card-compact-desc">
                  Triple door weather seals and laminated acoustic glass isolate road noise for uninterrupted rest or business calls.
                </p>
                
                {/* Visual Decibel Gauge */}
                <div className="decibel-meter-wrap">
                  <div className="decibel-label-row">
                    <span className="decibel-metric">38 dB</span>
                    <span className="decibel-benchmark">Library Whisper Quiet at 70 mph</span>
                  </div>
                  <div className="decibel-track">
                    <div className="decibel-fill" />
                  </div>
                </div>
              </div>

            </div>

            {/* 2-CARD GRID: Power Hub & Hospitality Trunk */}
            <div className="creative-dual-row">
              
              {/* CARD 4: Multi-Row Power Hub */}
              <div className={`creative-card card-power ${activeHotspot === 'climate' ? 'highlighted' : ''}`}>
                <div className="card-kicker">ONBOARD PRODUCTIVITY</div>
                <div className="card-icon-pill">
                  <BatteryCharging size={18} color="#0284C7" />
                </div>
                <h4 className="card-medium-title">High-Wattage Multi-Row Power</h4>
                <div className="power-tags-group">
                  <div className="power-tag">
                    <Zap size={13} color="#0284C7" />
                    <span>60W USB-C PD</span>
                  </div>
                  <div className="power-tag">
                    <Zap size={13} color="#0284C7" />
                    <span>110V 150W Household AC</span>
                  </div>
                  <div className="power-tag">
                    <Zap size={13} color="#0284C7" />
                    <span>Qi Wireless Charging</span>
                  </div>
                </div>
                <p className="card-compact-desc">
                  Dedicated ports across every row so laptops, iPads, and smartphones recharge rapidly without sharing cables.
                </p>
              </div>

              {/* CARD 5: Hospitality & Luggage Vault */}
              <div className="creative-card card-hospitality">
                <div className="card-kicker">FIRST-CLASS TOUCHES</div>
                <div className="card-icon-pill">
                  <Luggage size={18} color="#B45309" />
                </div>
                <h4 className="card-medium-title">Luggage Vault & Cold Refreshments</h4>
                <div className="hospitality-badges-list">
                  <div className="hosp-badge">
                    <Check size={13} color="#059669" />
                    <span>Chilled Spring Water</span>
                  </div>
                  <div className="hosp-badge">
                    <Check size={13} color="#059669" />
                    <span>Mints & Sanitizing Wipes</span>
                  </div>
                  <div className="hosp-badge">
                    <Check size={13} color="#059669" />
                    <span>Holds 6 Large Check-In Cases</span>
                  </div>
                </div>
                <p className="card-compact-desc">
                  Generous 41.5 cu.ft cargo hold behind 3rd row ensures all airport or Galveston cruise luggage fits cleanly.
                </p>
              </div>

            </div>

          </div>

        </div>
      </div>

      <style>{`
        /* ==========================================================================
           WARM CHAMPAGNE / ALABASTER LIGHT THEME (Distinct & Luxurious)
           ========================================================================== */
        .vehicle-interior-section-champagne {
          background: #F6F3EB;
          background: radial-gradient(110% 80% at 50% 0%, #FAF8F4 0%, #F4EFE6 100%);
          color: #0F172A;
          padding: 85px 0 95px 0;
          border-top: 1px solid #EAE4D8;
          border-bottom: 1px solid #E2DCD0;
          position: relative;
        }

        .interior-header-block {
          text-align: left;
          max-width: 820px;
          margin-bottom: 44px;
        }

        .interior-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #B45309;
          margin-bottom: 12px;
        }

        .interior-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.65rem, 3.85vw, 3.45rem);
          font-weight: 900;
          color: #0F172A;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin-bottom: 10px;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .interior-sub-title {
          font-size: 1.05rem;
          color: #475569;
          line-height: 1.6;
          max-width: 720px;
        }

        /* 2-Column Asymmetric Layout */
        .interior-showcase-grid {
          display: grid;
          grid-template-columns: 1fr 1.18fr;
          gap: 36px;
          align-items: start;
        }

        /* --------------------------------------------------------------------------
           LEFT: Panoramic Cabin Viewport & Hotspots
           -------------------------------------------------------------------------- */
        .interior-visual-column {
          display: flex;
          flex-direction: column;
          gap: 16px;
          position: sticky;
          top: 96px;
        }

        .interior-photo-frame {
          position: relative;
          width: 100%;
          min-height: 480px;
          border-radius: 20px;
          overflow: hidden;
          background: #EAE5DC;
          border: 1px solid #DFD8CC;
          box-shadow: 0 16px 36px -12px rgba(120, 100, 75, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .interior-panoramic-img {
          width: 100%;
          height: 100%;
          min-height: 480px;
          object-fit: cover;
          display: block;
          transition: transform 0.5s var(--ease-snappy);
        }

        .interior-photo-frame:hover .interior-panoramic-img {
          transform: scale(1.02);
        }

        /* Hotspot Pins */
        .cabin-hotspot-pin {
          position: absolute;
          z-index: 10;
          cursor: pointer;
          border: none;
          background: none;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pin-seats {
          top: 54%;
          left: 36%;
        }

        .pin-screens {
          top: 35%;
          left: 64%;
        }

        .pin-climate {
          top: 48%;
          left: 50%;
        }

        .pin-pulse {
          position: absolute;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: rgba(245, 158, 11, 0.4);
          animation: hotspotPulse 2s infinite ease-out;
        }

        .pin-dot {
          position: relative;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #D97706;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.72rem;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.35);
          border: 2px solid #FFFFFF;
          transition: transform 0.2s ease, background 0.2s ease;
        }

        .cabin-hotspot-pin:hover .pin-dot,
        .cabin-hotspot-pin.active .pin-dot {
          transform: scale(1.18);
          background: #B45309;
        }

        .pin-tooltip {
          position: absolute;
          bottom: calc(100% + 8px);
          left: 50%;
          transform: translateX(-50%);
          background: #0F172A;
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          white-space: nowrap;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.2s ease, transform 0.2s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        }

        .cabin-hotspot-pin:hover .pin-tooltip,
        .cabin-hotspot-pin.active .pin-tooltip {
          opacity: 1;
          transform: translateX(-50%) translateY(-2px);
        }

        @keyframes hotspotPulse {
          0% { transform: scale(0.8); opacity: 0.9; }
          100% { transform: scale(2.2); opacity: 0; }
        }

        /* Glass Spec Bar at Bottom of Photo */
        .interior-photo-glass-bar {
          position: absolute;
          bottom: 16px;
          left: 16px;
          right: 16px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 10px 18px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
        }

        .glass-spec-item {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .glass-spec-item .spec-label {
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #786C5A;
        }

        .glass-spec-item .spec-value {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0F172A;
        }

        .glass-divider {
          width: 1px;
          height: 24px;
          background: #E5DFD4;
        }

        .interior-specs-strip {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }

        .spec-pill-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FFFFFF;
          border: 1px solid #E6E0D5;
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #334155;
          box-shadow: 0 1px 3px rgba(0,0,0,0.03);
        }

        /* --------------------------------------------------------------------------
           RIGHT: Creative Asymmetric Amenity Cards
           -------------------------------------------------------------------------- */
        .interior-creative-suite {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Base Card Styling (Double-Bezel High-End Tactility) */
        .creative-card {
          background: #FFFFFF;
          border: 1px solid #E8E2D6;
          border-radius: 16px;
          padding: 24px;
          text-align: left;
          box-shadow: 0 4px 18px -4px rgba(110, 95, 75, 0.05);
          transition: transform 0.22s var(--ease-snappy), box-shadow 0.22s ease, border-color 0.22s ease;
          position: relative;
        }

        .creative-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px -6px rgba(110, 95, 75, 0.10);
          border-color: #D6CCA8;
        }

        .creative-card.highlighted {
          border-color: #D97706;
          box-shadow: 0 0 0 3px rgba(217, 119, 6, 0.15), 0 12px 28px -6px rgba(110, 95, 75, 0.12);
        }

        .card-top-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }

        .card-kicker {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #948572;
        }

        .card-status-dot {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #059669;
          background: #ECFDF5;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .dot-live {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10B981;
        }

        .card-creative-title {
          font-family: var(--font-heading);
          font-size: 1.46rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.25;
          margin-bottom: 14px;
          -webkit-text-stroke: 0.35px currentColor;
          text-rendering: optimizeLegibility;
        }

        .card-medium-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
          margin: 10px 0 8px 0;
          line-height: 1.3;
          -webkit-text-stroke: 0.32px currentColor;
          text-rendering: optimizeLegibility;
        }

        .card-icon-pill {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: #FBF8F2;
          border: 1px solid #ECE4D6;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: 6px;
        }

        .card-compact-desc {
          font-size: 0.86rem;
          color: #475569;
          line-height: 1.5;
        }

        /* CARD 1: Comfort Mode Selector */
        .comfort-chips-row {
          display: flex;
          gap: 8px;
          margin-bottom: 12px;
          flex-wrap: wrap;
        }

        .comfort-mode-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F7F4EC;
          border: 1px solid #E6DFC8;
          color: #475569;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .comfort-mode-chip:hover {
          background: #EFE9D9;
          color: #0F172A;
        }

        .comfort-mode-chip.selected {
          background: #0F172A;
          color: #FFFFFF;
          border-color: #0F172A;
        }

        .card-dynamic-desc {
          font-size: 0.90rem;
          color: #334155;
          line-height: 1.55;
          background: #FAF8F3;
          border-left: 3px solid #D97706;
          padding: 8px 12px;
          border-radius: 0 6px 6px 0;
        }

        /* Dual Row Layout */
        .creative-dual-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        /* Screen Status Bezel */
        .screen-status-bezel {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #0F172A;
          color: #F8FAFC;
          font-size: 0.72rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: 6px;
          margin-top: 12px;
          letter-spacing: 0.04em;
        }

        .screen-indicator {
          color: #10B981;
        }

        .screen-divider {
          color: #475569;
        }

        /* Decibel Gauge */
        .decibel-meter-wrap {
          margin-top: 14px;
          background: #FAF8F3;
          border: 1px solid #EFE8DB;
          border-radius: 8px;
          padding: 8px 12px;
        }

        .decibel-label-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.76rem;
          margin-bottom: 6px;
        }

        .decibel-metric {
          font-weight: 800;
          color: #059669;
        }

        .decibel-benchmark {
          color: #64748B;
          font-size: 0.72rem;
        }

        .decibel-track {
          width: 100%;
          height: 6px;
          background: #E2E8F0;
          border-radius: 9999px;
          overflow: hidden;
        }

        .decibel-fill {
          width: 32%;
          height: 100%;
          background: linear-gradient(90deg, #10B981, #059669);
          border-radius: 9999px;
        }

        /* Power Tags */
        .power-tags-group {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin: 10px 0 10px 0;
        }

        .power-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #1E293B;
          background: #F0F9FF;
          border: 1px solid #BAE6FD;
          padding: 3px 8px;
          border-radius: 6px;
          width: fit-content;
        }

        /* Hospitality Badges */
        .hospitality-badges-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin: 10px 0 10px 0;
        }

        .hosp-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #1E293B;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .interior-showcase-grid {
            grid-template-columns: 1fr;
          }

          .interior-visual-column {
            position: static;
          }

          .interior-photo-frame,
          .interior-panoramic-img {
            min-height: 380px;
          }
        }

        @media (max-width: 640px) {
          .vehicle-interior-section-champagne {
            padding: 60px 0 70px 0;
          }

          .creative-dual-row {
            grid-template-columns: 1fr;
          }

          .interior-photo-glass-bar {
            flex-direction: column;
            gap: 6px;
            align-items: flex-start;
          }

          .glass-divider {
            display: none;
          }

          .comfort-chips-row {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}
