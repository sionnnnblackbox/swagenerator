import React from 'react';
import { ThemeMode } from '../types';

interface NavbarProps {
  theme: ThemeMode;
}

const Navbar: React.FC<NavbarProps> = ({ theme }) => {
  const isBlack = theme === ThemeMode.BLACK;

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-700 border-b ${
      isBlack 
        ? 'bg-black/40 border-white/[0.05] text-white' 
        : 'bg-white/40 border-black/[0.05] text-gray-900'
    } backdrop-blur-xl`}>
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12 py-8 flex justify-center items-center relative">
        
        {/* Center Section: Branding Only */}
        <div className="flex flex-col items-center group cursor-pointer">
          <div className="flex items-center gap-3">
            <div className={`w-px h-4 transition-all duration-700 group-hover:h-6 ${isBlack ? 'bg-white/20' : 'bg-black/20'}`}></div>
            <span className="text-xl lg:text-2xl font-serif-swag italic tracking-tighter transition-transform duration-500 group-hover:scale-105 uppercase">
              SWAG <span className="opacity-30 font-light not-italic ml-1">Generator</span>
            </span>
            <div className={`w-px h-4 transition-all duration-700 group-hover:h-6 ${isBlack ? 'bg-white/20' : 'bg-black/20'}`}></div>
          </div>
          <span className="text-[7px] font-minimalist opacity-20 tracking-[0.8em] mt-2 group-hover:opacity-40 transition-opacity uppercase">Inspired by Justin Bieber</span>
        </div>

      </div>
      
      {/* Decorative Progress bar at the bottom of Nav */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] overflow-hidden">
        <div className={`h-full w-1/3 animate-[navSlide_4s_infinite_linear] ${isBlack ? 'bg-gradient-to-r from-transparent via-white/20 to-transparent' : 'bg-gradient-to-r from-transparent via-pink-400/40 to-transparent'}`}></div>
      </div>

      <style>{`
        @keyframes navSlide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;