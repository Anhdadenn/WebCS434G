import React from 'react';
import { ShieldCheck, Check } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Stepper = () => {
  const { bookingInfo } = useBooking();

  return (
    <div className="bg-white border-b border-slate-200 py-4 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Header ID */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                HỆ THỐNG BẢO CHỨNG EKYC
              </div>
              <div className="text-base font-extrabold text-slate-900">
                Đơn thuê xe trực tuyến <span className="text-blue-700 font-mono">{bookingInfo.orderId}</span>
              </div>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center gap-3 text-xs">
            {/* Step 1 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-xs">
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              </div>
              <div className="text-left">
                <div className="font-bold text-slate-800">Bước 1: Chọn xe</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Hoàn tất ✓</div>
              </div>
            </div>

            {/* Connecting line */}
            <div className="w-8 sm:w-12 h-0.5 bg-emerald-500" />

            {/* Step 2 */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs ring-4 ring-blue-100">
                2
              </div>
              <div className="text-left">
                <div className="font-bold text-blue-700">Bước 2: eKYC & Cọc VietQR</div>
                <div className="text-[10px] text-blue-600 font-semibold">Đang thực hiện</div>
              </div>
            </div>

            {/* Connecting line */}
            <div className="w-8 sm:w-12 h-0.5 bg-slate-200" />

            {/* Step 3 */}
            <div className="flex items-center gap-2 text-slate-400">
              <div className="w-6 h-6 rounded-full bg-slate-100 border border-slate-300 text-slate-500 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <div className="text-left">
                <div className="font-medium text-slate-600">Bước 3: Nhận xe</div>
                <div className="text-[10px] text-slate-400">Tại Sân bay ĐN</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
