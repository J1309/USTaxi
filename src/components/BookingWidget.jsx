import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Users,
  Car,
  Plane,
  ArrowRight,
  MessageCircle,
  PhoneCall,
  Check,
  Info,
} from 'lucide-react';
import { HOUSTON_PRESETS, VEHICLE_OPTIONS, calculateFareEstimate } from '../utils/fareEstimator';
import { buildWhatsAppBookingUrl, OWNER_PHONE_DISPLAY, OWNER_PHONE_RAW } from '../utils/whatsapp';
import confetti from 'canvas-confetti';

export default function BookingWidget({ preselectedVehicle }) {
  const [tripType, setTripType] = useState('One Way'); // 'One Way' | 'Hourly Rental'
  const [pickupLocation, setPickupLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [hours, setHours] = useState('3');
  const [pickupDate, setPickupDate] = useState(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [pickupTime, setPickupTime] = useState('10:00');
  const [passengers, setPassengers] = useState(1);
  const [vehicleId, setVehicleId] = useState(preselectedVehicle || 'suburban');
  const [flightNumber, setFlightNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (preselectedVehicle) {
      setVehicleId(preselectedVehicle);
    }
  }, [preselectedVehicle]);

  const fareResult = useMemo(() => {
    return calculateFareEstimate({
      tripType,
      pickupLocation,
      destination,
      hours,
      vehicleId,
    });
  }, [tripType, pickupLocation, destination, hours, vehicleId]);

  const selectedVehicleObj = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[0];

  const handleBookViaWhatsApp = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.7 },
        colors: ['#0284C7', '#F97316', '#25D366', '#1E293B'],
      });
    } catch (err) {}

    const bookingData = {
      tripType,
      pickupLocation: pickupLocation.trim() || 'Houston, TX',
      destination: tripType === 'Hourly Rental' ? `${hours} Hours Rental` : destination.trim() || 'Houston Destination',
      hours,
      pickupDate,
      pickupTime,
      passengers,
      luggage: selectedVehicleObj.luggageMax,
      vehicle: `${selectedVehicleObj.name} (${selectedVehicleObj.capacity})`,
      flightNumber,
      customerName,
      customerPhone,
      estimatedFare: fareResult.displayText,
    };

    const targetUrl = buildWhatsAppBookingUrl(bookingData);

    setTimeout(() => {
      setIsSubmitting(false);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    }, 400);
  };

  return (
    <div id="booking-section" className="booking-card-light">
      {/* Top Tabs: One Way vs Hourly Rental */}
      <div className="booking-tabs-row">
        <button
          type="button"
          className={`booking-tab-pill ${tripType === 'One Way' ? 'active' : ''}`}
          onClick={() => setTripType('One Way')}
        >
          One Way
        </button>
        <button
          type="button"
          className={`booking-tab-pill ${tripType === 'Hourly Rental' ? 'active' : ''}`}
          onClick={() => setTripType('Hourly Rental')}
        >
          Hourly Rental
        </button>
      </div>

      <form onSubmit={handleBookViaWhatsApp} className="booking-form-clean">
        {/* Pickup & Destination Fields */}
        <div className="form-fields-grid-2">
          <div className="form-field-unit">
            <label className="field-label-text" htmlFor="pickup-input-light">
              <MapPin size={13} color="#0284C7" />
              Pickup Location
            </label>
            <input
              id="pickup-input-light"
              type="text"
              required
              placeholder="Enter pickup location (e.g. IAH Airport)"
              value={pickupLocation}
              onChange={(e) => setPickupLocation(e.target.value)}
              className="field-input-text"
            />
            {/* Quick airport chips */}
            <div className="quick-airports-row">
              <button
                type="button"
                className="airport-chip-btn"
                onClick={() => setPickupLocation('George Bush Intercontinental Airport (IAH)')}
              >
                IAH Airport
              </button>
              <button
                type="button"
                className="airport-chip-btn"
                onClick={() => setPickupLocation('William P. Hobby Airport (HOU)')}
              >
                Hobby (HOU)
              </button>
            </div>
          </div>

          {tripType === 'Hourly Rental' ? (
            <div className="form-field-unit">
              <label className="field-label-text" htmlFor="hours-select-light">
                <Clock size={13} color="#0284C7" />
                Charter Duration
              </label>
              <select
                id="hours-select-light"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="field-input-text"
              >
                <option value="2">2 Hours (Minimum Charter)</option>
                <option value="3">3 Hours (Recommended)</option>
                <option value="4">4 Hours (Half Day)</option>
                <option value="6">6 Hours (As Directed)</option>
                <option value="8">8 Hours (Full Day VIP)</option>
              </select>
              <span className="field-hint-text">Unlimited stops • Driver on-site</span>
            </div>
          ) : (
            <div className="form-field-unit">
              <label className="field-label-text" htmlFor="dropoff-input-light">
                <MapPin size={13} color="#F97316" />
                Destination
              </label>
              <input
                id="dropoff-input-light"
                type="text"
                required
                placeholder="Enter destination (e.g. Galveston / Downtown)"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                className="field-input-text"
              />
              {/* Quick destination chips */}
              <div className="quick-airports-row">
                <button
                  type="button"
                  className="airport-chip-btn"
                  onClick={() => setDestination('Port of Galveston Cruise Terminal')}
                >
                  Galveston Cruise
                </button>
                <button
                  type="button"
                  className="airport-chip-btn"
                  onClick={() => setDestination('Space Center Houston / NASA')}
                >
                  NASA Center
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Date, Time, Passengers */}
        <div className="form-fields-grid-3">
          <div className="form-field-unit">
            <label className="field-label-text" htmlFor="date-input-light">
              <Calendar size={13} color="#0284C7" />
              Pickup Date
            </label>
            <input
              id="date-input-light"
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="field-input-text"
            />
          </div>

          <div className="form-field-unit">
            <label className="field-label-text" htmlFor="time-input-light">
              <Clock size={13} color="#0284C7" />
              Pickup Time
            </label>
            <input
              id="time-input-light"
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="field-input-text"
            />
          </div>

          <div className="form-field-unit">
            <label className="field-label-text" htmlFor="passengers-select-light">
              <Users size={13} color="#0284C7" />
              Passengers
            </label>
            <select
              id="passengers-select-light"
              value={passengers}
              onChange={(e) => setPassengers(Number(e.target.value))}
              className="field-input-text"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <option key={n} value={n}>
                  {n} {n === 1 ? 'Passenger' : 'Passengers'}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Vehicle Selection Row */}
        <div className="vehicle-choice-row">
          <span className="field-label-text" style={{ marginBottom: '6px' }}>
            <Car size={13} color="#0284C7" />
            Select Your Vehicle
          </span>
          <div className="vehicle-pills-duo">
            {VEHICLE_OPTIONS.map((v) => {
              const isSelected = vehicleId === v.id;
              return (
                <div
                  key={v.id}
                  onClick={() => setVehicleId(v.id)}
                  className={`vehicle-choice-pill ${isSelected ? 'active' : ''}`}
                >
                  <img src={v.image} alt={v.name} className="vehicle-choice-thumb" />
                  <div className="vehicle-choice-meta">
                    <span className="vehicle-choice-title">{v.name}</span>
                    <span className="vehicle-choice-sub">{v.capacity}</span>
                  </div>
                  {isSelected && <Check size={16} color="#0284C7" className="vehicle-check-icon" />}
                </div>
              );
            })}
          </div>
        </div>

        {/* Fare Estimate & CTA Buttons */}
        <div className="booking-footer-clean">
          <div className="fare-badge-clean">
            <span className="fare-badge-label">Estimated Fare:</span>
            <span className="fare-badge-price">{fareResult.displayText}</span>
          </div>

          <div className="cta-buttons-duo">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-quote-orange"
            >
              <span>{isSubmitting ? 'Opening WhatsApp...' : 'Get a Quote'}</span>
              <ArrowRight size={16} />
            </button>

            <button
              type="button"
              onClick={handleBookViaWhatsApp}
              className="btn-whatsapp-outline"
              title="Send booking directly to WhatsApp"
            >
              <MessageCircle size={17} color="#25D366" />
              <span>WhatsApp</span>
            </button>
          </div>
        </div>
      </form>

      <style>{`
        .booking-card-light {
          background: #FFFFFF;
          border-radius: 18px;
          border: 1px solid #E2E8F0;
          box-shadow: var(--shadow-hero-widget);
          padding: 24px;
          max-width: 540px;
          width: 100%;
        }
        .booking-tabs-row {
          display: flex;
          background: #F1F5F9;
          border-radius: var(--radius-full);
          padding: 4px;
          margin-bottom: 20px;
          gap: 4px;
        }
        .booking-tab-pill {
          flex: 1;
          padding: 10px 18px;
          border-radius: var(--radius-full);
          font-size: 0.92rem;
          font-weight: 700;
          color: var(--text-muted);
          transition: all 0.2s ease;
          text-align: center;
        }
        .booking-tab-pill.active {
          background: #0284C7;
          color: #FFFFFF;
          box-shadow: 0 2px 8px rgba(2, 132, 199, 0.35);
        }
        .booking-form-clean {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .form-fields-grid-2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        .form-fields-grid-3 {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 12px;
        }
        .form-field-unit {
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .field-label-text {
          font-size: 0.76rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .field-input-text {
          width: 100%;
          border: 1px solid #CBD5E1;
          background: #FFFFFF;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 0.92rem;
          color: var(--text-main);
          font-weight: 500;
          outline: none;
          transition: border-color 0.15s ease, box-shadow 0.15s ease;
        }
        .field-input-text:focus {
          border-color: #0284C7;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.15);
        }
        .quick-airports-row {
          display: flex;
          gap: 6px;
          margin-top: 4px;
        }
        .airport-chip-btn {
          font-size: 0.72rem;
          font-weight: 600;
          background: #F1F5F9;
          border: 1px solid #E2E8F0;
          color: #0284C7;
          padding: 2px 8px;
          border-radius: 4px;
        }
        .airport-chip-btn:hover {
          background: #E0F2FE;
        }
        .field-hint-text {
          font-size: 0.72rem;
          color: var(--text-muted);
          margin-top: 3px;
        }
        .vehicle-choice-row {
          display: flex;
          flex-direction: column;
        }
        .vehicle-pills-duo {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .vehicle-choice-pill {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 12px;
          border: 1.5px solid #E2E8F0;
          background: #F8FAFC;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.18s ease;
        }
        .vehicle-choice-pill:hover {
          border-color: #0284C7;
          background: #F0F9FF;
        }
        .vehicle-choice-pill.active {
          border-color: #0284C7;
          background: #F0F9FF;
          box-shadow: 0 0 0 1px #0284C7;
        }
        .vehicle-choice-thumb {
          width: 44px;
          height: 30px;
          border-radius: 4px;
          object-fit: cover;
        }
        .vehicle-choice-meta {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .vehicle-choice-title {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--text-main);
          line-height: 1.2;
        }
        .vehicle-choice-sub {
          font-size: 0.72rem;
          color: var(--text-muted);
        }
        .booking-footer-clean {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 14px;
          border-top: 1px solid #F1F5F9;
          gap: 14px;
          flex-wrap: wrap;
        }
        .fare-badge-clean {
          display: flex;
          flex-direction: column;
        }
        .fare-badge-label {
          font-size: 0.72rem;
          font-weight: 700;
          color: var(--text-muted);
          text-transform: uppercase;
        }
        .fare-badge-price {
          font-family: var(--font-heading);
          font-size: 1.25rem;
          font-weight: 800;
          color: #0F172A;
        }
        .cta-buttons-duo {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .btn-quote-orange {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #F97316;
          color: #FFFFFF;
          font-weight: 700;
          font-size: 0.94rem;
          padding: 11px 22px;
          border-radius: 8px;
          box-shadow: 0 3px 10px rgba(249, 115, 22, 0.35);
        }
        .btn-quote-orange:hover {
          background: #EA580C;
        }
        .btn-whatsapp-outline {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #F0FDF4;
          border: 1px solid #86EFAC;
          color: #166534;
          font-weight: 700;
          font-size: 0.88rem;
          padding: 10px 14px;
          border-radius: 8px;
        }
        .btn-whatsapp-outline:hover {
          background: #DCFCE7;
        }

        @media (max-width: 600px) {
          .booking-card-light {
            padding: 18px;
          }
          .form-fields-grid-2,
          .form-fields-grid-3,
          .vehicle-pills-duo {
            grid-template-columns: 1fr;
          }
          .booking-footer-clean {
            flex-direction: column;
            align-items: stretch;
          }
          .cta-buttons-duo {
            width: 100%;
          }
          .btn-quote-orange,
          .btn-whatsapp-outline {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
