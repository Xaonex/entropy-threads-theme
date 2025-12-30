import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import GlitchText from '../components/react-bits/GlitchText';
import TypewriterText from '../components/react-bits/TypewriterText';
import DotGrid from '../components/react-bits/DotGrid';
import { shopifyFetch, PRODUCTS_QUERY } from '../lib/shopify';

interface ShopProduct {
  id: string;
  handle: string;
  title: string;
  price: number;
  image: string;
  available: boolean;
}

const Shop = () => {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
        try {
            // FORCE FETCH LIMIT INCREASED TO 50
            const data: any = await shopifyFetch({
                query: PRODUCTS_QUERY,
                variables: { first: 50 }
            });

            if (data && data.products) {
                console.log("DEBUG_GRID: Fetched Products Count:", data.products.edges.length);
                const mapped = data.products.edges.map((e: any) => ({
                    id: e.node.id,
                    handle: e.node.handle,
                    title: e.node.title,
                    price: parseFloat(e.node.priceRange.minVariantPrice.amount),
                    image: e.node.images.edges[0]?.node.url || "",
                    available: e.node.availableForSale
                }));
                setProducts(mapped);
            } else {
                setError(true);
            }
        } catch (e) {
            console.warn("Shop Load Failed", e);
            setError(true);
        } finally {
            setLoading(false);
        }
    }
    fetchProducts();
  }, []);

  return (
    <div className="pt-24 min-h-screen">
      {/* COLLECTION HERO - COMPACT */}
      <section className="relative py-12 px-6 border-b border-white/10 overflow-hidden">
         <DotGrid gap={32} size={2} dotColor="#333" className="opacity-30" />
         <div className="container mx-auto relative z-10">
            <h1 className="text-4xl md:text-6xl font-black mb-2">
               <GlitchText text="ALL RELEASES" speed={0.8} enableShadows={true} />
            </h1>
            <div className="text-sm md:text-base text-static-gray font-mono h-6">
               <TypewriterText text="> ACCESSING ARCHIVES... INITIALIZING PROTOCOL 0.9" speed={30} cursor={true} />
            </div>
         </div>
      </section>

      {/* PRODUCT GRID */}
      <section className="container mx-auto px-6 py-8">
        {loading ? (
            <div className="font-mono text-static-gray animate-pulse">LOADING_GRID...</div>
        ) : error || products.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center border border-white/10 bg-void-black/50">
                <h3 className="text-2xl font-black text-white/20 mb-2">SIGNAL_LOST</h3>
                <p className="font-mono text-static-gray text-sm">ARCHIVE_EMPTY // OR CONNECTION_FAILED</p>
                <p className="font-mono text-xs text-signal-red mt-4">ERROR_CODE: 503_VOID</p>
            </div>
        ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
                {products.map((p, i) => (
                    <Link key={p.id} to={`/product/${p.handle}`} className="block group relative">
                        <div className="aspect-[4/5] bg-off-black overflow-hidden relative border border-white/5 group-hover:border-white/20 transition-all">
                            <div className="absolute inset-0 flex items-center justify-center text-static-gray opacity-20 text-4xl font-black rotate-45">
                                IMG_{String(i + 1).padStart(2, '0')}
                            </div>
                            {/* Simple Logic for Badge */}
                            {!p.available ? (
                                <div className="absolute top-2 left-2 border border-signal-red text-signal-red text-[9px] px-1.5 py-0.5 font-bold tracking-widest bg-black/50 backdrop-blur-md">
                                    SOLD OUT
                                </div>
                            ) : (
                                <div className="absolute top-2 left-2 border border-cyan-glitch text-cyan-glitch text-[9px] px-1.5 py-0.5 font-bold tracking-widest bg-black/50 backdrop-blur-md">
                                    NEW
                                </div>
                            )}
                            <img src={p.image} alt={p.title} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0" />
                        </div>
                        <div className="mt-3 font-mono">
                            <div className="flex justify-between items-start">
                                <h3 className="text-white text-sm font-bold group-hover:text-cyan-glitch transition-colors truncate pr-2">{p.title}</h3>
                                <span className="text-static-gray text-sm">${p.price.toFixed(2)}</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        )}
      </section>
    </div>
  );
};

export default Shop;