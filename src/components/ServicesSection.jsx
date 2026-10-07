import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

const SERVICES = [
  {
    id: 'airport',
    title: 'Airport Transfer',
    image: '/images/owner_suburban_airport.jpg',
    description: 'Seamless pickups and drop-offs at IAH Bush and William P. Hobby Airport with live flight tracking.',
  },
  {
    id: 'city',
    title: 'City Rides & Chauffeur',
    image: '/images/destination_houston.jpg',
    description: 'Comfortable and stylish private travel across Downtown Houston, Galleria, Memorial, and River Oaks.',
  },
  {
    id: 'corporate',
    title: 'Corporate Travel',
    image: '/images/service_corporate.jpg',
    description: 'Professional and discreet executive transport for business summits, roadshows, and board meetings.',
  },
  {
    id: 'cruise',
    title: 'Galveston Cruise Port',
    image: '/images/dest_galveston_pier.png',
    description: 'Direct non-stop private transfers to Royal Caribbean & Carnival cruise berths with massive luggage room.',
  },
  {
    id: 'events',
    title: 'VIP Stadium & Arena',
    image: '/images/dest_nrg_stadium.png',
    description: 'Priority drop-offs and express egress for Houston Texans games, RodeoHouston, and arena concerts.',
  },
];

export default function ServicesSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  // Scroll smoothly to a specific card index
  const scrollToCard = useCallback((index) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.querySelectorAll('.service-editorial-card');
    if (cards[index]) {
      const card = cards[index];
      const targetScroll = card.offsetLeft - container.offsetLeft;
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth',
      });
      setActiveIndex(index);
    }
  }, []);

  const nextCard = useCallback(() => {
    const nextIdx = (activeIndex + 1) % SERVICES.length;
    scrollToCard(nextIdx);
  }, [activeIndex, scrollToCard]);

  const prevCard = useCallback(() => {
    const prevIdx = (activeIndex - 1 + SERVICES.length) % SERVICES.length;
    scrollToCard(prevIdx);
  }, [activeIndex, scrollToCard]);

  // Automatic slide progression one by one
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextCard();
    }, 3600);
    return () => clearInterval(interval);
  }, [isPaused, nextCard]);

  // Sync index on manual touch / scroll swipe
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = container.querySelectorAll('.service-editorial-card');
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth + 20; // width + gap
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx >= 0 && newIdx < SERVICES.length && newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  };

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
          <div className="services-left-intro reveal-on-scroll">
            <span className="services-kicker">OUR SERVICES</span>
            <h2 className="services-main-title">
              <span className="desktop-services-title">
                TRAVEL<br />
                WITHOUT<br />
                COMPROMISE
              </span>
              <span className="mobile-services-title">
                Travel Without Compromise
              </span>
            </h2>
            <p className="services-lead-desc">
              From airport transfers to city rides and private charters, we provide premium executive car services tailored to your needs.
            </p>

            <div className="services-desktop-controls-row">
              <button
                type="button"
                onClick={handleExploreClick}
                className="btn-explore-services"
              >
                <span>EXPLORE SERVICES</span>
                <ArrowRight size={15} />
              </button>

              {/* Desktop Slider Arrows */}
              <div className="services-nav-arrows">
                <button
                  type="button"
                  onClick={prevCard}
                  className="srv-arrow-btn"
                  aria-label="Previous service"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextCard}
                  className="srv-arrow-btn"
                  aria-label="Next service"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Large Photo Cards Moving Automatically One by One */}
          <div 
            className="services-cards-carousel-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="services-cards-carousel" 
              ref={carouselRef} 
              onScroll={handleScroll}
            >
              {SERVICES.map((item, idx) => (
                <div
                  key={item.id}
                  className={`service-editorial-card ${activeIndex === idx ? 'active-slide' : ''}`}
                  onClick={handleCardClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleCardClick();
                    }
                  }}
                >
                  {/* Big Card Image */}
                  <div className="service-card-media">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`service-card-img ${item.id === 'airport' ? 'airport-card-img' : ''}`}
                    />
                    <div className="service-card-overlay-gradient" />
                  </div>

                  <div className="service-card-content">
                    <h3 className="service-card-heading">{item.title}</h3>
                    <p className="service-card-paragraph">{item.description}</p>

                    <div className="service-card-action">
                      <span className="service-circle-arrow">
                        <ArrowRight size={14} color="#4E0401" />
                      </span>
                      <span className="service-action-label">Book Chauffeur</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation Indicators (Pill Dots) */}
            <div className="services-dots-indicator-row">
              {SERVICES.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`srv-dot ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .services-reference-section {
          background: #FEFBF3;
          padding: 90px 0 100px 0;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          overflow: hidden;
        }

        .services-reference-layout {
          display: grid;
          grid-template-columns: 350px 1fr;
          gap: 46px;
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
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin-bottom: 20px;
          text-rendering: optimizeLegibility;
        }

        .services-lead-desc {
          font-size: 1.02rem;
          color: #5A4E4D;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .services-desktop-controls-row {
          display: flex;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-explore-services {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.18);
          color: #4E0401;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 13px 24px;
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

        .services-nav-arrows {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .srv-arrow-btn {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.16);
          color: #4E0401;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .srv-arrow-btn:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
          transform: scale(1.05);
        }

        /* Right Carousel Viewport */
        .services-cards-carousel-wrapper {
          position: relative;
          width: 100%;
          min-width: 0;
        }

        .services-cards-carousel {
          display: flex;
          gap: 22px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 8px 4px 18px 4px;
        }

        .services-cards-carousel::-webkit-scrollbar {
          display: none;
        }

        .service-editorial-card {
          flex: 0 0 calc(50% - 11px);
          min-width: 310px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.10);
          border-radius: 20px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          cursor: pointer;
          box-shadow: 0 8px 24px rgba(78, 4, 1, 0.06);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
          scroll-snap-align: start;
        }

        .service-editorial-card:hover {
          transform: translateY(-6px);
          border-color: #E88C2B;
          box-shadow: 0 20px 40px -10px rgba(78, 4, 1, 0.16);
        }

        /* Big Card Image */
        .service-card-media {
          position: relative;
          width: 100%;
          height: 250px;
          overflow: hidden;
          background: #F9F5EC;
        }

        .service-card-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .airport-card-img {
          object-position: center 25%;
        }

        .service-editorial-card:hover .service-card-img {
          transform: scale(1.06);
        }

        .service-card-overlay-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0) 60%, rgba(0, 0, 0, 0.25) 100%);
          pointer-events: none;
        }

        .service-card-content {
          padding: 22px 22px 24px 22px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }

        .service-card-heading {
          font-family: var(--font-heading);
          font-size: 1.28rem;
          font-weight: 800;
          color: #4E0401;
          margin: 0 0 10px 0;
          line-height: 1.25;
          text-rendering: optimizeLegibility;
        }

        .service-card-paragraph {
          font-size: 0.90rem;
          color: #5A4E4D;
          line-height: 1.5;
          margin-bottom: 20px;
          flex-grow: 1;
        }

        .service-card-action {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .service-circle-arrow {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
          flex-shrink: 0;
        }

        .service-action-label {
          font-size: 0.80rem;
          font-weight: 800;
          letter-spacing: 0.05em;
          text-transform: uppercase;
          color: #4E0401;
          transition: color 0.18s ease;
        }

        .service-editorial-card:hover .service-circle-arrow {
          background: #E88C2B;
          border-color: #E88C2B;
          transform: translateX(4px);
        }

        .service-editorial-card:hover .service-circle-arrow svg {
          stroke: #FFFFFF;
        }

        .service-editorial-card:hover .service-action-label {
          color: #E88C2B;
        }

        /* Dots Indicator */
        .services-dots-indicator-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
        }

        .srv-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          border: none;
          background: rgba(78, 4, 1, 0.2);
          padding: 0;
          cursor: pointer;
          touch-action: manipulation;
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .srv-dot.active {
          width: 24px;
          border-radius: 9999px;
          background: #E88C2B;
          box-shadow: 0 2px 8px rgba(232, 140, 43, 0.45);
        }

        .desktop-services-title {
          display: block;
        }

        .mobile-services-title {
          display: none;
        }

        @media (max-width: 1080px) {
          .services-reference-layout {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .services-left-intro {
            max-width: 600px;
          }
          .service-editorial-card {
            flex: 0 0 calc(50% - 10px);
          }
        }

        /* Strictly Mobile (<= 768px) */
        @media (max-width: 768px) {
          .services-reference-section {
            padding: 55px 0 65px 0;
          }

          .desktop-services-title {
            display: none;
          }

          .mobile-services-title {
            display: block;
            font-family: var(--font-heading);
            font-size: 2.1rem;
            font-weight: 900;
            color: #4E0401;
            line-height: 1.15;
            margin-bottom: 10px;
          }

          .services-desktop-controls-row {
            display: none;
          }

          .service-editorial-card {
            flex: 0 0 86%;
            min-width: 86%;
            max-width: 86%;
            scroll-snap-align: center;
          }

          .service-card-media {
            height: 220px;
          }

          .service-card-content {
            padding: 18px;
          }

          .service-card-heading {
            font-size: 1.16rem;
          }
        }
      `}</style>
    </section>
  );
}
