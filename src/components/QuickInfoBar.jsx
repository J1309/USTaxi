import React from 'react';
import { PhoneCall, Clock, PlaneTakeoff, MapPin } from 'lucide-react';
import { OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW } from '../utils/whatsapp';

export default function QuickInfoBar() {
  return (
    <section className="info-ribbon-blue">
      <div className="container">
        <div className="info-ribbon-grid">
          {/* Item 1: Call Now */}
          <a
            href={`tel:+${OWNER_PHONE_RAW}`}
            className="info-ribbon-item info-clickable"
            title="Call Dispatch"
          >
            <div className="info-ribbon-icon">
              <PhoneCall size={20} color="#0284C7" />
            </div>
            <div className="info-ribbon-text">
              <span className="info-ribbon-label">Call Now</span>
              <span className="info-ribbon-val">{OWNER_PHONE_DISPLAY}</span>
            </div>
          </a>

          {/* Item 2: 24/7 Service */}
          <div className="info-ribbon-item">
            <div className="info-ribbon-icon">
              <Clock size={20} color="#0284C7" />
            </div>
            <div className="info-ribbon-text">
              <span className="info-ribbon-label">24/7 Service</span>
              <span className="info-ribbon-val">Always here for you</span>
            </div>
          </div>

          {/* Item 3: Flight Monitoring */}
          <div className="info-ribbon-item">
            <div className="info-ribbon-icon">
              <PlaneTakeoff size={20} color="#0284C7" />
            </div>
            <div className="info-ribbon-text">
              <span className="info-ribbon-label">Flight Monitoring</span>
              <span className="info-ribbon-val">We track your flight</span>
            </div>
          </div>

          {/* Item 4: Serving Houston */}
          <div className="info-ribbon-item">
            <div className="info-ribbon-icon">
              <MapPin size={20} color="#0284C7" />
            </div>
            <div className="info-ribbon-text">
              <span className="info-ribbon-label">Serving Houston</span>
              <span className="info-ribbon-val">and Surrounding Areas</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .info-ribbon-blue {
          background: #0284C7;
          color: #FFFFFF;
          padding: 16px 0;
          box-shadow: 0 4px 14px rgba(2, 132, 199, 0.2);
        }
        .info-ribbon-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
          align-items: center;
        }
        .info-ribbon-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: inherit;
        }
        .info-clickable {
          cursor: pointer;
          transition: opacity 0.15s ease;
        }
        .info-clickable:hover {
          opacity: 0.9;
        }
        .info-ribbon-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: #FFFFFF;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        .info-ribbon-text {
          display: flex;
          flex-direction: column;
        }
        .info-ribbon-label {
          font-size: 0.74rem;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 0.04em;
        }
        .info-ribbon-val {
          font-family: var(--font-heading);
          font-size: 1rem;
          font-weight: 800;
          color: #FFFFFF;
          line-height: 1.15;
        }

        @media (max-width: 992px) {
          .info-ribbon-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }
        }
        @media (max-width: 580px) {
          .info-ribbon-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
      `}</style>
    </section>
  );
}
