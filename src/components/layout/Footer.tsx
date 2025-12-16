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
            <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
          </ul>
        </div>

        {/* Col 4: Newsletter */}
        <div className="flex flex-col space-y-4">
          <h4 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Mailing List</h4>
          <div className="flex relative">
            <span className="absolute left-3 top-2.5 text-gray-500 font-mono">{'>'}</span>
            <input 
              type="email" 
              placeholder="ENTER_EMAIL" 
              className="w-full bg-black border border-white/20 px-8 py-2 text-sm text-white focus:outline-none focus:border-signal-red font-mono placeholder:text-gray-700"
            />
          </div>
        </div>
      </div>
      
      <div className="mt-16 text-center text-xs text-gray-800 font-mono">
        © 2025 ENTROPY THREADS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};