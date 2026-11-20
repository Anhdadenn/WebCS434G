import React, { createContext, useContext, useState } from 'react';
import { BIKES_DATA } from '../data/bikesData';
import { MOCK_BOOKING_DATA } from '../data/mockBookingData';

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  // Navigation state: 'home' | 'booking'
  const [currentPage, setCurrentPage] = useState('home');

  // Currently selected bike for rental
  const [selectedBike, setSelectedBike] = useState(BIKES_DATA[0]);

  // Filter category in Fleet Section
  const [activeCategory, setActiveCategory] = useState('all');

  // Search booking parameters
  const [pickupLocation, setPickupLocation] = useState('CN01 - Sân bay Quốc tế Đà Nẵng (Hải Châu)');
  const [pickupDate, setPickupDate] = useState('15/11/2026 - 08:00');
  const [returnDate, setReturnDate] = useState('17/11/2026 - 08:00');
  const [rentalDays, setRentalDays] = useState(2);

  // Toast feedback state
  const [toast, setToast] = useState({ show: false, message: '' });

  // KYC modal view
  const [activeDocPreview, setActiveDocPreview] = useState(null);

  // Payment status
  const [paymentStatus, setPaymentStatus] = useState('pending'); // 'pending' | 'success' | 'cancelled'

  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => {
      setToast({ show: false, message: '' });
    }, 2800);
  };

  const handleBookBike = (bike) => {
    setSelectedBike(bike);
    setCurrentPage('booking');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Pricing calculations
  const bikePrice = selectedBike ? selectedBike.pricePerDay : 150000;
  const subtotal = bikePrice * rentalDays;
  const vat = Math.round(subtotal * 0.08);
  const totalAmount = subtotal + vat;
  const depositAmount = Math.round(totalAmount * 0.3);
  const remainingAmount = totalAmount - depositAmount;

  return (
    <BookingContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        selectedBike,
        setSelectedBike,
        activeCategory,
        setActiveCategory,
        pickupLocation,
        setPickupLocation,
        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,
        rentalDays,
        setRentalDays,
        toast,
        showToast,
        activeDocPreview,
        setActiveDocPreview,
        paymentStatus,
        setPaymentStatus,
        handleBookBike,
        bookingInfo: MOCK_BOOKING_DATA,
        pricing: {
          subtotal,
          vat,
          totalAmount,
          depositAmount,
          remainingAmount
        }
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
