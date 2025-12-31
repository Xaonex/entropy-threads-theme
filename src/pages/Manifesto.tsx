import { useState, useEffect } from 'react';
import DecryptedText from '../components/react-bits/DecryptedText';

const Manifesto = () => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    let timeoutId: any;

    const triggerGlitch = () => {
      setIsGlitching(true);
      // Reset after a short delay to allow the animation to run
      // Effectively flips the key back, which might trigger another animation, causing a double-glitch effect (desirable for "static")
      setTimeout(() => setIsGlitching(false), 200); 
      
      // Schedule next glitch (4-8 seconds)
      const nextDelay = Math.random() * 4000 + 4000;
      timeoutId = setTimeout(triggerGlitch, nextDelay);
    };

    // First glitch after 2s
    timeoutId = setTimeout(triggerGlitch, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="min-h-screen bg-void-black text-white flex items-center justify-center pt-24 pb-12 px-6">
      <div className="max-w-2xl text-center space-y-12">
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            <DecryptedText 
                key={isGlitching ? 'glitch-active' : 'glitch-idle'} 
                text="THE STATIC IN THE SIGNAL" 
                animateOn="view" 
                revealDirection="center" 
                speed={50}
                maxIterations={10} 
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