import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DecryptedText from '../components/react-bits/DecryptedText';
import { Magnet } from '../components/react-bits/Magnet';
import FitGuideModal from '../components/ui/FitGuideModal';
import CountUp from '../components/react-bits/CountUp';
import CycleCounter from '../components/ui/CycleCounter';
import { useCart } from '../context/CartContext';
import { shopifyFetch, PRODUCT_BY_HANDLE_QUERY, PRODUCTS_QUERY } from '../lib/shopify';

interface ProductData {
  id: string;
  handle: string;
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
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"details" | "sizing" | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isFitGuideOpen, setIsFitGuideOpen] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    async function loadData() {
        if (!id) return;

        try {
            // Load Main Product
            const data: any = await shopifyFetch({
                query: PRODUCT_BY_HANDLE_QUERY,
                variables: { handle: id }
            });
            
            if (data && data.product) {
                const p = data.product;
                const currentId = p.id;
                
                setProduct({
                    id: p.id,
                    handle: id, // store handle for exclusion if needed, though ID is better
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

                // Load Related Products (Simple: Fetch 4, exclude current)
                const relatedData: any = await shopifyFetch({
                    query: PRODUCTS_QUERY,
                    variables: { first: 4 }
                });
                if (relatedData && relatedData.products) {
                     const others = relatedData.products.edges
                        .map((e: any) => e.node)
                        .filter((p: any) => p.id !== currentId) // Exclude current
                        .slice(0, 3); // Take top 3
                     
                     setRelatedProducts(others.map((p: any) => ({
                        id: p.id,
                        handle: p.handle,
                        title: p.title,
                        price: parseFloat(p.priceRange.minVariantPrice.amount),
                        image: p.images.edges[0]?.node.url || "",
                        available: p.availableForSale
                     })));
                }

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

  const formatDescription = (text: string) => {
    if (!text) return null;
    
    // INJECT NEWLINES TO BREAK THE BLOB
    let cleanText = text
        .replace(/ \/\/ /g, '\n// ')        // System messages (space before //)
        .replace(/ \+ /g, '\n+ ')           // Bullets (space before +)
        .replace(/The Specs:/g, '\n\nThe Specs:') // Header
        .replace(/ \/\/ WARNING:/g, '\n// WARNING:') // Warnings
        // Catch-all for spaced out + if needed, ensuring we don't duplicate
        .replace(/(?<!\n)\+ /g, '\n+ ');

    const lines = cleanText.split('\n').filter(line => line.trim() !== '');
    const elements = [];
    
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        
        // Stop condition for raw data
        if (line.includes("Width, cm") || line.includes("Size tolerance") || line.includes("Size Guide")) {
            break;
        }

        if (line.startsWith("//")) {
            elements.push(<p key={i} className="font-mono text-signal-red text-xs mb-2 tracking-widest">{line}</p>);
        } else if (line.startsWith("+")) {
            elements.push(<li key={i} className="text-static-gray text-xs ml-4 list-disc mb-1 font-mono">{line.replace(/^\+\s*/, '')}</li>);
        } else if (line.toLowerCase().startsWith("the specs:")) {
             elements.push(<h4 key={i} className="font-bold text-white text-xs mt-4 mb-2 uppercase">{line}</h4>);
        } else {
             // Standard paragraph
             elements.push(<p key={i} className="mb-4 text-gray-300 text-xs leading-relaxed font-mono">{line}</p>);
        }
    }
    
    return <div className="space-y-1">{elements}</div>;
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

      <div className="container mx-auto px-0 md:px-6 pb-24"> 
        {/* MAIN PRODUCT LAYOUT */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 mb-24">
            {/* LEFT: IMAGE GALLERY */}
            <div className="w-full md:w-[60%] flex flex-col px-0">
                {/* GALLERY WRAPPER - MAX WIDTH 500PX CENTERED */}
                <div className="w-full max-w-[500px] mx-auto">
                    {/* Main View */}
                    <div className="w-full aspect-[4/5] bg-off-black relative overflow-hidden group border border-white/5">
                        <img 
                            src={selectedImage || product.images[0]} 
                            alt={product.name} 
                            className="w-full h-full object-cover transition-all duration-500"
                        />
                        <div className="absolute bottom-4 left-4 text-xs font-mono text-cyan-glitch">
                            IMG_VIEWER // {product.images.indexOf(selectedImage || product.images[0]) + 1}
                        </div>
                    </div>
                    
                    {/* Thumbnails (Compact) */}
                    <div className="flex gap-4 mt-6 overflow-x-auto pb-2 scrollbar-hide px-4 md:px-0">
                        {product.images.map((img, index) => (
                            <button 
                                key={index}
                                onClick={() => setSelectedImage(img)}
                                className={`h-20 w-auto aspect-[3/4] shrink-0 bg-off-black border transition-all ${
                                    (selectedImage || product.images[0]) === img 
                                    ? 'border-signal-red opacity-100' 
                                    : 'border-white/10 opacity-50 hover:opacity-80'
                                }`}
                            >
                                <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* RIGHT: DATA PANEL */}
            <div className="w-full md:w-[40%] px-6 md:px-0 relative">
                <div className="sticky top-28 space-y-8 pb-12">
                    <div className="hidden md:block border-b border-white/20 pb-6">
                        <div className="flex justify-between items-start mb-2">
                            <h1 className="text-3xl font-black tracking-tighter leading-none max-w-md">
                                <DecryptedText text={product.name} speed={50} characters="X010101" />
                            </h1>
                        </div>
                        <div className="flex justify-between items-center font-mono">
                            <div className="flex items-center gap-3">
                                <span className="text-xl text-white">${product.price.toFixed(2)}</span>
                                <span className="text-[9px] bg-white/10 px-2 py-1 rounded text-gray-300 font-mono tracking-wide">[ FIT: BOXY_OVERSIZED ]</span>
                            </div>
                            <span className="text-[10px] text-signal-red animate-pulse">SYSTEM WATCH: <CountUp to={Math.floor(Math.random() * 50) + 12} duration={2} /> USERS ACTIVE</span>
                        </div>
                    </div>

                    {/* DYNAMIC VARIANTS SELECTOR */}
                    <div className="space-y-3">
                        <div className="flex justify-between items-center mb-1">
                            <label className="text-[10px] font-bold tracking-widest text-static-gray">VARIANT_SELECT_//</label>
                            <button onClick={() => setIsFitGuideOpen(true)} className="text-[10px] text-cyan-glitch hover:underline font-mono">[ VIEW_BLUEPRINTS ]</button>
                        </div>
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

                    <CycleCounter />`r`n                    <div className="pt-2 space-y-3">
                        <Magnet strength={0.2} range={50}>
                            <button onClick={handleAddToCart} className="w-full h-12 bg-signal-red text-black font-black tracking-widest text-sm hover:bg-white transition-colors duration-300 relative overflow-hidden group">
                                <span className="relative z-10 group-hover:text-black">INITIATE TRANSFER</span>
                            </button>
                        </Magnet>
                        <p className="text-[10px] text-center text-signal-red font-mono mt-2 tracking-widest border border-white/10 py-1 bg-white/5">[ MADE_ON_DEMAND // MINIMIZING_ENTROPY ]</p>
                    </div>

                    <div className="border-t border-white/20 pt-6 space-y-0">
                         <div className="border-b border-white/10">
                            <button onClick={() => toggleTab('details')} className="w-full py-3 flex justify-between items-center text-left hover:text-cyan-glitch transition-colors">
                                <span className="font-bold tracking-widest text-xs">ARTIFACT_DETAILS</span>
                                <span className="font-mono text-sm">{activeTab === 'details' ? '-' : '+'}</span>
                            </button>
                            {activeTab === 'details' && (
                                <div className="pb-4 text-static-gray text-xs leading-relaxed animate-in slide-in-from-top-2 fade-in duration-300">
                                    {formatDescription(product.description)}
                                    <ul className="list-disc list-inside font-mono text-[10px] mt-2 text-gray-500">{product.features.map(f => <li key={f}>{f}</li>)}</ul>
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

        {/* RELATED ARTIFACTS SECTION */}
        {relatedProducts.length > 0 && (
            <div className="border-t border-white/10 pt-12 px-6 md:px-0">
                <h3 className="text-xl font-black mb-8 tracking-tighter">
                    <span className="text-signal-red">//</span> SYSTEM_RECOMMENDS
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                    {relatedProducts.map((p, i) => (
                        <Link key={p.id} to={`/product/${p.handle}`} className="block group relative">
                            <div className="aspect-[4/5] bg-off-black overflow-hidden relative border border-white/5 group-hover:border-white/20 transition-all">
                                <div className="absolute inset-0 flex items-center justify-center text-static-gray opacity-20 text-4xl font-black rotate-45">
                                    IMG_{String(i + 1).padStart(2, '0')}
                                </div>
                                {!p.available ? (
                                    <div className="absolute top-2 left-2 border border-signal-red text-signal-red text-[9px] px-1.5 py-0.5 font-bold tracking-widest bg-black/50 backdrop-blur-md">SOLD OUT</div>
                                ) : (
                                    <div className="absolute top-2 left-2 border border-cyan-glitch text-cyan-glitch text-[9px] px-1.5 py-0.5 font-bold tracking-widest bg-black/50 backdrop-blur-md">NEW</div>
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
            </div>
        )}

      </div>
       <div className="md:hidden fixed bottom-6 left-6 right-6 z-50">
            <Magnet strength={0.2}>
                <button onClick={handleAddToCart} className="w-full h-12 bg-signal-red text-black font-black tracking-widest text-xs shadow-lg shadow-signal-red/20 border border-black">ADD TO CART - ${product.price}</button>
            </Magnet>
       </div>
       <FitGuideModal isOpen={isFitGuideOpen} onClose={() => setIsFitGuideOpen(false)} />
    </div>
  );
};

export default Product;


