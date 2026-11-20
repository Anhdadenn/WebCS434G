import React, { useState, useEffect } from 'react';
import { Copy, Check, Zap, ShieldCheck, RefreshCw, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const PaymentVietQR = () => {
  const { bookingInfo, pricing, showToast, paymentStatus, setPaymentStatus, setCurrentPage } = useBooking();
  const { paymentBank } = bookingInfo;

  // Countdown timer: 9 minutes 41 seconds = 581 seconds
  const [timeLeft, setTimeLeft] = useState(581);
  const [copiedField, setCopiedField] = useState(null);

  useEffect(() => {
    if (timeLeft <= 0 || paymentStatus === 'success') return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, paymentStatus]);

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins} phút ${secs < 10 ? '0' : ''}${secs} giây`;
  };

  const copyToClipboard = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    showToast(`Đã sao chép ${fieldName}: ${text}`);
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
  };

  const formattedDeposit = new Intl.NumberFormat('vi-VN').format(pricing.depositAmount);

  // Dynamic VietQR image URL from VietQR API format
  // https://img.vietqr.io/image/MB-99051234568-compact2.png?amount=97200&addInfo=COCDON202601&accountName=CONG%20TY%20CP%20SMARTBIKE%20DANANG
  const qrImageUrl = `https://img.vietqr.io/image/MB-99051234568-compact2.png?amount=${pricing.depositAmount}&addInfo=${paymentBank.transferContent}&accountName=${encodeURIComponent(paymentBank.accountHolder)}`;

  const handleConfirmPaid = () => {
    setPaymentStatus('success');
    showToast('Xác nhận chuyển khoản thành công! Hợp đồng đã được kích hoạt.');
  };

  const handleCancelBooking = () => {
    if (confirm('Bạn có chắc chắn muốn hủy giữ xe đơn thuê này?')) {
      setPaymentStatus('cancelled');
      showToast('Đã hủy yêu cầu giữ xe.');
      setTimeout(() => {
        setCurrentPage('home');
      }, 1000);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200/90 shadow-xs relative">
      
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100">
        <div>
          <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider">
            CỔNG THANH TOÁN TỰ ĐỘNG
          </div>
          <h2 className="text-base sm:text-lg font-extrabold text-slate-900">
            3. Thanh toán VietQR Napas 24/7
          </h2>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="px-2.5 py-0.5 bg-blue-100/80 text-blue-800 text-xs font-bold rounded">
            VietQR
          </span>
          <span className="px-2.5 py-0.5 bg-blue-600 text-white text-xs font-bold rounded">
            NAPAS 247
          </span>
        </div>
      </div>

      {paymentStatus === 'success' ? (
        <div className="my-8 text-center p-8 bg-emerald-50 rounded-2xl border border-emerald-200 animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-black text-emerald-950 mb-2">
            ĐÃ THANH TOÁN CỌC THÀNH CÔNG!
          </h3>
          <p className="text-sm text-emerald-800 leading-relaxed max-w-md mx-auto mb-6">
            Mã hợp đồng <strong>{bookingInfo.orderId}</strong> đã được lưu trữ trên Cloud Vault. Xe sẽ được nhân viên SmartBike bàn giao tại sảnh đúng giờ hẹn.
          </p>
          <button
            onClick={() => setCurrentPage('home')}
            className="px-6 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition"
          >
            Về trang chủ
          </button>
        </div>
      ) : (
        <>
          {/* Urgent Countdown Timer */}
          <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-200/90 flex items-center justify-center gap-2 text-amber-900 text-xs sm:text-sm font-bold">
            <Zap className="w-4 h-4 text-amber-600 fill-amber-500 shrink-0" />
            <span>
              Giữ lịch xe tạm thời:{' '}
              <span className="font-mono text-amber-700 font-extrabold tracking-wide">
                {formatTimer(timeLeft)}
              </span>
            </span>
          </div>

          {/* QR Code Card */}
          <div className="mt-5 p-5 bg-slate-50/70 rounded-2xl border border-slate-200/80 text-center">
            
            <div className="flex items-center justify-between text-xs font-bold mb-3 px-2">
              <span className="text-blue-900 tracking-wide">{paymentBank.qrBanner}</span>
              <span className="text-[11px] text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full font-semibold">
                {paymentBank.approvalTime}
              </span>
            </div>

            {/* QR Image Box */}
            <div className="bg-white p-3.5 rounded-xl border border-slate-200/90 shadow-inner inline-block max-w-[240px] w-full">
              <img
                src={qrImageUrl}
                alt="VietQR MB Bank SmartBike"
                className="w-full h-auto object-contain rounded-md"
                onError={(e) => {
                  // Fallback fallback QR image if offline
                  e.target.src = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=SMARTBIKE-PAYMENT-DON-2026-01';
                }}
              />
            </div>

            <p className="text-[11px] text-slate-500 mt-2 font-medium flex items-center justify-center gap-1">
              <span>Quét bằng MoMo, ZaloPay hoặc App Ngân hàng</span>
            </p>
          </div>

          {/* Bank Transfer Details Table */}
          <div className="mt-5 space-y-2.5 text-xs">
            
            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Ngân hàng thụ hưởng:</span>
              <span className="font-bold text-slate-800">{paymentBank.bankName}</span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Số tài khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-sm text-slate-900">
                  {paymentBank.accountNumber}
                </span>
                <button
                  onClick={() => copyToClipboard(paymentBank.accountNumber, 'Số tài khoản')}
                  className="p-1 hover:bg-slate-100 rounded text-blue-600 transition"
                  title="Sao chép số tài khoản"
                >
                  {copiedField === 'Số tài khoản' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Tên người thụ hưởng:</span>
              <span className="font-bold text-slate-800 text-[11px] sm:text-xs">
                {paymentBank.accountHolder}
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Số tiền cọc:</span>
              <span className="font-mono font-black text-base text-rose-600">
                {formattedDeposit}đ
              </span>
            </div>

            <div className="flex items-center justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500 font-medium">Nội dung chuyển khoản:</span>
              <div className="flex items-center gap-2">
                <span className="font-mono font-extrabold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {paymentBank.transferContent}
                </span>
                <button
                  onClick={() => copyToClipboard(paymentBank.transferContent, 'Nội dung chuyển khoản')}
                  className="p-1 hover:bg-slate-100 rounded text-blue-600 transition"
                  title="Sao chép nội dung"
                >
                  {copiedField === 'Nội dung chuyển khoản' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>

          </div>

          {/* Instant notification alert */}
          <div className="mt-4 p-3 rounded-xl bg-blue-50/70 border border-blue-200/80 flex items-start gap-2.5">
            <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <p className="text-[11px] text-blue-900 leading-relaxed font-medium">
              Hệ thống tự động kích hoạt hợp đồng & gửi SMS mã nhận xe trong <strong>30 giây</strong> sau khi ngân hàng báo có tiền.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleCancelBooking}
              className="py-3 px-4 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-100 text-xs font-bold transition text-center"
            >
              Hủy giữ xe
            </button>

            <button
              onClick={handleConfirmPaid}
              className="py-3 px-4 rounded-xl bg-[#7c2d12] hover:bg-[#9a3412] text-white text-xs font-black shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>XÁC NHẬN ĐÃ CHUYỂN KHOẢN</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Security & Refund policy */}
          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-slate-400" />
              <span>PCI-DSS Level 1</span>
            </div>
            <div className="flex items-center gap-1">
              <RefreshCw className="w-3.5 h-3.5 text-emerald-600" />
              <span>Hoàn cọc 100% nếu hủy trước 6h</span>
            </div>
          </div>
        </>
      )}

    </div>
  );
};
