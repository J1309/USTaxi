import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ChevronDown, 
  ArrowLeftRight, 
  Check 
} from 'lucide-react';
import { OWNER_PHONE_RAW } from '../utils/whatsapp';

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

  const [pickupLocation, setPickupLocation] = useState('');
  const [dropoffLocation, setDropoffLocation] = useState('');
  const [pickupDate, setPickupDate] = useState(todayStr);
  const [pickupTime, setPickupTime] = useState('');
  const [vehicle, setVehicle] = useState(preselectedVehicle || 'suburban');
  const [passengers, setPassengers] = useState(1);
  const [activePopover, setActivePopover] = useState(null); // 'pickup' | 'dropoff' | 'datetime' | 'guests' | null
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [pickupError, setPickupError] = useState(false);

  const widgetRef = useRef(null);

  // Sync if preselectedVehicle changes from outside (e.g. Fleet section)
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

  // Format date & time display (Strictly NO "Today" or "Tomorrow")
  const formatDateTimeDisplay = () => {
    if (!pickupDate) return 'Select Date & Time';

    const parts = pickupDate.split('-');
    let dateStr = pickupDate;
    if (parts.length === 3) {
      const d = new Date(parseInt(parts[0], 10), parseInt(parts[1], 10) - 1, parseInt(parts[2], 10));
      dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    }

    if (pickupTime) {
      const [h, m] = pickupTime.split(':');
      const hour = parseInt(h, 10);
      const ampm = hour >= 12 ? 'PM' : 'AM';
      const hour12 = hour % 12 || 12;
      return `${dateStr} · ${hour12}:${m} ${ampm}`;
    }

    return `${dateStr} · Set Time`;
  };

  // Format vehicle & guests display
  const formatVehicleGuestsDisplay = () => {
    const vName = vehicle === 'suburban' ? 'Suburban SUV' : 'Lexus Sedan';
    const paxText = passengers === 1 ? '1 Guest' : `${passengers} Guests`;
    return `${vName} · ${paxText}`;
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
      `━━━━━━━━━━━━━━━━━━━━━━━━━`,
      `_Please confirm availability and dispatch details._`
    ];

    const encodedText = encodeURIComponent(messageLines.join('\n'));
    const targetUrl = `https://wa.me/${OWNER_PHONE_RAW}?text=${encodedText}`;

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 200);
  };

  return (
    <div className="floating-booking-wrapper" id="booking-engine" ref={widgetRef}>
      <div className="booking-card-floating">
        
        {/* Box-Structured Booking Grid */}
        <form onSubmit={handleBookNow} className="booking-boxes-grid" noValidate>
          
          {/* BOX 1: PICKUP LOCATION */}
          <div 
            className={`booking-field-box ${activePopover === 'pickup' ? 'active-box' : ''} ${pickupError ? 'error-box' : ''}`}
            onClick={() => {
              setActivePopover('pickup');
              setPickupError(false);
            }}
          >
            <div className="box-header-label">
              <MapPin size={13} color="#E88C2B" />
              <span>PICKUP LOCATION</span>
            </div>
            
            <input
              type="text"
              placeholder="Airport, address or hotel"
              value={pickupLocation}
              onChange={(e) => {
                setPickupLocation(e.target.value);
                setPickupError(false);
              }}
              onFocus={() => setActivePopover('pickup')}
              className="box-field-input"
            />

            {/* Suggestions Popover */}
            {activePopover === 'pickup' && (
              <div className="box-popover-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-title">Popular Houston Hubs</div>
                <div className="dropdown-list">
                  {TOP_PICKUPS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="dropdown-item-btn"
                      onClick={() => {
                        setPickupLocation(item.name);
                        setActivePopover('dropoff');
                      }}
                    >
                      <MapPin size={13} color="#E88C2B" />
                      <span className="item-text">{item.name}</span>
                      <span className="item-badge">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SWAP BUTTON */}
          <button
            type="button"
            onClick={handleSwap}
            className="box-swap-btn"
            title="Swap Pickup and Drop-off locations"
            aria-label="Swap pickup and dropoff locations"
          >
            <ArrowLeftRight size={14} />
          </button>

          {/* BOX 2: DROP-OFF LOCATION */}
          <div 
            className={`booking-field-box ${activePopover === 'dropoff' ? 'active-box' : ''}`}
            onClick={() => setActivePopover('dropoff')}
          >
            <div className="box-header-label">
              <MapPin size={13} color="#786C6A" />
              <span>DROP-OFF LOCATION</span>
            </div>

            <input
              type="text"
              placeholder="Destination or airport"
              value={dropoffLocation}
              onChange={(e) => setDropoffLocation(e.target.value)}
              onFocus={() => setActivePopover('dropoff')}
              className="box-field-input"
            />

            {/* Suggestions Popover */}
            {activePopover === 'dropoff' && (
              <div className="box-popover-dropdown" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-title">Top Destinations</div>
                <div className="dropdown-list">
                  {TOP_DROPOFFS.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className="dropdown-item-btn"
                      onClick={() => {
                        setDropoffLocation(item.name);
                        setActivePopover('datetime');
                      }}
                    >
                      <MapPin size={13} color="#786C6A" />
                      <span className="item-text">{item.name}</span>
                      <span className="item-badge">{item.tag}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* BOX 3: DATE & TIME (Strictly NO "Today" or "Tomorrow") */}
          <div 
            className={`booking-field-box ${activePopover === 'datetime' ? 'active-box' : ''}`}
            onClick={() => setActivePopover(activePopover === 'datetime' ? null : 'datetime')}
          >
            <div className="box-header-label">
              <Calendar size={13} color="#786C6A" />
              <span>DATE & TIME</span>
            </div>

            <div className="box-value-text">
              <span>{formatDateTimeDisplay()}</span>
              <ChevronDown size={14} className="box-chevron" />
            </div>

            {/* Date & Time Popover */}
            {activePopover === 'datetime' && (
              <div className="box-popover-dropdown datetime-popover" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-title">Select Date & Time</div>

                <div className="popover-row">
                  <label className="input-mini-label">Pickup Date</label>
                  <input
                    type="date"
                    min={todayStr}
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="popover-native-input"
                  />
                </div>

                <div className="popover-row">
                  <label className="input-mini-label">Pickup Time</label>
                  <input
                    type="time"
                    value={pickupTime}
                    onChange={(e) => setPickupTime(e.target.value)}
                    className="popover-native-input"
                  />
                </div>

                <button
                  type="button"
                  className="popover-confirm-btn"
                  onClick={() => setActivePopover('guests')}
                >
                  Done
                </button>
              </div>
            )}
          </div>

          {/* BOX 4: VEHICLE & PASSENGERS */}
          <div 
            className={`booking-field-box ${activePopover === 'guests' ? 'active-box' : ''}`}
            onClick={() => setActivePopover(activePopover === 'guests' ? null : 'guests')}
          >
            <div className="box-header-label">
              <Users size={13} color="#786C6A" />
              <span>VEHICLE & GUESTS</span>
            </div>

            <div className="box-value-text">
              <span>{formatVehicleGuestsDisplay()}</span>
              <ChevronDown size={14} className="box-chevron" />
            </div>

            {/* Vehicle & Guests Popover */}
            {activePopover === 'guests' && (
              <div className="box-popover-dropdown guests-popover" onClick={(e) => e.stopPropagation()}>
                <div className="dropdown-title">Select Vehicle & Guests</div>

                {/* 2 Vehicles Selection Box */}
                <div className="popover-vehicle-options">
                  <div 
                    className={`vehicle-box-option ${vehicle === 'suburban' ? 'selected' : ''}`}
                    onClick={() => handleSelectVehicle('suburban')}
                  >
                    <div className="veh-option-info">
                      <span className="veh-name">Chevrolet Suburban High Country</span>
                      <span className="veh-specs">SUV · Up to 7 Guests · 6 Bags</span>
                    </div>
                    {vehicle === 'suburban' && <Check size={16} color="#E88C2B" />}
                  </div>

                  <div 
                    className={`vehicle-box-option ${vehicle === 'lexus' ? 'selected' : ''}`}
                    onClick={() => handleSelectVehicle('lexus')}
                  >
                    <div className="veh-option-info">
                      <span className="veh-name">Lexus Luxury Sedan</span>
                      <span className="veh-specs">Sedan · Up to 4 Guests · 3 Bags</span>
                    </div>
                    {vehicle === 'lexus' && <Check size={16} color="#E88C2B" />}
                  </div>
                </div>

                {/* Stepper */}
                <div className="popover-pax-stepper">
                  <span className="stepper-label">Number of Guests</span>
                  <div className="stepper-btns">
                    <button
                      type="button"
                      className="step-btn"
                      onClick={handleDecrementGuests}
                      disabled={passengers <= 1}
                      aria-label="Decrease passengers"
                    >
                      −
                    </button>
                    <span className="step-val">{passengers}</span>
                    <button
                      type="button"
                      className="step-btn"
                      onClick={handleIncrementGuests}
                      aria-label="Increase passengers"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="popover-confirm-btn"
                  onClick={() => setActivePopover(null)}
                >
                  Confirm
                </button>
              </div>
            )}
          </div>

          {/* BOX 5: BOOK NOW BUTTON */}
          <div className="booking-action-box">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-book-now-box"
            >
              <span>{isSubmitting ? 'CONNECTING...' : 'BOOK NOW'}</span>
              <ArrowRight size={16} />
            </button>
          </div>

        </form>

      </div>

      <style>{`
        /* ==========================================================================
           BOX-STRUCTURED BOOKING SECTION
           Strictly focused on effortless booking UX with clean defined input boxes.
           Palette: Calming White #FEFBF3 | Dark Maroon #4E0401 | Orange Grove #E88C2B
           ========================================================================== */
        .floating-booking-wrapper {
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          position: relative;
          z-index: 40;
          padding: 0 16px;
        }

        .booking-card-floating {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.10);
          border-radius: 20px;
          box-shadow: 
            0 24px 50px -12px rgba(78, 4, 1, 0.12),
            0 4px 16px rgba(0, 0, 0, 0.04);
          padding: 16px;
          position: relative;
        }

        /* --------------------------------------------------------------------------
           BOX STRUCTURE GRID
           -------------------------------------------------------------------------- */
        .booking-boxes-grid {
          display: grid;
          grid-template-columns: 1.3fr auto 1.3fr 1.15fr 1.25fr auto;
          gap: 12px;
          align-items: center;
        }

        /* Distinct Field Boxes */
        .booking-field-box {
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.12);
          border-radius: 12px;
          padding: 11px 16px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          transition: all 0.18s ease;
          cursor: pointer;
          position: relative;
          text-align: left;
          min-height: 66px;
          justify-content: center;
        }

        .booking-field-box:hover {
          border-color: rgba(232, 140, 43, 0.6);
          background: #FEFDFB;
        }

        .booking-field-box.active-box {
          border-color: #E88C2B;
          background: #FFFFFF;
          box-shadow: 0 0 0 3px rgba(232, 140, 43, 0.15);
        }

        .booking-field-box.error-box {
          border-color: #EF4444;
          background: #FEF2F2;
          box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.15);
        }

        .box-header-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-family: inherit;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #4E0401;
          white-space: nowrap;
        }

        .box-field-input {
          width: 100%;
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 0.94rem;
          font-weight: 700;
          color: #1C0C0B;
          padding: 0;
          text-overflow: ellipsis;
        }

        .box-field-input::placeholder {
          color: #8C7B79;
          font-weight: 500;
          font-size: 0.88rem;
        }

        .box-value-text {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          font-size: 0.92rem;
          font-weight: 700;
          color: #1C0C0B;
        }

        .box-value-text span {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .box-chevron {
          color: #A39694;
          flex-shrink: 0;
          transition: transform 0.2s ease;
        }

        .booking-field-box.active-box .box-chevron {
          transform: rotate(180deg);
          color: #E88C2B;
        }

        /* Swap Button */
        .box-swap-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FEFBF3;
          border: 1.5px solid rgba(78, 4, 1, 0.14);
          color: #4E0401;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.2s ease;
        }

        .box-swap-btn:hover {
          background: #E88C2B;
          border-color: #E88C2B;
          color: #FFFFFF;
          transform: rotate(180deg);
        }

        /* Action Box / Button */
        .booking-action-box {
          display: flex;
          align-items: center;
          height: 100%;
        }

        .btn-book-now-box {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          background: #E88C2B;
          color: #FFFFFF;
          font-family: inherit;
          font-size: 0.94rem;
          font-weight: 900;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          padding: 0 32px;
          height: 66px;
          border-radius: 12px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.38);
          transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
          width: 100%;
        }

        .btn-book-now-box:hover {
          background: #D2791C;
          transform: translateY(-2px);
          box-shadow: 0 10px 26px rgba(232, 140, 43, 0.48);
        }

        .btn-book-now-box:active {
          transform: translateY(0);
        }

        /* --------------------------------------------------------------------------
           DROPDOWNS & POPOVERS
           -------------------------------------------------------------------------- */
        .box-popover-dropdown {
          position: absolute;
          top: calc(100% + 8px);
          left: 0;
          min-width: 320px;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.12);
          border-radius: 14px;
          box-shadow: 0 16px 36px rgba(78, 4, 1, 0.14), 0 4px 12px rgba(0, 0, 0, 0.05);
          padding: 16px;
          z-index: 100;
          animation: popoverFade 0.18s cubic-bezier(0.16, 1, 0.3, 1);
        }

        @keyframes popoverFade {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .dropdown-title {
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          color: #786C6A;
          margin-bottom: 8px;
          padding-bottom: 6px;
          border-bottom: 1px solid rgba(78, 4, 1, 0.06);
        }

        .dropdown-list {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .dropdown-item-btn {
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

        .dropdown-item-btn:hover {
          background: #FEFBF3;
        }

        .item-text {
          font-size: 0.86rem;
          font-weight: 600;
          color: #1C0C0B;
          flex: 1;
        }

        .item-badge {
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
          min-width: 290px;
        }

        .popover-row {
          margin-bottom: 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .input-mini-label {
          font-size: 0.72rem;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #786C6A;
        }

        .popover-native-input {
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

        .popover-native-input:focus {
          border-color: #E88C2B;
        }

        .popover-confirm-btn {
          width: 100%;
          background: #4E0401;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          font-family: inherit;
          font-size: 0.84rem;
          font-weight: 800;
          padding: 10px 0;
          cursor: pointer;
          transition: background 0.15s ease;
          margin-top: 4px;
        }

        .popover-confirm-btn:hover {
          background: #E88C2B;
        }

        /* Vehicle & Guests Popover */
        .guests-popover {
          min-width: 340px;
          right: 0;
          left: auto;
        }

        .popover-vehicle-options {
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-bottom: 14px;
        }

        .vehicle-box-option {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border-radius: 10px;
          background: #FEFBF3;
          border: 1.5px solid rgba(78, 4, 1, 0.10);
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .vehicle-box-option:hover {
          border-color: #E88C2B;
        }

        .vehicle-box-option.selected {
          border-color: #E88C2B;
          background: #FDF3E7;
        }

        .veh-option-info {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .veh-name {
          font-size: 0.84rem;
          font-weight: 800;
          color: #4E0401;
        }

        .veh-specs {
          font-size: 0.72rem;
          color: #786C6A;
          font-weight: 600;
        }

        .popover-pax-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #FEFBF3;
          border-radius: 10px;
          border: 1px solid rgba(78, 4, 1, 0.08);
          margin-bottom: 14px;
        }

        .stepper-label {
          font-size: 0.82rem;
          font-weight: 800;
          color: #4E0401;
        }

        .stepper-btns {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .step-btn {
          width: 28px;
          height: 28px;
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

        .step-btn:hover:not(:disabled) {
          background: #E88C2B;
          color: #FFFFFF;
          border-color: #E88C2B;
        }

        .step-btn:disabled {
          opacity: 0.4;
          cursor: not-allowed;
        }

        .step-val {
          font-size: 0.98rem;
          font-weight: 800;
          color: #4E0401;
          min-width: 16px;
          text-align: center;
        }

        /* --------------------------------------------------------------------------
           RESPONSIVE BREAKPOINTS
           -------------------------------------------------------------------------- */
        @media (max-width: 1100px) {
          .booking-boxes-grid {
            grid-template-columns: 1fr 1fr;
            gap: 10px;
          }

          .box-swap-btn {
            display: none;
          }

          .booking-action-box {
            grid-column: span 2;
          }

          .btn-book-now-box {
            width: 100%;
          }

          .box-popover-dropdown {
            width: 100%;
            left: 0;
            right: 0;
          }
        }

        @media (max-width: 680px) {
          .booking-boxes-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .booking-action-box {
            grid-column: span 1;
          }

          .btn-book-now-box {
            height: 56px;
          }
        }
      `}</style>
    </div>
  );
}
