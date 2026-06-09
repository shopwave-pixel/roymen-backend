import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    getTranslatedText,
    addToast
  } = useShop();

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const navigate = useNavigate();

  if (!isOpen) return null;

  const subtotal = cart.reduce((total, item) => {
    if (!item?.product) return total;
    return total + item.product.price * item.quantity;
  }, 0);
  const freeShippingThreshold = 5000;
  const deliveryFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 120;
  const discountAmount = Math.round(subtotal * (discountPercent / 100));
  const finalTotal = subtotal + deliveryFee - discountAmount;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedCode = promoCode.trim().toUpperCase();
    if (formattedCode === 'ROYMEN10') {
      setDiscountPercent(10);
      addToast(getTranslatedText("10% Discount applied successfully!", "১০% ছাড় সফলভাবে প্রযোজ্য হয়েছে!"), "success");
    } else if (formattedCode === 'WELCOME15') {
      setDiscountPercent(15);
      addToast(getTranslatedText("15% Welcome discount applied!", "১৫% ওয়েলকাম ডিসকাউন্ট প্রযোজ্য হয়েছে!"), "success");
    } else {
      addToast(getTranslatedText("Invalid coupon code", "অকার্যকর কুপন কোড"), "error");
    }
    setPromoCode('');
  };

  const handleCheckoutRedirect = () => {
    onClose();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true">
      {/* Background slide */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={onClose}></div>

      {/* Panel container */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white dark:bg-zinc-950 shadow-2xl flex flex-col h-full transition-colors duration-300">
          
          {/* Header section */}
          <div className="px-6 py-5 border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
            <h2 className="text-lg font-black tracking-widest text-zinc-950 dark:text-white uppercase flex items-center">
              <ShoppingBag className="mr-2" size={20} />
              <span>{getTranslatedText("Your Bag", "কার্ট ব্যাগ")} ({cart.length})</span>
            </h2>
            <button
              id="close-cart-btn"
              onClick={onClose}
              className="p-2 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white rounded-full bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Cart progress banner (Free shipping tracker inside BD) */}
          {subtotal > 0 && (
            <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150 dark:border-zinc-850 px-6 py-3.5 text-xs">
              {subtotal >= freeShippingThreshold ? (
                <p className="text-emerald-600 dark:text-emerald-400 font-bold tracking-wide text-center">
                  ✨ {getTranslatedText("Congratulations! Your order qualifies for FREE delivery inside Bangladesh.", "অভিনন্দন! আপনি বাংলাদেশে সম্পূর্ণ ফ্রি ডেলিভারি পাচ্ছেন।")}
                </p>
              ) : (
                <p className="text-zinc-600 dark:text-zinc-400 text-center font-medium">
                  {getTranslatedText("Add ", "আর মাত্র ")}
                  <span className="font-bold text-black dark:text-white">৳{(freeShippingThreshold - subtotal).toLocaleString()}</span>
                  {getTranslatedText(" more to unlock FREE shipping inside Bangladesh!", " মূল্যের প্রোডাক্ট যোগ করে ফ্রি ডেলিভারি উপভোগ করুন!")}
                </p>
              )}
              {/* Progress Bar slider */}
              <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
                <div
                  className="bg-black dark:bg-white h-full transition-all duration-500"
                  style={{ width: `${Math.min((subtotal / freeShippingThreshold) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Cart Item rows list */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            {cart.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full py-12 text-center text-zinc-400 dark:text-zinc-500">
                <ShoppingBag size={64} className="mb-4 stroke-1 animate-bounce" />
                <h3 className="font-bold text-zinc-800 dark:text-zinc-200 text-lg">
                  {getTranslatedText("Bag is Empty", "কার্ট খালি রয়েছে")}
                </h3>
                <p className="text-xs mt-1 max-w-xs">
                  {getTranslatedText(
                    "You haven't added any ROYMEN menswear yet. Go to shop to discover quiet luxury styles.",
                    "আপনি এখনো রয়মেন-এর চমৎকার কালেকশন থেকে ড্রেস পছন্দ করেন নি। ঘুরে আসুন আমাদের শপ পেইজ।"
                  )}
                </p>
                <button
                  onClick={() => {
                    onClose();
                    navigate('/shop');
                  }}
                  className="mt-6 px-6 py-3 bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded-sm text-xs font-black uppercase tracking-widest transition-transform hover:scale-105"
                >
                  {getTranslatedText("Discover Collections", "কালেকশন সমূহ")}
                </button>
              </div>
            ) : (
              cart.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                  className="flex items-start pb-4 border-b border-zinc-100 dark:border-zinc-900 last:border-0"
                >
                  {/* Thumb image */}
                  <img
                    src={item.product.images[0] || null}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-20 aspect-[3/4] object-cover bg-zinc-100 rounded-md shrink-0"
                  />

                  {/* Descriptions block */}
                  <div className="ml-4 flex-1">
                    <h3 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">
                      {item.product.name}
                    </h3>
                    <div className="flex items-center space-x-2 text-[10px] text-zinc-400 font-mono mt-0.5">
                      <span>{getTranslatedText("Size:", "সাইজ:")} <span className="text-zinc-700 dark:text-zinc-200 font-bold">{item.selectedSize}</span></span>
                      <span>•</span>
                      <span>{getTranslatedText("Color:", "রঙ:")} <span className="text-zinc-700 dark:text-zinc-200 font-bold">{item.selectedColor}</span></span>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Counter selectors */}
                      <div className="flex items-center border border-zinc-200 dark:border-zinc-850 rounded">
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity - 1)}
                          className="p-1 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                        >
                          <Minus size={12} />
                        </button>
                        <span className="px-2 text-xs font-bold font-mono text-zinc-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.product.id, item.selectedSize, item.selectedColor, item.quantity + 1)}
                          className="p-1 px-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                        >
                          <Plus size={12} />
                        </button>
                      </div>

                      {/* Display Row Pricing */}
                      <div className="text-right">
                        <p className="text-sm font-black text-black dark:text-white">
                          ৳{(item.product.price * item.quantity).toLocaleString()}
                        </p>
                        <button
                          onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                          className="text-[10px] text-red-500 hover:text-red-700 font-bold mt-1 inline-flex items-center"
                          title="Remove item"
                        >
                          <Trash2 size={11} className="mr-0.5" />
                          <span>{getTranslatedText("Remove", "বাতিল")}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Summary / Promo inputs code */}
          {cart.length > 0 && (
            <div className="px-6 py-5 border-t border-zinc-100 dark:border-zinc-900 space-y-4 bg-zinc-50/50 dark:bg-zinc-950">
              
              {/* Promo input field */}
              <form onSubmit={handleApplyPromo} className="flex space-x-2">
                <input
                  type="text"
                  placeholder={getTranslatedText("Enter ROYMEN10", "কুপন কোড (যেমন: ROYMEN10)")}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded px-3 py-1.5 text-xs w-full focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded shrink-0"
                >
                  {getTranslatedText("Apply", "প্রয়োগ করুন")}
                </button>
              </form>

              {/* Pricing Line items */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between">
                  <span className="text-zinc-500">{getTranslatedText("Subtotal", "মোট মূল্য")}</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">৳{subtotal.toLocaleString()}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>{getTranslatedText("Voucher Discount", "ডিসকাউন্ট")} ({discountPercent}%)</span>
                    <span>-৳{discountAmount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-zinc-500">{getTranslatedText("Delivery (Inside BD)", "হোম ডেলিভারি")}</span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">
                    {deliveryFee === 0 ? getTranslatedText("FREE", "ফ্রি") : `৳${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-black border-t border-zinc-150 dark:border-zinc-850 pt-2 text-black dark:text-white">
                  <span>{getTranslatedText("Total Cost", "সর্বমোট বিল")}</span>
                  <span className="text-base font-black">৳{finalTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout actions */}
              <button
                id="checkout-bag-btn"
                onClick={handleCheckoutRedirect}
                className="w-full py-4 px-4 bg-black text-white dark:bg-white dark:text-black hover:bg-zinc-900 dark:hover:bg-zinc-100 text-xs font-black uppercase tracking-[0.2em] flex items-center justify-center space-x-1.5 rounded transition-transform transform active:scale-95"
              >
                <span>{getTranslatedText("Proceed to checkout", "চেকআউট-এ এগিয়ে যান")}</span>
                <ArrowRight size={14} className="animate-pulse" />
              </button>

              <p className="text-[10px] text-zinc-400 text-center tracking-wide">
                🔐 {getTranslatedText("100% Secure SSL encrypted gateway inside Bangladesh", "বাংলাদেশে ১০০% নিরাপদ ও এনক্রিপ্টেড পেমেন্ট প্রসেসিং")}
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
