import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import Preloader from './components/Preloader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import { useLenis, smoothScrollTo } from './hooks/useLenis';
import { useScrollReveal } from './hooks/useScrollReveal';

/**
 * Handles smooth scrolling to anchor hash on page load/route change,
 * or immediate top scroll when switching pages without hash.
 */
function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        smoothScrollTo(hash);
      }, 150);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  return null;
}

function AppContent() {
  // Initialize Lenis smooth scrolling across the entire page
  useLenis();

  // Initialize GPU-accelerated smooth scroll reveal animations
  useScrollReveal();

  const [selectedVehicle, setSelectedVehicle] = useState('suburban');

  const handleSelectVehicleForBooking = (vehicleId) => {
    setSelectedVehicle(vehicleId);
  };

  return (
    <div className="app-layout">
      {/* Premium Luxury Minimal Preloader */}
      <Preloader />

      {/* Scroll Position & Anchor Controller */}
      <ScrollHandler />

      {/* Floating Glassmorphic Navigation */}
      <Navbar />

      {/* Client-Side Page Routes */}
      <Routes>
        <Route
          path="/"
          element={<HomePage onSelectVehicle={handleSelectVehicleForBooking} selectedVehicle={selectedVehicle} />}
        />
        <Route
          path="/about"
          element={<AboutPage />}
        />
        <Route
          path="*"
          element={<HomePage onSelectVehicle={handleSelectVehicleForBooking} selectedVehicle={selectedVehicle} />}
        />
      </Routes>

      {/* Comprehensive Footer */}
      <Footer />

      {/* Mobile Conversion Sticky Bar */}
      <MobileStickyBar />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
