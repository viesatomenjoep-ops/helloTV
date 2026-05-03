import React from 'react';

export function HelloTVLogo({ className = "h-8", theme = 'light' }: { className?: string, theme?: 'light' | 'dark' }) {
  // Behoud de witte/zwarte kleur logica afhankelijk van het thema
  const textColor = theme === 'dark' ? '#FFFFFF' : '#1A1A1A';
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 320 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ minHeight: '100%', height: 'auto' }}
    >
      {/* "hello" text */}
      <text 
        x="10" 
        y="72" 
        fontFamily="Arial, Helvetica, sans-serif" 
        fontWeight="900" 
        fontSize="72" 
        fill={textColor}
        letterSpacing="-3"
      >
        hello
      </text>
      
      {/* Yellow speech bubble outline */}
      <g transform="translate(240, 48)">
        <circle cx="0" cy="0" r="38" stroke="#FDCB2C" strokeWidth="14" fill="none" />
        {/* Tail of the speech bubble pointing down-left */}
        <path d="M -24 28 L -45 47 L -10 35 Z" fill="#FDCB2C" />
        
        {/* "tv" text inside the bubble */}
        <text 
          x="0" 
          y="18" 
          fontFamily="Arial, Helvetica, sans-serif" 
          fontWeight="900" 
          fontSize="52" 
          fill={textColor}
          letterSpacing="-2"
          textAnchor="middle"
        >
          tv
        </text>
      </g>
    </svg>
  );
}
