import React from 'react';
import { Headphones, PhoneCall } from 'lucide-react';

export const SupportHotlineBox = () => {
  return (
    <div className="mt-4 p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
          <Headphones className="w-5 h-5" />
        </div>
        <div className="text-xs">
          <div className="text-slate-500 font-medium">Cần hỗ trợ thanh toán cọc nhanh?</div>
          <div className="font-bold text-slate-800">
            Hotline Điều phối: <span className="text-blue-600 font-mono">0905.888.999</span>
          </div>
        </div>
      </div>

      <a
        href="tel:0905888999"
        className="px-3.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 text-xs font-bold transition flex items-center gap-1.5 shrink-0"
      >
        <PhoneCall className="w-3.5 h-3.5" />
        <span>Gọi ngay</span>
      </a>
    </div>
  );
};
