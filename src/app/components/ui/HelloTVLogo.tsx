import React from 'react';

export function HelloTVLogo({ className = "h-8", theme = 'light' }: { className?: string, theme?: 'light' | 'dark' }) {
  // If theme is dark, we can add a subtle white drop-shadow so the black text remains readable, or just let it be.
  const filterClass = theme === 'dark' ? 'drop-shadow-[0_0_2px_rgba(255,255,255,0.5)]' : '';
  
  return (
    <img 
      src="/logo-transparent.png" 
      alt="HelloTV Logo" 
      className={`${className} ${filterClass} object-contain`} 
    />
  );
}
