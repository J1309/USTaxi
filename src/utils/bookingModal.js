import { smoothScrollTo } from '../hooks/useLenis';

/**
 * Opens the mobile booking bottom sheet if on mobile screen,
 * or smooth scrolls to the desktop booking engine on desktop screen.
 */
export function openBooking(vehicle = 'suburban') {
  if (typeof window !== 'undefined') {
    if (window.innerWidth <= 900) {
      window.dispatchEvent(new CustomEvent('open-booking-sheet', { detail: { vehicle } }));
    } else {
      window.dispatchEvent(new CustomEvent('select-booking-vehicle', { detail: { vehicle } }));
      smoothScrollTo('#booking-engine');
    }
  }
}
