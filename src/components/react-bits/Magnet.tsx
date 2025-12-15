import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

interface MagnetProps {
  children: React.ReactNode;
  strength?: number;
  range?: number;
  disabled?: boolean;
  className?: string;
}

export const Magnet: React.FC<MagnetProps> = ({
  children,
  strength = 0.5,
  range = 100,
  disabled = false,
  className = '',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (disabled || !ref.current) return;

    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;

    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;

    if (Math.abs(distX) < range && Math.abs(distY) < range) {
      setPosition({ x: distX * strength, y: distY * strength });
    } else {
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};