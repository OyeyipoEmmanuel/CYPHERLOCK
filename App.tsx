
import React, { useState, useCallback } from 'react';
import { HistoryItem } from './types';
import GeometricBackground from './components/GeometricBackground';
import AppLogo from './components/AppLogo';
import PasswordGenerator from './components/PasswordGenerator';
import HistoryPanel from './components/HistoryPanel';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const addToHistory = useCallback((password: string) => {
    setHistory(prev => [
      { id: crypto.randomUUID(), value: password, timestamp: Date.now() },
      ...prev.slice(0, 8)
    ]);
  }, []);

  const clearHistory = () => setHistory([]);

  return (
    <div className={`${isDarkMode ? 'dark bg-slate-900 text-slate-100' : 'bg-slate-50 text-slate-900'} min-h-screen relative transition-colors duration-300`}>
      <GeometricBackground />

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        <header className="flex justify-between items-center mb-12">
          <AppLogo />
          <ThemeToggle isDarkMode={isDarkMode} onToggle={toggleTheme} />
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8">
            <PasswordGenerator 
              isDarkMode={isDarkMode} 
              onGenerate={addToHistory} 
            />
          </div>
          
          <aside className="lg:col-span-4">
            <HistoryPanel 
              history={history} 
              isDarkMode={isDarkMode} 
              onClear={clearHistory}
            />
          </aside>
        </main>

        <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 pt-8 pb-12 text-center text-sm text-slate-500">
          <p>© 2024 CipherLock Security Studio. All generation is client-side.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
