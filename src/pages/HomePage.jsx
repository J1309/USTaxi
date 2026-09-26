import React from 'react';
import Hero from '../components/Hero';
import QuickInfoBar from '../components/QuickInfoBar';
import ServicesSection from '../components/ServicesSection';
import FleetSection from '../components/FleetSection';
import DestinationsSection from '../components/DestinationsSection';
import WhyChooseUs from '../components/WhyChooseUs';

export default function HomePage({ onSelectVehicle }) {
  return (
    <main id="main-content">
      {/* 1. Hero Section with Chevrolet Suburban & Floating Horizontal Booking Engine */}
      <Hero onSelectVehicle={onSelectVehicle} />

      {/* 2. 4-Pillar Luxury Highlights Bar (Luxury Fleet • On-Time • Safe • 24/7 Support) */}
      <QuickInfoBar />

      {/* 3. Services Section ("TRAVEL WITHOUT COMPROMISE" - 3 Vertical Cards) */}
      <ServicesSection />

      {/* 4. Our Fleet ("EXCEPTIONAL VEHICLES FOR EVERY JOURNEY" - Suburban & Lexus Only) */}
      <FleetSection onSelectVehicleForBooking={onSelectVehicle} />

      {/* 5. Popular Destinations ("EXPLORE THE CITY IN COMFORT" - Dark Maroon Theme) */}
      <DestinationsSection />

      {/* 6. Why Choose Us ("A HIGHER STANDARD OF TRAVEL" - Passenger Photo & 4 Pillars) */}
      <WhyChooseUs />

      {/* Customer reviews and app download intentionally removed from homepage per client instruction */}
    </main>
  );
}
