import React, { useState } from 'react';
import { 
  Navigation, 
  Clock, 
  ArrowRight, 
  Sun, 
  Sunset,
  Car,
  CheckCircle2,
  Compass
} from 'lucide-react';
import { openBooking } from '../utils/bookingModal';

const HUBS_DATA = [
  {
    id: 'downtown',
    code: '01 / CENTRAL CORE',
    name: 'Downtown & Skyline',
    badge: 'CENTRAL BUSINESS & ARTS',
    subtitle: 'The corporate epicenter, Theater District & luxury high-rise hotels',
    imageDay: '/images/dest_houston_skyline.jpg',
    imageSunset: '/images/dest_houston_golden.jpg',
    hasTimeToggle: true,
    stats: {
      iah: '22 mi · ~25 mins',
      hou: '10 mi · ~18 mins',
      recommended: 'Lexus Luxury Sedan or Suburban',
      recommendedId: 'lexus'
    },
    hotspots: [
      { id: 'dt-1', x: 38, y: 38, title: 'Corporate High-Rise Towers', desc: 'Direct drop-off at Shell, Chevron & JPMorgan executive campuses' },
      { id: 'dt-2', x: 56, y: 72, title: 'I-45 Highway Hub', desc: 'Elevated express routing bypassing downtown surface traffic' },
      { id: 'dt-3', x: 74, y: 44, title: 'Minute Maid & Theater Dist.', desc: 'VIP curb arrival for Astros games & symphony evenings' }
    ],
    highlights: [
      'Curb-to-lobby arrival at Four Seasons, Post Oak & Marriott Marquis',
      'FAA radar tracking guarantees immediate airport pick-up',
      'Quiet acoustic cabin for confidential mobile conferences'
    ]
  },
  {
    id: 'galveston',
    code: '02 / GULF TERMINAL',
    name: 'Galveston & Cruise Port',
    badge: 'GULF COAST & CRUISE BERTHS',
    subtitle: 'Historic Pleasure Pier, Seawall & Royal Caribbean / Carnival berths',
    imageDay: '/images/dest_galveston_pier.png',
    imageSunset: null,
    hasTimeToggle: false,
    stats: {
      iah: '70 mi · ~75 mins',
      hou: '42 mi · ~45 mins',
      recommended: 'Chevrolet Suburban (6+ Bags)',
      recommendedId: 'suburban'
    },
    hotspots: [
      { id: 'gal-1', x: 76, y: 46, title: 'Historic Pleasure Pier', desc: 'Iconic Gulf waterfront landmark & seaside dining' },
      { id: 'gal-2', x: 38, y: 56, title: 'Seawall Boulevard', desc: 'Direct scenic coastal transit to luxury beachfront resorts' },
      { id: 'gal-3', x: 18, y: 38, title: 'Cruise Terminal 10', desc: 'Seamless baggage handling at Royal Caribbean & Carnival' }
    ],
    highlights: [
      'Massive rear cargo comfortably accommodates 6+ overseas bags',
      'Direct non-stop private transfer from IAH or Hobby to ship gangway',
      'Guaranteed flat rate with zero cruise-rush surge pricing'
    ]
  },
  {
    id: 'nrg',
    code: '03 / ARENA DISTRICT',
    name: 'NRG Stadium & Park',
    badge: 'CHAMPIONSHIP SPORTS & ARENA',
    subtitle: 'Home of Houston Texans, RodeoHouston & FIFA World Cup 2026',
    imageDay: '/images/dest_nrg_stadium.png',
    imageSunset: null,
    hasTimeToggle: false,
    stats: {
      iah: '26 mi · ~35 mins',
      hou: '12 mi · ~20 mins',
      recommended: 'Chevrolet Suburban or Lexus',
      recommendedId: 'suburban'
    },
    hotspots: [
      { id: 'nrg-1', x: 50, y: 36, title: 'NRG Stadium Concourse', desc: '72,000-seat arena for world-class concerts & NFL games' },
      { id: 'nrg-2', x: 26, y: 68, title: 'VIP Chauffeur Gate', desc: 'Direct commercial lane drop-off skipping general parking queues' },
      { id: 'nrg-3', x: 74, y: 70, title: 'Express Post-Game Egress', desc: 'Pre-scheduled departure avoiding post-event gridlock' }
    ],
    highlights: [
      'Dedicated private chauffeur drop-off lane directly at stadium gate',
      'Skip $50+ parking fees and 45-minute parking lot exit queues',
      'Direct phone communication with owner Symanthan for immediate pickup'
    ]
  },
  {
    id: 'skyline',
    code: '04 / ARTERIAL ARCS',
    name: 'Highway Arterials & Loops',
    badge: 'METROPOLITAN ARTERIALS',
    subtitle: 'Golden hour vantage across Houston’s dynamic highway interchange',
    imageDay: '/images/dest_houston_golden.jpg',
    imageSunset: null,
    hasTimeToggle: false,
    stats: {
      iah: 'Serving all Greater Houston',
      hou: '10,000+ sq. mi. service zone',
      recommended: 'Suburban Executive Edition',
      recommendedId: 'suburban'
    },
    hotspots: [
      { id: 'sky-1', x: 30, y: 26, title: 'Financial Core', desc: 'The global capital of energy & Fortune 500 corporate campuses' },
      { id: 'sky-2', x: 50, y: 65, title: 'Elevated Flyover Ramps', desc: 'Rapid transit across I-45, I-69, I-10 and Loop 610' },
      { id: 'sky-3', x: 72, y: 82, title: 'Southbound Express Lane', desc: 'High-speed corridor connection to Texas Medical Center & Coast' }
    ],
    highlights: [
      'Experienced Houston native chauffeurs with live traffic bypass',
      'Automatic flight delay compensation via live FAA satellite tracking',
      'Upfront transparent flat pricing with zero hidden toll charges'
    ]
  }
];

export default function InteractiveCityExplorer() {
  const [activeHubId, setActiveHubId] = useState('downtown');
  const [timeMode, setTimeMode] = useState('day'); // 'day' | 'sunset'
  const [activeHotspot, setActiveHotspot] = useState(null);

  const activeHub = HUBS_DATA.find((h) => h.id === activeHubId) || HUBS_DATA[0];

  const currentImage =
    activeHub.hasTimeToggle && timeMode === 'sunset' && activeHub.imageSunset
      ? activeHub.imageSunset
      : activeHub.imageDay;

  const handleHubSelect = (hubId) => {
    setActiveHubId(hubId);
    setActiveHotspot(null);
  };

  const handleBookDestination = (vehicleId) => {
    openBooking(vehicleId || 'suburban');
  };

  return (
    <section id="interactive-explorer" className="luxury-city-section" aria-label="Interactive Houston Corridors and Destinations">
      <div className="container">
        
        {/* =====================================================================
            1. SECTION HEADER (NO PILLS / NO SPARKLES / THICK HEADINGS)
            ===================================================================== */}
        <header className="city-header-block reveal-on-scroll">
          <span className="city-pre-heading">METROPOLITAN SERVICE MAP</span>
          <h2 className="city-main-heading">
            HOUSTON’S ICONIC CORRIDORS<br />
            <span className="city-heading-accent">& SIGNATURE DESTINATIONS</span>
          </h2>
          <p className="city-sub-description">
            Explore our most frequented ground routes across Greater Houston. Select any corridor to inspect verified airport transit times, waypoint landmarks, and chauffeur advantages.
          </p>
        </header>

        {/* Mobile Horizontal Corridor Selector (< 900px) */}
        <div className="city-mobile-corridors-bar" role="tablist" aria-label="Select destination corridor">
          {HUBS_DATA.map((hub) => {
            const isActive = hub.id === activeHubId;
            return (
              <button
                key={hub.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleHubSelect(hub.id)}
                className={`city-mobile-corridor-btn ${isActive ? 'is-active' : ''}`}
              >
                <span className="corridor-btn-code">{hub.code.split('/')[0].trim()}</span>
                <span className="corridor-btn-name">{hub.name}</span>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            2. MAIN INTERACTIVE STAGE GRID
            ===================================================================== */}
        <div className="city-stage-grid">
          
          {/* LEFT: Cinematic Visual Stage with Waypoints & Time Toggle */}
          <div className="city-visual-col reveal-on-scroll">
            <div className="city-visual-stage">
              
              {/* Landmark Photography */}
              <img
                key={currentImage}
                src={currentImage}
                alt={`${activeHub.name} - Houston Private Chauffeur Route`}
                className="city-landmark-photo"
              />

              {/* Cinematic Vignette */}
              <div className="city-photo-vignette" />

              {/* Unboxed Architectural Category Indicator (Top Left) */}
              <div className="city-stage-meta-plate">
                <span className="stage-meta-code">{activeHub.code}</span>
                <h3 className="stage-meta-title">{activeHub.name.toUpperCase()}</h3>
              </div>

              {/* Clean Minimal Time Toggle (Downtown Only) */}
              {activeHub.hasTimeToggle && (
                <div className="city-time-dock" role="group" aria-label="Toggle Daytime and Golden Hour perspectives">
                  <button
                    type="button"
                    onClick={() => setTimeMode('day')}
                    className={`time-dock-btn ${timeMode === 'day' ? 'is-active' : ''}`}
                    title="Switch to Daytime Perspective"
                  >
                    <Sun size={13} strokeWidth={2.4} />
                    <span>DAY</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeMode('sunset')}
                    className={`time-dock-btn ${timeMode === 'sunset' ? 'is-active' : ''}`}
                    title="Switch to Golden Hour Sunset Perspective"
                  >
                    <Sunset size={13} strokeWidth={2.4} />
                    <span>SUNSET</span>
                  </button>
                </div>
              )}

              {/* Interactive Minimalist Waypoint Pins */}
              {activeHub.hotspots.map((pin, idx) => {
                const isPinActive = activeHotspot === pin.id;
                return (
                  <div
                    key={pin.id}
                    className="city-waypoint-anchor"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(isPinActive ? null : pin.id)}
                      className={`city-waypoint-node ${isPinActive ? 'is-active' : ''}`}
                      aria-label={`View waypoint: ${pin.title}`}
                      title={pin.title}
                    >
                      <span className="waypoint-ring" />
                      <span className="waypoint-digit">0{idx + 1}</span>
                    </button>

                    {/* Popover Micro Card */}
                    {isPinActive && (
                      <div className="city-waypoint-popover">
                        <span className="popover-code">WAYPOINT 0{idx + 1}</span>
                        <strong className="popover-title">{pin.title}</strong>
                        <p className="popover-desc">{pin.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Minimalist Visual Legend (No Sparkles / Clean Compass) */}
              <div className="city-stage-legend">
                <Compass size={13} color="#E88C2B" strokeWidth={2.4} />
                <span>TAP WAYPOINT COORDINATES (01–03) TO INSPECT LANDMARKS</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Corridor Selector Bento & Telemetry Instrument */}
          <div className="city-controls-col reveal-on-scroll">
            
            {/* Desktop Corridor Selector List */}
            <div className="city-corridors-list" role="tablist" aria-label="Select destination corridor">
              {HUBS_DATA.map((hub) => {
                const isSelected = hub.id === activeHubId;
                return (
                  <button
                    key={hub.id}
                    type="button"
                    role="tab"
                    aria-selected={isSelected}
                    onClick={() => handleHubSelect(hub.id)}
                    className={`city-corridor-item ${isSelected ? 'is-selected' : ''}`}
                  >
                    <div className="corridor-thumb-frame">
                      <img src={hub.imageDay} alt="" className="corridor-thumb-img" />
                      {isSelected && <div className="corridor-active-indicator" />}
                    </div>

                    <div className="corridor-text-block">
                      <div className="corridor-title-row">
                        <span className="corridor-code-label">{hub.code}</span>
                        <strong className="corridor-name">{hub.name}</strong>
                      </div>
                      <span className="corridor-subtitle">{hub.subtitle}</span>
                    </div>

                    <ArrowRight size={16} className="corridor-arrow-icon" strokeWidth={2.4} />
                  </button>
                );
              })}
            </div>

            {/* Flight & Route Telemetry Panel */}
            <div className="city-telemetry-instrument">
              <div className="telemetry-top-bar">
                <div className="telemetry-title-group">
                  <Navigation size={14} color="#E88C2B" strokeWidth={2.4} />
                  <span className="telemetry-heading-label">ROUTE TELEMETRY & FLIGHT SYNC</span>
                </div>
                <div className="telemetry-live-badge">
                  <span className="telemetry-pulse-dot" />
                  <span>GPS / FAA RADAR</span>
                </div>
              </div>

              {/* Dual Transit Metric Columns */}
              <div className="telemetry-metrics-grid">
                <div className="telemetry-metric-tile">
                  <div className="metric-tile-header">
                    <Clock size={12} color="#8C7B79" strokeWidth={2.2} />
                    <span>FROM BUSH (IAH)</span>
                  </div>
                  <strong className="metric-tile-value">{activeHub.stats.iah}</strong>
                </div>

                <div className="telemetry-metric-tile">
                  <div className="metric-tile-header">
                    <Clock size={12} color="#8C7B79" strokeWidth={2.2} />
                    <span>FROM HOBBY (HOU)</span>
                  </div>
                  <strong className="metric-tile-value">{activeHub.stats.hou}</strong>
                </div>
              </div>

              {/* Recommended Fleet */}
              <div className="telemetry-recommended-row">
                <div className="fleet-badge-box">
                  <Car size={16} color="#E88C2B" strokeWidth={2.4} />
                </div>
                <div className="fleet-info-text">
                  <span className="fleet-kicker-label">RECOMMENDED CHAUFFEUR FLEET</span>
                  <strong className="fleet-name-text">{activeHub.stats.recommended}</strong>
                </div>
              </div>

              {/* Route Advantages */}
              <div className="telemetry-advantages-list">
                {activeHub.highlights.map((item, idx) => (
                  <div key={idx} className="advantage-bullet-row">
                    <CheckCircle2 size={14} color="#E88C2B" strokeWidth={2.4} className="advantage-icon" />
                    <span className="advantage-text">{item}</span>
                  </div>
                ))}
              </div>

              {/* Direct Booking Action */}
              <button
                type="button"
                onClick={() => handleBookDestination(activeHub.stats.recommendedId)}
                className="btn-reserve-corridor"
              >
                <span>RESERVE CHAUFFEUR TO {activeHub.name.toUpperCase()}</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        /* ==========================================================================
           HOUSTON CORRIDORS & SIGNATURE DESTINATIONS — LUXURY MINIMAL REDESIGN
           ========================================================================== */
        .luxury-city-section {
          position: relative;
          background: #08020C;
          color: #FFFFFF;
          padding: 100px 0 115px 0;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* 1. Header */
        .city-header-block {
          text-align: center;
          max-width: 860px;
          margin: 0 auto 52px auto;
        }

        .city-pre-heading {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #E88C2B;
          display: block;
          margin-bottom: 12px;
        }

        .city-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.08;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 16px;
          text-rendering: optimizeLegibility;
        }

        .city-heading-accent {
          color: #E88C2B;
        }

        .city-sub-description {
          font-size: 1.05rem;
          color: #CBD5E1;
          line-height: 1.65;
          max-width: 680px;
          margin: 0 auto;
        }

        /* Mobile Corridor Bar (Hidden on Desktop) */
        .city-mobile-corridors-bar {
          display: none;
        }

        /* 2. Main Stage Grid */
        .city-stage-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 36px;
          align-items: start;
        }

        /* Visual Stage Frame */
        .city-visual-col {
          width: 100%;
        }

        .city-visual-stage {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          border-radius: 20px;
          overflow: hidden;
          background: #110314;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);
        }

        .city-landmark-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .city-visual-stage:hover .city-landmark-photo {
          transform: scale(1.025);
        }

        .city-photo-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.65) 0%,
            rgba(0, 0, 0, 0.08) 35%,
            rgba(0, 0, 0, 0.2) 60%,
            rgba(0, 0, 0, 0.85) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Stage Meta Plate (Top Left) */
        .city-stage-meta-plate {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 5;
          background: rgba(10, 2, 14, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 12px;
          padding: 10px 16px;
          text-align: left;
          max-width: calc(100% - 170px);
        }

        .stage-meta-code {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #E88C2B;
          display: block;
          margin-bottom: 2px;
        }

        .stage-meta-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 900;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.15;
        }

        /* Time Dock (Top Right) */
        .city-time-dock {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 6;
          display: inline-flex;
          align-items: center;
          background: rgba(10, 2, 14, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 10px;
          padding: 3px;
          gap: 3px;
        }

        .time-dock-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: transparent;
          border: none;
          color: #CBD5E1;
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 6px 10px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .time-dock-btn.is-active {
          background: #E88C2B;
          color: #FFFFFF;
          box-shadow: 0 2px 10px rgba(232, 140, 43, 0.5);
        }

        .time-dock-btn:hover:not(.is-active) {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Minimal Waypoint Pins */
        .city-waypoint-anchor {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 8;
        }

        .city-waypoint-node {
          position: relative;
          width: 32px;
          height: 32px;
          background: rgba(10, 2, 14, 0.92);
          border: 1.5px solid #E88C2B;
          border-radius: 8px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 900;
          box-shadow: 0 4px 14px rgba(0, 0, 0, 0.5), 0 0 16px rgba(232, 140, 43, 0.4);
          transition: all 0.2s ease;
        }

        .city-waypoint-node:hover,
        .city-waypoint-node.is-active {
          background: #E88C2B;
          transform: scale(1.1);
          box-shadow: 0 0 20px #E88C2B;
        }

        .waypoint-digit {
          line-height: 1;
        }

        /* Popover */
        .city-waypoint-popover {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          width: 250px;
          background: rgba(10, 2, 14, 0.94);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(232, 140, 43, 0.35);
          border-radius: 12px;
          padding: 14px 16px;
          text-align: left;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.65);
          z-index: 20;
          pointer-events: none;
        }

        .popover-code {
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #E88C2B;
          display: block;
          margin-bottom: 2px;
        }

        .popover-title {
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 900;
          color: #FFFFFF;
          display: block;
          margin-bottom: 4px;
        }

        .popover-desc {
          font-size: 0.80rem;
          color: #CBD5E1;
          line-height: 1.45;
          margin: 0;
        }

        /* Stage Legend (Bottom) */
        .city-stage-legend {
          position: absolute;
          bottom: 18px;
          left: 20px;
          right: 20px;
          z-index: 5;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.70rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #CBD5E1;
          background: rgba(10, 2, 14, 0.75);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          padding: 8px 14px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* 3. Right Column: Corridors List & Telemetry */
        .city-controls-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .city-corridors-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .city-corridor-item {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.09);
          border-radius: 14px;
          padding: 12px 16px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          color: #FFFFFF;
        }

        .city-corridor-item:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(232, 140, 43, 0.4);
          transform: translateX(3px);
        }

        .city-corridor-item.is-selected {
          background: rgba(232, 140, 43, 0.12);
          border-color: #E88C2B;
          box-shadow: 0 4px 20px rgba(232, 140, 43, 0.18);
        }

        .corridor-thumb-frame {
          position: relative;
          width: 60px;
          height: 48px;
          border-radius: 8px;
          overflow: hidden;
          background: #110204;
          flex-shrink: 0;
        }

        .corridor-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .corridor-active-indicator {
          position: absolute;
          inset: 0;
          border: 2px solid #E88C2B;
          border-radius: 8px;
        }

        .corridor-text-block {
          display: flex;
          flex-direction: column;
          flex-grow: 1;
          overflow: hidden;
        }

        .corridor-title-row {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 2px;
        }

        .corridor-code-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #E88C2B;
        }

        .corridor-name {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        .corridor-subtitle {
          font-size: 0.78rem;
          color: #94A3B8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .corridor-arrow-icon {
          color: #64748B;
          transition: transform 0.2s ease, color 0.2s ease;
          flex-shrink: 0;
        }

        .city-corridor-item.is-selected .corridor-arrow-icon {
          color: #E88C2B;
          transform: translateX(3px);
        }

        /* Flight & Route Telemetry Panel */
        .city-telemetry-instrument {
          background: rgba(16, 5, 20, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 18px;
          padding: 24px;
          text-align: left;
        }

        .telemetry-top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 14px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          margin-bottom: 18px;
        }

        .telemetry-title-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .telemetry-heading-label {
          font-size: 0.70rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: #CBD5E1;
        }

        .telemetry-live-badge {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          color: #E88C2B;
        }

        .telemetry-pulse-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #E88C2B;
          box-shadow: 0 0 8px #E88C2B;
        }

        /* Dual Metrics Grid */
        .telemetry-metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 16px;
        }

        .telemetry-metric-tile {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 10px;
          padding: 12px 14px;
        }

        .metric-tile-header {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.64rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #8C7B79;
          margin-bottom: 4px;
        }

        .metric-tile-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        /* Recommended Fleet */
        .telemetry-recommended-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(232, 140, 43, 0.08);
          border: 1px solid rgba(232, 140, 43, 0.24);
          border-radius: 10px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }

        .fleet-badge-box {
          width: 32px;
          height: 32px;
          border-radius: 6px;
          background: rgba(232, 140, 43, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fleet-info-text {
          display: flex;
          flex-direction: column;
        }

        .fleet-kicker-label {
          font-size: 0.65rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #E88C2B;
        }

        .fleet-name-text {
          font-family: var(--font-heading);
          font-size: 0.92rem;
          font-weight: 900;
          color: #FFFFFF;
        }

        /* Advantages Checklist */
        .telemetry-advantages-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .advantage-bullet-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.86rem;
          color: #E2E8F0;
          line-height: 1.45;
        }

        .advantage-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Action Button */
        .btn-reserve-corridor {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          border: none;
          padding: 15px 22px;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.38);
        }

        .btn-reserve-corridor:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(232, 140, 43, 0.52);
        }

        /* ==========================================================================
           RESPONSIVE REFINEMENTS
           ========================================================================== */
        @media (max-width: 1024px) {
          .city-stage-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .city-visual-stage {
            aspect-ratio: 16 / 10;
          }

          .city-corridors-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }

        @media (max-width: 768px) {
          .luxury-city-section {
            padding: 65px 0 75px 0;
          }

          .city-header-block {
            text-align: left;
            margin-bottom: 24px;
          }

          .city-pre-heading {
            font-size: 0.72rem;
            margin-bottom: 8px;
          }

          .city-main-heading {
            font-size: 2rem;
            margin-bottom: 12px;
          }

          .city-sub-description {
            font-size: 0.94rem;
          }

          /* Show mobile corridor bar */
          .city-mobile-corridors-bar {
            display: flex;
            align-items: center;
            gap: 8px;
            overflow-x: auto;
            padding-bottom: 14px;
            margin-bottom: 18px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .city-mobile-corridors-bar::-webkit-scrollbar {
            display: none;
          }

          .city-mobile-corridor-btn {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 8px;
            padding: 10px 14px;
            color: #CBD5E1;
            font-family: inherit;
            font-size: 0.82rem;
            font-weight: 800;
            white-space: nowrap;
            cursor: pointer;
            flex-shrink: 0;
            transition: all 0.18s ease;
          }

          .city-mobile-corridor-btn.is-active {
            background: #E88C2B;
            color: #FFFFFF;
            border-color: #E88C2B;
            box-shadow: 0 4px 14px rgba(232, 140, 43, 0.4);
          }

          .corridor-btn-code {
            font-size: 0.68rem;
            opacity: 0.85;
          }

          /* Hide desktop corridor list on mobile */
          .city-corridors-list {
            display: none;
          }

          .city-visual-stage {
            aspect-ratio: 4 / 3;
            border-radius: 16px;
          }

          .city-stage-meta-plate {
            top: 14px;
            left: 14px;
            padding: 8px 12px;
            max-width: calc(100% - 150px);
          }

          .stage-meta-code {
            font-size: 0.62rem;
          }

          .stage-meta-title {
            font-size: 0.98rem;
          }

          .city-time-dock {
            top: 14px;
            right: 14px;
          }

          .time-dock-btn {
            font-size: 0.68rem;
            padding: 5px 8px;
          }

          .city-stage-legend {
            display: none;
          }

          .city-telemetry-instrument {
            padding: 18px;
            border-radius: 16px;
          }

          .telemetry-metrics-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .telemetry-metric-tile {
            padding: 10px 12px;
          }

          .metric-tile-value {
            font-size: 0.94rem;
          }

          .btn-reserve-corridor {
            font-size: 0.82rem;
            padding: 14px 18px;
          }
        }
      `}</style>
    </section>
  );
}
