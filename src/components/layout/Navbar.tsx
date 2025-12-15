import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export const Navbar = () => {
  const { toggleCart, itemCount } = useCart();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-void-black/80 border-b border-white/10">
      <div className="flex items-center">
        <Link to="/" className="text-xl font-bold tracking-tighter text-white hover:text-cyan-glitch transition-colors">ENTROPY</Link>
      </div>
      
      <div className="hidden md:flex items-center space-x-8">
        <Link to="/shop" className="text-sm font-medium text-gray-400 hover:text-signal-red transition-colors">SHOP</Link>
        <Link to="/shop" className="text-sm font-medium text-gray-400 hover:text-signal-red transition-colors">DROP_00</Link>
        <Link to="/manifesto" className="text-sm font-medium text-gray-400 hover:text-signal-red transition-colors">MANIFESTO</Link>
      </div>

      <div className="flex items-center space-x-6">
        <button className="text-sm font-medium text-white hover:text-cyan-glitch transition-colors">ACCOUNT</button>
        <button 
            onClick={toggleCart}
            className="text-sm font-medium text-white hover:text-cyan-glitch transition-colors"
        >
            CART [{itemCount}]
        </button>
      </div>
    </nav>
  );
};