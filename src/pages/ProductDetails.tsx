import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { products, sampleReviews } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, Review } from '../types';
import { Star, Heart, ShoppingBag, Truck, Undo, ShieldAlert, Check, Plus, Minus } from 'lucide-react';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, toggleWishlist, isInWishlist, getTranslatedText, addToast } = useShop();

  const product = useMemo(() => products.find((p) => p.id === id), [id]);

  const [activeImage, setActiveImage] = useState<string>(
    products.find((p) => p.id === id)?.images[0] || ''
  );
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'shipping' | 'care'>('details');

  // Customer synthetic reviews state
  const [reviews, setReviews] = useState<Review[]>([]);
  const [userComment, setUserComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (product) {
      setActiveImage(product.images[0]);
      setSelectedSize(product.sizes[0] || 'M');
      setSelectedColor(product.colors[0] || 'Default');
      setQuantity(1);

      // Load sample reviews
      const baseReviews = sampleReviews[product.id] || [];
      setReviews(baseReviews);
    }
    window.scrollTo(0, 0);
  }, [product]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-black uppercase text-zinc-800 dark:text-zinc-200">
          {getTranslatedText("Model Not Found", "পোশাকটি পাওয়া যায়নি")}
        </h2>
        <p className="text-xs text-zinc-500">
          {getTranslatedText("The product might be out of seasonal stock or renamed.", "আপনার খোঁজা কালেকশনটি সম্ভবত শেষ হয়ে গেছে।")}
        </p>
        <Link
          to="/shop"
          className="px-6 py-3 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-xs tracking-widest inline-block"
        >
          {getTranslatedText("Return to Shop", "শপে ফিরে যান")}
        </Link>
      </div>
    );
  }

  // Calculate discount specs
  const discounted = product.originalPrice && product.originalPrice > product.price;

  // Filter related products
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Submit dynamic user reviews
  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim() || !userComment.trim()) {
      addToast(getTranslatedText("Please fill out review form completely", "রিভিউ লেখার জন্য অনুগ্রহ করে ফরমটি পূরণ করুন"), "error");
      return;
    }

    const newRev: Review = {
      id: Math.random().toString(),
      userName: userName.trim(),
      rating: userRating,
      date: new Date().toISOString().split('T')[0],
      comment: userComment.trim(),
      verified: true
    };

    setReviews([newRev, ...reviews]);
    addToast(getTranslatedText("Thank you for writing a review!", "রিভিউ দেওয়ার জন্য অসংখ্য ধন্যবাদ!"), "success");
    setUserName('');
    setUserComment('');
    setUserRating(5);
  };

  const handleAddToBag = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-16 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {/* Simple breadcrumbs */}
        <div className="text-xs text-zinc-400 uppercase tracking-wider mb-6 flex space-x-1">
          <Link to="/" className="hover:text-black dark:hover:text-white transition-colors">{getTranslatedText("Home", "হোম")}</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-black dark:hover:text-white transition-colors">{getTranslatedText("Shop", "শপ")}</Link>
          <span>/</span>
          <span className="text-zinc-650 font-bold">{product.name}</span>
        </div>

        {/* 1. Main Viewport Details Splitter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Gallery Segment (lg: col 7) */}
          <div className="lg:col-span-7 flex flex-col md:flex-row-reverse gap-4">
            
            {/* Primary active preview */}
            <div className="flex-1 aspect-[3/4] bg-zinc-50 dark:bg-zinc-900 rounded-lg overflow-hidden border border-zinc-100 dark:border-zinc-900 relative">
              <img
                src={activeImage || null}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              {/* Badging displays */}
              {product.isNew && (
                <span className="absolute top-4 left-4 px-3 py-1 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-[10px] tracking-widest">
                  {getTranslatedText("New Thread", "নতুন ডিজাইন")}
                </span>
              )}
            </div>

            {/* Selector thumbs scroll */}
            <div className="flex md:flex-col gap-3 shrink-0 overflow-x-auto md:overflow-y-auto max-w-full md:w-20 justify-start">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 md:w-full aspect-[3/4] rounded-md overflow-hidden bg-zinc-100 dark:bg-zinc-900 border transition-all ${
                    activeImage === img
                      ? 'border-black dark:border-white ring-2 ring-zinc-100 dark:ring-zinc-900'
                      : 'border-zinc-200 dark:border-zinc-850 opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img || null} alt="" referrerPolicy="no-referrer" className="w-full h-full object-cover object-center animate-fade-in" />
                </button>
              ))}
            </div>

          </div>

          {/* Checkout & Meta Details segment (lg: col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-6">
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-extrabold text-zinc-400 dark:text-zinc-500">
                {product.category}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-black dark:text-white uppercase tracking-wider">
                {product.name}
              </h1>
              <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">
                SKU: {product.sku}
              </p>
            </div>

            {/* Ratings summary banner */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center text-amber-400">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={15}
                    fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                    className="mr-0.5"
                  />
                ))}
              </div>
              <span className="text-xs text-zinc-650 font-bold font-mono">
                {product.rating} / 5.0
              </span>
              <span className="text-zinc-300">•</span>
              <span className="text-xs text-zinc-450">
                {reviews.length} {getTranslatedText("Customer Reviews", "গ্রাহক মতামত")}
              </span>
            </div>

            {/* Luxury Price Tag */}
            <div className="py-4 border-t border-b border-zinc-100 dark:border-zinc-900 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-400 mb-1">{getTranslatedText("Price inside BD:", "সর্বমোট মূল্য:")}</p>
                <div className="flex items-baseline space-x-3">
                  <span className="text-2xl sm:text-3xl font-black text-black dark:text-white">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {discounted && (
                    <span className="text-sm text-zinc-400 line-through">
                      ৳{product.originalPrice?.toLocaleString()}
                    </span>
                  )}
                </div>
              </div>

              {discounted && (
                <div className="bg-red-500 text-white font-bold py-1 px-3 rounded text-xs select-none">
                  {getTranslatedText("Save", "সেভ করুন")} ৳{(product.originalPrice! - product.price).toLocaleString()}
                </div>
              )}
            </div>

            {/* Product short description */}
            <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Interactive Color selection */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-widest font-extrabold text-zinc-500">
                {getTranslatedText("Select Shade:", "কালার শেড নির্বাচন:")} <span className="text-black dark:text-white ml-1">{selectedColor}</span>
              </p>
              <div className="flex gap-2">
                {product.colors.map((col) => (
                  <button
                    key={col}
                    onClick={() => setSelectedColor(col)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded border transition-colors ${
                      selectedColor === col
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-650'
                    }`}
                  >
                    {col}
                  </button>
                ))}
              </div>
            </div>

            {/* Interactive Size selectors */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] uppercase tracking-widest font-extrabold text-zinc-500">
                <span>{getTranslatedText("Select Fit Size:", "মাপ নির্বাচন করুন:")} <span className="text-black dark:text-white ml-1">{selectedSize}</span></span>
                <span className="text-[10px] text-zinc-400 hover:underline cursor-help">
                  {getTranslatedText("Model Size Guide", "মাপের বিবরণ")}
                </span>
              </div>
              <div className="flex gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`w-9 h-9 text-xs font-bold uppercase border rounded transition-colors ${
                      selectedSize === sz
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-650'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity selections */}
            <div className="space-y-2">
              <p className="text-[11px] uppercase tracking-widest font-extrabold text-zinc-500">
                {getTranslatedText("Quantity Ensembles:", "অর্ডার পরিমাণ:")}
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center border border-zinc-250 dark:border-zinc-800 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-4 font-mono font-bold text-sm text-zinc-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 px-3 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400"
                  >
                    <Plus size={14} />
                  </button>
                </div>

                <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono tracking-wide">
                  ✔ {getTranslatedText("In Stock: Ready for Mohammadpur flagship dispatch in 12h", "ইন স্টক: শোরুম থেকে ১২ ঘণ্টার মধ্যে প্রেরণে প্রস্তুত")}
                </div>
              </div>
            </div>

            {/* Primary Action Buttons layout */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                id="details-add-to-cart"
                onClick={handleAddToBag}
                className="flex-1 py-4 bg-black hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-[0.25em] text-white rounded flex items-center justify-center space-x-2 transition-transform active:scale-95 shadow-sm"
              >
                <ShoppingBag size={15} />
                <span>{getTranslatedText("Add to Shopping Bag", "শপিং ব্যাগে যোগ করুন")}</span>
              </button>

              <button
                id="details-wishlist-btn"
                onClick={() => toggleWishlist(product)}
                className={`py-4 px-6 border rounded font-black text-xs uppercase tracking-widest flex items-center justify-center space-x-1 transition-colors ${
                  isInWishlist(product.id)
                    ? 'bg-red-50 border-red-200 text-red-650 hover:bg-red-100 dark:bg-red-950/30'
                    : 'border-zinc-250 dark:border-zinc-800 text-zinc-700 hover:text-black hover:border-black dark:text-zinc-350 dark:hover:text-white'
                }`}
              >
                <Heart size={15} fill={isInWishlist(product.id) ? "currentColor" : "none"} />
                <span className="hidden sm:inline">
                  {isInWishlist(product.id) ? getTranslatedText("Included", "সংরক্ষিত") : getTranslatedText("Watchlist", "উইশলিস্ট")}
                </span>
              </button>
            </div>

            {/* Shipping info alerts */}
            <div className="pt-4 space-y-2.5 text-xs text-zinc-500 font-medium">
              <div className="flex items-center space-x-2">
                <Truck size={15} className="text-black dark:text-white" />
                <span>{getTranslatedText("Cash on Delivery (COD) services active across Bangladesh", "সারা বাংলাদেশে ক্যাশ অন ডেলিভারি সুবিধা সচল")}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Undo size={15} className="text-black dark:text-white" />
                <span>{getTranslatedText("Hassle-free 7-day outlet sizing swap available", "৭ দিনের খুচরা শোরুম এক্সচেঞ্জ পলিসি")}</span>
              </div>
            </div>

          </div>

        </div>

        {/* 2. Structured Information Accordion Display tabs */}
        <div className="mt-16 border-t border-zinc-150 dark:border-zinc-900 pt-10">
          
          <div className="flex space-x-6 border-b border-zinc-100 dark:border-zinc-900 pb-3 mb-6">
            <button
              onClick={() => setActiveTab('details')}
              className={`text-xs font-black uppercase tracking-widest pb-3.5 relative transition-colors ${
                activeTab === 'details' ? 'text-black dark:text-white' : 'text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {getTranslatedText("Specifications & Details", "বস্ত্রের বৈশিষ্ট্য")}
              {activeTab === 'details' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-black dark:bg-white"></span>}
            </button>

            <button
              onClick={() => setActiveTab('shipping')}
              className={`text-xs font-black uppercase tracking-widest pb-3.5 relative transition-colors ${
                activeTab === 'shipping' ? 'text-black dark:text-white' : 'text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {getTranslatedText("Delivery Timelines", "ডেলিভারি বিবরণ")}
              {activeTab === 'shipping' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-black dark:bg-white"></span>}
            </button>

            <button
              onClick={() => setActiveTab('care')}
              className={`text-xs font-black uppercase tracking-widest pb-3.5 relative transition-colors ${
                activeTab === 'care' ? 'text-black dark:text-white' : 'text-zinc-400 hover:text-black dark:hover:text-white'
              }`}
            >
              {getTranslatedText("Care & Treatment", "যত্ন ও ওয়াশ গাইড")}
              {activeTab === 'care' && <span className="absolute bottom-0 left-0 w-full h-[3px] bg-black dark:bg-white"></span>}
            </button>
          </div>

          <div className="text-xs sm:text-sm text-zinc-650 dark:text-zinc-400 leading-relaxed max-w-4xl">
            {activeTab === 'details' && (
              <div className="space-y-4">
                <p className="font-normal">{product.longDescription}</p>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 text-xs font-medium">
                  {product.details.map((dt, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 bg-black dark:bg-white rounded-full"></span>
                      <span>{dt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-3">
                <p>
                  {getTranslatedText(
                    "All shipments are beautifully packed in dustproof ROYMEN Signature custom luxury sliding drawers. Order dispatched from our warehouse within 12 hours.",
                    "প্রতিটি রয়মেন পোশাক ডাস্টপ্রুফ সিগনেচার ড্রয়ার বক্সে প্যাক করে পাঠানো হয়। ঢাকার ভিতরে ২৪-৪৮ ঘণ্টায় ও ঢাকার বাইরে ৩-৪ দিনের দিন ডেলিভারি পাবেন।"
                  )}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-100 dark:border-zinc-850">
                    <h4 className="font-bold text-black dark:text-white text-xs uppercase tracking-wider mb-1">
                      {getTranslatedText("Dhaka Capital District", "ঢাকা সিটি ডেলিভারি")}
                    </h4>
                    <p className="text-xs">
                      {getTranslatedText("Expected Speed: Next-Day Delivery. Standard Flat BDT 80 (Free inside BD if cart total >= ৳5,000).", "সময়সীমা: ২৪-৪৮ ঘণ্টা। ডেলিভারি চার্জ ৮০ টাকা। মোট শপিং ৫,০০০ টাকার বেশি হলে চার্জ ফ্রি।")}
                    </p>
                  </div>
                  <div className="p-4 bg-zinc-50 dark:bg-zinc-900 rounded border border-zinc-100 dark:border-zinc-850">
                    <h4 className="font-bold text-black dark:text-white text-xs uppercase tracking-wider mb-1">
                      {getTranslatedText("Inter-districts speed across Bangladesh", "ঢাকার বাইরের জেলা সমূহ")}
                    </h4>
                    <p className="text-xs">
                      {getTranslatedText("Expected Speed: 3-5 Business Days. Flat charge BDT 150. Tracked shipping options enabled via Pathao of SteadFast Courier.", "সময়সীমা: ৩-৫ কার্যদিবস। ডেলিভারি চার্জ ১৫০ টাকা। পাঠাও/ষ্টিডফাস্ট কুরিয়ার যোগে ডেলিভারি করা হয়।")}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <ul className="space-y-2.5 text-xs font-semibold">
                <li className="flex items-start space-x-2">
                  <span className="text-black dark:text-white font-black mt-0.5">•</span>
                  <span>{getTranslatedText("Machine wash cold on delicate cycle or wash dry under shade", "ঠান্ডা পানিতে ওয়াশ করুন এবং হালকা রোদে শুকিয়ে নিন")}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-black dark:text-white font-black mt-0.5">•</span>
                  <span>{getTranslatedText("Separate wash with similar dark tones is recommended for first 2 wash loops", "প্রথম ২-৩ বার অন্য কালার কাপড়ের থেকে আলাদা ধৌত করতে সাজেস্ট করা হয়")}</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-black dark:text-white font-black mt-0.5">•</span>
                  <span>{getTranslatedText("Do NOT bleach. Use medium-high standard iron to revive signature soft silk shine", "ব্লিচ ব্যবহার সম্পূর্ণ নিষিদ্ধ। নরমাল আয়রন বা স্টিম করুন")}</span>
                </li>
              </ul>
            )}
          </div>

        </div>

        {/* 3. High-quality client-side interactive Review section */}
        <div className="mt-16 border-t border-zinc-150 dark:border-zinc-900 pt-10 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* List of customer opinions (lg: 7) */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-base font-bold uppercase tracking-wider text-black dark:text-white mb-4">
              {getTranslatedText("Client Opinions", "গ্রাহকদের রিভিউ")}
            </h3>

            {reviews.length === 0 ? (
              <div className="p-8 text-center bg-zinc-50 dark:bg-zinc-900 rounded text-zinc-500 font-mono text-xs">
                {getTranslatedText("No Verified Reviews Yet. Be the first to express opinion!", "এই পোশাকে এখনো কেউ কোনো মতামত দেননি। হয়ে যান প্রথম রিভিওদাতা!")}
              </div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="p-5 bg-zinc-50 dark:bg-zinc-910 border border-zinc-100 dark:border-zinc-900 rounded flex flex-col space-y-2 bg-zinc-50 dark:bg-zinc-900/60">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-black text-black dark:text-white">{rev.userName}</span>
                        {rev.verified && (
                          <span className="text-[9px] bg-emerald-550 text-emerald-600 dark:text-emerald-400 font-bold uppercase px-1.5 py-0.5 rounded flex items-center bg-emerald-100 dark:bg-emerald-950/40">
                            <Check size={8} className="mr-0.5 shrink-0" /> {getTranslatedText("Verified Purchase", "ভেরিফাইড ক্রেতা")}
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-zinc-400 font-mono">{rev.date}</span>
                    </div>

                    <div className="flex text-amber-400">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={11} fill={i < rev.rating ? "currentColor" : "none"} />
                      ))}
                    </div>

                    <p className="text-xs text-zinc-650 dark:text-zinc-300 leading-relaxed font-normal">
                      {rev.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Form to submit review client-side (lg: 5) */}
          <div className="lg:col-span-5">
            <div className="p-6 bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 rounded-lg space-y-4 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-black dark:text-white">
                {getTranslatedText("Express Your Experience", "রিভিউ দিন")}
              </h4>
              <p className="text-[11px] text-zinc-400">
                {getTranslatedText("Your review lets our artisans in Dhaka improve garment parameters. Honest feed is appreciated.", "আপনার রিভিউ ঢাকাস্থ কারিগরদের পোশাক মান বৃদ্ধি করতে ব্যাপকভাবে সাহায্য করে।")}
              </p>

              <form onSubmit={handleAddReview} className="space-y-4 text-xs font-medium">
                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Enter Your Name:", "আপনার নাম:")}
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Farhan Chowdhury"
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Assign Rating Stars:", "স্টার রেটিং নির্বাচন:")}
                  </label>
                  <select
                    value={userRating}
                    onChange={(e) => setUserRating(Number(e.target.value))}
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white font-bold"
                  >
                    <option value="5">⭐⭐⭐⭐⭐ 5 {getTranslatedText("Stars", "স্টার")}</option>
                    <option value="4">⭐⭐⭐⭐ 4 {getTranslatedText("Stars", "স্টার")}</option>
                    <option value="3">⭐⭐⭐ 3 {getTranslatedText("Stars", "স্টার")}</option>
                    <option value="2">⭐⭐ 2 {getTranslatedText("Stars", "স্টার")}</option>
                    <option value="1">⭐ 1 {getTranslatedText("Star", "স্টার")}</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-zinc-500 uppercase tracking-wider text-[10px] font-extrabold block">
                    {getTranslatedText("Write Review Message:", "রিভিউ মন্তব্য:")}
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={userComment}
                    onChange={(e) => setUserComment(e.target.value)}
                    placeholder={getTranslatedText("Detail fitting feel, color saturation, soft traits...", "কাপড়ের কোয়ালিটি, সেলাই সাইজ ও রঙ সম্পর্কে আপনার অনুভূতি")}
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                  />
                </div>

                <button
                  id="submit-review-btn"
                  type="submit"
                  className="w-full py-3 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest hover:bg-zinc-800 dark:hover:bg-zinc-100 rounded text-xs transition-colors"
                >
                  {getTranslatedText("Publish Review", "রিভিউ সাবমিট করুন")}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* 4. Elegant Related recommendation items */}
        {related.length > 0 && (
          <div className="mt-20 border-t border-zinc-150 dark:border-zinc-900 pt-10">
            <div className="text-center pb-10">
              <h3 className="text-xl font-black uppercase tracking-widest text-black dark:text-white">
                {getTranslatedText("Curated Alternatives", "একই ক্যাটাগরির অন্য ডিজাইন")}
              </h3>
              <p className="text-xs text-zinc-400 uppercase tracking-widest font-medium mt-1">
                {getTranslatedText("Harmonized to fit your quiet luxury wardrobe preferences.", "রয়মেন কালেকশন থেকে আপনার জন্য আরও কিছু চয়েস।")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
