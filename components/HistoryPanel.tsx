
import React from 'react';
import { HistoryItem } from '../types';

interface Props {
  history: HistoryItem[];
  isDarkMode: boolean;
  onClear: () => void;
}

const HistoryPanel: React.FC<Props> = ({ history, isDarkMode, onClear }) => {
  return (
    <div className="glass-panel p-6 md:p-8 rounded-3xl border border-slate-200/60 transition-all duration-500">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em]">Audit Log</h3>
        {history.length > 0 && (
          <button 
            onClick={onClear}
            className="text-[10px] font-extrabold text-rose-500 hover:text-rose-600 transition-colors uppercase tracking-widest"
          >
            Wipe Buffer
          </button>
        )}
      </div>

      <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
        {history.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 opacity-20 dark:opacity-40 grayscale">
            <svg className="w-10 h-10 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-widest">Buffer Empty</span>
          </div>
        ) : (
          history.map((item) => (
            <div 
              key={item.id} 
              className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/40 group hover:border-indigo-400/50 dark:hover:border-indigo-900 transition-all cursor-copy active:scale-[0.98]"
              onClick={() => navigator.clipboard.writeText(item.value)}
            >
              <div className="font-mono text-sm break-all text-slate-800 dark:text-indigo-200 mb-2 selection:bg-indigo-500/10">
                {item.value}
              </div>
              <div className="flex justify-between items-center text-[9px] text-slate-400 font-bold uppercase tracking-widest">
                <span className="opacity-60">{new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                <span className="opacity-0 group-hover:opacity-100 text-indigo-500 dark:text-indigo-400 transition-opacity flex items-center gap-1">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg>
                  Copy
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPanel;
