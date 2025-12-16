import { useState, useEffect } from 'react';

const VolatileStatus = () => {
    const [version, setVersion] = useState("2.0.4");
    const [glitchColor, setGlitchColor] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            // 20% chance to glitch the version
            if (Math.random() > 0.8) {
                const patch = Math.floor(Math.random() * 9);
                const minor = Math.random() > 0.9 ? Math.floor(Math.random() * 5) : 0;
                setVersion(`2.${minor}.${patch}`);
                setGlitchColor(true);
                setTimeout(() => setGlitchColor(false), 200);
            }
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className={`text-xl md:text-2xl font-mono tracking-widest mb-6 h-8 transition-colors duration-100 ${glitchColor ? 'text-white' : 'text-signal-red'}`}>
            SYSTEM_ONLINE // V.{version}
        </div>
    );
};

export default VolatileStatus;