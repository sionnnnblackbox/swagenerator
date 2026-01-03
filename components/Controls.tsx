
import React from 'react';
import { ThemeMode, GeneratorState } from '../types';

interface ControlsProps {
  state: GeneratorState;
  updateState: (updates: Partial<GeneratorState>) => void;
  toggleTheme: () => void;
}

const Controls: React.FC<ControlsProps> = ({ state, updateState, toggleTheme }) => {
  const isBlack = state.theme === ThemeMode.BLACK;

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    const canvas = document.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = `${isBlack ? 'SWAG' : 'SWAG_II'}_${Date.now()}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  const labelClass = `text-[10px] font-minimalist mb-2 block ${isBlack ? 'text-gray-400' : 'text-gray-500'}`;

  return (
    <div className={`transition-all duration-700 ${isBlack ? 'text-white' : 'text-gray-900'}`}>
      
      <div className="flex items-center gap-6 mb-10">
        <button 
          onClick={() => state.theme !== ThemeMode.BLACK && toggleTheme()}
          className={`group flex flex-col items-center gap-2 transition-all ${isBlack ? 'opacity-100' : 'opacity-30 hover:opacity-50'}`}
        >
          <div className="w-12 h-12 bg-[#000000] border border-white/20 rounded-full"></div>
          <span className="text-[9px] font-minimalist">BLACK</span>
        </button>
        <button 
          onClick={() => state.theme !== ThemeMode.PINK && toggleTheme()}
          className={`group flex flex-col items-center gap-2 transition-all ${!isBlack ? 'opacity-100' : 'opacity-30 hover:opacity-50'}`}
        >
          <div className="w-12 h-12 bg-[#F7B7C5] border border-white/20 rounded-full shadow-[0_0_20px_rgba(247,183,197,0.4)]"></div>
          <span className="text-[9px] font-minimalist">PINK</span>
        </button>
      </div>

      <form onSubmit={handleDownload} className="space-y-8">
        <div className="relative group">
          <label className={labelClass}>Typography Content</label>
          <textarea
            value={state.text}
            onChange={(e) => updateState({ text: e.target.value })}
            placeholder={isBlack ? "SWAG" : "SWAG II"}
            className={`w-full bg-transparent border-b-2 py-4 px-0 text-3xl font-serif-swag focus:outline-none transition-all placeholder:opacity-20 ${
              isBlack 
                ? 'border-white/10 focus:border-white text-white' 
                : 'border-black/10 focus:border-pink-400 text-gray-900'
            }`}
            rows={1}
          />
        </div>

        <div>
          <label className={labelClass}>Font Size ({state.fontSize}px)</label>
          <input 
            type="range"
            min="100"
            max="450"
            step="1"
            value={state.fontSize}
            onChange={(e) => updateState({ fontSize: parseInt(e.target.value) })}
            className={`w-full h-1 bg-current opacity-20 cursor-pointer accent-current`}
          />
        </div>

        <div className="grid grid-cols-2 gap-8">
          <div>
            <label className={labelClass}>Canvass Tone</label>
            <div className="flex items-center gap-3">
               <input 
                type="color" 
                value={state.useCustomColors ? state.customBgColor : (isBlack ? '#000000' : '#F7B7C5')}
                onChange={(e) => updateState({ customBgColor: e.target.value, useCustomColors: true })}
                className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none p-0 overflow-hidden"
              />
              <span className="text-[10px] opacity-40 uppercase truncate">
                {state.useCustomColors ? state.customBgColor : (isBlack ? '#000000' : '#F7B7C5')}
              </span>
            </div>
          </div>
          <div>
            <label className={labelClass}>Primary Text Hue</label>
            <div className="flex items-center gap-3">
               <input 
                type="color" 
                value={state.useCustomColors ? state.customTextColor : (isBlack ? '#4B4C4E' : '#F7DCEA')}
                onChange={(e) => updateState({ customTextColor: e.target.value, useCustomColors: true })}
                className="w-10 h-10 rounded-full cursor-pointer bg-transparent border-none p-0 overflow-hidden"
              />
              <span className="text-[10px] opacity-40 uppercase truncate">
                {state.useCustomColors ? state.customTextColor : (isBlack ? '#4B4C4E' : '#F7DCEA')}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-6">
          <button
            type="submit"
            className={`w-full py-6 font-minimalist text-[11px] font-bold tracking-[0.5em] transition-all relative overflow-hidden group ${
              isBlack 
                ? 'bg-white text-black hover:bg-gray-200' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            <span className="relative z-10">SAVE IMAGE</span>
            <div className={`absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${isBlack ? 'bg-gray-100' : 'bg-white/10'}`}></div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Controls;
