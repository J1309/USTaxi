/**
 * Fare Estimator for Lavender Taxi Service Houston
 * Fixed Flat-Rate & Upfront Pricing (No Surge Ever)
 */

export const HOUSTON_PRESETS = [
  { label: 'IAH Airport (Terminal A/B/C/D/E)', value: 'George Bush Intercontinental Airport (IAH)', isAirport: true },
  { label: 'Hobby Airport (HOU)', value: 'William P. Hobby Airport (HOU)', isAirport: true },
  { label: 'Downtown Houston / GRB Convention', value: 'Downtown Houston / George R. Brown Convention Center' },
  { label: 'Galveston Cruise Terminal (Pier 25)', value: 'Port of Galveston Cruise Terminal, Galveston, TX' },
  { label: 'NASA Johnson Space Center', value: 'Space Center Houston / NASA Johnson Space Center' },
  { label: 'Texas Medical Center (TMC)', value: 'Texas Medical Center (TMC), Houston' },
  { label: 'The Galleria / Uptown', value: 'The Galleria / Uptown Houston' },
  { label: 'The Woodlands / Waterway', value: 'The Woodlands, TX' },
  { label: 'Katy / Cinco Ranch', value: 'Katy, TX' },
  { label: 'Sugar Land / Town Center', value: 'Sugar Land, TX' },
];

export const VEHICLE_OPTIONS = [
  {
    id: 'suburban',
    name: 'Chevrolet Suburban',
    badge: 'Most Popular for Groups',
    category: 'Full-Size Luxury SUV',
    capacity: 'Up to 7 Passengers',
    passengersMax: 7,
    luggageMax: 6,
    image: '/images/suburban_img.png',
    minHours: 2,
    features: [
      '7 Full-Size Leather Executive Seats',
      'Massive Luggage Capacity (6+ Bags)',
      'Rear Climate Control & USB-C Chargers',
      'Complimentary Bottled Water & WiFi',
      'Child & Infant Car Seats Available',
    ],
    description: 'The executive workhorse of Texas. Ample space for large families, corporate delegations, cruise luggage, and airport transit.',
  },
  {
    id: 'lexus',
    name: 'Lexus Luxury Sedan',
    badge: 'Executive Comfort',
    category: 'Premium Executive Sedan',
    capacity: 'Up to 4 Passengers',
    passengersMax: 4,
    luggageMax: 3,
    image: '/images/lexus_img.png',
    minHours: 2,
    features: [
      'Plush Leather Executive Interior',
      'Acoustic Whisper-Quiet Cabin',
      'Smooth Floating Ride Suspension',
      'Device Fast-Charging Ports',
      'Flight Tracking Chauffeur Service',
    ],
    description: 'Smooth, quiet luxury for individual executives, couples, and small group airport transfers.',
  },
];

/**
 * Calculates rate guarantee display without listing specific dollar figures
 */
export function calculateFareEstimate({ tripType, pickupLocation, destination, hours, vehicleId }) {
  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[0];

  if (tripType === 'Hourly Rental') {
    const parsedHours = Math.max(vehicle.minHours, parseInt(hours, 10) || 2);
    return {
      displayText: `Guaranteed Flat Rate (${parsedHours} Hrs Charter)`,
      isHourly: true,
    };
  }

  if (pickupLocation && destination) {
    return { displayText: 'Guaranteed Flat Rate • Zero Surge' };
  }

  return { displayText: 'Upfront Flat Rate Guarantee' };
}
