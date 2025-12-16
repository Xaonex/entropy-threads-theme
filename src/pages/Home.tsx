import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import DecryptedText from '../components/react-bits/DecryptedText';
import ScrollVelocity from '../components/react-bits/ScrollVelocity';
import TypewriterText from '../components/react-bits/TypewriterText';
import GlitchText from '../components/react-bits/GlitchText';
import DotGrid from '../components/react-bits/DotGrid';
import { GlowCard } from '../components/react-bits/GlowCard';
import { ChromaGrid } from '../components/react-bits/ChromaGrid';
import { Magnet } from '../components/react-bits/Magnet';
import { shopifyFetch, PRODUCTS_QUERY } from '../lib/shopify';

// --- HOOKS ---
function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);
    return isMobile;
}

interface HomeProduct {
  id: string;
  handle: string;
  title: string;
  description: string;
  image: string;
}

const HERO_PHRASES = [
  "SYSTEM_ONLINE // V.2.0.4",
  "// SIGNAL LOST //",
  "// NOISE PATTERNS //",
  "// VOID WALKING //",
  "// SYSTEM ERROR //",
  "// LIMITED RELEASE //"
];

const HeroTextCycler = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % HERO_PHRASES.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div key={index} className="text-xl md:text-2xl font-mono text-signal-red tracking-widest mb-6 h-8">
            <DecryptedText text={HERO_PHRASES[index]} speed={50} characters="X010101" />
        </div>
    );
};

const Home = () => {
  const [featured, setFeatured] = useState<HomeProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [debugError, setDebugError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    async function loadFeatured() {
        try {
            const data: any = await shopifyFetch({
                query: PRODUCTS_QUERY,
                variables: { first: 3 }
            });

            if (!data) {
                setDebugError("ENV_VARS_MISSING // CHECK_VERCEL_SETTINGS");
                return;
            }

            if (data.errors) {
                 setDebugError(`API_ERROR: ${data.errors[0].message}`);
                 return;
            }

            if (data.products) {
                const mapped = data.products.edges.map((e: any) => ({
                    id: e.node.id,
                    handle: e.node.handle,
                    title: e.node.title,
                    description: e.node.description || "ARTIFACT_DESCRIPTION_MISSING",
                    image: e.node.images.edges[0]?.node.url || "" 
                }));
                setFeatured(mapped);
            }
        } catch (e: any) {
            console.warn("Failed to load featured products", e);
            setDebugError(e.message || "UNKNOWN_CONNECTION_ERROR");
        } finally {
            setLoading(false);
        }
    }
    loadFeatured();
  }, []);

  return (
    <div className="w-full">
      {/* HERO SECTION */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-void-black scanline">
        
        {/* Background Elements */}
        <div className="absolute inset-0 z-0">
             <ChromaGrid 
                gridSize={40} 
                aberrationAmount={5} 
                colors={['#1a1a1a', '#2a2a2a', '#0a0a0a']} 
             />
             <div className="noise-overlay" />
        </div>
        
        <div className="relative z-10 text-center flex flex-col items-center">
             
             {/* 1. Dynamic Text Overlay */}
             <HeroTextCycler />
             
             {/* Main Title */}
             <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mix-blend-difference mb-4">
                <span className="text-white block">ENTROPY</span>
                <span className="text-white block">THREADS</span>
             </h1>
             
             {/* 2. Tagline */}
             <div className="text-lg md:text-xl font-mono text-white/80 h-8 mb-12">
                 <TypewriterText text="WEAR THE NOISE." speed={100} cursor={true} />
             </div>
             
             {/* 3. Enhanced Button */}
             <Magnet strength={0.2} range={100}>
                <Link to="/shop">
                    <button className="group relative px-10 py-4 overflow-hidden border border-white bg-transparent font-mono text-white transition-all duration-300 hover:bg-white hover:text-black">
                        <span className="relative z-10 font-bold tracking-widest">ENTER_ARCHIVE</span>
                        <div className="absolute inset-0 -translate-x-full bg-white transition-transform duration-300 group-hover:translate-x-0" />
                    </button>
                </Link>
             </Magnet>

        </div>
      </section>

      {/* TICKER STRIP */}
      <div className="bg-signal-red text-black py-3 overflow-hidden font-black tracking-tighter border-y border-black">
        <ScrollVelocity 
            velocity={2} 
            texts={['LIMITED RELEASE // SIGNAL LOST // SYSTEM ERROR // VOID WALKING // NOISE PATTERNS']}
        />
      </div>

      {/* FEATURED COLLECTION - WITH MOBILE SCANNER */}
      <section className="py-32 px-6 bg-void-black min-h-[80vh]">
        <div className="container mx-auto">
             <h2 className="text-3xl md:text-4xl font-black mb-16 flex items-center gap-4">
                <span className="w-4 h-4 bg-cyan-glitch animate-pulse"></span>
                CURRENT_ARTIFACTS
             </h2>

             {loading ? (
                <div className="font-mono text-static-gray animate-pulse">LOADING_DATA_STREAM...</div>
             ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8">
                    {debugError ? (
                        <div className="col-span-full border border-signal-red p-4 text-signal-red font-mono text-center">
                            <p className="font-bold">SYSTEM_ALERT // CONNECTION_FAILURE</p>
                            <p className="text-sm mt-2">{debugError}</p>
                            <p className="text-xs text-static-gray mt-4">
                                CONFIG_REQUIRED: Add VITE_SHOPIFY_STORE_DOMAIN & VITE_SHOPIFY_STOREFRONT_ACCESS_TOKEN to Vercel/Netlify.
                            </p>
                        </div>
                    ) : featured.length > 0 ? featured.map((p, i) => (
                        <GlowCard key={p.id} glowColor="#00ff00" intensity="medium">
                            <Link to={`/product/${p.handle}`} className="block h-full cursor-pointer relative overflow-hidden group">
                                
                                {/* 
                                    IMAGE BACKGROUND - "THE SCANNER"
                                    Mobile: Uses Framer Motion to reveal color when in center view.
                                    Desktop: Uses group-hover (CSS) to reveal color.
                                */}
                                {p.image && (
                                    <motion.div 
                                        className="absolute inset-0 z-0"
                                        initial={isMobile ? { filter: 'grayscale(100%)' } : {}}
                                        whileInView={isMobile ? { filter: 'grayscale(0%)' } : {}}
                                        viewport={{ margin: "-20%" }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        <img 
                                            src={p.image} 
                                            alt={p.title} 
                                            className={`w-full h-full object-cover transition-all duration-500 
                                                ${!isMobile ? 'grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100' : 'opacity-80'}
                                            `}
                                        />
                                        {!isMobile && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent opacity-90 group-hover:opacity-60 transition-opacity duration-500" />
                                        )}
                                        {isMobile && (
                                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60" />
                                        )}
                                    </motion.div>
                                )}
                                
                                <div className="h-96 flex flex-col justify-between p-6 relative z-10">
                                    <div className="absolute top-4 right-4 text-xs font-mono text-white/50 border border-white/20 px-2 rounded backdrop-blur-sm">
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div className="flex-1 flex items-center justify-center">
                                        {/* Fallback Text if Image Missing */}
                                        {!p.image && (
                                            <span className="text-6xl font-black text-white/5 group-hover:text-white/20 transition-colors">
                                                {p.title.split(" ")[0]}
                                            </span>
                                        )}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-2 mix-blend-difference">{p.title}</h3>
                                        <p className="font-mono text-sm text-gray-400 truncate mix-blend-difference">{p.description}</p>
                                    </div>
                                </div>
                            </Link>
                        </GlowCard>
                    )) : (
                        <div className="col-span-full text-static-gray font-mono text-center py-12 border border-white/10">
                            NO_ARTIFACTS_FOUND // CHECK_SHOPIFY_INVENTORY
                        </div>
                    )}
                </div>
             )}
        </div>
      </section>

      {/* FOOTER: TRANSMISSION CAPTURE */}
      <section id="footer" className="relative py-20 px-6 bg-off-black border-t border-white/10 overflow-hidden">
         {/* DotGrid Texture */}
         <div className="absolute inset-0 opacity-20 pointer-events-none">
            <DotGrid gap={24} size={2} dotColor="#ffffff" />
         </div>

         <div className="container mx-auto relative z-10 flex flex-col items-center justify-center text-center space-y-8">
            <div className="space-y-2">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
                    <GlitchText text="NOISE_IN_THE_SIGNAL" speed={0.5} enableShadows={true} />
                </h2>
                <p className="font-mono text-xs md:text-sm text-static-gray tracking-widest">
                    &gt; Join the frequency. Early access to drops.
                </p>
            </div>

            <form className="w-full max-w-md flex flex-col gap-4" onSubmit={(e) => { e.preventDefault(); alert("TRANSMISSION_RECEIVED // WELCOME_TO_THE_VOID"); }}>
                <input 
                    type="email" 
                    placeholder="ENTER_EMAIL_ADDRESS" 
                    className="w-full bg-transparent border-b border-white/30 py-3 text-white font-mono placeholder:text-white/20 focus:border-white focus:outline-none transition-colors text-center md:text-left"
                    required
                />
                <button type="submit" className="w-full bg-white text-black font-black py-4 hover:bg-signal-red selection:bg-black transition-colors tracking-widest">
                    TRANSMIT
                </button>
            </form>

            <div className="pt-8">
                <Link to="/manifesto" className="text-[10px] font-mono text-static-gray hover:text-white border-b border-transparent hover:border-white transition-all pb-1">
                    [ READ MANIFESTO ]
                </Link>
            </div>
            
            <div className="text-[9px] text-white/10 font-mono mt-12">
                ENTROPY THREADS © 2024 // ALL RIGHTS RESERVED
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;