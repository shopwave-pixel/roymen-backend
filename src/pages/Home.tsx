import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { ChevronLeft, ChevronRight, Star, Truck, ShieldCheck, RefreshCw, BadgePercent } from 'lucide-react';

export const Home: React.FC = () => {
  const { getTranslatedText } = useShop();
  const navigate = useNavigate();
  const [currentHero, setCurrentHero] = useState(0);

  const heroSlides = [
    {
      titleEn: "MONOCHROME APEX",
      titleBn: "মনোক্রোম অ্যাপেক্স",
      subEn: "SUMMER CLASSICS MENSWEAR 2026",
      subBn: "সামার ক্লাসিক কালেকশন ২০২৬",
      descEn: "Designed with Giza 100% Cotton. Breathable. Pre-shrunk. Engineered for the subcontinental weather.",
      descBn: "১০০% গিজা কটন দিয়ে তৈরি সম্পূর্ণ আরামদায়ক ও নিখুঁত ফিটিংয়ের রয়মেন প্রিমিয়াম ড্রেস।",
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1200&auto=format&fit=crop",
      link: "/shop"
    },
    {
      titleEn: "SARTORIAL TRADITIONS",
      titleBn: "ঐতিহ্যের আভিজাত্য",
      subEn: "ROYAL HERITAGE FESTIVE COLLECTION",
      subBn: "রয়েল হেরিটেজ উৎসবের পাঞ্জাবি",
      descEn: "Pure silk weaves paired with intricate hand-crafted Zari platinum embroidery of supreme artisans.",
      descBn: "অভিজাত সিল্ক মিক্স সুতোয় ঢাকা কারিগর দ্বারা এমব্রয়ডারি করা আমাদের রাজকীয় পাঞ্জাবি কালেকশন।",
      image: "https://images.unsplash.com/photo-1620012253295-c05518e993bd?q=80&w=1200&auto=format&fit=crop",
      link: "/shop?category=Panjabi"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const featuredList = products.filter(p => p.featured).slice(0, 4);
  const newArrivals = products.filter(p => p.isNew).slice(0, 4);
  const bestSellers = products.filter(p => p.isBestSeller).slice(0, 4);

  const collections = [
    { nameEn: "T-Shirts", nameBn: "টি-শার্ট", img: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=400" },
    { nameEn: "Shirts", nameBn: "শার্ট", img: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=400" },
    { nameEn: "Panjabi", nameBn: "পাঞ্জাবি", img: "https://images.unsplash.com/photo-1610473068565-df0480927e1f?q=80&w=400" },
    { nameEn: "Accessories", nameBn: "এক্সেসরিজ", img: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=400" }
  ];

  const localTestimonials = [
    {
      name: "Sabbir Hossain",
      role: "Corporate Executive, Gulshan",
      reviewEn: "Royal Crimson Pique Polo has a fantastic fabric feel. Perfect collar line that holds even after multiple machine washes. Absolute elite branding experience.",
      reviewBn: "গুলশান রোডের প্রিমিয়াম শপগুলোর থেকেও রয়মেন এর পোলো শার্ট আমার অসাধারণ লেগেছে। কালার ফেইড করে না, কলার বাঁকা হয় না। নিখুঁত স্যুয়িং!",
      rating: 5
    },
    {
      name: "Arif Al-Amin",
      role: "Tech Entrepreneur, Banani",
      reviewEn: "Best selvedge raw denim jeans in Dhaka. Stitch quality, solid bronze rivets, and fit are comparable to Japanese imports. Amazing craft value.",
      reviewBn: "আমি সত্যিই মুগ্ধ! বাংলাদেশে তৈরি জাপানিজ র-সেলভেজ ডেনিমের রয়মেন ফিটিং সত্যিই জাস্ট অসাধারণ। পকেট ও বাটনগুলোর ফিনিশিং অত্যন্ত নিখুঁত।",
      rating: 5
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* 1. Premium Hero Slider */}
      <section className="relative w-full h-[65vh] sm:h-[80vh] overflow-hidden bg-black">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
              idx === currentHero ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            {/* Dark Mask overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <img
              src={slide.image || null}
              alt={slide.titleEn}
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading="eager"
            />
            {/* Overlay contents */}
            <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
              <div className="max-w-4xl space-y-4">
                <span className="text-[10px] sm:text-xs font-black tracking-[0.43em] text-white bg-black/3c uppercase px-3 py-1.5 border border-white/20 inline-block bg-zinc-900/40">
                  {getTranslatedText(slide.subEn, slide.subBn)}
                </span>
                {/* Header title removed per user's "REMOVE" request */}
                <p className="text-xs sm:text-sm font-medium tracking-wide text-zinc-200 text-center max-w-xl mx-auto line-clamp-2 sm:line-clamp-none">
                  {getTranslatedText(slide.descEn, slide.descBn)}
                </p>
                <div className="pt-4 flex justify-center space-x-4">
                  <Link
                    to={slide.link}
                    className="px-6 py-3 bg-white text-black hover:bg-zinc-200 text-[11px] font-black uppercase tracking-[0.25em] transition-all rounded-sm flex items-center inline-block"
                  >
                    {getTranslatedText("Shop Collection", "শপ করুন")}
                  </Link>
                  <Link
                    to="/shop"
                    className="px-6 py-3 border border-white text-white hover:bg-white/10 text-[11px] font-black uppercase tracking-[0.25em] transition-all rounded-sm flex items-center inline-block"
                  >
                    {getTranslatedText("View All Products", "সব প্রোডাক্ট")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Carousel buttons */}
        <button
          onClick={() => setCurrentHero((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white hover:text-amber-500 hover:bg-black/40 rounded-full transition-colors hidden sm:block"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => setCurrentHero((prev) => (prev + 1) % heroSlides.length)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 text-white hover:text-amber-500 hover:bg-black/40 rounded-full transition-colors hidden sm:block"
        >
          <ChevronRight size={24} />
        </button>
      </section>

      {/* 2. Core Value Props Showcase (Bangladesh custom delivery speed) */}
      <section className="py-8 bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            
            <div className="flex flex-col items-center p-3">
              <Truck size={22} className="text-zinc-800 dark:text-zinc-200 mb-2 stroke-[1.5]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                {getTranslatedText("Fast Delivery", "দ্রুততম ডেলিভারি")}
              </h3>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                {getTranslatedText("24-48 Hours inside Dhaka. 3 Days across BD.", "ঢাকায় ২৪-৪৮ ঘণ্টা, সারা বাংলাদেশে ৩ দিনের মধ্যে।")}
              </p>
            </div>

            <div className="flex flex-col items-center p-3">
              <ShieldCheck size={22} className="text-zinc-800 dark:text-zinc-200 mb-2 stroke-[1.5]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                {getTranslatedText("100% Genuine Craft", "১০০% অথেন্টিক কোটি")}
              </h3>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                {getTranslatedText("Guaranteed Egyptian cotton & Italian linen fibers.", "শতভাগ প্রিমিয়াম ইতালিয়ান লিনেন ও সুতি কাপড়।")}
              </p>
            </div>

            <div className="flex flex-col items-center p-3">
              <RefreshCw size={22} className="text-zinc-800 dark:text-zinc-200 mb-2 stroke-[1.5]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                {getTranslatedText("7-Day Easy Exchange", "৭ দিনের সহজ রিটার্ন")}
              </h3>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                {getTranslatedText("No-questions-asked change matching guarantee.", "সাইজ বা ফিটিং নিয়ে সমস্যা হলে ৭ দিনে এক্সচেঞ্জ সুবিধা।")}
              </p>
            </div>

            <div className="flex flex-col items-center p-3">
              <BadgePercent size={22} className="text-zinc-800 dark:text-zinc-200 mb-2 stroke-[1.5]" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-black dark:text-white">
                {getTranslatedText("Premium Membership", "রয়মেন প্রিভে")}
              </h3>
              <p className="text-[10px] text-zinc-500 dark:text-zinc-400 mt-1">
                {getTranslatedText("Earn loyalty points & unlocks with code Welcome15.", "প্রিভিলেজ পয়েন্ট ও মেম্বারশিপে বিশেষ ডিসকাউন্ট।")}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Luxury Collection Categories Grid (Bento Style) */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-black dark:text-white uppercase">
              {getTranslatedText("Curated Collections", "অভিজাত কালেকশন")}
            </h2>
            <div className="w-16 h-[3px] bg-black dark:bg-white mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {collections.map((col, idx) => (
              <div
                key={idx}
                className="group relative h-[320px] rounded-lg overflow-hidden bg-zinc-100 hover:shadow-lg transition-all duration-300"
              >
                {/* Visual image screen */}
                <img
                  src={col.img || null}
                  alt={col.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Visual curtain */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors"></div>

                {/* Info Overlay absolute block */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-center sm:text-left">
                  <h3 className="text-base sm:text-lg font-black tracking-widest text-white uppercase">
                    {getTranslatedText(col.nameEn, col.nameBn)}
                  </h3>
                  <p className="text-[10px] text-zinc-300 uppercase tracking-widest mt-1">
                    {getTranslatedText("Shop Collection", "অন্বেষণ করুন")} →
                  </p>
                  <Link
                    to={`/shop?category=${encodeURIComponent(col.nameEn)}`}
                    className="absolute inset-0 z-10"
                    aria-label={`Shop category ${col.nameEn}`}
                  ></Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Elegant New Arrivals Showcase Grid (Featured Tabs) */}
      <section className="py-16 bg-zinc-50 dark:bg-zinc-900/20 border-t border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-black dark:text-white uppercase">
              {getTranslatedText("New Arrivals", "নতুন কালেকশন")}
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 whitespace-pre-line font-medium uppercase tracking-widest">
              {getTranslatedText("Precision styling, fine fabrics, effortless charm.", "আমাদের সর্বাধুনিক ডিজাইন ও ফেব্রিক্সে সজ্জ্বিত কালেকশন।")}
            </p>
            <div className="w-16 h-[3px] bg-black dark:bg-white mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {newArrivals.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
          
          <div className="text-center pt-10">
            <Link
              to="/shop"
              className="px-8 py-3.5 bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-[0.25em] rounded transition-transform hover:scale-105 inline-block"
            >
              {getTranslatedText("View All New Styles", "সব আকর্ষণীয় পোশাক দেখুন")}
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Custom Promotional Banner absolute layout */}
      <section className="py-20 relative bg-zinc-950 overflow-hidden text-center text-white">
        {/* Background visual watermarks */}
        <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=1200')" }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-zinc-950"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 space-y-6">
          <span className="text-[10px] sm:text-xs font-black uppercase tracking-[0.43em] text-amber-400">
            {getTranslatedText("LIMITED CAMPAIGN PRESENTATION", "লিমিটেড টাইম অফার")}
          </span>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-widest text-white uppercase leading-tight">
            ⚡ {getTranslatedText("UP TO 15% WELCOME OFFER", "১৫% পর্যন্ত বিশেষ ছাড়")}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300 font-medium max-w-xl mx-auto tracking-wide">
            {getTranslatedText(
              "Sign up now for premium lifestyle previews or apply code WELCOME15 in the checkout tray to deduct 15% instantly on your first purchase.",
              "রয়মেন-এ প্রথমবারের অর্ডারে ১৫% পর্যন্ত ডিসকাউন্ট পেতে অ্যাপ্লাই করুন কুপন কোড WELCOME15"
            )}
          </p>
          <div className="flex border border-zinc-800 rounded max-w-md mx-auto items-center p-1.5 bg-zinc-900/80">
            <span className="text-xs font-mono font-black text-amber-400 px-4 select-all">WELCOME15</span>
            <button
              onClick={() => {
                navigate('/shop');
              }}
              className="px-6 py-2 bg-white text-black hover:bg-zinc-200 text-xs font-black uppercase tracking-wider rounded ml-auto"
            >
              {getTranslatedText("Claim Voucher", "অফারটি নিন")}
            </button>
          </div>
        </div>
      </section>

      {/* 6. High End Best Sellers */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center pb-12">
            <h2 className="text-2xl sm:text-3xl font-black tracking-widest text-black dark:text-white uppercase animate-fade-in">
              {getTranslatedText("Most Coveted Models", "সেরা বিক্রিত কালেকশন")}
            </h2>
            <p className="text-zinc-500 text-xs sm:text-sm mt-1 whitespace-pre-line font-medium uppercase tracking-widest">
              {getTranslatedText("High retention, timeless elegance, chosen by many.", "গ্রাহকদের অত্যন্ত পছন্দের ও সর্বাধিক বিক্রিত স্টাইলিশ পোশাকসমূহ।")}
            </p>
            <div className="w-16 h-[3px] bg-black dark:bg-white mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </div>
      </section>



    </div>
  );
};
