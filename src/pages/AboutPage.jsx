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
            <Link to="/" className="breadcrumb-link">HOME</Link>
            <ChevronRight size={13} color="#8C7B79" strokeWidth={2.4} />
            <span className="breadcrumb-current">ABOUT US</span>
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
              <h3 className="cta-title-thick">Have an upcoming flight or private trip in Houston?</h3>
              <p className="cta-description">Speak directly with owner Symanthan to reserve your Chevrolet Suburban or Lexus Luxury Sedan today.</p>
            </div>
            <div className="about-cta-actions">
              <button
                type="button"
                onClick={handleBookClick}
                className="btn-cta-reserve"
              >
                <span>RESERVE YOUR RIDE</span>
                <ArrowRight size={16} strokeWidth={2.4} />
              </button>
              <a
                href={getDirectWhatsAppOwnerUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta-whatsapp"
              >
                <MessageCircle size={17} strokeWidth={2.2} />
                <span>CHAT ON WHATSAPP</span>
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
          padding: 16px 0;
        }

        .about-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.78rem;
          font-weight: 800;
          letter-spacing: 0.12em;
        }

        .breadcrumb-link {
          color: #786C6A;
          text-decoration: none;
          transition: color 0.15s ease;
        }

        .breadcrumb-link:hover {
          color: #E88C2B;
        }

        .breadcrumb-current {
          color: #4E0401;
        }

        .about-bottom-cta {
          padding: 80px 0 100px 0;
          background: #FEFBF3;
          border-top: 1px solid rgba(78, 4, 1, 0.08);
        }

        .about-cta-card {
          background: #4E0401;
          background: linear-gradient(135deg, #4E0401 0%, #350200 60%, #200100 100%);
          border-radius: 20px;
          padding: 48px 52px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 36px;
          box-shadow: 0 16px 40px rgba(78, 4, 1, 0.25);
          text-align: left;
        }

        .cta-kicker {
          font-size: 0.74rem;
          font-weight: 900;
          letter-spacing: 0.16em;
          color: #E88C2B;
          display: block;
          margin-bottom: 8px;
        }

        .cta-title-thick {
          font-family: var(--font-heading);
          font-size: clamp(1.6rem, 2.5vw, 2.2rem);
          font-weight: 900;
          color: #FFFFFF;
          margin-bottom: 10px;
          line-height: 1.15;
          letter-spacing: -0.01em;
          text-rendering: optimizeLegibility;
        }

        .cta-description {
          font-size: 1rem;
          color: #CBD5E1;
          max-width: 620px;
          line-height: 1.6;
          margin: 0;
        }

        .about-cta-actions {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        .btn-cta-reserve {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.90rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          padding: 15px 28px;
          border-radius: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 16px rgba(232, 140, 43, 0.35);
        }

        .btn-cta-reserve:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(232, 140, 43, 0.5);
        }

        .btn-cta-whatsapp {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #25D366;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 14px 24px;
          border-radius: 10px;
          text-decoration: none;
          box-shadow: 0 4px 14px rgba(37, 211, 102, 0.25);
          transition: all 0.2s ease;
        }

        .btn-cta-whatsapp:hover {
          background: #1EBE5D;
          transform: translateY(-2px);
        }

        @media (max-width: 900px) {
          .about-cta-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 34px 26px;
          }

          .about-cta-actions {
            width: 100%;
            flex-direction: column;
          }

          .btn-cta-reserve,
          .btn-cta-whatsapp {
            width: 100%;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .about-breadcrumb-bar {
            padding: 12px 0;
          }

          .cta-title-thick {
            font-size: 1.5rem;
          }

          .cta-description {
            font-size: 0.92rem;
          }
        }
      `}</style>
    </div>
  );
}
