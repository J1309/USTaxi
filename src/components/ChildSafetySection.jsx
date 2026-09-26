import React from 'react';
import { 
  ShieldCheck, 
  Baby, 
  Sparkles, 
  HeartHandshake, 
  Check, 
  ArrowRight,
  ShieldAlert
} from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

const SAFETY_PILLARS = [
  {
    icon: Baby,
    title: 'Pre-Installed Car Seats & Boosters',
    desc: 'Infant rear-facing, toddler forward-facing 5-point harnesses, and high-back booster seats pre-installed before we arrive at your terminal or doorstep.',
  },
  {
    icon: ShieldCheck,
    title: 'NHTSA & LATCH Certified Anchoring',
    desc: 'Rigid steel LATCH & ISOFIX tether systems locked directly into Chevrolet Suburban factory points for maximum structural protection.',
  },
  {
    icon: Sparkles,
    title: 'Hospital-Grade Steam Sanitization',
    desc: 'Every car seat harness and buckle undergoes deep thermal steam sterilization with hypoallergenic, child-safe cleaners between uses.',
  },
  {
    icon: HeartHandshake,
    title: 'Family-Focused Driving Standards',
    desc: 'Smooth gentle acceleration, wide following distances, and thoughtful assistance with strollers, diaper bags, and heavy cruise luggage.',
  },
];

export default function ChildSafetySection() {
  const handleRequestSeat = () => {
    smoothScrollTo('#fleet-booking-card');
  };

  return (
    <section id="child-safety" className="child-safety-section-light">
      <div className="container">
        <div className="child-safety-grid">
          {/* Left Column: Reassuring Photo of Installed Car Seat */}
          <div className="child-safety-media-wrap">
            <img
              src="/images/child_safety_carseat.jpg"
              alt="Certified Child Safety Car Seat installed in Chevrolet Suburban"
              className="child-safety-img"
            />
            <div className="child-safety-floating-badge">
              <ShieldCheck size={18} color="#059669" />
              <div>
                <span className="badge-main-text">100% Certified Child-Safe</span>
                <span className="badge-sub-text">Texas NHTSA Compliant</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 4 Pillars */}
          <div className="child-safety-content-block">
            <span className="section-tag-gold">FAMILY TRAVEL WITH PEACE OF MIND</span>
            <h2 className="child-safety-main-title">
              Your Children's Safety Is Our Highest Standard
            </h2>
            <p className="child-safety-intro-text">
              Traveling through George Bush (IAH), Hobby (HOU), or embarking on a Galveston cruise with young children shouldn't be stressful. Forget hauling bulky car seats through airport lines—we have sanitized, age-appropriate seats safely mounted and waiting.
            </p>

            <div className="child-safety-pillars-stack">
              {SAFETY_PILLARS.map((pillar, i) => {
                const Icon = pillar.icon;
                return (
                  <div key={i} className="safety-pillar-card">
                    <div className="safety-pillar-icon-box">
                      <Icon size={20} color="#D97706" />
                    </div>
                    <div className="safety-pillar-text">
                      <h3 className="safety-pillar-title">{pillar.title}</h3>
                      <p className="safety-pillar-desc">{pillar.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="child-safety-action-row">
              <button
                type="button"
                onClick={handleRequestSeat}
                className="child-safety-cta-btn"
              >
                <span>Request Car Seat With Booking</span>
                <ArrowRight size={15} />
              </button>
              <span className="child-safety-note">
                <Check size={14} color="#059669" />
                <span>Complimentary with family airport transfers</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .child-safety-section-light {
          background: #FFFFFF;
          padding: 85px 0;
          border-bottom: 1px solid #E2E8F0;
        }

        .child-safety-grid {
          display: grid;
          grid-template-columns: 1fr 1.15fr;
          gap: 48px;
          align-items: center;
        }

        .child-safety-media-wrap {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.08);
          border: 1px solid #E2E8F0;
          background: #F1F5F9;
        }

        .child-safety-img {
          width: 100%;
          height: 100%;
          min-height: 480px;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .child-safety-media-wrap:hover .child-safety-img {
          transform: scale(1.02);
        }

        .child-safety-floating-badge {
          position: absolute;
          bottom: 20px;
          left: 20px;
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(8px);
          border: 1px solid #E2E8F0;
          padding: 10px 16px;
          border-radius: 12px;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          box-shadow: 0 8px 24px rgba(15, 23, 42, 0.12);
        }

        .badge-main-text {
          font-family: var(--font-heading);
          font-size: 0.88rem;
          font-weight: 800;
          color: #0F172A;
          display: block;
          line-height: 1.2;
        }

        .badge-sub-text {
          font-size: 0.72rem;
          color: #059669;
          font-weight: 700;
          display: block;
        }

        .child-safety-content-block {
          text-align: left;
        }

        .child-safety-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.75vw, 3.35rem);
          font-weight: 900;
          color: #0F172A;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 8px 0 14px 0;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .child-safety-intro-text {
          font-size: 1rem;
          color: #475569;
          line-height: 1.6;
          margin-bottom: 28px;
        }

        .child-safety-pillars-stack {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 32px;
        }

        .safety-pillar-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          padding: 18px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          text-align: left;
          transition: border-color 0.2s ease;
        }

        .safety-pillar-card:hover {
          border-color: #FDE68A;
          background: #FFFDF5;
        }

        .safety-pillar-icon-box {
          width: 40px;
          height: 40px;
          border-radius: 10px;
          background: #FEF3C7;
          border: 1px solid #FDE68A;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .safety-pillar-title {
          font-family: var(--font-heading);
          font-size: 1.04rem;
          font-weight: 800;
          color: #0F172A;
          margin: 0;
          line-height: 1.25;
          -webkit-text-stroke: 0.32px currentColor;
          text-rendering: optimizeLegibility;
        }

        .safety-pillar-desc {
          font-size: 0.8rem;
          color: #64748B;
          margin: 0;
          line-height: 1.45;
        }

        .child-safety-action-row {
          display: flex;
          align-items: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .child-safety-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F59E0B;
          color: #0F172A;
          font-weight: 800;
          font-size: 0.94rem;
          padding: 13px 22px;
          border-radius: 8px;
          box-shadow: 0 4px 14px rgba(245, 158, 11, 0.28);
          transition: background 0.18s ease;
        }

        .child-safety-cta-btn:hover {
          background: #D97706;
        }

        .child-safety-note {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.82rem;
          font-weight: 700;
          color: #059669;
        }

        @media (max-width: 1024px) {
          .child-safety-grid {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .child-safety-pillars-stack {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .child-safety-pillars-stack {
            grid-template-columns: 1fr;
          }
          .child-safety-img {
            min-height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
