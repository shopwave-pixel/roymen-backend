import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Menu, X, ShoppingBag, Heart, Search, Moon, Sun, Globe, User } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const {
    cartCount,
    wishlist,
    language,
    setLanguage,
    darkMode,
    toggleDarkMode,
    searchQuery,
    setSearchQuery,
    getTranslatedText,
    user
  } = useShop();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchOpen(false);
    navigate(`/shop?search=${encodeURIComponent(searchQuery)}`);
  };

  const navLinks = [
    { nameEn: "Home", nameBn: "হোম", path: "/" },
    { nameEn: "Shop All", nameBn: "সব প্রোডাক্ট", path: "/shop" },
    { nameEn: "Categories", nameBn: "ক্যাটাগরি", path: "/categories" },
    { nameEn: "Track Order", nameBn: "অর্ডার ট্র্যাকিং", path: "/order-tracking" },
    { nameEn: "Contact", nameBn: "যোগাযোগ", path: "/contact" }
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-zinc-950/90 backdrop-blur-md border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Mobile Menu Icon */}
          <div className="flex items-center lg:hidden">
            <button
              id="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white"
            >
              <Menu size={24} />
            </button>
          </div>

          {/* Luxury Brand Logo */}
          <div className="flex-1 lg:flex-none text-center lg:text-left">
            <Link to="/" className="inline-block group">
              <h1 className="text-2xl sm:text-3xl font-black tracking-[0.25em] text-black dark:text-white transition-colors">
                ROYMEN
              </h1>
              <p className="text-[9px] sm:text-[10px] font-medium tracking-[0.4em] text-zinc-500 dark:text-zinc-400 text-center uppercase">
                {getTranslatedText("Wear Confidence", "নিজের উপর বিশ্বাস")}
              </p>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex space-x-8 xl:space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-sm font-medium tracking-widest uppercase text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white transition-colors py-2 relative group"
              >
                {getTranslatedText(link.nameEn, link.nameBn)}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black dark:bg-white transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Action Utilities */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Search Input Button */}
            <div className="relative">
              {searchOpen ? (
                <form onSubmit={handleSearchSubmit} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-850 rounded-full px-3 py-1.5 w-48 sm:w-64">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={getTranslatedText("Search Roymen...", "রয়মেন-এ খুঁজুন...")}
                    className="bg-transparent border-none text-xs focus:ring-0 focus:outline-none w-full text-zinc-900 dark:text-white"
                    autoFocus
                  />
                  <button type="button" onClick={() => setSearchOpen(false)} className="text-zinc-400 hover:text-black dark:hover:text-white">
                    <X size={14} />
                  </button>
                </form>
              ) : (
                <button
                  id="navbar-search-btn"
                  onClick={() => setSearchOpen(true)}
                  className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              )}
            </div>

            {/* Language Switcher */}
            <button
              id="lang-switch-btn"
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white flex items-center space-x-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors text-xs font-semibold tracking-wider uppercase"
              title={getTranslatedText("Switch to Bangla", "English-এ পরিবর্তন করুন")}
            >
              <Globe size={18} />
              <span className="hidden sm:inline">{language === 'en' ? 'EN' : 'বাং'}</span>
            </button>

            {/* Dark Mode Icon */}
            <button
              id="theme-toggle-btn"
              onClick={toggleDarkMode}
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors"
              aria-label="Toggle Theme"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              id="navbar-wishlist-link"
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative"
              aria-label="Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white">
                  {wishlist.length}
                </span>
              )}
            </Link>

            {/* User Profile / Login portal */}
            <Link
              to={user ? (user.role === 'admin' ? '/admin-dashboard' : '/dashboard') : '/login'}
              id="navbar-profile-btn"
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative flex items-center justify-center shrink-0"
              title={user ? getTranslatedText("My Account", "আমার অ্যাকাউন্ট") : getTranslatedText("Login", "লগইন")}
              aria-label="User Profile"
            >
              <User size={20} />
              {user && (
                <span className="absolute bottom-1.5 right-1.5 flex h-2 w-2 rounded-full bg-emerald-500"></span>
              )}
            </Link>

            {/* Shopping Bag Button (Cart Drawer opener) */}
            <button
              id="navbar-cart-btn"
              onClick={onOpenCart}
              className="p-2 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-colors relative"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {cartCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-black dark:bg-white text-[9px] font-black text-white dark:text-black border border-white dark:border-black">
                  {cartCount}
                </span>
              )}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          {/* Backdrop slide */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)}></div>

          <div className="fixed inset-y-0 left-0 w-full max-w-xs bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col justify-between transition-transform duration-300">
            <div>
              <div className="flex items-center justify-between pb-8 border-b border-zinc-100 dark:border-zinc-900">
                <div className="text-left">
                  <h2 className="text-xl font-black tracking-widest text-black dark:text-white">ROYMEN</h2>
                  <p className="text-[8px] font-medium tracking-widest text-zinc-400 uppercase">WEAR CONFIDENCE</p>
                </div>
                <button
                  id="close-mobile-menu-btn"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-zinc-700 dark:text-zinc-300 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-900"
                >
                  <X size={20} />
                </button>
              </div>

              <nav className="mt-8 flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-base font-medium tracking-wider text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white py-2 block border-b border-zinc-50 dark:border-zinc-900/40"
                  >
                    {getTranslatedText(link.nameEn, link.nameBn)}
                  </Link>
                ))}
                
                {/* Mobile specific account shortcut */}
                <Link
                  to={user ? (user.role === 'admin' ? '/admin-dashboard' : '/dashboard') : '/login'}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-base font-bold tracking-wider text-yellow-600 dark:text-yellow-500 py-3 block flex items-center space-x-2"
                >
                  <User size={18} />
                  <span>
                    {user
                      ? (user.role === 'admin' ? getTranslatedText("ADMIN PORTAL", "অ্যাডমিন প্যানেল") : getTranslatedText("MY DASHBOARD", "আমার ড্যাশবোর্ড"))
                      : getTranslatedText("LOGIN / REGISTER", "লগইন / রেজিস্টার")}
                  </span>
                </Link>
              </nav>
            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900 space-y-4">
              {/* Language selection info */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {getTranslatedText("Language", "ভাষা")}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setLanguage('en')}
                    className={`px-3 py-1 text-xs font-bold rounded-md ${language === 'en' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => setLanguage('bn')}
                    className={`px-3 py-1 text-xs font-bold rounded-md ${language === 'bn' ? 'bg-black text-white dark:bg-white dark:text-black' : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400'}`}
                  >
                    বাংলা
                  </button>
                </div>
              </div>

              {/* Theme status indicator */}
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-500 dark:text-zinc-400 font-medium">
                  {getTranslatedText("Theme", "থিম")}
                </span>
                <button
                  onClick={toggleDarkMode}
                  className="px-4 py-1.5 text-xs font-bold bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 rounded-md flex items-center space-x-1"
                >
                  {darkMode ? <Sun size={14} /> : <Moon size={14} />}
                  <span>{darkMode ? getTranslatedText("Light", "লাইট") : getTranslatedText("Dark", "ডার্ক")}</span>
                </button>
              </div>

              <p className="text-[10px] text-zinc-400 text-center uppercase tracking-widest pt-4">
                © {new Date().getFullYear()} Roymen Bangladesh
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
