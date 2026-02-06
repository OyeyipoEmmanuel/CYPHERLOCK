
import React, { useState, useEffect, useCallback } from 'react';
import { PasswordOptions, PasswordStrength } from '../types';
import StyledButton from './CyberButton';
import StrengthMeter from './StrengthMeter';
import { generateSecurePassword, calculateStrength } from '../utils/crypto';

interface Props {
  isDarkMode: boolean;
  onGenerate: (pw: string) => void;
}

const PasswordGenerator: React.FC<Props> = ({ isDarkMode, onGenerate }) => {
  const [options, setOptions] = useState<PasswordOptions>({
    length: 18,
    includeUppercase: true,
    includeLowercase: true,
    includeNumbers: true,
    includeSymbols: true,
  });

  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState<PasswordStrength>({ score: 0, label: 'WEAK', color: '#f43f5e' });

  const handleGenerate = useCallback(() => {
    const newPassword = generateSecurePassword(options);
    setPassword(newPassword);
    setStrength(calculateStrength(newPassword));
    onGenerate(newPassword);
  }, [options, onGenerate]);

  useEffect(() => {
    handleGenerate();
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-panel p-8 md:p-10 rounded-3xl shadow-2xl shadow-indigo-500/5 transition-all duration-500">
      <header className="mb-10">
        <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-4">Encryption Output</h2>
        <div className="group relative flex flex-col md:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-900/50 p-4 rounded-2xl border border-slate-200/60 dark:border-slate-800 transition-all hover:border-indigo-500/30">
          <div className="flex-1 px-4 py-6 font-mono text-2xl md:text-3xl break-all text-center md:text-left text-slate-900 dark:text-indigo-100 tracking-wider">
            {password}
          </div>
          <button 
            onClick={copyToClipboard}
            className={`w-full md:w-auto px-8 py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-3 transition-all duration-300 ${
              copied 
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm'
            }`}
          >
            {copied ? (
              <><svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg> Copied</>
            ) : (
              <><svg className="w-5 h-5 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" /></svg> Copy</>
            )}
          </button>
        </div>
      </header>

      <div className="mb-12">
        <StrengthMeter strength={strength} isDarkMode={isDarkMode} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <div className="flex justify-between items-center mb-5 px-1">
              <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">Character Count</label>
              <span className="text-sm font-mono font-bold text-indigo-600 dark:text-indigo-400">{options.length}</span>
            </div>
            <input 
              type="range" 
              min="8" 
              max="64" 
              value={options.length} 
              onChange={(e) => setOptions(prev => ({ ...prev, length: parseInt(e.target.value) }))}
              className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full appearance-none cursor-pointer accent-indigo-600 transition-all hover:accent-indigo-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            {[
              { key: 'includeUppercase', label: 'Uppercase', icon: 'A' },
              { key: 'includeLowercase', label: 'Lowercase', icon: 'a' },
              { key: 'includeNumbers', label: 'Numbers', icon: '1' },
              { key: 'includeSymbols', label: 'Symbols', icon: '#' },
            ].map((opt) => (
              <label key={opt.key} className="flex items-center gap-4 cursor-pointer group">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    className="w-6 h-6 rounded-lg border-2 border-slate-300 dark:border-slate-700 text-indigo-600 focus:ring-indigo-500/20 bg-white dark:bg-slate-900 transition-all cursor-pointer checked:border-indigo-600" 
                    checked={!!options[opt.key as keyof PasswordOptions]} 
                    onChange={() => setOptions(prev => {
                      const next = { ...prev, [opt.key as keyof PasswordOptions]: !prev[opt.key as keyof PasswordOptions] };
                      if (!next.includeUppercase && !next.includeLowercase && !next.includeNumbers && !next.includeSymbols) return prev;
                      return next;
                    })} 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-700 dark:text-slate-200 transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                    {opt.label}
                  </span>
                  <span className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter opacity-60">Include {opt.icon}</span>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <StyledButton onClick={handleGenerate} isDarkMode={isDarkMode} className="w-full h-16 !rounded-2xl shadow-xl shadow-indigo-600/10">
            <svg className="w-6 h-6 transition-transform duration-500 group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            Re-Encrypt Session
          </StyledButton>
          <p className="mt-4 text-[10px] text-center text-slate-400 font-medium uppercase tracking-[0.2em] opacity-40">Client-Side RSA-inspired Pseudo-Randomness</p>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
