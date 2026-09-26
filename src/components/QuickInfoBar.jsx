import React from 'react';
import { Gem, Clock, ShieldCheck, Headphones } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Gem,
    title: 'LUXURY FLEET',
    description: 'High Country Suburban & Lexus Sedan for a superior experience.',
  },
  {
    icon: Clock,
    title: 'ON-TIME, ALWAYS',
    description: 'Punctual and reliable service with FAA flight radar tracking.',
  },
  {
    icon: ShieldCheck,
    title: 'SAFE & SECURE',
    description: 'Sanitized executive cabins & certified child car seats available.',
  },
  {
    icon: Headphones,
    title: '24/7 SUPPORT',
    description: "Direct line to owner Symanthan whenever you need us.",
  },
];

export default function QuickInfoBar() {
  return (
    <section className="luxury-pillars-bar">
      <div className="container">
        {/* Mobile-Only Section Header Matching Screen 3 */}
        <div className="pillars-mobile-header reveal-on-scroll">
          <span className="pillars-kicker">TRUSTED FOR A REASON</span>
          <h2 className="pillars-main-title">A Premium Experience Every Ride</h2>
        </div>

        <div className="pillars-grid-4">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={`pillar-column-item reveal-on-scroll reveal-delay-${idx + 1}`}>
                <div className="pillar-icon-box">
                  <Icon size={24} strokeWidth={1.5} color="#E88C2B" />
                </div>
                <h3 className="pillar-item-title">{item.title}</h3>
                <p className="pillar-item-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .luxury-pillars-bar {
          background: #FEFBF3;
          padding: 55px 0;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
        }

        .pillars-mobile-header {
          display: none;
        }

        .pillars-grid-4 {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 32px;
          align-items: flex-start;
        }

        .pillar-column-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 0 16px;
          position: relative;
        }

        .pillar-column-item:not(:last-child)::after {
          content: '';
          position: absolute;
          right: -16px;
          top: 15%;
          height: 70%;
          width: 1px;
          background: rgba(78, 4, 1, 0.08);
        }

        .pillar-icon-box {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: #FDF3E7;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 4px 12px rgba(232, 140, 43, 0.15);
          transition: transform 0.2s ease;
        }

        .pillar-column-item:hover .pillar-icon-box {
          transform: translateY(-2px);
          background: #E88C2B;
        }

        .pillar-column-item:hover .pillar-icon-box svg {
          stroke: #FFFFFF;
        }

        .pillar-item-title {
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #4E0401;
          margin: 0 0 8px 0;
        }

        .pillar-item-desc {
          font-size: 0.84rem;
          color: #786C6A;
          line-height: 1.5;
          margin: 0;
          max-width: 250px;
        }

        /* Strictly Mobile (<= 768px): Screen 3 2x2 Grid with Section Header */
        @media (max-width: 768px) {
          .luxury-pillars-bar {
            padding: 44px 0 52px 0;
          }

          .pillars-mobile-header {
            display: block;
            text-align: center;
            margin-bottom: 30px;
          }

          .pillars-kicker {
            font-size: 0.72rem;
            font-weight: 800;
            letter-spacing: 0.16em;
            text-transform: uppercase;
            color: #E88C2B;
            margin-bottom: 6px;
            display: block;
          }

          .pillars-main-title {
            font-family: var(--font-heading);
            font-size: 1.85rem;
            font-weight: 900;
            color: #4E0401;
            line-height: 1.15;
            margin: 0;
            -webkit-text-stroke: 0.3px currentColor;
          }

          .pillars-grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 28px 16px !important;
          }

          .pillar-column-item {
            padding: 0 4px;
          }

          .pillar-column-item:not(:last-child)::after {
            display: none;
          }

          .pillar-icon-box {
            width: 44px;
            height: 44px;
            margin-bottom: 10px;
          }

          .pillar-item-title {
            font-size: 0.82rem;
            margin-bottom: 5px;
            letter-spacing: 0.08em;
          }

          .pillar-item-desc {
            font-size: 0.75rem;
            line-height: 1.4;
          }
        }
      `}</style>
    </section>
  );
}
