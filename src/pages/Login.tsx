import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import { Mail, Lock, LogIn, ArrowRight, ShieldCheck } from 'lucide-react';

export const Login: React.FC = () => {
  const { loginUser, getTranslatedText, addToast, user } = useShop();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle redirect after login 
  const from = (location.state as any)?.from?.pathname || "/dashboard";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setLoading(true);
    const success = await loginUser(email, password);
    setLoading(false);

    if (success) {
      navigate(from, { replace: true });
    }
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen flex items-center justify-center py-20 px-4 transition-colors duration-300">
      <div className="w-full max-w-md space-y-8 bg-zinc-50 dark:bg-zinc-900/40 p-8 rounded-2xl border border-zinc-200/60 dark:border-zinc-800 shadow-2xl relative overflow-hidden">
        
        {/* Aesthetic premium gold trim accent */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>

        <div className="text-center space-y-2">
          <span className="text-[10px] font-bold tracking-[0.43em] text-yellow-600 dark:text-yellow-500 uppercase">
            {getTranslatedText("SARTORIAL RETREAT", "আভিজাত্যের আঙিনা")}
          </span>
          <h1 className="text-3xl font-black uppercase tracking-widest text-black dark:text-white">
            {getTranslatedText("SIGN IN", "প্রবেশ")}
          </h1>
          <p className="text-xs text-zinc-500 leading-relaxed font-semibold">
            {getTranslatedText("Wear Confidence with ROYMEN Bangladesh.", "রয়মেন কালেকশনে প্রবেশ করে পরিধান করুন আত্মবিশ্বাস।")}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 text-xs font-semibold text-zinc-650">
          
          <div className="space-y-1.5">
            <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
              {getTranslatedText("Registered Email:", "নিবন্ধিত ইমেইল ঠিকানা:")}
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
                placeholder="e.g. istiaque@roymen.com"
                className="w-full pl-10 pr-4 py-3 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 rounded focus:border-yellow-600 focus:outline-none focus:ring-1 focus:ring-yellow-600 text-zinc-900 dark:text-white font-bold"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-center">
              <label className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 dark:text-zinc-400 block">
                {getTranslatedText("Password:", "পাসওয়ার্ড:")}
              </label>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-zinc-400 pointer-events-none">
                <Lock size={14} />
              </span>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
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
              <span className="inline-block animate-pulse">{getTranslatedText("VERIFYING INVOICE...", "যাচাই করা হচ্ছে...")}</span>
            ) : (
              <>
                <LogIn size={14} />
                <span>{getTranslatedText("VERIFY IDENTITY", "লগইন করুন")}</span>
              </>
            )}
          </button>

        </form>

        <div className="text-center pt-2">
          <p className="text-xs text-zinc-400 font-medium">
            {getTranslatedText("New customer to ROYMEN?", "রয়মেনে প্রথমবার এসেছেন?")}{' '}
            <Link
              to="/register"
              className="text-black dark:text-white font-black uppercase hover:underline ml-1 inline-flex items-center"
            >
              <span>{getTranslatedText("Open Account", "অ্যাকাউন্ট খুলুন")}</span>
              <ArrowRight size={12} className="ml-0.5" />
            </Link>
          </p>
        </div>

      </div>
    </div>
  );
};
