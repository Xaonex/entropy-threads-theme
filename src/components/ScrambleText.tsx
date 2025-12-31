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
    // maxIterations roughly controls duration relative to length 
    // but the logic below reveals char by char based on iteration vs index
    // The user provided logic: if (index < iteration) reveal.
    // So 'iteration' determines how many chars are revealed.
    
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
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

      iteration += 1 / 2; // Speed control (User suggested 1/3, 1/2 is slightly faster reveal)
    }, 40); // 30-50ms tick

    return () => clearInterval(interval);
  }, [trigger, text]);

  return <span className={className}>{displayText}</span>;
}