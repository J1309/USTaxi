import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, MessageCircle } from 'lucide-react';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW, OWNER_EMAIL, getDirectWhatsAppChatUrl } from '../utils/whatsapp';
import { smoothScrollTo } from '../hooks/useLenis';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNav = (e, targetHash) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate(`/${targetHash}`);
      setTimeout(() => {
        smoothScrollTo(targetHash);
      }, 150);
    } else {
      smoothScrollTo(targetHash);
    }
  };

  const handleHomeNav = (e) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      smoothScrollTo('#root');
    }
  };

  const handleAboutNav = (e) => {
    e.preventDefault();
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <footer id="contact" className="site-footer-light">
      <div className="container">
        <div className="footer-grid-5">
          {/* Col 1: Logo & Slogan */}
          <div className="footer-col-brand">
            <div className="footer-brand-header">
              <a href="/" onClick={handleHomeNav} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img
                  src="/images/logo_lavender.jpg"
                  alt="Lavender Taxi Service"
                  className="footer-brand-logo"
                />
                <div>
                  <span className="footer-brand-title">LAVENDER</span>
                  <span className="footer-brand-sub">TAXI SERVICE</span>
                </div>
              </a>
            </div>
            <p className="footer-slogan-text">Safe Rides. Better Journeys.</p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-col-list">
              <li>
                <a href="/" onClick={handleHomeNav}>
                  Home
                </a>
              </li>
              <li>
                <a href="#services" onClick={(e) => handleNav(e, '#services')}>
                  Services
                </a>
              </li>
              <li>
                <a href="#fleet" onClick={(e) => handleNav(e, '#fleet')}>
                  Fleet
                </a>
              </li>
              <li>
                <a href="/about" onClick={handleAboutNav}>
                  About Symanthan
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNav(e, '#contact')}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Our Services */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Our Services</h4>
            <ul className="footer-col-list">
              <li>
                <a href="#booking-section" onClick={(e) => handleNav(e, '#booking-section')}>
                  Airport Pickup & Drop-off
                </a>
              </li>
              <li>
                <a href="#booking-section" onClick={(e) => handleNav(e, '#booking-section')}>
                  Hourly Rental
                </a>
              </li>
              <li>
                <a href="#booking-section" onClick={(e) => handleNav(e, '#booking-section')}>
                  NASA Service
                </a>
              </li>
              <li>
                <a href="#booking-section" onClick={(e) => handleNav(e, '#booking-section')}>
                  Cruise Terminal
                </a>
              </li>
              <li>
                <a href="#booking-section" onClick={(e) => handleNav(e, '#booking-section')}>
                  Corporate Transport
                </a>
              </li>
              <li>
                <a href="#booking-section" onClick={(e) => handleNav(e, '#booking-section')}>
                  8 Passenger Service
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Contact Us</h4>
            <div className="footer-contact-stack">
              <a href={`tel:+${OWNER_PHONE_RAW}`} className="footer-contact-link">
                <Phone size={15} color="#0284C7" />
                <span>{OWNER_PHONE_DISPLAY}</span>
              </a>
              <a href={`mailto:${OWNER_EMAIL}`} className="footer-contact-link">
                <Mail size={15} color="#0284C7" />
                <span>{OWNER_EMAIL}</span>
              </a>
              <div className="footer-contact-link">
                <MapPin size={15} color="#0284C7" />
                <span>Houston, Texas</span>
              </div>
              <div className="footer-contact-link">
                <Clock size={15} color="#0284C7" />
                <span>24/7 Service</span>
              </div>
            </div>
          </div>

          {/* Col 5: Follow Us */}
          <div className="footer-col-links">
            <h4 className="footer-col-title">Follow Us</h4>
            <div className="footer-social-icons">
              <a
                href={getDirectWhatsAppChatUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="social-round-btn wa"
                title="WhatsApp Direct"
              >
                <MessageCircle size={18} />
              </a>
              <a
                href={`tel:+${OWNER_PHONE_RAW}`}
                className="social-round-btn phone"
                title="Call 24/7"
              >
                <Phone size={17} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-row-light">
          <p className="copyright-light">
            © {new Date().getFullYear()} Lavender Taxi Service. All rights reserved.
          </p>
          <p className="motto-light">
            Houston, Texas | Ride Further. Live More.
          </p>
        </div>
      </div>

      <style>{`
        .site-footer-light {
          background: #080D14;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          padding-top: 60px;
          padding-bottom: 30px;
        }
        .footer-grid-5 {
          display: grid;
          grid-template-columns: 1.4fr 1fr 1.3fr 1.3fr 0.9fr;
          gap: 36px;
          margin-bottom: 45px;
        }
        .footer-brand-header {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .footer-brand-logo {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid rgba(255, 255, 255, 0.15);
        }
        .footer-brand-title {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: #FFFFFF;
          letter-spacing: 0.05em;
          display: block;
          line-height: 1;
        }
        .footer-brand-sub {
          font-size: 0.65rem;
          color: #94A3B8;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
        }
        .footer-slogan-text {
          font-size: 0.85rem;
          color: #94A3B8;
          margin-top: 14px;
          font-style: italic;
        }
        .footer-col-title {
          font-size: 0.94rem;
          font-weight: 700;
          color: #FFFFFF;
          margin-bottom: 16px;
        }
        .footer-col-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 9px;
        }
        .footer-col-list a {
          font-size: 0.86rem;
          color: #94A3B8;
          transition: color 0.15s ease;
        }
        .footer-col-list a:hover {
          color: #F59E0B;
        }
        .footer-contact-stack {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer-contact-link {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.86rem;
          color: #CBD5E1;
          font-weight: 500;
        }
        .footer-contact-link:hover {
          color: #F59E0B;
        }
        .footer-social-icons {
          display: flex;
          gap: 10px;
        }
        .social-round-btn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #CBD5E1;
          transition: all 0.15s ease;
        }
        .social-round-btn.wa:hover {
          background: #25D366;
          border-color: #25D366;
          color: #FFFFFF;
        }
        .social-round-btn.phone:hover {
          background: #F59E0B;
          border-color: #F59E0B;
          color: #0F172A;
        }
        .footer-bottom-row-light {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 24px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          flex-wrap: wrap;
          gap: 12px;
        }
        .copyright-light {
          font-size: 0.82rem;
          color: #64748B;
        }
        .motto-light {
          font-size: 0.82rem;
          color: #94A3B8;
          font-style: italic;
        }

        @media (max-width: 1024px) {
          .footer-grid-5 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .footer-grid-5 {
            grid-template-columns: 1fr;
          }
          .footer-bottom-row-light {
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </footer>
  );
}
