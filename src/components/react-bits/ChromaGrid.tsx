import React, { useEffect, useRef } from 'react';

interface ChromaGridProps {
  gridSize?: number;
  aberrationAmount?: number;
  colors?: string[];
  className?: string;
}

export const ChromaGrid: React.FC<ChromaGridProps> = ({
  gridSize = 30,
  aberrationAmount = 5,
  colors = ['#ff0000', '#00ff00', '#0000ff'],
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resize);
    resize();

    const drawGrid = (offset: number, color: string) => {
      ctx.beginPath();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;

      // Vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.moveTo(x + offset, 0);
        ctx.lineTo(x + offset, canvas.height);
      }

      // Horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.moveTo(0, y + offset);
        ctx.lineTo(canvas.width, y + offset);
      }

      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw three grids with slight offsets for chromatic aberration
      drawGrid(-aberrationAmount, colors[0]);
      drawGrid(0, colors[1]);
      drawGrid(aberrationAmount, colors[2]);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [gridSize, aberrationAmount, colors]);

  return <canvas ref={canvasRef} className={`block w-full h-full ${className}`} />;
};