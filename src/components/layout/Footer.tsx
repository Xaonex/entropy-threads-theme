import VolatileStatus from '../ui/VolatileStatus';

export const Footer = () => {
  return (
    <footer className="w-full bg-off-black border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Col 1: Status */}
        <div className="flex flex-col space-y-4">
          <h3 className="text-lg font-bold text-white">ENTROPY THREADS</h3>
          <div className="font-mono text-xs text-signal-red">
             <VolatileStatus className="text-xs md:text-xs mb-0 h-auto tracking-normal" />
          </div>
        </div>

        {/* Col 2: Shop */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Shop</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/shop" className="hover:text-white transition-colors">Tees</a></li>
            <li><a href="/shop" className="hover:text-white transition-colors">Hoodies</a></li>
            <li><a href="/shop" className="hover:text-white transition-colors">Accessories</a></li>
          </ul>
        </div>

        {/* Col 3: Legal */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Legal</h4>
          <ul className="space-y-2 text-sm text-gray-400">
            <li><a href="/protocols" className="hover:text-white transition-colors">Protocols</a></li>
            <li><a href="/protocols" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="/protocols" className="hover:text-white transition-colors">Returns</a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Compliance</h4>
          <div className="flex items-center justify-between border border-white/20 p-2 opacity-70 hover:opacity-100 transition-opacity">
            <span className="text-[10px] text-static-gray font-mono">COOKIE_PREF_//</span>
            <div className="w-8 h-4 bg-signal-red/20 rounded-full relative cursor-not-allowed">
                <div className="w-2 h-2 bg-signal-red rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
          <a href="/protocols" className="text-[10px] text-cyan-glitch font-mono hover:underline decoration-cyan-glitch/50 underline-offset-4 mt-2 block">VIEW_ALL_PROTOCOLS_&gt;</a>
        </div>
      </div>
      
      <div className="mt-16 text-center text-xs text-gray-800 font-mono">
        © 2025 ENTROPY THREADS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

