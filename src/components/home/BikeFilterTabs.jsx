import React from 'react';
import { BIKE_CATEGORIES } from '../../data/bikesData';
import { useBooking } from '../../context/BookingContext';

export const BikeFilterTabs = () => {
  const { activeCategory, setActiveCategory } = useBooking();

  return (
    <div className="flex flex-wrap items-center gap-2">
      {BIKE_CATEGORIES.map((tab) => {
        const isActive = activeCategory === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveCategory(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 cursor-pointer ${
              isActive
                ? 'bg-slate-900 text-white shadow-md'
                : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200'
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full ${
                isActive
                  ? 'bg-slate-800 text-blue-300'
                  : 'bg-slate-100 text-slate-500'
              }`}
            >
              ({tab.count})
            </span>
          </button>
        );
      })}
    </div>
  );
};
