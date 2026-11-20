import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useBooking } from '../../context/BookingContext';

export const Toast = () => {
  const { toast } = useBooking();

  if (!toast.show) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce duration-300">
      <div className="flex items-center gap-2.5 bg-slate-900 text-white px-4 py-3 rounded-xl shadow-2xl border border-slate-700/60">
        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
        <span className="text-sm font-medium">{toast.message}</span>
      </div>
    </div>
  );
};
