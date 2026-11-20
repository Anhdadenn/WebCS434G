import React from 'react';
import { Stepper } from '../components/layout/Stepper';
import { CustomerKYCInfo } from '../components/booking/CustomerKYCInfo';
import { ContractDetails } from '../components/booking/ContractDetails';
import { PaymentVietQR } from '../components/booking/PaymentVietQR';
import { SupportHotlineBox } from '../components/booking/SupportHotlineBox';
import { ArrowLeft } from 'lucide-react';
import { useBooking } from '../context/BookingContext';

export const BookingCheckoutPage = () => {
  const { setCurrentPage } = useBooking();

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20">
      {/* Stepper Header */}
      <Stepper />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Back button */}
        <button
          onClick={() => setCurrentPage('home')}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-blue-600 mb-6 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại chọn xe khác</span>
        </button>

        {/* Main 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: KYC Information + Contract Details */}
          <div className="lg:col-span-7 xl:col-span-7 space-y-6">
            <CustomerKYCInfo />
            <ContractDetails />
          </div>

          {/* Right Column: Payment VietQR + 24/7 Hotline Box */}
          <div className="lg:col-span-5 xl:col-span-5 sticky top-28 space-y-4">
            <PaymentVietQR />
            <SupportHotlineBox />
          </div>

        </div>

      </div>
    </div>
  );
};
