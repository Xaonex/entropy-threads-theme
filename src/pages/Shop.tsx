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

const MOCK_PRODUCTS: ShopProduct[] = [
    {
        id: '1',
        handle: 'void-01',
        title: 'VOID-01 // SIGNAL TEE',
        price: 45.00,
        image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop',
        available: true
    },
    {
        id: '2',
        handle: 'node-03',
        title: 'NODE-03 // GLITCH HOODIE',
        price: 85.00,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop',
        available: false
    }
];

const Shop = () => {
  const [products, setProducts] = useState<ShopProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
        try {
            const data: any = await shopifyFetch({
                query: PRODUCTS_QUERY,
                variables: { first: 10 }
            });

            if (data && data.products) {
                const mapped = data.products.edges.map((e: any) => ({
                    id: e.node.id,
                    handle: e.node.handle,
                    title: e.node.title,
                    price: parseFloat(e.node.priceRange.minVariantPrice.amount),
                    image: e.node.images.edges[0]?.node.url || MOCK_PRODUCTS[0].image,
                    available: true // Simplified
                }));
                setProducts(mapped);
            } else {
                setProducts(MOCK_PRODUCTS);
            }
        } catch (e) {
            console.warn("Using Mock Data for Shop", e);
            setProducts(MOCK_PRODUCTS);
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

      {/* FILTER BAR - Compact */}
      <div className="border-b border-white/10 bg-off-black/50 backdrop-blur-sm sticky top-16 z-40 transition-all">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center font-mono text-xs md:text-sm">
            <div className="flex gap-6">
                <button className="text-white hover:text-cyan-glitch">[ ALL ]</button>
                <button className="text-static-gray hover:text-white">[ APPAREL ]</button>
                <button className="text-static-gray hover:text-white">[ ACCESSORIES ]</button>
            </div>
            <div className="flex gap-4">
                <span>SORT_BY:</span>
                <select className="bg-transparent border-none text-white outline-none cursor-pointer">
                    <option>SYSTEM_DEFAULT</option>
                    <option>PRICE_ASC</option>
                    <option>PRICE_DESC</option>
                </select>
            </div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <section className="container mx-auto px-6 py-8">
        {loading ? (
            <div className="font-mono text-static-gray animate-pulse">LOADING_GRID...</div>
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