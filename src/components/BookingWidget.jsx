import React, { useState, useRef, useEffect } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  ArrowRight, 
  ChevronDown, 
  ArrowLeftRight, 
  Check,
  Crosshair,
  X,
  Car
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
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

  const widgetRef = useRef(null);

  // Sync if preselectedVehicle changes from outside (e.g. Fleet section)
  useEffect(() => {
    if (preselectedVehicle) {
      setVehicle(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  // Global event listeners for mobile sheet trigger & vehicle sync
  useEffect(() => {
    const handleOpenSheet = (e) => {
      if (e.detail?.vehicle) {
        setVehicle(e.detail.vehicle);
      }
      setMobileSheetOpen(true);
    };
    const handleSelectVeh = (e) => {
      if (e.detail?.vehicle) {
        setVehicle(e.detail.vehicle);
      }
    };
    window.addEventListener('open-booking-sheet', handleOpenSheet);
    window.addEventListener('select-booking-vehicle', handleSelectVeh);
    return () => {
      window.removeEventListener('open-booking-sheet', handleOpenSheet);
      window.removeEventListener('select-booking-vehicle', handleSelectVeh);
    };
  }, []);

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
      setMobileSheetOpen(false);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 200);
  };

  return (
    <div className="floating-booking-wrapper" id="booking-engine" ref={widgetRef}>
      
      {/* =========================================================================
          DESKTOP VIEW: Box-Structured Horizontal Booking Grid
          ========================================================================= */}
      <div className="booking-card-floating desktop-booking-card">
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

          {/* BOX 3: DATE & TIME */}
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

      {/* =========================================================================
          MOBILE VIEW: Focused Trigger Pill in Hero (Screen 1)
          ========================================================================= */}
      <div className="mobile-search-pill-wrapper">
        <button
          type="button"
          onClick={() => setMobileSheetOpen(true)}
          className="mobile-search-pill"
          aria-label="Open booking form"
        >
          <div className="pill-pin-icon">
            <MapPin size={18} color="#E88C2B" />
          </div>
          <div className="pill-text-col">
            <span className="pill-main-text">Where are you going?</span>
            <span className="pill-sub-text">Airport, hotel, or address</span>
          </div>
          <div className="pill-arrow-btn">
            <ArrowRight size={15} color="#4E0401" />
          </div>
        </button>

        <div className="mobile-pill-dots">
          <span className="pill-dot active" />
          <span className="pill-dot" />
          <span className="pill-dot" />
        </div>
      </div>

      {/* =========================================================================
          MOBILE VIEW: Booking Bottom Sheet Modal (Screen 2)
          ========================================================================= */}
      {mobileSheetOpen && (
        <div className="bottom-sheet-backdrop" onClick={() => setMobileSheetOpen(false)}>
          <div className="bottom-sheet-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Drag Handle & Header */}
            <div className="sheet-drag-handle" />
            <div className="sheet-header">
              <h3 className="sheet-title">Book Your Ride</h3>
              <button 
                type="button" 
                className="sheet-close-btn" 
                onClick={() => setMobileSheetOpen(false)}
                aria-label="Close booking form"
              >
                <X size={20} />
              </button>
            </div>

            {/* Scrollable Form Body (Allows free scroll to all fields anytime) */}
            <div className="sheet-scroll-body">
              <form onSubmit={handleBookNow} className="sheet-form-stack" noValidate>
                
                {/* FIELD 1: PICKUP LOCATION */}
                <div className={`sheet-field-box ${activePopover === 'sheet-pickup' ? 'active' : ''} ${pickupError ? 'error' : ''}`}>
                  <div className="field-icon-col">
                    <MapPin size={18} color="#E88C2B" />
                  </div>
                  <div className="field-text-col">
                    <span className="sheet-field-label">Pickup Location</span>
                    <input
                      type="text"
                      placeholder="Airport, address or hotel"
                      value={pickupLocation}
                      onFocus={() => setPickupError(false)}
                      onChange={(e) => {
                        setPickupLocation(e.target.value);
                        setPickupError(false);
                      }}
                      className="sheet-field-input"
                    />
                  </div>
                  <button
                    type="button"
                    className="sheet-crosshair-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePopover(activePopover === 'sheet-pickup' ? null : 'sheet-pickup');
                    }}
                    title="Popular Pickup Locations"
                  >
                    <Crosshair size={16} color={activePopover === 'sheet-pickup' ? '#E88C2B' : '#786C6A'} />
                  </button>
                </div>

                {/* Suggestions for Pickup in Sheet */}
                {activePopover === 'sheet-pickup' && (
                  <div className="sheet-suggestions-dropdown">
                    <div className="dropdown-title">Popular Houston Hubs</div>
                    {TOP_PICKUPS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="sheet-suggestion-item"
                        onClick={() => {
                          setPickupLocation(item.name);
                          setActivePopover(null); // Cleanly close options immediately!
                        }}
                      >
                        <MapPin size={13} color="#E88C2B" />
                        <span className="sugg-text">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* FIELD 2: DROP-OFF LOCATION */}
                <div className={`sheet-field-box ${activePopover === 'sheet-dropoff' ? 'active' : ''}`}>
                  <div className="field-icon-col">
                    <MapPin size={18} color="#786C6A" />
                  </div>
                  <div className="field-text-col">
                    <span className="sheet-field-label">Drop-off Location</span>
                    <input
                      type="text"
                      placeholder="Destination or airport"
                      value={dropoffLocation}
                      onChange={(e) => setDropoffLocation(e.target.value)}
                      className="sheet-field-input"
                    />
                  </div>
                  <button
                    type="button"
                    className="sheet-crosshair-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActivePopover(activePopover === 'sheet-dropoff' ? null : 'sheet-dropoff');
                    }}
                    title="Top Destinations"
                  >
                    <ChevronDown size={16} color={activePopover === 'sheet-dropoff' ? '#E88C2B' : '#786C6A'} />
                  </button>
                </div>

                {/* Suggestions for Dropoff in Sheet */}
                {activePopover === 'sheet-dropoff' && (
                  <div className="sheet-suggestions-dropdown">
                    <div className="dropdown-title">Top Destinations</div>
                    {TOP_DROPOFFS.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        className="sheet-suggestion-item"
                        onClick={() => {
                          setDropoffLocation(item.name);
                          setActivePopover(null); // Cleanly close options immediately!
                        }}
                      >
                        <MapPin size={13} color="#786C6A" />
                        <span className="sugg-text">{item.name}</span>
                      </button>
                    ))}
                  </div>
                )}

                {/* FIELD 3: DATE & TIME */}
                <div 
                  className={`sheet-field-box ${activePopover === 'sheet-datetime' ? 'active' : ''}`}
                  onClick={() => setActivePopover(activePopover === 'sheet-datetime' ? null : 'sheet-datetime')}
                >
                  <div className="field-icon-col">
                    <Calendar size={18} color="#E88C2B" />
                  </div>
                  <div className="field-text-col">
                    <span className="sheet-field-label">Date & Time</span>
                    <span className="sheet-val-text">{formatDateTimeDisplay()}</span>
                  </div>
                  <ChevronDown size={16} color="#786C6A" />
                </div>

                {/* Date & Time Picker inside Sheet */}
                {activePopover === 'sheet-datetime' && (
                  <div className="sheet-native-pickers-box">
                    <div className="sheet-picker-row">
                      <label className="picker-lbl">Date</label>
                      <input
                        type="date"
                        min={todayStr}
                        value={pickupDate}
                        onChange={(e) => setPickupDate(e.target.value)}
                        className="sheet-input-element"
                      />
                    </div>
                    <div className="sheet-picker-row">
                      <label className="picker-lbl">Time</label>
                      <input
                        type="time"
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="sheet-input-element"
                      />
                    </div>
                    <button
                      type="button"
                      className="sheet-picker-done-btn"
                      onClick={() => setActivePopover(null)}
                    >
                      Confirm Date & Time
                    </button>
                  </div>
                )}

                {/* FIELD 4: VEHICLE & GUESTS */}
                <div 
                  className={`sheet-field-box ${activePopover === 'sheet-guests' ? 'active' : ''}`}
                  onClick={() => setActivePopover(activePopover === 'sheet-guests' ? null : 'sheet-guests')}
                >
                  <div className="field-icon-col">
                    <Car size={18} color="#E88C2B" />
                  </div>
                  <div className="field-text-col">
                    <span className="sheet-field-label">Vehicle & Guests</span>
                    <span className="sheet-val-text">{formatVehicleGuestsDisplay()}</span>
                  </div>
                  <ChevronDown size={18} color="#786C6A" />
                </div>

                {/* Vehicle Options & Guest Stepper inside Sheet */}
                {activePopover === 'sheet-guests' && (
                  <div className="sheet-guests-picker-box">
                    <div className="sheet-veh-options-col">
                      <div 
                        className={`sheet-veh-row ${vehicle === 'suburban' ? 'selected' : ''}`}
                        onClick={() => handleSelectVehicle('suburban')}
                      >
                        <div>
                          <div className="sheet-veh-title">Chevrolet Suburban High Country</div>
                          <div className="sheet-veh-sub">Up to 7 Guests · 6 Bags</div>
                        </div>
                        {vehicle === 'suburban' && <Check size={16} color="#E88C2B" />}
                      </div>

                      <div 
                        className={`sheet-veh-row ${vehicle === 'lexus' ? 'selected' : ''}`}
                        onClick={() => handleSelectVehicle('lexus')}
                      >
                        <div>
                          <div className="sheet-veh-title">Lexus Luxury Sedan</div>
                          <div className="sheet-veh-sub">Up to 4 Guests · 3 Bags</div>
                        </div>
                        {vehicle === 'lexus' && <Check size={16} color="#E88C2B" />}
                      </div>
                    </div>

                    <div className="sheet-pax-stepper">
                      <span className="sheet-stepper-title">Number of Guests</span>
                      <div className="sheet-stepper-controls">
                        <button
                          type="button"
                          onClick={handleDecrementGuests}
                          disabled={passengers <= 1}
                          className="stepper-circle-btn"
                        >
                          −
                        </button>
                        <span className="stepper-number">{passengers}</span>
                        <button
                          type="button"
                          onClick={handleIncrementGuests}
                          className="stepper-circle-btn"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="sheet-picker-done-btn"
                      onClick={() => setActivePopover(null)}
                    >
                      Done
                    </button>
                  </div>
                )}

                {/* ACTION: BOOK NOW */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="sheet-submit-btn"
                >
                  <span>{isSubmitting ? 'CONNECTING...' : 'Book Now'}</span>
                  <ArrowRight size={18} />
                </button>

              </form>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* ==========================================================================
           BOX-STRUCTURED BOOKING SECTION
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

        .booking-boxes-grid {
          display: grid;
          grid-template-columns: 1.3fr auto 1.3fr 1.15fr 1.25fr auto;
          gap: 12px;
          align-items: center;
        }

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

        /* Desktop Popovers */
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

        /* ==========================================================================
           MOBILE SEARCH PILL IN HERO (Screen 1)
           ========================================================================== */
        .mobile-search-pill-wrapper {
          display: none;
          width: 100%;
          max-width: 440px;
          margin: 0 auto;
        }

        .mobile-search-pill {
          width: 100%;
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.12);
          border-radius: 9999px;
          padding: 10px 14px 10px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          box-shadow: 0 10px 30px rgba(78, 4, 1, 0.10);
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }

        .mobile-search-pill:hover {
          border-color: #E88C2B;
          transform: translateY(-2px);
          box-shadow: 0 14px 36px rgba(78, 4, 1, 0.16);
        }

        .pill-pin-icon {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #FDF3E7;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .pill-text-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex-grow: 1;
        }

        .pill-main-text {
          font-size: 0.9rem;
          font-weight: 800;
          color: #1C0C0B;
        }

        .pill-sub-text {
          font-size: 0.74rem;
          color: #786C6A;
          font-weight: 500;
        }

        .pill-arrow-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .mobile-pill-dots {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          margin-top: 14px;
        }

        .pill-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: rgba(78, 4, 1, 0.2);
          transition: all 0.2s ease;
        }

        .pill-dot.active {
          width: 18px;
          border-radius: 9999px;
          background: #E88C2B;
        }

        /* ==========================================================================
           MOBILE BOTTOM SHEET MODAL (Screen 2)
           ========================================================================== */
        .bottom-sheet-backdrop {
          position: fixed;
          inset: 0;
          z-index: 3000;
          background: rgba(28, 12, 11, 0.65);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          display: flex;
          align-items: flex-end;
          justify-content: center;
          animation: sheetBackdropFade 0.25s ease-out;
        }

        @keyframes sheetBackdropFade {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .bottom-sheet-content {
          width: 100%;
          max-width: 500px;
          background: #FFFFFF;
          border-radius: 24px 24px 0 0;
          padding: 12px 18px 16px 18px;
          max-height: 88dvh;
          height: auto;
          display: flex;
          flex-direction: column;
          box-shadow: 0 -12px 40px rgba(0, 0, 0, 0.25);
          animation: sheetSlideUp 0.28s cubic-bezier(0.16, 1, 0.3, 1);
          text-align: left;
        }

        .sheet-scroll-body {
          flex: 1;
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
          touch-action: pan-y;
          overscroll-behavior: contain;
          padding: 2px 2px 20px 2px;
        }

        @keyframes sheetSlideUp {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }

        .sheet-drag-handle {
          width: 40px;
          height: 4px;
          border-radius: 9999px;
          background: #E4DDD6;
          margin: 0 auto 14px auto;
        }

        .sheet-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 20px;
        }

        .sheet-title {
          font-family: var(--font-heading);
          font-size: 1.4rem;
          font-weight: 900;
          color: #4E0401;
          margin: 0;
          -webkit-text-stroke: 0.3px currentColor;
        }

        .sheet-close-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.10);
          display: flex;
          align-items: center;
          justify-content: center;
          color: #4E0401;
          cursor: pointer;
        }

        .sheet-form-stack {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .sheet-field-box {
          background: #FFFFFF;
          border: 1.5px solid rgba(78, 4, 1, 0.12);
          border-radius: 12px;
          padding: 10px 14px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .sheet-field-box.active {
          border-color: #E88C2B;
          box-shadow: 0 0 0 3px rgba(232, 140, 43, 0.12);
        }

        .sheet-field-box.error {
          border-color: #EF4444;
          background: #FEF2F2;
        }

        .field-icon-col {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .field-text-col {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex-grow: 1;
        }

        .sheet-field-label {
          font-size: 0.7rem;
          font-weight: 800;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          color: #786C6A;
        }

        .sheet-field-input {
          border: none;
          outline: none;
          background: transparent;
          font-family: inherit;
          font-size: 0.94rem;
          font-weight: 700;
          color: #1C0C0B;
          padding: 0;
          width: 100%;
        }

        .sheet-field-input::placeholder {
          color: #A39694;
          font-weight: 500;
          font-size: 0.88rem;
        }

        .sheet-val-text {
          font-size: 0.92rem;
          font-weight: 700;
          color: #1C0C0B;
        }

        .sheet-crosshair-btn {
          background: transparent;
          border: none;
          padding: 4px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .sheet-suggestions-dropdown {
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.10);
          border-radius: 10px;
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: -6px;
        }

        .sheet-suggestion-item {
          display: flex;
          align-items: center;
          gap: 8px;
          background: transparent;
          border: none;
          padding: 8px 10px;
          border-radius: 6px;
          font-family: inherit;
          cursor: pointer;
          text-align: left;
          width: 100%;
        }

        .sheet-suggestion-item:hover {
          background: #FFFFFF;
        }

        .sugg-text {
          font-size: 0.84rem;
          font-weight: 600;
          color: #1C0C0B;
        }

        .sheet-native-pickers-box {
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.10);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          margin-top: -6px;
        }

        .sheet-picker-row {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .picker-lbl {
          font-size: 0.72rem;
          font-weight: 700;
          color: #786C6A;
        }

        .sheet-input-element {
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.12);
          border-radius: 8px;
          padding: 8px 10px;
          font-family: inherit;
          font-size: 0.88rem;
          font-weight: 600;
          color: #1C0C0B;
          outline: none;
        }

        .sheet-picker-done-btn {
          background: #4E0401;
          color: #FFFFFF;
          border: none;
          border-radius: 8px;
          padding: 9px;
          font-weight: 700;
          font-size: 0.82rem;
          cursor: pointer;
          margin-top: 4px;
        }

        .sheet-guests-picker-box {
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.10);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: -6px;
        }

        .sheet-veh-options-col {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .sheet-veh-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 8px 10px;
          border-radius: 8px;
          background: #FFFFFF;
          border: 1px solid rgba(78, 4, 1, 0.10);
          cursor: pointer;
        }

        .sheet-veh-row.selected {
          border-color: #E88C2B;
          background: #FDF3E7;
        }

        .sheet-veh-title {
          font-size: 0.82rem;
          font-weight: 800;
          color: #4E0401;
        }

        .sheet-veh-sub {
          font-size: 0.72rem;
          color: #786C6A;
        }

        .sheet-pax-stepper {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 10px;
          background: #FFFFFF;
          border-radius: 8px;
          border: 1px solid rgba(78, 4, 1, 0.08);
        }

        .sheet-stepper-title {
          font-size: 0.8rem;
          font-weight: 700;
          color: #4E0401;
        }

        .sheet-stepper-controls {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .stepper-circle-btn {
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #FEFBF3;
          border: 1px solid rgba(78, 4, 1, 0.15);
          color: #4E0401;
          font-size: 1rem;
          font-weight: 700;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
        }

        .stepper-number {
          font-size: 0.94rem;
          font-weight: 800;
          color: #4E0401;
          min-width: 14px;
          text-align: center;
        }

        .sheet-submit-btn {
          width: 100%;
          height: 52px;
          background: #E88C2B;
          color: #FFFFFF;
          border: none;
          border-radius: 12px;
          font-family: inherit;
          font-size: 0.98rem;
          font-weight: 800;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          cursor: pointer;
          box-shadow: 0 6px 20px rgba(232, 140, 43, 0.35);
          margin-top: 6px;
          transition: background 0.18s ease;
        }

        .sheet-submit-btn:hover {
          background: #D2791C;
        }

        /* Responsive Breakpoints - Strictly mobile only (<= 768px) */
        @media (max-width: 768px) {
          .desktop-booking-card {
            display: none !important;
          }
          .mobile-search-pill-wrapper {
            display: block !important;
          }
        }
      `}</style>
    </div>
  );
}
