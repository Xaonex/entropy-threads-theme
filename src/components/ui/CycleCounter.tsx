import { useState, useEffect } from 'react';

const CycleCounter = () => {
    const TOTAL_LIMIT = 500;
    const [claimed, setClaimed] = useState(423);

    useEffect(() => {
        // Randomize slightly on mount to feel live (410-440)
        const randomStart = Math.floor(Math.random() * (440 - 410 + 1)) + 410;
        setClaimed(randomStart);
    }, []);

    const percentage = Math.min((claimed / TOTAL_LIMIT) * 100, 100);
    const isCritical = percentage > 85;

    return (
        <div className="w-full mb-4">
            <div className="flex justify-between items-end mb-1">
                <span className="font-mono text-[10px] text-static-gray tracking-widest">
                    CYCLE_LIMIT_//
                </span>
                <span className="font-mono text-[10px] text-white tracking-widest">
                    [ {claimed} / {TOTAL_LIMIT} UNITS CLAIMED ]
                </span>
            </div>
            
            <div className="w-full h-1 bg-gray-800 relative overflow-hidden">
                {/* Background Scanline Effect */}
                <div className="absolute inset-0 bg-white/5 animate-pulse"></div>

                {/* Progress Bar */}
                <div 
                    className={`h-full transition-all duration-1000 ease-out ${isCritical ? 'bg-signal-red shadow-[0_0_10px_rgba(255,51,51,0.5)]' : 'bg-cyan-glitch shadow-[0_0_10px_rgba(0,255,255,0.5)]'}`}
                    style={{ width: `${percentage}%` }}
                >
                    {/* Glitch Overlay on Bar */}
                    <div className="absolute inset-0 bg-white/20 mix-blend-overlay w-full h-full animate-pulse"></div>
                </div>
            </div>
            
            {isCritical && (
                <p className="text-[9px] text-signal-red font-mono mt-1 text-right animate-pulse">
                    WARNING: FABRICATION_CAPACITY_CRITICAL
                </p>
            )}
        </div>
    );
};

export default CycleCounter;
