import React from 'react';
import { 
  Tv, 
  Wind, 
  VolumeX, 
  BatteryCharging, 
  Sparkles, 
  Luggage,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

const CABIN_FEATURES = [
  {
    icon: Sparkles,
    title: "Executive Leather Captain's Chairs",
    description: "Perforated High Country leather seating with individual armrests, deep contouring, and generous legroom to recline comfortably.",
  },
  {
    icon: Tv,
    title: 'Dual Rear Seat Entertainment',
    description: 'Twin 12.6-inch high-definition displays with streaming connectivity to keep children entertained or review presentations.',
  },
  {
    icon: Wind,
    title: 'Tri-Zone Climate Control',
    description: 'Independent digital rear climate controls so you and your passengers can dial in your exact personal temperature.',
  },
  {
    icon: VolumeX,
    title: 'Acoustic Whisper-Quiet Cabin',
    description: 'Triple-sealed doors and acoustic laminated glass keep Houston freeway noise outside for effortless phone calls or restful sleep.',
  },
  {
    icon: BatteryCharging,
    title: 'High-Speed USB-C & 110V Outlets',
    description: 'Fast-charging ports accessible in every row ensuring your phones, tablets, and laptops stay 100% powered throughout your journey.',
  },
  {
    icon: Luggage,
    title: 'Chilled Water & Massive Cargo Space',
    description: 'Complimentary chilled bottled spring water, mints, and an expansive trunk holding up to 6 large check-in suitcases effortlessly.',
  },
];

export default function VehicleInteriorSection() {
  return (
    <section id="interior" className="vehicle-interior-section">
      <div className="container">
        {/* Section Header */}
        <div className="interior-header-block">
          <span className="section-tag-gold">FIRST-CLASS AMENITIES</span>
          <h2 className="interior-main-title">Step Inside Pure Executive Luxury</h2>
          <p className="interior-sub-title">
            Your travel time is precious. Our Chevrolet Suburban High Country cabin is tailored for silence, productivity, and supreme relaxation.
          </p>
        </div>

        {/* Showcase Grid: Big Image on Left, Feature Highlights on Right */}
        <div className="interior-showcase-grid">
          {/* Left: Panoramic Interior Photo */}
          <div className="interior-photo-wrapper">
            <img
              src="/images/suburban_interior.jpg"
              alt="Chevrolet Suburban High Country Luxury Cabin Interior"
              className="interior-showcase-img"
            />
            <div className="interior-photo-badge">
              <ShieldCheck size={16} color="#F59E0B" />
              <span>Chevrolet Suburban High Country Interior</span>
            </div>
          </div>

          {/* Right: 6 Cabin Features in 2 columns */}
          <div className="interior-features-column">
            <div className="interior-cards-grid">
              {CABIN_FEATURES.map((feat, idx) => {
                const Icon = feat.icon;
                return (
                  <div key={idx} className="cabin-feature-card">
                    <div className="cabin-feature-icon-box">
                      <Icon size={20} color="#F59E0B" />
                    </div>
                    <div className="cabin-feature-text">
                      <h3 className="cabin-feature-title">{feat.title}</h3>
                      <p className="cabin-feature-desc">{feat.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom Verification Banner */}
            <div className="interior-cleanliness-pill">
              <CheckCircle2 size={16} color="#10B981" />
              <span>Hospital-Grade Cabin Sanitation & Professional Detailing Prior to Every Booking</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .vehicle-interior-section {
          background: #0A1118;
          color: #FFFFFF;
          padding: 85px 0 90px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          position: relative;
        }

        .interior-header-block {
          text-align: left;
          max-width: 780px;
          margin-bottom: 48px;
        }

        .interior-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.35rem, 3.5vw, 3.15rem);
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.15;
          letter-spacing: -0.02em;
          margin: 8px 0 12px 0;
        }

        .interior-sub-title {
          font-size: 1.02rem;
          color: #94A3B8;
          line-height: 1.6;
          margin: 0;
        }

        .interior-showcase-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 40px;
          align-items: center;
        }

        .interior-photo-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.4);
          border: 1px solid rgba(255, 255, 255, 0.12);
          background: #111A24;
        }

        .interior-showcase-img {
          width: 100%;
          height: 100%;
          min-height: 440px;
          object-fit: cover;
          display: block;
          transition: transform 0.35s ease;
        }

        .interior-photo-wrapper:hover .interior-showcase-img {
          transform: scale(1.02);
        }

        .interior-photo-badge {
          position: absolute;
          bottom: 16px;
          left: 16px;
          background: rgba(10, 17, 24, 0.88);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          padding: 8px 14px;
          border-radius: var(--radius-full);
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          font-weight: 700;
          color: #FFFFFF;
        }

        .interior-features-column {
          display: flex;
          flex-direction: column;
          gap: 24px;
          text-align: left;
        }

        .interior-cards-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .cabin-feature-card {
          background: #111A24;
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 14px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }

        .cabin-feature-card:hover {
          border-color: rgba(245, 158, 11, 0.4);
          transform: translateY(-3px);
        }

        .cabin-feature-icon-box {
          width: 42px;
          height: 42px;
          border-radius: 10px;
          background: rgba(245, 158, 11, 0.12);
          border: 1px solid rgba(245, 158, 11, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cabin-feature-title {
          font-family: var(--font-heading);
          font-size: 0.98rem;
          font-weight: 800;
          color: #FFFFFF;
          margin: 0;
          line-height: 1.25;
        }

        .cabin-feature-desc {
          font-size: 0.82rem;
          color: #94A3B8;
          line-height: 1.45;
          margin: 0;
        }

        .interior-cleanliness-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(16, 185, 129, 0.1);
          border: 1px solid rgba(16, 185, 129, 0.3);
          padding: 10px 18px;
          border-radius: var(--radius-full);
          font-size: 0.82rem;
          font-weight: 700;
          color: #E2E8F0;
        }

        @media (max-width: 1024px) {
          .interior-showcase-grid {
            grid-template-columns: 1fr;
          }
          .interior-cards-grid {
            grid-template-columns: 1fr 1fr;
          }
        }

        @media (max-width: 640px) {
          .interior-cards-grid {
            grid-template-columns: 1fr;
          }
          .interior-photo-wrapper {
            height: 280px;
          }
          .interior-showcase-img {
            min-height: 280px;
          }
        }
      `}</style>
    </section>
  );
}
