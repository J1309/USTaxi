import React from 'react';
import { useNavigate } from 'react-router-dom';
import { smoothScrollTo } from '../hooks/useLenis';
import { getDirectWhatsAppChatUrl } from '../utils/whatsapp';

const BENTO_CARDS = [
  {
    id: 1,
    colSpan: 'span-2',
    image: '/images/why/card1.jpg',
    category: 'EXECUTIVE COMFORT',
    title: 'Wake Up to Stress-Free Curbside Pickups',
    pillText: 'Complimentary Amenities',
    action: 'book',
  },
  {
    id: 2,
    colSpan: 'span-1',
    image: '/images/why/card2.jpg',
    category: 'IAH & HOU RADAR',
    title: 'Real-Time FAA Flight Tracking',
    pillText: 'Zero Wait Penalty',
    action: 'book',
  },
  {
    id: 3,
    colSpan: 'span-1',
    image: '/images/why/card3.jpg',
    category: 'TRANSPARENT FARES',
    title: 'Experience Guaranteed Flat Rates',
    pillText: 'No Surge Pricing',
    action: 'fleet',
  },
  {
    id: 4,
    colSpan: 'span-1',
    image: '/images/why/card4.jpg',
    category: 'PRISTINE CABIN',
    title: 'Spotless & Sanitized Luxury Interiors',
    pillText: 'Daily Detailing',
    action: 'fleet',
  },
  {
    id: 5,
    colSpan: 'span-1',
    image: '/images/why/card5.jpg',
    category: 'SAFETY & CARE',
    title: 'Discreet & Vetted Chauffeurs',
    pillText: '100% Background Checked',
    action: 'about',
  },
  {
    id: 6,
    colSpan: 'span-2',
    image: '/images/why/card6.jpg',
    category: 'ALWAYS ON CALL',
    title: '24/7 Direct Dispatch Across Greater Houston',
    pillText: 'WhatsApp & Call Dispatch',
    action: 'whatsapp',
  },
];

export default function WhyChooseUs() {
  const navigate = useNavigate();

  const handleCardClick = (action) => {
    if (action === 'book') {
      smoothScrollTo('#booking-section');
    } else if (action === 'fleet') {
      smoothScrollTo('#fleet');
    } else if (action === 'about') {
      navigate('/about');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (action === 'whatsapp') {
      window.open(getDirectWhatsAppChatUrl(), '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="why-us" className="section-spacing why-bento-section">
      <div className="container">
        {/* Section Header: Minimalist Editorial Style */}
        <div className="why-bento-header">
          <span className="section-tag-small">WHY RIDE WITH US</span>
          <h2 className="section-title-large">Your Comfort. Our Priority.</h2>
          <p className="why-bento-subtitle">
            Executive ground transportation engineered for Houston business executives, airport arrivals, and Galveston cruise transfers.
          </p>
        </div>

        {/* 6 Bento Cards Grid: Exact 4-Column Layout from Reference */}
        <div className="why-bento-grid">
          {BENTO_CARDS.map((card) => {
            const isWide = card.colSpan === 'span-2';
            return (
              <div
                key={card.id}
                className={`bento-card ${card.colSpan}`}
                style={{ backgroundImage: `url(${card.image})` }}
                onClick={() => handleCardClick(card.action)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleCardClick(card.action);
                  }
                }}
              >
                {/* Subtle visual gradient scrim to guarantee high text contrast */}
                <div className="bento-card-scrim" />

                {/* Card Top: Category & Bold Title */}
                <div className={`bento-card-top ${isWide ? 'wide-text' : ''}`}>
                  <span className="bento-category">{card.category}</span>
                  <h3 className="bento-title">{card.title}</h3>
                </div>

                {/* Card Bottom: Crisp White Pill Button */}
                <div className="bento-card-bottom">
                  <span className="bento-white-pill">
                    {card.pillText}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .why-bento-section {
          background: #FFFFFF;
          padding-top: 60px;
          padding-bottom: 90px;
        }

        .why-bento-header {
          text-align: left;
          margin-bottom: 36px;
          max-width: 780px;
        }

        .why-bento-subtitle {
          font-size: 1.05rem;
          color: #64748B;
          margin-top: 10px;
          line-height: 1.55;
          text-align: left;
        }

        /* 4-Column Bento Grid Matching the Reference Mockup */
        .why-bento-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        /* Card Geometry & Styling */
        .bento-card {
          position: relative;
          height: 330px;
          border-radius: 20px;
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          overflow: hidden;
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
          transition: transform 0.32s cubic-bezier(0.16, 1, 0.3, 1), 
                      box-shadow 0.32s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .bento-card.span-2 {
          grid-column: span 2;
        }

        .bento-card.span-1 {
          grid-column: span 1;
        }

        /* Scrim Overlay for Crystal Clear Typography */
        .bento-card-scrim {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg, 
            rgba(15, 23, 42, 0.52) 0%, 
            rgba(15, 23, 42, 0.16) 42%, 
            rgba(15, 23, 42, 0.48) 100%
          );
          transition: background 0.3s ease;
          pointer-events: none;
        }

        .bento-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 40px -8px rgba(15, 23, 42, 0.22);
        }

        .bento-card:hover .bento-card-scrim {
          background: linear-gradient(
            180deg, 
            rgba(15, 23, 42, 0.44) 0%, 
            rgba(15, 23, 42, 0.10) 42%, 
            rgba(15, 23, 42, 0.56) 100%
          );
        }

        /* Card Content Hierarchy */
        .bento-card-top {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .bento-card-top.wide-text {
          max-width: 65%;
        }

        .bento-category {
          font-family: var(--font-heading);
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.88);
          display: block;
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
        }

        .bento-title {
          font-family: var(--font-heading);
          font-size: clamp(1.35rem, 1.7vw, 1.65rem);
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.25;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.45);
        }

        .bento-card-bottom {
          position: relative;
          z-index: 2;
        }

        /* Signature White Pill from Mockup */
        .bento-white-pill {
          display: inline-flex;
          align-items: center;
          background: #FFFFFF;
          color: #0F172A;
          font-size: 0.8rem;
          font-weight: 700;
          padding: 8px 18px;
          border-radius: var(--radius-full);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.14);
          transition: transform 0.2s ease, background-color 0.2s ease, color 0.2s ease;
        }

        .bento-card:hover .bento-white-pill {
          background: #0284C7;
          color: #FFFFFF;
          transform: scale(1.04);
        }

        /* Responsive Breakpoints */
        @media (max-width: 1024px) {
          .why-bento-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .bento-card.span-2,
          .bento-card.span-1 {
            grid-column: span 1;
          }
          .bento-card {
            height: 300px;
          }
          .bento-card-top.wide-text {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .why-bento-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .bento-card.span-2,
          .bento-card.span-1 {
            grid-column: span 1;
          }
          .bento-card {
            height: 270px;
            padding: 22px;
          }
          .bento-title {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
}
