import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { X, Plus, Minus } from 'lucide-react';
import { Magnet } from '../react-bits/Magnet';
import { shopifyFetch, CHECKOUT_CREATE_MUTATION } from '../../lib/shopify';

const FREE_SHIPPING_THRESHOLD = 150;

export const CartDrawer = () => {
  const { isCartOpen, toggleCart, cartItems, removeFromCart, addToCart, cartTotal, itemCount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  
  const progress = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const isFreeShipping = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const totalSegments = 20;
  const filledSegments = Math.floor((progress / 100) * totalSegments);

  const handleCheckout = async () => {
    setIsCheckingOut(true);
    try {
        const lineItems = cartItems.map(item => ({
            variantId: item.variantId,
            quantity: item.quantity
        }));

        const data: any = await shopifyFetch({
            query: CHECKOUT_CREATE_MUTATION,
            variables: { input: { lineItems } }
        });

        if (data && data.checkoutCreate && data.checkoutCreate.checkout) {
            window.location.href = data.checkoutCreate.checkout.webUrl;
        } else {
             console.error("Checkout Errors:", data?.checkoutCreate?.checkoutUserErrors);
             alert("SYSTEM_ERROR // CHECKOUT_INITIATION_FAILED");
        }
    } catch (e) {
        console.error("Checkout Exception", e);
        alert("CONNECTION_LOST // UNABLE_TO_TRANSMIT");
    } finally {
        setIsCheckingOut(false);
    }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 20, stiffness: 100 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-void-black border-l border-white/10 z-[100] flex flex-col shadow-2xl shadow-black"
          >
            {/* HEADER */}
            <div className="p-6 border-b border-white/10 flex justify-between items-center bg-off-black">
                <div>
                    <h2 className="text-xl font-black tracking-tighter text-white">
                        MANIFEST // <span className="text-signal-red">[{itemCount.toString().padStart(2, '0')}]</span>
                    </h2>
                    <p className="text-[10px] text-static-gray font-mono tracking-widest mt-1">
                        INVENTORY_LIST_V.1.0
                    </p>
                </div>
                <button 
                    onClick={toggleCart}
                    className="p-2 hover:bg-white/10 transition-colors rounded-full"
                >
                    <X size={24} className="text-white" />
                </button>
            </div>

            {/* SIGNAL BOOST BAR */}
            <div className="px-6 py-4 border-b border-white/10 bg-black/50">
                <div className="flex justify-between items-end mb-2 font-mono text-[10px] text-static-gray">
                    <span>SIGNAL_STRENGTH</span>
                    <span className={isFreeShipping ? "text-cyan-glitch animate-pulse" : ""}>
                        {isFreeShipping ? "MAXIMUM // FREE SHIPPING UNLOCKED" : `${Math.floor(progress)}%`}
                    </span>
                </div>
                <div className="flex gap-[2px] h-2 w-full">
                    {Array.from({ length: totalSegments }).map((_, i) => (
                        <div 
                            key={i}
                            className={`flex-1 h-full transition-all duration-300 ${
                                i < filledSegments 
                                    ? (isFreeShipping ? "bg-cyan-glitch shadow-[0_0_5px_rgba(0,255,255,0.5)]" : "bg-signal-red") 
                                    : "bg-white/10"
                            }`}
                        />
                    ))}
                </div>
            </div>

            {/* CART ITEMS */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {cartItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                        <div className="text-6xl font-black text-white/5">NULL</div>
                        <p className="font-mono text-sm text-static-gray">NO ARTIFACTS DETECTED.</p>
                        <button 
                            onClick={toggleCart}
                            className="text-xs border border-white/20 px-4 py-2 hover:bg-white hover:text-black transition-colors font-mono"
                        >
                            RETURN TO VOID
                        </button>
                    </div>
                ) : (
                    cartItems.map((item) => (
                        <div key={`${item.id}-${item.size}`} className="flex gap-4 group">
                            <div className="w-20 h-24 bg-off-black border border-white/10 overflow-hidden relative shrink-0">
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="flex-1 flex flex-col justify-between py-1">
                                <div>
                                    <h3 className="font-bold text-sm text-white leading-tight">{item.name}</h3>
                                    <p className="font-mono text-xs text-static-gray mt-1">SIZE: [{item.size}]</p>
                                </div>
                                <div className="flex justify-between items-end">
                                    <div className="flex items-center gap-3 font-mono text-xs border border-white/10 px-2 py-1">
                                        <button 
                                            onClick={() => item.quantity > 1 ? addToCart({...item, quantity: -1}) : removeFromCart(item.id, item.size)}
                                            className="hover:text-signal-red"
                                        >
                                            <Minus size={10} />
                                        </button>
                                        <span className="w-4 text-center">{item.quantity}</span>
                                        <button 
                                            onClick={() => addToCart({...item, quantity: 1})}
                                            className="hover:text-cyan-glitch"
                                        >
                                            <Plus size={10} />
                                        </button>
                                    </div>
                                    <div className="font-mono text-sm text-white">
                                        ${(item.price * item.quantity).toFixed(2)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* FOOTER */}
            {cartItems.length > 0 && (
                <div className="border-t border-white/10 p-6 bg-off-black space-y-4">
                    <div className="flex justify-between items-center font-mono text-sm">
                        <span className="text-static-gray">TOTAL_VALUE</span>
                        <span className="text-xl font-bold text-white">${cartTotal.toFixed(2)}</span>
                    </div>
                    
                    <Magnet strength={0.2} range={100}>
                        <button 
                            onClick={handleCheckout}
                            disabled={isCheckingOut}
                            className={`w-full py-4 font-black tracking-[0.2em] transition-all relative overflow-hidden ${
                                isCheckingOut ? "bg-white/10 text-white cursor-wait" : "bg-white text-black hover:bg-cyan-glitch"
                            }`}
                        >
                            {isCheckingOut ? (
                                <span className="animate-pulse">ESTABLISHING_UPLINK...</span>
                            ) : (
                                "TRANSMIT ORDER"
                            )}
                        </button>
                    </Magnet>
                    
                    <p className="text-[10px] text-center text-white/20 font-mono">
                        SECURE_ENCRYPTION_ACTIVE_//
                    </p>
                </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};