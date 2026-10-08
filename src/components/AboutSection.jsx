import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Calendar,
  Compass,
  Check,
  X as CloseIcon,
  Shield,
  FileCheck2,
  Award
} from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW, getDirectWhatsAppOwnerUrl } from '../utils/whatsapp';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('story');
  const navigate = useNavigate();
  const location = useLocation();

  const handleReserveClick = () => {
    if (location.pathname !== '/') {
      navigate('/#booking-engine');
      setTimeout(() => {
        smoothScrollTo('#booking-engine');
      }, 150);
    } else {
      smoothScrollTo('#booking-engine');
    }
  };

  const handleFleetClick = () => {
    if (location.pathname !== '/') {
      navigate('/#fleet');
      setTimeout(() => {
        smoothScrollTo('#fleet');
      }, 150);
    } else {
      smoothScrollTo('#fleet');
    }
  };

  return (
    <section id="about" className="luxury-about-section" aria-label="About Lavender Taxi Service & Founder">
      <div className="container">
        
        {/* =====================================================================
            1. SECTION HEADER (NO PILLS / NO SPARKLES / THICK HEADINGS)
            ===================================================================== */}
        <header className="about-header-block reveal-on-scroll">
          <span className="about-pre-heading">FOUNDER & EXECUTIVE PHILOSOPHY</span>
          <h2 className="about-main-title">
            DRIVEN BY INTEGRITY. DEFINED BY PERSONAL SERVICE.
          </h2>
          <p className="about-sub-title">
            Meet <strong>Symanthan</strong> — the dedicated founder and managing owner-chauffeur behind Lavender Taxi Service. Bringing honest upfront flat rates, punctual excellence, and true personal accountability to Greater Houston.
          </p>
        </header>

        {/* =====================================================================
            2. MAIN 2-COLUMN LUXURY EDITORIAL GRID
            ===================================================================== */}
        <div className="about-grid-main">
          
          {/* LEFT COLUMN: Executive Owner Showcase Card */}
          <aside className="owner-card-bezel reveal-on-scroll">
            <div className="owner-card-inner">
              
              {/* Portrait Frame */}
              <div className="owner-image-frame">
                <img
                  src="/images/owner_suburban_street.jpg"
                  alt="Symanthan with Flagship Chevrolet Suburban - Founder & Owner of Lavender Taxi Service"
                  className="owner-photo-img"
                />
                
                {/* Active Owner Status Bar (Architectural, not pill) */}
                <div className="owner-status-bar">
                  <span className="status-dot-pulse" />
                  <span className="status-label">OWNER-CHAUFFEUR · ON DUTY IN HOUSTON</span>
                </div>
              </div>

              {/* Owner Info & Verified Credentials */}
              <div className="owner-info-content">
                <div className="owner-title-row">
                  <div>
                    <h3 className="owner-name-heading">Symanthan</h3>
                    <p className="owner-role-text">Founder & Managing Chauffeur</p>
                  </div>
                  <div className="owner-verified-tag" title="City of Houston Licensed & Permitted Business">
                    <ShieldCheck size={14} color="#E88C2B" strokeWidth={2.4} />
                    <span>CITY PERMITTED</span>
                  </div>
                </div>

                {/* Service Credentials Matrix */}
                <div className="owner-credentials-grid">
                  <div className="cred-tile">
                    <MapPin size={13} color="#E88C2B" strokeWidth={2.2} />
                    <span>Houston, TX</span>
                  </div>
                  <div className="cred-tile">
                    <Calendar size={13} color="#E88C2B" strokeWidth={2.2} />
                    <span>10+ Yrs In Texas</span>
                  </div>
                  <div className="cred-tile">
                    <Award size={13} color="#E88C2B" strokeWidth={2.2} />
                    <span>5,000+ Transfers</span>
                  </div>
                </div>

                {/* Founder's Word of Honor Quote */}
                <div className="owner-quote-box">
                  <p className="quote-text">
                    “When you book with Lavender Taxi, you have my personal word on your pickup. No cancelled rides, no surge pricing—just dependable, executive service every single time.”
                  </p>
                  <div className="quote-author-row">
                    <span className="author-name">— Symanthan</span>
                    <span className="author-title">Owner-Operator</span>
                  </div>
                </div>

                {/* Direct Owner Actions */}
                <div className="owner-direct-actions">
                  <a
                    href={getDirectWhatsAppOwnerUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-owner-whatsapp"
                    title="Chat directly with Symanthan on WhatsApp"
                  >
                    <MessageCircle size={17} strokeWidth={2.2} />
                    <span>WHATSAPP SYMANTHAN</span>
                  </a>

                  <a
                    href={`tel:+${OWNER_PHONE_RAW}`}
                    className="btn-owner-call"
                    title="Call Symanthan Directly"
                  >
                    <Phone size={15} strokeWidth={2.2} />
                    <span>CALL {OWNER_PHONE_DISPLAY}</span>
                  </a>
                </div>

              </div>
            </div>
          </aside>

          {/* RIGHT COLUMN: Editorial Story & Chauffeur Philosophy */}
          <div className="about-editorial-panel reveal-on-scroll">
            
            {/* Architectural Tab Switcher */}
            <div className="about-tabs-track" role="tablist" aria-label="About tabs">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'story'}
                onClick={() => setActiveTab('story')}
                className={`about-tab-item ${activeTab === 'story' ? 'is-active' : ''}`}
              >
                <Compass size={15} strokeWidth={2.2} />
                <span>OUR STORY</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'standard'}
                onClick={() => setActiveTab('standard')}
                className={`about-tab-item ${activeTab === 'standard' ? 'is-active' : ''}`}
              >
                <Shield size={15} strokeWidth={2.2} />
                <span>CHAUFFEUR CODE</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'advantage'}
                onClick={() => setActiveTab('advantage')}
                className={`about-tab-item ${activeTab === 'advantage' ? 'is-active' : ''}`}
              >
                <FileCheck2 size={15} strokeWidth={2.2} />
                <span>OWNER ADVANTAGE</span>
              </button>
            </div>

            {/* TAB 1: The Business Journey & Mission */}
            {activeTab === 'story' && (
              <div className="tab-pane-content">
                <h4 className="pane-lead-title">
                  RESTORING TRUST AND DIGNITY TO PRIVATE GROUND TRANSPORTATION
                </h4>
                
                <p className="pane-lead-text">
                  Over a decade ago, Symanthan observed a troubling decline across Houston’s ground transportation landscape. Algorithmic rideshare platforms introduced erratic surge multipliers, anonymous drivers, and sudden cancellations—leaving travelers stranded at Bush Intercontinental (IAH) and William P. Hobby (HOU) late at night or during coastal weather events.
                </p>

                <p className="pane-body-text">
                  Believing that passengers deserve respect and absolute predictability, Symanthan founded <strong>Lavender Taxi Service</strong>. The philosophy was simple: provide guaranteed upfront flat pricing, immaculate vehicles, and genuine personal accountability where the business owner is directly reachable on every single reservation.
                </p>

                {/* 2 High-Craft Story Bento Cards */}
                <div className="story-bento-grid">
                  <div className="story-bento-item">
                    <div className="bento-tile-icon">
                      <Clock size={18} color="#E88C2B" strokeWidth={2.4} />
                    </div>
                    <div>
                      <h5 className="bento-tile-heading">Real-Time Flight Radar Tracking</h5>
                      <p className="bento-tile-desc">
                        We monitor FAA flight tail numbers live. Early touchdown or two-hour airline delay—your chauffeur is curbside the moment you clear baggage claim with zero waiting surcharges.
                      </p>
                    </div>
                  </div>

                  <div className="story-bento-item">
                    <div className="bento-tile-icon">
                      <ShieldCheck size={18} color="#E88C2B" strokeWidth={2.4} />
                    </div>
                    <div>
                      <h5 className="bento-tile-heading">Hands-On Owner Accountability</h5>
                      <p className="bento-tile-desc">
                        Symanthan personally manages dispatching and reservations. You communicate directly with the owner, not an automated chatbot, offshore call center, or impersonal algorithm.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: The 4 Chauffeur Standards */}
            {activeTab === 'standard' && (
              <div className="tab-pane-content">
                <h4 className="pane-lead-title">
                  THE FOUR NON-NEGOTIABLE PILLARS OF OUR PRIVATE SERVICE
                </h4>

                <div className="standards-quad-grid">
                  <div className="standard-pillar-card">
                    <span className="pillar-num-code">01</span>
                    <div className="pillar-text-group">
                      <h5 className="pillar-heading">Guaranteed Flat-Rate Transparency</h5>
                      <p className="pillar-copy">
                        Zero dynamic surge pricing. Whether it is peak rush hour on Loop 610, torrential Gulf rain, or holiday weekends, the upfront quote you receive is the exact fare you pay.
                      </p>
                    </div>
                  </div>

                  <div className="standard-pillar-card">
                    <span className="pillar-num-code">02</span>
                    <div className="pillar-text-group">
                      <h5 className="pillar-heading">Commercial FAA Flight Sync</h5>
                      <p className="pillar-copy">
                        We synchronize our dispatch with your actual aircraft touchdown time at IAH & HOU, ensuring timely curbside pickup regardless of airline gate delays.
                      </p>
                    </div>
                  </div>

                  <div className="standard-pillar-card">
                    <span className="pillar-num-code">03</span>
                    <div className="pillar-text-group">
                      <h5 className="pillar-heading">Executive Cabin Sterilization</h5>
                      <p className="pillar-copy">
                        Every Chevrolet Suburban and Lexus Sedan is sanitized and detailed between clients, complete with chilled bottled spring water and rapid multi-device charging.
                      </p>
                    </div>
                  </div>

                  <div className="standard-pillar-card">
                    <span className="pillar-num-code">04</span>
                    <div className="pillar-text-group">
                      <h5 className="pillar-heading">White-Glove Baggage & Courtesy</h5>
                      <p className="pillar-copy">
                        From your residence to the airport terminal, our chauffeurs handle heavy luggage, open doors, and provide a quiet, smooth ride tailored strictly to your preferences.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: The Personal Advantage (Comparison) */}
            {activeTab === 'advantage' && (
              <div className="tab-pane-content">
                <h4 className="pane-lead-title">
                  WHY TRAVELERS CHOOSE AN OWNER-OPERATOR OVER APP RIDES
                </h4>

                <div className="comparison-table-wrapper">
                  <div className="comparison-table-head">
                    <span className="head-col-feature">SERVICE DIMENSION</span>
                    <span className="head-col-brand">LAVENDER TAXI SERVICE</span>
                    <span className="head-col-apps">GENERIC APP RIDES</span>
                  </div>

                  <div className="comparison-table-body">
                    <div className="comparison-data-row">
                      <strong className="col-feature-title">Vehicle Guarantee</strong>
                      <span className="col-brand-val">
                        <Check size={15} color="#E88C2B" strokeWidth={3} />
                        Guaranteed Suburban or Lexus
                      </span>
                      <span className="col-apps-val">
                        <CloseIcon size={14} color="#8C7B79" strokeWidth={2.4} />
                        Random, unpredictable compact cars
                      </span>
                    </div>

                    <div className="comparison-data-row">
                      <strong className="col-feature-title">Pricing Integrity</strong>
                      <span className="col-brand-val">
                        <Check size={15} color="#E88C2B" strokeWidth={3} />
                        Zero Surge Ever (Upfront Flat Rate)
                      </span>
                      <span className="col-apps-val">
                        <CloseIcon size={14} color="#8C7B79" strokeWidth={2.4} />
                        2.0x – 3.5x Surge during rain & rush hour
                      </span>
                    </div>

                    <div className="comparison-data-row">
                      <strong className="col-feature-title">Driver Reliability</strong>
                      <span className="col-brand-val">
                        <Check size={15} color="#E88C2B" strokeWidth={3} />
                        100% Confirmed · Zero Cancellations
                      </span>
                      <span className="col-apps-val">
                        <CloseIcon size={14} color="#8C7B79" strokeWidth={2.4} />
                        Frequent last-minute cancellations
                      </span>
                    </div>

                    <div className="comparison-data-row">
                      <strong className="col-feature-title">Client Accountability</strong>
                      <span className="col-brand-val">
                        <Check size={15} color="#E88C2B" strokeWidth={3} />
                        Direct Line to Owner Symanthan
                      </span>
                      <span className="col-apps-val">
                        <CloseIcon size={14} color="#8C7B79" strokeWidth={2.4} />
                        Automated chatbots & ticket systems
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Action Row */}
            <div className="about-editorial-actions">
              <button
                type="button"
                onClick={handleReserveClick}
                className="btn-reserve-lead"
              >
                <span>RESERVE YOUR PRIVATE RIDE</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>

              <button
                type="button"
                onClick={handleFleetClick}
                className="btn-inspect-fleet"
              >
                <span>INSPECT FLEET & SPECS</span>
              </button>
            </div>

          </div>
        </div>

        {/* =====================================================================
            3. FOUR TRUST MILESTONE METRICS (ARCHITECTURAL & THICK)
            ===================================================================== */}
        <div className="about-metrics-deck reveal-on-scroll">
          <div className="metric-card">
            <strong className="metric-stat-num">10+</strong>
            <span className="metric-stat-title">YEARS SERVING HOUSTON</span>
            <p className="metric-stat-desc">Deep navigational mastery across all Texas freeways, bypasses & terminals.</p>
          </div>

          <div className="metric-card">
            <strong className="metric-stat-num">5,000+</strong>
            <span className="metric-stat-title">AIRPORT & CRUISE RUNS</span>
            <p className="metric-stat-desc">Punctual transfers for IAH, HOU & Galveston Cruise Port.</p>
          </div>

          <div className="metric-card">
            <strong className="metric-stat-num">100%</strong>
            <span className="metric-stat-title">ON-TIME GUARANTEE</span>
            <p className="metric-stat-desc">Real-time FAA flight radar synchronization ensures we are always waiting curbside.</p>
          </div>

          <div className="metric-card">
            <strong className="metric-stat-num">0%</strong>
            <span className="metric-stat-title">SURGE SURCHARGES EVER</span>
            <p className="metric-stat-desc">Honest upfront flat-rate quotes rain or shine with zero surprise tolls or fees.</p>
          </div>
        </div>

      </div>

      <style>{`
        /* ==========================================================================
           ABOUT SECTION — LUXURY EDITORIAL & MINIMALIST REDESIGN
           ========================================================================== */
        .luxury-about-section {
          background: #FEFBF3;
          padding: 100px 0 110px 0;
          color: #1C0C0B;
        }

        /* 1. Header */
        .about-header-block {
          text-align: left;
          max-width: 860px;
          margin-bottom: 52px;
        }

        .about-pre-heading {
          font-family: var(--font-body);
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #E88C2B;
          display: block;
          margin-bottom: 12px;
        }

        .about-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.3rem, 3.8vw, 3.3rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.08;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin-bottom: 16px;
          text-rendering: optimizeLegibility;
        }

        .about-sub-title {
          font-size: 1.05rem;
          color: #5C4D4B;
          line-height: 1.65;
          max-width: 720px;
        }

        /* 2. Grid */
        .about-grid-main {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 48px;
          align-items: start;
          margin-bottom: 64px;
        }

        /* Left Owner Card */
        .owner-card-bezel {
          background: #FAF6EE;
          border: 1px solid rgba(78, 4, 1, 0.1);
          border-radius: 20px;
          padding: 12px;
          box-shadow: 0 12px 32px rgba(78, 4, 1, 0.05);
          position: sticky;
          top: 96px;
        }

        .owner-card-inner {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 16px;
          padding: 24px;
          text-align: left;
        }

        .owner-image-frame {
          position: relative;
          width: 100%;
          border-radius: 12px;
          overflow: hidden;
          background: #0B030A;
          border: 1px solid rgba(78, 4, 1, 0.08);
        }

        .owner-photo-img {
          width: 100%;
          aspect-ratio: 4 / 3;
          object-fit: cover;
          object-position: 55% center;
          display: block;
          transition: transform 0.4s ease;
        }

        .owner-image-frame:hover .owner-photo-img {
          transform: scale(1.025);
        }

        .owner-status-bar {
          position: absolute;
          bottom: 10px;
          left: 10px;
          right: 10px;
          background: rgba(14, 3, 16, 0.90);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          color: #FFFFFF;
          padding: 7px 12px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.12);
        }

        .status-dot-pulse {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
          flex-shrink: 0;
        }

        .status-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #CBD5E1;
        }

        /* Owner Details */
        .owner-info-content {
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .owner-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 12px;
        }

        .owner-name-heading {
          font-family: var(--font-heading);
          font-size: 1.6rem;
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          margin: 0;
        }

        .owner-role-text {
          font-size: 0.82rem;
          color: #786C6A;
          font-weight: 700;
          margin-top: 3px;
        }

        .owner-verified-tag {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #FAF6EE;
          border: 1px solid rgba(232, 140, 43, 0.35);
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 0.68rem;
          font-weight: 900;
          letter-spacing: 0.08em;
          color: #E88C2B;
        }

        /* Credentials Grid */
        .owner-credentials-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .cred-tile {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #FAF6EE;
          border: 1px solid rgba(78, 4, 1, 0.08);
          padding: 8px;
          border-radius: 8px;
          font-size: 0.72rem;
          font-weight: 700;
          color: #4E0401;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        /* Quote Box */
        .owner-quote-box {
          background: #FAF6EE;
          border-left: 3px solid #E88C2B;
          border-radius: 0 10px 10px 0;
          padding: 14px 16px;
        }

        .quote-text {
          font-size: 0.88rem;
          font-style: italic;
          color: #350200;
          line-height: 1.55;
          margin: 0 0 8px 0;
        }

        .quote-author-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .author-name {
          font-weight: 900;
          font-size: 0.78rem;
          color: #4E0401;
        }

        .author-title {
          font-size: 0.72rem;
          color: #786C6A;
        }

        /* Direct Contact Buttons */
        .owner-direct-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .btn-owner-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #25D366;
          color: #FFFFFF;
          font-family: inherit;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          padding: 12px 18px;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 3px 12px rgba(37, 211, 102, 0.25);
          transition: all 0.18s ease;
        }

        .btn-owner-whatsapp:hover {
          background: #1EBE5D;
          transform: translateY(-1px);
        }

        .btn-owner-call {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-family: inherit;
          font-weight: 800;
          font-size: 0.85rem;
          letter-spacing: 0.04em;
          padding: 11px 18px;
          border-radius: 10px;
          text-decoration: none;
          transition: all 0.18s ease;
        }

        .btn-owner-call:hover {
          border-color: #E88C2B;
          color: #E88C2B;
        }

        /* Right Editorial Panel */
        .about-editorial-panel {
          text-align: left;
        }

        .about-tabs-track {
          display: flex;
          gap: 8px;
          background: #FAF6EE;
          padding: 6px;
          border-radius: 12px;
          margin-bottom: 32px;
          border: 1px solid rgba(78, 4, 1, 0.08);
        }

        .about-tab-item {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          color: #786C6A;
          font-family: inherit;
          font-weight: 800;
          font-size: 0.82rem;
          letter-spacing: 0.06em;
          padding: 11px 20px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .about-tab-item:hover:not(.is-active) {
          color: #4E0401;
          background: rgba(78, 4, 1, 0.05);
        }

        .about-tab-item.is-active {
          background: #4E0401;
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(78, 4, 1, 0.2);
        }

        /* Tab Content */
        .tab-pane-content {
          animation: tabContentIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes tabContentIn {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pane-lead-title {
          font-family: var(--font-heading);
          font-size: clamp(1.4rem, 2.2vw, 1.75rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.2;
          letter-spacing: -0.01em;
          margin-bottom: 16px;
          text-rendering: optimizeLegibility;
        }

        .pane-lead-text {
          font-size: 1.02rem;
          color: #4A3E3D;
          line-height: 1.65;
          margin-bottom: 14px;
        }

        .pane-body-text {
          font-size: 0.96rem;
          color: #5C4D4B;
          line-height: 1.65;
          margin-bottom: 28px;
        }

        /* Bento Grid */
        .story-bento-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }

        .story-bento-item {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 14px;
          padding: 22px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: 0 4px 14px rgba(78, 4, 1, 0.03);
          transition: transform 0.2s ease, border-color 0.2s ease;
        }

        .story-bento-item:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 140, 43, 0.4);
        }

        .bento-tile-icon {
          width: 38px;
          height: 38px;
          border-radius: 8px;
          background: #FAF6EE;
          border: 1px solid rgba(232, 140, 43, 0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bento-tile-heading {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 900;
          color: #4E0401;
          margin: 0 0 6px 0;
        }

        .bento-tile-desc {
          font-size: 0.86rem;
          color: #6E5E5C;
          line-height: 1.5;
          margin: 0;
        }

        /* Quad Grid */
        .standards-quad-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
          margin-bottom: 32px;
        }

        .standard-pillar-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 14px;
          padding: 22px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: 0 4px 14px rgba(78, 4, 1, 0.03);
        }

        .pillar-num-code {
          font-family: var(--font-heading);
          font-size: 1.1rem;
          font-weight: 900;
          color: #E88C2B;
          background: #FAF6EE;
          border: 1px solid rgba(232, 140, 43, 0.25);
          width: 38px;
          height: 38px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-text-group {
          display: flex;
          flex-direction: column;
        }

        .pillar-heading {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 900;
          color: #4E0401;
          margin: 0 0 6px 0;
        }

        .pillar-copy {
          font-size: 0.86rem;
          color: #6E5E5C;
          line-height: 1.5;
          margin: 0;
        }

        /* Comparison Table */
        .comparison-table-wrapper {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.1);
          border-radius: 14px;
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: 0 4px 16px rgba(78, 4, 1, 0.04);
        }

        .comparison-table-head {
          display: grid;
          grid-template-columns: 1.3fr 1.6fr 1.6fr;
          background: #4E0401;
          color: #FFFFFF;
          padding: 14px 20px;
          font-size: 0.74rem;
          font-weight: 900;
          letter-spacing: 0.12em;
        }

        .head-col-brand {
          color: #E88C2B;
        }

        .comparison-data-row {
          display: grid;
          grid-template-columns: 1.3fr 1.6fr 1.6fr;
          padding: 16px 20px;
          border-bottom: 1px solid rgba(78, 4, 1, 0.06);
          font-size: 0.88rem;
          align-items: center;
        }

        .comparison-data-row:last-child {
          border-bottom: none;
        }

        .col-feature-title {
          font-family: var(--font-heading);
          font-weight: 900;
          color: #4E0401;
        }

        .col-brand-val {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #4E0401;
          font-weight: 700;
        }

        .col-apps-val {
          display: flex;
          align-items: center;
          gap: 8px;
          color: #786C6A;
        }

        /* Actions */
        .about-editorial-actions {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-reserve-lead {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.90rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          padding: 14px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(232, 140, 43, 0.32);
        }

        .btn-reserve-lead:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 8px 22px rgba(232, 140, 43, 0.45);
        }

        .btn-inspect-fleet {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          padding: 13px 24px;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-inspect-fleet:hover {
          border-color: #E88C2B;
          color: #E88C2B;
        }

        /* 3. Milestone Metrics Deck */
        .about-metrics-deck {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .metric-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-top: 3px solid #E88C2B;
          border-radius: 14px;
          padding: 26px 20px;
          text-align: left;
          box-shadow: 0 4px 16px rgba(78, 4, 1, 0.03);
          transition: transform 0.2s ease;
        }

        .metric-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(78, 4, 1, 0.06);
        }

        .metric-stat-num {
          font-family: var(--font-heading);
          font-size: 2.5rem;
          font-weight: 900;
          color: #4E0401;
          display: block;
          line-height: 1;
          margin-bottom: 8px;
          text-rendering: optimizeLegibility;
        }

        .metric-stat-title {
          font-size: 0.76rem;
          font-weight: 900;
          letter-spacing: 0.1em;
          color: #E88C2B;
          display: block;
          margin-bottom: 6px;
        }

        .metric-stat-desc {
          font-size: 0.84rem;
          color: #6E5E5C;
          line-height: 1.48;
          margin: 0;
        }

        /* ==========================================================================
           RESPONSIVE REFINEMENTS
           ========================================================================== */
        @media (max-width: 1024px) {
          .about-grid-main {
            grid-template-columns: 1fr;
            gap: 36px;
          }

          .owner-card-bezel {
            position: static;
          }

          .about-metrics-deck {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .luxury-about-section {
            padding: 65px 0 75px 0;
          }

          .about-header-block {
            margin-bottom: 32px;
          }

          .about-pre-heading {
            font-size: 0.72rem;
            margin-bottom: 8px;
          }

          .about-main-title {
            font-size: 2rem;
            margin-bottom: 12px;
          }

          .about-sub-title {
            font-size: 0.94rem;
          }

          .about-tabs-track {
            overflow-x: auto;
            scrollbar-width: none;
          }

          .about-tabs-track::-webkit-scrollbar {
            display: none;
          }

          .about-tab-item {
            white-space: nowrap;
            padding: 10px 14px;
            font-size: 0.78rem;
          }

          .story-bento-grid,
          .standards-quad-grid {
            grid-template-columns: 1fr;
          }

          .comparison-table-head {
            grid-template-columns: 1fr;
            gap: 4px;
          }

          .comparison-data-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .about-metrics-deck {
            grid-template-columns: 1fr;
          }

          .about-editorial-actions {
            flex-direction: column;
            width: 100%;
          }

          .btn-reserve-lead,
          .btn-inspect-fleet {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
