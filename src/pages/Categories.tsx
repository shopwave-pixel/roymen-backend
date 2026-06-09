import React from 'react';
import { Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ArrowRight } from 'lucide-react';

interface CategoryCard {
  nameEn: string;
  nameBn: string;
  image: string;
  taglineEn: string;
  taglineBn: string;
}

export const Categories: React.FC = () => {
  const { getTranslatedText } = useShop();

  const categoryCards: CategoryCard[] = [
    {
      nameEn: "T-Shirts",
      nameBn: "টি-শার্ট",
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=650",
      taglineEn: "Everyday basic organic Pima tees with silky touches",
      taglineBn: "শতভাগ সুতি উপাদানে তৈরি আরামদায়ক ক্যাজুয়াল টি-শার্ট"
    },
    {
      nameEn: "Polo Shirts",
      nameBn: "পোলো শার্ট",
      image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=650",
      taglineEn: "High density honeycomb pique weave with collar integrity",
      taglineBn: "স্মার্ট লুক ও রাজকীয় পিকের বুননে প্রিমিয়াম পোলো কালেকশন"
    },
    {
      nameEn: "Shirts",
      nameBn: "শার্ট",
      image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=650",
      taglineEn: "Linen breeze Mandarins and heavy Oxford button-downs",
      taglineBn: "অফিসিয়াল ও ক্যাজুয়াল পরিধানের জন্য হাই-ক্লাস কলার শার্টস"
    },
    {
      nameEn: "Jeans",
      nameBn: "জিন্স",
      image: "https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=650",
      taglineEn: "Heavy raw selvedge indigo redlines and comfort flex denim",
      taglineBn: "টেকসই জাপানিজ র-সেলভেজ ও কমফোর্ট স্ট্রেচ ডেনিম জিন্স"
    },
    {
      nameEn: "Trousers",
      nameBn: "ট্রাউজার্স",
      image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=650",
      taglineEn: "Sartorial combed twill chinos with expandable properties",
      taglineBn: "মার্জিত কর্পোরেট লাইফস্টাইলের জন্য প্রিমিয়াম চিনো ট্রাউজার্স"
    },
    {
      nameEn: "Panjabi",
      nameBn: "পাঞ্জাবি",
      image: "https://images.unsplash.com/photo-1610473068565-df0480927e1f?q=80&w=650",
      taglineEn: "Royal silk-cotton hand-stitched Zari embroidery",
      taglineBn: "বাঙালির ঐতিহ্যবাহী উৎসব উদযাপনের জন্য জমকালো পাঞ্জাবি"
    },
    {
      nameEn: "Hoodies",
      nameBn: "হুডি",
      image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=650",
      taglineEn: "Ultra heavyweight brushed fleeces for cozy street styling",
      taglineBn: "শীতের আভিজাত্যে ৪২০ জিএসএম হেভিওয়েট প্রিমিয়াম হুডি কালেকশন"
    },
    {
      nameEn: "Jackets",
      nameBn: "জ্যাকেট",
      image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?q=80&w=650",
      taglineEn: "Polished windproof satin-quilted matte eco-leather shells",
      taglineBn: "প্রিমিয়াম ফক্স লেদার ও আল্ট্রা-সফট সাটিন লাইনিং জ্যাকেট"
    },
    {
      nameEn: "Footwear",
      nameBn: "ফুটওয়্যার",
      image: "https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=650",
      taglineEn: "Artisanal split-suede leather monkstraps hand-shaped inside BD",
      taglineBn: "শতভাগ খাঁটি চামড়ায় কারিগর দ্বারা প্রস্তুত ডাবল মঙ্ক-স্ট্র্যাপস"
    },
    {
      nameEn: "Accessories",
      nameBn: "এক্সেসরিজ",
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=650",
      taglineEn: "Durable travel duffels and polarized acetate sunglasses",
      taglineBn: "ভ্রমণের আভিজাত্য বাড়াতে লেদার ট্রাভেল ডাফেল ও সানগ্লাস্স"
    }
  ];

  // Dynamically calculate stock distribution
  const getProductCount = (categoryName: string) => {
    return products.filter(p => p.category.toLowerCase() === categoryName.toLowerCase()).length;
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen transition-colors duration-300">
      
      {/* Category Banner Title */}
      <section className="bg-zinc-50 dark:bg-zinc-900/40 border-b border-zinc-150 py-12 text-center dark:border-zinc-850">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 dark:text-zinc-500 uppercase">
            {getTranslatedText("ROYMEN DIRECTORIES", "রয়মেন সূচিপত্র")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-black dark:text-white mt-1">
            {getTranslatedText("Fashion Categories", "ক্যাটাগরি ক্যাটালগ")}
          </h1>
          <p className="text-xs text-zinc-500 max-w-sm mx-auto mt-2 font-medium uppercase tracking-widest">
            {getTranslatedText("Timeless models crafted for perfection.", "প্রতিটি পোশাকের নিখুঁত বুনন ও কারিগরি")}
          </p>
        </div>
      </section>

      {/* Categories Bento Grid list */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {categoryCards.map((cat, idx) => {
            const count = getProductCount(cat.nameEn);
            return (
              <div
                key={idx}
                className="group relative h-[250px] bg-zinc-100 rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-zinc-100 dark:border-zinc-900"
              >
                {/* Visual Cover image */}
                <img
                  src={cat.image || null}
                  alt={cat.nameEn}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Dark Mask shadow */}
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/60 transition-colors"></div>

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  
                  {/* Top: Item Count indicator */}
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] font-black uppercase tracking-widest bg-white/20 backdrop-blur-md px-2.5 py-1 rounded">
                      {count} {getTranslatedText(count === 1 ? "Ensemble" : "Ensembles", "টি কালেকশন")}
                    </span>
                  </div>

                  {/* Bottom: Text descriptors & redirects */}
                  <div className="space-y-2">
                    <h2 className="text-xl font-black uppercase tracking-widest">
                      {getTranslatedText(cat.nameEn, cat.nameBn)}
                    </h2>
                    <p className="text-[11px] text-zinc-300 font-medium tracking-wide">
                      {getTranslatedText(cat.taglineEn, cat.taglineBn)}
                    </p>
                    <div className="pt-2 flex items-center text-xs font-bold uppercase tracking-widest text-amber-400 group-hover:text-white transition-colors">
                      <span className="mr-1">{getTranslatedText("Explore Category", "বিস্তারিত অন্বেষণ")}</span>
                      <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform" />
                    </div>
                  </div>

                </div>

                {/* Absolute link trigger */}
                <Link
                  to={`/shop?category=${encodeURIComponent(cat.nameEn)}`}
                  className="absolute inset-0 z-10"
                  aria-label={`Open Category ${cat.nameEn}`}
                ></Link>
              </div>
            );
          })}

        </div>
      </div>

    </div>
  );
};
