import React from 'react';
import { Truck, LifeBuoy, ShieldCheck, QrCode, Award } from 'lucide-react';
import { COMMITMENTS_DATA } from '../../data/commitmentsData';

const iconMap = {
  Truck,
  LifeBuoy,
  ShieldCheck,
  QrCode
};

export const CommitmentSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-1">
            CAM KẾT DỊCH VỤ KHÁCH HÀNG
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Thuê Xe Máy An Tâm • Trải Nghiệm Trọn Vẹn
          </h2>
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-blue-800 text-xs font-bold border border-blue-200 self-start sm:self-auto">
          <Award className="w-4 h-4 text-blue-600" />
          <span>Hơn 45.000+ lượt khách tin dùng</span>
        </div>
      </div>

      {/* 4 Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {COMMITMENTS_DATA.map((item) => {
          const Icon = iconMap[item.icon] || ShieldCheck;
          return (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md hover:border-blue-200 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
};
