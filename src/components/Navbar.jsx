import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Phone, ArrowRight, Menu, X, MessageCircle } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { OWNER_PHONE_RAW, getDirectWhatsAppChatUrl } from '../utils/whatsapp';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isAboutPage = location.pathname === '/about';

  const handleSectionNav = (e, sectionHash) => {
    e.preventDefault();
    setMobileMenuOpen(false);

    if (location.pathname !== '/') {
      navigate(`/${sectionHash}`);
      setTimeout(() => {
        smoothScrollTo(sectionHash);
      }, 150);
    } else {
      smoothScrollTo(sectionHash);
    }
  };

  const handleHomeNav = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else {
      smoothScrollTo('#root');
    }
  };

  const handleAboutNav = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    navigate('/about');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleBookRideClick = () => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/#booking-section');
      setTimeout(() => {
        smoothScrollTo('#booking-section');
      }, 150);
    } else {
      smoothScrollTo('#booking-section');
    }
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        {/* Brand Logo & Name */}
        <a
          href="/"
          onClick={handleHomeNav}
          className="brand-logo-link"
        >
          <img
            src="/images/logo_lavender.jpg"
            alt="Lavender Taxi Service"
            className="brand-logo-img"
          />
          <div className="brand-text-block">
            <span className="brand-name">LAVENDER</span>
            <span className="brand-service">TAXI SERVICE</span>
          </div>
        </a>

        {/* Center Desktop Navigation Links */}
        <nav className="desktop-nav" aria-label="Main navigation">
          <ul className="desktop-nav-list">
            <li>
              <a
                href="/"
                onClick={handleHomeNav}
                className={`desktop-nav-link ${!isAboutPage ? 'active' : ''}`}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#services"
                onClick={(e) => handleSectionNav(e, '#services')}
                className="desktop-nav-link"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#fleet"
                onClick={(e) => handleSectionNav(e, '#fleet')}
                className="desktop-nav-link"
              >
                Fleet
              </a>
            </li>
            <li>
              <a
                href="/about"
                onClick={handleAboutNav}
                className={`desktop-nav-link ${isAboutPage ? 'active' : ''}`}
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                onClick={(e) => handleSectionNav(e, '#contact')}
                className="desktop-nav-link"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>

        {/* Right Desktop Actions */}
        <div className="header-actions">
          {/* Gold Book a Ride Button as shown in reference */}
          <button
            type="button"
            onClick={handleBookRideClick}
            className="header-book-btn"
          >
            <span>Book a Ride</span>
            <ArrowRight size={15} />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            type="button"
            className="header-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-links-list">
            <li>
              <a href="/" onClick={handleHomeNav}>
                Home
              </a>
            </li>
            <li>
              <a href="/about" onClick={handleAboutNav}>
                About Symanthan & Our Story
              </a>
            </li>
            <li>
              <a href="#services" onClick={(e) => handleSectionNav(e, '#services')}>
                Services
              </a>
            </li>
            <li>
              <a href="#fleet" onClick={(e) => handleSectionNav(e, '#fleet')}>
                Fleet (Suburban & Lexus)
              </a>
            </li>
            <li>
              <a href="#why-us" onClick={(e) => handleSectionNav(e, '#why-us')}>
                Why Ride With Us
              </a>
            </li>
            <li>
              <a href="#houston-guide" onClick={(e) => handleSectionNav(e, '#houston-guide')}>
                Houston Destinations
              </a>
            </li>
            <li>
              <a href="#contact" onClick={(e) => handleSectionNav(e, '#contact')}>
                Contact & 24/7 Dispatch
              </a>
            </li>
          </ul>

          <div className="mobile-drawer-footer">
            <a href={`tel:+${OWNER_PHONE_RAW}`} className="header-phone-pill mobile-full">
              <Phone size={16} />
              <span>Call (832) 879-8685</span>
            </a>
            <a
              href={getDirectWhatsAppChatUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp-pill mobile-full"
            >
              <MessageCircle size={16} />
              <span>WhatsApp Dispatch</span>
            </a>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          background: #FFFFFF;
          border-bottom: 1px solid var(--border-subtle);
          box-shadow: 0 1px 4px rgba(15, 23, 42, 0.04);
        }
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 74px;
        }
        .brand-logo-link {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .brand-logo-img {
          width: 44px;
          height: 44px;
          border-radius: 8px;
          object-fit: cover;
          border: 1px solid #CBD5E1;
        }
        .brand-text-block {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.15rem;
          font-weight: 800;
          color: var(--text-main);
          letter-spacing: 0.05em;
          line-height: 1;
        }
        .brand-service {
          font-size: 0.68rem;
          font-weight: 700;
          color: var(--brand-lavender);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-top: 2px;
        }
        .desktop-nav-list {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .desktop-nav-link {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text-body);
          transition: color 0.15s ease;
          position: relative;
        }
        .desktop-nav-link:hover,
        .desktop-nav-link.active {
          color: var(--brand-blue);
        }
        .desktop-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -25px;
          left: 0;
          right: 0;
          height: 2px;
          background: var(--brand-blue);
          border-radius: 2px;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .header-phone-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #0284C7;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 9px 18px;
          border-radius: var(--radius-full);
          transition: background 0.15s ease;
        }
        .header-phone-pill:hover {
          background: #0369A1;
        }
        .header-book-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--accent-cta);
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.9rem;
          padding: 9px 18px;
          border-radius: var(--radius-full);
          box-shadow: 0 2px 10px var(--accent-cta-glow);
          transition: background 0.15s ease;
        }
        .header-book-btn:hover {
          background: var(--accent-cta-hover);
        }
        .header-hamburger-btn {
          display: none;
          padding: 8px;
          color: var(--text-main);
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: absolute;
          top: 74px;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-bottom: 2px solid var(--border-subtle);
          padding: 24px;
          box-shadow: var(--shadow-lg);
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .mobile-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }
        .mobile-links-list a {
          font-size: 1.1rem;
          font-weight: 700;
          color: var(--text-main);
          padding: 6px 0;
        }
        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-top: 14px;
          border-top: 1px solid var(--border-subtle);
        }
        .mobile-full {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .desktop-nav,
          .header-phone-pill,
          .header-book-btn {
            display: none;
          }
          .header-hamburger-btn {
            display: block;
          }
        }
      `}</style>
    </header>
  );
}
