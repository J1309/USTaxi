import React from 'react';
import Hero from '../components/Hero';
import QuickInfoBar from '../components/QuickInfoBar';
import FleetSection from '../components/FleetSection';
import VehicleInteriorSection from '../components/VehicleInteriorSection';
import ChildSafetySection from '../components/ChildSafetySection';
import ServicesSection from '../components/ServicesSection';
import WhyChooseUs from '../components/WhyChooseUs';
import CtaBanner from '../components/CtaBanner';
import HoustonGuide from '../components/HoustonGuide';

export default function HomePage({ onSelectVehicle }) {
  return (
    <main id="main-content">
      {/* 1. Hero Section (Reliable Transportation Across Houston with Suburban image) */}
      <Hero />

      {/* 2. Services Highlight Strip (4 columns with gold circular icons) */}
      <QuickInfoBar />

      {/* 3. Our Fleet & Book Your Ride (2 cars: Lexus Sedan & Chevrolet Suburban + Booking Widget on dark navy) */}
      <FleetSection onSelectVehicleForBooking={onSelectVehicle} />

      {/* 4. First-Class Vehicle Interior Showcase (Executive Cabin Amenities) */}
      <VehicleInteriorSection />

      {/* 5. Child Safety & Family Travel Section (Certified Car Seats & Safe Standards) */}
      <ChildSafetySection />

      {/* 6. Houston Airport Transportation (IAH & HOU Airport Transfers with 2 cards) */}
      <ServicesSection />

      {/* 7. Why Ride With Us (Exact 6-card bento grid preserved 100%) */}
      <WhyChooseUs />

      {/* 8. Why Choose Lavender Taxi & Ready for Your Ride? Skyline Banner */}
      <CtaBanner />

      {/* 9. Service Areas & Google Customer Reviews (2-column layout matching reference) */}
      <HoustonGuide />
    </main>
  );
}
