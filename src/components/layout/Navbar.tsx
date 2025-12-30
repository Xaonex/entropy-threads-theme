import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const { toggleCart, itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  const navLinks = [
    { name: "SHOP", path: "/shop", children: [{ name: "DROP_00", path: "/shop" }] },
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
            <div key={link.name} className="relative group">
                <Link to={link.path} className="text-sm font-medium text-gray-400 hover:text-signal-red transition-colors flex items-center gap-1">
                    {link.name}
                    {link.children && <span className="text-[10px] opacity-50">▼</span>}
                </Link>
                
                {link.children && (
                    <div className="absolute top-full left-0 mt-2 w-48 bg-void-black border border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl shadow-black">
                        {link.children.map(child => (
                            <Link key={child.name} to={child.path} className="block px-4 py-3 text-xs font-mono text-static-gray hover:text-white hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                                {child.name}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
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
        <button onClick={toggleMobileMenu} className="md:hidden text-white hover:text-signal-red z-[70] relative">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-[60] bg-black flex flex-col items-center justify-center space-y-8 md:hidden h-screen w-screen"
            >
                {navLinks.map((link, i) => (
                    <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 + (0.1 * i) }}
                        className="text-center"
                    >
                        <Link 
                            to={link.path} 
                            onClick={toggleMobileMenu}
                            className="text-4xl font-mono text-white hover:text-signal-red tracking-wider font-bold"
                        >
                            {link.name}
                        </Link>
                        {/* Mobile Submenu (Simple Render) */}
                        {link.children && (
                            <div className="mt-4 flex flex-col gap-2">
                                {link.children.map(child => (
                                    <Link key={child.name} to={child.path} onClick={toggleMobileMenu} className="text-xl text-static-gray hover:text-white">
                                        - {child.name} -
                                    </Link>
                                ))}
                            </div>
                        )}
                    </motion.div>
                ))}
                 <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
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