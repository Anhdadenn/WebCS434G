import React from 'react';
import { BookingProvider, useBooking } from './context/BookingContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BookingCheckoutPage } from './pages/BookingCheckoutPage';
import { Toast } from './components/common/Toast';
import { KycModal } from './components/common/KycModal';

// Inner component to access BookingContext
const AppContent = () => {
  const { currentPage } = useBooking();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Navigation Bar */}
      <Navbar />

      {/* Dynamic Page Router */}
      <div className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'booking' && <BookingCheckoutPage />}
      </div>

      {/* Global Footer */}
      <Footer />

      {/* Global Feedback Components */}
      <Toast />
      <KycModal />
    </div>
  );
};

export default function App() {
  return (
    <BookingProvider>
      <AppContent />
    </BookingProvider>
  );
}
