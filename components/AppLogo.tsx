
import React from 'react';

const AppLogo: React.FC = () => {
  return (
    <div className="flex items-center gap-3 group cursor-default">
      <div className="relative">
        <div className="w-11 h-11 bg-slate-900 dark:bg-indigo-600 rounded-xl flex items-center justify-center shadow-xl shadow-indigo-500/20 transition-transform duration-500 group-hover:rotate-[360deg]">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
        </div>
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-900 animate-pulse" />
      </div>
      <div className="flex flex-col -space-y-1">
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white">
          Cipher<span className="text-indigo-600 dark:text-indigo-400">Lock</span>
        </h1>
        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-slate-400 dark:text-slate-500">Security Studio</span>
      </div>
    </div>
  );
};

export default AppLogo;
