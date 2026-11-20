import React from 'react';
import { Phone, CheckCircle, Shield, Bike } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Navbar = () => {
  const { currentPage, setCurrentPage } = useBooking();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Slogan */}
          <div 
            onClick={() => setCurrentPage('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Bike className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-blue-900 group-hover:text-blue-700 transition">
                  SMARTBIKE
                </span>
                <span className="text-[10px] bg-blue-100 text-blue-700 font-bold px-1.5 py-0.5 rounded tracking-wider">
                  RENTAL
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium tracking-tight">
                Thuê xe thông minh Đà Nẵng
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            <button
              onClick={() => setCurrentPage('home')}
              className={`transition-colors py-1 relative ${
                currentPage === 'home'
                  ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              Trang chủ
            </button>

            <button
              onClick={() => setCurrentPage('booking')}
              className={`flex items-center gap-1.5 py-1 relative transition-colors ${
                currentPage === 'booking'
                  ? 'text-blue-600 font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-blue-600'
                  : 'text-slate-600 hover:text-blue-600'
              }`}
            >
              <span>Đơn thuê</span>
              <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[11px] font-bold flex items-center justify-center shadow-xs">
                1
              </span>
            </button>

            <button 
              onClick={() => {
                setCurrentPage('booking');
              }}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Hồ sơ eKYC
            </button>

            <button 
              onClick={() => {
                setCurrentPage('home');
                const fleet = document.getElementById('fleet-section');
                if (fleet) fleet.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-slate-600 hover:text-blue-600 transition-colors"
            >
              Bảng giá & Chi nhánh
            </button>
          </nav>

          {/* Hotline & User Profile */}
          <div className="flex items-center gap-4">
            {/* Hotline Pill */}
            <a 
              href="tel:0905888999"
              className="hidden lg:flex items-center gap-2 px-3.5 py-2 rounded-full border border-blue-200 text-blue-700 bg-blue-50/50 hover:bg-blue-50 hover:border-blue-300 transition text-xs font-semibold"
            >
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Phone className="w-3.5 h-3.5" />
              </div>
              <span>Hotline: 0905.888.999</span>
            </a>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                  alt="Sơn Nam"
                  className="w-10 h-10 rounded-full object-cover border-2 border-emerald-500 ring-2 ring-emerald-100"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
                  <CheckCircle className="w-2.5 h-2.5 text-white" />
                </span>
              </div>
              <div className="text-left">
                <div className="text-sm font-bold text-slate-800 leading-tight">
                  Sơn Nam
                </div>
                <div className="text-[11px] font-semibold text-emerald-600 flex items-center gap-0.5">
                  <span>eKYC</span>
                  <CheckCircle className="w-3 h-3 fill-emerald-600 text-white" />
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </header>
  );
};
