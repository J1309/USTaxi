import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';

const SERVICES = [
  {
    id: 'airport',
    number: '01',
    title: 'Airport Transfer',
    categoryTag: 'IAH & Hobby VIP',
    image: '/images/owner_suburban_airport.jpg',
    description: 'Seamless pickups and drop-offs at IAH Bush and William P. Hobby Airport with live flight tracking.',
    perks: ['Live Flight Tracking', 'Curbside Meet & Greet', 'Guaranteed Flat Rates'],
  },
  {
    id: 'nasa',
    number: '02',
    title: 'NASA Space Center',
    categoryTag: 'Houston Iconic Tour',
    image: '/images/service_nasa.jpg',
    description: 'Direct VIP private transfers to Space Center Houston & NASA Johnson Space Center with flexible wait times.',
    perks: ['Space Center VIP Curbside', 'Saturn V & Shuttle Tours', 'Wait-and-Return Options'],
  },
  {
    id: 'cruise',
    number: '03',
    title: 'Galveston Cruise Port',
    categoryTag: 'Terminal Express',
    image: '/images/dest_galveston_pier.png',
    description: 'Direct non-stop private transfers to Royal Caribbean & Carnival cruise berths with massive luggage room.',
    perks: ['Direct Pier 25 & 10 Access', 'Massive Luggage Capacity', 'IAH/Hobby Flight Sync'],
  },
  {
    id: 'corporate',
    number: '04',
    title: 'Corporate Travel',
    categoryTag: 'Executive Black Car',
    image: '/images/service_corporate.jpg',
    description: 'Professional and discreet executive transport for business summits, roadshows, and board meetings.',
    perks: ['Discreet Executive Chauffeurs', 'Hourly & Multi-Stop Charters', 'Corporate Account Billing'],
  },
  {
    id: 'city',
    number: '05',
    title: 'City Rides & Chauffeur',
    categoryTag: 'Metropolitan Luxury',
    image: '/images/destination_houston.jpg',
    description: 'Comfortable and stylish private travel across Downtown Houston, Galleria, Memorial, and River Oaks.',
    perks: ['Downtown, Galleria & River Oaks', 'Point-to-Point Precision', '24/7 On-Demand Chauffeur'],
  },
  {
    id: 'events',
    number: '06',
    title: 'VIP Stadium & Arena',
    categoryTag: 'Priority Access',
    image: '/images/dest_nrg_stadium.png',
    description: 'Priority drop-offs and express egress for Houston Texans games, RodeoHouston, and arena concerts.',
    perks: ['NRG Stadium & Toyota Center', 'Priority Egress Routing', 'Concert & Game Charters'],
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
    }, 4000);
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
          {/* Left Column: Headlines & Controls */}
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
              From airport transfers and NASA space center tours to cruise ports and executive charters, experience Houston chauffeur travel tailored to your schedule.
            </p>

            <div className="services-desktop-controls-row">
              <button
                type="button"
                onClick={handleExploreClick}
                className="btn-explore-services"
              >
                <span>EXPLORE FLEET</span>
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

          {/* Right Column: Full-Bleed Image Tabs with Smooth Hover Pop-Up */}
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
                  {/* Full-Bleed Photographic Canvas */}
                  <div className="service-card-media-canvas">
                    <img
                      src={item.image}
                      alt={item.title}
                      className={`service-card-img ${item.id === 'airport' ? 'airport-card-img' : ''}`}
                      loading="lazy"
                    />
                    <div className="service-card-ambient-gradient" />
                    
                    {/* Architectural Top Tag */}
                    <div className="service-card-top-tag">
                      <span className="service-index-pill">{item.number}</span>
                      <span className="service-category-tag">{item.categoryTag}</span>
                    </div>

                    {/* Smooth Pop-Up / Slide-Up Info Glass Plate */}
                    <div className="service-card-pop-plate">
                      {/* Rest State Header: Thick Title & Expand Cue */}
                      <div className="service-plate-header">
                        <h3 className="service-plate-title">{item.title}</h3>
                        <div className="service-plate-cue">
                          <span className="cue-label">DETAILS</span>
                          <span className="cue-arrow-box">
                            <ArrowRight size={13} />
                          </span>
                        </div>
                      </div>

                      {/* Pop-Up Details Body - Expands Smoothly on Hover */}
                      <div className="service-plate-expand-body">
                        <div className="service-plate-expand-inner">
                          <p className="service-plate-desc">{item.description}</p>
                          
                          <div className="service-plate-perks">
                            {item.perks.map((perk, pIdx) => (
                              <div key={pIdx} className="service-perk-row">
                                <span className="service-perk-dot" />
                                <span className="service-perk-text">{perk}</span>
                              </div>
                            ))}
                          </div>

                          <div className="service-plate-action">
                            <div className="service-book-action-btn">
                              <span>BOOK CHAUFFEUR</span>
                              <ArrowRight size={14} className="action-arrow-icon" />
                            </div>
                          </div>
                        </div>
                      </div>
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
                  aria-label={`Go to service ${idx + 1}`}
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

        /* Immersive Photo Card with Smooth Hover Pop-up */
        .service-editorial-card {
          flex: 0 0 calc(50% - 11px);
          min-width: 320px;
          height: 480px;
          background: #0E0308;
          border: 1.5px solid rgba(78, 4, 1, 0.12);
          border-radius: 20px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(78, 4, 1, 0.08);
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow 0.4s ease,
                      border-color 0.3s ease;
          text-align: left;
          scroll-snap-align: start;
          position: relative;
        }

        .service-editorial-card:hover {
          transform: translateY(-8px);
          border-color: #E88C2B;
          box-shadow: 0 24px 50px -10px rgba(78, 4, 1, 0.22);
        }

        .service-card-media-canvas {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
        }

        .service-card-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1),
                      filter 0.45s ease;
        }

        .airport-card-img {
          object-position: center 25%;
        }

        .service-editorial-card:hover .service-card-img {
          transform: scale(1.08);
          filter: brightness(0.92);
        }

        .service-card-ambient-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(14, 3, 10, 0.40) 0%,
            rgba(14, 3, 10, 0.05) 30%,
            rgba(14, 3, 10, 0.50) 65%,
            rgba(14, 3, 10, 0.95) 100%
          );
          pointer-events: none;
          transition: opacity 0.3s ease;
        }

        /* Unboxed Top Label Tag */
        .service-card-top-tag {
          position: absolute;
          top: 16px;
          left: 16px;
          z-index: 3;
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(14, 3, 16, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(255, 255, 255, 0.14);
          padding: 5px 12px;
          border-radius: 8px;
        }

        .service-index-pill {
          font-size: 0.75rem;
          font-weight: 900;
          color: #E88C2B;
          letter-spacing: 0.05em;
        }

        .service-category-tag {
          font-size: 0.70rem;
          font-weight: 800;
          letter-spacing: 0.10em;
          color: rgba(255, 255, 255, 0.92);
          text-transform: uppercase;
        }

        /* Creative Smooth Hover Pop-up Plate */
        .service-card-pop-plate {
          position: absolute;
          left: 14px;
          right: 14px;
          bottom: 14px;
          z-index: 4;
          background: rgba(18, 4, 14, 0.88);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 16px;
          padding: 18px 20px;
          color: #FFFFFF;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-editorial-card:hover .service-card-pop-plate {
          background: rgba(14, 3, 12, 0.95);
          border-color: rgba(232, 140, 43, 0.45);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.6);
        }

        .service-plate-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
        }

        .service-plate-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 900;
          color: #FFFFFF;
          margin: 0;
          letter-spacing: -0.01em;
          line-height: 1.2;
        }

        .service-plate-cue {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          flex-shrink: 0;
        }

        .cue-label {
          font-size: 0.68rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #E88C2B;
          transition: color 0.2s ease;
        }

        .cue-arrow-box {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .service-editorial-card:hover .cue-arrow-box {
          background: #E88C2B;
          transform: rotate(90deg);
        }

        /* CSS Grid Smooth Reveal for Description & Perks */
        .service-plate-expand-body {
          display: grid;
          grid-template-rows: 0fr;
          opacity: 0;
          transition: grid-template-rows 0.45s cubic-bezier(0.16, 1, 0.3, 1),
                      opacity 0.35s ease;
        }

        .service-editorial-card:hover .service-plate-expand-body {
          grid-template-rows: 1fr;
          opacity: 1;
        }

        .service-plate-expand-inner {
          overflow: hidden;
        }

        .service-plate-desc {
          font-size: 0.88rem;
          color: rgba(255, 255, 255, 0.85);
          line-height: 1.5;
          margin: 14px 0 12px 0;
        }

        .service-plate-perks {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }

        .service-perk-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .service-perk-dot {
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #E88C2B;
          flex-shrink: 0;
        }

        .service-perk-text {
          font-size: 0.80rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.90);
          line-height: 1.35;
        }

        .service-plate-action {
          padding-top: 6px;
        }

        .service-book-action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          width: 100%;
          background: #E88C2B;
          color: #FFFFFF;
          font-size: 0.82rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          padding: 10px 18px;
          border-radius: 10px;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 14px rgba(232, 140, 43, 0.35);
        }

        .service-editorial-card:hover .service-book-action-btn {
          background: #D2791C;
        }

        .action-arrow-icon {
          transition: transform 0.25s ease;
        }

        .service-editorial-card:hover .action-arrow-icon {
          transform: translateX(4px);
        }

        /* Dots Indicator */
        .services-dots-indicator-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 18px;
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
            height: 440px;
            scroll-snap-align: center;
          }

          /* On touch mobile, show the body cleanly so mobile users don't need hover */
          .service-plate-expand-body {
            grid-template-rows: 1fr;
            opacity: 1;
          }

          .service-plate-desc {
            font-size: 0.84rem;
            margin: 10px 0 8px 0;
          }

          .service-plate-perks {
            margin-bottom: 12px;
            gap: 4px;
          }

          .service-card-pop-plate {
            padding: 14px 16px;
            background: rgba(14, 3, 12, 0.92);
          }

          .cue-label {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
