import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

interface BlobCursorProps {
  size?: number;
  color?: string;
  smoothing?: number;
  blendMode?: React.CSSProperties['mixBlendMode'];
}

export const BlobCursor: React.FC<BlobCursorProps> = ({
  size = 40,
  color = '#3b82f6',
  // smoothing = 0.15, // Unused
  blendMode = 'difference',
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const x = useSpring(0, springConfig);
  const y = useSpring(0, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    x.set(mousePosition.x - size / 2);
    y.set(mousePosition.y - size / 2);
  }, [mousePosition, size, x, y]);

  return (
    <>
      <style>
        {`
          body {
            cursor: none;
          }
        `}
      </style>
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full opacity-80"
        style={{
          width: size,
          height: size,
          backgroundColor: color,
          mixBlendMode: blendMode,
          x,
          y,
        }}
      />
    </>
  );
};