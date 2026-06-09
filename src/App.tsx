import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';

// Pages import
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { Categories } from './pages/Categories';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Wishlist } from './pages/Wishlist';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { OrderTracking } from './pages/OrderTracking';
import {
  AboutUs,
  Contact,
  FAQ,
  PrivacyPolicy,
  TermsConditions
} from './pages/StaticPages';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);
  return null;
};

// Toast notification display layer
const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useShop();

  return (
    <div className="fixed bottom-5 right-5 z-50 space-y-3 w-full max-w-xs sm:max-w-sm px-4 sm:px-0">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`p-4 rounded-md shadow-2xl flex items-start justify-between border transition-all duration-300 transform translate-y-0 animate-[slide-in_0.3s_ease] ${
            t.type === 'success'
              ? 'bg-zinc-950 border-emerald-500/30 text-white'
              : t.type === 'error'
              ? 'bg-zinc-950 border-red-500/30 text-white'
              : 'bg-zinc-950 border-zinc-800 text-white'
          }`}
        >
          <div className="flex-1 text-xs font-bold leading-relaxed tracking-wide pr-3">
            {t.type === 'success' && <span className="text-emerald-400 mr-1.5 font-bold">✓</span>}
            {t.type === 'error' && <span className="text-red-400 mr-1.5 font-bold">✗</span>}
            {t.type === 'info' && <span className="text-blue-400 mr-1.5 font-bold">✦</span>}
            {t.message}
          </div>
          <button
            onClick={() => removeToast(t.id)}
            className="text-zinc-500 hover:text-white font-bold text-xs shrink-0 pl-1"
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  );
};

const DashboardLayout: React.FC = () => {
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-zinc-950 selection:bg-black selection:text-white dark:selection:bg-white dark:selection:text-black">
      <Navbar onOpenCart={() => setCartDrawerOpen(true)} />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/order-tracking" element={<OrderTracking />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<TermsConditions />} />
          {/* Fallback redirect */}
          <Route path="*" element={<Home />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer isOpen={cartDrawerOpen} onClose={() => setCartDrawerOpen(false)} />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <Router>
        <ScrollToTop />
        <DashboardLayout />
      </Router>
    </ShopProvider>
  );
}
