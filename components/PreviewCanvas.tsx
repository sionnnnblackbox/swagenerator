import React, { useEffect, useRef, useState } from 'react';
import { ThemeMode, GeneratorState } from '../types';

interface PreviewCanvasProps {
  state: GeneratorState;
}

const PreviewCanvas: React.FC<PreviewCanvasProps> = ({ state }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFontReady, setIsFontReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Load specifically for Bold (700) and maximize optical sizing
    const fontString = `700 ${state.fontSize}px "Bodoni Moda"`;

    const loadAndDraw = async () => {
      try {
        await document.fonts.load(fontString);
        setIsFontReady(true);
        draw(canvas, ctx);
      } catch (err) {
        console.error("Rosan font load error:", err);
        setIsFontReady(true);
        draw(canvas, ctx);
      }
    };

    loadAndDraw();
  }, [state]);

  const draw = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const { text, theme, fontSize, customBgColor, customTextColor, useCustomColors } = state;
    const isBlack = theme === ThemeMode.BLACK;

    const CANVAS_SIZE = 1080;
    const LETTER_SPACING = -0.015; // Tight tracking for the Prada look
    
    const bgColor = useCustomColors ? customBgColor : (isBlack ? '#000000' : '#F7B7C5');
    
    canvas.width = CANVAS_SIZE;
    canvas.height = CANVAS_SIZE;

    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    
    // Strict Rosan Font Application
    ctx.font = `700 ${fontSize}px "Rosan"`;
    
    const letterSpacingPx = fontSize * LETTER_SPACING;
    const wordSpacingPx = fontSize * 0.4;

    const rawLines = text.split('\n').filter(l => l.trim() !== '');
    const lineHeight = fontSize * 0.95; 
    const totalHeight = rawLines.length * lineHeight;
    const startY = (CANVAS_SIZE - totalHeight) / 2 + (lineHeight / 2);

    let globalWordCounter = 0;

    rawLines.forEach((lineText, lineIndex) => {
      const words = lineText.split(/\s+/).filter(w => w !== '');
      const y = startY + (lineIndex * lineHeight);

      let lineWidth = 0;
      words.forEach((word, wordIdx) => {
        lineWidth += calculateWordWidth(ctx, word, letterSpacingPx);
        if (wordIdx < words.length - 1) lineWidth += wordSpacingPx;
      });

      let currentX = (CANVAS_SIZE - lineWidth) / 2;

      words.forEach((word) => {
        const wordUpper = word.toUpperCase();
        
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;

        if (useCustomColors) {
          ctx.fillStyle = customTextColor;
        } else if (isBlack) {
          ctx.fillStyle = '#4B4C4E'; 
        } else {
          // PINK MODE COLORING RULES
          if (wordUpper === 'SWAG') {
            ctx.fillStyle = '#F7DCEA';
          } else if (wordUpper === 'II') {
            ctx.fillStyle = '#F29BBA';
          } else {
            ctx.fillStyle = (globalWordCounter % 2 === 0) ? '#F7DCEA' : '#F29BBA';
          }
        }

        const wordWidth = drawLetterSpacedText(ctx, wordUpper, currentX, y, letterSpacingPx);
        currentX += wordWidth + wordSpacingPx;
        globalWordCounter++;
      });
    });
  };

  const calculateWordWidth = (
    ctx: CanvasRenderingContext2D, 
    word: string, 
    spacing: number
  ) => {
    const characters = word.split('');
    let width = 0;
    characters.forEach((char, i) => {
      width += ctx.measureText(char).width;
      if (i < characters.length - 1) width += spacing;
    });
    return width;
  };

  const drawLetterSpacedText = (
    ctx: CanvasRenderingContext2D, 
    text: string, 
    x: number, 
    y: number, 
    spacing: number
  ) => {
    const characters = text.split('');
    let currentX = x;
    
    characters.forEach((char, i) => {
      const charWidth = ctx.measureText(char).width;
      ctx.fillText(char, currentX, y);
      currentX += charWidth + spacing;
    });

    return currentX - x - (characters.length > 0 ? spacing : 0);
  };

  return (
    <div className="relative w-full h-full bg-[#050505]">
      {!isFontReady && (
        <div className="absolute inset-0 flex items-center justify-center text-[10px] font-minimalist opacity-40 z-10 text-white animate-pulse">
          LOADING SWAG ENGINE...
        </div>
      )}
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full object-contain cursor-pointer active:scale-[0.99] transition-all duration-700 ${isFontReady ? 'opacity-100' : 'opacity-0'}`}
        title="SWAG Master Output"
      />
    </div>
  );
};

export default PreviewCanvas;