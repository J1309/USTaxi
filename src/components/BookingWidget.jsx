import React, { useState } from 'react';
import { MapPin, Calendar, Users, ArrowRight, Plane, Clock, ShieldCheck, Check } from 'lucide-react';
import { OWNER_PHONE_RAW } from '../utils/whatsapp';

export default function BookingWidget({ preselectedVehicle = 'suburban', onSelectVehicle }) {
  const [activeTab, setActiveTab] = useState('Book a Ride');
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [passengers, setPassengers] = useState('1');
  const [vehicle, setVehicle] = useState(preselectedVehicle || 'suburban');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if preselectedVehicle changes
  React.useEffect(() => {
    if (preselectedVehicle) {
      setVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  const TABS = [
    'Book a Ride',
    'Airport Transfer',
    'Hourly Hire',
    'Corporate Travel',
  ];

  const handleQuickAirport = (loc) => {
    setPickupLocation(loc);
  };

  const handleBookNow = (e) => {
    if (e) e.preventDefault();
    if (!pickupLocation) {
      alert('Please enter a pickup location.');
      return;
    }

    setIsSubmitting(true);

    const vehicleName =
      vehicle === 'suburban'
        ? 'Chevrolet Suburban High Country (SUV)'
        : 'Lexus Luxury Sedan';

    const messageLines = [
      `*NEW RIDE INQUIRY - LAVENDER TAXI*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Service Type:* ${activeTab}`,
      `*Selected Vehicle:* ${vehicleName}`,
      `*Pickup Location:* ${pickupLocation}`,
      `*Drop-off Location:* ${dropoffLocation || 'To be specified'}`,
      `*Date:* ${pickupDate || 'Today / ASAP'}`,
      `*Time:* ${pickupTime || 'Immediate'}`,
      `*Passengers:* ${passengers}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Please confirm availability and dispatch details._`,
    ];

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    const targetUrl = `https://wa.me/${OWNER_PHONE_RAW}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 350);
  };

  return (
    <div className="floating-booking-wrapper" id="booking-engine">
      <div className="booking-card-floating">
        {/* Top Tabs Row */}
        <div className="booking-tabs-header">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              className={`booking-nav-tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Horizontal Form Row */}
        <form onSubmit={handleBookNow} className="booking-horizontal-form">
          {/* 1. Pickup Location */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-pickup">
              <MapPin size={14} color="#E88C2B" />
              <span>Pickup Location</span>
            </label>
            <input
              id="floating-pickup"
              type="text"
              required
              placeholder="Enter pickup location"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="field-text-input"
            />
            <div className="field-chips-row">
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickAirport('IAH Airport (Bush)')}
              >
                IAH
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickAirport('Hobby Airport (HOU)')}
              >
                HOU
              </button>
            </div>
          </div>

          {/* 2. Drop-off Location */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-dropoff">
              <MapPin size={14} color="#786C6A" />
              <span>Drop-off Location</span>
            </label>
            <input
              id="floating-dropoff"
              type="text"
              placeholder="Enter destination"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="field-text-input"
            />
            <div className="field-chips-row">
              <button
                type="button"
                className="chip-tag"
                onClick={() => setDropoffLocation('Downtown Houston')}
              >
                Downtown
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => setDropoffLocation('Galveston Cruise Port')}
              >
                Galveston
              </button>
            </div>
          </div>

          {/* 3. Date & Time */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-date">
              <Calendar size={14} color="#786C6A" />
              <span>Date & Time</span>
            </label>
            <div className="date-time-dual-inputs">
              <input
                id="floating-date"
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="field-text-input date-input"
              />
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="field-text-input time-input"
              />
            </div>
          </div>

          {/* 4. Passengers & Vehicle */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-passengers">
              <Users size={14} color="#786C6A" />
              <span>Passengers</span>
            </label>
            <select
              id="floating-passengers"
              value={passengers}
              onChange={(e) => {
                setPassengers(e.target.value);
                if (parseInt(e.target.value, 10) > 4) {
                  setVehicle('suburban');
                  if (onSelectVehicle) onSelectVehicle('suburban');
                }
              }}
              className="field-text-input select-input"
            >
              <option value="1">1 Passenger</option>
              <option value="2">2 Passengers</option>
              <option value="3">3 Passengers</option>
              <option value="4">4 Passengers</option>
              <option value="5">5 Passengers (Suburban)</option>
              <option value="6">6 Passengers (Suburban)</option>
              <option value="7">7 Passengers (Suburban)</option>
            </select>
          </div>

          {/* 5. Submit Button */}
          <div className="booking-submit-col">
            <button
              type="submit"
              disabled={isSubmitting}
              className="booking-action-btn-gold"
            >
              <span>{isSubmitting ? 'Connecting...' : 'BOOK NOW'}</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </form>

        {/* Bottom Micro Trust Indicators */}
        <div className="booking-trust-footnote">
          <div className="footnote-item">
            <Check size={12} color="#E88C2B" />
            <span>FAA Flight Radar Tracking</span>
          </div>
          <div className="footnote-item">
            <Check size={12} color="#E88C2B" />
            <span>Guaranteed Flat Upfront Rates</span>
          </div>
          <div className="footnote-item">
            <Check size={12} color="#E88C2B" />
            <span>Child Car Seats Available</span>
          </div>
          <div className="footnote-item">
            <Check size={12} color="#E88C2B" />
            <span>Direct Dispatch with Owner Symanthan</span>
          </div>
        </div>
      </div>

      <style>{`
        .floating-booking-wrapper {
          width: 100%;
          max-width: 1240px;
          margin: 0 auto;
          position: relative;
          z-index: 20;
          padding: 0 16px;
        }

        .booking-card-floating {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 20px;
          box-shadow: 0 20px 50px -10px rgba(78, 4, 1, 0.12), 0 8px 24px rgba(0, 0, 0, 0.04);
          padding: 0;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        /* Top Tabs Row */
        .booking-tabs-header {
          display: flex;
          align-items: center;
          background: #F9F5EC;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          overflow-x: auto;
          scrollbar-width: none;
        }

        .booking-tabs-header::-webkit-scrollbar {
          display: none;
        }

        .booking-nav-tab {
          padding: 16px 28px;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          color: #786C6A;
          background: transparent;
          border: none;
          cursor: pointer;
          transition: all 0.18s ease;
          white-space: nowrap;
          border-right: 1px solid rgba(78, 4, 1, 0.06);
          position: relative;
        }

        .booking-nav-tab:hover {
          color: #4E0401;
          background: rgba(254, 251, 243, 0.6);
        }

        .booking-nav-tab.active {
          background: #FFFFFF;
          color: #4E0401;
          font-weight: 800;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
        }

        .booking-nav-tab.active::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 3px;
          background: #E88C2B;
        }

        /* Horizontal Form Row */
        .booking-horizontal-form {
          display: grid;
          grid-template-columns: 1.25fr 1.25fr 1.2fr 1fr auto;
          gap: 20px;
          padding: 24px 28px;
          align-items: center;
        }

        .booking-field-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
          border-right: 1px solid rgba(78, 4, 1, 0.06);
          padding-right: 16px;
        }

        .field-top-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #786C6A;
        }

        .field-text-input {
          width: 100%;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.95rem;
          font-weight: 600;
          color: #1C0C0B;
          background: transparent;
          padding: 4px 0;
        }

        .field-text-input::placeholder {
          color: #A39694;
          font-weight: 500;
        }

        .field-text-input:focus {
          color: #4E0401;
        }

        .date-time-dual-inputs {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .date-input {
          flex: 1.4;
          font-size: 0.88rem;
        }

        .time-input {
          flex: 1;
          font-size: 0.88rem;
        }

        .select-input {
          cursor: pointer;
          background: transparent;
          font-weight: 600;
        }

        .field-chips-row {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-top: 2px;
        }

        .chip-tag {
          font-size: 0.68rem;
          font-weight: 700;
          background: #FDF3E7;
          color: #E88C2B;
          border: 1px solid rgba(232, 140, 43, 0.3);
          border-radius: 4px;
          padding: 2px 7px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .chip-tag:hover {
          background: #E88C2B;
          color: #FFFFFF;
        }

        /* Submit Button */
        .booking-submit-col {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .booking-action-btn-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          padding: 16px 28px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.38);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .booking-action-btn-gold:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 10px 24px rgba(232, 140, 43, 0.45);
        }

        .booking-action-btn-gold:active {
          transform: translateY(0);
        }

        /* Footnote */
        .booking-trust-footnote {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 12px 28px;
          background: #FEFBF3;
          border-top: 1px solid rgba(78, 4, 1, 0.05);
          flex-wrap: wrap;
          gap: 12px;
        }

        .footnote-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 700;
          color: #4A3E3D;
        }

        /* Responsive Breakpoints */
        @media (max-width: 1080px) {
          .booking-horizontal-form {
            grid-template-columns: 1fr 1fr;
            gap: 18px;
          }
          .booking-field-col {
            border-right: none;
            border-bottom: 1px solid rgba(78, 4, 1, 0.06);
            padding-bottom: 12px;
            padding-right: 0;
          }
          .booking-submit-col {
            grid-column: span 2;
          }
          .booking-action-btn-gold {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .booking-horizontal-form {
            grid-template-columns: 1fr;
            padding: 18px;
          }
          .booking-submit-col {
            grid-column: span 1;
          }
          .booking-trust-footnote {
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
