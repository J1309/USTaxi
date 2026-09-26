import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Award, 
  MapPin, 
  Quote, 
  Calendar,
  Compass,
  HeartHandshake,
  Check,
  X as CloseIcon
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
    <section id="about" className="about-section-luxury">
      <div className="container">
        
        {/* Section Header */}
        <div className="about-header-block reveal-on-scroll">
          <div className="about-tag-pill">
            <Sparkles size={14} color="#E88C2B" />
            <span>MEET THE FOUNDER & OUR PHILOSOPHY</span>
          </div>
          <h2 className="about-main-title">
            Driven by Integrity. Defined by Personal Service.
          </h2>
          <p className="about-sub-title">
            Meet <strong>Symanthan</strong> — the dedicated founder and owner-chauffeur behind Lavender Taxi Service, 
            bringing honest upfront flat rates, punctual excellence, and true Southern hospitality to Greater Houston.
          </p>
        </div>

        {/* Main 2-Column Luxury Layout */}
        <div className="about-grid-main">
          
          {/* LEFT COLUMN: Executive Owner Showcase Card */}
          <div className="owner-card-bezel reveal-on-scroll reveal-delay-1">
            <div className="owner-card-inner">
              
              {/* Portrait Image Frame */}
              <div className="owner-image-frame">
                <img
                  src="/images/owner_symanthan.jpg"
                  alt="Symanthan - Founder & Owner of Lavender Taxi Service"
                  className="owner-photo-img"
                />
                
                {/* Active Owner Status Pill */}
                <div className="owner-status-pill">
                  <span className="status-dot-pulse" />
                  <span>Owner-Chauffeur • Active in Houston</span>
                </div>
              </div>

              {/* Owner Info Details */}
              <div className="owner-info-content">
                <div className="owner-title-row">
                  <div>
                    <h3 className="owner-name-heading">Symanthan</h3>
                    <p className="owner-role-text">Founder & Managing Chauffeur</p>
                  </div>
                  <div className="owner-badge-verified" title="City of Houston Licensed & Permitted Business">
                    <ShieldCheck size={15} color="#E88C2B" />
                    <span>City Permitted</span>
                  </div>
                </div>

                {/* Service Credentials Pills */}
                <div className="owner-credentials-pills">
                  <span className="cred-pill">
                    <MapPin size={13} color="#E88C2B" />
                    <span>Houston, Texas</span>
                  </span>
                  <span className="cred-pill">
                    <Calendar size={13} color="#E88C2B" />
                    <span>10+ Yrs Experience</span>
                  </span>
                  <span className="cred-pill">
                    <Award size={13} color="#E88C2B" />
                    <span>5,000+ Safe Transfers</span>
                  </span>
                </div>

                {/* Personal Word of Honor Quote Box */}
                <div className="owner-quote-box">
                  <Quote size={18} className="quote-icon" />
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
                    <MessageCircle size={17} />
                    <span>WhatsApp Symanthan</span>
                  </a>

                  <a
                    href={`tel:+${OWNER_PHONE_RAW}`}
                    className="btn-owner-call"
                    title="Call Symanthan Directly"
                  >
                    <Phone size={16} />
                    <span>Call {OWNER_PHONE_DISPLAY}</span>
                  </a>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Editorial Story & Chauffeur Philosophy */}
          <div className="about-editorial-panel reveal-on-scroll reveal-delay-2">
            
            {/* Interactive Luxury Tab Switcher */}
            <div className="about-tabs-nav" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'story'}
                onClick={() => setActiveTab('story')}
                className={`about-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
              >
                <Compass size={16} />
                <span>Our Story</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'standard'}
                onClick={() => setActiveTab('standard')}
                className={`about-tab-btn ${activeTab === 'standard' ? 'active' : ''}`}
              >
                <Sparkles size={16} />
                <span>Chauffeur Standards</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'advantage'}
                onClick={() => setActiveTab('advantage')}
                className={`about-tab-btn ${activeTab === 'advantage' ? 'active' : ''}`}
              >
                <HeartHandshake size={16} />
                <span>Owner Advantage</span>
              </button>
            </div>

            {/* TAB 1: The Business Journey & Mission */}
            {activeTab === 'story' && (
              <div className="tab-pane-fade">
                <h4 className="pane-lead-title">
                  From a Vision of Southern Hospitality to Houston's Premier Private Transportation Service
                </h4>
                
                <p className="pane-lead-text">
                  Over a decade ago, Symanthan noticed a troubling shift across Houston’s ground transportation landscape. 
                  Algorithmic rideshare apps introduced unpredictable surge multipliers, unvetted drivers, and sudden cancellations—leaving 
                  passengers stranded at Bush Intercontinental (IAH) and William P. Hobby (HOU) late at night or during sudden Gulf storms.
                </p>

                <p className="pane-body-text">
                  Believing that travelers deserved far greater respect and reliability, Symanthan established 
                  <strong> Lavender Taxi Service</strong> with a distinct mission: to restore trust and executive-grade standards to private travel. 
                  Our chauffeurs arrive early, assist with luggage with white-glove care, know Houston’s highway network inside out, and provide 
                  guaranteed upfront flat rates with zero surge surcharges.
                </p>

                {/* 2 High-Craft Story Bento Chips */}
                <div className="story-bento-row">
                  <div className="story-bento-card">
                    <div className="bento-icon-circle">
                      <Clock size={18} color="#E88C2B" />
                    </div>
                    <div>
                      <h5 className="bento-card-title">Real-Time Flight Radar Tracking</h5>
                      <p className="bento-card-desc">
                        We monitor FAA flight tail numbers live. Early landing or two-hour delay—your driver is curbside the moment you exit baggage claim with zero waiting fees.
                      </p>
                    </div>
                  </div>

                  <div className="story-bento-card">
                    <div className="bento-icon-circle">
                      <ShieldCheck size={18} color="#E88C2B" />
                    </div>
                    <div>
                      <h5 className="bento-card-title">Hands-On Owner Accountability</h5>
                      <p className="bento-card-desc">
                        Symanthan personally oversees dispatching and booking inquiries. You speak directly with the owner, not an automated chatbot or outsourced call center.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: The 4 Chauffeur Standards */}
            {activeTab === 'standard' && (
              <div className="tab-pane-fade">
                <h4 className="pane-lead-title">
                  The Four Non-Negotiable Pillars of Lavender Taxi Service
                </h4>

                <div className="standards-grid-cards">
                  <div className="standard-pillar-card">
                    <div className="pillar-num-badge">01</div>
                    <div className="pillar-body">
                      <h5 className="pillar-title">Guaranteed Flat-Rate Transparency</h5>
                      <p className="pillar-desc">
                        No dynamic surge multipliers. Whether it is rush hour on I-610, torrential rain, or holiday weekends, the upfront quote you receive is the exact rate you pay.
                      </p>
                    </div>
                  </div>

                  <div className="standard-pillar-card">
                    <div className="pillar-num-badge">02</div>
                    <div className="pillar-body">
                      <h5 className="pillar-title">FAA Commercial Flight Tracking</h5>
                      <p className="pillar-desc">
                        We synchronize our dispatch with your actual aircraft touchdown time at IAH & HOU, ensuring timely curbside pickup regardless of airline delays.
                      </p>
                    </div>
                  </div>

                  <div className="standard-pillar-card">
                    <div className="pillar-num-badge">03</div>
                    <div className="pillar-body">
                      <h5 className="pillar-title">Executive Cabin Sanitization</h5>
                      <p className="pillar-desc">
                        Every Chevrolet Suburban and Lexus Sedan is steam sanitized and detailed between clients, complete with chilled bottled spring water and device charging.
                      </p>
                    </div>
                  </div>

                  <div className="standard-pillar-card">
                    <div className="pillar-num-badge">04</div>
                    <div className="pillar-body">
                      <h5 className="pillar-title">White-Glove Luggage & Courtesy</h5>
                      <p className="pillar-desc">
                        From your doorstep to the airport terminal, our chauffeurs handle heavy luggage, open doors, and provide a quiet, smooth ride tailored to your preference.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 3: The Personal Advantage (Comparison) */}
            {activeTab === 'advantage' && (
              <div className="tab-pane-fade">
                <h4 className="pane-lead-title">
                  Why Discerning Travelers Choose an Owner-Operator Over App Rides
                </h4>

                <div className="comparison-table-card">
                  <div className="comparison-header">
                    <span className="col-feature">Service Feature</span>
                    <span className="col-brand">Lavender Taxi Service</span>
                    <span className="col-others">Generic Rideshare Apps</span>
                  </div>

                  <div className="comparison-row">
                    <span className="col-feature">Vehicle Guarantee</span>
                    <span className="col-brand">
                      <Check size={16} color="#E88C2B" />
                      Guaranteed Suburban or Lexus
                    </span>
                    <span className="col-others">
                      <CloseIcon size={14} color="#A39694" />
                      Random unvetted compact cars
                    </span>
                  </div>

                  <div className="comparison-row">
                    <span className="col-feature">Surge Pricing</span>
                    <span className="col-brand">
                      <Check size={16} color="#E88C2B" />
                      Zero Surge Ever (Upfront Flat Rate)
                    </span>
                    <span className="col-others">
                      <CloseIcon size={14} color="#A39694" />
                      2x - 3.5x Surge in bad weather
                    </span>
                  </div>

                  <div className="comparison-row">
                    <span className="col-feature">Driver Reliability</span>
                    <span className="col-brand">
                      <Check size={16} color="#E88C2B" />
                      100% Confirmed • Zero Cancellations
                    </span>
                    <span className="col-others">
                      <CloseIcon size={14} color="#A39694" />
                      Frequent last-minute cancellations
                    </span>
                  </div>

                  <div className="comparison-row">
                    <span className="col-feature">Customer Support</span>
                    <span className="col-brand">
                      <Check size={16} color="#E88C2B" />
                      Direct Line to Owner Symanthan
                    </span>
                    <span className="col-others">
                      <CloseIcon size={14} color="#A39694" />
                      Automated chatbots & script agents
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Action Row */}
            <div className="about-bottom-actions">
              <button
                type="button"
                onClick={handleReserveClick}
                className="btn-reserve-ride"
              >
                <span>Reserve Your Private Ride</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={handleFleetClick}
                className="btn-view-fleet"
              >
                <span>Explore Fleet & Specs</span>
              </button>
            </div>

          </div>
        </div>

        {/* 4 Bottom Trust Milestone Counters */}
        <div className="about-metrics-strip">
          <div className="metric-box reveal-on-scroll reveal-delay-1">
            <span className="metric-big-num">10+</span>
            <span className="metric-label">Years Serving Houston</span>
            <p className="metric-sub">Deep navigational knowledge of all Texas freeways, bypasses & terminals.</p>
          </div>
          <div className="metric-box reveal-on-scroll reveal-delay-2">
            <span className="metric-big-num">5,000+</span>
            <span className="metric-label">Airport & Cruise Runs</span>
            <p className="metric-sub">Punctual transfers for IAH, HOU & Galveston Cruise Port.</p>
          </div>
          <div className="metric-box reveal-on-scroll reveal-delay-3">
            <span className="metric-big-num">100%</span>
            <span className="metric-label">On-Time Guarantee</span>
            <p className="metric-sub">Real-time FAA flight radar tracking ensures we are always waiting curbside.</p>
          </div>
          <div className="metric-box reveal-on-scroll reveal-delay-4">
            <span className="metric-big-num">Zero</span>
            <span className="metric-label">Surge Surcharges Ever</span>
            <p className="metric-sub">Honest, upfront flat-rate quotes rain or shine with zero surprises.</p>
          </div>
        </div>

      </div>

      <style>{`
        /* ==========================================================================
           ABOUT SECTION — HIGH-END EDITORIAL LUXURY DESIGN
           Palette: Calming White #FEFBF3 | Dark Maroon #4E0401 | Orange Grove #E88C2B
           ========================================================================== */
        .about-section-luxury {
          background: #FEFBF3;
          padding: 95px 0 105px 0;
          border-top: 1px solid rgba(78, 4, 1, 0.08);
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
        }

        .about-header-block {
          text-align: left;
          max-width: 820px;
          margin-bottom: 48px;
        }

        .about-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: #FDF3E7;
          border: 1px solid rgba(232, 140, 43, 0.3);
          padding: 5px 14px;
          border-radius: 9999px;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.16em;
          color: #E88C2B;
          margin-bottom: 14px;
        }

        .about-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.65rem, 3.85vw, 3.45rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.12;
          letter-spacing: -0.025em;
          margin-bottom: 14px;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .about-sub-title {
          font-size: 1.05rem;
          color: #786C6A;
          line-height: 1.6;
        }

        /* 2-Column Grid */
        .about-grid-main {
          display: grid;
          grid-template-columns: 440px 1fr;
          gap: 44px;
          align-items: start;
          margin-bottom: 60px;
        }

        /* --------------------------------------------------------------------------
           LEFT: Double-Bezel Owner Card
           -------------------------------------------------------------------------- */
        .owner-card-bezel {
          background: #F9F5EC;
          border: 1px solid rgba(78, 4, 1, 0.10);
          border-radius: 24px;
          padding: 12px;
          box-shadow: 0 16px 36px -12px rgba(78, 4, 1, 0.08);
          position: sticky;
          top: 96px;
        }

        .owner-card-inner {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 18px;
          padding: 24px;
          text-align: left;
        }

        .owner-image-frame {
          position: relative;
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          background: #FDF3E7;
          border: 1px solid rgba(78, 4, 1, 0.08);
          box-shadow: 0 4px 14px rgba(78, 4, 1, 0.06);
        }

        .owner-photo-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.4s var(--ease-snappy);
        }

        .owner-image-frame:hover .owner-photo-img {
          transform: scale(1.02);
        }

        .owner-status-pill {
          position: absolute;
          bottom: 12px;
          left: 12px;
          right: 12px;
          background: rgba(78, 4, 1, 0.92);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.74rem;
          font-weight: 700;
          padding: 7px 12px;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          border: 1px solid rgba(232, 140, 43, 0.35);
        }

        .status-dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.4);
          animation: statusPulse 2s infinite;
        }

        @keyframes statusPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

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
          font-size: 1.55rem;
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          -webkit-text-stroke: 0.42px currentColor;
          text-rendering: optimizeLegibility;
        }

        .owner-role-text {
          font-size: 0.84rem;
          color: #786C6A;
          font-weight: 600;
          margin-top: 3px;
        }

        .owner-badge-verified {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #FDF3E7;
          border: 1px solid rgba(232, 140, 43, 0.35);
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 800;
          color: #E88C2B;
        }

        .owner-credentials-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .cred-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.10);
          padding: 5px 10px;
          border-radius: 8px;
          font-size: 0.74rem;
          font-weight: 700;
          color: #4E0401;
        }

        /* Quote Box */
        .owner-quote-box {
          background: #FDFCF7;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-left: 3.5px solid #E88C2B;
          border-radius: 0 12px 12px 0;
          padding: 14px 16px;
          position: relative;
        }

        .quote-icon {
          color: #E88C2B;
          margin-bottom: 6px;
          display: block;
        }

        .quote-text {
          font-size: 0.88rem;
          font-style: italic;
          color: #4E0401;
          line-height: 1.55;
        }

        .quote-author-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 8px;
        }

        .author-name {
          font-weight: 800;
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
          margin-top: 4px;
        }

        .btn-owner-whatsapp {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #25D366;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 11px 18px;
          border-radius: 9999px;
          box-shadow: 0 3px 10px rgba(37, 211, 102, 0.25);
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
          font-weight: 700;
          font-size: 0.88rem;
          padding: 10px 18px;
          border-radius: 9999px;
          transition: all 0.18s ease;
        }

        .btn-owner-call:hover {
          border-color: #4E0401;
          color: #FFFFFF;
          background: #4E0401;
        }

        /* --------------------------------------------------------------------------
           RIGHT: Editorial Tabs & Content
           -------------------------------------------------------------------------- */
        .about-editorial-panel {
          text-align: left;
        }

        .about-tabs-nav {
          display: flex;
          gap: 8px;
          background: #F9F5EC;
          padding: 6px;
          border-radius: 9999px;
          margin-bottom: 28px;
          border: 1px solid rgba(78, 4, 1, 0.10);
          flex-wrap: wrap;
        }

        .about-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          color: #786C6A;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 9px 20px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .about-tab-btn:hover:not(.active) {
          color: #4E0401;
          background: rgba(78, 4, 1, 0.05);
        }

        .about-tab-btn.active {
          background: #4E0401;
          color: #FFFFFF;
          box-shadow: 0 4px 14px rgba(78, 4, 1, 0.2);
        }

        .tab-pane-fade {
          animation: tabFadeIn 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes tabFadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pane-lead-title {
          font-family: var(--font-heading);
          font-size: 1.55rem;
          font-weight: 900;
          color: #4E0401;
          line-height: 1.25;
          margin-bottom: 16px;
          -webkit-text-stroke: 0.4px currentColor;
          text-rendering: optimizeLegibility;
        }

        .pane-lead-text {
          font-size: 1.02rem;
          color: #5A4543;
          line-height: 1.65;
          margin-bottom: 14px;
        }

        .pane-body-text {
          font-size: 0.96rem;
          color: #6E5553;
          line-height: 1.65;
          margin-bottom: 24px;
        }

        /* Story Bento Chips */
        .story-bento-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 32px;
        }

        .story-bento-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 16px;
          padding: 22px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: 0 4px 16px rgba(78, 4, 1, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .story-bento-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 140, 43, 0.35);
          box-shadow: 0 10px 24px rgba(78, 4, 1, 0.08);
        }

        .bento-icon-circle {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: #FDF3E7;
          border: 1px solid rgba(232, 140, 43, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .bento-card-title {
          font-family: var(--font-heading);
          font-size: 1.08rem;
          font-weight: 850;
          color: #4E0401;
          margin-bottom: 6px;
          -webkit-text-stroke: 0.35px currentColor;
          text-rendering: optimizeLegibility;
        }

        .bento-card-desc {
          font-size: 0.85rem;
          color: #786C6A;
          line-height: 1.5;
        }

        /* 4 Standards Grid */
        .standards-grid-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 18px;
          margin-bottom: 32px;
        }

        .standard-pillar-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 16px;
          padding: 22px;
          display: flex;
          gap: 14px;
          align-items: flex-start;
          box-shadow: 0 4px 16px rgba(78, 4, 1, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .standard-pillar-card:hover {
          transform: translateY(-2px);
          border-color: rgba(232, 140, 43, 0.35);
          box-shadow: 0 10px 24px rgba(78, 4, 1, 0.08);
        }

        .pillar-num-badge {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 900;
          color: #E88C2B;
          background: #FDF3E7;
          border: 1px solid rgba(232, 140, 43, 0.25);
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pillar-title {
          font-family: var(--font-heading);
          font-size: 1.08rem;
          font-weight: 850;
          color: #4E0401;
          margin-bottom: 6px;
          -webkit-text-stroke: 0.35px currentColor;
          text-rendering: optimizeLegibility;
        }

        .pillar-desc {
          font-size: 0.85rem;
          color: #786C6A;
          line-height: 1.5;
        }

        /* Comparison Table Card */
        .comparison-table-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.10);
          border-radius: 16px;
          overflow: hidden;
          margin-bottom: 32px;
          box-shadow: 0 4px 18px rgba(78, 4, 1, 0.05);
        }

        .comparison-header {
          display: grid;
          grid-template-columns: 1.4fr 1.6fr 1.6fr;
          background: #4E0401;
          color: #FFFFFF;
          padding: 14px 20px;
          font-size: 0.80rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .comparison-header .col-brand {
          color: #E88C2B;
        }

        .comparison-row {
          display: grid;
          grid-template-columns: 1.4fr 1.6fr 1.6fr;
          padding: 15px 20px;
          border-bottom: 1px solid rgba(78, 4, 1, 0.06);
          font-size: 0.86rem;
          align-items: center;
        }

        .comparison-row:last-child {
          border-bottom: none;
        }

        .comparison-row .col-feature {
          font-weight: 700;
          color: #4E0401;
        }

        .comparison-row .col-brand {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #4E0401;
          font-weight: 750;
        }

        .comparison-row .col-others {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #8C7B79;
        }

        /* Action Row */
        .about-bottom-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-reserve-ride {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #E88C2B;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.94rem;
          padding: 13px 28px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(232, 140, 43, 0.3);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-reserve-ride:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 6px 18px rgba(232, 140, 43, 0.4);
        }

        .btn-view-fleet {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-weight: 800;
          font-size: 0.90rem;
          padding: 12px 24px;
          border-radius: 9999px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-view-fleet:hover {
          border-color: #4E0401;
          background: #F9F5EC;
          transform: translateY(-1px);
        }

        /* --------------------------------------------------------------------------
           BOTTOM: 4 Trust Milestone Metric Cards
           -------------------------------------------------------------------------- */
        .about-metrics-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 22px;
        }

        .metric-box {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-top: 3.5px solid #E88C2B;
          border-radius: 16px;
          padding: 26px 22px;
          text-align: left;
          box-shadow: 0 4px 16px rgba(78, 4, 1, 0.04);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .metric-box:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 24px rgba(78, 4, 1, 0.08);
        }

        .metric-big-num {
          font-family: var(--font-heading);
          font-size: 2.6rem;
          font-weight: 900;
          color: #4E0401;
          display: block;
          line-height: 1;
          margin-bottom: 8px;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .metric-label {
          font-size: 0.90rem;
          font-weight: 800;
          color: #E88C2B;
          display: block;
          margin-bottom: 6px;
          letter-spacing: 0.02em;
        }

        .metric-sub {
          font-size: 0.83rem;
          color: #786C6A;
          line-height: 1.48;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .about-grid-main {
            grid-template-columns: 1fr;
          }

          .owner-card-bezel {
            position: static;
          }

          .about-metrics-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 640px) {
          .about-section-luxury {
            padding: 60px 0 70px 0;
          }

          .story-bento-row,
          .standards-grid-cards {
            grid-template-columns: 1fr;
          }

          .comparison-header,
          .comparison-row {
            grid-template-columns: 1fr;
            gap: 6px;
          }

          .about-metrics-strip {
            grid-template-columns: 1fr;
          }

          .about-bottom-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-reserve-ride,
          .btn-view-fleet {
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
