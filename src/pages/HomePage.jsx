import React from 'react';
import Hero from '../components/Hero';
import QuickInfoBar from '../components/QuickInfoBar';
import ServicesSection from '../components/ServicesSection';
import FleetSection from '../components/FleetSection';
import WhyChooseUs from '../components/WhyChooseUs';
import HoustonGuide from '../components/HoustonGuide';
import Testimonials from '../components/Testimonials';
import CtaBanner from '../components/CtaBanner';

export default function HomePage({ onSelectVehicle }) {
  return (
    <main id="main-content">
      {/* Hero Section with Live Booking Engine */}
      <Hero onSelectVehicle={onSelectVehicle} />

      {/* 24/7 Hotline & Real-time Flight Monitoring Bar */}
      <QuickInfoBar />

      {/* Travel Solutions (Airport, Hourly, NASA, Cruise, Corporate, 8-Pax) */}
      <ServicesSection />

      {/* Fleet Showcase (Chevrolet Suburban & Lexus Luxury Sedan) */}
      <FleetSection onSelectVehicleForBooking={onSelectVehicle} />

      {/* Value Pillars & Guarantee */}
      <WhyChooseUs />

      {/* Houston City & Galveston Tour Guide */}
      <HoustonGuide />

      {/* Client Testimonials Carousel */}
      <Testimonials />

      {/* Direct WhatsApp & Call Chauffeur Banner */}
      <CtaBanner />
    </main>
  );
}
