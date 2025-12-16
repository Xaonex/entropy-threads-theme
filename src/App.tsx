import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import Home from './pages/Home';
import Shop from './pages/Shop';
import Product from './pages/Product';
import Manifesto from './pages/Manifesto';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="relative w-full min-h-screen bg-void-black text-white font-sans selection:bg-signal-red selection:text-white">
          
          {/* GLOBAL FILM GRAIN OVERLAY */}
          <div className="fixed inset-0 z-[100] pointer-events-none opacity-[0.04] noise-overlay mix-blend-overlay"></div>
          
          <Navbar />
          <CartDrawer />
          
          <main>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/product/:id" element={<Product />} />
                <Route path="/manifesto" element={<Manifesto />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;