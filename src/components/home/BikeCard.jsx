import React from 'react';
import { KeyRound, BatteryCharging, Shield, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const BikeCard = ({ bike }) => {
  const { handleBookBike } = useBooking();

  const formattedPrice = new Intl.NumberFormat('vi-VN').format(bike.pricePerDay);

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group hover:-translate-y-1">
      
      {/* Image Container with Badges */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
        <img
          src={bike.image}
          alt={bike.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Top-left specs badge */}
        <div className="absolute top-3 left-3 bg-slate-900/85 backdrop-blur-sm text-white text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm">
          {bike.badge}
        </div>

        {/* Top-right availability badge */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-sm flex items-center gap-1.5 border border-emerald-100">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{bike.status}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        
        <div>
          {/* Brand & Plate Chip */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
              {bike.brand}
            </span>
            <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono font-bold text-[11px] border border-blue-200/70">
              {bike.plateNumber}
            </span>
          </div>

          {/* Bike Name */}
          <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition">
            {bike.name}
          </h3>

          {/* Meta text */}
          <p className="text-xs text-slate-500 font-medium mt-1 mb-4">
            Biển số: <strong className="text-slate-700">{bike.plateNumber}</strong> | Loại: <strong className="text-slate-700">{bike.categoryLabel}</strong>
          </p>

          {/* Features list */}
          <ul className="space-y-2 mb-5 text-xs text-slate-600">
            {bike.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                </span>
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Price & Action Button */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
              Giá niêm yết
            </div>
            <div className="flex items-baseline gap-1">
              <span className="text-xl font-black text-rose-600">
                {formattedPrice}đ
              </span>
              <span className="text-xs text-slate-400 font-medium">/ngày</span>
            </div>
          </div>

          <button
            onClick={() => handleBookBike(bike)}
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-bold text-xs shadow-md shadow-orange-500/20 hover:shadow-lg transition cursor-pointer"
          >
            <span>ĐẶT THUÊ</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

    </div>
  );
};
