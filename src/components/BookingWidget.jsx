import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Clock, 
  Users, 
  ArrowRight, 
  ShieldCheck, 
  Check, 
  ChevronDown, 
  ArrowLeftRight, 
  Baby, 
  Sparkles,
  Phone,
  Plane
} from 'lucide-react';
import { OWNER_PHONE_RAW, OWNER_PHONE_DISPLAY } from '../utils/whatsapp';

const TOP_PICKUPS = [
  { name: 'Bush Intercontinental Airport (IAH)', tag: 'IAH Airport' },
  { name: 'William P. Hobby Airport (HOU)', tag: 'Hobby Airport' },
  { name: 'Downtown Houston (Hotels & Convention)', tag: 'Downtown' },
  { name: 'The Galleria / Post Oak Hotel (Uptown)', tag: 'Galleria' },
  { name: 'Texas Medical Center (TMC)', tag: 'Medical' },
  { name: 'The Woodlands / Spring', tag: 'North' },
  { name: 'Galveston Cruise Terminal', tag: 'Cruise Port' },
];

const TOP_DROPOFFS = [
  { name: 'Galveston Cruise Terminal (Pier 25 & 10)', tag: 'Cruise Port' },
  { name: 'Bush Intercontinental Airport (IAH)', tag: 'IAH Airport' },
  { name: 'William P. Hobby Airport (HOU)', tag: 'Hobby Airport' },
  { name: 'Downtown Houston (Hotels / Toyota Center)', tag: 'Downtown' },
  { name: 'The Galleria / Uptown Houston', tag: 'Galleria' },
  { name: 'Texas Medical Center (TMC)', tag: 'Medical' },
  { name: 'Space Center Houston (NASA)', tag: 'NASA' },
];

export default function BookingWidget({ preselectedVehicle = 'suburban', onSelectVehicle }) {
  const todayStr = new Date().toISOString().split('T')[0];
  const tomorrowStr = new Date(Date.now() + 86400000).toISOString().split('T')[0];

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('');
  const [vehicle, setVehicle] = useState(preselectedVehicle || 'suburban');
  const [passengers, setPassengers] = useState(1);
  const [needChildSeat, setNeedChildSeat] = useState(false);
  const [flightNumber, setFlightNumber] = useState('');
  const [activePopover, setActivePopover] = useState(null); // 'pickup' | 'dropoff' | 'datetime' | 'guests' | null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupError, setPickupError] = useState(false);

  const widgetRef = useRef(null);

  // Sync if preselectedVehicle changes from outside
  useEffect(() => {
    if (preselectedVehicle) {
      setVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  // Close popovers on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (widgetRef.current && !widgetRef.current.contains(event.target)) {
        setActivePopover(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Format date & time display for button/label
  const formatDateTimeDisplay = () => {
    if (!pickupDate) return 'Select Date & Time';

    let dayLabel = pickupDate;
    if (pickupDate === todayStr) {
      dayLabel = 'Today';
    } else if (pickupDate === tomorrowStr) {
      dayLabel = 'Tomorrow';
    } else {
      const parts = pickupDate.split('-');
      if (parts.length === 3) {
        const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
        dayLabel = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
      }
    }

    if (pickupTime) {
      const [h, m] = pickupTime.split(':');
      const hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${dayLabel}, ${hour12}:${m} ${ampm}`;
    }

    return `${dayLabel} · Flexible / ASAP`;
  };

  // Format vehicle & guests display
  const formatVehicleGuestsDisplay = () => {
    const vName = vehicle === 'suburban' ? 'Suburban SUV' : 'Lexus Sedan';
    const paxText = passengers === 1 ? '1 Guest' : `${passengers} Guests`;
    return `${vName} · ${paxText}${needChildSeat ? ' (Child Seat)' : ''}`;
  };

  const handleSwap = (e) => {
    e.stopPropagation();
    const temp = pickupLocation;
    setPickupLocation(dropoffLocation);
    setDropoffLocation(temp);
  };

  const handleSelectVehicle = (vId) => {
    setVehicle(vId);
    if (onSelectVehicle) onSelectVehicle(vId);
    if (vId === 'lexus' && passengers > 4) {
      setPassengers(4);
    }
  };

  const handleIncrementGuests = () => {
    const max = vehicle === 'suburban' ? 7 : 4;
    if (passengers < max) {
      setPassengers(passengers + 1);
    } else if (vehicle === 'lexus' && passengers === 4) {
      // Auto-switch to Suburban if adding 5th passenger
      setVehicle('suburban');
      if (onSelectVehicle) onSelectVehicle('suburban');
      setPassengers(5);
    }
  };

  const handleDecrementGuests = () => {
    if (passengers > 1) {
      setPassengers(passengers - 1);
    }
  };

  const handleBookNow = (e) => {
    if (e) e.preventDefault();
    if (!pickupLocation.trim()) {
      setPickupError(true);
      setActivePopover('pickup');
      return;
    }

    setPickupError(false);
    setIsSubmitting(true);

    const vehicleTitle =
      vehicle === 'suburban'
        ? 'Chevrolet Suburban High Country (SUV · Up to 7 Guests · 6 Bags)'
        : 'Lexus Luxury Sedan (Executive Sedan · Up to 4 Guests · 3 Bags)';

    const messageLines = [
      `*NEW RIDE INQUIRY — LAVENDER TAXI SERVICE*`,
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `*Vehicle:* ${vehicleTitle}`,
      `*Passengers:* ${passengers} Guest(s)`,
      `*Pickup Location:* ${pickupLocation}`,
      `*Drop-off Location:* ${dropoffLocation || 'To be determined'}`,
      `*Date & Time:* ${formatDateTimeDisplay()}`,
    ];

    if (flightNumber.trim()) {
      messageLines.push(`*Flight Tail #:* ${flightNumber.trim()} (Radar Tracked)`);
    }

    if (needChildSeat) {
      messageLines.push(`*Child Car Seat:* Requested (Sanitized upon request)`);
    }

    messageLines.push(
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Please confirm availability and upfront flat rate dispatch._`
    );

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    const targetUrl = `https://wa.me/${OWNER_PHONE_RAW}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 250);
  };

  return (
    <div className="floating-booking-wrapper" id="booking-engine" ref={widgetRef}>
      <div className="booking-card-floating">
        
        {/* Main 4-Column Luxury Bar */}
        <div className="booking-main-bar">
          
          {/* COLUMN 1: Pickup Location */}
          <div 
            className={`booking-col-item ${activePopover === 'pickup' ? 'active-col' : ''} ${pickupError ? 'error-col' : ''}`}
            onClick={() => {
              setActivePopover('pickup');
              setPickupError(false);
            }}
          >
            <div className="col-icon-wrap">
              <MapPin size={18} color="#E88C2B" />
            </div>
            <div className="col-text-wrap">
              <span className="col-label-title">Pickup Location</span>
              <input
                type="text"
                placeholder="Enter pickup address or airport"
                value={pickupLocation}
                onChange={(e) => {
                  setPickupLocation(e.target.value);
                  setPickupError(false);
                }}
                onFocus={() => setActivePopover('pickup')}
                className="col-transparent-input"
              />
            </div>

            {/* Quick Swap Icon (between Pickup & Dropoff) */}
            <button
              type="button"
              onClick={handleSwap}
              className="swap-icon-btn"
              title="Swap pickup and dropoff"
              aria-label="Swap pickup and dropoff locations"
            >
              <ArrowLeftRight size={13} />
            </button>

            {/* Dropdown Suggestions Popover */}
            {activePopover === 'pickup' && (
              <div className="luxury-popover-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="popover-header">Popular Houston Hubs</div>
                <div className="popover-list">
                  {TOP_PICKUPS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="popover-item-btn"
                      onClick={() => {
                        setPickupLocation(item.name);
                        setActivePopover('dropoff'); // Smooth focus transfer
                      }}
                    >
                      <MapPin size={14} color="#E88C2B" />
                      <span className="item-name">{item.name}</span>
                      <span className="item-tag">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COLUMN 2: Drop-off Location */}
          <div 
            className={`booking-col-item ${activePopover === 'dropoff' ? 'active-col' : ''}`}
            onClick={() => setActivePopover('dropoff')}
          >
            <div className="col-icon-wrap">
              <MapPin size={18} color="#786C6A" />
            </div>
            <div className="col-text-wrap">
              <span className="col-label-title">Drop-off Location</span>
              <input
                type="text"
                placeholder="Enter destination or cruise port"
                value={dropoffLocation}
                onChange={(e) => setDropoffLocation(e.target.value)}
                onFocus={() => setActivePopover('dropoff')}
                className="col-transparent-input"
              />
            </div>

            {/* Dropdown Suggestions Popover */}
            {activePopover === 'dropoff' && (
              <div className="luxury-popover-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="popover-header">Top Destinations</div>
                <div className="popover-list">
                  {TOP_DROPOFFS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="popover-item-btn"
                      onClick={() => {
                        setDropoffLocation(item.name);
                        setActivePopover('datetime');
                      }}
                    >
                      <MapPin size={14} color="#786C6A" />
                      <span className="item-name">{item.name}</span>
                      <span className="item-tag">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* COLUMN 3: Date & Time */}
          <div 
            className={`booking-col-item ${activePopover === 'datetime' ? 'active-col' : ''}`}
            onClick={() => setActivePopover(activePopover === 'datetime' ? null : 'datetime')}
          >
            <div className="col-icon-wrap">
              <Calendar size={18} color="#786C6A" />
            </div>
            <div className="col-text-wrap">
              <span className="col-label-title">Date & Time</span>
              <span className="col-value-preview">{formatDateTimeDisplay()}</span>
            </div>
            <ChevronDown size={14} className="col-chevron" />

            {/* Date & Time Luxury Popover */}
            {activePopover === 'datetime' && (
              <div className="luxury-popover-dropdown datetime-popover" onClick={(e) => e.stopPropagation()}>
                <div className="popover-header">Select Date & Time</div>
                
                {/* Date Quick Presets */}
                <div className="datetime-quick-row">
                  <button
                    type="button"
                    className={`date-preset-pill ${pickupDate === todayStr ? 'active' : ''}`}
                    onClick={() => setPickupDate(todayStr)}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className={`date-preset-pill ${pickupDate === tomorrowStr ? 'active' : ''}`}
                    onClick={() => setPickupDate(tomorrowStr)}
                  >
                    Tomorrow
                  </button>
                </div>

                {/* Calendar Date Picker */}
                <div className="popover-input-group">
                  <label className="popover-field-label">Calendar Date</label>
                  <input
                    type="date"
                    min={todayStr}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="popover-native-input"
                  />
                </div>

                {/* Time Picker */}
                <div className="popover-input-group">
                  <label className="popover-field-label">Pickup Time</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="popover-native-input"
                  />
                  <div className="quick-times-row">
                    <button type="button" onClick={() => setPickupTime('')} className="quick-time-chip">ASAP / Immediate</button>
                    <button type="button" onClick={() => setPickupTime('08:00')} className="quick-time-chip">08:00 AM</button>
                    <button type="button" onClick={() => setPickupTime('12:00')} className="quick-time-chip">12:00 PM</button>
                    <button type="button" onClick={() => setPickupTime('17:00')} className="quick-time-chip">05:00 PM</button>
                  </div>
                </div>

                {/* Optional Flight # Input */}
                <div className="popover-input-group">
                  <label className="popover-field-label">
                    <Plane size={12} color="#E88C2B" />
                    <span>Flight Tail # (FAA Radar Tracked)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. UA 1422 or WN 849"
                    value={flightNumber}
                    onChange={(e) => setFlightNumber(e.target.value)}
                    className="popover-text-input"
                  />
                </div>

                <button
                  type="button"
                  className="popover-done-btn"
                  onClick={() => setActivePopover('guests')}
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* COLUMN 4: Vehicle & Guests */}
          <div 
            className={`booking-col-item ${activePopover === 'guests' ? 'active-col' : ''}`}
            onClick={() => setActivePopover(activePopover === 'guests' ? null : 'guests')}
          >
            <div className="col-icon-wrap">
              <Users size={18} color="#786C6A" />
            </div>
            <div className="col-text-wrap">
              <span className="col-label-title">Vehicle & Guests</span>
              <span className="col-value-preview">{formatVehicleGuestsDisplay()}</span>
            </div>
            <ChevronDown size={14} className="col-chevron" />

            {/* Vehicle & Guests Luxury Popover */}
            {activePopover === 'guests' && (
              <div className="luxury-popover-dropdown guests-popover" onClick={(e) => e.stopPropagation()}>
                <div className="popover-header">Select Vehicle & Guests</div>

                {/* Vehicle Selection Cards */}
                <div className="popover-vehicles-stack">
                  <div
                    className={`vehicle-choice-card ${vehicle === 'suburban' ? 'selected' : ''}`}
                    onClick={() => handleSelectVehicle('suburban')}
                  >
                    <div className="choice-card-left">
                      <div className="choice-title-row">
                        <span className="choice-name">Chevrolet Suburban High Country</span>
                        <span className="choice-badge">Flagship SUV</span>
                      </div>
                      <span className="choice-meta">Up to 7 Guests · 6 Large Suitcases · All-Leather Cabin</span>
                    </div>
                    <div className="choice-check">
                      {vehicle === 'suburban' && <Check size={14} color="#FFFFFF" />}
                    </div>
                  </div>

                  <div
                    className={`vehicle-choice-card ${vehicle === 'lexus' ? 'selected' : ''}`}
                    onClick={() => handleSelectVehicle('lexus')}
                  >
                    <div className="choice-card-left">
                      <div className="choice-title-row">
                        <span className="choice-name">Lexus Luxury Sedan</span>
                        <span className="choice-badge">Executive Sedan</span>
                      </div>
                      <span className="choice-meta">Up to 4 Guests · 3 Suitcases · Whisper-Quiet Hybrid</span>
                    </div>
                    <div className="choice-check">
                      {vehicle === 'lexus' && <Check size={14} color="#FFFFFF" />}
                    </div>
                  </div>
                </div>

                {/* Passenger Stepper */}
                <div className="guests-stepper-row">
                  <div>
                    <span className="stepper-title">Passengers</span>
                    <span className="stepper-sub">{vehicle === 'suburban' ? 'Max 7 guests' : 'Max 4 guests'}</span>
                  </div>
                  <div className="stepper-controls">
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={handleDecrementGuests}
                      disabled={passengers <= 1}
                      aria-label="Decrease passengers"
                    >
                      −
                    </button>
                    <span className="stepper-count">{passengers}</span>
                    <button
                      type="button"
                      className="stepper-btn"
                      onClick={handleIncrementGuests}
                      aria-label="Increase passengers"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Child Car Seat Checkbox */}
                <div className="child-seat-choice-row" onClick={() => setNeedChildSeat(!needChildSeat)}>
                  <div className={`custom-checkbox ${needChildSeat ? 'checked' : ''}`}>
                    {needChildSeat && <Check size={12} color="#FFFFFF" />}
                  </div>
                  <div className="seat-choice-text">
                    <span className="seat-title">Sanitized Child Car Seat</span>
                    <span className="seat-sub">Infant, convertible, or booster installed upon request (Free)</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="popover-done-btn"
                  onClick={() => setActivePopover(null)}
                >
                  Confirm Selection
                </button>
              </div>
            )}
          </div>

          {/* COLUMN 5: Submit Button */}
          <div className="booking-btn-col">
            <button
              type="button"
              onClick={handleBookNow}
              disabled={isSubmitting}
              className="btn-book-now-gold"
            >
              <span>{isSubmitting ? 'CONNECTING...' : 'BOOK NOW'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </div>

        {/* Subtle Bottom Trust Bar */}
        <div className="booking-trust-strip">
          <div className="trust-strip-item">
            <Check size={13} color="#E88C2B" />
            <span>Guaranteed Flat Upfront Rate (Zero Surge)</span>
          </div>
          <div className="trust-strip-item">
            <Check size={13} color="#E88C2B" />
            <span>FAA Flight Delay Tracking with Zero Waiting Fees</span>
          </div>
          <div className="trust-strip-item">
            <Check size={13} color="#E88C2B" />
            <span>Sanitized Child Car Seats On Request</span>
          </div>
          <div className="trust-strip-item">
            <Check size={13} color="#E88C2B" />
            <span>Direct Line to Owner Symanthan: {OWNER_PHONE_DISPLAY}</span>
          </div>
        </div>

      </div>

      <style>{`
        /* ==========================================================================
           PERFECTED LUXURY BOOKING BAR
           Clean, quiet, floating executive card based on the Royal Ride reference.
           Palette: Calming White #FEFBF3 | Dark Maroon #4E0401 | Orange Grove #E88C2B
           ========================================================================== */
        .floating-booking-wrapper {
          width: 100%;
          max-width: 1260px;
          margin: 0 auto;
          position: relative;
          z-index: 40;
          padding: 0 16px;
        }

        .booking-card-floating {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.08);
          border-radius: 18px;
          box-shadow: 
            0 20px 48px -10px rgba(78, 4, 1, 0.10),
            0 4px 16px rgba(0, 0, 0, 0.04);
          overflow: visible;
          position: relative;
        }

        /* --------------------------------------------------------------------------
           MAIN 4-COLUMN BAR
           -------------------------------------------------------------------------- */
        .booking-main-bar {
          display: grid;
          grid-template-columns: 1.25fr 1.25fr 1.15fr 1.35fr auto;
          align-items: stretch;
          padding: 8px 12px;
          min-height: 84px;
        }

        .booking-col-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 18px;
          border-right: 1px solid rgba(78, 4, 1, 0.08);
          cursor: pointer;
          position: relative;
          transition: background 0.15s ease;
          border-radius: 12px;
        }

        .booking-col-item:hover {
          background: #FEFBF3;
        }

        .booking-col-item.active-col {
          background: #FDF9F0;
        }

        .booking-col-item.error-col {
          background: #FEF2F2;
          box-shadow: 0 0 0 1.5px #EF4444;
        }

        .col-icon-wrap {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }

        .col-text-wrap {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          text-align: left;
          flex: 1;
          min-width: 0;
        }

        .col-label-title {
          font-family: inherit;
          font-size: 0.76rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #4E0401;
          margin-bottom: 3px;
          white-space: nowrap;
        }

        .col-transparent-input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 0.92rem;
          font-weight: 600;
          color: #1C0C0B;
          padding: 0;
          text-overflow: ellipsis;
        }

        .col-transparent-input::placeholder {
          color: #8C7B79;
          font-weight: 500;
          font-size: 0.88rem;
        }

        .col-value-preview {
          font-size: 0.90rem;
          font-weight: 600;
          color: #1C0C0B;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          display: block;
          width: 100%;
        }

        .col-chevron {
          color: #A39694;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .booking-col-item.active-col .col-chevron {
          transform: rotate(180deg);
          color: #E88C2B;
        }

        /* Swap Icon Button */
        .swap-icon-btn {
          position: absolute;
          right: -13px;
          top: 50%;
          transform: translateY(-50%);
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.15);
          color: #786C6A;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          z-index: 5;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
          transition: all 0.2s ease;
        }

        .swap-icon-btn:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
          transform: translateY(-50%) rotate(180deg);
        }

        /* Submit Button Column */
        .booking-btn-col {
          display: flex;
          align-items: center;
          padding: 8px 12px;
        }

        .btn-book-now-gold {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.94rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 18px 36px;
          border-radius: 9999px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.38);
          transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .btn-book-now-gold:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 10px 28px rgba(232, 140, 43, 0.48);
        }

        .btn-book-now-gold:active {
          transform: translateY(0);
        }

        /* --------------------------------------------------------------------------
           LUXURY POPOVERS (SUGGESTIONS, DATE/TIME, GUESTS)
           -------------------------------------------------------------------------- */
        .luxury-popover-dropdown {
          position: absolute;
          top: calc(100% + 10px);
          left: 0;
          min-width: 320px;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.12);
          border-radius: 16px;
          box-shadow: 0 16px 36px rgba(78, 4, 1, 0.12), 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 16px;
          z-index: 100;
          animation: popoverFadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        @keyframes popoverFadeIn {
          from { opacity: 0; transform: translateY(-6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .popover-header {
          font-size: 0.74rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #786C6A;
          margin-bottom: 10px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(78, 4, 1, 0.06);
        }

        .popover-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .popover-item-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          background: transparent;
          border: none;
          padding: 8px 10px;
          border-radius: 8px;
          font-family: inherit;
          cursor: pointer;
          transition: background 0.12s ease;
          text-align: left;
          width: 100%;
        }

        .popover-item-btn:hover {
          background: #FDF9F0;
        }

        .item-name {
          font-size: 0.86rem;
          font-weight: 600;
          color: #1C0C0B;
          flex: 1;
        }

        .item-tag {
          font-size: 0.68rem;
          font-weight: 700;
          color: #E88C2B;
          background: #FDF3E7;
          padding: 2px 7px;
          border-radius: 4px;
          white-space: nowrap;
        }

        /* Date & Time Popover */
        .datetime-popover {
          min-width: 330px;
        }

        .datetime-quick-row {
          display: flex;
          gap: 8px;
          margin-bottom: 14px;
        }

        .date-preset-pill {
          flex: 1;
          background: #F9F5EC;
          border: 1px solid rgba(78, 4, 1, 0.10);
          color: #4E0401;
          font-family: inherit;
          font-size: 0.82rem;
          font-weight: 700;
          padding: 7px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .date-preset-pill.active {
          background: #4E0401;
          color: #FFFFFF;
          border-color: #4E0401;
        }

        .popover-input-group {
          margin-bottom: 12px;
        }

        .popover-field-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #786C6A;
          margin-bottom: 5px;
        }

        .popover-native-input,
        .popover-text-input {
          width: 100%;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.12);
          border-radius: 8px;
          padding: 9px 12px;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          color: #1C0C0B;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.15s ease;
        }

        .popover-native-input:focus,
        .popover-text-input:focus {
          border-color: #E88C2B;
        }

        .quick-times-row {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
          margin-top: 6px;
        }

        .quick-time-chip {
          background: #F9F5EC;
          border: 1px solid rgba(78, 4, 1, 0.08);
          font-size: 0.70rem;
          font-weight: 700;
          color: #4E0401;
          padding: 3px 8px;
          border-radius: 6px;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .quick-time-chip:hover {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        /* Vehicle & Guests Popover */
        .guests-popover {
          min-width: 360px;
          right: 0;
          left: auto;
        }

        .popover-vehicles-stack {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 16px;
        }

        .vehicle-choice-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 11px 14px;
          border-radius: 10px;
          background: #FEFBF3;
          border: 1.5px solid rgba(78, 4, 1, 0.10);
          cursor: pointer;
          transition: all 0.16s ease;
        }

        .vehicle-choice-card:hover {
          border-color: #E88C2B;
          background: #FDF9F0;
        }

        .vehicle-choice-card.selected {
          border-color: #E88C2B;
          background: #FDF3E7;
        }

        .choice-card-left {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }

        .choice-title-row {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .choice-name {
          font-size: 0.86rem;
          font-weight: 800;
          color: #4E0401;
        }

        .choice-badge {
          font-size: 0.66rem;
          font-weight: 800;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.12);
          color: #786C6A;
          padding: 2px 6px;
          border-radius: 4px;
        }

        .vehicle-choice-card.selected .choice-badge {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        .choice-meta {
          font-size: 0.74rem;
          color: #786C6A;
          font-weight: 600;
        }

        .choice-check {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: #E88C2B;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transform: scale(0.8);
          transition: all 0.15s ease;
        }

        .vehicle-choice-card.selected .choice-check {
          opacity: 1;
          transform: scale(1);
        }

        /* Passenger Stepper */
        .guests-stepper-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 14px;
          background: #FEFBF3;
          border-radius: 10px;
          border: 1px solid rgba(78, 4, 1, 0.08);
          margin-bottom: 12px;
        }

        .stepper-title {
          font-size: 0.84rem;
          font-weight: 800;
          color: #4E0401;
          display: block;
        }

        .stepper-sub {
          font-size: 0.72rem;
          color: #786C6A;
        }

        .stepper-controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .stepper-btn {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.15);
          color: #4E0401;
          font-size: 1.1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.12s ease;
        }

        .stepper-btn:hover:not(:disabled) {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        .stepper-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .stepper-count {
          font-size: 1rem;
          font-weight: 800;
          color: #4E0401;
          min-width: 16px;
          text-align: center;
        }

        /* Child Car Seat Checkbox */
        .child-seat-choice-row {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          background: #FEFBF3;
          border-radius: 10px;
          border: 1px solid rgba(78, 4, 1, 0.08);
          cursor: pointer;
          margin-bottom: 16px;
          transition: background 0.12s ease;
        }

        .child-seat-choice-row:hover {
          background: #FDF9F0;
        }

        .custom-checkbox {
          width: 18px;
          height: 18px;
          border-radius: 5px;
          border: 1.5px solid rgba(78, 4, 1, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.12s ease;
        }

        .custom-checkbox.checked {
          background: #E88C2B;
          border-color: #E88C2B;
        }

        .seat-choice-text {
          display: flex;
          flex-direction: column;
          text-align: left;
        }

        .seat-title {
          font-size: 0.80rem;
          font-weight: 800;
          color: #4E0401;
        }

        .seat-sub {
          font-size: 0.70rem;
          color: #786C6A;
        }

        .popover-done-btn {
          width: 100%;
          background: #4E0401;
          color: #FFFFFF;
          border: none;
          border-radius: 10px;
          font-family: inherit;
          font-size: 0.84rem;
          font-weight: 800;
          padding: 10px 0;
          cursor: pointer;
          transition: background 0.15s ease;
        }

        .popover-done-btn:hover {
          background: #E88C2B;
        }

        /* --------------------------------------------------------------------------
           BOTTOM TRUST STRIP
           -------------------------------------------------------------------------- */
        .booking-trust-strip {
          display: flex;
          align-items: center;
          justify-content: space-around;
          padding: 10px 24px;
          background: #FEFBF3;
          border-top: 1px solid rgba(78, 4, 1, 0.06);
          border-radius: 0 0 18px 18px;
          gap: 12px;
          flex-wrap: wrap;
        }

        .trust-strip-item {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 750;
          color: #4A3E3D;
        }

        /* --------------------------------------------------------------------------
           RESPONSIVE BREAKPOINTS
           -------------------------------------------------------------------------- */
        @media (max-width: 1100px) {
          .booking-main-bar {
            grid-template-columns: 1fr 1fr;
            padding: 12px;
            gap: 8px;
          }

          .booking-col-item {
            border-right: none;
            border: 1px solid rgba(78, 4, 1, 0.08);
            border-radius: 12px;
            padding: 14px 16px;
          }

          .swap-icon-btn {
            display: none;
          }

          .booking-btn-col {
            grid-column: span 2;
            padding: 4px 0 0 0;
          }

          .btn-book-now-gold {
            width: 100%;
            border-radius: 12px;
            padding: 16px;
          }

          .luxury-popover-dropdown {
            width: 100%;
            left: 0;
            right: 0;
          }
        }

        @media (max-width: 680px) {
          .booking-main-bar {
            grid-template-columns: 1fr;
            padding: 10px;
            gap: 10px;
          }

          .booking-btn-col {
            grid-column: span 1;
          }

          .booking-trust-strip {
            flex-direction: column;
            align-items: flex-start;
            padding: 14px 16px;
            gap: 8px;
          }
        }
      `}</style>
    </div>
  );
}
