import React from 'react';
import { HelloTVLogo } from './ui/HelloTVLogo';

export function BrandElements() {
  return (
    <div className="relative bg-[#1d1d1d] rounded-2xl overflow-hidden p-8 lg:p-16 mt-12 border border-gray-800 shadow-2xl">
      {/* Background cross pattern */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20 16 L20 24 M16 20 L24 20' stroke='%23ffffff' stroke-width='1' fill='none' stroke-opacity='0.1'/%3E%3C/svg%3E")`, 
          backgroundSize: '40px 40px',
          backgroundPosition: '0 0'
        }}
      ></div>
      
      <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-16 xl:gap-8 max-w-6xl mx-auto">
        
        {/* Logo */}
        <div className="flex flex-col items-center">
           <HelloTVLogo className="h-16" theme="dark" />
        </div>

        {/* Small Bubble */}
        <div className="flex flex-col items-center text-center">
          <div className="text-[#FDCB2C] text-[10px] font-bold mb-6 tracking-wider max-w-[160px] uppercase">
            Match stroke width with speech bubble from logo per medium
          </div>
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 120 140" className="w-32 h-32 overflow-visible">
              <path 
                d="M 60,10 C 25,10 5,35 5,65 C 5,95 25,120 60,120 C 65,120 70,119 75,118 L 90,140 L 85,110 C 105,100 115,85 115,65 C 115,35 95,10 60,10 Z" 
                fill="none" 
                stroke="#FDCB2C" 
                strokeWidth="10"
                strokeLinejoin="round"
                transform="scale(-1, 1) translate(-120, 0)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pb-4">
              <span className="text-white font-black text-xl leading-tight tracking-tight">USE<br/>THIS</span>
            </div>
          </div>
        </div>

        {/* Medium Bubble */}
        <div className="flex flex-col items-center text-center">
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 120 140" className="w-48 h-48 overflow-visible">
              <path 
                d="M 60,10 C 25,10 5,35 5,65 C 5,95 25,120 60,120 C 65,120 70,119 75,118 L 90,140 L 85,110 C 105,100 115,85 115,65 C 115,35 95,10 60,10 Z" 
                fill="none" 
                stroke="#FDCB2C" 
                strokeWidth="7"
                strokeLinejoin="round"
                transform="scale(-1, 1) translate(-120, 0)"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pb-4">
              <span className="text-white font-black text-3xl leading-tight tracking-tight">BRAND<br/>ELEMENT</span>
            </div>
          </div>
          <div className="text-[#FDCB2C] text-[10px] font-bold mt-6 tracking-wider max-w-[200px] uppercase">
            Library of pre build speech bubbles for different sizes
          </div>
        </div>

        {/* Large Bubble */}
        <div className="flex flex-col items-center text-center relative">
          <div className="relative flex items-center justify-center">
            <svg viewBox="0 0 120 140" className="w-72 h-72 overflow-visible">
              <path 
                d="M 60,10 C 25,10 5,35 5,65 C 5,95 25,120 60,120 C 65,120 70,119 75,118 L 90,140 L 85,110 C 105,100 115,85 115,65 C 115,35 95,10 60,10 Z" 
                fill="none" 
                stroke="#FDCB2C" 
                strokeWidth="5"
                strokeLinejoin="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center pb-4 px-6">
              <span className="text-white font-black text-[2.5rem] leading-[1.1] tracking-tight">FOR SPECIAL<br/>COMMUNICATION<br/>PURPOSES</span>
            </div>
          </div>
          <div className="absolute -bottom-8 right-0 text-[#FDCB2C] text-[10px] font-bold mt-4 tracking-wider text-right max-w-[120px] uppercase">
            Rotate to add focus in lay-out
          </div>
        </div>

      </div>
    </div>
  );
}
