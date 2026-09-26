import React from 'react';
import { ArrowRight } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

const SERVICES = [
  {
    id: 'airport',
    title: 'Airport Transfer',
    image: '/images/service_airport.jpg',
    description: 'Seamless pickups and drop-offs at IAH and Hobby Airport for a stress-free journey.',
  },
  {
    id: 'city',
    title: 'City Rides',
    image: '/images/destination_houston.jpg',
    description: 'Comfortable and stylish travel across Downtown Houston, Galleria, and Memorial.',
  },
  {
    id: 'corporate',
    title: 'Corporate Travel',
    image: '/images/service_corporate.jpg',
    description: 'Professional and discreet executive transport for business meetings and roadshows.',
  },
];

export default function ServicesSection() {
  const handleExploreClick = () => {
    smoothScrollTo('#fleet');
  };

  const handleCardClick = () => {
    smoothScrollTo('#booking-engine');
  };

  return (
    <section id="services" className="services-reference-section">
      <div className="container">
        <div className="services-reference-layout">
          {/* Left Column: Headlines & CTA */}
          <div className="services-left-intro">
            <span className="services-kicker">OUR SERVICES</span>
            <h2 className="services-main-title">
              TRAVEL<br />
              WITHOUT<br />
              COMPROMISE
            </h2>
            <p className="services-lead-desc">
              From airport transfers to city rides and private charters, we provide premium executive car services tailored to your exact schedule and comfort.
            </p>

            <button
              type="button"
              onClick={handleExploreClick}
              className="btn-explore-services"
            >
              <span>EXPLORE SERVICES</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Right Column: 3 Vertical Photo Cards */}
          <div className="services-cards-trio">
            {SERVICES.map((item) => (
              <div
                key={item.id}
                className="service-editorial-card"
                onClick={handleCardClick}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleCardClick();
                  }
                }}
              >
                <div className="service-card-media">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="service-card-img"
                  />
                </div>

                <div className="service-card-content">
                  <h3 className="service-card-heading">{item.title}</h3>
                  <p className="service-card-paragraph">{item.description}</p>

                  <div className="service-card-action">
                    <span className="service-circle-arrow">
                      <ArrowRight size={14} color="#4E0401" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .services-reference-section {
          background: #FEFBF3;
          padding: 85px 0 95px 0;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
        }

        .services-reference-layout {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 50px;
          align-items: center;
        }

        /* Left Intro */
        .services-left-intro {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }

        .services-kicker {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #E88C2B;
          margin-bottom: 12px;
          display: block;
        }

        .services-main-title {
          font-family: var(--font-heading);
          font-size: clamp(2.6rem, 3.8vw, 3.4rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .services-lead-desc {
          font-size: 1rem;
          color: #786C6A;
          line-height: 1.6;
          margin-bottom: 32px;
        }

        .btn-explore-services {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 13px 26px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-explore-services:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
          transform: translateY(-2px);
          box-shadow: 0 4px 14px rgba(232, 140, 43, 0.3);
        }

        /* Right Cards: 3 Columns */
        .services-cards-trio {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 22px;
        }

        .service-editorial-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 16px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          box-shadow: 0 4px 16px rgba(78, 4, 1, 0.04);
          transition: all 0.24s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .service-editorial-card:hover {
          transform: translateY(-5px);
          border-color: rgba(232, 140, 43, 0.4);
          box-shadow: 0 16px 32px -8px rgba(78, 4, 1, 0.12);
        }

        .service-card-media {
          width: 100%;
          height: 190px;
          overflow: hidden;
          background: #F9F5EC;
        }

        .service-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .service-editorial-card:hover .service-card-img {
          transform: scale(1.05);
        }

        .service-card-content {
          padding: 22px 20px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .service-card-heading {
          font-family: var(--font-heading);
          font-size: 1.22rem;
          font-weight: 800;
          color: #4E0401;
          margin: 0 0 10px 0;
          line-height: 1.25;
          -webkit-text-stroke: 0.35px currentColor;
          text-rendering: optimizeLegibility;
        }

        .service-card-paragraph {
          font-size: 0.88rem;
          color: #786C6A;
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .service-card-action {
          display: flex;
          justify-content: flex-start;
        }

        .service-circle-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.18s ease;
        }

        .service-editorial-card:hover .service-circle-arrow {
          background: #E88C2B;
          border-color: #E88C2B;
          transform: translateX(3px);
        }

        .service-editorial-card:hover .service-circle-arrow svg {
          stroke: #FFFFFF;
        }

        @media (max-width: 1080px) {
          .services-reference-layout {
            grid-template-columns: 1fr;
            gap: 36px;
          }
          .services-left-intro {
            max-width: 600px;
          }
        }

        @media (max-width: 768px) {
          .services-cards-trio {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>
    </section>
  );
}
