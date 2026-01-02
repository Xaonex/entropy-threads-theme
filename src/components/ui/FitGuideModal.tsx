import { useRef, useEffect } from 'react';

interface FitGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FitGuideModal = ({ isOpen, onClose }: FitGuideModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Close on click outside
  const handleClickOutside = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-in fade-in duration-200"
      onClick={handleClickOutside}
    >
      <div 
        ref={modalRef}
        className="bg-off-black border border-white/20 w-full max-w-4xl shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto md:overflow-y-visible"
      >
        {/* CLOSE BUTTON */}
        <button 
            onClick={onClose} 
            className="absolute top-4 right-4 z-10 text-static-gray hover:text-signal-red font-mono text-xl"
        >
            [X]
        </button>

        {/* LEFT COLUMN: VISUAL SCHEMATIC */}
        <div className="w-full md:w-1/2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-white/10 relative bg-void-black/50">
           <h3 className="font-mono text-xs text-cyan-glitch mb-8 tracking-widest">// SCHEMATIC_VIEW: T-5080</h3>
           
           {/* WIREFRAME CONTAINER */}
           <div className="relative aspect-square w-full border border-dashed border-white/20 flex items-center justify-center p-8">
                
                {/* T-SHIRT WIREFRAME */}
                <div className="relative w-full h-full border border-white/50 opacity-80">
                    {/* Neck */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-4 border-b border-l border-r border-white/50 rounded-b-full"></div>
                    {/* Sleeves */}
                    <div className="absolute top-0 -left-4 w-4 h-1/3 border-t border-l border-b border-white/50 -skew-y-12 origin-top-right"></div>
                    <div className="absolute top-0 -right-4 w-4 h-1/3 border-t border-r border-b border-white/50 skew-y-12 origin-top-left"></div>
                    
                    {/* DIMENSION LINES */}
                    
                    {/* A: LENGTH */}
                    <div className="absolute -right-6 top-0 bottom-0 border-r border-white/30 flex items-center">
                        <span className="translate-x-4 font-mono text-xs text-signal-red rotate-90">LENGTH [A]</span>
                    </div>

                    {/* B: WIDTH */}
                    <div className="absolute bottom-0 left-0 right-0 -mb-6 border-b border-white/30 flex justify-center">
                         <span className="translate-y-6 font-mono text-xs text-signal-red">WIDTH [B]</span>
                    </div>

                     {/* CENTER LINE */}
                     <div className="absolute top-0 bottom-0 left-1/2 border-l border-dashed border-white/10"></div>
                </div>

           </div>
           
           <p className="mt-8 font-mono text-[10px] text-static-gray text-center">
               FIG 1.0 // STANDARD_ISSUE_SILHOUETTE
           </p>
        </div>

        {/* RIGHT COLUMN: DATA TABLE */}
        <div className="w-full md:w-1/2 p-8 md:p-12 bg-off-black">
          <div className="mb-8">
            <h2 className="font-bold text-white text-xl tracking-tighter mb-2">
                // ARTIFACT_BLUEPRINT: <span className="text-static-gray">HEAVY_OVERSIZED_TEE</span>
            </h2>
            <p className="font-mono text-xs text-signal-red">
                SPECIFICATION: AS COLOUR 5080 // HEAVY FELT
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse font-mono text-sm md:text-base">
                <thead>
                    <tr className="border-b border-white/20 text-static-gray">
                        <th className="py-2 pl-2">SIZE</th>
                        <th className="py-2">WIDTH (cm) [B]</th>
                        <th className="py-2">LENGTH (cm) [A]</th>
                    </tr>
                </thead>
                <tbody className="text-gray-300">
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pl-2 font-bold text-white">S</td>
                        <td className="py-3">47.5</td>
                        <td className="py-3">71</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pl-2 font-bold text-white">M</td>
                        <td className="py-3">52</td>
                        <td className="py-3">75</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pl-2 font-bold text-white">L</td>
                        <td className="py-3">56.5</td>
                        <td className="py-3">78.5</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pl-2 font-bold text-white">XL</td>
                        <td className="py-3">61</td>
                        <td className="py-3">82</td>
                    </tr>
                    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="py-3 pl-2 font-bold text-white">2XL</td>
                        <td className="py-3">64</td>
                        <td className="py-3">83.5</td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                        <td className="py-3 pl-2 font-bold text-white">3XL</td>
                        <td className="py-3">68</td>
                        <td className="py-3">85</td>
                    </tr>
                </tbody>
            </table>
          </div>

          <div className="mt-8 p-4 border border-signal-red/30 bg-signal-red/5">
             <p className="font-mono text-[10px] text-signal-red">
                 NOTE: MEASUREMENTS ARE APPROXIMATE (+/- 1CM TOLERANCE). SUITABLE FOR BIO-FORMS REQUIRING ENHANCED MOBILITY.
             </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default FitGuideModal;


