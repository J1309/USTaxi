import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ImageWithSkeleton } from './SkeletonLoader';
import { smoothScrollTo } from '../hooks/useLenis';

const SERVICES = [
  {
    id: 'airport',
    title: 'Airport Pickup & Drop-off',
    subtitle: 'IAH & HOU. On-time, stress-free transfers.',
    image: '/images/service_airport.jpg',
  },
  {
    id: 'hourly',
    title: 'Hourly Rental',
    subtitle: 'Travel at your pace. Flexible and convenient hourly service.',
    image: '/images/hero_houston.jpg',
  },
  {
    id: 'nasa',
    title: 'NASA Service',
    subtitle: 'Reliable transportation to NASA Johnson Space Center.',
    image: '/images/service_nasa.jpg',
  },
  {
    id: 'cruise',
    title: 'Cruise Terminal Transportation',
    subtitle: 'Port of Houston rides to your cruise.',
    image: '/images/service_cruise.jpg',
  },
  {
    id: 'corporate',
    title: 'Corporate Transport',
    subtitle: 'Professional travel solutions for your business.',
    image: '/images/service_corporate.jpg',
  },
  {
    id: 'group',
    title: '8 Passenger Service',
    subtitle: 'Spacious and comfortable for families and groups.',
    image: '/images/fleet_suburban.jpg',
  },
];

export default function ServicesSection() {
  const handleServiceClick = () => {
    smoothScrollTo('#booking-section');
  };

  return (
    <section id="services" className="section-spacing services-section-clean">
      <div className="container">
        {/* Strictly Left-Aligned Section Header */}
        <div className="section-header-left">
          <span className="section-tag-small">OUR SERVICES</span>
          <h2 className="section-title-large">Travel Solutions For Every Journey</h2>
          <p className="section-desc-sub">
            From airport transfers to corporate travel, we provide reliable and comfortable transportation across Houston.
          </p>
        </div>

        {/* 6 Services Desktop Grid across the wide container */}
        <div className="services-grid-6">
          {SERVICES.map((item) => (
            <div
              key={item.id}
              className="service-card-clean"
              onClick={handleServiceClick}
              role="button"
              tabIndex={0}
            >
              <div className="service-media-clean">
                <ImageWithSkeleton
                  src={item.image}
                  alt={item.title}
                  aspectRatio="1/1"
                />
              </div>

              <div className="service-content-clean">
                <h3 className="service-title-clean">{item.title}</h3>
                <p className="service-desc-clean">{item.subtitle}</p>

                {/* Left-aligned arrow button as in reference */}
                <div className="service-arrow-left">
                  <ArrowRight size={14} color="#0284C7" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .services-section-clean {
          background: #FFFFFF;
        }
        .section-header-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          margin-bottom: 40px;
        }
        .services-grid-6 {
          display: grid;
          grid-template-columns: repeat(6, 1fr);
          gap: 20px;
        }
        .service-card-clean {
          background: #FFFFFF;
          border: 1px solid #E2E8F0;
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s var(--ease-snappy);
          box-shadow: 0 1px 3px rgba(15, 23, 42, 0.04);
        }
        .service-card-clean:hover {
          transform: translateY(-4px);
          border-color: #CBD5E1;
          box-shadow: var(--shadow-md);
        }
        .service-media-clean {
          width: 100%;
          border-radius: 8px;
          overflow: hidden;
          background: #F1F5F9;
        }
        .service-content-clean {
          width: 100%;
          padding-top: 14px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          flex: 1;
        }
        .service-title-clean {
          font-size: 0.95rem;
          font-weight: 700;
          color: #0F172A;
          line-height: 1.3;
          margin-bottom: 6px;
          text-align: left;
        }
        .service-desc-clean {
          font-size: 0.8rem;
          color: #64748B;
          line-height: 1.45;
          margin-bottom: 14px;
          text-align: left;
        }
        .service-arrow-left {
          margin-top: auto;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          border: 1px solid #E2E8F0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #F8FAFC;
          transition: all 0.15s ease;
        }
        .service-card-clean:hover .service-arrow-left {
          background: #0284C7;
          border-color: #0284C7;
        }
        .service-card-clean:hover .service-arrow-left svg {
          stroke: #FFFFFF;
        }

        @media (max-width: 1200px) {
          .services-grid-6 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        @media (max-width: 768px) {
          .services-grid-6 {
            grid-template-columns: repeat(2, 1fr);
            gap: 14px;
          }
        }
        @media (max-width: 480px) {
          .services-grid-6 {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
