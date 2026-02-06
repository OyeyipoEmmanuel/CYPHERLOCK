
import React from 'react';

interface Props {
  text: string;
  className?: string;
}

const GlitchText: React.FC<Props> = ({ text, className = "" }) => {
  return (
    <div className={`relative inline-block ${className}`}>
      <span className="glitch-text block" data-text={text}>
        {text}
      </span>
      {/* Visual glitch layers */}
      <span className="absolute top-0 left-0 -ml-[2px] text-cyan-500 opacity-30 select-none pointer-events-none animate-pulse">
        {text}
      </span>
      <span className="absolute top-0 left-0 ml-[2px] text-rose-500 opacity-30 select-none pointer-events-none animate-pulse delay-75">
        {text}
      </span>
    </div>
  );
};

export default GlitchText;
