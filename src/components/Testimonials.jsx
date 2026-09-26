import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const REVIEWS = [
  {
    quote:
      'Exceptional service! The driver was professional, punctual, and the Suburban was in pristine condition. Truly a premium experience for our IAH flight.',
    author: 'Sarah Mitchell',
    role: 'Corporate Executive',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80',
  },
  {
    quote:
      'Booked the Chevrolet Suburban for our family cruise departure to Galveston with 6 heavy bags and a toddler car seat. Symanthan was early and courteous. Absolute perfection.',
    author: 'David & Emily Lawson',
    role: 'Family Vacationers',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
  },
  {
    quote:
      'As a frequent corporate traveler arriving late at Hobby Airport, having Lavender Taxi track my flight and be waiting at the curb with zero surge pricing is unbeatable.',
    author: 'Robert Kensington',
    role: 'Managing Director, Energy Group',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? REVIEWS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === REVIEWS.length - 1 ? 0 : i + 1));

  const current = REVIEWS[index];

  return (
    <section className="testimonials-reference-section">
      <div className="container">
        <div className="testimonials-trio-grid">
          {/* Column 1: Left Title & Carousel Controls */}
          <div className="test-col-title-block">
            <span className="test-kicker">CLIENT TESTIMONIALS</span>
            <h2 className="test-headline">
              TRUSTED BY<br />
              TRAVELERS<br />
              WORLDWIDE
            </h2>

            <div className="test-arrows-row">
              <button
                type="button"
                onClick={prev}
                className="test-circle-nav-btn"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={next}
                className="test-circle-nav-btn"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Column 2: Center Big Gold Quote & Details */}
          <div className="test-col-quote-card">
            <div className="gold-quote-glyph">“</div>

            <blockquote className="test-lead-quote">
              {current.quote}
            </blockquote>

            <div className="test-author-info">
              <img
                src={current.avatar}
                alt={current.author}
                className="author-avatar-img"
              />
              <div className="author-text-meta">
                <span className="author-name">{current.author}</span>
                <span className="author-role">{current.role}</span>
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="test-dots-row">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setIndex(idx)}
                  className={`dot-pill ${index === idx ? 'active' : ''}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Column 3: Atmospheric Street Scene Photo with Quote Overlay */}
          <div className="test-col-scenic-card">
            <img
              src="/images/luxury_streetlamp_dusk.jpg"
              alt="Luxury city street with glowing lanterns at dusk"
              className="scenic-bg-img"
            />
            <div className="scenic-dark-overlay" />
            <div className="scenic-overlay-quote">
              <p className="scenic-quote-text">
                "More than a ride, a better way to travel."
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-reference-section {
          background: #FEFBF3;
          padding: 95px 0 105px 0;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
        }

        .testimonials-trio-grid {
          display: grid;
          grid-template-columns: 320px 1fr 340px;
          gap: 36px;
          align-items: center;
        }

        /* Column 1: Left Title */
        .test-col-title-block {
          text-align: left;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .test-kicker {
          font-size: 0.8rem;
          font-weight: 800;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: #E88C2B;
          margin-bottom: 12px;
          display: block;
        }

        .test-headline {
          font-family: var(--font-heading);
          font-size: clamp(2.4rem, 3.5vw, 3.2rem);
          font-weight: 900;
          color: #4E0401;
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 24px 0;
          -webkit-text-stroke: 0.45px currentColor;
          text-rendering: optimizeLegibility;
        }

        .test-arrows-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .test-circle-nav-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4E0401;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .test-circle-nav-btn:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
        }

        /* Column 2: Center Card */
        .test-col-quote-card {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 20px;
          padding: 38px 40px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          box-shadow: 0 8px 28px rgba(78, 4, 1, 0.04);
          position: relative;
        }

        .gold-quote-glyph {
          font-family: var(--font-heading);
          font-size: 3.8rem;
          line-height: 0.8;
          color: #E88C2B;
          margin-bottom: 16px;
        }

        .test-lead-quote {
          font-size: 1.05rem;
          color: #4A3E3D;
          line-height: 1.65;
          font-style: italic;
          margin-bottom: 24px;
        }

        .test-author-info {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 20px;
        }

        .author-avatar-img {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          object-fit: cover;
          border: 2px solid #E88C2B;
        }

        .author-text-meta {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .author-name {
          font-family: inherit;
          font-weight: 800;
          font-size: 0.94rem;
          color: #4E0401;
        }

        .author-role {
          font-size: 0.78rem;
          color: #786C6A;
        }

        .test-dots-row {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .dot-pill {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #EFE8DC;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          padding: 0;
        }

        .dot-pill.active {
          width: 22px;
          border-radius: 6px;
          background: #E88C2B;
        }

        /* Column 3: Scenic Atmospheric Image */
        .test-col-scenic-card {
          position: relative;
          height: 380px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 12px 30px rgba(78, 4, 1, 0.12);
          border: 1px solid rgba(78, 4, 1, 0.08);
        }

        .scenic-bg-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .scenic-dark-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(78, 4, 1, 0.2) 0%,
            rgba(53, 2, 0, 0.6) 60%,
            rgba(32, 1, 0, 0.92) 100%
          );
        }

        .scenic-overlay-quote {
          position: absolute;
          bottom: 24px;
          left: 20px;
          right: 20px;
          z-index: 2;
          text-align: left;
        }

        .scenic-quote-text {
          font-family: var(--font-heading);
          font-size: 1.32rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.3;
          margin: 0;
          letter-spacing: -0.01em;
          -webkit-text-stroke: 0.35px currentColor;
        }

        @media (max-width: 1100px) {
          .testimonials-trio-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .test-col-scenic-card {
            height: 240px;
          }
        }
      `}</style>
    </section>
  );
}
