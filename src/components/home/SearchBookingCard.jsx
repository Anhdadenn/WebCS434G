import React from 'react';
import { Search, MapPin, Calendar, Clock, Info } from 'lucide-react';
import { BRANCHES_DATA } from '../../data/branchesData';
import { useBooking } from '../../context/BookingContext';

export const SearchBookingCard = () => {
  const {
    pickupLocation,
    setPickupLocation,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
    showToast
  } = useBooking();

  const handleSearch = (e) => {
    e.preventDefault();
    const fleetSection = document.getElementById('fleet-section');
    if (fleetSection) {
      fleetSection.scrollIntoView({ behavior: 'smooth' });
    }
    showToast('Đang hiển thị các xe sẵn sàng giao tại địa điểm đã chọn!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-200/80 p-5 sm:p-6 lg:p-7">
        
        {/* Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-5 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
              <Search className="w-4 h-4 stroke-[2.5]" />
            </div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Tìm & Giữ xe trực tuyến tại Đà Nẵng
            </h2>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              18 xe đang sẵn sàng giao ngay
            </span>
          </div>
        </div>

        {/* Form Fields Grid */}
        <form onSubmit={handleSearch} className="mt-5">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
            
            {/* Field 1: Địa điểm */}
            <div className="md:col-span-4">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-600" />
                  Địa điểm nhận & trả xe
                </span>
              </label>
              <div className="relative">
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full pl-3 pr-8 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/60 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition truncate"
                >
                  {BRANCHES_DATA.map((branch) => (
                    <option key={branch.id} value={branch.name}>
                      {branch.name}
                    </option>
                  ))}
                  <option value="Sân bay Quốc tế Đà Nẵng (Sảnh T1 & T2)">
                    Sân bay Quốc tế Đà Nẵng (Sảnh T1 & T2)
                  </option>
                  <option value="Ga xe lửa Đà Nẵng (Hải Châu)">
                    Ga xe lửa Đà Nẵng (Hải Châu)
                  </option>
                  <option value="Giao tận khách sạn nội thành theo yêu cầu">
                    Giao tận khách sạn nội thành theo yêu cầu
                  </option>
                </select>
              </div>
            </div>

            {/* Field 2: Ngày giờ nhận xe */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-600" />
                  Ngày giờ nhận xe
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/60 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  placeholder="15/11/2026 - 08:00"
                />
              </div>
            </div>

            {/* Field 3: Ngày giờ trả xe */}
            <div className="md:col-span-3">
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-blue-600" />
                  Ngày giờ trả xe
                </span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-3 rounded-xl border border-slate-200 text-xs sm:text-sm font-medium text-slate-800 bg-slate-50/60 hover:border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 transition"
                  placeholder="17/11/2026 - 08:00"
                />
              </div>
            </div>

            {/* Button: Tìm xe trống */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-600 hover:to-amber-700 text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-md shadow-orange-500/25 hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 stroke-[2.5]" />
                <span>TÌM XE TRỐNG</span>
              </button>
            </div>

          </div>

          {/* Footer Note */}
          <div className="mt-4 pt-3 flex items-center gap-2 text-xs text-slate-500">
            <Info className="w-4 h-4 text-blue-600 shrink-0" />
            <span>
              Thời gian thuê dự tính: <strong className="text-slate-700">2 ngày 0 giờ (48 tiếng)</strong> • Áp dụng giá thuê theo mốc 24h chuẩn
            </span>
          </div>
        </form>

      </div>
    </div>
  );
};
