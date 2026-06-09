import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toggleWishlist, isInWishlist, addToCart, getTranslatedText } = useShop();
  const [hovered, setHovered] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0] || 'M');
  const [sizeSelectorOpen, setSizeSelectorOpen] = useState(false);

  const discounted = product.originalPrice && product.originalPrice > product.price;
  const discountPercent = discounted
    ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
    : 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.sizes.length > 1) {
      setSizeSelectorOpen(true);
    } else {
      addToCart(product, selectedSize, product.colors[0] || 'Default');
    }
  };

  const handleSizeConfirm = (size: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
    addToCart(product, size, product.colors[0] || 'Default');
    setSizeSelectorOpen(false);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      className="group relative flex flex-col bg-white dark:bg-zinc-950 border border-zinc-100 dark:border-zinc-900 rounded-lg overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-1.5"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setSizeSelectorOpen(false);
      }}
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] bg-zinc-50 dark:bg-zinc-900/60 overflow-hidden">
        <Link to={`/product/${product.id}`} className="block w-full h-full">
          <img
            src={(hovered && product.images[1] ? product.images[1] : product.images[0]) || null}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
        </Link>

        {/* Absolute Ribbon Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-black text-white dark:bg-white dark:text-black">
              {getTranslatedText("New", "নতুন")}
            </span>
          )}
          {product.isBestSeller && (
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-zinc-900 text-amber-400">
              {getTranslatedText("Best Seller", "সেরা")}
            </span>
          )}
          {discounted && (
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-red-600 text-white">
              {discountPercent}% OFF
            </span>
          )}
          {!product.inStock && (
            <span className="px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider bg-zinc-400 text-white dark:bg-zinc-800">
              {getTranslatedText("Sold Out", "স্টক শেষ")}
            </span>
          )}
        </div>

        {/* Absolute Functional Actions on Hover */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          {/* Wishlist button */}
          <button
            id={`wishlist-btn-${product.id}`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-2 rounded-full border shadow-sm transition-all duration-300 ${
              isInWishlist(product.id)
                ? 'bg-red-500 text-white border-red-500 hover:bg-red-600'
                : 'bg-white border-zinc-200 text-zinc-700 hover:text-black hover:border-black dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-300 dark:hover:text-white'
            }`}
            title={getTranslatedText("Toggle Wishlist", "উইশলিস্ট")}
          >
            <Heart size={16} fill={isInWishlist(product.id) ? 'currentColor' : 'none'} />
          </button>

          {/* Quick Details Eye Button */}
          <Link
            to={`/product/${product.id}`}
            className="p-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white rounded-full shadow-sm hover:border-black dark:hover:border-zinc-500 transition-all duration-300"
            title={getTranslatedText("View Details", "প্রোডাক্ট দেখুন")}
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Overlay Action Banner standard */}
        {product.inStock && (
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
            {sizeSelectorOpen ? (
              <div className="bg-white dark:bg-zinc-950 p-2 rounded shadow-lg">
                <p className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-500 dark:text-zinc-400 text-center mb-1.5">
                  {getTranslatedText("Select Size:", "সাইজ নির্বাচন করুন:")}
                </p>
                <div className="flex justify-center gap-1">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={(e) => handleSizeConfirm(sz, e)}
                      className="w-7 h-7 text-[10px] font-bold uppercase rounded border border-zinc-200 dark:border-zinc-800 hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-colors"
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <button
                id={`add-to-cart-${product.id}`}
                onClick={handleQuickAdd}
                className="w-full py-2 px-3 bg-white text-black active:bg-zinc-100 font-bold uppercase tracking-wider text-[11px] flex items-center justify-center space-x-1.5 rounded transition-transform transform translate-y-2 group-hover:translate-y-0"
              >
                <ShoppingBag size={13} />
                <span>{getTranslatedText("Quick Purchase", "কার্টে যোগ করুন")}</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Meta details */}
      <div className="p-4 flex flex-col flex-grow">
        
        {/* Category Tag */}
        <span className="text-[10px] text-zinc-400 dark:text-zinc-500 uppercase tracking-widest font-semibold">
          {product.category}
        </span>

        {/* Product Title */}
        <Link to={`/product/${product.id}`} className="mt-1 flex-grow">
          <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 group-hover:text-amber-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>

        {/* Star Rating Info */}
        <div className="flex items-center space-x-1 mt-1.5">
          <div className="flex items-center text-amber-400">
            <Star size={11} fill="currentColor" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 dark:text-zinc-400 mt-0.5">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price Tag values */}
        <div className="flex items-baseline space-x-2 mt-2">
          <span className="text-sm font-black text-black dark:text-white">
            ৳{product.price.toLocaleString()}
          </span>
          {discounted && (
            <span className="text-xs text-zinc-400 line-through">
              ৳{product.originalPrice?.toLocaleString()}
            </span>
          )}
        </div>

      </div>
    </div>
  );
};
