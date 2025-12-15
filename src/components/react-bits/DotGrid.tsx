import type { FC } from 'react';

interface DotGridProps {
  dotColor?: string;
  gap?: number;
  size?: number;
  className?: string;
}

const DotGrid: FC<DotGridProps> = ({ 
  dotColor = '#333', 
  gap = 20, 
  size = 2, 
  className = '' 
}) => {
  return (
    <div 
      className={`absolute inset-0 pointer-events-none z-0 ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} ${size}px, transparent ${size}px)`,
        backgroundSize: `${gap}px ${gap}px`
      }}
    />
  );
};

export default DotGrid;