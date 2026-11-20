import React from 'react';
import { MapPin, Zap, ShieldCheck, Sparkles, HardHat, LifeBuoy } from 'lucide-react';
import { TRUST_BADGES } from '../../data/commitmentsData';

const iconMap = {
  ShieldCheck,
  Sparkles,
  HardHat,
  LifeBuoy
};

export const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-b from-blue-900 via-blue-800 to-indigo-900 text-white pt-14 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#93c5fd_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10 text-center md:text-left">
        
        {/* Chips / Sub-badges */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-blue-950/60 text-blue-200 border border-blue-700/50 backdrop-blur-sm">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Đà Nẵng • Sơn Trà • Ngũ Hành Sơn • Hội An
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/40 backdrop-blur-sm">
            <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            Giao xe siêu tốc 15 phút
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-[1.15] max-w-4xl uppercase text-white mb-6">
          THUÊ XE MÁY ĐÀ NẴNG — <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-white to-blue-100">
            GIAO TẬN NƠI NHANH CHÓNG 15 PHÚT
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg text-blue-100/90 max-w-3xl leading-relaxed mb-10">
          Thủ tục eKYC 100% online, xe đời mới bảo dưỡng định kỳ, kèm 2 nón bảo hiểm & áo mưa cao cấp. Không giữ hộ chiếu, không phí ẩn.
        </p>

        {/* 4 Feature Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl">
          {TRUST_BADGES.map((item) => {
            const IconComponent = iconMap[item.icon] || ShieldCheck;
            return (
              <div 
                key={item.id} 
                className="flex items-center gap-3 p-3 sm:p-3.5 rounded-xl bg-blue-950/40 border border-blue-700/40 backdrop-blur-md hover:bg-blue-950/60 transition"
              >
                <div className="w-9 h-9 rounded-lg bg-blue-600/40 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-xs sm:text-sm font-bold text-white leading-tight">
                    {item.title}
                  </div>
                  <div className="text-[11px] text-blue-200/80 leading-tight">
                    {item.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
