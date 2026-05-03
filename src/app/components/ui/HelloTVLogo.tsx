import React from 'react';

export function HelloTVLogo({ className = "h-8", theme = 'light' }: { className?: string, theme?: 'light' | 'dark' }) {
  const textColor = theme === 'dark' ? '#FFFFFF' : '#000000';
  
  return (
    <svg 
      viewBox="0 0 400 150" 
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <g transform="translate(10, 20)">
        {/* 'hello' text */}
        <text 
          x="0" 
          y="85" 
          fontFamily="Inter, system-ui, sans-serif" 
          fontWeight="900" 
          fontSize="95" 
          fill={textColor}
          letterSpacing="-2"
        >
          hello
        </text>

        {/* Yellow speech bubble with 'tv' */}
        <g transform="translate(235, 0)">
          {/* Yellow circle outline */}
          <path 
            d="M 50,5 C 20,5 0,30 0,55 C 0,80 20,105 50,105 C 55,105 60,104 65,103 L 80,120 L 75,98 C 90,88 100,73 100,55 C 100,30 80,5 50,5 Z" 
            fill="none" 
            stroke="#FDCB2C" 
            strokeWidth="16"
            strokeLinejoin="round"
          />
          {/* 'tv' text inside the bubble */}
          <text 
            x="18" 
            y="85" 
            fontFamily="Inter, system-ui, sans-serif" 
            fontWeight="900" 
            fontSize="85" 
            fill={textColor}
            letterSpacing="-2"
          >
            tv
          </text>
        </g>
      </g>
    </svg>
  );
}
