import { useEffect, useRef, useState, useCallback } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  revealDirection?: 'start' | 'end' | 'center';
  useOriginalCharsOnly?: boolean;
  characters?: string;
  className?: string;  
  parentClassName?: string;
  animateOn?: 'view' | 'hover';
  [key: string]: any;
}

export default function DecryptedText({
  text, 
  speed = 50, 
  maxIterations = 10, 
  sequential = false, 
  revealDirection = 'start', 
  useOriginalCharsOnly = false, 
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()_+',
  className = '',
  parentClassName = '',
  animateOn = 'hover',
  ...props
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLElement>(null);

  const letters = text.split('');
  
  const decrypt = useCallback(() => {
    let iteration = 0;
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = window.setInterval(() => {
      setDisplayText(prev => 
        prev
        .split('')
        .map((_, index) => {
          if (letters[index] === ' ') return ' '; 
          
          if (iteration >= maxIterations) {
            return letters[index];
          }
          
          return characters[Math.floor(Math.random() * characters.length)];
        })
        .join('')
      );
      
      iteration += 1 / 3; 
      
      if (iteration >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(text);
      }
    }, speed);
  }, [text, speed, maxIterations, characters, letters]);

  const handleMouseEnter = () => {
    if (animateOn === 'hover') {
      decrypt();
    }
  };

  const handleMouseLeave = () => {
    if (animateOn === 'hover') {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setDisplayText(text);
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (animateOn === 'view') {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                decrypt();
            }
        }, { threshold: 0.1 });
        
        observer.observe(container);
        return () => observer.disconnect();
    }

  }, [decrypt, animateOn]);

  useEffect(() => {
    if (animateOn === 'hover') return;
    decrypt();
  }, [decrypt, animateOn]);

  return (
    <span 
      ref={containerRef as any}
      className={`inline-block whitespace-nowrap ${parentClassName}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      <span className={className}>{displayText}</span>
    </span>
  );
}