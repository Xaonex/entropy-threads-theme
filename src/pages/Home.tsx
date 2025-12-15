import { Link } from 'react-router-dom';
// import { SplitText } from '../components/react-bits/SplitText'; 
import DecryptedText from '../components/react-bits/DecryptedText';
import ScrollVelocity from '../components/react-bits/ScrollVelocity';
import TextPressure from '../components/react-bits/TextPressure';
import { GlowCard } from '../components/react-bits/GlowCard';
import { ChromaGrid } from '../components/react-bits/ChromaGrid';
import { Magnet } from '../components/react-bits/Magnet';

const Home = () => {
  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
             <ChromaGrid 
                gridSize={30} 
                aberrationAmount={5} 
                colors={['#333333', '#444444', '#222222']} 
             />
        </div>
        
        <div className="relative z-10 text-center space-y-4">
             <div className="text-xl md:text-2xl font-mono text-signal-red tracking-widest mb-4">
                <DecryptedText text="SYSTEM_ONLINE // V.2.0.4" speed={30} characters="X010101" />
             </div>
             
             {/* REDUCED SIZE: text-9xl -> text-7xl */}
             {/* FALLBACK: Static Text to fix "Lonely E" bug */}
             <h1 className="text-6xl md:text-7xl font-black tracking-tighter leading-none mix-blend-difference">
                <span className="text-white">ENTROPY THREADS</span>
             </h1>
             
             <div className="pt-8">
                <Magnet strength={0.2} range={100}>
                    <Link to="/shop">
                        <button className="px-8 py-3 border border-white/20 bg-void-black/50 backdrop-blur-sm text-white font-mono hover:bg-white hover:text-black transition-all duration-300">
                            ENTER_ARCHIVE
                        </button>
                    </Link>
                </Magnet>
             </div>
        </div>
      </section>

      {/* TICKER STRIP */}
      <div className="bg-signal-red text-black py-3 overflow-hidden font-black tracking-tighter">
        <ScrollVelocity 
            velocity={3} 
            texts={['LIMITED RELEASE // SIGNAL LOST // SYSTEM ERROR // VOID WALKING // NOISE PATTERNS']}
        />
      </div>

      {/* FEATURED COLLECTION */}
      <section className="py-24 px-6 bg-void-black">
        <div className="container mx-auto">
             <h2 className="text-3xl md:text-4xl font-black mb-12 flex items-center gap-4">
                <span className="w-4 h-4 bg-cyan-glitch animate-pulse"></span>
                CURRENT_ARTIFACTS
             </h2>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <GlowCard glowColor="#00ff00" intensity="medium">
                    {/* FIXED: Wrapped in Link for Interactivity */}
                    <Link to="/product/void-01" className="block h-full cursor-pointer">
                        <div className="h-96 flex flex-col justify-between p-6 bg-off-black relative group">
                            <div className="absolute top-4 right-4 text-xs font-mono text-white/50 border border-white/20 px-2 rounded">
                                01
                            </div>
                            <div className="flex-1 flex items-center justify-center">
                                <span className="text-6xl font-black text-white/5 group-hover:text-white/20 transition-colors">VOID</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">SIGNAL TEE</h3>
                                <p className="font-mono text-sm text-gray-400">HEAVYWEIGHT COTTON // STATIC PRINT</p>
                            </div>
                        </div>
                    </Link>
                </GlowCard>
             </div>
        </div>
      </section>

      {/* MANIFESTO / TEXT PRESSURE */}
      <section id="manifesto" className="py-32 px-6 flex items-center justify-center min-h-[50vh] bg-grid-white/[0.02]">
         <div className="relative w-full max-w-4xl h-64 md:h-96">
            <TextPressure 
                text="NOISE_IN_THE_SIGNAL" 
                flex={true} 
                alpha={false}
                stroke={false}
                width={true}
                weight={true}
                italic={false}
                textColor="#ffffff"
                minFontSize={36}
            />
         </div>
      </section>
    </div>
  );
};

export default Home;