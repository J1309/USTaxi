import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X } from 'lucide-react';
import { smoothScrollTo } from '../hooks/useLenis';
import { OWNER_PHONE_RAW } from '../utils/whatsapp';

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
            src="/images/logo_lavender_transparent.png"
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
          {/* Phone block matching reference: number + Call Anytime */}
          <div className="header-phone-block">
            <a href={`tel:+${OWNER_PHONE_RAW}`} className="header-phone-number">
              +1 (832) 879-8685
            </a>
            <span className="header-phone-sub">Call Anytime</span>
          </div>

          {/* Gold Book a Ride Button matching reference */}
          <button
            type="button"
            onClick={handleBookRideClick}
            className="header-gold-btn"
          >
            <span>Book a Ride</span>
            <ArrowRight size={14} />
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
              <a href="#contact" onClick={(e) => handleSectionNav(e, '#contact')}>
                Contact & 24/7 Dispatch
              </a>
            </li>
          </ul>

          <div className="mobile-drawer-footer">
            <a href={`tel:+${OWNER_PHONE_RAW}`} className="header-phone-number mobile-phone">
              +1 (832) 879-8685 (Call Anytime)
            </a>
            <button
              type="button"
              onClick={handleBookRideClick}
              className="header-gold-btn mobile-full"
            >
              <span>Book a Ride</span>
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        .site-header {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: rgba(254, 251, 243, 0.95);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          box-shadow: 0 4px 20px rgba(78, 4, 1, 0.04);
        }
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 76px;
        }
        .brand-logo-link {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .brand-logo-img {
          width: 52px;
          height: auto;
          max-height: 38px;
          object-fit: contain;
          background: transparent;
          border: none;
        }
        .brand-text-block {
          display: flex;
          flex-direction: column;
        }
        .brand-name {
          font-family: var(--font-heading);
          font-size: 1.22rem;
          font-weight: 900;
          color: #4E0401;
          letter-spacing: 0.06em;
          line-height: 1;
          -webkit-text-stroke: 0.35px currentColor;
          text-rendering: optimizeLegibility;
        }
        .brand-service {
          font-size: 0.68rem;
          font-weight: 800;
          color: #786C6A;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          margin-top: 3px;
        }
        .desktop-nav-list {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .desktop-nav-link {
          font-size: 0.92rem;
          font-weight: 600;
          color: #4A3E3D;
          transition: color 0.15s ease;
          position: relative;
        }
        .desktop-nav-link:hover {
          color: #E88C2B;
        }
        .desktop-nav-link.active {
          color: #4E0401;
          font-weight: 800;
        }
        .desktop-nav-link.active::after {
          content: '';
          position: absolute;
          bottom: -28px;
          left: 0;
          right: 0;
          height: 2.5px;
          background: #E88C2B;
          border-radius: 2px;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .header-phone-block {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          line-height: 1.2;
        }
        .header-phone-number {
          font-weight: 700;
          font-size: 0.92rem;
          color: #4E0401;
          transition: color 0.15s ease;
        }
        .header-phone-number:hover {
          color: #E88C2B;
        }
        .header-phone-sub {
          font-size: 0.72rem;
          color: #786C6A;
          font-weight: 600;
        }
        .header-gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #E88C2B;
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.88rem;
          padding: 10px 22px;
          border-radius: 9999px;
          box-shadow: 0 3px 12px rgba(232, 140, 43, 0.32);
          transition: all 0.18s ease;
        }
        .header-gold-btn:hover {
          background: #D2791C;
          transform: translateY(-1px);
          box-shadow: 0 5px 16px rgba(232, 140, 43, 0.4);
        }
        .header-hamburger-btn {
          display: none;
          padding: 8px;
          color: #4E0401;
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: absolute;
          top: 76px;
          left: 0;
          right: 0;
          background: #FFFFFF;
          border-bottom: 2px solid #E2E8F0;
          padding: 24px;
          box-shadow: 0 16px 36px rgba(15, 23, 42, 0.12);
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
          color: #0F172A;
          padding: 6px 0;
        }
        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid #E2E8F0;
        }
        .mobile-phone {
          text-align: center;
          padding: 6px 0;
          color: #0F172A;
        }
        .mobile-full {
          width: 100%;
          justify-content: center;
        }

        @media (max-width: 900px) {
          .desktop-nav,
          .header-phone-block,
          .header-gold-btn {
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
