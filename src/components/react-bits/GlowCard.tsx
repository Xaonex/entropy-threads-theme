import React, { useRef, useEffect } from 'react';

interface GlowCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  glowColor?: string;
  intensity?: 'low' | 'medium' | 'high';
  hoverOnly?: boolean;
}

export const GlowCard: React.FC<GlowCardProps> = ({
  children,
  glowColor = '#3b82f6',
  intensity = 'medium',
  hoverOnly = false,
  className = '',
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);

  const intensityMap = {
    low: '0.3',
    medium: '0.6',
    high: '1',
  };

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    };

    card.addEventListener('mousemove', handleMouseMove);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-xl border border-white/10 bg-black/50 ${className}`}
      style={
        {
          '--glow-color': glowColor,
          '--glow-intensity': intensityMap[intensity],
        } as React.CSSProperties
      }
      {...props}
    >
      <div
        className={`pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 ${
          hoverOnly ? 'group-hover:opacity-100' : 'opacity-100'
        }`}
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), var(--glow-color), transparent 40%)`,
          opacity: `var(--glow-intensity)`,
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
};