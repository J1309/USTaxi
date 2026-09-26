import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronRight, ArrowRight, MessageCircle } from 'lucide-react';
import AboutSection from '../components/AboutSection';
import { getDirectWhatsAppOwnerUrl } from '../utils/whatsapp';
import { smoothScrollTo } from '../hooks/useLenis';

export default function AboutPage() {
  const navigate = useNavigate();

  const handleBookClick = () => {
    navigate('/#booking-engine');
    setTimeout(() => {
      smoothScrollTo('#booking-engine');
    }, 150);
  };

  return (
    <div className="about-page-view">
      {/* Top Breadcrumb */}
      <section className="about-breadcrumb-bar">
        <div className="container">
          <nav className="about-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <ChevronRight size={14} color="#94A3B8" />
            <span className="breadcrumb-current">About Us</span>
          </nav>
        </div>
      </section>

      {/* Main Luxury About Section */}
      <AboutSection />

      {/* Bottom Callout Banner */}
      <section className="about-bottom-cta">
        <div className="container">
          <div className="about-cta-card reveal-on-scroll">
            <div className="about-cta-text">
              <span className="cta-kicker">PERSONALIZED CHAUFFEUR DISPATCH</span>
              <h3>Have an upcoming flight or private trip in Houston?</h3>
              <p>Speak directly with owner Symanthan to reserve your Chevrolet Suburban High Country or Lexus Luxury Sedan today.</p>
            </div>
            <div className="about-cta-actions">
              <button
                type="button"
                onClick={handleBookClick}
                className="btn-cta-gold"
              >
                <span>Reserve Your Ride</span>
                <ArrowRight size={16} />
              </button>
              <a
                href={getDirectWhatsAppOwnerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-whatsapp-pill"
              >
                <MessageCircle size={17} />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        .about-page-view {
          background: #FEFBF3;
        }

        .about-breadcrumb-bar {
          background: #F9F5EC;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          padding: 14px 0;
        }

        .about-breadcrumb {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
        }

        .breadcrumb-link {
          color: #786C6A;
          transition: color 0.15s ease;
        }

        .breadcrumb-link:hover {
          color: #E88C2B;
        }

        .breadcrumb-current {
          color: #4E0401;
          font-weight: 700;
        }

        .about-bottom-cta {
          padding: 70px 0 90px 0;
          background: #FEFBF3;
          border-top: 1px solid rgba(78, 4, 1, 0.08);
        }

        .about-cta-card {
          background: #4E0401;
          background: linear-gradient(135deg, #4E0401 0%, #350200 60%, #200100 100%);
          border-radius: 20px;
          padding: 44px 48px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          box-shadow: 0 16px 36px -10px rgba(78, 4, 1, 0.25);
          text-align: left;
        }

        .cta-kicker {
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.14em;
          color: #E88C2B;
          display: block;
          margin-bottom: 6px;
        }

        .about-cta-text h3 {
          font-family: var(--font-heading);
          font-size: clamp(1.55rem, 2.4vw, 2.1rem);
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 8px;
          -webkit-text-stroke: 0.42px currentColor;
          text-rendering: optimizeLegibility;
        }

        .about-cta-text p {
          font-size: 0.96rem;
          color: #CBD5E1;
          max-width: 600px;
          line-height: 1.55;
        }

        .about-cta-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        @media (max-width: 900px) {
          .about-cta-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 32px 24px;
          }
          .about-cta-actions {
            width: 100%;
          }
          .about-cta-actions button,
          .about-cta-actions a {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
