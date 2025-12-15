import { useEffect, useRef, useState } from 'react';
import React from 'react';

interface TextPressureProps {
  text?: string;
  fontFamily?: string;
  fontUrl?: string;
  width?: boolean;
  weight?: boolean;
  italic?: boolean;
  alpha?: boolean;
  flex?: boolean;
  stroke?: boolean;
  scale?: boolean;
  textColor?: string;
  strokeColor?: string;
  className?: string;
  minFontSize?: number;
}

const TextPressure: React.FC<TextPressureProps> = ({
  text = 'Compress',
  fontFamily = 'sans-serif',
  fontUrl,
  width = true,
  weight = true,
  italic = true,
  alpha = false,
  flex = true,
  stroke = false,
  scale = false,
  textColor = '#FFFFFF',
  strokeColor = '#FF0000',
  className = '',
  minFontSize = 24,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const [spans, setSpans] = useState<HTMLSpanElement[]>([]);

  const mouseRef = useRef({ x: 0, y: 0 });
  const cursorRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (fontUrl) {
      const style = document.createElement('style');
      style.textContent = `
        @font-face {
          font-family: '${fontFamily}';
          src: url('${fontUrl}') format('woff2');
          font-style: normal;
        }
      `;
      document.head.appendChild(style);
      return () => {
        document.head.removeChild(style);
      };
    }
  }, [fontUrl, fontFamily]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top } = containerRef.current!.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - left, y: e.clientY - top };
    
    // Immediate update for responsiveness
    cursorRef.current = { ...mouseRef.current };
    requestAnimationFrame(updateFonts);
  };

  const updateFonts = () => {
    if (!titleRef.current) return;
    
    const cursor = cursorRef.current;
    const containerRect = containerRef.current!.getBoundingClientRect();

    spans.forEach((span) => {
      const spanRect = span.getBoundingClientRect();
      const spanX = spanRect.left - containerRect.left + spanRect.width / 2;
      const spanY = spanRect.top - containerRect.top + spanRect.height / 2;

      const dist = Math.sqrt(
        Math.pow(cursor.x - spanX, 2) + Math.pow(cursor.y - spanY, 2)
      );

      // Interaction Radius
      const maxDist = 300; 
      const scaleFactor = Math.max(0, (maxDist - dist) / maxDist);

      // Variable Font Settings
      // Adjust these ranges based on your specific variable font's capabilities
      const wght = weight ? 100 + scaleFactor * 800 : 400; // 100 to 900
      const wdth = width ? 100 - scaleFactor * 50 : 100;   // 100 to 50 (condensed)
      const ital = italic ? scaleFactor * 1 : 0;           // 0 to 1

      span.style.fontVariationSettings = `'wght' ${wght}, 'wdth' ${wdth}, 'ital' ${ital}`;
      
      if (alpha) {
        span.style.opacity = `${0.3 + scaleFactor * 0.7}`;
      }
    });
  };

  useEffect(() => {
    if (titleRef.current) {
      const childSpans = Array.from(titleRef.current.querySelectorAll('span'));
      setSpans(childSpans);
    }
  }, [text]);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`relative w-full h-full overflow-hidden bg-transparent ${className}`}
    >
      <h1
        ref={titleRef}
        className={`
          ${flex ? 'flex justify-between' : ''}
          ${stroke ? 'text-transparent stroke-2' : ''}
          uppercase text-center w-full h-full
        `}
        style={{
          fontFamily,
          fontSize: scale ? '15vw' : `${minFontSize}px`,
          lineHeight: 1,
          color: stroke ? 'transparent' : textColor,
          WebkitTextStroke: stroke ? `2px ${strokeColor}` : 'none',
          userSelect: 'none',
        }}
      >
        {text.split('').map((char, i) => (
          <span
            key={i}
            className="inline-block transition-all duration-75 ease-linear"
            data-char={char}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default TextPressure;