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
        // 1. IDLE (5s)
        setMode('IDLE');
        await new Promise(r => setTimeout(r, 5000));
        if (!mounted) break;

        // 2. BLUR PHASE (2s)
        // Slow expansion and blur
        setMode('BLUR');
        await new Promise(r => setTimeout(r, 2000));
        if (!mounted) break;
        
        // 3. IDLE (5s)
        setMode('IDLE');
        await new Promise(r => setTimeout(r, 5000));
        if (!mounted) break;

        // 4. REDACTED PHASE (Flicker sequence)
        // Hard block
        setMode('REDACTED');
        await new Promise(r => setTimeout(r, 150)); 
        if (!mounted) break;
        
        // Quick flash back to text
        setMode('IDLE');
        await new Promise(r => setTimeout(r, 50)); 
        if (!mounted) break;
        
        // Hard block again
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
        // Slow transition for the blur/spread effect
        return "blur-[4px] tracking-[0.2em] opacity-60 scale-105 transition-all duration-[2000ms] ease-in-out";
      case 'REDACTED':
        // Instant transition for the harsh block effect
        return "bg-white text-transparent select-none transition-none";
      case 'IDLE':
      default:
        // Transition back to normal (slower if coming from blur, faster if coming from redacted? 
        // We generally want smooth return from blur, so keeping duration here is fine.
        // But for the flicker (Redacted -> Idle -> Redacted), we want 50ms transition? 
        // Actually, if we set transition-all here, the 50ms timeout in the loop might be shorter than the transition.
        // Let's stick to a standard duration for Idle to allow smooth return from Blur.
        return "blur-0 tracking-normal opacity-100 scale-100 transition-all duration-500 ease-out";
    }
  };

  return (
    <span className={`inline-block ${getClasses()} ${className}`}>
      {text}
    </span>
  );
}