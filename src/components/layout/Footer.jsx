import React from 'react';
import { Bike, Phone, MapPin, CheckCircle, CreditCard, Shield } from 'lucide-react';
import { BRANCHES_DATA, POLICIES_DATA } from '../../data/branchesData';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-slate-200 mt-20 pt-16 pb-12 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-slate-100">
          
          {/* Col 1: Brand & Slogan */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-blue-700 flex items-center justify-center text-white">
                <Bike className="w-5 h-5" />
              </div>
              <span className="text-xl font-black text-blue-900 tracking-tight">
                SMARTBIKE
              </span>
            </div>
            
            <p className="text-xs text-slate-500 leading-relaxed">
              Nền tảng thuê xe máy công nghệ cao hàng đầu tại Đà Nẵng. Giao nhận xe tận nơi tại Sân bay, Khách sạn và Ga tàu trong 15 phút.
            </p>

            <div className="pt-2">
              <a 
                href="tel:0905888999"
                className="inline-flex items-center gap-2 text-xs font-bold text-blue-700 hover:text-blue-900 bg-blue-50/80 px-3.5 py-2 rounded-xl border border-blue-100"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>Cứu hộ 24/7: 0905.888.999</span>
              </a>
            </div>
          </div>

          {/* Col 2: Chi nhánh Đà Nẵng */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Hệ Thống Chi Nhánh Đà Nẵng
            </h4>
            <ul className="space-y-3">
              {BRANCHES_DATA.map((branch) => (
                <li key={branch.id} className="flex items-start gap-2.5 text-xs text-slate-600">
                  <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-slate-700">{branch.name.split(' - ')[0]}:</strong>{' '}
                    {branch.address}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Chính sách & An tâm */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Chính Sách & An Tâm
            </h4>
            <ul className="space-y-2.5">
              {POLICIES_DATA.map((policy, idx) => (
                <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <span>{policy}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Thanh toán & Bảo mật */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 mb-4">
              Thanh Toán & Bảo Mật
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              Hỗ trợ thanh toán không tiền mặt bảo mật cao qua VietQR Napas 24/7, Thẻ Quốc Tế và Ví Điện Tử.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1.5 bg-blue-50 text-blue-700 font-bold text-xs rounded-lg border border-blue-200">
                VietQR 24/7
              </span>
              <span className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200">
                NAPAS
              </span>
              <span className="px-3 py-1.5 bg-slate-100 text-slate-700 font-semibold text-xs rounded-lg border border-slate-200">
                Visa / Master
              </span>
            </div>
          </div>

        </div>

        {/* Bottom copyright & terms */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © 2024 SMARTBIKE RENTAL Đà Nẵng. Bản quyền thuộc về Công ty TNHH Smart Mobility Việt Nam.
          </div>
          <div className="flex items-center gap-6">
            <a href="#terms" className="hover:text-blue-600 transition">Điều khoản dịch vụ</a>
            <a href="#privacy" className="hover:text-blue-600 transition">Chính sách bảo mật</a>
            <a href="#ekyc" className="hover:text-blue-600 transition">Quy chuẩn eKYC</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
