import React, { useState } from 'react';
import { Gem, Users, Settings, Star, ArrowRight, Plus, Minus } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { openBooking } from '../utils/bookingModal';

const PILLARS = [
  {
    icon: Gem,
    title: 'Premium Experience',
    desc: 'Bespoke luxury vehicles, immaculate hand-detailed cabins, chilled bottled water, and fast onboard Wi-Fi.',
  },
  {
    icon: Users,
    title: 'Professional Drivers',
    desc: 'Experienced, courteous, and background-verified chauffeurs with direct personal accountability from owner Symanthan.',
  },
  {
    icon: Settings,
    title: 'Tailored Solutions & Child Safety',
    desc: 'Personalized corporate accounts, flight delay guarantees, and certified sanitized child car seats installed upon request.',
  },
  {
    icon: Star,
    title: 'Trusted by Thousands',
    desc: 'A flawless reputation built on 100% on-time airport arrivals, zero cancellations, and upfront guaranteed flat pricing.',
  },
];

export default function WhyChooseUs() {
  const [openAccordion, setOpenAccordion] = useState(0); // Default first item open

  const handleReserveClick = () => {
    openBooking('suburban');
  };

  const toggleAccordion = (idx) => {
    setOpenAccordion(openAccordion === idx ? null : idx);
  };

  return (
    <section id="why-us" className="higher-standard-section">
      <div className="container">
        {/* Desktop Layout Grid (Visible > 768px) */}
        <div className="higher-standard-grid">
          {/* Left Column: Passenger Cabin Window Photo */}
          <div className="higher-standard-media-wrap reveal-on-scroll">
            <img
              src="/images/passenger_cabin_window.jpg"
              alt="Executive passenger relaxing in luxury chauffeur vehicle looking out window"
              className="higher-standard-img"
            />
            <div className="media-floating-badge">
              <span className="badge-gold-star">★ 5.0</span>
              <span className="badge-text">Houston Executive Favorite</span>
            </div>
          </div>

          {/* Right Column: Title & 4 Pillars */}
          <div className="higher-standard-content reveal-on-scroll reveal-delay-1">
            <span className="standard-kicker">WHY CHOOSE LAVENDER TAXI</span>
            <h2 className="standard-headline">
              A HIGHER<br />
              STANDARD<br />
              OF TRAVEL
            </h2>

            <div className="standard-pillars-stack">
              {PILLARS.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={i} className={`standard-pillar-row reveal-on-scroll reveal-delay-${i + 1}`}>
                    <div className="standard-icon-box">
                      <Icon size={20} strokeWidth={1.75} color="#E88C2B" />
                    </div>
                    <div className="standard-text-wrap">
                      <h3 className="standard-pillar-title">{p.title}</h3>
                      <p className="standard-pillar-desc">{p.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="standard-action-row">
              <button
                type="button"
                onClick={handleReserveClick}
                className="btn-reserve-standard"
              >
                <span>RESERVE YOUR PRIVATE CHAUFFEUR</span>
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile-Only Layout (Screen 8 - Visible ONLY on <= 768px) */}
        <div className="mobile-why-us-layout">
          <div className="mobile-why-header reveal-on-scroll">
            <span className="standard-kicker">WHY LAVENDER TAXI</span>
            <h2 className="mobile-why-title">A Higher Standard of Travel</h2>
          </div>

          {/* Passenger Window Photo Frame */}
          <div className="mobile-why-media-wrap">
            <img
              src="/images/passenger_cabin_window.jpg"
              alt="Executive passenger relaxing in luxury chauffeur vehicle"
              className="mobile-why-img"
            />
            <div className="mobile-why-badge">
              <span className="badge-gold-star">★ 5.0</span>
              <span className="badge-text">Executive Favorite</span>
            </div>
          </div>

          {/* Accordion Stack matching Mockup */}
          <div className="mobile-pillars-accordion">
            {PILLARS.map((p, idx) => {
              const Icon = p.icon;
              const isOpen = openAccordion === idx;
              return (
                <div 
                  key={idx} 
                  className={`accordion-item-box ${isOpen ? 'open' : ''}`}
                >
                  <button
                    type="button"
                    className="accordion-header-btn"
                    onClick={() => toggleAccordion(idx)}
                    aria-expanded={isOpen}
                  >
                    <div className="acc-left-meta">
                      <Icon size={18} color="#E88C2B" />
                      <span className="acc-title-text">{p.title}</span>
                    </div>
                    <div className="acc-toggle-icon">
                      {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="accordion-body-content">
                      <p className="acc-desc-text">{p.desc}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Full-width Mobile CTA */}
          <button
            type="button"
            onClick={handleReserveClick}
            className="mobile-why-cta-btn"
          >
            <span>Reserve Your Private Chauffeur</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <style>{`
        .higher-standard-section {
          background: #FEFBF3;
          padding: 95px 0 100px 0;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
        }

        .higher-standard-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 60px;
          align-items: center;
        }

        /* Left Media */
        .higher-standard-media-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(78, 4, 1, 0.08);
          border: 1px solid rgba(78, 4, 1, 0.08);
          background: #F9F5EC;
        }

        .higher-standard-img {
          width: 100%;
          height: 100%;
          min-height: 520px;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .higher-standard-media-wrap:hover .higher-standard-img {
          transform: scale(1.03);
        }

        .media-floating-badge {
          position: absolute;
          bottom: 22px;
          left: 22px;
          background: rgba(254, 251, 243, 0.96);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(78, 4, 1, 0.12);
          border-radius: 12px;
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 8px;
          box-shadow: 0 8px 24px rgba(78, 4, 1, 0.15);
        }

        .badge-gold-star {
          font-weight: 800;
          font-size: 0.88rem;
          color: #E88C2B;
        }

        .badge-text {
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          color: #4E0401;
        }

        /* Right Content */
        .higher-standard-content {
          text-align: left;
        }

        .standard-kicker {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #E88C2B;
          margin-bottom: 12px;
          display: block;
        }

        .standard-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 3.4rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 28px 0;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .standard-pillars-stack {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 32px;
        }

        .standard-pillar-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
        }

        .standard-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #FDF3E7;
          border: 1px solid rgba(232, 140, 43, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 8px rgba(232, 140, 43, 0.12);
        }

        .standard-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .standard-pillar-title {
          font-family: var(--font-heading);
          font-size: 1.12rem;
          font-weight: 800;
          color: #4E0401;
          margin: 0;
          line-height: 1.25;
          -webkit-text-stroke: 0.32px currentColor;
          text-rendering: optimizeLegibility;
        }

        .standard-pillar-desc {
          font-size: 0.88rem;
          color: #786C6A;
          line-height: 1.5;
          margin: 0;
        }

        .btn-reserve-standard {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 14px 28px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(232, 140, 43, 0.32);
          transition: all 0.2s ease;
        }

        .btn-reserve-standard:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 140, 43, 0.45);
        }

        .mobile-why-us-layout {
          display: none;
        }

        @media (max-width: 960px) and (min-width: 769px) {
          .higher-standard-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .higher-standard-img {
            min-height: 380px;
          }
        }

        /* Strictly Mobile (<= 768px): Screen 8 Accordion & Full-Width CTA */
        @media (max-width: 768px) {
          .higher-standard-section {
            padding: 55px 0 60px 0;
          }

          .higher-standard-grid {
            display: none !important;
          }

          .mobile-why-us-layout {
            display: flex !important;
            flex-direction: column;
            gap: 20px;
          }

          .mobile-why-header {
            text-align: center;
          }

          .mobile-why-title {
            font-family: var(--font-heading);
            font-size: 2.1rem;
            font-weight: 900;
            color: #4E0401;
            line-height: 1.15;
            margin: 6px 0 0 0;
            -webkit-text-stroke: 0.3px currentColor;
          }

          .mobile-why-media-wrap {
            position: relative;
            width: 100%;
            height: 220px;
            border-radius: 18px;
            overflow: hidden;
            box-shadow: 0 10px 30px rgba(78, 4, 1, 0.12);
          }

          .mobile-why-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .mobile-why-badge {
            position: absolute;
            bottom: 12px;
            left: 12px;
            background: rgba(78, 4, 1, 0.9);
            color: #FFFFFF;
            padding: 6px 12px;
            border-radius: 9999px;
            display: flex;
            align-items: center;
            gap: 6px;
            backdrop-filter: blur(8px);
          }

          .mobile-why-badge .badge-gold-star {
            color: #E88C2B;
            font-weight: 800;
            font-size: 0.78rem;
          }

          .mobile-why-badge .badge-text {
            font-size: 0.74rem;
            font-weight: 700;
          }

          /* Accordion Box Stack */
          .mobile-pillars-accordion {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .accordion-item-box {
            background: #FFFFFF;
            border: 1px solid rgba(78, 4, 1, 0.10);
            border-radius: 14px;
            overflow: hidden;
            transition: all 0.2s ease;
          }

          .accordion-item-box.open {
            border-color: #E88C2B;
            box-shadow: 0 4px 16px rgba(232, 140, 43, 0.12);
          }

          .accordion-header-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 14px 16px;
            background: transparent;
            border: none;
            cursor: pointer;
            text-align: left;
          }

          .acc-left-meta {
            display: flex;
            align-items: center;
            gap: 12px;
          }

          .acc-title-text {
            font-family: var(--font-heading);
            font-size: 0.95rem;
            font-weight: 800;
            color: #4E0401;
            -webkit-text-stroke: 0.2px currentColor;
          }

          .acc-toggle-icon {
            color: #4E0401;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .accordion-body-content {
            padding: 0 16px 14px 46px;
          }

          .acc-desc-text {
            font-size: 0.82rem;
            color: #786C6A;
            line-height: 1.5;
            margin: 0;
          }

          /* Full Width CTA */
          .mobile-why-cta-btn {
            width: 100%;
            height: 50px;
            background: #E88C2B;
            color: #FFFFFF;
            border: none;
            border-radius: 9999px;
            font-family: inherit;
            font-size: 0.92rem;
            font-weight: 800;
            letter-spacing: 0.04em;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            cursor: pointer;
            box-shadow: 0 6px 20px rgba(232, 140, 43, 0.35);
            margin-top: 6px;
          }
        }
      `}</style>
    </section>
  );
}
