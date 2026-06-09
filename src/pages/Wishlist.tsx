import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Heart, ArrowLeft, ShoppingBag } from 'lucide-react';

export const Wishlist: React.FC = () => {
  const { wishlist, getTranslatedText, addToCart } = useShop();

  const handleAddAllToCart = () => {
    if (wishlist.length === 0) return;
    wishlist.forEach((prod) => {
      addToCart(prod, prod.sizes[0] || 'M', prod.colors[0] || 'Default');
    } );
  };

  if (wishlist.length === 0) {
    return (
      <div className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-white min-h-screen py-20 text-center transition-colors">
        <div className="max-w-md mx-auto px-4 space-y-4">
          <Heart size={64} className="mx-auto text-zinc-300 stroke-1 animate-pulse" />
          <h2 className="text-xl font-bold uppercase tracking-widest">
            {getTranslatedText("Wishlist is Empty", "আপনার লাভ লিস্টটি খালি")}
          </h2>
          <p className="text-xs text-zinc-400 font-medium leading-relaxed">
            {getTranslatedText(
              "Bookmark premium items using heart buttons inside product cards to build your customized closet lists.",
              "আপনার প্রিয় রয়মেন ড্রেসগুলো সচল হার্ট আইকন টগল করার মাধ্যমে এখানে তালিকাভুক্ত করুন।"
            )}
          </p>
          <div className="pt-4">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-widest rounded transition-transform hover:scale-105 inline-block"
            >
              {getTranslatedText("Go To Inventory", "আজকের কালেকশনস")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Header toolbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-10 border-b border-zinc-100 dark:border-zinc-900 pb-4">
          <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-widest text-black dark:text-white">
            {getTranslatedText("Your Wishlist", "আপনার উইশলিস্ট")} ({wishlist.length})
          </h1>
          
          <div className="flex space-x-3 w-full sm:w-auto">
            <button
              onClick={handleAddAllToCart}
              className="flex-1 sm:flex-none px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-850 dark:hover:bg-zinc-250 text-xs font-black uppercase tracking-wider rounded flex items-center justify-center space-x-1"
            >
              <ShoppingBag size={14} />
              <span>{getTranslatedText("Add All to Cart", "সব কার্টে যোগ করুন")}</span>
            </button>
          </div>
        </div>

        {/* Favorite Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {wishlist.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>

        {/* Foot Back Link */}
        <div className="text-center pt-16">
          <Link
            to="/shop"
            className="text-xs text-zinc-400 hover:text-black dark:hover:text-white inline-flex items-center font-bold uppercase tracking-wider"
          >
            <ArrowLeft size={12} className="mr-1" />
            <span>{getTranslatedText("Continue Wardrobe Browsing", "মূল শপ পেইজে ফিরে যান")}</span>
          </Link>
        </div>

      </div>
    </div>
  );
};
