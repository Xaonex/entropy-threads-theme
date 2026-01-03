import SignalInterference from '../components/SignalInterference';

const Archive = () => {
  const images = [
    { id: 1, src: '/archive/archive_img_01_street.png', sector: 'TOKYO', subject: 'VOID-01' },
    { id: 2, src: '/archive/archive_img_02_void.png', sector: 'BERLIN', subject: 'VOID-02' },
    { id: 3, src: '/archive/archive_img_03_signal.png', sector: 'SEOUL', subject: 'VOID-03' },
    { id: 4, src: '/archive/archive_img_04_transit.png', sector: 'KYOTO', subject: 'VOID-04' },
    { id: 5, src: '/archive/archive_img_05_server.png', sector: 'OSAKA', subject: 'VOID-05' },
    { id: 6, src: '/archive/archive_img_06_glitch.png', sector: 'SHANGHAI', subject: 'VOID-06' }
  ];

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
            {images.map((item) => (
                <div key={item.id} className="group relative aspect-[2/3] bg-off-black border border-white/10 overflow-hidden cursor-crosshair">
                    
                    {/* IMAGE */}
                    <img 
                        src={item.src} 
                        alt={`Archive ${item.id}`} 
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 animate-in fade-in zoom-in-95 duration-1000"
                        loading="lazy"
                    />

                    {/* HOVER OVERLAY */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6 border border-white/20 backdrop-blur-sm">
                        <h3 className="text-xl font-bold text-white mb-1">SIMULATION_{String(item.id).padStart(2, '0')}</h3>
                        <div className="h-[1px] w-12 bg-signal-red mb-3"></div>
                        <p className="text-xs text-cyan-glitch mb-1">SECTOR: {item.sector}</p>
                        <p className="text-xs text-static-gray">SUBJECT: {item.subject}</p>
                        
                        <div className="mt-6 text-[10px] text-white/40 border border-white/10 px-2 py-1 self-start">
                            ACCESS_DENIED // CLASSIFIED
                        </div>
                    </div>
                    
                    {/* CORNER MARKERS */}
                    <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-white/50 pointer-events-none"></div>
                    <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-white/50 pointer-events-none"></div>
                    <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-white/50 pointer-events-none"></div>
                    <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-white/50 pointer-events-none"></div>

                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default Archive;

