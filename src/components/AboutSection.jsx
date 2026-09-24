import React, { useState } from 'react';
import { 
  Phone, 
  MessageCircle, 
  ArrowRight, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Award, 
  MapPin, 
  CheckCircle2, 
  Quote, 
  Calendar,
  Compass,
  HeartHandshake
} from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW, getDirectWhatsAppOwnerUrl } from '../utils/whatsapp';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState('story');

  return (
    <section id="about" className="section-spacing about-section-clean">
      <div className="container">
        {/* Section Header (Strictly Left-Aligned) */}
        <div className="about-header-block">
          <span className="section-tag-small">MEET THE FOUNDER & OUR STORY</span>
          <h2 className="section-title-large">Driven by Integrity. Defined by Personal Service.</h2>
          <p className="section-desc-sub">
            Meet <strong>Symanthan</strong> — the dedicated founder and owner behind Lavender Taxi Service, 
            bringing honest flat rates, punctual excellence, and true Southern hospitality to Greater Houston.
          </p>
        </div>

        {/* Main 2-Column Bento Layout */}
        <div className="about-grid-main">
          {/* Left Column: Owner Profile & Executive Showcase */}
          <div className="owner-card-profile">
            {/* Portrait Image Frame */}
            <div className="owner-image-frame">
              <img
                src="/images/owner_symanthan.jpg"
                alt="Symanthan - Founder & Owner of Lavender Taxi Service"
                className="owner-photo-img"
              />
              {/* Online / Active Owner Badge */}
              <div className="owner-status-pill">
                <span className="status-dot-pulse"></span>
                <span>Owner-Operated in Houston</span>
              </div>
            </div>

            {/* Owner Info & Details */}
            <div className="owner-info-content">
              <div className="owner-title-row">
                <div>
                  <h3 className="owner-name-heading">Symanthan</h3>
                  <p className="owner-role-text">Founder & Business Owner</p>
                </div>
                <div className="owner-badge-verified" title="Verified Business Owner">
                  <ShieldCheck size={18} color="#0284C7" />
                  <span>Verified Owner</span>
                </div>
              </div>

              {/* Service Badges */}
              <div className="owner-pills-row">
                <span className="owner-pill-item">
                  <MapPin size={13} color="#0284C7" />
                  <span>Houston, Texas</span>
                </span>
                <span className="owner-pill-item">
                  <Calendar size={13} color="#0284C7" />
                  <span>10+ Yrs Experience</span>
                </span>
                <span className="owner-pill-item">
                  <Award size={13} color="#0284C7" />
                  <span>5,000+ Safe Trips</span>
                </span>
              </div>

              {/* Personal Guarantee Card */}
              <div className="owner-quote-box">
                <Quote size={20} className="owner-quote-icon" />
                <p className="owner-quote-text">
                  “When you book with Lavender Taxi, you have my personal word on your pickup. No cancelled rides, no surge pricing—just dependable, executive service every single time.”
                </p>
                <div className="owner-signature-line">
                  <span className="signature-name">— Symanthan</span>
                  <span className="signature-sub">Lavender Taxi Service</span>
                </div>
              </div>

              {/* Direct Owner Contact Actions */}
              <div className="owner-direct-actions">
                <a
                  href={`tel:+${OWNER_PHONE_RAW}`}
                  className="btn-owner-call"
                  title="Call Symanthan Directly"
                >
                  <Phone size={16} />
                  <span>Call {OWNER_PHONE_DISPLAY}</span>
                </a>
                <a
                  href={getDirectWhatsAppOwnerUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-owner-whatsapp"
                  title="Chat directly with Symanthan on WhatsApp"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Symanthan</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: The Story & Chauffeur Philosophy */}
          <div className="story-content-panel">
            {/* Interactive Tab Switcher */}
            <div className="story-tabs-nav" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'story'}
                onClick={() => setActiveTab('story')}
                className={`story-tab-btn ${activeTab === 'story' ? 'active' : ''}`}
              >
                <Compass size={16} />
                <span>The Journey</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'standard'}
                onClick={() => setActiveTab('standard')}
                className={`story-tab-btn ${activeTab === 'standard' ? 'active' : ''}`}
              >
                <Sparkles size={16} />
                <span>The Chauffeur Standard</span>
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'advantage'}
                onClick={() => setActiveTab('advantage')}
                className={`story-tab-btn ${activeTab === 'advantage' ? 'active' : ''}`}
              >
                <HeartHandshake size={16} />
                <span>The Personal Advantage</span>
              </button>
            </div>

            {/* Tab 1: The Business Journey */}
            {activeTab === 'story' && (
              <div className="story-tab-content">
                <h4 className="story-content-title">
                  From a Vision for Hospitality to Houston's Premier Private Transportation Service
                </h4>
                
                <p className="story-paragraph">
                  Over a decade ago, Symanthan noticed a troubling shift across Houston’s ground transportation landscape. 
                  Rideshare apps were introducing volatile surge pricing, unvetted drivers, and frequent last-minute cancellations—leaving 
                  passengers stranded at Bush Intercontinental (IAH) and William P. Hobby (HOU) late at night or during sudden Texas downpours.
                </p>

                <p className="story-paragraph">
                  Believing that travelers deserved far greater respect and reliability, Symanthan founded 
                  <strong> Lavender Taxi Service</strong> with a distinct mission: to restore trust and executive-grade standards to private travel—where 
                  our professional chauffeurs arrive early, assist with luggage with care, know Houston’s highway grid inside out, and provide 
                  honest, upfront flat rates with zero surprise surcharges.
                </p>

                <p className="story-paragraph">
                  Establishing Lavender Taxi Service as a hands-on, owner-operated company, Symanthan carefully built a trusted team of 
                  certified, professional chauffeurs while personally overseeing every dispatch and booking. Under his management, the company 
                  has earned the trust of business executives, medical patients visiting the Texas Medical Center, families heading to the Space Center NASA, 
                  and vacationers boarding cruise liners in Galveston. Today, his fleet of premium Chevrolet Suburbans and Lexus Luxury Sedans stands as a 
                  symbol of punctuality, safety, and true Southern hospitality.
                </p>

                {/* Key Highlights Grid */}
                <div className="story-features-grid">
                  <div className="story-feature-card">
                    <CheckCircle2 size={18} color="#0284C7" />
                    <div>
                      <span className="feature-title">Independent & Local</span>
                      <p className="feature-desc">Proudly Houston-owned and operated with deep community roots.</p>
                    </div>
                  </div>
                  <div className="story-feature-card">
                    <CheckCircle2 size={18} color="#0284C7" />
                    <div>
                      <span className="feature-title">Punctuality Obsession</span>
                      <p className="feature-desc">We track FAA flights in real-time so your driver is curbside the moment you touch down.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: The Chauffeur Standard */}
            {activeTab === 'standard' && (
              <div className="story-tab-content">
                <h4 className="story-content-title">
                  The Four Non-Negotiable Pillars of Lavender Taxi Service
                </h4>
                
                <div className="standards-list">
                  <div className="standard-item">
                    <div className="standard-num">01</div>
                    <div className="standard-text">
                      <h5>Guaranteed Flat-Rate Transparency</h5>
                      <p>
                        No algorithmic surge prices. Whether it is rush hour on I-610, torrential rain, or a holiday weekend, 
                        the rate you are quoted is the rate you pay. Guaranteed.
                      </p>
                    </div>
                  </div>

                  <div className="standard-item">
                    <div className="standard-num">02</div>
                    <div className="standard-text">
                      <h5>Live FAA Flight Tracking (IAH & HOU)</h5>
                      <p>
                        We monitor commercial and private tail numbers in real time. If your flight lands 30 minutes early or is delayed 
                        two hours, Symanthan and his team adjust your pickup schedule automatically with zero waiting penalty.
                      </p>
                    </div>
                  </div>

                  <div className="standard-item">
                    <div className="standard-num">03</div>
                    <div className="standard-text">
                      <h5>Immaculate Executive Cabin Cleanliness</h5>
                      <p>
                        Every Chevrolet Suburban and Lexus Sedan is thoroughly sanitized, vacuumed, and detailed between clients. Enjoy 
                        complimentary chilled bottled water, phone charging cords for iPhone and Android, and climate control set to your preference.
                      </p>
                    </div>
                  </div>

                  <div className="standard-item">
                    <div className="standard-num">04</div>
                    <div className="standard-text">
                      <h5>White-Glove Door-to-Door Courtesy</h5>
                      <p>
                        Our service begins the moment we greet you at your doorstep or baggage claim. We handle all heavy luggage with care 
                        and ensure you arrive at your destination refreshed and stress-free.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 3: The Personal Advantage */}
            {activeTab === 'advantage' && (
              <div className="story-tab-content">
                <h4 className="story-content-title">
                  Why Discerning Travelers Choose an Owner-Operator Over App Rides
                </h4>
                
                <p className="story-paragraph">
                  When you book with mass-market rideshare platforms, your booking is sent into an automated roulette wheel. Drivers can cancel 
                  at the last moment, vehicles may be aged or poorly maintained, and if anything goes wrong, you are forced to navigate 
                  robotic support chat bots.
                </p>

                <p className="story-paragraph">
                  With <strong>Lavender Taxi Service</strong>, you are in direct contact with <strong>Symanthan</strong>. You receive:
                </p>

                <div className="advantage-benefits-grid">
                  <div className="benefit-badge-item">
                    <ShieldCheck size={20} color="#0284C7" />
                    <div>
                      <strong>Direct Owner Line</strong>
                      <p>Reach owner Symanthan on WhatsApp or phone 24/7 for booking and dispatch coordination without frustrating automated menus.</p>
                    </div>
                  </div>

                  <div className="benefit-badge-item">
                    <Clock size={20} color="#0284C7" />
                    <div>
                      <strong>Early Morning Reliability</strong>
                      <p>Need a 3:30 AM pickup for a 6:00 AM flight? We confirm the evening before and arrive 10 minutes early.</p>
                    </div>
                  </div>

                  <div className="benefit-badge-item">
                    <Sparkles size={20} color="#0284C7" />
                    <div>
                      <strong>Specialized Care for Families & Seniors</strong>
                      <p>Gentle assistance for elderly passengers, child-friendly spacious seating, and accommodating Galveston cruise luggage.</p>
                    </div>
                  </div>

                  <div className="benefit-badge-item">
                    <Award size={20} color="#0284C7" />
                    <div>
                      <strong>Premium Vehicle Fleet</strong>
                      <p>Only top-tier Chevrolet Suburbans (seats up to 7) and Lexus Luxury Sedans—never compact economy cars.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Story Action Row */}
            <div className="story-bottom-action-bar">
              <button
                type="button"
                onClick={() => smoothScrollTo('#booking-section')}
                className="btn-cta-gold"
              >
                <span>Reserve Your Private Ride</span>
                <ArrowRight size={16} />
              </button>

              <button
                type="button"
                onClick={() => smoothScrollTo('#fleet')}
                className="btn-blue-outline"
              >
                <span>View Our Vehicles</span>
              </button>
            </div>
          </div>
        </div>

        {/* 4 Bottom Trust Milestone Counters */}
        <div className="about-metrics-strip">
          <div className="metric-box">
            <span className="metric-big-num">10+</span>
            <span className="metric-label">Years Navigating Houston</span>
            <p className="metric-sub">Deep knowledge of all Texas freeways, bypasses & terminals.</p>
          </div>
          <div className="metric-box">
            <span className="metric-big-num">5,000+</span>
            <span className="metric-label">Airport & Cruise Runs</span>
            <p className="metric-sub">Punctual transfers for IAH, HOU & Galveston Cruise Port.</p>
          </div>
          <div className="metric-box">
            <span className="metric-big-num">100%</span>
            <span className="metric-label">On-Time Guarantee</span>
            <p className="metric-sub">Real-time flight radar tracking ensures we are always waiting.</p>
          </div>
          <div className="metric-box">
            <span className="metric-big-num">$0</span>
            <span className="metric-label">Surge Surcharges Ever</span>
            <p className="metric-sub">Honest, upfront flat-rate quotes rain or shine.</p>
          </div>
        </div>
      </div>

      <style>{`
        .about-section-clean {
          background: #FFFFFF;
          border-top: 1px solid var(--border-subtle);
          border-bottom: 1px solid var(--border-subtle);
        }

        .about-header-block {
          margin-bottom: 45px;
          text-align: left;
        }

        .about-grid-main {
          display: grid;
          grid-template-columns: 460px 1fr;
          gap: 40px;
          align-items: start;
        }

        /* Left Column: Owner Profile Card */
        .owner-card-profile {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 24px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.05);
          position: sticky;
          top: 90px;
        }

        .owner-image-frame {
          position: relative;
          width: 100%;
          border-radius: var(--radius-lg);
          overflow: hidden;
          background: #F1F5F9;
          border: 1px solid #CBD5E1;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.06);
        }

        .owner-photo-img {
          width: 100%;
          aspect-ratio: 1 / 1;
          object-fit: cover;
          object-position: center top;
          display: block;
          transition: transform 0.4s var(--ease-snappy);
        }

        .owner-photo-img:hover {
          transform: scale(1.02);
        }

        .owner-status-pill {
          position: absolute;
          bottom: 14px;
          left: 14px;
          background: rgba(15, 23, 42, 0.85);
          backdrop-filter: blur(8px);
          color: #FFFFFF;
          font-size: 0.78rem;
          font-weight: 700;
          padding: 6px 14px;
          border-radius: var(--radius-full);
          display: flex;
          align-items: center;
          gap: 8px;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }

        .status-dot-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22C55E;
          box-shadow: 0 0 0 2px rgba(34, 197, 94, 0.4);
          animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
          100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
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
          padding-bottom: 14px;
          border-bottom: 1px solid #F1F5F9;
        }

        .owner-name-heading {
          font-size: 1.55rem;
          font-weight: 800;
          color: #0F172A;
          letter-spacing: -0.02em;
          line-height: 1.15;
        }

        .owner-role-text {
          font-size: 0.88rem;
          font-weight: 600;
          color: #0284C7;
          margin-top: 3px;
        }

        .owner-badge-verified {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background: #F0F9FF;
          border: 1px solid #BAE6FD;
          color: #0369A1;
          font-size: 0.76rem;
          font-weight: 700;
          padding: 4px 10px;
          border-radius: var(--radius-full);
        }

        .owner-pills-row {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .owner-pill-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 5px 10px;
          border-radius: var(--radius-full);
          font-size: 0.78rem;
          font-weight: 600;
          color: #334155;
        }

        .owner-quote-box {
          background: #F8FAFC;
          border-left: 3px solid #0284C7;
          padding: 14px 16px;
          border-radius: 0 var(--radius-md) var(--radius-md) 0;
          position: relative;
        }

        .owner-quote-icon {
          color: #0284C7;
          opacity: 0.35;
          position: absolute;
          top: 10px;
          right: 12px;
        }

        .owner-quote-text {
          font-size: 0.86rem;
          color: #334155;
          font-style: italic;
          line-height: 1.5;
        }

        .owner-signature-line {
          margin-top: 8px;
          display: flex;
          align-items: baseline;
          gap: 6px;
        }

        .signature-name {
          font-size: 0.82rem;
          font-weight: 700;
          color: #0F172A;
        }

        .signature-sub {
          font-size: 0.74rem;
          color: #64748B;
        }

        .owner-direct-actions {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 6px;
        }

        .btn-owner-call {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #0284C7;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 11px 18px;
          border-radius: var(--radius-full);
          transition: background 0.15s ease;
        }

        .btn-owner-call:hover {
          background: #0369A1;
        }

        .btn-owner-whatsapp {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #25D366;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 11px 18px;
          border-radius: var(--radius-full);
          transition: background 0.15s ease;
          box-shadow: 0 2px 8px rgba(37, 211, 102, 0.25);
        }

        .btn-owner-whatsapp:hover {
          background: #1EBE5D;
        }

        /* Right Column: Story Panel */
        .story-content-panel {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-xl);
          padding: 36px 40px;
          box-shadow: 0 4px 20px rgba(15, 23, 42, 0.04);
        }

        .story-tabs-nav {
          display: flex;
          align-items: center;
          gap: 10px;
          border-bottom: 2px solid #F1F5F9;
          padding-bottom: 14px;
          margin-bottom: 28px;
          overflow-x: auto;
        }

        .story-tab-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 18px;
          border-radius: var(--radius-full);
          font-size: 0.9rem;
          font-weight: 700;
          color: #64748B;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          transition: all 0.2s ease;
          white-space: nowrap;
        }

        .story-tab-btn:hover {
          color: #0284C7;
          border-color: #BAE6FD;
          background: #F0F9FF;
        }

        .story-tab-btn.active {
          background: #0284C7;
          color: #FFFFFF;
          border-color: #0284C7;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.25);
        }

        .story-tab-content {
          animation: fadeInTab 0.3s ease-in-out;
        }

        @keyframes fadeInTab {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .story-content-title {
          font-size: 1.45rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.3;
          margin-bottom: 18px;
          text-align: left;
        }

        .story-paragraph {
          font-size: 1.02rem;
          line-height: 1.7;
          color: #334155;
          margin-bottom: 16px;
          text-align: left;
        }

        .story-paragraph strong {
          color: #0F172A;
        }

        .story-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin-top: 26px;
          padding-top: 22px;
          border-top: 1px solid #F1F5F9;
        }

        .story-feature-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          padding: 16px;
          border-radius: var(--radius-md);
        }

        .feature-title {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0F172A;
          display: block;
          margin-bottom: 4px;
        }

        .feature-desc {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.45;
          margin: 0;
        }

        /* Standards List */
        .standards-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .standard-item {
          display: flex;
          align-items: flex-start;
          gap: 18px;
          padding: 18px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-md);
          transition: border-color 0.2s ease;
        }

        .standard-item:hover {
          border-color: #BAE6FD;
          background: #F0F9FF;
        }

        .standard-num {
          font-size: 1.3rem;
          font-weight: 800;
          color: #0284C7;
          line-height: 1;
          padding-top: 2px;
        }

        .standard-text h5 {
          font-size: 1.05rem;
          font-weight: 800;
          color: #0F172A;
          margin-bottom: 4px;
        }

        .standard-text p {
          font-size: 0.9rem;
          color: #475569;
          line-height: 1.5;
          margin: 0;
        }

        /* Advantage Grid */
        .advantage-benefits-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 18px;
          margin-top: 14px;
        }

        .benefit-badge-item {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          padding: 16px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-md);
        }

        .benefit-badge-item strong {
          font-size: 0.95rem;
          color: #0F172A;
          display: block;
          margin-bottom: 4px;
        }

        .benefit-badge-item p {
          font-size: 0.85rem;
          color: #64748B;
          line-height: 1.45;
          margin: 0;
        }

        .story-bottom-action-bar {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-top: 32px;
          padding-top: 24px;
          border-top: 1px solid #F1F5F9;
          flex-wrap: wrap;
        }

        /* Metrics Strip */
        .about-metrics-strip {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
          margin-top: 40px;
        }

        .metric-box {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: var(--radius-lg);
          padding: 24px;
          text-align: left;
          transition: all 0.2s ease;
        }

        .metric-box:hover {
          border-color: #BAE6FD;
          background: #F0F9FF;
          transform: translateY(-2px);
        }

        .metric-big-num {
          font-family: var(--font-heading);
          font-size: 2.2rem;
          font-weight: 800;
          color: #0284C7;
          display: block;
          line-height: 1;
          letter-spacing: -0.03em;
        }

        .metric-label {
          font-size: 0.95rem;
          font-weight: 800;
          color: #0F172A;
          display: block;
          margin-top: 8px;
          margin-bottom: 4px;
        }

        .metric-sub {
          font-size: 0.82rem;
          color: #64748B;
          line-height: 1.4;
          margin: 0;
        }

        @media (max-width: 1200px) {
          .about-grid-main {
            grid-template-columns: 380px 1fr;
            gap: 28px;
          }
          .about-metrics-strip {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 900px) {
          .about-grid-main {
            grid-template-columns: 1fr;
          }
          .owner-card-profile {
            position: static;
          }
          .story-features-grid,
          .advantage-benefits-grid {
            grid-template-columns: 1fr;
          }
          .story-content-panel {
            padding: 24px;
          }
        }

        @media (max-width: 600px) {
          .about-metrics-strip {
            grid-template-columns: 1fr;
          }
          .story-tabs-nav {
            justify-content: flex-start;
          }
          .story-bottom-action-bar {
            flex-direction: column;
            align-items: stretch;
          }
          .story-bottom-action-bar button {
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
