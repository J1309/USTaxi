import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  Sparkles, 
  ChevronDown, 
  ArrowLeftRight, 
  Plane, 
  Baby, 
  Phone, 
  MessageCircle,
  X as ClearIcon
} from 'lucide-react';
import { OWNER_PHONE_RAW, OWNER_PHONE_DISPLAY } from '../utils/whatsapp';

export default function BookingWidget({ preselectedVehicle = 'suburban', onSelectVehicle }) {
  // Today's date in YYYY-MM-DD for min date attribute
  const todayStr = new Date().toISOString().split('T')[0];

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('');
  const [serviceType, setServiceType] = useState('Airport Transfer');
  const [vehicle, setVehicle] = useState(preselectedVehicle || 'suburban');
  const [passengers, setPassengers] = useState('1');
  const [flightNumber, setFlightNumber] = useState('');
  const [needChildSeat, setNeedChildSeat] = useState(false);
  const [childSeatType, setChildSeatType] = useState('Toddler / Forward-Facing (2+ yrs)');
  const [showFlightField, setShowFlightField] = useState(true);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync if preselectedVehicle changes from outside (e.g. Fleet section)
  React.useEffect(() => {
    if (preselectedVehicle) {
      setVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  // Handle vehicle toggle from widget header
  const handleVehicleChange = (vId) => {
    setVehicle(vId);
    if (onSelectVehicle) onSelectVehicle(vId);
    // If user selected Lexus but has > 4 passengers, adjust passenger count
    if (vId === 'lexus' && parseInt(passengers, 10) > 4) {
      setPassengers('4');
    }
  };

  // Swap pickup & drop-off locations
  const handleSwapLocations = (e) => {
    e.preventDefault();
    const temp = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(temp);
  };

  const handleQuickAirport = (loc) => {
    setPickupLocation(loc);
    setValidationError('');
  };

  const handleQuickDropoff = (loc) => {
    setDropoffLocation(loc);
  };

  const handleBookNow = (e) => {
    if (e) e.preventDefault();
    if (!pickupLocation.trim()) {
      setValidationError('Please enter a pickup location to continue.');
      const el = document.getElementById('floating-pickup');
      if (el) el.focus();
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    const vehicleName =
      vehicle === 'suburban'
        ? 'Chevrolet Suburban High Country (SUV · Up to 7 Pax · 6 Bags)'
        : 'Lexus Luxury Sedan (Executive Sedan · Up to 4 Pax · 3 Bags)';

    const messageLines = [
      `*NEW RIDE INQUIRY — LAVENDER TAXI SERVICE*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Selected Vehicle:* ${vehicleName}`,
      `*Service Type:* ${serviceType}`,
      `*Passengers:* ${passengers} Passenger(s)`,
      `*Pickup Location:* ${pickupLocation}`,
      `*Drop-off Location:* ${dropoffLocation || 'To be specified'}`,
      `*Date:* ${pickupDate || 'Today / ASAP'}`,
      `*Pickup Time:* ${pickupTime || 'Immediate / ASAP'}`,
    ];

    if (flightNumber.trim()) {
      messageLines.push(`*Flight Tail #:* ${flightNumber.trim()} (Radar Tracking)`);
    }

    if (needChildSeat) {
      messageLines.push(`*Child Safety Seat:* Requested (${childSeatType})`);
    }

    messageLines.push(
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Please confirm availability and dispatch details with owner Symanthan._`
    );

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
        
        {/* Datalist autocomplete for Greater Houston's prime hubs */}
        <datalist id="houston-pickup-suggestions">
          <option value="George Bush Intercontinental Airport (IAH) - Terminal Curbside" />
          <option value="William P. Hobby Airport (HOU) - Terminal Curbside" />
          <option value="Downtown Houston - Convention District & Hotels" />
          <option value="The Galleria / Uptown Houston - Post Oak" />
          <option value="Texas Medical Center (TMC) - Hospitals & Clinics" />
          <option value="The Woodlands / Spring - Waterway" />
          <option value="Sugar Land / First Colony - Town Center" />
          <option value="Katy / Cinco Ranch - West Houston" />
        </datalist>

        <datalist id="houston-dropoff-suggestions">
          <option value="George Bush Intercontinental Airport (IAH)" />
          <option value="William P. Hobby Airport (HOU)" />
          <option value="Galveston Cruise Terminal (Royal Caribbean / Carnival / Disney)" />
          <option value="Downtown Houston - Minute Maid Park & Toyota Center" />
          <option value="The Galleria / Post Oak Hotel" />
          <option value="Texas Medical Center (TMC)" />
          <option value="Space Center Houston / NASA Johnson Space Center" />
          <option value="NRG Stadium / Astrodome" />
        </datalist>

        {/* 1. TOP EXECUTIVE HEADER BAR */}
        <div className="booking-top-status-bar">
          <div className="status-bar-left">
            <span className="live-status-pill">
              <span className="live-pulse-dot" />
              <span>LIVE DISPATCH • OWNER SYMANTHAN ACTIVE</span>
            </span>
            <span className="flat-rate-badge">100% Guaranteed Flat Rates • Zero Surge Ever</span>
          </div>

          {/* Interactive Vehicle Switcher */}
          <div className="vehicle-pill-switcher" role="radiogroup" aria-label="Select Vehicle Type">
            <button
              type="button"
              role="radio"
              aria-checked={vehicle === 'suburban'}
              onClick={() => handleVehicleChange('suburban')}
              className={`vehicle-pill-btn ${vehicle === 'suburban' ? 'active' : ''}`}
            >
              <Sparkles size={13} color={vehicle === 'suburban' ? '#E88C2B' : '#786C6A'} />
              <span>Chevrolet Suburban</span>
              <span className="pill-capacity-tag">7 Pax</span>
            </button>
            <button
              type="button"
              role="radio"
              aria-checked={vehicle === 'lexus'}
              onClick={() => handleVehicleChange('lexus')}
              className={`vehicle-pill-btn ${vehicle === 'lexus' ? 'active' : ''}`}
            >
              <span>Lexus Luxury Sedan</span>
              <span className="pill-capacity-tag">4 Pax</span>
            </button>
          </div>
        </div>

        {/* 2. UNIFIED HIGH-PERFORMANCE BOOKING FORM */}
        <form onSubmit={handleBookNow} className="booking-horizontal-form" noValidate>
          
          {/* FIELD 1: Pickup Location */}
          <div className={`booking-field-col ${validationError ? 'has-error' : ''}`}>
            <div className="field-header-row">
              <label className="field-top-label" htmlFor="floating-pickup">
                <MapPin size={14} color="#E88C2B" />
                <span>Pickup Location</span>
              </label>
              {pickupLocation && (
                <button
                  type="button"
                  onClick={() => setPickupLocation('')}
                  className="field-clear-btn"
                  title="Clear location"
                  aria-label="Clear pickup location"
                >
                  <ClearIcon size={12} />
                </button>
              )}
            </div>

            <div className="field-input-box">
              <input
                id="floating-pickup"
                type="text"
                required
                list="houston-pickup-suggestions"
                placeholder="Airport terminal, address or hotel"
                value={pickupLocation}
                onChange={(e) => {
                  setPickupLocation(e.target.value);
                  if (validationError) setValidationError('');
                }}
                className="field-text-input"
              />
            </div>

            {/* Quick Location Chips */}
            <div className="field-chips-row">
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickAirport('IAH Airport (Bush)')}
              >
                + IAH Airport
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickAirport('Hobby Airport (HOU)')}
              >
                + HOU Airport
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickAirport('Downtown Houston')}
              >
                + Downtown
              </button>
            </div>
          </div>

          {/* SWAP LOCATIONS BUTTON */}
          <div className="swap-locations-col">
            <button
              type="button"
              onClick={handleSwapLocations}
              className="btn-swap-locations"
              title="Swap Pickup and Drop-off locations"
              aria-label="Swap pickup and drop-off locations"
            >
              <ArrowLeftRight size={15} />
            </button>
          </div>

          {/* FIELD 2: Drop-off Location */}
          <div className="booking-field-col">
            <div className="field-header-row">
              <label className="field-top-label" htmlFor="floating-dropoff">
                <MapPin size={14} color="#786C6A" />
                <span>Drop-off Location</span>
              </label>
              {dropoffLocation && (
                <button
                  type="button"
                  onClick={() => setDropoffLocation('')}
                  className="field-clear-btn"
                  title="Clear location"
                  aria-label="Clear drop-off location"
                >
                  <ClearIcon size={12} />
                </button>
              )}
            </div>

            <div className="field-input-box">
              <input
                id="floating-dropoff"
                type="text"
                list="houston-dropoff-suggestions"
                placeholder="Destination, cruise port, hospital"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                className="field-text-input"
              />
            </div>

            {/* Quick Destination Chips */}
            <div className="field-chips-row">
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickDropoff('Galveston Cruise Terminal')}
              >
                + Galveston Port
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickDropoff('Downtown Houston')}
              >
                + Downtown
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => handleQuickDropoff('Texas Medical Center (TMC)')}
              >
                + TMC
              </button>
            </div>
          </div>

          {/* FIELD 3: Date & Pickup Time */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-date">
              <Calendar size={14} color="#786C6A" />
              <span>Date & Pickup Time</span>
            </label>

            <div className="date-time-dual-inputs">
              <div className="date-input-wrapper">
                <input
                  id="floating-date"
                  type="date"
                  min={todayStr}
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="field-text-input date-input"
                  aria-label="Pickup Date"
                />
              </div>

              <div className="time-input-wrapper">
                <input
                  type="time"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                  className="field-text-input time-input"
                  aria-label="Pickup Time"
                />
              </div>
            </div>

            <div className="field-chips-row">
              <button
                type="button"
                className="chip-tag"
                onClick={() => {
                  setPickupDate(todayStr);
                  setPickupTime('');
                }}
              >
                Today / ASAP
              </button>
              <button
                type="button"
                className="chip-tag"
                onClick={() => setShowFlightField(!showFlightField)}
              >
                {showFlightField ? 'Hide Flight #' : '+ Add Flight #'}
              </button>
            </div>
          </div>

          {/* FIELD 4: Service Type Dropdown */}
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

            <div className="vehicle-perk-summary">
              {vehicle === 'suburban' ? (
                <span>SUV · Up to 7 Passengers · 6 Bags</span>
              ) : (
                <span>Sedan · Up to 4 Passengers · 3 Bags</span>
              )}
            </div>
          </div>

          {/* FIELD 5: Passengers & Luggage Dropdown */}
          <div className="booking-field-col">
            <label className="field-top-label" htmlFor="floating-passengers">
              <Users size={14} color="#786C6A" />
              <span>Passengers & Luggage</span>
            </label>
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
                <option value="1">1 Passenger · Solo Executive (Up to 3 Bags)</option>
                <option value="2">2 Passengers · Couple / Executive (Up to 4 Bags)</option>
                <option value="3">3 Passengers · Small Group (Up to 4 Bags)</option>
                <option value="4">4 Passengers · Family / Group (Up to 4 Bags)</option>
                <option value="5">5 Passengers (Suburban High Country Only)</option>
                <option value="6">6 Passengers (Suburban High Country Only)</option>
                <option value="7">7 Passengers (Maximum Suburban Capacity)</option>
              </select>
              <ChevronDown size={14} className="select-chevron" />
            </div>

            <div className="seat-option-link">
              <button
                type="button"
                className="carseat-toggle-btn"
                onClick={() => setNeedChildSeat(!needChildSeat)}
              >
                <Baby size={12} color="#E88C2B" />
                <span>{needChildSeat ? 'Child Seat Added ✓' : '+ Add Child Seat'}</span>
              </button>
            </div>
          </div>

          {/* FIELD 6: Instant Dispatch Submit Button */}
          <div className="booking-submit-col">
            <button
              type="submit"
              disabled={isSubmitting}
              className="booking-action-btn-gold"
              title="Dispatch directly to owner Symanthan via WhatsApp"
            >
              <div className="btn-main-label">
                <span>{isSubmitting ? 'DISPATCHING...' : 'DISPATCH RIDE'}</span>
                <ArrowRight size={16} />
              </div>
              <span className="btn-sub-label">Instant WhatsApp Confirmation</span>
            </button>
          </div>

        </form>

        {/* 3. OPTIONAL EXPANDED SPECIFICATION DRAWER (Flight Tracker & Child Car Seats) */}
        {(showFlightField || needChildSeat || validationError) && (
          <div className="booking-extra-drawer">
            {validationError && (
              <div className="validation-error-alert" role="alert">
                <span>⚠️ {validationError}</span>
              </div>
            )}

            <div className="extra-drawer-grid">
              {showFlightField && (
                <div className="extra-drawer-item">
                  <div className="drawer-label">
                    <Plane size={14} color="#E88C2B" />
                    <span>Flight Tail Number (Optional for FAA Live Radar Tracking)</span>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. UA 1422, WN 849, DL 2209"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="extra-drawer-input"
                  />
                  <span className="drawer-sub-hint">We track delays live with zero waiting fees.</span>
                </div>
              )}

              {needChildSeat && (
                <div className="extra-drawer-item">
                  <div className="drawer-label">
                    <Baby size={14} color="#E88C2B" />
                    <span>Sanitized Child Car Seat Specification</span>
                  </div>
                  <div className="styled-select-wrap">
                    <select
                      value={childSeatType}
                      onChange={(e) => setChildSeatType(e.target.value)}
                      className="field-select-luxury extra-select"
                    >
                      <option value="Infant / Rear-Facing Seat (0-1 yr)">Infant / Rear-Facing Seat (0-1 yr)</option>
                      <option value="Toddler / Forward-Facing (2-4 yrs)">Toddler / Forward-Facing (2-4 yrs)</option>
                      <option value="Booster Seat (4+ yrs)">Booster Seat (4+ yrs)</option>
                      <option value="2 Child Seats (Infant + Booster)">2 Child Seats (Infant + Booster)</option>
                    </select>
                    <ChevronDown size={14} className="select-chevron" />
                  </div>
                  <span className="drawer-sub-hint">Steam detailed & sanitized before your arrival.</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* 4. BOTTOM LUXURY TRUST FOOTNOTE */}
        <div className="booking-trust-footnote">
          <div className="footnote-item">
            <Check size={13} color="#E88C2B" />
            <span>FAA Live Flight Radar Tracking</span>
          </div>
          <div className="footnote-item">
            <Check size={13} color="#E88C2B" />
            <span>Guaranteed Flat Upfront Rate (Zero Surge)</span>
          </div>
          <div className="footnote-item">
            <Check size={13} color="#E88C2B" />
            <span>Chilled Bottled Spring Water & Wi-Fi</span>
          </div>
          <div className="footnote-item">
            <Check size={13} color="#E88C2B" />
            <span>Direct Line to Owner Symanthan: {OWNER_PHONE_DISPLAY}</span>
          </div>
        </div>

      </div>

      <style>{`
        /* ==========================================================================
           LUXURY BOOKING ENGINE — Bespoke Executive Chauffeur Interface
           Palette: Calming White #FEFBF3 | Dark Maroon #4E0401 | Orange Grove #E88C2B
           ========================================================================== */
        .floating-booking-wrapper {
          width: 100%;
          max-width: 1360px;
          margin: 0 auto;
          position: relative;
          z-index: 25;
          padding: 0 16px;
        }

        .booking-card-floating {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.12);
          border-radius: 24px;
          box-shadow: 
            0 24px 60px -12px rgba(78, 4, 1, 0.14),
            0 8px 24px -4px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        /* --------------------------------------------------------------------------
           1. TOP STATUS BAR & VEHICLE SWITCHER
           -------------------------------------------------------------------------- */
        .booking-top-status-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: #F9F5EC;
          border-bottom: 1px solid rgba(78, 4, 1, 0.08);
          padding: 12px 28px;
          gap: 16px;
          flex-wrap: wrap;
        }

        .status-bar-left {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .live-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255, 255, 255, 0.9);
          border: 1px solid rgba(78, 4, 1, 0.10);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          color: #4E0401;
        }

        .live-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 0 2px rgba(16, 185, 129, 0.35);
          animation: statusDotPulse 2s infinite;
        }

        @keyframes statusDotPulse {
          0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
          100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
        }

        .flat-rate-badge {
          font-size: 0.76rem;
          font-weight: 700;
          color: #786C6A;
        }

        /* Vehicle Switcher */
        .vehicle-pill-switcher {
          display: inline-flex;
          align-items: center;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.12);
          border-radius: 9999px;
          padding: 4px;
          gap: 4px;
        }

        .vehicle-pill-btn {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: transparent;
          border: none;
          color: #786C6A;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 6px 16px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .vehicle-pill-btn:hover {
          color: #4E0401;
        }

        .vehicle-pill-btn.active {
          background: #4E0401;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(78, 4, 1, 0.25);
        }

        .pill-capacity-tag {
          font-size: 0.68rem;
          font-weight: 800;
          padding: 2px 6px;
          border-radius: 9999px;
          background: rgba(232, 140, 43, 0.2);
          color: #E88C2B;
        }

        .vehicle-pill-btn.active .pill-capacity-tag {
          background: #E88C2B;
          color: #FFFFFF;
        }

        /* --------------------------------------------------------------------------
           2. UNIFIED HORIZONTAL FORM GRID
           -------------------------------------------------------------------------- */
        .booking-horizontal-form {
          display: grid;
          grid-template-columns: 1.35fr auto 1.35fr 1.15fr 1.25fr 1.35fr auto;
          gap: 14px;
          padding: 24px 28px;
          align-items: center;
        }

        .booking-field-col {
          display: flex;
          flex-direction: column;
          gap: 5px;
          text-align: left;
          border-right: 1px solid rgba(78, 4, 1, 0.08);
          padding-right: 14px;
          min-width: 0;
          position: relative;
        }

        .booking-field-col.has-error {
          border-color: #EF4444;
        }

        .field-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 6px;
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

        .field-clear-btn {
          color: #A39694;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 2px;
          display: flex;
          align-items: center;
          border-radius: 50%;
          transition: color 0.15s ease;
        }

        .field-clear-btn:hover {
          color: #4E0401;
        }

        .field-input-box {
          position: relative;
          width: 100%;
        }

        .field-text-input {
          width: 100%;
          border: none;
          outline: none;
          font-family: inherit;
          font-size: 0.94rem;
          font-weight: 700;
          color: #1C0C0B;
          background: transparent;
          padding: 5px 0;
          text-overflow: ellipsis;
        }

        .field-text-input::placeholder {
          color: #A39694;
          font-weight: 500;
          font-size: 0.88rem;
        }

        .field-text-input:focus {
          color: #4E0401;
        }

        /* Swap Button Column */
        .swap-locations-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0 4px;
        }

        .btn-swap-locations {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #F9F5EC;
          border: 1px solid rgba(78, 4, 1, 0.14);
          color: #4E0401;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-swap-locations:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
          transform: rotate(180deg);
        }

        /* Styled Dropdown Elements */
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
          font-size: 0.90rem;
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
          padding: 8px 12px;
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

        .date-input-wrapper {
          flex: 1.35;
        }

        .time-input-wrapper {
          flex: 1;
        }

        .date-input,
        .time-input {
          font-size: 0.88rem;
          font-weight: 600;
        }

        /* Quick Chips & Badges */
        .field-chips-row {
          display: flex;
          align-items: center;
          gap: 5px;
          margin-top: 3px;
          flex-wrap: wrap;
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

        .vehicle-perk-summary {
          font-size: 0.72rem;
          font-weight: 700;
          color: #786C6A;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .seat-option-link {
          margin-top: 2px;
        }

        .carseat-toggle-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.70rem;
          font-weight: 700;
          color: #E88C2B;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 2px 0;
          transition: color 0.15s ease;
        }

        .carseat-toggle-btn:hover {
          color: #D2791C;
          text-decoration: underline;
        }

        /* Submit Button Column */
        .booking-submit-col {
          display: flex;
          align-items: center;
          justify-content: center;
          padding-left: 6px;
        }

        .booking-action-btn-gold {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          padding: 14px 28px;
          border-radius: 14px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.40);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-main-label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.94rem;
          font-weight: 900;
          letter-spacing: 0.04em;
        }

        .btn-sub-label {
          font-size: 0.68rem;
          font-weight: 700;
          opacity: 0.92;
          margin-top: 2px;
        }

        .booking-action-btn-gold:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(232, 140, 43, 0.48);
        }

        .booking-action-btn-gold:active {
          transform: translateY(0);
        }

        /* --------------------------------------------------------------------------
           3. EXPANDED EXTRA SPECIFICATION DRAWER
           -------------------------------------------------------------------------- */
        .booking-extra-drawer {
          background: #FDFBF7;
          border-top: 1px dashed rgba(78, 4, 1, 0.12);
          padding: 16px 28px;
          animation: drawerSlideDown 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes drawerSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .validation-error-alert {
          background: #FEF2F2;
          border: 1px solid #FCA5A5;
          color: #B91C1C;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 8px 14px;
          border-radius: 8px;
          margin-bottom: 12px;
          text-align: left;
        }

        .extra-drawer-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          text-align: left;
        }

        .extra-drawer-item {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .drawer-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.74rem;
          font-weight: 800;
          color: #4E0401;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .extra-drawer-input {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.14);
          border-radius: 8px;
          padding: 8px 12px;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          color: #1C0C0B;
          outline: none;
          transition: border-color 0.15s ease;
        }

        .extra-drawer-input:focus {
          border-color: #E88C2B;
        }

        .extra-select {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.14);
          border-radius: 8px;
          padding: 8px 24px 8px 12px;
        }

        .drawer-sub-hint {
          font-size: 0.72rem;
          color: #786C6A;
        }

        /* --------------------------------------------------------------------------
           4. BOTTOM LUXURY TRUST FOOTNOTE
           -------------------------------------------------------------------------- */
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

        /* --------------------------------------------------------------------------
           RESPONSIVE BREAKPOINTS
           -------------------------------------------------------------------------- */
        @media (max-width: 1280px) {
          .booking-horizontal-form {
            grid-template-columns: 1fr auto 1fr 1fr;
            gap: 18px;
          }
          .swap-locations-col {
            display: flex;
          }
          .booking-submit-col {
            grid-column: span 4;
            padding-left: 0;
            margin-top: 4px;
          }
          .booking-action-btn-gold {
            width: 100%;
          }
          .booking-field-col {
            border-right: none;
            border-bottom: 1px solid rgba(78, 4, 1, 0.06);
            padding-bottom: 12px;
            padding-right: 0;
          }
        }

        @media (max-width: 820px) {
          .booking-top-status-bar {
            flex-direction: column;
            align-items: flex-start;
            padding: 14px 18px;
            gap: 12px;
          }
          .vehicle-pill-switcher {
            width: 100%;
          }
          .vehicle-pill-btn {
            flex: 1;
            justify-content: center;
          }
          .booking-horizontal-form {
            grid-template-columns: 1fr;
            padding: 20px 18px;
            gap: 16px;
          }
          .swap-locations-col {
            display: none;
          }
          .booking-submit-col {
            grid-column: span 1;
          }
          .extra-drawer-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }
          .booking-trust-footnote {
            flex-direction: column;
            align-items: flex-start;
            padding: 14px 18px;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
