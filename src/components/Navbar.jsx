import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowRight, Menu, X, MessageCircle } from 'lucide-react';
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
    <header className={`site-header ${mobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="container header-container">
        {/* Brand Logo */}
        <a
          href="/"
          onClick={handleHomeNav}
          className="brand-logo-link"
          aria-label="Lavender Taxi Service - Home"
        >
          <img
            src="/images/new_suburban_logo_cropped.png"
            alt="Lavender Taxi Service"
            className="brand-logo-img"
          />
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
          {/* Phone block */}
          <div className="header-phone-block">
            <a href={`tel:+${OWNER_PHONE_RAW}`} className="header-phone-number">
              +1 (832) 879-8685
            </a>
            <span className="header-phone-sub">Call Anytime</span>
          </div>

          {/* Gold Book a Ride Button */}
          <button
            type="button"
            onClick={handleBookRideClick}
            className="header-gold-btn"
          >
            <span>Book a Ride</span>
            <ArrowRight size={14} />
          </button>

          {/* Mobile Menu Hamburger (Prominent Large 3-Bars) */}
          <button
            type="button"
            className="header-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={28} strokeWidth={2.4} /> : <Menu size={28} strokeWidth={2.4} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer" data-lenis-prevent>
          <ul className="mobile-links-list">
            <li className="mobile-nav-item">
              <a 
                href="/" 
                onClick={handleHomeNav}
                className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
              >
                <span>Home</span>
                <ArrowRight size={16} className="mobile-link-arrow" />
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="/about" 
                onClick={handleAboutNav}
                className={`mobile-nav-link ${location.pathname === '/about' ? 'active' : ''}`}
              >
                <span>About</span>
                <ArrowRight size={16} className="mobile-link-arrow" />
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#services" 
                onClick={(e) => handleSectionNav(e, '#services')}
                className="mobile-nav-link"
              >
                <span>Services</span>
                <ArrowRight size={16} className="mobile-link-arrow" />
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#fleet" 
                onClick={(e) => handleSectionNav(e, '#fleet')}
                className="mobile-nav-link"
              >
                <span>Fleet & Cabin Interior</span>
                <ArrowRight size={16} className="mobile-link-arrow" />
              </a>
            </li>
            <li className="mobile-nav-item">
              <a 
                href="#contact" 
                onClick={(e) => handleSectionNav(e, '#contact')}
                className="mobile-nav-link"
              >
                <span>Contact</span>
                <ArrowRight size={16} className="mobile-link-arrow" />
              </a>
            </li>
          </ul>

          <div className="mobile-drawer-footer">
            <div className="mobile-drawer-contact-row">
              <a href={`tel:+${OWNER_PHONE_RAW}`} className="mobile-phone-call-btn">
                <span>+1 (832) 879-8685</span>
                <span className="mobile-call-sub">· Call</span>
              </a>
              <a 
                href={getDirectWhatsAppChatUrl()} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="mobile-whatsapp-drawer-btn"
                aria-label="Chat on WhatsApp"
              >
                <MessageCircle size={17} color="#25D366" />
                <span>WhatsApp</span>
              </a>
            </div>

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
          background: #08020C !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.09) !important;
          box-shadow: 0 4px 25px rgba(0, 0, 0, 0.45) !important;
        }
        .header-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 78px;
        }
        .brand-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          padding: 4px 0;
        }
        .brand-logo-img {
          height: 48px;
          width: auto;
          max-width: 175px;
          object-fit: contain;
          transition: transform 0.2s ease;
        }
        .brand-logo-link:hover .brand-logo-img {
          transform: scale(1.02);
        }
        .desktop-nav-list {
          display: flex;
          align-items: center;
          gap: 32px;
          list-style: none;
        }
        .desktop-nav-link {
          font-size: 0.94rem;
          font-weight: 600;
          color: #E2E8F0;
          transition: color 0.18s ease;
          position: relative;
          text-decoration: none;
        }
        .desktop-nav-link:hover {
          color: #E88C2B;
        }
        .desktop-nav-link.active {
          color: #FFFFFF;
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
          box-shadow: 0 0 8px rgba(232, 140, 43, 0.6);
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
          font-weight: 800;
          font-size: 0.94rem;
          color: #E88C2B;
          text-decoration: none;
          transition: color 0.15s ease;
        }
        .header-phone-number:hover {
          color: #FBBF24;
        }
        .header-phone-sub {
          font-size: 0.72rem;
          color: #94A3B8;
          font-weight: 600;
          letter-spacing: 0.03em;
        }
        .header-gold-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: linear-gradient(135deg, #E88C2B 0%, #D2791C 100%);
          color: #FFFFFF;
          font-weight: 800;
          font-size: 0.88rem;
          padding: 10px 22px;
          border-radius: 9999px;
          box-shadow: 0 4px 14px rgba(232, 140, 43, 0.38);
          transition: all 0.18s ease;
          border: none;
          cursor: pointer;
        }
        .header-gold-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.52);
        }
        .header-hamburger-btn {
          display: none;
          background: rgba(255, 255, 255, 0.09);
          border: 1.5px solid rgba(255, 255, 255, 0.22);
          border-radius: 12px;
          width: 48px;
          height: 48px;
          color: #FFFFFF;
          padding: 0;
          cursor: pointer;
        }

        /* Mobile Drawer */
        .mobile-nav-drawer {
          position: absolute;
          top: 72px;
          left: 0;
          right: 0;
          background: #09020D !important;
          border-bottom: 2px solid rgba(232, 140, 43, 0.3);
          padding: 18px 22px 26px 22px;
          box-shadow: 0 20px 48px rgba(0, 0, 0, 0.7);
          display: flex;
          flex-direction: column;
          gap: 20px;
          animation: drawerSlideDown 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drawerSlideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .mobile-links-list {
          list-style: none;
          display: flex;
          flex-direction: column;
        }

        .mobile-nav-item {
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #F8FAFC;
          padding: 14px 0;
          transition: all 0.15s ease;
          text-decoration: none;
          letter-spacing: 0.02em;
        }

        .mobile-nav-link.active,
        .mobile-nav-link:hover {
          color: #E88C2B;
        }

        .mobile-link-arrow {
          color: #E88C2B;
          opacity: 0.9;
          transition: transform 0.15s ease;
        }

        .mobile-nav-link:hover .mobile-link-arrow {
          transform: translateX(4px);
        }

        .mobile-drawer-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding-top: 6px;
        }

        .mobile-drawer-contact-row {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .mobile-phone-call-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 14px;
          border-radius: 9999px;
          background: rgba(255, 255, 255, 0.06);
          border: 1.5px solid rgba(255, 255, 255, 0.15);
          font-size: 0.88rem;
          font-weight: 800;
          color: #FFFFFF;
          text-decoration: none;
          touch-action: manipulation;
          transition: all 0.18s ease;
        }

        .mobile-phone-call-btn:active {
          transform: scale(0.97);
        }

        .mobile-phone-call-btn:hover {
          border-color: #E88C2B;
          color: #E88C2B;
        }

        .mobile-whatsapp-drawer-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 12px 18px;
          border-radius: 9999px;
          background: rgba(37, 211, 102, 0.12);
          border: 1.5px solid rgba(37, 211, 102, 0.35);
          font-size: 0.88rem;
          font-weight: 800;
          color: #FFFFFF;
          text-decoration: none;
          touch-action: manipulation;
          transition: all 0.18s ease;
          flex-shrink: 0;
        }

        .mobile-whatsapp-drawer-btn:active {
          transform: scale(0.97);
        }

        .mobile-whatsapp-drawer-btn:hover {
          background: rgba(37, 211, 102, 0.22);
          border-color: #25D366;
        }

        .mobile-call-sub {
          font-size: 0.74rem;
          color: #E88C2B;
          font-weight: 600;
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
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .site-header {
            position: sticky;
            top: 0;
            left: 0;
            right: 0;
            width: 100%;
            z-index: 1000;
            background: #08020C !important;
            border-bottom: 1px solid rgba(255, 255, 255, 0.09) !important;
            box-shadow: 0 4px 25px rgba(0, 0, 0, 0.45) !important;
          }

          .header-container {
            height: 72px;
          }

          .brand-logo-img {
            height: 40px;
            width: auto;
            max-width: 145px;
            object-fit: contain;
          }

          .header-hamburger-btn {
            color: #FFFFFF;
            background: rgba(255, 255, 255, 0.09);
            border: 1.5px solid rgba(255, 255, 255, 0.22);
            border-radius: 12px;
            width: 48px;
            height: 48px;
            padding: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            box-shadow: 0 4px 14px rgba(0, 0, 0, 0.4);
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .header-hamburger-btn:active {
            transform: scale(0.96);
            background: rgba(232, 140, 43, 0.25);
            border-color: #E88C2B;
          }

          .mobile-nav-drawer {
            top: 72px;
          }
        }
      `}</style>
    </header>
  );
}
