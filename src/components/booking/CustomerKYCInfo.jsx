import React from 'react';
import { ShieldCheck, CheckCircle2, User, Phone, CreditCard, Award, MapPin, Eye } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const CustomerKYCInfo = () => {
  const { bookingInfo, setActiveDocPreview } = useBooking();
  const { customer } = bookingInfo;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs">
      
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <User className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              1. Thông tin khách thuê & Định danh eKYC điện tử
            </h2>
            <p className="text-xs text-slate-500">
              Dữ liệu được mã hóa SSL 256-bit và xác thực AI OCR thời gian thực
            </p>
          </div>
        </div>

        <div className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200 text-xs font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>{customer.kycLevel}</span>
        </div>
      </div>

      {/* Form Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
        
        {/* Họ tên */}
        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Họ và tên người thuê
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">{customer.name}</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Số điện thoại */}
        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Số điện thoại liên lạc
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800 font-mono">{customer.phone}</span>
            <span className="text-[11px] font-semibold text-blue-700 bg-blue-100/60 px-2 py-0.5 rounded">
              {customer.messengerTag}
            </span>
          </div>
        </div>

        {/* Số CCCD */}
        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Số CCCD gắn chip
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800 font-mono">{customer.cccd}</span>
            <span className="text-[11px] font-semibold text-slate-600 bg-slate-200/70 px-2 py-0.5 rounded">
              {customer.cccdType}
            </span>
          </div>
        </div>

        {/* GPLX */}
        <div className="p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Giấy phép lái xe (GPLX)
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-bold text-slate-800">{customer.license}</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
        </div>

        {/* Khách sạn lưu trú */}
        <div className="sm:col-span-2 p-3.5 bg-slate-50/80 rounded-xl border border-slate-200/70">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
            Địa chỉ lưu trú / Khách sạn tại Đà Nẵng
          </div>
          <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-slate-800">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
            <span>{customer.hotelAddress}</span>
          </div>
        </div>

      </div>

      {/* Verified eKYC Documents Container */}
      <div className="mt-5 p-4 sm:p-5 rounded-xl bg-emerald-50/60 border border-emerald-200/80">
        <div className="flex items-start gap-2.5 mb-2">
          <ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
          <div>
            <div className="text-xs sm:text-sm font-bold text-emerald-950">
              [✓] Ảnh CCCD & GPLX đã xác thực eKYC hợp lệ (trangThaiEKYC = True)
            </div>
            <p className="text-[11px] text-emerald-800/90 leading-relaxed mt-0.5">
              Khách thuê không cần giữ lại CCCD/Hộ chiếu gốc khi bàn giao xe. Nhân viên điều phối sẽ đối chiếu trực tiếp qua thiết bị Smart App khi nhận xe tại sảnh.
            </p>
          </div>
        </div>

        {/* 3 Document Previews */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4">
          {customer.documents.map((doc) => (
            <div
              key={doc.id}
              onClick={() => setActiveDocPreview(doc)}
              className="group cursor-pointer bg-white rounded-lg border border-emerald-200 overflow-hidden shadow-xs hover:shadow-md transition relative"
            >
              <div className="aspect-[16/10] bg-slate-100 relative overflow-hidden">
                <img
                  src={doc.imageUrl}
                  alt={doc.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                  <Eye className="w-5 h-5" />
                </div>
                <div className="absolute top-1 right-1 bg-emerald-600 text-white font-mono text-[9px] sm:text-[10px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                  {doc.verifiedTag}
                </div>
              </div>
              <div className="p-2 text-center text-[10px] sm:text-xs font-bold text-slate-700 bg-white truncate">
                {doc.title}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
