import React from 'react';
import { X, CheckCircle, ShieldCheck } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const KycModal = () => {
  const { activeDocPreview, setActiveDocPreview } = useBooking();

  if (!activeDocPreview) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
      <div 
        className="bg-white rounded-2xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-slate-800 text-base">{activeDocPreview.title}</h3>
          </div>
          <button 
            onClick={() => setActiveDocPreview(null)}
            className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="relative rounded-xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video flex items-center justify-center">
            <img 
              src={activeDocPreview.imageUrl} 
              alt={activeDocPreview.title}
              className="w-full h-full object-cover" 
            />
            <div className="absolute top-3 right-3 bg-emerald-600 text-white font-mono text-xs px-2.5 py-1 rounded shadow flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5" />
              {activeDocPreview.verifiedTag}
            </div>
          </div>

          <div className="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-800 leading-relaxed">
              <strong>Xác thực eKYC cấp độ 2 tự động:</strong> Ảnh chụp rõ nét, phôi chip C06 trùng khớp 100% với cơ sở dữ liệu Bộ Công An. Khách hàng không cần để lại bản cứng giấy tờ khi nhận xe.
            </div>
          </div>

          <div className="mt-5 flex justify-end">
            <button 
              onClick={() => setActiveDocPreview(null)}
              className="px-5 py-2 bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium rounded-xl transition shadow"
            >
              Đóng xem trước
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
