import React from 'react';
import { 
  ShieldCheck, 
  UserCheck, 
  Sparkles, 
  CalendarCheck, 
  Clock, 
  MapPin, 
  Phone, 
  Car, 
  ArrowRight 
} from 'lucide-react';
import { OWNER_PHONE_RAW } from '../utils/whatsapp';
import { smoothScrollTo } from '../hooks/useLenis';

const WHY_FEATURES = [
  {
    icon: ShieldCheck,
    title: 'Reliable Service',
    desc: 'On-time pickup, every time.',
  },
  {
    icon: UserCheck,
    title: 'Professional Drivers',
    desc: 'Courteous and experienced.',
  },
  {
    icon: Sparkles,
    title: 'Clean Vehicles',
    desc: 'Well-maintained for your comfort.',
  },
  {
    icon: CalendarCheck,
    title: 'Easy Booking',
    desc: 'Book by phone or online.',
  },
  {
    icon: Clock,
    title: 'Available 24/7',
    desc: "We're here when you need us.",
  },
  {
    icon: MapPin,
    title: 'Wide Service Area',
    desc: 'Houston and surrounding areas.',
  },
];

export default function CtaBanner() {
  const handleBookClick = () => {
    smoothScrollTo('#fleet-booking-card');
  };

  return (
    <section className="why-choose-and-cta-block">
      <div className="container">
        {/* Dark Box: Why Choose Lavender Taxi */}
        <div className="why-choose-navy-box">
          <h2 className="why-choose-title">Why Choose Lavender Taxi</h2>

          <div className="why-choose-features-grid">
            {WHY_FEATURES.map((feat, idx) => {
              const Icon = feat.icon;
              return (
                <div key={idx} className="why-feat-item">
                  <div className="why-feat-icon-box">
                    <Icon size={20} color="#F59E0B" />
                  </div>
                  <div className="why-feat-text">
                    <h3 className="why-feat-title">{feat.title}</h3>
                    <p className="why-feat-desc">{feat.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ready for Your Ride? Skyline Banner */}
        <div className="ready-banner-wrap">
          <div className="ready-bg-media">
            <img
              src="/images/hero_houston.jpg"
              alt="Houston Skyline Evening"
              className="ready-bg-img"
            />
            <div className="ready-bg-overlay" />
          </div>

          <div className="ready-content-layout">
            <div className="ready-text-block">
              <h3 className="ready-main-title">Ready for Your Ride?</h3>
              <p className="ready-sub-text">
                Book now and experience reliable and comfortable transportation in Houston.
              </p>
            </div>

            <div className="ready-actions-row">
              <button
                type="button"
                onClick={handleBookClick}
                className="ready-gold-btn"
              >
                <Car size={16} />
                <span>Book a Ride</span>
                <ArrowRight size={15} />
              </button>

              <a
                href={`tel:+${OWNER_PHONE_RAW}`}
                className="ready-outline-btn"
              >
                <Phone size={15} />
                <span>+1 (832) 879-8685</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .why-choose-and-cta-block {
          background: #0A1118;
          padding: 60px 0 70px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        /* Dark Navy Feature Box */
        .why-choose-navy-box {
          background: #111A24;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          padding: 40px;
          margin-bottom: 32px;
          text-align: left;
        }

        .why-choose-title {
          font-family: var(--font-heading);
          font-size: clamp(2.05rem, 2.8vw, 2.55rem);
          font-weight: 900;
          color: #FFFFFF;
          margin: 0 0 32px 0;
          letter-spacing: -0.01em;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .why-choose-features-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }

        .why-feat-item {
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .why-feat-icon-box {
          width: 44px;
          height: 44px;
          border-radius: 10px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .why-feat-text {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .why-feat-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          -webkit-text-stroke: 0.32px currentColor;
          text-rendering: optimizeLegibility;
        }

        .why-feat-desc {
          font-size: 0.84rem;
          color: #94A3B8;
          margin: 0;
          line-height: 1.35;
        }

        /* Ready Banner */
        .ready-banner-wrap {
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          padding: 40px 48px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .ready-bg-media {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }

        .ready-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
        }

        .ready-bg-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            90deg,
            rgba(10, 17, 24, 0.94) 0%,
            rgba(10, 17, 24, 0.88) 50%,
            rgba(10, 17, 24, 0.75) 100%
          );
        }

        .ready-content-layout {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 28px;
        }

        .ready-text-block {
          text-align: left;
        }

        .ready-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.05rem, 2.9vw, 2.55rem);
          font-weight: 900;
          color: #FFFFFF;
          margin: 0 0 6px 0;
          letter-spacing: -0.01em;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .ready-sub-text {
          font-size: 0.96rem;
          color: #CBD5E1;
          margin: 0;
        }

        .ready-actions-row {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .ready-gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F59E0B;
          color: #0F172A;
          font-weight: 800;
          font-size: 0.94rem;
          padding: 12px 22px;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(245, 158, 11, 0.3);
          transition: background 0.18s ease;
        }

        .ready-gold-btn:hover {
          background: #D97706;
        }

        .ready-outline-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(15, 23, 42, 0.7);
          color: #FFFFFF;
          border: 1px solid rgba(255, 255, 255, 0.25);
          font-weight: 700;
          font-size: 0.92rem;
          padding: 12px 20px;
          border-radius: 8px;
          backdrop-filter: blur(6px);
          transition: all 0.18s ease;
        }

        .ready-outline-btn:hover {
          border-color: #F59E0B;
          color: #F59E0B;
        }

        @media (max-width: 1024px) {
          .why-choose-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .why-choose-navy-box {
            padding: 24px;
          }
          .why-choose-features-grid {
            grid-template-columns: 1fr;
            gap: 18px;
          }
          .ready-banner-wrap {
            padding: 30px 24px;
          }
          .ready-content-layout {
            flex-direction: column;
            align-items: flex-start;
          }
          .ready-actions-row {
            width: 100%;
            flex-direction: column;
          }
          .ready-gold-btn,
          .ready-outline-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
}
