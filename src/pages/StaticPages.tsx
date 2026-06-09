import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Check, Plus, Minus, Send, ShieldAlert } from 'lucide-react';

/* ==========================================================
   A. ABOUT US COMPONENT
   ========================================================== */
export const AboutUs: React.FC = () => {
  const { getTranslatedText } = useShop();
  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Visual Banner */}
      <section className="bg-zinc-100 dark:bg-zinc-900 py-16 text-center border-b border-zinc-150 dark:border-zinc-850">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-black tracking-[0.43em] text-zinc-400 dark:text-zinc-500 uppercase">
            {getTranslatedText("OUR STORY", "আমাদের গল্প")}
          </span>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-widest text-black dark:text-white mt-2">
            ROYMEN BANGLADESH
          </h1>
          <p className="text-xs uppercase tracking-[0.3em] font-medium text-zinc-500 mt-2">
            {getTranslatedText("Wear Confidence.", "নিজের উপর বিশ্বাস")}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-12 text-sm sm:text-base leading-relaxed text-zinc-650 dark:text-zinc-400 font-normal">
        
        <div className="space-y-4">
          <h2 className="text-xl font-black text-black dark:text-white uppercase tracking-wider">
            {getTranslatedText("The Genesis of Quiet Luxury", "আভিজাত্যের সূচনা")}
          </h2>
          <p>
            {getTranslatedText(
              "Established in Dhaka, Bangladesh, ROYMEN was born from a singular vision: to challenge the status quo of menswear. We sought to replace generic disposable fashion with quiet, thoughtful luxury—creating exceptional menswear that speaks not through loud logos, but through pristine fabrics, precise tailoring, and timeless relevance.",
              "রয়মেন মূলত প্রতিটি পুরুষের আত্মবিশ্বাস সমৃদ্ধ করতে এক নতুন দিনের সূচনা করেছে। আমাদের উদ্দেশ্য শুধুমাত্র পোশাক তৈরি নয়, বরং ঢাকা ও আন্তর্জাতিক মানের সূক্ষ্ম সুতা দ্বারা নির্মিত এমন পোশাক গ্রাহকদের হাতে পৌঁছে দেওয়া যা শতভাগ কমফোর্ট ও ক্লাস রিপ্রেজেন্ট করে।"
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          <div className="space-y-2">
            <h3 className="font-black text-xs uppercase tracking-widest text-black dark:text-white">
              {getTranslatedText("OUR RAW MATERIALS", "উপাদান নির্বাচন")}
            </h3>
            <p className="text-xs sm:text-sm">
              {getTranslatedText(
                "We import premium organic Pima and Giza Egyptian cottons directly from trusted farming guilds and source double-mercerized fabric rolls that retain exceptional sheen and drape. Every linen we utilize has its heritage traced directly to long-strain flax plantations of Italy.",
                "আমরা আমাদের পোশাকগুলোতে শতভাগ খাঁটি মিশরীয় গিজা কটন ও ইতালীয় লাক্সারি লিনেন কাপড় ব্যবহার করি, যা অত্যন্ত সূক্ষ্ম ও দীর্ঘস্থায়ী হয়।"
              )}
            </p>
          </div>

          <div className="space-y-2">
            <h3 className="font-black text-xs uppercase tracking-widest text-black dark:text-white">
              {getTranslatedText("TAILORED IN DHAKA", "ঢাকায় নিজস্ব কারিগরি")}
            </h3>
            <p className="text-xs sm:text-sm">
              {getTranslatedText(
                "Our master tailors and artisans combine decades of heritage sewing with state-of-the-art flat-lock sewing machinery in our dedicated workshop in Dhaka. This produces robust seams, aligned plackets, and collar stay shapes that resist curling and fuzz.",
                "আমাদের প্রতিটি পাঞ্জাবি ও শার্ট প্রবীণ কারিগররা নিজস্ব কারখানায় নিখুঁত সেলাই দিয়ে তৈরি করেন, যাতে প্রতিটি জয়েন্ট ও হেমলাইন হয় মজবুত।"
              )}
            </p>
          </div>
        </div>

        {/* Brand values banner */}
        <div className="bg-zinc-50 dark:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 p-6 sm:p-8 rounded-lg text-center space-y-4">
          <h3 className="text-sm font-black uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
            {getTranslatedText("THE ROYMEN PROMISE", "রয়মেন প্রতিজ্ঞা")}
          </h3>
          <p className="text-xs sm:text-sm max-w-2xl mx-auto italic">
            "{getTranslatedText(
              "True craftsmanship lies in details that are felt rather than seen. We pledge to never compromise fabric standards or stitch counts, ensuring that when you dress in ROYMEN, you represent pure confidence.",
              "প্রকৃত ফ্যাশন কখনো চোখে আঘাত করে না বরং মনে শান্তি দেয়। আমরা মেটেরিয়ালে কখনো আপোষ করি না। রয়মেন পরিধান করা মানেই নিজের উপর পূর্ণ বিশ্বাস রাখা।"
            )}"
          </p>
        </div>

      </div>
    </div>
  );
};


/* ==========================================================
   B. CONTACT US COMPONENT
   ========================================================== */
export const Contact: React.FC = () => {
  const { getTranslatedText, addToast } = useShop();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;
    addToast(
      getTranslatedText("Message dispatched successfully! Our concierge team will reach you shortly.", "ধন্যবাদ! আপনার বার্তাটি আমরা পেয়েছি। দ্রুতই আমরা যোগাযোগ করব।"),
      "success"
    );
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Banner */}
      <section className="bg-zinc-100 dark:bg-zinc-900 py-16 text-center border-b border-zinc-150 dark:border-zinc-850">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-black tracking-[0.43em] text-zinc-400 dark:text-zinc-500 uppercase">
            {getTranslatedText("GET IN TOUCH", "যোগাযোগ করুন")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-black dark:text-white mt-1">
            {getTranslatedText("ROYMEN CONCIERGE & STORES", "আমাদের শোরুম ও কাস্টমার কেয়ার")}
          </h1>
          <p className="text-xs text-zinc-500 mt-2 uppercase tracking-wider font-semibold">
            {getTranslatedText("How can we assist your premium shopping journey?", "আপনাকে কীভাবে সাহায্য করতে পারি?")}
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Outlet coordinates list (col: 5) */}
          <div className="lg:col-span-5 space-y-8 text-xs sm:text-sm font-medium">
            
            <div className="space-y-3">
              <h2 className="text-sm font-black uppercase tracking-wider text-black dark:text-white">
                {getTranslatedText("Flagship Outlet Mohammadpur", "ফ্ল্যাগশিপ শোরুম মোহাম্মদপুর")}
              </h2>
              <div className="p-5 bg-zinc-50 dark:bg-zinc-900/60 rounded-xl space-y-3 border border-zinc-100 dark:border-zinc-900">
                <p className="flex items-start space-x-3">
                  <MapPin size={18} className="text-zinc-805 shrink-0 mt-0.5" />
                  <span>
                    {getTranslatedText(
                      "H#10, R#6, Shekhertek, Mohammadpur, Dhaka-1207, Bangladesh",
                      "হাউস ১০, রোড ৬, শেখেরটেক, মোহাম্মদপুর, ঢাকা-১২০৭, বাংলাদেশ"
                    )}
                  </span>
                </p>
                <p className="flex items-center space-x-3">
                  <Phone size={16} className="text-zinc-805 shrink-0" />
                  <span>01721922927</span>
                </p>
                <p className="flex items-center space-x-3">
                  <Mail size={16} className="text-zinc-805 shrink-0" />
                  <span>roymenbusiness@gmail.com</span>
                </p>
                <div className="pt-2 border-t border-zinc-150 dark:border-zinc-850 text-[11px] text-zinc-500">
                  ⚡ Hours: 10:00 AM - 10:00 PM (Opened everyday including Fridays)
                </div>
              </div>
            </div>



          </div>

          {/* Form wrapper (col: 7) */}
          <div className="lg:col-span-7 bg-zinc-50 dark:bg-zinc-900/20 p-6 sm:p-8 border border-zinc-150 dark:border-zinc-850 rounded-xl">
            <h2 className="text-sm font-black text-black dark:text-white uppercase tracking-widest mb-2">
              {getTranslatedText("Transmit Message", "আমাদের মেইল করুন")}
            </h2>
            <p className="text-xs text-zinc-400 mb-6">
              {getTranslatedText("Need guidance regarding custom sizing, or feedback? Drop your entries below.", "অর্ডার সংক্রান্ত কোয়েরি, সাইজ পরামর্শ বা ফিডব্যাক দিতে ফর্মটি পাঠিয়ে দিন।")}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold text-zinc-650">
              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-50s dark:text-zinc-400 block">{getTranslatedText("Your Name:", "আপনার নাম:")}</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Istiaque Chowdhury"
                  className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-50s dark:text-zinc-400 block">{getTranslatedText("Your Email:", "আপনার ইমেইল:")}</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. istiaque@roymen.com"
                  className="w-full p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 text-zinc-900 dark:text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase tracking-wider font-extrabold text-zinc-50s dark:text-zinc-400 block">{getTranslatedText("Detailed Message:", "বিস্তারিত বার্তা:")}</label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={getTranslatedText("Inquire about fabrics, sizing exchange limits...", "আপনার প্রশ্নের বিবরণ")}
                  className="w-full p-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-805 rounded focus:ring-1 text-zinc-900 dark:text-white"
                />
              </div>

              <button
                id="contact-submit-btn"
                type="submit"
                className="w-full py-3.5 bg-black text-white dark:bg-white dark:text-black font-black uppercase tracking-widest text-xs rounded transition-transform active:scale-95 flex items-center justify-center space-x-1"
              >
                <Send size={13} />
                <span>{getTranslatedText("Transmit Info", "মেসেজ পাঠান")}</span>
              </button>
            </form>
          </div>

        </div>
      </div>
    </div>
  );
};


/* ==========================================================
   C. FAQ COMPONENT
   ========================================================== */
interface FAQItem {
  qEn: string;
  qBn: string;
  aEn: string;
  aBn: string;
}

export const FAQ: React.FC = () => {
  const { getTranslatedText } = useShop();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const entries: FAQItem[] = [
    {
      qEn: "What is the standard delivery timeline inside Bangladesh?",
      qBn: "বাংলাদেশের সিলেক্টেড জেলাগুলোতে পণ্য ডেলিভারিতে কত সময় লাগে?",
      aEn: "Inside the Dhaka Metropolitan territory, expect your packages in 24 - 48 hours. Inter-district shipments are dispatched via tracked logistics and arrive in 3 to 5 business days.",
      aBn: "ঢাকা সিটি কর্পোরেশন এরিয়ার ভিতরে ২৪ থেকে ৪৮ ঘণ্টার মধ্যে ডেলিভারি করা হয়। ঢাকার বাইরে অন্যান্য জেলা ও থানা শহরে কুরিয়ারের মাধ্যমে ৩ থেকে ৫ কার্যদিবসের মধ্যে পৌঁছাবে।"
    },
    {
      qEn: "Do you offer cash on delivery (COD)?",
      qBn: "আপনাদের কি ক্যাশ অন ডেলিভারি (COD) সুবিধা আছে?",
      aEn: "Yes, fully cash-on-delivery is active across all post-offices, unions, and districts of Bangladesh. Unpack progress check is welcome before paying core courier riders.",
      aBn: "হ্যাঁ, সারা বাংলাদেশে ১০০% ক্যাশ অন কার ডেলিভারি সুবিধা সচল রয়েছে। ড্রেস হাতে পেয়ে চেক করে পেমেন্ট করার পূর্ণ সুবিধা পাবেন।"
    },
    {
      qEn: "What is your return or exchange protocol?",
      qBn: "ড্রেসের মাপ বা ফিটিং পরিবর্তন করতে চাইলে এক্সচেঞ্জ পলিসি কেমন?",
      aEn: "We maintain a seamless 7-day swap policy. If your select is snug, visit our Mohammadpur flagship showroom in Dhaka with the invoice card, or mail us to arrange home pickup.",
      aBn: "পোশাকটি হাতে পাওয়ার পর ৭ দিনের মধ্যে সাইজ এক্সচেঞ্জ করতে পারবেন। আমাদের মোহাম্মদপুর ফ্ল্যাগশিপ আউটলেটে এসে সরাসরি অথবা ঢাকার বাইরে হোম পিকআপের মাধ্যমে এক্সচেঞ্জ করা যাবে।"
    },
    {
      qEn: "How can I apply vouchers like WELCOME15?",
      qBn: "ডিসকাউন্ট কুপন কোড (যেমন: WELCOME15) কীভাবে ব্যবহার করব?",
      aEn: "Add eligible apparel to your cart, click checkout back bag drawer or checkout page, locate coupons inputs, then append WELCOME15 to deduct 15% immediately.",
      aBn: "পছন্দের ড্রেস কার্টে যোগ করে পেমেন্ট স্ক্রিনে প্রবেশ করুন, কুপন বক্সে WELCOME15 লিখে প্রয়োগ বাটনে ক্লিক করলেই বিল থেকে ১৫% ছাড় হয়ে যাবে।"
    }
  ];

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* Visual Title */}
      <section className="bg-zinc-100 dark:bg-zinc-900 py-16 text-center border-b border-zinc-150 dark:border-zinc-850">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-black tracking-[0.43em] text-zinc-400 dark:text-zinc-500 uppercase">
            {getTranslatedText("FREQUENTLY ASKED", "সাধারণ জিজ্ঞাসা")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest text-black dark:text-white mt-1">
            {getTranslatedText("ROYMEN SUPPORT INDEX", "জিজ্ঞাসা ও সমাধান")}
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="space-y-4">
          
          {entries.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="border border-zinc-150 dark:border-zinc-850 rounded-lg overflow-hidden transition-all bg-zinc-50/50 dark:bg-zinc-900/20"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-5 text-left flex justify-between items-center bg-white dark:bg-zinc-950 text-sm font-bold text-zinc-900 dark:text-white hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors"
                >
                  <span>{getTranslatedText(item.qEn, item.qBn)}</span>
                  {isOpen ? <Minus size={16} className="text-zinc-550 shrink-0" /> : <Plus size={16} className="text-zinc-550 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="p-5 border-t border-zinc-150 dark:border-zinc-850 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-455 font-normal">
                    {getTranslatedText(item.aEn, item.aBn)}
                  </div>
                )}
              </div>
            );
          })}

        </div>
      </div>
    </div>
  );
};


/* ==========================================================
   D. PRIVACY POLICY COMPONENT
   ========================================================== */
export const PrivacyPolicy: React.FC = () => {
  const { getTranslatedText } = useShop();
  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-16 transition-colors">
      <section className="bg-zinc-100 dark:bg-zinc-900 py-16 text-center border-b border-zinc-150 dark:border-zinc-850">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-black tracking-[0.43em] text-zinc-400 dark:text-zinc-500 uppercase">
            {getTranslatedText("LEGAL DIRECTIVES", "নিরাপত্তা নীতি")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest mt-1">
            {getTranslatedText("Privacy Policy", "গোপনীয়তার নীতি")}
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-405 font-medium">
        <p className="font-bold text-zinc-800 dark:text-zinc-200">
          📍 {getTranslatedText("Last Amended: July 2026", "সর্বশেষ পরিমার্জন: জুলাই ২০২৬")}
        </p>

        <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white mt-4">
          1. {getTranslatedText("Information We Gather", "তথ্য সংগ্রহ")}
        </h3>
        <p>
          {getTranslatedText(
            "When placing checkout requests inside Bangladesh, we collect details necessary to safely coordinate courier partners. This includes delivery names, active 11-digit mobile phone channels, correct email addresses, and detailed home addresses.",
            "রয়মেন বাংলাদেশ পোর্টালে আপনার অর্ডার কন্সাইনমেন্ট ডেলিভারি করতে আমরা শুধুমাত্র প্রয়োজনীয় তথ্য (যেমন: নাম, মোবাইল নম্বর এবং ঠিকানা) সংগ্রহ করি কুরিয়ার কোম্পানির সাথে কোঅর্ডিনেশনের জন্য।"
          )}
        </p>

        <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white mt-4">
          2. {getTranslatedText("Secure Payment Guarding", "পেমেন্ট নিরাপত্তা")}
        </h3>
        <p>
          {getTranslatedText(
            "ROYMEN does not record credit card arrays or bKash passwords on direct sandboxes. Payments are proxied using verified local SSL protocols protecting client identities against third-party disclosures.",
            "আমরা বিকাশ পিন নম্বর বা ক্রেডিট কার্ডের তথ্য সংগ্রহ বা সংরক্ষণ করি না। সকল কার্ড পেমেন্ট সিকিউর SSLCommerz চ্যনেলের মাধ্যমে এনক্রিপ্টেড উপায়ে প্রসেস করা হয়ে থাকে।"
          )}
        </p>

        <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white mt-4">
          3. {getTranslatedText("Client Consent", "গ্রাহকের সম্মতি")}
        </h3>
        <p>
          {getTranslatedText(
            "By finalizing checkouts on this website catalog, you consent to our dispatch logs coordinating delivery coordinates via Pathao or SteadFast krogers.",
            "এই সাইট ব্যবহার ও অর্ডার প্রদানের মাধ্যমে আপনি আমাদের শিপিং কোম্পানিগুলো দ্বারা আপনার ডেলিভারি সম্পন্ন করার ব্যাপারে সহমত প্রকাশ করছেন।"
          )}
        </p>
      </div>
    </div>
  );
};


/* ==========================================================
   E. TERMS & CONDITIONS COMPONENT
   ========================================================== */
export const TermsConditions: React.FC = () => {
  const { getTranslatedText } = useShop();
  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen pb-16 transition-colors">
      <section className="bg-zinc-100 dark:bg-zinc-900 py-16 text-center border-b border-zinc-150 dark:border-zinc-850">
        <div className="max-w-4xl mx-auto px-4">
          <span className="text-[10px] font-black tracking-[0.43em] text-zinc-400 dark:text-zinc-500 uppercase">
            {getTranslatedText("SARTORIAL STATUTES", "শর্তাবলী")}
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-widest mt-1">
            {getTranslatedText("Terms & Conditions", "শর্ত ও নিয়মাবলী")}
          </h1>
        </div>
      </section>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-6 text-xs sm:text-sm leading-relaxed text-zinc-500 dark:text-zinc-405 font-medium">
        <p className="font-bold text-zinc-800 dark:text-zinc-200">
          📍 {getTranslatedText("Last Amended: July 2026", "সর্বশেষ পরিমার্জন: জুলাই ২০২৬")}
        </p>

        <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white mt-4">
          1. {getTranslatedText("Warranty & Core Disclaimers", "প্রোডাক্ট বিবরণ গ্যারান্টি")}
        </h3>
        <p>
          {getTranslatedText(
            "All descriptions regarding Egyptian cotton GSM and Italian flax linen are guaranteed accurate. Fabric color shades might slightly deviate dynamically due to computer display balance variations.",
            "আমাদের পণ্যের বিবরণীতে যে মিশরীয় কটন বা ইতালিয়ান লিনেন এবং জিএসএম-এর উল্লেখ আছে তা শতভাগ গ্যারান্টিড। তবে আলোকসজ্জা বা ডিসপ্লে রেজুলেশনের জন্য রঙ সামান্য পরিবর্তিত দেখাতে পারে।"
          )}
        </p>

        <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white mt-4">
          2. {getTranslatedText("Pricing Conditions", "মূল্য বিন্যাস")}
        </h3>
        <p>
          {getTranslatedText(
            "Prices displayed inside this shop represent national Bangladeshi pricing (inclusive of vat limits). Delivery parameters inside metropolitan Dhaka follow a BDT 80 flat, outer districts are BDT 150 flat.",
            "সাইটের সকল প্রোডাক্ট মূল্য বাংলাদেশি টাকায় ভ্যাটসহ অন্তর্ভুক্ত। ঢাকার নিজস্ব ডেলিভারি ৮০ টাকা ও ঢাকার বাইরের জেলাগুলোতে ফিক্সড ১৫০ টাকা ডেলিভারি চার্জ প্রযোজ্য হবে।"
          )}
        </p>

        <h3 className="text-sm font-black uppercase text-zinc-900 dark:text-white mt-4">
          3. {getTranslatedText("Sizing swaps", "মাপ পরিবর্তনের দাবি")}
        </h3>
        <p>
          {getTranslatedText(
            "To qualify for a sizing swap, items must be pristine, unwashed, and have their original security tag card intact. Ensure you hold store invoice logs.",
            "ড্রেসটির সাইজ এক্সচেঞ্জ সুবিধা উপভোগ করতে পোশাকটি অবশ্যই ধৌতহীন ও রাজকীয় হ্যাংট্যাগ অক্ষত অবস্থায় ক্রয়ের ৭ দিনের মধ্যে ফেরত নিয়ে আসতে হবে।"
          )}
        </p>
      </div>
    </div>
  );
};
