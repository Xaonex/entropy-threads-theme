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
        // 1. IDLE (3s)
        setMode('IDLE');
        await new Promise(r => setTimeout(r, 3000));
        if (!mounted) break;

        // 2. BLUR PHASE (2s)
        // POP & PAN EFFECT: Scale up and move right
        setMode('BLUR');
        await new Promise(r => setTimeout(r, 2000));
        if (!mounted) break;
        
        // 3. IDLE (1.5s)
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
        // POP & PAN: scale-110, translate-x-4, slight blur, opacity-80
        return "blur-[4px] tracking-normal opacity-80 scale-90 transition-all duration-300 ease-in-out";
      case 'REDACTED':
        return "bg-white text-transparent select-none transition-none";
      case 'IDLE':
      default:
        return "blur-0 tracking-normal opacity-100 scale-100 translate-x-0 transition-all duration-500 ease-out";
    }
  };

  return (
    <span className={`inline-block ${getClasses()} ${className}`}>
      {text}
    </span>
  );
}

