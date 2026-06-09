import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Facebook, Instagram, MapPin, Phone, Mail, ArrowRight } from 'lucide-react';

const Tiktok: React.FC<{ size?: number; className?: string }> = ({ size = 18, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
  </svg>
);

export const Footer: React.FC = () => {
  const { getTranslatedText, addToast } = useShop();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    addToast(
      getTranslatedText("Thank you for subscribing to ROYMEN Privé!", "রয়মেন প্রিভে-তে সাবস্ক্রাইব করার জন্য ধন্যবাদ!"),
      "success"
    );
    setEmail('');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-400 border-t border-zinc-900 pt-16 pb-8 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Upper Brand Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-16 border-b border-zinc-900">
          
          {/* Brand Intro Column */}
          <div className="space-y-4">
            <h2 className="text-xl font-black tracking-[0.25em] text-white">ROYMEN</h2>
            <p className="text-xs uppercase tracking-[0.3em] font-medium text-zinc-500">
              {getTranslatedText("Wear Confidence.", "নিজের উপর বিশ্বাস")}
            </p>
            <p className="text-sm leading-relaxed text-zinc-400 mt-4">
              {getTranslatedText(
                "Curated premium menswear designed to inspire absolute elegance. Elevating Bangladesh's local sartorial aesthetic with premium global fabrics and flawless tailored fits.",
                "বাঙালি লাইফস্টাইলের সাথে মিল রেখে ও আন্তর্জাতিক মানের প্রিমিয়াম কাপড়ে তৈরি রয়মেন পোশাক দিচ্ছে সম্পূর্ণ আরাম ও অতুলনীয় আত্মবিশ্বাস।"
              )}
            </p>
            <div className="flex space-x-4 pt-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="TikTok">
                <Tiktok size={18} />
              </a>
            </div>
          </div>

          {/* Quick Shop Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white">
              {getTranslatedText("Collections", "কালেকশন সমূহ")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/shop?category=T-Shirts" className="hover:text-white transition-colors">
                  {getTranslatedText("T-Shirts & Oversized", "টি-শার্ট ও ওভারসাইজড")}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Polo Shirts" className="hover:text-white transition-colors">
                  {getTranslatedText("Plaid & Honeycomb Polos", "প্রিমিয়াম পোলো শার্ট")}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Shirts" className="hover:text-white transition-colors">
                  {getTranslatedText("Formal & Casual Shirts", "শার্ট কালেকশন")}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Panjabi" className="hover:text-white transition-colors">
                  {getTranslatedText("Royal Heritage Panjabi", "অভিজাত পাঞ্জাবি")}
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Footwear" className="hover:text-white transition-colors">
                  {getTranslatedText("Handcrafted Footwear", "হাতে তৈরি জুতো")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Core Support Link columns */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white">
              {getTranslatedText("Assistance", "সহায়তা")}
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/faq" className="hover:text-white transition-colors">
                  {getTranslatedText("Frequently Asked Questions", "সাধারণ জিজ্ঞাসা (FAQ)")}
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">
                  {getTranslatedText("Store Outlets Guide", "শোরুম ও আউটলেট")}
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:text-white transition-colors">
                  {getTranslatedText("Privacy Policy", "গোপনীয়তার নীতি")}
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-colors">
                  {getTranslatedText("Terms & Conditions", "শর্তাবলী")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Flagship Showroom Contacts */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold tracking-widest uppercase text-white">
              {getTranslatedText("Flagship Outlet", "ফ্ল্যাগশিপ আউটলেট")}
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start space-x-3">
                <MapPin size={18} className="text-white mt-0.5 shrink-0" />
                <span>
                  {getTranslatedText(
                    "H#10, R#6, Shekhertek, Mohammadpur, Dhaka-1207, Bangladesh",
                    "হাউস ১০, রোড ৬, শেখেরটেক, মোহাম্মদপুর, ঢাকা-১২০৭, বাংলাদেশ"
                  )}
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={16} className="text-white shrink-0" />
                <span>01721922927</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={16} className="text-white shrink-0" />
                <span>roymenbusiness@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>



        {/* Footer Base Credits & Badges */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left text-xs text-zinc-600">
            <p>© {currentYear} ROYMEN Bangladesh. {getTranslatedText("All Rights Reserved. Engineered for excellence.", "সর্বস্বত্ব সংরক্ষিত।")} </p>
          </div>

          {/* Bangladesh localized secure payment badging */}
          <div className="flex flex-wrap justify-center gap-2 items-center text-[10px] text-zinc-500 font-mono">
            <span>{getTranslatedText("SECURE TRANSACTIONS:", "নিরাপদ পেমেন্ট চ্যানেল:")}</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-amber-500">bKash</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-orange-500">Nagad</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-red-400">Visa</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-blue-400">Mastercard</span>
            <span className="px-2 py-1 bg-zinc-900 border border-zinc-850 rounded text-zinc-300">Cash on Delivery</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
