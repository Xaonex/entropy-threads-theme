import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react'; // Basic icons

export const Navbar = () => {
  const { toggleCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: "SHOP", path: "/shop" },
    { name: "DROP_00", path: "/shop" },
    { name: "MANIFESTO", path: "/manifesto" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-void-black/80 border-b border-white/10">
      
      {/* LEFT: LOGO */}
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter text-white hover:text-cyan-glitch transition-colors">ENTROPY</Link>
      </div>
      
      {/* CENTER: DESKTOP LINKS */}
      <div className="hidden md:flex items-center space-x-8">
        {navLinks.map((link) => (
             <Link key={link.name} to={link.path} className="text-sm font-medium text-gray-400 hover:text-signal-red transition-colors">
                {link.name}
             </Link>
        ))}
      </div>

      {/* RIGHT: ACTIONS */}
      <div className="flex items-center space-x-6">
        <button className="hidden md:block text-sm font-medium text-white hover:text-cyan-glitch transition-colors">ACCOUNT</button>
        <button 
            onClick={toggleCart}
            className="text-sm font-medium text-white hover:text-cyan-glitch transition-colors"
        >
            CART [{itemCount}]
        </button>
        
        {/* MOBILE MENU TRIGGER */}
        <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-signal-red">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed inset-0 z-40 bg-void-black flex flex-col items-center justify-center space-y-8 md:hidden"
            >
                {/* Close Button Absolute */}
                <button onClick={toggleMobileMenu} className="absolute top-6 right-6 text-white hover:text-signal-red">
                    <X size={32} />
                </button>

                {navLinks.map((link, i) => (
                    <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * i }}
                    >
                        <Link 
                            to={link.path} 
                            onClick={toggleMobileMenu}
                            className="text-4xl font-mono text-white hover:text-signal-red tracking-wider font-bold"
                        >
                            {link.name}
                        </Link>
                    </motion.div>
                ))}
                 <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                >
                    <Link to="/account" onClick={toggleMobileMenu} className="text-2xl font-mono text-gray-500 hover:text-white mt-8 block">
                        ACCOUNT
                    </Link>
                </motion.div>
            </motion.div>
        )}
      </AnimatePresence>

    </nav>
  );
};