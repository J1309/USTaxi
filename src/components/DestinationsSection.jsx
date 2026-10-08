import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { openBooking } from '../utils/bookingModal';

const DESTINATIONS = [
  {
    id: 'airports',
    title: 'Houston Airports',
    subtitle: 'IAH Bush Intercontinental & William P. Hobby (HOU)',
    kicker: 'AIRPORT TRANSFERS',
    image: '/images/owner_suburban_airport.jpg',
  },
  {
    id: 'business',
    title: 'Business Districts',
    subtitle: 'Downtown Core, Uptown Galleria & Greenway Plaza',
    kicker: 'CORPORATE CORRIDORS',
    image: '/images/dest_houston_skyline.jpg',
  },
  {
    id: 'hotels',
    title: 'Hotels & Medical Hubs',
    subtitle: 'Texas Medical Center, Post Oak Hotel & River Oaks',
    kicker: 'LUXURY & HEALTHCARE',
    image: '/images/service_corporate.jpg',
  },
  {
    id: 'cruises',
    title: 'Galveston Cruise Port',
    subtitle: 'Terminal 10 & 25, Historic Pleasure Pier & Seawall',
    kicker: 'CRUISE TERMINALS',
    image: '/images/dest_galveston_pier.png',
  },
  {
    id: 'stadiums',
    title: 'NRG Stadium & Arena',
    subtitle: 'Texans Games, RodeoHouston & World-Class Concerts',
    kicker: 'SPORTS & CONCERTS',
    image: '/images/dest_nrg_stadium.png',
  },
];

export default function DestinationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const carouselRef = useRef(null);

  const scrollToCard = useCallback((index) => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const cards = container.querySelectorAll('.destination-vertical-card');
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

  const nextDestination = useCallback(() => {
    const nextIdx = (activeIndex + 1) % DESTINATIONS.length;
    scrollToCard(nextIdx);
  }, [activeIndex, scrollToCard]);

  const prevDestination = useCallback(() => {
    const prevIdx = (activeIndex - 1 + DESTINATIONS.length) % DESTINATIONS.length;
    scrollToCard(prevIdx);
  }, [activeIndex, scrollToCard]);

  // Automatic slide progression one by one
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextDestination();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextDestination]);

  const handleScroll = () => {
    if (!carouselRef.current) return;
    const container = carouselRef.current;
    const scrollLeft = container.scrollLeft;
    const cards = container.querySelectorAll('.destination-vertical-card');
    if (!cards.length) return;
    const cardWidth = cards[0].offsetWidth + 18;
    const newIdx = Math.round(scrollLeft / cardWidth);
    if (newIdx >= 0 && newIdx < DESTINATIONS.length && newIdx !== activeIndex) {
      setActiveIndex(newIdx);
    }
  };

  const handleDestinationClick = () => {
    openBooking('suburban');
  };

  return (
    <section id="destinations" className="destinations-bright-section">
      <div className="destinations-ambient-glow" />

      <div className="container destinations-container">
        {/* Main Grid: Left Info & Right Auto-Moving Large Cards */}
        <div className="destinations-layout-grid">
          
          {/* Left Column: Heading, Subtext & Navigation Buttons */}
          <div className="destinations-left-block reveal-on-scroll">
            <h2 className="destinations-headline">
              EXPLORE<br />
              THE CITY<br />
              <span className="orange-accent">IN COMFORT</span>
            </h2>

            <p className="destinations-sub-text">
              Direct point-to-point luxury transfers across Greater Houston, Texas Medical Center, and Galveston Island with zero surge pricing and guaranteed punctuality.
            </p>

            <div className="destinations-actions-row">
              <button
                type="button"
                onClick={handleDestinationClick}
                className="btn-view-destinations"
              >
                <span>BOOK A DESTINATION</span>
                <ArrowRight size={15} />
              </button>

              {/* Slider Arrows */}
              <div className="dest-nav-arrows">
                <button
                  type="button"
                  onClick={prevDestination}
                  className="dest-arrow-btn"
                  aria-label="Previous destination"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={nextDestination}
                  className="dest-arrow-btn"
                  aria-label="Next destination"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Bigger Destination Cards Moving Automatically One by One */}
          <div 
            className="destinations-carousel-wrapper"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <div 
              className="destinations-carousel-track"
              ref={carouselRef}
              onScroll={handleScroll}
            >
              {DESTINATIONS.map((d, idx) => (
                <div
                  key={d.id}
                  className={`destination-vertical-card ${activeIndex === idx ? 'active-dest-card' : ''}`}
                  onClick={handleDestinationClick}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleDestinationClick();
                    }
                  }}
                >
                  {/* Big Card Image */}
                  <img
                    src={d.image}
                    alt={d.title}
                    className="dest-card-bg-img"
                  />

                  {/* Gradient Overlay for Crisp Text Readability */}
                  <div className="dest-card-gradient-overlay" />

                  {/* Bottom Text Content & Action Button */}
                  <div className="dest-card-label-box">
                    <h3 className="dest-card-title">{d.title}</h3>
                    <p className="dest-card-sub">{d.subtitle}</p>
                    
                    <div className="dest-card-footer-cta">
                      <span className="dest-reserve-text">RESERVE CHAUFFEUR</span>
                      <span className="dest-circle-arrow">
                        <ArrowRight size={13} strokeWidth={2.4} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Dots */}
            <div className="destinations-dots-row">
              {DESTINATIONS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`dest-dot ${activeIndex === idx ? 'active' : ''}`}
                  onClick={() => scrollToCard(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

        </div>
      </div>

      <style>{`
        /* Bright Luxury Aesthetic Background */
        .destinations-bright-section {
          position: relative;
          background: #FFFFFF;
          background: linear-gradient(180deg, #FFFFFF 0%, #FAF6EE 50%, #FFFFFF 100%);
          padding: 95px 0 105px 0;
          overflow: hidden;
          color: #1E293B;
          border-top: 1px solid rgba(78, 4, 1, 0.08);
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
        }

        .destinations-ambient-glow {
          position: absolute;
          top: -10%;
          right: 5%;
          width: 550px;
          height: 550px;
          background: radial-gradient(circle, rgba(232, 140, 43, 0.09) 0%, rgba(255, 255, 255, 0) 70%);
          pointer-events: none;
          z-index: 1;
        }

        .destinations-container {
          position: relative;
          z-index: 2;
        }

        .destinations-layout-grid {
          display: grid;
          grid-template-columns: 360px 1fr;
          gap: 48px;
          align-items: center;
        }

        /* Left Column */
        .destinations-left-block {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .destinations-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.5rem, 3.8vw, 3.4rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.08;
          letter-spacing: -0.02em;
          margin: 0 0 18px 0;
          text-rendering: optimizeLegibility;
        }

        .destinations-headline .orange-accent {
          color: #E88C2B;
        }

        .destinations-sub-text {
          font-size: 1.02rem;
          color: #5A4E4D;
          line-height: 1.6;
          margin-bottom: 32px;
          max-width: 350px;
        }

        .destinations-actions-row {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .btn-view-destinations {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.85rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          padding: 13px 26px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          box-shadow: 0 4px 18px rgba(232, 140, 43, 0.35);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-view-destinations:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 140, 43, 0.45);
        }

        .dest-nav-arrows {
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }

        .dest-arrow-btn {
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

        .dest-arrow-btn:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
          transform: scale(1.05);
        }

        /* Right Carousel Viewport */
        .destinations-carousel-wrapper {
          position: relative;
          width: 100%;
          min-width: 0;
        }

        .destinations-carousel-track {
          display: flex;
          gap: 20px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
          padding: 10px 4px 20px 4px;
        }

        .destinations-carousel-track::-webkit-scrollbar {
          display: none;
        }

        /* Bigger Destination Cards */
        .destination-vertical-card {
          position: relative;
          flex: 0 0 310px;
          height: 410px;
          border-radius: 22px;
          overflow: hidden;
          cursor: pointer;
          border: 1.5px solid rgba(78, 4, 1, 0.12);
          box-shadow: 0 12px 30px rgba(0, 0, 0, 0.10);
          transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
          scroll-snap-align: start;
          text-align: left;
          background: #110518;
        }

        .destination-vertical-card:hover {
          transform: translateY(-8px);
          border-color: #E88C2B;
          box-shadow: 0 20px 45px rgba(232, 140, 43, 0.22);
        }

        .dest-card-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .destination-vertical-card:hover .dest-card-bg-img {
          transform: scale(1.08);
        }

        /* Gradient Overlay for Readability */
        .dest-card-gradient-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(0, 0, 0, 0.45) 0%,
            rgba(0, 0, 0, 0.10) 30%,
            rgba(14, 3, 20, 0.70) 65%,
            rgba(14, 3, 20, 0.95) 100%
          );
          transition: background 0.3s ease;
        }

        /* Bottom Text Details */
        .dest-card-label-box {
          position: absolute;
          bottom: 20px;
          left: 18px;
          right: 18px;
          z-index: 3;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .dest-card-title {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.2;
          margin: 0;
          text-rendering: optimizeLegibility;
        }

        .dest-card-sub {
          font-size: 0.82rem;
          color: #CBD5E1;
          line-height: 1.4;
          margin: 0;
        }

        .dest-card-footer-cta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 10px;
          padding-top: 10px;
          border-top: 1px solid rgba(255, 255, 255, 0.14);
        }

        .dest-reserve-text {
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #E88C2B;
          text-transform: uppercase;
        }

        .dest-circle-arrow {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #E88C2B;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.2s ease;
        }

        .destination-vertical-card:hover .dest-circle-arrow {
          transform: translateX(4px);
        }

        /* Dots */
        .destinations-dots-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 14px;
        }

        .dest-dot {
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

        .dest-dot.active {
          width: 24px;
          border-radius: 9999px;
          background: #E88C2B;
          box-shadow: 0 2px 8px rgba(232, 140, 43, 0.45);
        }

        @media (max-width: 1080px) {
          .destinations-layout-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .destinations-left-block {
            max-width: 600px;
          }
          .destination-vertical-card {
            flex: 0 0 290px;
          }
        }

        /* Strictly Mobile (<= 768px) */
        @media (max-width: 768px) {
          .destinations-bright-section {
            padding: 60px 0 70px 0;
          }

          .destinations-actions-row {
            display: none;
          }

          .destinations-headline {
            font-size: clamp(2rem, 7.8vw, 2.6rem);
            margin-bottom: 12px;
          }

          .destinations-sub-text {
            font-size: 0.94rem;
            margin-bottom: 20px;
          }

          .destination-vertical-card {
            flex: 0 0 84vw;
            min-width: 84vw;
            max-width: 84vw;
            height: 360px;
            scroll-snap-align: center;
          }

          .dest-card-title {
            font-size: 1.18rem;
          }

          .dest-card-sub {
            font-size: 0.80rem;
          }
        }
      `}</style>
    </section>
  );
}
