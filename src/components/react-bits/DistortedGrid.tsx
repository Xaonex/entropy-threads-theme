import { useRef, useEffect } from 'react';

const DistortedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);
    resize();

    const draw = () => {
      time += 0.01;
      // Clear with transparency so we can layer it
      ctx.clearRect(0, 0, canvas.width, canvas.height); 
      
      // Or fill with void-black if it's the base layer
      // ctx.fillStyle = '#050505'; 
      // ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.strokeStyle = '#222'; // Dark subtle lines
      ctx.lineWidth = 1;

      const gridSize = 40;
      const width = canvas.width;
      const height = canvas.height;

      // Vertical Lines with Sine Distortion
      for (let x = 0; x <= width; x += gridSize) {
        ctx.beginPath();
        for (let y = 0; y <= height; y += 10) {
            // x-offset based on y and time
            const distortion = Math.sin(y * 0.005 + time) * 5 + Math.sin(y * 0.02 - time * 2) * 2;
            ctx.lineTo(x + distortion, y);
        }
        ctx.stroke();
      }

      // Horizontal Lines with Cosine Distortion
      for (let y = 0; y <= height; y += gridSize) {
        ctx.beginPath();
        for (let x = 0; x <= width; x += 10) {
             const distortion = Math.cos(x * 0.005 - time) * 5;
             ctx.lineTo(x, y + distortion);
        }
        ctx.stroke();
      }

      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-40 mix-blend-screen" />;
};

export default DistortedGrid;