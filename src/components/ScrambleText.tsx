import { useState, useEffect } from 'react';

const CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?/0123456789';

interface ScrambleTextProps {
  text: string;
  className?: string;
}

export default function ScrambleText({ text, className }: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [trigger, setTrigger] = useState(0);

  // The Glitch Loop Timer (4-8 seconds)
  useEffect(() => {
    const delay = Math.random() * 4000 + 4000;
    const timeout = setTimeout(() => {
      setTrigger(prev => prev + 1);
    }, delay);
    return () => clearTimeout(timeout);
  }, [trigger]);

  // The Scramble Animation Logic
  useEffect(() => {
    let iteration = 0;
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((_, index) => {
            if (index < iteration) {
              return text[index]; // Reveal correct char
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)]; // Random char
          })
          .join('')
      );

      if (iteration >= text.length) {
        clearInterval(interval);
        setDisplayText(text); // Ensure final state is clean
      }

      iteration += 1 / 2; 
    }, 40);

    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span className={className}>{displayText}</span>;
}