import { useState, useEffect } from 'react';
import type { FC } from 'react';

interface TypewriterTextProps {
  text: string;
  speed?: number; // ms per char
  className?: string;
  cursor?: boolean;
  loop?: boolean;
  delay?: number;
}

const TypewriterText: FC<TypewriterTextProps> = ({ 
  text, 
  speed = 50, 
  className = '', 
  cursor = true,
  loop = false,
  delay = 0 
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;

    if (currentIndex < text.length) {
      timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (loop) {
      timeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex(0);
      }, 2000); // Wait before restart
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text, speed, loop]);

  // Handle initial delay
  useEffect(() => {
    const startTimeout = setTimeout(() => {
        setDisplayedText('');
        setCurrentIndex(0);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [delay]);

  return (
    <span className={className}>
      {displayedText}
      {cursor && (
        <span className="animate-pulse inline-block ml-1 bg-current w-[0.5em] h-[1em] align-middle" />
      )}
    </span>
  );
};

export default TypewriterText;