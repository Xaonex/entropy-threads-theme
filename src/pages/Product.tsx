import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DecryptedText from '../components/react-bits/DecryptedText';
import { Magnet } from '../components/react-bits/Magnet';
import CountUp from '../components/react-bits/CountUp';
import { useCart } from '../context/CartContext';
import { shopifyFetch, PRODUCT_BY_HANDLE_QUERY } from '../lib/shopify';

interface ProductData {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
  images: string[];
  variants: Array<{ id: string; title: string; available: boolean; price: number }>;
}

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<ProductData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "sizing" | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadData() {
        if (!id) return;

        try {
            const data: any = await shopifyFetch({
                query: PRODUCT_BY_HANDLE_QUERY,
                variables: { handle: id }
            });
            
            if (data && data.product) {
                const p = data.product;
                setProduct({
                    id: p.id,
                    name: p.title,
                    price: parseFloat(p.priceRange.minVariantPrice.amount),
                    description: p.description,
                    features: ["100% Cotton", "Imported"],
                    images: p.images.edges.map((e: any) => e.node.url),
                    variants: p.variants.edges.map((e: any) => ({
                        id: e.node.id,
                        title: e.node.title,
                        available: e.node.availableForSale,
                        price: parseFloat(e.node.price.amount)
                    }))
                });
            } else {
                setError("ARTIFACT_NOT_FOUND");
            }
        } catch (e) {
            console.error("Failed to load product", e);
            setError("SIGNAL_LOST");
        } finally {
            setLoading(false);
        }
    }
    loadData();
  }, [id]);

  const toggleTab = (tab: "details" | "sizing") => {
    setActiveTab(activeTab === tab ? null : tab);
  };

  const handleAddToCart = () => {
    if (!product || !selectedSize) {
        alert("SELECT_SIZE_REQUIRED_//"); 
        return;
    }
    
    const selectedVariant = product.variants.find(v => v.title === selectedSize);
    if (!selectedVariant) return;

    addToCart({
        id: product.id,
        variantId: selectedVariant.id,
        name: product.name,
        price: selectedVariant.price,
        image: product.images[0],
        size: selectedSize,
        quantity: 1
    });
  };

  if (loading) return <div className="min-h-screen bg-void-black flex items-center justify-center text-white font-mono">LOADING_ARTIFACT...</div>;

  if (error || !product) {
      return (
          <div className="min-h-screen bg-void-black flex flex-col items-center justify-center text-white font-mono space-y-4">
              <h1 className="text-4xl font-black text-signal-red">404 // SIGNAL LOST</h1>
              <p className="text-static-gray">THE ARTIFACT YOU SEEK DOES NOT EXIST IN THIS TIMELINE.</p>
              <Link to="/shop" className="border border-white px-6 py-2 hover:bg-white hover:text-black transition-colors">RETURN TO ARCHIVE</Link>
          </div>
      )
  }

  return (
    <div className="pt-24 min-h-screen bg-void-black text-white">
      {/* MOBILE HEADER */}
      <div className="md:hidden px-6 pb-6">
        <h1 className="text-2xl font-black tracking-tighter mb-2">
            <DecryptedText text={product.name} speed={50} characters="X010101" />
        </h1>
        <p className="text-lg text-static-gray">${product.price.toFixed(2)}</p>
      </div>

      <div className="container mx-auto px-0 md:px-6"> 
        <div className="flex flex-col md:flex-row gap-12">
            {/* LEFT: IMAGE STACK */}
            <div className="w-full md:w-[60%] flex flex-col gap-4 px-0">
                {product.images.map((img, index) => (
                    <div key={index} className="w-full aspect-[4/5] bg-off-black relative overflow-hidden group">
                         <img src={img} alt={`${product.name} view ${index + 1}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"/>
                         <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-glitch">IMG_0{index + 1} // RAW_DATA</div>
                    </div>
                ))}
            </div>

            {/* RIGHT: DATA PANEL */}
            <div className="w-full md:w-[40%] px-6 md:px-0 relative">
                <div className="sticky top-28 space-y-4 pb-12">
                    <div className="hidden md:block border-b border-white/20 pb-6">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-3xl font-black tracking-tighter leading-none max-w-md">
                                <DecryptedText text={product.name} speed={50} characters="X010101" />
                            </h1>
                        </div>
                        <div className="flex justify-between items-center font-mono">
                            <span className="text-xl text-white">${product.price.toFixed(2)}</span>
                            <span className="text-[10px] text-signal-red animate-pulse">SYSTEM WATCH: <CountUp to={Math.floor(Math.random() * 50) + 12} duration={2} /> USERS ACTIVE</span>
                        </div>
                    </div>

                    {/* DYNAMIC VARIANTS SELECTOR */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-static-gray block mb-1">VARIANT_SELECT_//</label>
                        <div className="grid grid-cols-4 gap-2">
                            {product.variants.map((variant) => (
                                <button 
                                    key={variant.id}
                                    onClick={() => setSelectedSize(variant.title)}
                                    disabled={!variant.available}
                                    className={`h-10 border flex items-center justify-center font-mono text-xs transition-all duration-200 ${
                                        selectedSize === variant.title 
                                        ? 'bg-white text-black border-white' 
                                        : !variant.available ? 'opacity-20 cursor-not-allowed border-red-500 line-through' : 'bg-transparent text-static-gray border-white/20 hover:border-white hover:text-white'
                                    }`}
                                >
                                    [{variant.title}]
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="pt-2 space-y-2">
                        <Magnet strength={0.2} range={50}>
                            <button onClick={handleAddToCart} className="w-full h-12 bg-signal-red text-black font-black tracking-widest text-sm hover:bg-white transition-colors duration-300 relative overflow-hidden group">
                                <span className="relative z-10 group-hover:text-black">INITIATE TRANSFER</span>
                            </button>
                        </Magnet>
                        <p className="text-[10px] text-center text-static-gray font-mono">SECURE_CONNECTION_ESTABLISHED_//</p>
                    </div>

                    <div className="border-t border-white/20 pt-4 space-y-0">
                         <div className="border-b border-white/10">
                            <button onClick={() => toggleTab('details')} className="w-full py-3 flex justify-between items-center text-left hover:text-cyan-glitch transition-colors">
                                <span className="font-bold tracking-widest text-xs">ARTIFACT_DETAILS</span>
                                <span className="font-mono text-sm">{activeTab === 'details' ? '-' : '+'}</span>
                            </button>
                            {activeTab === 'details' && (
                                <div className="pb-4 text-static-gray text-xs leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
                                    <p className="mb-2">{product.description}</p>
                                    <ul className="list-disc list-inside font-mono text-[10px]">{product.features.map(f => <li key={f}>{f}</li>)}</ul>
                                </div>
                            )}
                         </div>
                         <div className="border-b border-white/10">
                            <button onClick={() => toggleTab('sizing')} className="w-full py-3 flex justify-between items-center text-left hover:text-cyan-glitch transition-colors">
                                <span className="font-bold tracking-widest text-xs">SIZE_GUIDE</span>
                                <span className="font-mono text-sm">{activeTab === 'sizing' ? '-' : '+'}</span>
                            </button>
                            {activeTab === 'sizing' && (
                                <div className="pb-4 text-static-gray text-xs font-mono animate-in slide-in-from-top-2 fade-in duration-300">FIT: OVERSIZED.<br/>MODEL IS 185CM WEARING SIZE L.<br/>REFERENCE: SYSTEM_STANDARD_02.</div>
                            )}
                         </div>
                    </div>
                </div>
            </div>
        </div>
      </div>
       <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
            <Magnet strength={0.2}>
                <button onClick={handleAddToCart} className="w-full h-12 bg-signal-red text-black font-black tracking-widest text-xs shadow-lg shadow-signal-red/20 border border-black">ADD TO CART - ${product.price}</button>
            </Magnet>
       </div>
    </div>
  );
};

export default Product;