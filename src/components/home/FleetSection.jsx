import React from 'react';
import { BIKES_DATA } from '../../data/bikesData';
import { BikeFilterTabs } from './BikeFilterTabs';
import { BikeCard } from './BikeCard';
import { useBooking } from '../../context/BookingContext';

export const FleetSection = () => {
  const { activeCategory } = useBooking();

  // Filter bikes according to chosen category tab
  const filteredBikes = activeCategory === 'all'
    ? BIKES_DATA
    : BIKES_DATA.filter((b) => b.category === activeCategory);

  return (
    <section id="fleet-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      
      {/* Header and Filter Row */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <span className="text-xs font-extrabold uppercase tracking-wider text-blue-600 block mb-1">
            • DANH MỤC ĐỘI XE 2026
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Đội Xe Trống Đang Có Tại Hải Châu & Sân Bay
          </h2>
        </div>

        <BikeFilterTabs />
      </div>

      {/* Bike Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBikes.map((bike) => (
          <BikeCard key={bike.id} bike={bike} />
        ))}
      </div>

      {filteredBikes.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
          Hiện tại phân khúc này đã được khách đặt hết. Vui lòng chọn phân khúc khác!
        </div>
      )}

    </section>
  );
};
