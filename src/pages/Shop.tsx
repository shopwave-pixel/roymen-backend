import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { SlidersHorizontal, ArrowUpDown, X } from 'lucide-react';

export const Shop: React.FC = () => {
  const { getTranslatedText } = useShop();
  const [searchParams, setSearchParams] = useSearchParams();

  // Search, Category and Toggles synced from query params
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchFilter, setSearchFilter] = useState(initialSearch);
  const [selectedSize, setSelectedSize] = useState('All');
  const [selectedSort, setSelectedSort] = useState('recommended');
  
  // Price filter bounds
  const [maxPrice, setMaxPrice] = useState(10000);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  // Sync category state and search when searchParams changes
  useEffect(() => {
    setSelectedCategory(searchParams.get('category') || 'All');
  }, [searchParams]);

  // Sync local search filter with search param
  useEffect(() => {
    setSearchFilter(searchParams.get('search') || '');
  }, [searchParams]);

  const categories = [
    "All",
    "T-Shirts",
    "Polo Shirts",
    "Shirts",
    "Jeans",
    "Trousers",
    "Panjabi",
    "Hoodies",
    "Jackets",
    "Footwear",
    "Accessories"
  ];

  const sizes = ["All", "S", "M", "L", "XL", "XXL", "30", "32", "34", "36"];

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', category);
    }
    setSearchParams(searchParams);
  };

  const handleClearAllFilters = () => {
    setSelectedCategory('All');
    setSelectedSize('All');
    setSelectedSort('recommended');
    setMaxPrice(10000);
    setSearchFilter('');
    setSearchParams({});
  };

  // Memoized Filter & Sort Loop
  const filteredProducts = useMemo(() => {
    let result = [...products];

    // Search query match
    if (searchFilter.trim() !== '') {
      const query = searchFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query)
      );
    }

    // Category match
    if (selectedCategory !== 'All') {
      result = result.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Size match
    if (selectedSize !== 'All') {
      result = result.filter((p) => p.sizes.includes(selectedSize));
    }

    // Price boundary match
    result = result.filter((p) => p.price <= maxPrice);

    // Dynamic Sorters
    switch (selectedSort) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // default recommended: featured objects rise first
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return result;
  }, [searchFilter, selectedCategory, selectedSize, maxPrice, selectedSort]);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-300">
      
      {/* Visual Header Banner */}
      <section className="bg-zinc-100 dark:bg-zinc-900 py-12 text-center border-b border-zinc-150 dark:border-zinc-850">
        <div className="max-w-7xl mx-auto px-4">
          <span className="text-[10px] font-black tracking-[0.4em] text-zinc-400 dark:text-zinc-500 uppercase">
            {getTranslatedText("ROYMEN SHOWCASE", "রয়মেন শোরুম কালেকশন")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-black dark:text-white mt-1">
            {getTranslatedText("Quiet Luxury Menswear", "অভিজাত ফ্যাশন শপ")}
          </h1>
          <p className="text-xs text-zinc-500 mt-2 max-w-lg mx-auto font-medium">
            {getTranslatedText(
              "Drape in premium luxury. Experience perfect fits, organic fibers and handwoven excellence engineered for Bangladesh.",
              "আপনার দৈনন্দিন জীবনে যোগ করুন রয়মেন আভিজাত্য। পারফেক্ট সাইজ ও মেটেরিয়ালে নির্মিত আমাদের অল-সিজন কালেকশন।"
            )}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* A. Left Desktop Filters Column */}
          <aside className="w-full lg:w-64 shrink-0 hidden lg:block space-y-8">
            
            {/* 1. Category Column List */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-black dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
                {getTranslatedText("Categories", "ক্যাটাগরি সমূহ")}
              </h3>
              <div className="flex flex-col space-y-1">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategorySelect(cat)}
                    className={`text-left text-xs py-1.5 transition-colors tracking-wide ${
                      selectedCategory === cat
                        ? 'font-black text-black dark:text-white'
                        : 'text-zinc-500 hover:text-black dark:hover:text-white'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Interactive Price limit slider */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-black dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
                {getTranslatedText("Price Range limit", "মূল্য সীমা")}
              </h3>
              <div className="space-y-2">
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black dark:accent-white bg-zinc-200 dark:bg-zinc-800"
                />
                <div className="flex justify-between text-xs font-mono font-bold text-zinc-500">
                  <span>৳1,000</span>
                  <span className="text-black dark:text-white">৳{maxPrice.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* 3. Sizing Pills */}
            <div className="space-y-3">
              <h3 className="text-xs font-black uppercase tracking-widest text-black dark:text-white border-b border-zinc-100 dark:border-zinc-900 pb-2">
                {getTranslatedText("Filter By Size", "সাইজ নির্বাচন করুন")}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {sizes.map((sz) => (
                  <button
                    key={sz}
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded border transition-colors ${
                      selectedSize === sz
                        ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                        : 'border-zinc-200 dark:border-zinc-850 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Clear All CTA */}
            <button
              onClick={handleClearAllFilters}
              className="w-full py-2.5 bg-zinc-50 dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-850 border border-zinc-250 dark:border-zinc-800 text-xs font-bold uppercase tracking-wider rounded transition-colors text-zinc-700 dark:text-zinc-300 flex items-center justify-center space-x-1"
            >
              <X size={13} />
              <span>{getTranslatedText("Reset Filters", "সব ফিল্টার রিসেট")}</span>
            </button>

          </aside>

          {/* B. Right Main Grid and Sorting */}
          <main className="flex-1 space-y-6">
            
            {/* Upper Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-4 bg-zinc-50 dark:bg-zinc-900/40 p-4 border border-zinc-100 dark:border-zinc-900 rounded-lg">
              
              <div className="text-xs text-zinc-500 font-mono">
                {getTranslatedText("Showing", "পাওয়া গেছে")} <span className="font-bold text-black dark:text-white">{filteredProducts.length}</span> {getTranslatedText("luxurious ensembles", "টি এক্সক্লুসিভ কালেকশন")}
              </div>

              {/* Toggles and Dropdown selectors */}
              <div className="flex items-center space-x-3 ml-auto">
                
                {/* Mobile Filters Toggle Icon button */}
                <button
                  onClick={() => setMobileFiltersOpen(true)}
                  className="lg:hidden p-2 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded text-xs font-bold flex items-center space-x-1 hover:border-black"
                >
                  <SlidersHorizontal size={14} />
                  <span>{getTranslatedText("Filters", "ফিল্টার")}</span>
                </button>

                {/* Sorter Selector dropdown */}
                <div className="flex items-center space-x-1.5">
                  <ArrowUpDown size={14} className="text-zinc-400" />
                  <select
                    value={selectedSort}
                    onChange={(e) => setSelectedSort(e.target.value)}
                    className="bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-850 rounded px-2.5 py-1.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-black dark:focus:ring-white text-zinc-900 dark:text-white"
                  >
                    <option value="recommended">{getTranslatedText("Recommended", "প্রধান কালেকশন")}</option>
                    <option value="price-low">{getTranslatedText("Price: Low to High", "মূল্য: কম থেকে বেশি")}</option>
                    <option value="price-high">{getTranslatedText("Price: High to Low", "মূল্য: বেশি থেকে কম")}</option>
                    <option value="rating">{getTranslatedText("Ratings High First", "সেরা রেটিং")}</option>
                    <option value="newest">{getTranslatedText("New Trends First", "নতুন ডিজাইন")}</option>
                  </select>
                </div>

              </div>
            </div>

            {/* If there was a search parameter filter, let user know what is searched */}
            {searchFilter && (
              <div className="flex items-center space-x-2 text-xs font-bold text-zinc-500 bg-zinc-100 dark:bg-zinc-900 px-3 py-1.5 rounded inline-flex">
                <span>{getTranslatedText(`Result for: "${searchFilter}"`, `সার্চ রেজাল্ট: "${searchFilter}"`)}</span>
                <button onClick={() => {
                  setSearchFilter('');
                  searchParams.delete('search');
                  setSearchParams(searchParams);
                }} className="text-red-500 hover:text-red-700">
                  <X size={12} />
                </button>
              </div>
            )}

            {/* C. Primary Listings Grid */}
            {filteredProducts.length === 0 ? (
              <div className="py-20 text-center space-y-4">
                <SlidersHorizontal size={48} className="mx-auto text-zinc-300 stroke-1" />
                <h3 className="text-lg font-bold text-zinc-800 dark:text-zinc-200">
                  {getTranslatedText("No Outfits Found", "কোনো পোশাক পাওয়া যায়নি")}
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  {getTranslatedText(
                    "Try adjusting your pricing limits, changing the size filtering pill, or search filters.",
                    "অনুগ্রহ করে মূল্যসীমা বা সাইজ ফিল্টার পরিবর্তন করে পুনরায় সার্চ করুন।"
                  )}
                </p>
                <button
                  onClick={handleClearAllFilters}
                  className="px-6 py-2.5 bg-black text-white dark:bg-white dark:text-black font-black uppercase text-[11px] tracking-wider rounded"
                >
                  {getTranslatedText("Reset All Filters", "রিসেট ফিল্টার")}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {filteredProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* D. Responsive Slide-over Mobile Filters Overlay */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileFiltersOpen(false)}></div>
          
          <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white dark:bg-zinc-950 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 dark:border-zinc-900">
                <h2 className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
                  {getTranslatedText("Mobile Filters", "ফিল্টার প্যানেল")}
                </h2>
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="p-1 px-2 hover:bg-zinc-50 rounded"
                >
                  <X size={18} />
                </button>
              </div>

              {/* 1. Category Column List Mobile */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-black dark:text-white border-b border-zinc-50 dark:border-zinc-900/50 pb-1">
                  {getTranslatedText("Categories", "ক্যাটাগরি")}
                </h3>
                <div className="flex flex-col space-y-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        handleCategorySelect(cat);
                        setMobileFiltersOpen(false);
                      }}
                      className={`text-left text-xs py-1 transition-colors tracking-wide ${
                        selectedCategory === cat
                          ? 'font-bold text-black dark:text-white'
                          : 'text-zinc-500 hover:text-black dark:hover:text-white'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Price limit Mobile */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-200 border-b border-zinc-50 dark:border-zinc-900/50 pb-1">
                  {getTranslatedText("Max Price limit", "সর্বোচ্চ মূল্য")}
                </h3>
                <input
                  type="range"
                  min="1000"
                  max="10000"
                  step="250"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-black"
                />
                <div className="flex justify-between text-xs font-mono font-bold text-zinc-500">
                  <span>৳1,000</span>
                  <span className="text-black dark:text-white">৳{maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* 3. Size Mobile */}
              <div className="space-y-2">
                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-200 border-b border-zinc-50 dark:border-zinc-900/50 pb-1">
                  {getTranslatedText("Filter By Size", "সাইজ")}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`px-3 py-1.5 text-[10px] font-bold uppercase rounded border transition-colors ${
                        selectedSize === sz
                          ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white'
                          : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-650'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-6 border-t border-zinc-100 dark:border-zinc-900">
              <button
                onClick={() => {
                  handleClearAllFilters();
                  setMobileFiltersOpen(false);
                }}
                className="w-full py-3 bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-xs font-bold uppercase tracking-wider rounded text-zinc-900 dark:text-white transition-colors"
              >
                {getTranslatedText("Clear all filters", "সব রিসেট করুন")}
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
