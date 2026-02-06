
import React from 'react';

interface Props {
  onClick: () => void;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'danger';
  className?: string;
  isDarkMode: boolean;
}

const StyledButton: React.FC<Props> = ({ 
  onClick, 
  children, 
  variant = 'primary', 
  className = "",
}) => {
  const baseStyles = "relative px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 active:scale-[0.98] border-b-4 flex items-center justify-center gap-2";
  
  const getVariantStyles = () => {
    switch (variant) {
      case 'danger': 
        return "bg-rose-500 hover:bg-rose-400 text-white border-rose-700";
      case 'secondary': 
        return "bg-slate-200 hover:bg-slate-300 text-slate-800 border-slate-400 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-slate-200 dark:border-slate-800";
      default: 
        return "bg-indigo-600 hover:bg-indigo-500 text-white border-indigo-800";
    }
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${getVariantStyles()} ${className}`}
    >
      {children}
    </button>
  );
};

export default StyledButton;
