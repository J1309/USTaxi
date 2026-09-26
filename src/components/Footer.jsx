import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, Mail, Clock, MapPin, MessageCircle, ArrowRight, Plus, Minus } from 'lucide-react';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW, OWNER_EMAIL, getDirectWhatsAppChatUrl } from '../utils/whatsapp';
import { smoothScrollTo } from '../hooks/useLenis';

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [openFooterAccordion, setOpenFooterAccordion] = useState(null); // 'links' | 'services' | 'contact' | null

  const toggleFooterAcc = (key) => {
    setOpenFooterAccordion(openFooterAccordion === key ? null : key);
  };

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

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => {
        setNewsletterEmail('');
        setSubscribed(false);
      }, 3500);
    }
  };

  return (
    <footer id="contact" className="site-footer-maroon">
      <div className="container">
        {/* Desktop Top Grid (Visible > 768px) */}
        <div className="footer-top-grid reveal-on-scroll">
          {/* Col 1: Brand & Slogan */}
          <div className="footer-brand-col">
            <a href="/" onClick={handleHomeNav} className="footer-brand-link">
              <img
                src="/images/new_logo_transparent.png"
                alt="Lavender Taxi Service"
                className="footer-brand-logo"
              />
              <div className="footer-brand-text">
                <span className="footer-brand-title">LAVENDER</span>
                <span className="footer-brand-sub">TAXI & CHAUFFEUR</span>
              </div>
            </a>

            <p className="footer-brand-bio">
              Experience luxury, safety, and reliability with Lavender Taxi. Your trusted ground partner for premium private travel across Greater Houston and Texas.
            </p>

            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-pill" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Quick Links</h4>
            <ul className="footer-list">
              <li><a href="/" onClick={handleHomeNav}>Home</a></li>
              <li><a href="#fleet" onClick={(e) => handleNav(e, '#fleet')}>Our Fleet</a></li>
              <li><a href="#services" onClick={(e) => handleNav(e, '#services')}>Services</a></li>
              <li><a href="#destinations" onClick={(e) => handleNav(e, '#destinations')}>Destinations</a></li>
              <li><a href="/about" onClick={handleAboutNav}>About Symanthan</a></li>
            </ul>
          </div>

          {/* Col 3: Services */}
          <div className="footer-links-col">
            <h4 className="footer-col-title">Services</h4>
            <ul className="footer-list">
              <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Airport Transfer (IAH & HOU)</a></li>
              <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>City & Corporate Rides</a></li>
              <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Galveston Cruise Port</a></li>
              <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Hourly Private Charter</a></li>
              <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Child Car Seat Service</a></li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="footer-contact-col">
            <h4 className="footer-col-title">Contact Us</h4>
            <ul className="footer-contact-stack">
              <li className="contact-item">
                <MapPin size={15} color="#E88C2B" />
                <span>Greater Houston, Texas</span>
              </li>
              <li className="contact-item">
                <Phone size={15} color="#E88C2B" />
                <a href={`tel:+${OWNER_PHONE_RAW}`}>{OWNER_PHONE_DISPLAY}</a>
              </li>
              <li className="contact-item">
                <MessageCircle size={15} color="#E88C2B" />
                <a href={getDirectWhatsAppChatUrl()} target="_blank" rel="noopener noreferrer">
                  WhatsApp Direct Dispatch
                </a>
              </li>
              <li className="contact-item">
                <Clock size={15} color="#E88C2B" />
                <span>24/7 Dedicated Chauffeur Support</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Newsletter */}
          <div className="footer-newsletter-col">
            <h4 className="footer-col-title">Newsletter</h4>
            <p className="newsletter-desc">
              Subscribe for private flight updates and executive travel alerts.
            </p>

            <form onSubmit={handleNewsletterSubmit} className="newsletter-form-inline">
              <input
                type="email"
                required
                placeholder="Your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="newsletter-input"
              />
              <button
                type="submit"
                className="newsletter-submit-btn"
                aria-label="Subscribe"
              >
                <ArrowRight size={16} />
              </button>
            </form>
            {subscribed && (
              <span className="newsletter-success">Thank you for subscribing!</span>
            )}
          </div>
        </div>

        {/* Mobile-Only Accordion Layout (Screen 8 - Visible ONLY on <= 768px) */}
        <div className="mobile-footer-layout">
          {/* Brand & Social Header */}
          <div className="mob-footer-brand">
            <a href="/" onClick={handleHomeNav} className="mob-footer-logo-link">
              <img
                src="/images/new_logo_transparent.png"
                alt="Lavender Taxi Service"
                className="mob-footer-logo"
              />
              <div>
                <span className="mob-brand-title">LAVENDER</span>
                <span className="mob-brand-sub">TAXI & CHAUFFEUR</span>
              </div>
            </a>

            <div className="mob-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mob-social-btn" aria-label="Facebook">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mob-social-btn" aria-label="Instagram">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="mob-social-btn" aria-label="LinkedIn">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* 3 Collapsible Accordions matching Screen 8 */}
          <div className="mob-footer-accordions">
            {/* 1. Quick Links */}
            <div className={`mob-foot-acc-box ${openFooterAccordion === 'links' ? 'open' : ''}`}>
              <button
                type="button"
                className="mob-acc-btn"
                onClick={() => toggleFooterAcc('links')}
              >
                <span>Quick Links</span>
                {openFooterAccordion === 'links' ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {openFooterAccordion === 'links' && (
                <ul className="mob-acc-content-list">
                  <li><a href="/" onClick={handleHomeNav}>Home</a></li>
                  <li><a href="#fleet" onClick={(e) => handleNav(e, '#fleet')}>Our Fleet</a></li>
                  <li><a href="#services" onClick={(e) => handleNav(e, '#services')}>Services</a></li>
                  <li><a href="#destinations" onClick={(e) => handleNav(e, '#destinations')}>Destinations</a></li>
                  <li><a href="/about" onClick={handleAboutNav}>About Symanthan</a></li>
                </ul>
              )}
            </div>

            {/* 2. Services */}
            <div className={`mob-foot-acc-box ${openFooterAccordion === 'services' ? 'open' : ''}`}>
              <button
                type="button"
                className="mob-acc-btn"
                onClick={() => toggleFooterAcc('services')}
              >
                <span>Services</span>
                {openFooterAccordion === 'services' ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {openFooterAccordion === 'services' && (
                <ul className="mob-acc-content-list">
                  <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Airport Transfer (IAH & HOU)</a></li>
                  <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>City & Corporate Rides</a></li>
                  <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Galveston Cruise Port</a></li>
                  <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Hourly Private Charter</a></li>
                  <li><a href="#booking-engine" onClick={(e) => handleNav(e, '#booking-engine')}>Child Car Seat Service</a></li>
                </ul>
              )}
            </div>

            {/* 3. Contact Us */}
            <div className={`mob-foot-acc-box ${openFooterAccordion === 'contact' ? 'open' : ''}`}>
              <button
                type="button"
                className="mob-acc-btn"
                onClick={() => toggleFooterAcc('contact')}
              >
                <span>Contact Us</span>
                {openFooterAccordion === 'contact' ? <Minus size={16} /> : <Plus size={16} />}
              </button>
              {openFooterAccordion === 'contact' && (
                <ul className="mob-acc-content-list">
                  <li><a href={`tel:+${OWNER_PHONE_RAW}`}>{OWNER_PHONE_DISPLAY}</a></li>
                  <li><a href={getDirectWhatsAppChatUrl()} target="_blank" rel="noopener noreferrer">WhatsApp Dispatch</a></li>
                  <li><a href={`mailto:${OWNER_EMAIL}`}>{OWNER_EMAIL}</a></li>
                  <li><span>Greater Houston, Texas</span></li>
                </ul>
              )}
            </div>
          </div>

          <div className="mob-footer-copyright">
            © {new Date().getFullYear()} Lavender Taxi Service. All rights reserved.
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <p className="copyright-text">
            © {new Date().getFullYear()} Lavender Taxi Service. All rights reserved. Built with pride in Houston, TX.
          </p>
          <div className="footer-legal-links">
            <a href="#privacy">Privacy Policy</a>
            <span className="dot">•</span>
            <a href="#terms">Terms of Service</a>
            <span className="dot">•</span>
            <a href="#cookies">Cookie Policy</a>
          </div>
        </div>
      </div>

      <style>{`
        .site-footer-maroon {
          background: #4E0401;
          background: linear-gradient(180deg, #4E0401 0%, #350200 50%, #200100 100%);
          border-top: 1px solid rgba(232, 140, 43, 0.2);
          padding-top: 75px;
          padding-bottom: 35px;
          color: #FFFFFF;
        }

        .footer-top-grid {
          display: grid;
          grid-template-columns: 1.4fr 0.9fr 1.2fr 1.2fr 1.3fr;
          gap: 36px;
          margin-bottom: 55px;
          text-align: left;
        }

        /* Brand Column */
        .footer-brand-col {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .footer-brand-link {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .footer-brand-logo {
          width: 52px;
          height: auto;
          max-height: 38px;
          object-fit: contain;
        }

        .footer-brand-text {
          display: flex;
          flex-direction: column;
        }

        .footer-brand-title {
          font-family: var(--font-heading);
          font-size: 1.22rem;
          font-weight: 900;
          color: #FFFFFF;
          letter-spacing: 0.06em;
          line-height: 1;
        }

        .footer-brand-sub {
          font-size: 0.65rem;
          color: #E88C2B;
          font-weight: 800;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 3px;
        }

        .footer-brand-bio {
          font-size: 0.88rem;
          color: rgba(254, 251, 243, 0.75);
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .footer-social-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .social-pill {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.14);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #FFFFFF;
          transition: all 0.18s ease;
        }

        .social-pill:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          transform: translateY(-2px);
        }

        /* Links Columns */
        .footer-col-title {
          font-family: var(--font-heading);
          font-size: 1.05rem;
          font-weight: 800;
          color: #FFFFFF;
          margin-bottom: 18px;
          letter-spacing: 0.02em;
        }

        .footer-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding: 0;
          margin: 0;
        }

        .footer-list a {
          font-size: 0.88rem;
          color: rgba(254, 251, 243, 0.72);
          transition: color 0.15s ease;
        }

        .footer-list a:hover {
          color: #E88C2B;
        }

        /* Contact Stack */
        .footer-contact-stack {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 0;
          margin: 0;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.88rem;
          color: rgba(254, 251, 243, 0.78);
        }

        .contact-item a {
          color: inherit;
          transition: color 0.15s ease;
        }

        .contact-item a:hover {
          color: #E88C2B;
        }

        /* Newsletter Column */
        .newsletter-desc {
          font-size: 0.86rem;
          color: rgba(254, 251, 243, 0.75);
          line-height: 1.5;
          margin-bottom: 14px;
        }

        .newsletter-form-inline {
          display: flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 9999px;
          padding: 4px 6px 4px 14px;
          transition: border-color 0.2s ease;
        }

        .newsletter-form-inline:focus-within {
          border-color: #E88C2B;
        }

        .newsletter-input {
          flex: 1;
          background: transparent;
          border: none;
          outline: none;
          color: #FFFFFF;
          font-size: 0.84rem;
          font-family: inherit;
        }

        .newsletter-input::placeholder {
          color: rgba(254, 251, 243, 0.45);
        }

        .newsletter-submit-btn {
          width: 34px;
          height: 34px;
          border-radius: 50%;
          background: #E88C2B;
          border: none;
          color: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.18s ease;
        }

        .newsletter-submit-btn:hover {
          background: #D2791C;
          transform: scale(1.05);
        }

        .newsletter-success {
          display: block;
          font-size: 0.78rem;
          color: #E88C2B;
          margin-top: 8px;
        }

        /* Bottom Legal Bar */
        .footer-bottom-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 28px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          flex-wrap: wrap;
          gap: 16px;
        }

        .copyright-text {
          font-size: 0.82rem;
          color: rgba(254, 251, 243, 0.55);
        }

        .footer-legal-links {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.82rem;
          color: rgba(254, 251, 243, 0.55);
        }

        .footer-legal-links a:hover {
          color: #E88C2B;
        }

        .footer-legal-links .dot {
          color: rgba(254, 251, 243, 0.3);
        }

        .mobile-footer-layout {
          display: none;
        }

        @media (max-width: 1100px) and (min-width: 769px) {
          .footer-top-grid {
            grid-template-columns: 1fr 1fr;
            gap: 40px;
          }
        }

        /* Strictly Mobile (<= 768px): Screen 8 Compact Mobile Footer */
        @media (max-width: 768px) {
          .site-footer-maroon {
            padding-top: 45px;
            padding-bottom: 90px; /* Space for sticky floating bottom bar */
          }

          .footer-top-grid,
          .footer-bottom-bar {
            display: none !important;
          }

          .mobile-footer-layout {
            display: flex !important;
            flex-direction: column;
            gap: 24px;
          }

          .mob-footer-brand {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 16px;
          }

          .mob-footer-logo-link {
            display: inline-flex;
            align-items: center;
            gap: 12px;
            text-decoration: none;
          }

          .mob-footer-logo {
            width: 50px;
            height: auto;
            max-height: 34px;
            object-fit: contain;
          }

          .mob-brand-title {
            font-family: var(--font-heading);
            font-size: 1.3rem;
            font-weight: 900;
            color: #FFFFFF;
            letter-spacing: 0.08em;
            display: block;
            text-align: left;
            -webkit-text-stroke: 0.3px currentColor;
          }

          .mob-brand-sub {
            font-size: 0.62rem;
            font-weight: 700;
            letter-spacing: 0.16em;
            color: #E88C2B;
            display: block;
            text-align: left;
          }

          .mob-social-row {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 12px;
          }

          .mob-social-btn {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.08);
            border: 1px solid rgba(255, 255, 255, 0.12);
            color: #FFFFFF;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            transition: all 0.18s ease;
          }

          .mob-social-btn:hover {
            background: #E88C2B;
            border-color: #E88C2B;
          }

          /* Accordions */
          .mob-footer-accordions {
            display: flex;
            flex-direction: column;
            gap: 8px;
          }

          .mob-foot-acc-box {
            background: rgba(255, 255, 255, 0.04);
            border: 1px solid rgba(255, 255, 255, 0.10);
            border-radius: 12px;
            overflow: hidden;
          }

          .mob-foot-acc-box.open {
            border-color: rgba(232, 140, 43, 0.5);
            background: rgba(255, 255, 255, 0.07);
          }

          .mob-acc-btn {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 13px 16px;
            background: transparent;
            border: none;
            color: #FFFFFF;
            font-family: var(--font-heading);
            font-size: 0.95rem;
            font-weight: 800;
            cursor: pointer;
            text-align: left;
          }

          .mob-acc-content-list {
            list-style: none;
            padding: 0 16px 14px 16px;
            margin: 0;
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .mob-acc-content-list li a,
          .mob-acc-content-list li span {
            font-size: 0.84rem;
            color: rgba(254, 251, 243, 0.75);
            text-decoration: none;
            display: block;
            transition: color 0.15s ease;
          }

          .mob-acc-content-list li a:hover {
            color: #E88C2B;
          }

          .mob-footer-copyright {
            text-align: center;
            font-size: 0.74rem;
            color: rgba(254, 251, 243, 0.45);
            padding-top: 12px;
            border-top: 1px solid rgba(255, 255, 255, 0.08);
          }
        }
      `}</style>
    </footer>
  );
}
