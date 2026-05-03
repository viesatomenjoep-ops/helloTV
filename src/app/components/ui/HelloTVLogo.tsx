import React from 'react';

export function HelloTVLogo({ className = "h-8", theme = 'light' }: { className?: string, theme?: 'light' | 'dark' }) {
  return (
    <img 
      src="/HelloTV.png" 
      alt="HelloTV Logo" 
      className={className}
      style={{ objectFit: 'contain' }}
    />
  );
}
