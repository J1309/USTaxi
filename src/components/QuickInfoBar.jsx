import React from 'react';
import { Plane, MapPin, Briefcase, Calendar } from 'lucide-react';

const HIGHLIGHTS = [
  {
    icon: Plane,
    title: 'Airport Transfers',
    description: 'IAH & HOU airport pickup and drop-off.',
  },
  {
    icon: MapPin,
    title: 'Local Transportation',
    description: 'Reliable rides throughout Houston.',
  },
  {
    icon: Briefcase,
    title: 'Corporate Transportation',
    description: 'Professional transportation for business travelers.',
  },
  {
    icon: Calendar,
    title: 'Private & Hourly Rides',
    description: 'Flexible transportation for events, appointments and more.',
  },
];

export default function QuickInfoBar() {
  return (
    <section className="services-highlight-strip">
      <div className="container">
        <div className="highlight-strip-grid">
          {HIGHLIGHTS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="highlight-strip-item">
                <div className="highlight-icon-circle">
                  <Icon size={20} color="#D97706" />
                </div>
                <div className="highlight-text-wrap">
                  <h3 className="highlight-item-title">{item.title}</h3>
                  <p className="highlight-item-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .services-highlight-strip {
          background: #FFFFFF;
          padding: 24px 0;
          border-bottom: 1px solid #E2E8F0;
          box-shadow: 0 4px 14px rgba(15, 23, 42, 0.03);
        }

        .highlight-strip-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 28px;
          align-items: center;
        }

        .highlight-strip-item {
          display: flex;
          align-items: center;
          gap: 14px;
          text-align: left;
        }

        .highlight-strip-item:not(:last-child) {
          border-right: 1px solid #F1F5F9;
          padding-right: 20px;
        }

        .highlight-icon-circle {
          width: 46px;
          height: 46px;
          border-radius: 50%;
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .highlight-text-wrap {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .highlight-item-title {
          font-family: var(--font-heading);
          font-size: 0.96rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.2;
          margin: 0;
        }

        .highlight-item-desc {
          font-size: 0.78rem;
          color: #64748B;
          line-height: 1.35;
          margin: 0;
        }

        @media (max-width: 1024px) {
          .highlight-strip-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }
          .highlight-strip-item:nth-child(2) {
            border-right: none;
            padding-right: 0;
          }
        }

        @media (max-width: 600px) {
          .highlight-strip-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .highlight-strip-item {
            border-right: none;
            padding-right: 0;
          }
        }
      `}</style>
    </section>
  );
}
