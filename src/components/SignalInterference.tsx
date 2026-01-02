import { useState, useEffect } from 'react';

interface SignalInterferenceProps {
  text: string;
  className?: string;
}

export default function SignalInterference({ text, className = "" }: SignalInterferenceProps) {
  const [mode, setMode] = useState<'IDLE' | 'BLUR' | 'REDACTED'>('IDLE');

  useEffect(() => {
    let mounted = true;

    const loop = async () => {
      while (mounted) {
        // 1. IDLE (3s) - Was 5s
        setMode('IDLE');
        await new Promise(r => setTimeout(r, 3000));
        if (!mounted) break;

        // 2. BLUR PHASE (2s)
        setMode('BLUR');
        await new Promise(r => setTimeout(r, 2000));
        if (!mounted) break;
        
        // 3. IDLE (1.5s) - Was 5s
        setMode('IDLE');
        await new Promise(r => setTimeout(r, 1500));
        if (!mounted) break;

        // 4. REDACTED PHASE (Flicker sequence)
        setMode('REDACTED');
        await new Promise(r => setTimeout(r, 150)); 
        if (!mounted) break;
        
        setMode('IDLE');
        await new Promise(r => setTimeout(r, 50)); 
        if (!mounted) break;
        
        setMode('REDACTED');
        await new Promise(r => setTimeout(r, 300)); 
        if (!mounted) break;
      }
    };

    loop();
    return () => { mounted = false; };
  }, []);

  const getClasses = () => {
    switch (mode) {
      case 'BLUR':
        return "blur-[4px] tracking-[0.2em] opacity-60 scale-105 transition-all duration-[2000ms] ease-in-out";
      case 'REDACTED':
        return "bg-white text-transparent select-none transition-none";
      case 'IDLE':
      default:
        return "blur-0 tracking-normal opacity-100 scale-100 transition-all duration-500 ease-out";
    }
  };

  return (
    <span className={`inline-block ${getClasses()} ${className}`}>
      {text}
    </span>
  );
}