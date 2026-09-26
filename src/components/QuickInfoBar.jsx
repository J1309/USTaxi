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
        <div className="pillars-grid-4">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="pillar-column-item">
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

        @media (max-width: 900px) {
          .pillars-grid-4 {
            grid-template-columns: repeat(2, 1fr);
            gap: 36px;
          }
          .pillar-column-item:not(:last-child)::after {
            display: none;
          }
        }

        @media (max-width: 540px) {
          .pillars-grid-4 {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .luxury-pillars-bar {
            padding: 40px 0;
          }
        }
      `}</style>
    </section>
  );
}
