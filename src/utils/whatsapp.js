/**
 * WhatsApp Dispatch Utility for Lavender Taxi Service
 * Owner contact: +1 (832) 879-8685 (Houston, Texas)
 */

export const OWNER_PHONE_RAW = '18328798685';
export const OWNER_PHONE_DISPLAY = '(832) 879-8685';
export const OWNER_EMAIL = 'info@lavendertaxi.com';

/**
 * Builds a formatted WhatsApp message and returns the direct WhatsApp URL
 * @param {Object} booking
 * @returns {string}
 */
export function buildWhatsAppBookingUrl(booking) {
  const {
    tripType = 'One Way',
    pickupLocation = '',
    destination = '',
    hours = '3',
    pickupDate = '',
    pickupTime = '',
    passengers = 1,
    luggage = 1,
    vehicle = 'Chevrolet Suburban (8-Seater)',
    flightNumber = '',
    customerName = '',
    customerPhone = '',
    notes = '',
    estimatedFare = null,
  } = booking;

  const header = `🚖 *NEW BOOKING REQUEST — LAVENDER TAXI SERVICE*`;
  const divider = `──────────────────────────────`;

  const details = [
    `📍 *Trip Type:* ${tripType}`,
    `📍 *Pickup:* ${pickupLocation || 'To be specified'}`,
    tripType === 'Hourly Rental' 
      ? `⏱️ *Duration:* ${hours} Hours (Flexible As Directed)`
      : `🎯 *Destination:* ${destination || 'To be specified'}`,
    `📅 *Pickup Date:* ${pickupDate || 'Flexible / Today'}`,
    `⏰ *Pickup Time:* ${pickupTime || 'Immediate / As Scheduled'}`,
    `🚘 *Vehicle Choice:* ${vehicle}`,
    `👥 *Passengers:* ${passengers} | 🧳 *Luggage:* ${luggage} Bags`,
  ];

  if (flightNumber && flightNumber.trim()) {
    details.push(`✈️ *Flight Track #:* ${flightNumber.trim()} (IAH / HOU)`);
  }

  if (customerName && customerName.trim()) {
    details.push(`👤 *Passenger Name:* ${customerName.trim()}`);
  }

  if (customerPhone && customerPhone.trim()) {
    details.push(`📞 *Contact Phone:* ${customerPhone.trim()}`);
  }

  if (notes && notes.trim()) {
    details.push(`💬 *Special Instructions:* ${notes.trim()}`);
  }

  if (estimatedFare) {
    details.push(`💵 *Estimated Rate:* $${estimatedFare}`);
  }

  const footer = `\n_Sent via Lavender Taxi Service Houston Web App._\n_Please confirm availability and dispatch our chauffeur. Thank you!_`;

  const message = [header, divider, ...details, divider, footer].join('\n');

  return `https://wa.me/${OWNER_PHONE_RAW}?text=${encodeURIComponent(message)}`;
}

/**
 * Direct WhatsApp chat with owner
 */
export function getDirectWhatsAppChatUrl() {
  const text = `Hello Lavender Taxi Service! I would like to inquire about booking a ride in Houston.`;
  return `https://wa.me/${OWNER_PHONE_RAW}?text=${encodeURIComponent(text)}`;
}

/**
 * Direct WhatsApp inquiry addressed directly to Symanthan
 */
export function getDirectWhatsAppOwnerUrl() {
  const text = `Hello Symanthan! I came across Lavender Taxi Service and would like to inquire about reserving a private ride in Houston.`;
  return `https://wa.me/${OWNER_PHONE_RAW}?text=${encodeURIComponent(text)}`;
}

