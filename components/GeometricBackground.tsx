
import React from 'react';

const GeometricBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Structural Geometry */}
      <svg className="absolute w-full h-full opacity-[0.03] dark:opacity-[0.05]" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,50 L100,50 M50,0 L50,100 M0,0 L100,100 M100,0 L0,100" stroke="currentColor" strokeWidth="0.1" fill="none" />
      </svg>
      
      {/* Floating security nodes */}
      <div className="absolute top-[10%] right-[15%] w-72 h-72 border-[1px] border-indigo-500/20 rounded-full animate-subtle" />
      <div className="absolute bottom-[10%] left-[5%] w-96 h-96 border-[1px] border-emerald-500/10 rounded-[4rem] rotate-12 animate-subtle" style={{ animationDelay: '-2s' }} />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/5 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[120px] rounded-full" />
    </div>
  );
};

export default GeometricBackground;
