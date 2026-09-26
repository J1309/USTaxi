import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ChevronDown 
} from 'lucide-react';
import { OWNER_PHONE_RAW } from '../utils/whatsapp';

export default function BookingWidget({ preselectedVehicle = 'suburban', onSelectVehicle }) {
  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const [serviceType, setServiceType] = useState('Airport Transfer');
  const [vehicle, setVehicle] = useState(preselectedVehicle || 'suburban');
  const [passengers, setPassengers] = useState('1');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if preselectedVehicle changes from outside (e.g. Fleet section)
  React.useEffect(() => {
    if (preselectedVehicle) {
      setVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  const handleQuickAirport = (loc) => {
    setPickupLocation(loc);
  };

  const handleQuickDropoff = (loc) => {
    setDropoffLocation(loc);
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
        ? 'Chevrolet Suburban High Country (SUV · Up to 7 Pax)'
        : 'Lexus Luxury Sedan (Executive Sedan · Up to 4 Pax)';

    const messageLines = [
      `*NEW RIDE INQUIRY - LAVENDER TAXI*`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `*Service Type:* ${serviceType}`,
      `*Selected Vehicle:* ${vehicleName}`,
      `*Passengers:* ${passengers} Passenger(s)`,
      `*Pickup Location:* ${pickupLocation}`,
      `*Drop-off Location:* ${dropoffLocation || 'To be specified'}`,
      `*Date:* ${pickupDate || 'Today / ASAP'}`,
      `*Time:* ${pickupTime || 'Immediate'}`,
      `━━━━━━━━━━━━━━━━━━━━`,
      `_Please confirm availability and upfront flat rate dispatch._`,
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
        
        {/* Datalist suggestions for easy one-click Houston locations */}
        <datalist id="houston-pickup-suggestions">
          <option value="George Bush Intercontinental Airport (IAH)" />
          <option value="William P. Hobby Airport (HOU)" />
          <option value="Downtown Houston - Convention Center & Hotels" />
          <option value="The Galleria / Uptown Houston" />
          <option value="Texas Medical Center (TMC)" />
          <option value="The Woodlands / Spring" />
          <option value="Sugar Land / First Colony" />
          <option value="Katy / Cinco Ranch" />
        </datalist>

        <datalist id="houston-dropoff-suggestions">
          <option value="George Bush Intercontinental Airport (IAH)" />
          <option value="William P. Hobby Airport (HOU)" />
          <option value="Galveston Cruise Terminal (Royal Caribbean / Carnival / Disney)" />
          <option value="Downtown Houston - Minute Maid Park & George R. Brown" />
          <option value="The Galleria / Post Oak Hotel" />
          <option value="NRG Stadium / Medical Center" />
          <option value="Space Center Houston / NASA Johnson Space Center" />
        </datalist>

        {/* Unified Horizontal Form */}
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
              list="houston-pickup-suggestions"
              placeholder="Airport, address or hotel"
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
                IAH Airport
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickAirport('Hobby Airport (HOU)')}
              >
                HOU Airport
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
              list="houston-dropoff-suggestions"
              placeholder="Destination, cruise port, address"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              className="field-text-input"
            />
            <div className="field-chips-row">
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickDropoff('Downtown Houston')}
              >
                Downtown
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickDropoff('Galveston Cruise Terminal')}
              >
                Galveston Port
              </button>
            </div>
          </div>

          {/* 3. Service Type Dropdown */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-service-type">
              <ShieldCheck size={14} color="#E88C2B" />
              <span>Service Type</span>
            </label>
            <div className="styled-select-wrap">
              <select
                id="floating-service-type"
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="field-select-luxury"
              >
                <option value="Airport Transfer">Airport Transfer (IAH & Hobby HOU)</option>
                <option value="Point-to-Point City Ride">City Ride (Downtown / Galleria / TMC)</option>
                <option value="Galveston Cruise Port">Galveston Cruise Port (Direct Non-Surge)</option>
                <option value="Hourly Chauffeur Service">Hourly Chauffeur (As-Directed)</option>
                <option value="Corporate Executive Travel">Corporate Travel (Executive Roadshow)</option>
                <option value="Child Safety Car Seat Travel">Child Safety Ride (Sanitized Car Seats)</option>
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>
          </div>

          {/* 4. Date & Time Dual Pickers */}
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
                aria-label="Pickup Date"
              />
              <input
                type="time"
                value={pickupTime}
                onChange={(e) => setPickupTime(e.target.value)}
                className="field-text-input time-input"
                aria-label="Pickup Time"
              />
            </div>
          </div>

          {/* 5. Vehicle & Passengers Selection */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-vehicle">
              <Users size={14} color="#786C6A" />
              <span>Vehicle & Passengers</span>
            </label>
            <div className="vehicle-pax-dual-selects">
              <div className="styled-select-wrap">
                <select
                  id="floating-vehicle"
                  value={vehicle}
                  onChange={(e) => {
                    setVehicle(e.target.value);
                    if (onSelectVehicle) onSelectVehicle(e.target.value);
                  }}
                  className="field-select-luxury"
                  aria-label="Select Vehicle"
                >
                  <option value="suburban">Suburban High Country (SUV · 7 Pax)</option>
                  <option value="lexus">Lexus Luxury Sedan (Sedan · 4 Pax)</option>
                </select>
                <ChevronDown size={14} className="select-chevron" />
              </div>

              <div className="styled-select-wrap">
                <select
                  id="floating-passengers"
                  value={passengers}
                  onChange={(e) => {
                    const val = e.target.value;
                    setPassengers(val);
                    if (parseInt(val, 10) > 4) {
                      setVehicle('suburban');
                      if (onSelectVehicle) onSelectVehicle('suburban');
                    }
                  }}
                  className="field-select-luxury"
                  aria-label="Select Passengers"
                >
                  <option value="1">1 Passenger · Solo Executive</option>
                  <option value="2">2 Passengers · Couple / Exec</option>
                  <option value="3">3 Passengers · Small Group</option>
                  <option value="4">4 Passengers · Family Group</option>
                  <option value="5">5 Passengers (Suburban Only)</option>
                  <option value="6">6 Passengers (Suburban Only)</option>
                  <option value="7">7 Passengers (Max Suburban)</option>
                </select>
                <ChevronDown size={14} className="select-chevron" />
              </div>
            </div>
          </div>

          {/* 6. Submit Button */}
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
            <Check size={13} color="#E88C2B" />
            <span>FAA Flight Radar Tracking</span>
          </div>
          <div className="footnote-item">
            <Check size={13} color="#E88C2B" />
            <span>Guaranteed Flat Upfront Rates</span>
          </div>
          <div className="footnote-item">
            <Check size={13} color="#E88C2B" />
            <span>Sanitized Child Car Seats On Request</span>
          </div>
          <div className="footnote-item">
            <Check size={13} color="#E88C2B" />
            <span>Direct Dispatch with Owner Symanthan</span>
          </div>
        </div>
      </div>

      <style>{`
        .floating-booking-wrapper {
          width: 100%;
          max-width: 1320px;
          margin: 0 auto;
          position: relative;
          z-index: 20;
          padding: 0 16px;
        }

        .booking-card-floating {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.10);
          border-top: 3.5px solid #E88C2B;
          border-radius: 20px;
          box-shadow: 0 20px 50px -10px rgba(78, 4, 1, 0.12), 0 8px 24px rgba(0, 0, 0, 0.04);
          padding: 0;
          overflow: hidden;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        /* Horizontal Form Grid */
        .booking-horizontal-form {
          display: grid;
          grid-template-columns: 1.25fr 1.25fr 1.25fr 1.05fr 1.35fr auto;
          gap: 16px;
          padding: 24px 28px;
          align-items: center;
        }

        .booking-field-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
          text-align: left;
          border-right: 1px solid rgba(78, 4, 1, 0.08);
          padding-right: 16px;
          min-width: 0;
        }

        .field-top-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #786C6A;
          white-space: nowrap;
        }

        .field-text-input {
          width: 100%;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 600;
          color: #1C0C0B;
          background: transparent;
          padding: 5px 0;
          text-overflow: ellipsis;
        }

        .field-text-input::placeholder {
          color: #A39694;
          font-weight: 500;
        }

        .field-text-input:focus {
          color: #4E0401;
        }

        /* Styled Luxury Dropdowns */
        .styled-select-wrap {
          position: relative;
          width: 100%;
          display: flex;
          align-items: center;
        }

        .field-select-luxury {
          width: 100%;
          appearance: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 700;
          color: #1C0C0B;
          padding: 5px 22px 5px 0;
          cursor: pointer;
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          transition: color 0.15s ease;
        }

        .field-select-luxury:hover {
          color: #E88C2B;
        }

        .field-select-luxury:focus {
          color: #4E0401;
        }

        .field-select-luxury option {
          background-color: #FFFFFF;
          color: #1C0C0B;
          font-weight: 600;
          padding: 10px;
        }

        .select-chevron {
          position: absolute;
          right: 2px;
          pointer-events: none;
          color: #E88C2B;
          flex-shrink: 0;
        }

        /* Dual Inputs: Date & Time */
        .date-time-dual-inputs {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .date-input {
          flex: 1.35;
          font-size: 0.86rem;
        }

        .time-input {
          flex: 1;
          font-size: 0.86rem;
        }

        /* Dual Selects: Vehicle & Passengers */
        .vehicle-pax-dual-selects {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        /* Quick Chip Helpers */
        .field-chips-row {
          display: flex;
          align-items: center;
          gap: 5px;
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
          white-space: nowrap;
        }

        .chip-tag:hover {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        /* Submit Button */
        .booking-submit-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 4px;
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
          padding: 16px 26px;
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
          border-top: 1px solid rgba(78, 4, 1, 0.06);
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
        @media (max-width: 1200px) {
          .booking-horizontal-form {
            grid-template-columns: 1fr 1fr 1fr;
            gap: 18px;
          }
          .booking-field-col {
            border-right: none;
            border-bottom: 1px solid rgba(78, 4, 1, 0.06);
            padding-bottom: 12px;
            padding-right: 0;
          }
          .booking-submit-col {
            grid-column: span 3;
          }
          .booking-action-btn-gold {
            width: 100%;
          }
        }

        @media (max-width: 768px) {
          .booking-horizontal-form {
            grid-template-columns: 1fr;
            padding: 20px 18px;
            gap: 16px;
          }
          .booking-submit-col {
            grid-column: span 1;
          }
          .booking-trust-footnote {
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
            padding: 14px 20px;
          }
        }
      `}</style>
    </div>
  );
}
