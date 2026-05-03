import React from 'react';

export function HelloTVLogo({ className = "h-8", theme = 'light' }: { className?: string, theme?: 'light' | 'dark' }) {
  const textColor = theme === 'dark' ? '#FFFFFF' : '#1A1A1A';
  
  return (
    <svg 
      className={className} 
      viewBox="0 0 400 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      style={{ minHeight: '100%', height: 'auto' }}
    >
      <text 
        x="10" 
        y="75" 
        fontFamily="Arial, sans-serif" 
        fontWeight="900" 
        fontSize="80" 
        fill={textColor}
        letterSpacing="-2"
      >
        hello
      </text>
      <g transform="translate(200, 15)">
        <rect width="110" height="70" rx="20" fill="#FDCB2C" />
        <text 
          x="55" 
          y="52" 
          fontFamily="Arial, sans-serif" 
          fontWeight="900" 
          fontSize="50" 
          fill="#1A1A1A"
          textAnchor="middle"
        >
          TV
        </text>
      </g>
    </svg>
  );
}
