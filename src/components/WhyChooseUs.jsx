import React from 'react';
import { Gem, Users, Settings, Star, ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

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
  const handleReserveClick = () => {
    smoothScrollTo('#booking-engine');
  };

  return (
    <section id="why-us" className="higher-standard-section">
      <div className="container">
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

        @media (max-width: 960px) {
          .higher-standard-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .higher-standard-img {
            min-height: 380px;
          }
        }
      `}</style>
    </section>
  );
}
