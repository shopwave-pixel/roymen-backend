import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { User, Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

export const Register: React.FC = () => {
  const { registerUser, getTranslatedText, addToast } = useShop();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return;

    if (password.length < 6) {
      addToast(getTranslatedText("Password must be at least 6 characters long", "পাসওয়ার্ড ন্যূনতম ৬ ডিজিটের হতে হবে"), "error");
      return;
    }

    setLoading(true);
    const success = await registerUser(name, email, password);
    setLoading(false);

    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex items-center justify-center py-24 px-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
        
        {/* Gold visual trim */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>

        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-[0.43em] text-yellow-600 dark:text-yellow-500 uppercase">
            {getTranslatedText("SARTORIAL JOINING", "রয়মেনে রাজকীয় নিবন্ধন")}
          </span>
          <h1 className="text-3xl font-black uppercase tracking-widest text-black dark:text-white">
            {getTranslatedText("REGISTER", "নিবন্ধন")}
          </h1>
          <p className="text-xs text-zinc-500 font-semibold leading-relaxed">
            {getTranslatedText("Establish your identity catalog ledger to wear confidence.", "আপনার রয়মেন প্রোফাইল নিবন্ধন করে সেলাই ও অর্ডারের আপডেট চেক করুন।")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-zinc-650">
          
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
              {getTranslatedText("Full Name:", "আপনার পূর্ণ নাম:")}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 pointer-events-none">
                <User size={14} />
              </span>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Istiaque Kabir"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600 text-zinc-900 dark:text-white font-bold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
              {getTranslatedText("Email Address:", "ইমেইল অ্যাড্রেস:")}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 pointer-events-none">
                <Mail size={14} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="e.g. istiaque@gmail.com"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600 text-zinc-900 dark:text-white font-bold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
              {getTranslatedText("Create Password:", "পাসওয়ার্ড তৈরি করুন:")}
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 pointer-events-none">
                <Lock size={14} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 6 characters"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600 text-zinc-900 dark:text-white"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-[0.2em] rounded transition-all active:scale-[0.98] flex items-center justify-center space-x-2 border border-transparent dark:border-zinc-800"
          >
            {loading ? (
              <span className="inline-block animate-pulse">{getTranslatedText("ENCRYPTING LEDGER...", "তালিকাভুক্ত করা হচ্ছে...")}</span>
            ) : (
              <>
                <UserPlus size={14} />
                <span>{getTranslatedText("CREATE LEDGER", "নিবন্ধন সম্পন্ন করুন")}</span>
              </>
            )}
          </button>

        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-zinc-400 font-medium">
            {getTranslatedText("Already have a ROYMEN key?", "পূর্বেই অ্যাকাউন্ট খুলেছেন?")}{' '}
            <Link
              to="/login"
              className="text-black dark:text-white font-black uppercase hover:underline ml-1 inline-flex items-center"
            >
              <span>{getTranslatedText("Sign In Here", "লগইন করুন")}</span>
              <ArrowRight size={12} className="ml-0.5" />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
