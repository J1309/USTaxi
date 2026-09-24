/**
 * Fare Estimator for Lavender Taxi Service Houston
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
    capacity: 'Up to 8 Passengers',
    passengersMax: 8,
    luggageMax: 8,
    image: '/images/fleet_suburban.jpg',
    baseRate: 70,
    perMile: 2.85,
    hourlyRate: 85,
    minHours: 2,
    features: [
      '8 Full-Size Leather Seats',
      'Massive Luggage Capacity (8+ Bags)',
      'Rear Climate Control & USB Chargers',
      'Complimentary Bottled Water & WiFi',
      'Child & Booster Seats Available',
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
    image: '/images/fleet_lexus.jpg',
    baseRate: 55,
    perMile: 2.30,
    hourlyRate: 65,
    minHours: 2,
    features: [
      'Plush Leather Executive Interior',
      'Acoustic Whisper-Quiet Cabin',
      'Smooth Floating Ride Suspension',
      'Device Fast-Charging Ports',
      'Flight Tracking Chauffeur Service',
    ],
    description: 'Immaculate luxury and whisper-quiet suspension for solo business travelers, couples, and swift airport transfers.',
  },
];

/**
 * Calculates approximate fare estimate
 */
export function calculateFareEstimate({ tripType, pickupLocation, destination, hours, vehicleId }) {
  const vehicle = VEHICLE_OPTIONS.find((v) => v.id === vehicleId) || VEHICLE_OPTIONS[0];

  if (tripType === 'Hourly Rental') {
    const parsedHours = Math.max(vehicle.minHours, parseInt(hours, 10) || 2);
    const amount = parsedHours * vehicle.hourlyRate;
    return {
      min: amount,
      max: amount,
      displayText: `$${amount} Flat (${parsedHours} hrs @ $${vehicle.hourlyRate}/hr)`,
      isHourly: true,
    };
  }

  // Pre-calculated popular routes lookup
  const key = `${pickupLocation} -> ${destination}`.toLowerCase();
  
  // Specific known pairings
  if (key.includes('iah') && key.includes('downtown')) {
    const base = vehicle.id === 'suburban' ? 85 : 65;
    return { min: base - 5, max: base + 10, displayText: `$${base - 5} - $${base + 10}` };
  }
  if (key.includes('hou') && key.includes('downtown')) {
    const base = vehicle.id === 'suburban' ? 65 : 50;
    return { min: base - 5, max: base + 5, displayText: `$${base - 5} - $${base + 5}` };
  }
  if ((key.includes('iah') || key.includes('bush')) && key.includes('galveston')) {
    const base = vehicle.id === 'suburban' ? 175 : 145;
    return { min: base - 10, max: base + 15, displayText: `$${base - 10} - $${base + 15}` };
  }
  if (key.includes('hobby') && key.includes('galveston')) {
    const base = vehicle.id === 'suburban' ? 130 : 105;
    return { min: base - 10, max: base + 10, displayText: `$${base - 10} - $${base + 10}` };
  }
  if (key.includes('nasa') || key.includes('space center')) {
    const base = vehicle.id === 'suburban' ? 95 : 75;
    return { min: base - 10, max: base + 10, displayText: `$${base - 10} - $${base + 10}` };
  }
  if (key.includes('woodlands')) {
    const base = vehicle.id === 'suburban' ? 95 : 75;
    return { min: base - 5, max: base + 15, displayText: `$${base - 5} - $${base + 15}` };
  }
  if (key.includes('katy') || key.includes('sugar land')) {
    const base = vehicle.id === 'suburban' ? 115 : 90;
    return { min: base - 10, max: base + 15, displayText: `$${base - 10} - $${base + 15}` };
  }

  // Fallback realistic estimate based on vehicle type
  if (pickupLocation && destination) {
    const base = vehicle.id === 'suburban' ? 85 : 65;
    return { min: base, max: base + 25, displayText: `$${base} - $${base + 25} (Est.)` };
  }

  return { min: vehicle.baseRate, max: vehicle.baseRate + 30, displayText: `From $${vehicle.baseRate}` };
}
