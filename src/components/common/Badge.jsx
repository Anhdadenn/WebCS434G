import React from 'react';

export const Badge = ({ children, variant = 'default', className = '' }) => {
  const baseClasses = 'inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold rounded-md';

  const variants = {
    default: 'bg-slate-100 text-slate-700',
    primary: 'bg-blue-50 text-blue-700 border border-blue-200',
    success: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border border-rose-200',
    dark: 'bg-slate-900/80 text-white backdrop-blur-sm',
    license: 'bg-blue-100 text-blue-900 font-mono font-bold tracking-wider',
    verified: 'bg-emerald-600 text-white font-mono text-[11px] px-2 py-0.5 rounded tracking-wide shadow-sm',
  };

  return (
    <span className={`${baseClasses} ${variants[variant] || variants.default} ${className}`}>
      {children}
    </span>
  );
};
