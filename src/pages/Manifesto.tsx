import { useState, useEffect } from 'react';
import DecryptedText from '../components/react-bits/DecryptedText';

const Manifesto = () => {
  const [glitchKey, setGlitchKey] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setGlitchKey(prev => prev + 1); // Force re-render/replay
    }, Math.random() * 4000 + 4000); // Random visual glitch every 4-8s
    
    return () => clearTimeout(timeout);
  }, [glitchKey]);

  return (
    <div className="min-h-screen bg-void-black text-white flex items-center justify-center pt-24 pb-12 px-6">
      <div className="max-w-2xl text-center space-y-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            <DecryptedText 
                key={glitchKey} 
                text="THE STATIC IN THE SIGNAL" 
                speed={60} 
                characters="X010101" 
            />
        </h1>
        
        <div className="space-y-8 font-mono text-sm md:text-base text-gray-400 leading-relaxed tracking-wide">
            <p>
                We are not a brand. We are a frequency.
            </p>
            <p>
                In a world of infinite noise, we are the glitch that reveals the structure. 
                The artifacts we create are not just clothing; they are physical manifestations of digital entropy.
            </p>
            <p>
                Designed in the void. Compiled for the street.
            </p>
            <p className="text-signal-red pt-4">
                // SYSTEM_STATUS: ONLINE
                <br />
                // WELCOME_TO_THE_VOID
            </p>
        </div>
      </div>
    </div>
  );
};

export default Manifesto;