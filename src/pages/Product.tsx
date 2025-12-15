import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
}

const MOCK_PRODUCT: ProductData = {
  id: "void-01",
  name: "VOID-01 // SIGNAL TEE",
  price: 45.00,
  description: "Heavyweight cotton structure. 280gsm. The signal is lost, but the noise remains. Features high-density screen print on back and puff print chest mark.",
  features: ["100% Cotton", "Oversized Fit", "Drop Shoulder", "Pre-shrunk"],
  images: [
    "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop", 
    "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop"
  ]
};

const Product = () => {
  const { id } = useParams(); // Should be handle in real app
  const [product, setProduct] = useState<ProductData>(MOCK_PRODUCT);
  const [loading, setLoading] = useState(true);
  
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "sizing" | null>(null);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadData() {
        // If "void-01" or undefined, stick to mock. Real handle would be different.
        if (!id || id === 'void-01') {
            setLoading(false);
            return;
        }

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
                    features: ["100% Cotton", "Imported"], // Shopify doesn't always have features list easily
                    images: p.media.edges.map((e: any) => e.node.image.url)
                });
            }
        } catch (e) {
            console.error("Failed to load product", e);
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
    if (!selectedSize) {
        alert("SELECT_SIZE_REQUIRED_//"); 
        return;
    }
    
    addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        size: selectedSize,
        quantity: 1
    });
  };

  if (loading) return <div className="min-h-screen bg-void-black flex items-center justify-center text-white font-mono">LOADING_ARTIFACT...</div>;

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
            
            {/* LEFT: IMAGE STACK (60%) */}
            <div className="w-full md:w-[60%] flex flex-col gap-4 px-0">
                {product.images.map((img, index) => (
                    <div key={index} className="w-full aspect-[4/5] bg-off-black relative overflow-hidden group">
                         <img 
                            src={img} 
                            alt={`${product.name} view ${index + 1}`} 
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-700 grayscale group-hover:grayscale-0"
                         />
                         <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-glitch">
                            IMG_0{index + 1} // RAW_DATA
                         </div>
                    </div>
                ))}
            </div>

            {/* RIGHT: DATA PANEL (40%) - STICKY */}
            <div className="w-full md:w-[40%] px-6 md:px-0 relative">
                <div className="sticky top-28 space-y-4 pb-12">
                    
                    {/* TITLE BLOCK */}
                    <div className="hidden md:block border-b border-white/20 pb-6">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-3xl font-black tracking-tighter leading-none max-w-md">
                                <DecryptedText text={product.name} speed={50} characters="X010101" />
                            </h1>
                        </div>
                        <div className="flex justify-between items-center font-mono">
                            <span className="text-xl text-white">${product.price.toFixed(2)}</span>
                            <span className="text-[10px] text-signal-red animate-pulse">
                                SYSTEM WATCH: <CountUp to={Math.floor(Math.random() * 50) + 12} duration={2} /> USERS ACTIVE
                            </span>
                        </div>
                    </div>

                    {/* SELECTORS - SMALLER KEYS */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold tracking-widest text-static-gray block mb-1">SIZE_SELECT_//</label>
                        <div className="grid grid-cols-4 gap-2">
                            {['S', 'M', 'L', 'XL'].map((size) => (
                                <button 
                                    key={size}
                                    onClick={() => setSelectedSize(size)}
                                    className={`h-10 border flex items-center justify-center font-mono text-xs transition-all duration-200 ${
                                        selectedSize === size 
                                        ? 'bg-white text-black border-white' 
                                        : 'bg-transparent text-static-gray border-white/20 hover:border-white hover:text-white'
                                    }`}
                                >
                                    [{size}]
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* ACTIONS - COMPACT */}
                    <div className="pt-2 space-y-2">
                        <Magnet strength={0.2} range={50}>
                            <button 
                                onClick={handleAddToCart}
                                className="w-full h-12 bg-signal-red text-black font-black tracking-widest text-sm hover:bg-white transition-colors duration-300 relative overflow-hidden group"
                            >
                                <span className="relative z-10 group-hover:text-black">INITIATE TRANSFER</span>
                            </button>
                        </Magnet>
                        <p className="text-[10px] text-center text-static-gray font-mono">
                            SECURE_CONNECTION_ESTABLISHED_//
                        </p>
                    </div>

                    {/* ACCORDIONS */}
                    <div className="border-t border-white/20 pt-4 space-y-0">
                         {/* DETAILS */}
                         <div className="border-b border-white/10">
                            <button 
                                onClick={() => toggleTab('details')}
                                className="w-full py-3 flex justify-between items-center text-left hover:text-cyan-glitch transition-colors"
                            >
                                <span className="font-bold tracking-widest text-xs">ARTIFACT_DETAILS</span>
                                <span className="font-mono text-sm">{activeTab === 'details' ? '-' : '+'}</span>
                            </button>
                            {activeTab === 'details' && (
                                <div className="pb-4 text-static-gray text-xs leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
                                    <p className="mb-2">{product.description}</p>
                                    <ul className="list-disc list-inside font-mono text-[10px]">
                                        {product.features.map(f => <li key={f}>{f}</li>)}
                                    </ul>
                                </div>
                            )}
                         </div>

                         {/* SIZING */}
                         <div className="border-b border-white/10">
                            <button 
                                onClick={() => toggleTab('sizing')}
                                className="w-full py-3 flex justify-between items-center text-left hover:text-cyan-glitch transition-colors"
                            >
                                <span className="font-bold tracking-widest text-xs">SIZE_GUIDE</span>
                                <span className="font-mono text-sm">{activeTab === 'sizing' ? '-' : '+'}</span>
                            </button>
                            {activeTab === 'sizing' && (
                                <div className="pb-4 text-static-gray text-xs font-mono animate-in slide-in-from-top-2 fade-in duration-300">
                                    FIT: OVERSIZED.<br/>
                                    MODEL IS 185CM WEARING SIZE L.<br/>
                                    REFERENCE: SYSTEM_STANDARD_02.
                                </div>
                            )}
                         </div>
                    </div>

                </div>
            </div>
        </div>
      </div>

       {/* MOBILE FIXED BOTTOM BAR */}
       <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
            <Magnet strength={0.2}>
                <button 
                    onClick={handleAddToCart}
                    className="w-full h-12 bg-signal-red text-black font-black tracking-widest text-xs shadow-lg shadow-signal-red/20 border border-black"
                >
                    ADD TO CART - ${product.price}
                </button>
            </Magnet>
       </div>

    </div>
  );
};

export default Product;