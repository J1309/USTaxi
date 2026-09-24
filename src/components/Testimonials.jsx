import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const REVIEWS = [
  {
    quote: 'Excellent service! On time, professional and very comfortable. Highly recommend Lavender Taxi Service for airport transfers in Houston.',
    author: 'Michael R.',
    location: 'Houston, TX',
  },
  {
    quote: 'Booked the Chevrolet Suburban for our family cruise departure to Galveston. The chauffeur was early, loaded all 6 heavy bags, and made the ride completely stress-free.',
    author: 'Sarah & David L.',
    location: 'Katy, TX',
  },
  {
    quote: 'As a frequent corporate traveler arriving late at IAH, having Lavender Taxi track my flight and be waiting curbside is unmatched. The Lexus was spotless.',
    author: 'Robert K.',
    location: 'Chicago, IL',
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? REVIEWS.length - 1 : i - 1));
  const next = () => setIndex((i) => (i === REVIEWS.length - 1 ? 0 : i + 1));

  const current = REVIEWS[index];

  return (
    <section className="section-spacing testimonials-clean-section">
      <div className="container">
        <div className="testimonial-split-layout">
          {/* Left Title: Strictly Left-Aligned */}
          <div className="testimonial-header-left">
            <span className="section-tag-small">WHAT OUR CLIENTS SAY</span>
            <h2 className="section-title-large">Trusted by Travelers</h2>
            <p className="section-desc-sub">Real experiences. Happy journeys.</p>
          </div>

          {/* Right Quote Box */}
          <div className="testimonial-quote-card">
            <div className="stars-and-arrows-row">
              <div className="testimonial-stars-5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={18} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>

              <div className="testimonial-arrows">
                <button type="button" onClick={prev} className="test-arrow-btn" aria-label="Previous">
                  <ChevronLeft size={18} />
                </button>
                <button type="button" onClick={next} className="test-arrow-btn" aria-label="Next">
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <blockquote className="testimonial-text-quote">
              "{current.quote}"
            </blockquote>

            <div className="testimonial-author-box">
              <span className="author-name-bold">— {current.author}</span>
              <span className="author-city-muted">{current.location}</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .testimonials-clean-section {
          background: #FFFFFF;
          border-top: 1px solid #E2E8F0;
        }
        .testimonial-split-layout {
          display: grid;
          grid-template-columns: 420px 1fr;
          gap: 48px;
          align-items: center;
        }
        .testimonial-header-left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
        }
        .testimonial-quote-card {
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
          border-radius: 16px;
          padding: 32px 36px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          gap: 14px;
          box-shadow: var(--shadow-sm);
        }
        .stars-and-arrows-row {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .testimonial-stars-5 {
          display: flex;
          gap: 4px;
        }
        .testimonial-arrows {
          display: flex;
          gap: 6px;
        }
        .test-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #334155;
        }
        .test-arrow-btn:hover {
          background: #0284C7;
          border-color: #0284C7;
          color: #FFFFFF;
        }
        .testimonial-text-quote {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          color: #1E293B;
          line-height: 1.6;
          font-style: italic;
          text-align: left;
        }
        .testimonial-author-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          margin-top: 4px;
        }
        .author-name-bold {
          font-weight: 700;
          font-size: 0.95rem;
          color: #0F172A;
          text-align: left;
        }
        .author-city-muted {
          font-size: 0.8rem;
          color: #64748B;
          text-align: left;
        }

        @media (max-width: 900px) {
          .testimonial-split-layout {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .testimonial-quote-card {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
