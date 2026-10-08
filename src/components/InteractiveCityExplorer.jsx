import React, { useState } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  Sun, 
  Sunset,
  Car,
  CheckCircle2
} from 'lucide-react';
import { openBooking } from '../utils/bookingModal';

const HUBS_DATA = [
  {
    id: 'downtown',
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
      { id: 'dt-1', x: 38, y: 38, title: 'Corporate Towers', desc: 'Direct drop-off at Shell, Chevron & JPMorgan high-rises' },
      { id: 'dt-2', x: 56, y: 72, title: 'I-45 Highway Hub', desc: 'Direct elevated express routing bypassing street gridlock' },
      { id: 'dt-3', x: 74, y: 44, title: 'Minute Maid & Theater Dist.', desc: 'VIP curb arrival for Astros games & symphony evenings' }
    ],
    highlights: [
      'Curb-to-lobby arrival at Four Seasons, Post Oak & Marriott Marquis',
      'FAA radar tracking guarantees immediate airport pick-up',
      'Quiet acoustic cabin for mobile executive conferences'
    ]
  },
  {
    id: 'galveston',
    name: 'Galveston & Cruise Port',
    badge: 'GULF COAST & CRUISE TERMINAL',
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
      'Massive rear cargo comfortably holds 6+ large overseas cruise suitcases',
      'Direct non-stop private transfer from IAH or Hobby terminal to ship gangway',
      'Guaranteed flat rate with zero cruise-rush surge pricing'
    ]
  },
  {
    id: 'nrg',
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
      'Skip $50+ parking fees and 45-minute parking lot exit lines',
      'Direct cell communication with owner Symanthan for immediate pickup'
    ]
  },
  {
    id: 'skyline',
    name: 'Houston Highway Arterials',
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
      'Experienced Houston native chauffeurs with continuous real-time traffic bypass',
      'Automatic flight delay compensation via live FAA satellite radar',
      'Upfront transparent flat pricing with zero hidden toll charges'
    ]
  }
];

export default function InteractiveCityExplorer() {
  const [activeHubId, setActiveHubId] = useState('downtown');
  const [timeMode, setTimeMode] = useState('day'); // 'day' | 'sunset'
  const [activeHotspot, setActiveHotspot] = useState(null);

  const activeHub = HUBS_DATA.find((h) => h.id === activeHubId) || HUBS_DATA[0];

  // Resolve current active image
  const currentImage =
    activeHub.hasTimeToggle && timeMode === 'sunset' && activeHub.imageSunset
      ? activeHub.imageSunset
      : activeHub.imageDay;

  const handleHubSelect = (hubId) => {
    setActiveHubId(hubId);
    setActiveHotspot(null);
  };

  const handleBookDestination = (destinationName, vehicleId) => {
    openBooking(vehicleId || 'suburban');
  };

  return (
    <section id="interactive-explorer" className="interactive-city-section" aria-label="Interactive Houston City Explorer">
      {/* Background radial glow */}
      <div className="city-section-glow" />

      <div className="container city-container">
        
        {/* Section Header */}
        <div className="city-header-block reveal-on-scroll">
          <h2 className="city-main-heading">
            HOUSTON’S ICONIC CORRIDORS<br />
            <span className="orange-accent">& SIGNATURE DESTINATIONS</span>
          </h2>

          <p className="city-sub-description">
            Explore our most frequented ground routes across Greater Houston. Tap any destination to view real-time transit telemetry, interactive landmarks, and chauffeur advantages.
          </p>
        </div>

        {/* Mobile Horizontal Pill Selector (< 900px) */}
        <div className="city-mobile-tabs-scroll" role="tablist">
          {HUBS_DATA.map((hub) => {
            const isActive = hub.id === activeHubId;
            return (
              <button
                key={hub.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => handleHubSelect(hub.id)}
                className={`city-mobile-tab-pill ${isActive ? 'active' : ''}`}
              >
                <span className="tab-pill-dot" />
                <span className="tab-pill-text">{hub.name}</span>
              </button>
            );
          })}
        </div>

        {/* Main Interactive Stage Grid */}
        <div className="city-stage-grid">
          
          {/* LEFT: Cinematic Visual Stage with Hotspots & Time Toggle */}
          <div className="city-visual-col reveal-on-scroll">
            <div className="city-visual-frame">
              {/* Main Landmark Photo */}
              <img
                key={currentImage}
                src={currentImage}
                alt={`${activeHub.name} - Lavender Taxi Houston Chauffeur Destination`}
                className="city-landmark-photo"
              />

              {/* Gradient Vignette Overlay for Readability */}
              <div className="city-photo-vignette" />

              {/* Floating Top Header Badge */}
              <div className="city-badge-floating">
                <span className="city-badge-kicker">{activeHub.badge}</span>
                <h3 className="city-badge-title">{activeHub.name}</h3>
              </div>

              {/* Interactive Day / Golden Hour Switcher (Only for Downtown) */}
              {activeHub.hasTimeToggle && (
                <div className="city-time-toggle-dock" role="group" aria-label="Toggle Daytime and Golden Hour perspectives">
                  <button
                    type="button"
                    onClick={() => setTimeMode('day')}
                    className={`time-toggle-btn ${timeMode === 'day' ? 'active' : ''}`}
                    title="Switch to Daytime View"
                  >
                    <Sun size={13} />
                    <span>Daytime</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setTimeMode('sunset')}
                    className={`time-toggle-btn ${timeMode === 'sunset' ? 'active' : ''}`}
                    title="Switch to Golden Hour Sunset View"
                  >
                    <Sunset size={13} />
                    <span>Golden Hour</span>
                  </button>
                </div>
              )}

              {/* Interactive Pulsing Hotspot Pins */}
              {activeHub.hotspots.map((pin, idx) => {
                const isPinActive = activeHotspot === pin.id;
                return (
                  <div
                    key={pin.id}
                    className="city-hotspot-container"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveHotspot(isPinActive ? null : pin.id)}
                      className={`city-hotspot-pin ${isPinActive ? 'active' : ''}`}
                      aria-label={`View landmark: ${pin.title}`}
                      title={pin.title}
                    >
                      <span className="hotspot-pulse" />
                      <span className="hotspot-core">{idx + 1}</span>
                    </button>

                    {/* Popover Micro Card */}
                    {isPinActive && (
                      <div className="city-hotspot-popover">
                        <div className="popover-arrow" />
                        <span className="popover-title">{pin.title}</span>
                        <p className="popover-desc">{pin.desc}</p>
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Hint badge on bottom of visual */}
              <div className="city-visual-hint">
                <Sparkles size={13} color="#E88C2B" />
                <span>Tap numbered pins to inspect chauffeur landmarks</span>
              </div>
            </div>
          </div>

          {/* RIGHT: Hub Navigation Bento & Live Telemetry Panel */}
          <div className="city-controls-col reveal-on-scroll reveal-delay-1">
            
            {/* Desktop Hub Selector Cards (Hidden on mobile where horizontal scroll is used) */}
            <div className="city-desktop-hubs-list" role="tablist" aria-label="Select destination hub">
              {HUBS_DATA.map((hub) => {
                const isSelected = hub.id === activeHubId;
                return (
                  <div
                    key={hub.id}
                    role="tab"
                    aria-selected={isSelected}
                    tabIndex={0}
                    onClick={() => handleHubSelect(hub.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        handleHubSelect(hub.id);
                      }
                    }}
                    className={`city-hub-card ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="hub-card-thumb-wrap">
                      <img src={hub.imageDay} alt="" className="hub-card-thumb-img" />
                      {isSelected && <div className="hub-thumb-active-ring" />}
                    </div>

                    <div className="hub-card-text">
                      <div className="hub-card-title-row">
                        <span className="hub-card-name">{hub.name}</span>
                        {isSelected && <span className="hub-card-active-pill">ACTIVE</span>}
                      </div>
                      <span className="hub-card-sub">{hub.subtitle}</span>
                    </div>

                    <ArrowRight size={15} className="hub-card-arrow" />
                  </div>
                );
              })}
            </div>

            {/* Live Route Telemetry & Chauffeur Intelligence Card */}
            <div className="city-telemetry-panel">
              <div className="telemetry-header">
                <div className="telemetry-tag">
                  <Navigation size={13} color="#E88C2B" />
                  <span>ROUTE INTELLIGENCE & TELEMETRY</span>
                </div>
                <div className="telemetry-live-indicator">
                  <span className="live-dot" />
                  <span>GPS / FAA Monitored</span>
                </div>
              </div>

              {/* Stats Dual Grid */}
              <div className="telemetry-stats-grid">
                <div className="telemetry-stat-box">
                  <div className="stat-label-row">
                    <Clock size={13} color="#94A3B8" />
                    <span>FROM BUSH (IAH)</span>
                  </div>
                  <span className="stat-value">{activeHub.stats.iah}</span>
                </div>

                <div className="telemetry-stat-box">
                  <div className="stat-label-row">
                    <Clock size={13} color="#94A3B8" />
                    <span>FROM HOBBY (HOU)</span>
                  </div>
                  <span className="stat-value">{activeHub.stats.hou}</span>
                </div>
              </div>

              {/* Recommended Fleet Vehicle */}
              <div className="telemetry-fleet-row">
                <div className="fleet-icon-box">
                  <Car size={16} color="#E88C2B" />
                </div>
                <div className="fleet-text">
                  <span className="fleet-title">RECOMMENDED FLEET:</span>
                  <span className="fleet-name">{activeHub.stats.recommended}</span>
                </div>
              </div>

              {/* Chauffeur Advantages Checklist */}
              <div className="telemetry-perks-stack">
                {activeHub.highlights.map((item, idx) => (
                  <div key={idx} className="telemetry-perk-item">
                    <CheckCircle2 size={15} color="#E88C2B" className="perk-check-icon" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <div className="telemetry-action-row">
                <button
                  type="button"
                  onClick={() => handleBookDestination(activeHub.name, activeHub.stats.recommendedId)}
                  className="city-reserve-btn"
                >
                  <span>RESERVE CHAUFFEUR TO {activeHub.name.toUpperCase()}</span>
                  <ArrowRight size={16} strokeWidth={2.4} />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

      <style>{`
        /* ==========================================================================
           INTERACTIVE CITY EXPLORER SECTION — LUXURY THEME & RESPONSIVE PERFECTION
           ========================================================================== */

        .interactive-city-section {
          position: relative;
          background: #08020C;
          color: #FFFFFF;
          padding: 100px 0 110px 0;
          overflow: hidden;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .city-section-glow {
          position: absolute;
          top: 20%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 800px;
          height: 500px;
          background: radial-gradient(circle, rgba(232, 140, 43, 0.12) 0%, rgba(8, 2, 12, 0) 70%);
          pointer-events: none;
          z-index: 1;
        }

        .city-container {
          position: relative;
          z-index: 2;
        }

        /* Section Header */
        .city-header-block {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 52px auto;
        }

        .city-main-heading {
          font-family: var(--font-heading);
          font-size: clamp(2.2rem, 4vw, 3.2rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 16px;
        }

        .city-main-heading .orange-accent {
          color: #E88C2B;
        }

        .city-sub-description {
          font-size: 1.02rem;
          color: #CBD5E1;
          line-height: 1.6;
          margin: 0 auto;
        }

        /* Mobile Tab Pill Scroll (Hidden on desktop) */
        .city-mobile-tabs-scroll {
          display: none;
        }

        /* Main 2-Column Grid */
        .city-stage-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 32px;
          align-items: start;
        }

        /* Visual Stage Frame */
        .city-visual-col {
          width: 100%;
        }

        .city-visual-frame {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 11;
          border-radius: 24px;
          overflow: hidden;
          background: #110518;
          border: 1px solid rgba(255, 255, 255, 0.14);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.65), 0 0 30px rgba(232, 140, 43, 0.08);
        }

        .city-landmark-photo {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), filter 0.5s ease;
        }

        .city-visual-frame:hover .city-landmark-photo {
          transform: scale(1.025);
        }

        .city-photo-vignette {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.60) 0%,
            rgba(0, 0, 0, 0.05) 35%,
            rgba(0, 0, 0, 0.15) 60%,
            rgba(0, 0, 0, 0.80) 100%
          );
          pointer-events: none;
          z-index: 2;
        }

        /* Floating Top Left Badge */
        .city-badge-floating {
          position: absolute;
          top: 20px;
          left: 20px;
          z-index: 5;
          background: rgba(14, 3, 20, 0.75);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 14px;
          padding: 10px 16px;
          max-width: calc(100% - 160px);
        }

        .city-badge-kicker {
          display: block;
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #E88C2B;
          text-transform: uppercase;
          margin-bottom: 2px;
        }

        .city-badge-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.2;
        }

        /* Time Switcher Toggle */
        .city-time-toggle-dock {
          position: absolute;
          top: 20px;
          right: 20px;
          z-index: 6;
          display: inline-flex;
          align-items: center;
          background: rgba(10, 2, 14, 0.85);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 9999px;
          padding: 4px;
          gap: 4px;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.4);
        }

        .time-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          color: #CBD5E1;
          font-family: inherit;
          font-size: 0.75rem;
          font-weight: 700;
          padding: 6px 12px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.18s ease;
          touch-action: manipulation;
        }

        .time-toggle-btn.active {
          background: #E88C2B;
          color: #FFFFFF;
          box-shadow: 0 2px 10px rgba(232, 140, 43, 0.5);
        }

        .time-toggle-btn:hover:not(.active) {
          color: #FFFFFF;
          background: rgba(255, 255, 255, 0.12);
        }

        /* Hotspots */
        .city-hotspot-container {
          position: absolute;
          transform: translate(-50%, -50%);
          z-index: 8;
        }

        .city-hotspot-pin {
          position: relative;
          width: 32px;
          height: 32px;
          background: rgba(14, 3, 20, 0.90);
          border: 2px solid #E88C2B;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          color: #FFFFFF;
          font-size: 0.76rem;
          font-weight: 900;
          box-shadow: 0 0 16px rgba(232, 140, 43, 0.65);
          transition: all 0.2s ease;
          touch-action: manipulation;
        }

        .city-hotspot-pin:hover,
        .city-hotspot-pin.active {
          transform: scale(1.15);
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #FFFFFF;
          box-shadow: 0 0 24px rgba(232, 140, 43, 0.9);
        }

        .hotspot-pulse {
          position: absolute;
          inset: -6px;
          border: 2px solid #E88C2B;
          border-radius: 50%;
          animation: hotspotPulse 2s infinite ease-out;
          opacity: 0.8;
          pointer-events: none;
        }

        @keyframes hotspotPulse {
          0% { transform: scale(0.85); opacity: 1; }
          100% { transform: scale(1.6); opacity: 0; }
        }

        .city-hotspot-popover {
          position: absolute;
          bottom: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%);
          width: 210px;
          background: rgba(14, 3, 20, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(232, 140, 43, 0.45);
          border-radius: 12px;
          padding: 12px 14px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.7);
          z-index: 15;
          animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popoverFadeIn {
          from { opacity: 0; transform: translate(-50%, 6px); }
          to { opacity: 1; transform: translate(-50%, 0); }
        }

        .popover-arrow {
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          border-width: 6px;
          border-style: solid;
          border-color: rgba(232, 140, 43, 0.45) transparent transparent transparent;
        }

        .popover-title {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.84rem;
          font-weight: 800;
          color: #E88C2B;
          margin-bottom: 4px;
          line-height: 1.25;
        }

        .popover-desc {
          font-size: 0.76rem;
          color: #E2E8F0;
          line-height: 1.4;
          margin: 0;
        }

        .city-visual-hint {
          position: absolute;
          bottom: 16px;
          left: 20px;
          z-index: 5;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(8px);
          padding: 5px 12px;
          border-radius: 9999px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        /* Controls Column */
        .city-controls-col {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        /* Desktop Hub Cards List */
        .city-desktop-hubs-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .city-hub-card {
          display: flex;
          align-items: center;
          gap: 14px;
          background: rgba(255, 255, 255, 0.04);
          border: 1.5px solid rgba(255, 255, 255, 0.09);
          border-radius: 16px;
          padding: 10px 14px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .city-hub-card:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(232, 140, 43, 0.4);
          transform: translateX(4px);
        }

        .city-hub-card.selected {
          background: rgba(232, 140, 43, 0.12);
          border-color: #E88C2B;
          box-shadow: 0 4px 20px rgba(232, 140, 43, 0.18);
        }

        .hub-card-thumb-wrap {
          position: relative;
          width: 58px;
          height: 48px;
          border-radius: 10px;
          overflow: hidden;
          flex-shrink: 0;
          background: #000;
        }

        .hub-card-thumb-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .hub-thumb-active-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #E88C2B;
          border-radius: 10px;
        }

        .hub-card-text {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
        }

        .hub-card-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 2px;
        }

        .hub-card-name {
          font-family: var(--font-heading);
          font-size: 0.96rem;
          font-weight: 800;
          color: #FFFFFF;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .city-hub-card.selected .hub-card-name {
          color: #E88C2B;
        }

        .hub-card-active-pill {
          font-size: 0.62rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          background: #E88C2B;
          color: #FFFFFF;
          padding: 2px 6px;
          border-radius: 9999px;
        }

        .hub-card-sub {
          font-size: 0.78rem;
          color: #94A3B8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .hub-card-arrow {
          color: #64748B;
          flex-shrink: 0;
          transition: transform 0.2s ease, color 0.2s ease;
        }

        .city-hub-card:hover .hub-card-arrow,
        .city-hub-card.selected .hub-card-arrow {
          color: #E88C2B;
          transform: translateX(3px);
        }

        /* Telemetry & Perks Panel */
        .city-telemetry-panel {
          background: rgba(18, 5, 25, 0.7);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1.5px solid rgba(255, 255, 255, 0.12);
          border-radius: 20px;
          padding: 22px;
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4);
        }

        .telemetry-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 18px;
          padding-bottom: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .telemetry-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #E88C2B;
          text-transform: uppercase;
        }

        .telemetry-live-indicator {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #94A3B8;
        }

        .live-dot {
          width: 8px;
          height: 8px;
          background: #10B981;
          border-radius: 50%;
          box-shadow: 0 0 8px #10B981;
          animation: livePulse 2s infinite ease-in-out;
        }

        @keyframes livePulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }

        /* Telemetry Dual Stat Grid */
        .telemetry-stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 14px;
        }

        .telemetry-stat-box {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 10px 14px;
        }

        .stat-label-row {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: #94A3B8;
          text-transform: uppercase;
          margin-bottom: 4px;
        }

        .stat-value {
          display: block;
          font-family: var(--font-heading);
          font-size: 0.95rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        /* Recommended Fleet Row */
        .telemetry-fleet-row {
          display: flex;
          align-items: center;
          gap: 12px;
          background: rgba(232, 140, 43, 0.08);
          border: 1px solid rgba(232, 140, 43, 0.25);
          border-radius: 12px;
          padding: 10px 14px;
          margin-bottom: 16px;
        }

        .fleet-icon-box {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          background: rgba(232, 140, 43, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .fleet-text {
          display: flex;
          flex-direction: column;
        }

        .fleet-title {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #E88C2B;
        }

        .fleet-name {
          font-size: 0.88rem;
          font-weight: 800;
          color: #FFFFFF;
        }

        /* Perks Stack */
        .telemetry-perks-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 20px;
        }

        .telemetry-perk-item {
          display: flex;
          align-items: flex-start;
          gap: 9px;
          font-size: 0.84rem;
          color: #E2E8F0;
          line-height: 1.45;
        }

        .perk-check-icon {
          flex-shrink: 0;
          margin-top: 2px;
        }

        /* Reserve Button */
        .telemetry-action-row {
          width: 100%;
        }

        .city-reserve-btn {
          width: 100%;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: linear-gradient(135deg, #E88C2B 0%, #D2791C 100%);
          color: #FFFFFF;
          border: none;
          padding: 14px 20px;
          border-radius: 9999px;
          font-family: inherit;
          font-size: 0.90rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          cursor: pointer;
          touch-action: manipulation;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.42);
        }

        .city-reserve-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(232, 140, 43, 0.58);
          filter: brightness(1.05);
        }

        .city-reserve-btn:active {
          transform: scale(0.98);
        }

        /* ==========================================================================
           RESPONSIVE BREAKPOINTS (Mobile & Tablet Layout Perfection)
           ========================================================================== */

        @media (max-width: 1024px) {
          .city-stage-grid {
            grid-template-columns: 1fr;
            gap: 28px;
          }

          .city-visual-frame {
            aspect-ratio: 16 / 10;
          }

          .city-desktop-hubs-list {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }
        }

        @media (max-width: 768px) {
          .interactive-city-section {
            padding: 70px 0 80px 0;
          }

          .city-header-block {
            text-align: left;
            margin-bottom: 24px;
          }

          .city-main-heading {
            font-size: clamp(1.9rem, 7.2vw, 2.5rem);
            margin-bottom: 12px;
          }

          .city-sub-description {
            font-size: 0.92rem;
            line-height: 1.5;
          }

          /* Show horizontal scrolling tab pills on mobile */
          .city-mobile-tabs-scroll {
            display: flex;
            align-items: center;
            gap: 8px;
            overflow-x: auto;
            overflow-y: hidden;
            padding-bottom: 14px;
            margin-bottom: 18px;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: none;
          }

          .city-mobile-tabs-scroll::-webkit-scrollbar {
            display: none;
          }

          .city-mobile-tab-pill {
            display: inline-flex;
            align-items: center;
            gap: 7px;
            background: rgba(255, 255, 255, 0.06);
            border: 1px solid rgba(255, 255, 255, 0.14);
            border-radius: 9999px;
            padding: 9px 16px;
            color: #CBD5E1;
            font-family: inherit;
            font-size: 0.84rem;
            font-weight: 700;
            white-space: nowrap;
            cursor: pointer;
            touch-action: manipulation;
            transition: all 0.16s ease;
            flex-shrink: 0;
          }

          .city-mobile-tab-pill.active {
            background: #E88C2B;
            color: #FFFFFF;
            border-color: #E88C2B;
            box-shadow: 0 4px 14px rgba(232, 140, 43, 0.45);
          }

          .tab-pill-dot {
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: currentColor;
          }

          /* Hide desktop hub list on mobile */
          .city-desktop-hubs-list {
            display: none;
          }

          .city-visual-frame {
            aspect-ratio: 4 / 3;
            border-radius: 18px;
          }

          .city-badge-floating {
            top: 14px;
            left: 14px;
            padding: 8px 12px;
            max-width: calc(100% - 150px);
          }

          .city-badge-kicker {
            font-size: 0.62rem;
          }

          .city-badge-title {
            font-size: 0.96rem;
          }

          .city-time-toggle-dock {
            top: 14px;
            right: 14px;
            padding: 3px;
          }

          .time-toggle-btn {
            font-size: 0.70rem;
            padding: 5px 9px;
            gap: 4px;
          }

          .city-visual-hint {
            display: none;
          }

          .city-telemetry-panel {
            padding: 18px;
            border-radius: 18px;
          }

          .telemetry-stats-grid {
            grid-template-columns: 1fr;
            gap: 8px;
          }

          .telemetry-stat-box {
            padding: 9px 12px;
          }

          .stat-value {
            font-size: 0.90rem;
          }

          .telemetry-perks-stack {
            gap: 7px;
          }

          .telemetry-perk-item {
            font-size: 0.80rem;
          }

          .city-reserve-btn {
            font-size: 0.82rem;
            padding: 13px 16px;
          }
        }
      `}</style>
    </section>
  );
}
