import SignalInterference from '../components/SignalInterference';

const Archive = () => {
  const placeholders = Array.from({ length: 6 }).map((_, i) => ({
      id: i + 1,
      sector: ['TOKYO', 'BERLIN', 'SEOUL', 'KYOTO', 'OSAKA', 'SHANGHAI'][i],
      subject: \VOID-\\
  }));

  return (
    <div className="pt-32 pb-24 min-h-screen bg-void-black text-white font-mono px-6">
      <div className="container mx-auto">
        
        {/* HEADER */}
        <div className="mb-12 border-b border-white/10 pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
                <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-2 text-white">
                    <SignalInterference text="THE_ARCHIVE" />
                </h1>
                <p className="text-static-gray text-xs md:text-sm">
                    // ARCHIVE_ACCESS: SIMULATION_LOGS
                </p>
            </div>
            <div className="text-right hidden md:block">
                <p className="text-[10px] text-cyan-glitch tracking-widest border border-cyan-glitch/20 px-2 py-1 bg-cyan-glitch/5">
                    CONNECTION_SECURE // V.2.0.4
                </p>
            </div>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {placeholders.map((item) => (
                <div key={item.id} className="group relative aspect-[4/5] bg-off-black border border-white/10 overflow-hidden cursor-crosshair">
                    
                    {/* LOADING / GLITCH EFFECT PLACEHOLDER */}
                    <div className="absolute inset-0 flex items-center justify-center">
                         {/* Scanning Line */}
                         <div className="absolute top-0 left-0 w-full h-[1px] bg-cyan-glitch/50 shadow-[0_0_15px_rgba(0,255,255,0.5)] animate-[scan_4s_linear_infinite]"></div>
                         
                         {/* Pulsing Core */}
                         <div className="w-16 h-16 border border-white/20 rounded-full flex items-center justify-center animate-pulse">
                            <div className="w-12 h-12 bg-white/5 rounded-full backdrop-blur-sm"></div>
                         </div>
                         
                         <div className="absolute bottom-12 text-[10px] text-static-gray animate-pulse tracking-widest">
                             AWAITING_DATA_TRANSMISSION...
                         </div>
                    </div>

                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 border border-white/20">
                        <h3 className="text-xl font-bold text-white mb-1">SIMULATION_{String(item.id).padStart(2, '0')}</h3>
                        <div className="h-[1px] w-12 bg-signal-red mb-3"></div>
                        <p className="text-xs text-cyan-glitch mb-1">SECTOR: {item.sector}</p>
                        <p className="text-xs text-static-gray">SUBJECT: {item.subject}</p>
                        
                        <div className="mt-6 text-[10px] text-white/40 border border-white/10 px-2 py-1 self-start">
                            ACCESS_DENIED // CLASSIFIED
                        </div>
                    </div>
                    
                    {/* CORNER MARKERS */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/30"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/30"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/30"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/30"></div>

                </div>
            ))}
        </div>

      </div>
      
      <style>{\
        @keyframes scan {
            0% { top: 0%; opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { top: 100%; opacity: 0; }
        }
      \}</style>
    </div>
  );
};

export default Archive;
