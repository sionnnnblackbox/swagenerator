import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Controls from './components/Controls';
import PreviewCanvas from './components/PreviewCanvas';
import { ThemeMode, GeneratorState } from './types';

const App: React.FC = () => {
  const [state, setState] = useState<GeneratorState>({
    text: 'SWAG',
    theme: ThemeMode.BLACK,
    fontSize: 210,
    customBgColor: '#000000',
    customTextColor: '#4B4C4E',
    useCustomColors: false,
  });

  const updateState = (updates: Partial<GeneratorState>) => {
    setState(prev => ({ ...prev, ...updates }));
  };

  const toggleTheme = () => {
    const isNowPink = state.theme === ThemeMode.BLACK;
    updateState({
      theme: isNowPink ? ThemeMode.PINK : ThemeMode.BLACK,
      text: isNowPink ? 'SWAG II' : 'SWAG',
      customBgColor: isNowPink ? '#F7B7C5' : '#000000',
      customTextColor: isNowPink ? '#F7DCEA' : '#4B4C4E',
      useCustomColors: false,
    });
  };

  const isBlack = state.theme === ThemeMode.BLACK;

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-1000 ${isBlack ? 'bg-[#0b0b0b]' : 'bg-[#fff5f7]'}`}>
      <Navbar theme={state.theme} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-12">
        <div className="album-cover-generator w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-12 mb-4 hidden lg:block text-center fade-in">
             <h2 className={`font-minimalist text-xs opacity-40 mb-2 ${isBlack ? 'text-white' : 'text-gray-900'}`}>
                {isBlack ? 'BLACK Edition' : 'PINK Edition'} / Justin Bieber Style
             </h2>
             <div className={`h-[1px] w-24 mx-auto ${isBlack ? 'bg-white/20' : 'bg-black/10'}`}></div>
          </div>

          <div id="result" className="lg:col-span-7 flex flex-col items-center lg:items-end fade-in order-1">
            <div className="relative group w-full max-w-[500px]">
              <div className={`absolute -inset-10 rounded-full blur-[120px] opacity-20 transition-all duration-1000 ${isBlack ? 'bg-white' : 'bg-pink-400'}`}></div>
              <div className="relative shadow-[0_60px_120px_-30px_rgba(0,0,0,0.95)] rounded-sm overflow-hidden border border-white/5">
                <PreviewCanvas state={state} />
              </div>
              <div className={`mt-6 text-center lg:text-right font-minimalist text-[10px] opacity-30 ${isBlack ? 'text-white' : 'text-gray-900'}`}>
                1080 x 1080 MASTERING
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 w-full fade-in order-2" style={{ animationDelay: '0.2s' }}>
            <div className={`max-w-md mx-auto lg:ml-0 ${isBlack ? 'text-white' : 'text-gray-900'}`}>
              <header className="mb-8">
                <h1 className="text-4xl font-serif-swag italic mb-2 tracking-tight">
                  SWAG GENERATOR
                </h1>
                <div className="space-y-1">
                  <p className="text-sm font-light opacity-60 font-minimalist tracking-widest uppercase">
                    {isBlack ? 'BLACK' : 'PINK'} Aesthetic
                  </p>
                  <p className="text-[10px] font-minimalist opacity-40 tracking-[0.2em]">
                    Album SWAG Justin Bieber
                  </p>
                </div>
              </header>
              
              <Controls 
                state={state} 
                updateState={updateState} 
                toggleTheme={toggleTheme} 
              />
            </div>
          </div>

        </div>
      </main>

      <footer className={`py-12 text-center flex flex-col items-center gap-6 transition-opacity duration-1000 ${isBlack ? 'text-gray-600' : 'text-gray-400'}`}>
        <div className={`w-px h-12 ${isBlack ? 'bg-white/10' : 'bg-black/10'}`}></div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 items-center font-minimalist text-[10px] tracking-[0.2em]">
          <a 
            href="https://open.spotify.com/album/5vD5M5VW62LL78Ko8x0CVZ?si=24Vxzzx-Qda-y-bK_xKlmQ" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`hover:opacity-100 transition-opacity underline underline-offset-4 ${isBlack ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
          >
            SWAG - Justin Bieber
          </a>
          <div className={`hidden md:block w-1.5 h-1.5 rounded-full ${isBlack ? 'bg-white/10' : 'bg-black/10'}`}></div>
          <a 
            href="https://open.spotify.com/album/2KrREEyHxkdFGYAd1DmMdS?si=S61K5QA4Rl-xh2wfd66Yiw" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`hover:opacity-100 transition-opacity underline underline-offset-4 ${isBlack ? 'text-white/60 hover:text-white' : 'text-pink-600/60 hover:text-pink-600'}`}
          >
            SWAG II
          </a>
        </div>

        <p className="font-minimalist text-[9px] tracking-[0.5em] opacity-40">SWAG GENERATOR © 2025</p>
      </footer>
    </div>
  );
};

export default App;