import React from 'react';
import {
  Users,
  Briefcase,
  Award,
  ArrowRight,
  Wifi,
  Sparkles,
  MessageCircle,
} from 'lucide-react';
import { ImageWithSkeleton } from './SkeletonLoader';
import { smoothScrollTo } from '../hooks/useLenis';
import { buildWhatsAppBookingUrl } from '../utils/whatsapp';

const COMPACT_FLEET = [
  {
    id: 'suburban',
    make: 'CHEVROLET',
    model: 'Chevrolet Suburban',
    tag: 'Up to 8 Passengers',
    badge: 'Popular for Groups',
    image: '/images/fleet_suburban.jpg',
    rate: 'From $70 Flat',
    specs: [
      { icon: Users, text: '8 Passenger Seats' },
      { icon: Briefcase, text: 'Large Luggage Space (8+ Bags)' },
      { icon: Award, text: 'Premium Comfort & Tri-Zone A/C' },
      { icon: Wifi, text: '5G Wi-Fi & USB-C Chargers' },
    ],
    buttonColor: '#0284C7',
    hoverColor: '#0369A1',
  },
  {
    id: 'lexus',
    make: 'LEXUS',
    model: 'Lexus Luxury Sedan',
    tag: 'Up to 4 Passengers',
    badge: 'Executive Comfort',
    image: '/images/fleet_lexus.jpg',
    rate: 'From $55 Flat',
    specs: [
      { icon: Users, text: '4 Passenger Seats' },
      { icon: Award, text: 'Plush Leather Interior' },
      { icon: Briefcase, text: 'Smooth & Quiet Suspension' },
      { icon: Wifi, text: 'Fast Charging & Privacy Glass' },
    ],
    buttonColor: '#0F172A',
    hoverColor: '#1E293B',
  },
];

export default function FleetSection({ onSelectVehicleForBooking }) {
  const handleBookVehicle = (vehicleId) => {
    if (onSelectVehicleForBooking) {
      onSelectVehicleForBooking(vehicleId);
    }
    smoothScrollTo('#booking-section');
  };

  const handleWhatsApp = (vehicle) => {
    const url = buildWhatsAppBookingUrl({
      vehicle: `${vehicle.model} (${vehicle.tag})`,
      tripType: 'One Way',
      passengers: vehicle.id === 'suburban' ? 8 : 4,
      luggage: vehicle.id === 'suburban' ? 8 : 3,
    });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="fleet" className="section-spacing fleet-section-compact">
      <div className="container">
        {/* Header */}
        <div className="fleet-compact-header">
          <div>
            <span className="section-tag-small">OUR FLEET</span>
            <h2 className="section-title-large">Choose Your Ride</h2>
            <p className="section-desc-sub">
              Well-maintained, clean and premium vehicles for a comfortable and safe journey.
            </p>
          </div>

          <button
            type="button"
            onClick={() => smoothScrollTo('#booking-section')}
            className="btn-blue-outline"
          >
            <span>View All Vehicles</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* 2 Sleek Compact Horizontal Cards */}
        <div className="fleet-compact-grid">
          {COMPACT_FLEET.map((vehicle) => (
            <div key={vehicle.id} className="fleet-sleek-card">
              {/* Photo on Left */}
              <div className="fleet-sleek-photo-box">
                <ImageWithSkeleton
                  src={vehicle.image}
                  alt={vehicle.model}
                  aspectRatio="16/11"
                  className="fleet-sleek-img"
                />
                <span className="fleet-corner-badge">
                  <Sparkles size={11} />
                  <span>{vehicle.badge}</span>
                </span>
              </div>

              {/* Specs & Actions on Right */}
              <div className="fleet-sleek-info-box">
                <div className="fleet-sleek-title-row">
                  <div>
                    <span className="fleet-mini-make">{vehicle.make}</span>
                    <h3 className="fleet-compact-name">{vehicle.model}</h3>
                  </div>
                  <div className="fleet-mini-rate">{vehicle.rate}</div>
                </div>

                {/* 4 Clean Bullet Points */}
                <ul className="fleet-mini-specs">
                  {vehicle.specs.map((item, idx) => {
                    const Icon = item.icon;
                    return (
                      <li key={idx}>
                        <Icon size={14} color="#0284C7" />
                        <span>{item.text}</span>
                      </li>
                    );
                  })}
                </ul>

                {/* Compact Actions Row */}
                <div className="fleet-sleek-actions">
                  <button
                    type="button"
                    onClick={() => handleBookVehicle(vehicle.id)}
                    style={{ background: vehicle.buttonColor }}
                    className="btn-compact-book"
                  >
                    <span>Book This Vehicle</span>
                    <ArrowRight size={14} />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsApp(vehicle)}
                    className="btn-compact-wa"
                    title="Reserve on WhatsApp"
                  >
                    <MessageCircle size={15} color="#25D366" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .fleet-section-compact {
          background: #F8FAFC;
          border-top: 1px solid #E2E8F0;
          border-bottom: 1px solid #E2E8F0;
        }
        .fleet-compact-header {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
          margin-bottom: 32px;
        }
        .fleet-compact-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .fleet-sleek-card {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 14px;
          overflow: hidden;
          display: grid;
          grid-template-columns: 1.15fr 1fr;
          box-shadow: var(--shadow-sm);
          transition: transform 0.2s var(--ease-snappy), box-shadow 0.2s var(--ease-snappy), border-color 0.2s ease;
          max-height: 280px;
        }
        .fleet-sleek-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
          border-color: #CBD5E1;
        }
        .fleet-sleek-photo-box {
          position: relative;
          background: #F1F5F9;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .fleet-sleek-photo-box img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.35s ease;
        }
        .fleet-sleek-card:hover .fleet-sleek-photo-box img {
          transform: scale(1.03);
        }
        .fleet-corner-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          z-index: 2;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: rgba(15, 23, 42, 0.88);
          backdrop-filter: blur(6px);
          color: #FFFFFF;
          font-size: 0.68rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: var(--radius-full);
        }
        .fleet-sleek-info-box {
          padding: 18px 20px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 10px;
          text-align: left;
        }
        .fleet-sleek-title-row {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 8px;
        }
        .fleet-mini-make {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #64748B;
          display: block;
        }
        .fleet-compact-name {
          font-size: 1.15rem;
          font-weight: 800;
          color: #0F172A;
          line-height: 1.2;
          margin-top: 1px;
        }
        .fleet-mini-rate {
          font-size: 0.82rem;
          font-weight: 800;
          color: #0284C7;
          background: #F0F9FF;
          padding: 3px 8px;
          border-radius: 6px;
          white-space: nowrap;
        }
        .fleet-mini-specs {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .fleet-mini-specs li {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          font-weight: 600;
          color: #334155;
          line-height: 1.3;
        }
        .fleet-sleek-actions {
          display: grid;
          grid-template-columns: 1.5fr 1fr;
          gap: 8px;
          margin-top: 4px;
        }
        .btn-compact-book {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.84rem;
          padding: 8px 12px;
          border-radius: 8px;
          transition: opacity 0.15s ease;
        }
        .btn-compact-book:hover {
          opacity: 0.92;
        }
        .btn-compact-wa {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          background: #FFFFFF;
          border: 1px solid #CBD5E1;
          color: #0F172A;
          font-weight: 700;
          font-size: 0.82rem;
          padding: 8px 10px;
          border-radius: 8px;
          transition: background 0.15s ease;
        }
        .btn-compact-wa:hover {
          background: #F0FDF4;
          border-color: #86EFAC;
        }

        @media (max-width: 1024px) {
          .fleet-compact-grid {
            grid-template-columns: 1fr;
          }
          .fleet-sleek-card {
            max-height: none;
          }
        }
        @media (max-width: 600px) {
          .fleet-sleek-card {
            grid-template-columns: 1fr;
          }
          .fleet-sleek-actions {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
