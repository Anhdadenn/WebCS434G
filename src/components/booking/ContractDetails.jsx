import React from 'react';
import { FileText, Clock, MapPin, ShieldCheck, CheckCircle2, Bike, ExternalLink, Sparkles } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const ContractDetails = () => {
  const { selectedBike, bookingInfo, rentalDays, pricing } = useBooking();

  const formattedSubtotal = new Intl.NumberFormat('vi-VN').format(pricing.subtotal);
  const formattedVat = new Intl.NumberFormat('vi-VN').format(pricing.vat);
  const formattedTotal = new Intl.NumberFormat('vi-VN').format(pricing.totalAmount);
  const formattedDeposit = new Intl.NumberFormat('vi-VN').format(pricing.depositAmount);
  const formattedRemaining = new Intl.NumberFormat('vi-VN').format(pricing.remainingAmount);

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs mt-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-5 border-b border-slate-100">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
              2. Chi tiết hợp đồng thuê xe điện tử {bookingInfo.orderId}
            </h2>
            <p className="text-xs text-slate-500">
              Lập ngày {bookingInfo.createdDate} • {bookingInfo.storageMethod}
            </p>
          </div>
        </div>

        <button 
          onClick={() => alert("Điều khoản hợp đồng điện tử đã được phê duyệt chuẩn theo pháp luật Việt Nam.")}
          className="self-start sm:self-auto inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Xem điều khoản mẫu</span>
        </button>
      </div>

      {/* Selected Bike Summary Card */}
      <div className="mt-6 p-4 sm:p-5 rounded-xl border border-slate-200/80 bg-slate-50/50">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="relative w-full sm:w-36 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-200">
            <img
              src={selectedBike.image}
              alt={selectedBike.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute bottom-1 left-1 bg-slate-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded">
              {selectedBike.categoryLabel} {selectedBike.engine}
            </span>
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-base sm:text-lg font-extrabold text-slate-900">
                {selectedBike.name}
              </h3>
              <span className="px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 font-mono font-bold text-xs">
                BKS: {selectedBike.plateNumber}
              </span>
            </div>
            
            <p className="text-xs text-slate-500 mt-1 mb-3">
              Màu: {selectedBike.color}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-600">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Thời gian thuê (<strong>02 ngày</strong>): 15/11 (08:00) → 17/11 (08:00)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Địa điểm giao xe: <strong>{bookingInfo.rentalSchedule.pickupLocation}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trang bị bàn giao đi kèm sẵn */}
      <div className="mt-4 p-4 rounded-xl bg-slate-50/50 border border-slate-200/80">
        <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2.5">
          Trang bị bàn giao đi kèm sẵn:
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs">
          {selectedBike.accessories ? (
            selectedBike.accessories.map((acc, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium shadow-2xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                {acc}
              </span>
            ))
          ) : (
            <>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                02 Nón bảo hiểm 3/4 Andes đạt chuẩn
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                02 Áo mưa cánh dơi SmartBike
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                01 Giá đỡ điện thoại tích hợp sạc nhanh USB
              </span>
            </>
          )}
        </div>
      </div>

      {/* Pricing Breakdown */}
      <div className="mt-5 space-y-2.5 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-5">
        <div className="flex justify-between items-center">
          <span>Đơn giá ngày thuê xe máy:</span>
          <span className="font-semibold text-slate-800">
            {new Intl.NumberFormat('vi-VN').format(selectedBike.pricePerDay)}đ x 0{rentalDays} ngày = {formattedSubtotal}đ
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span>Thuế GTGT / VAT (8%):</span>
          <span className="font-semibold text-slate-800">{formattedVat}đ</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            Bảo hiểm trách nhiệm dân sự bắt buộc:
            <CheckCircle2 className="w-4 h-4 text-emerald-600 inline" />
          </span>
          <span className="font-bold text-emerald-600">Miễn phí (0đ)</span>
        </div>

        <div className="flex justify-between items-center">
          <span className="flex items-center gap-1.5">
            Phí giao xe tận nơi Sân bay Quốc tế:
            <Bike className="w-4 h-4 text-blue-600 inline" />
          </span>
          <span className="font-bold text-emerald-600">Miễn phí (0đ)</span>
        </div>

        <div className="pt-3 border-t border-slate-200 flex justify-between items-baseline">
          <span className="text-sm sm:text-base font-extrabold text-slate-900">
            Tổng giá trị hợp đồng thuê:
          </span>
          <span className="text-xl sm:text-2xl font-black text-blue-700">
            {formattedTotal}đ
          </span>
        </div>
      </div>

      {/* Deposit Callout Banner */}
      <div className="mt-5 p-4 sm:p-5 rounded-xl bg-gradient-to-r from-rose-50 via-orange-50 to-amber-50 border border-orange-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="text-[11px] font-extrabold text-rose-700 uppercase tracking-wider mb-0.5">
            TIỀN ĐẶT CỌC CẦN THANH TOÁN TRỰC TUYẾN (30%):
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-600">
            {formattedDeposit}đ
          </div>
        </div>

        <div className="text-xs font-semibold text-slate-700 bg-white/80 backdrop-blur-sm px-3.5 py-2.5 rounded-lg border border-orange-200/60 shadow-2xs">
          Số tiền còn lại khi nhận xe:{' '}
          <strong className="text-slate-900 block sm:inline mt-0.5 sm:mt-0 font-bold">
            {formattedRemaining}đ (Tiền mặt / Quẹt thẻ)
          </strong>
        </div>
      </div>

    </div>
  );
};
