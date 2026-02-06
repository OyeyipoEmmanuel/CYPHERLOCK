
import React from 'react';
import { PasswordStrength } from '../types';

interface Props {
  strength: PasswordStrength;
  isDarkMode: boolean;
}

const StrengthMeter: React.FC<Props> = ({ strength, isDarkMode }) => {
  const getSegmentCount = () => {
    if (strength.label === 'GODLIKE') return 4;
    if (strength.label === 'STRONG') return 3;
    if (strength.label === 'MEDIUM') return 2;
    return 1;
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-end mb-1">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 block mb-1">Security Rating</span>
          <span className="text-lg font-extrabold tracking-tight transition-colors duration-500" style={{ color: strength.color }}>
            {strength.label}
          </span>
        </div>
        <div className="flex gap-1.5 pb-1">
          {[1, 2, 3, 4].map((i) => (
            <div 
              key={i}
              className={`w-4 h-1.5 rounded-full transition-all duration-500 ${
                i <= getSegmentCount() 
                ? 'opacity-100' 
                : 'opacity-10 dark:opacity-20'
              }`}
              style={{ backgroundColor: i <= getSegmentCount() ? strength.color : (isDarkMode ? '#ffffff' : '#000000') }}
            />
          ))}
        </div>
      </div>
      <div className="h-2 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
        <div 
          className="h-full transition-all duration-700 ease-out rounded-full shadow-[0_0_10px_rgba(0,0,0,0.1)]" 
          style={{ 
            width: `${strength.score}%`,
            backgroundColor: strength.color 
          }}
        />
      </div>
    </div>
  );
};

export default StrengthMeter;
