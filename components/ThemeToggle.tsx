
import React from 'react';

interface Props {
  isDarkMode: boolean;
  onToggle: () => void;
}

const ThemeToggle: React.FC<Props> = ({ isDarkMode, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className={`group relative w-16 h-9 rounded-2xl transition-all duration-500 border-2 overflow-hidden ${
        isDarkMode ? 'bg-slate-900 border-indigo-500 shadow-lg shadow-indigo-500/10' : 'bg-white border-slate-200 shadow-sm'
      }`}
    >
      <div className={`absolute top-1 left-1 w-5 h-5 rounded-lg transition-all duration-500 flex items-center justify-center ${
        isDarkMode ? 'translate-x-8 bg-indigo-500' : 'translate-x-0 bg-slate-900'
      }`}>
        {isDarkMode ? (
           <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" /></svg>
        ) : (
           <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
        )}
      </div>
      <div className={`absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity ${isDarkMode ? 'bg-indigo-400' : 'bg-slate-400'}`} />
    </button>
  );
};

export default ThemeToggle;
