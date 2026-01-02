import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { CartProvider } from './context/CartContext';
import { CartDrawer } from './components/cart/CartDrawer';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { Loading } from './components/ui/Loading';

// Lazy Load Pages to reduce initial bundle size
const Home = lazy(() => import('./pages/Home'));
const Shop = lazy(() => import('./pages/Shop'));
const Product = lazy(() => import('./pages/Product'));
const Manifesto = lazy(() => import('./pages/Manifesto'));
const Protocols = lazy(() => import('./pages/Protocols'));

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
            {/* Suspense wrapper handles loading states for lazy routes */}
            <Suspense fallback={<Loading />}>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<Product />} />
                  <Route path="/manifesto" element={<Manifesto />} />
                  <Route path="/protocols" element={<Protocols />} />
              </Routes>
            </Suspense>
          </main>

          <Footer />
          <SpeedInsights />
          <Analytics />
        </div>
      </CartProvider>
    </Router>
  );
}

export default App;

