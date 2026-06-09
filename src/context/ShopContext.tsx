import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, ToastMessage } from '../types';

interface UserAddress {
  name: string;
  phone: string;
  address: string;
  district: string;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  addresses?: UserAddress[];
}

interface ShopContextType {
  // Existing fields
  cart: CartItem[];
  wishlist: Product[];
  toasts: ToastMessage[];
  currency: 'BDT' | 'USD';
  language: 'en' | 'bn';
  getTranslatedText: (enText: string, bnText: string) => string;
  darkMode: boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (productId: string, size: string, color: string) => void;
  updateCartQuantity: (productId: string, size: string, color: string, quantity: number) => void;
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  addToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;
  toggleDarkMode: () => void;
  setLanguage: (lang: 'en' | 'bn') => void;
  setCurrency: (cur: 'BDT' | 'USD') => void;
  clearCart: () => void;
  cartCount: number;

  // New Full-Stack Authentication & State properties
  token: string | null;
  user: UserProfile | null;
  authLoading: boolean;
  products: Product[];
  productsLoading: boolean;
  
  // Auth Functions
  registerUser: (name: string, email: string, password: string) => Promise<boolean>;
  loginUser: (email: string, password: string) => Promise<boolean>;
  logoutUser: () => void;
  addUserAddress: (addr: UserAddress) => Promise<boolean>;
  refreshProducts: () => Promise<void>;

  // Order & Core workflow actions
  placeOrder: (billing: UserAddress, payMethod?: string, customTimeline?: string) => Promise<any | null>;
  trackOrder: (orderId: string) => Promise<any | null>;
  submitPaymentReceipt: (orderId: string, payMethod: 'bkash' | 'nagad', txid: string, sender: string, amount: number) => Promise<boolean>;
  getMyOrders: () => Promise<any[]>;
  postProductReview: (productId: string, rating: number, comment: string) => Promise<boolean>;

  // Administrative actions
  getAllOrders: () => Promise<any[]>;
  verifyPaymentAdmin: (orderId: string, approve: boolean) => Promise<boolean>;
  updateOrderStatusAdmin: (orderId: string, newStatus: string) => Promise<boolean>;
  createNewProductAdmin: (prodData: Partial<Product>) => Promise<boolean>;
  updateProductAdmin: (productId: string, prodData: Partial<Product>) => Promise<boolean>;
  deleteProductAdmin: (productId: string) => Promise<boolean>;
  getAdminAnalytics: () => Promise<any | null>;
  getAdminEmailLogs: () => Promise<any[]>;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

// Local fallback items in case API is launching or connecting
import { products as localInitialProducts } from '../data/products';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('roymen_cart');
    if (!saved) return [];
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) {
        return parsed.filter(item => item && item.product && typeof item.product === 'object' && item.product.id);
      }
    } catch (e) {
      console.error("Cart migration/corruption recovery:", e);
    }
    return [];
  });

  const [wishlist, setWishlist] = useState<Product[]>(() => {
    const saved = localStorage.getItem('roymen_wishlist');
    return saved ? JSON.parse(saved) : [];
  });

  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [currency, setCurrencyState] = useState<'BDT' | 'USD'>('BDT');
  const [language, setLanguageState] = useState<'en' | 'bn'>(() => {
    const saved = localStorage.getItem('roymen_lang');
    return (saved === 'bn' || saved === 'en') ? saved : 'en';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('roymen_darkMode');
    return saved === 'true';
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  // -------------------------------------------------------------
  // Full-Stack Custom Auth, Token, Live updates state
  // -------------------------------------------------------------
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('roymen_token') || null;
  });
  const [user, setUser] = useState<UserProfile | null>(() => {
    const saved = localStorage.getItem('roymen_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<Product[]>(localInitialProducts);
  const [productsLoading, setProductsLoading] = useState<boolean>(false);

  // Sync state variables to localStorage
  useEffect(() => {
    localStorage.setItem('roymen_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('roymen_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('roymen_lang', language);
  }, [language]);

  useEffect(() => {
    localStorage.setItem('roymen_darkMode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  // Sync token and user attributes
  useEffect(() => {
    if (token) {
      localStorage.setItem('roymen_token', token);
    } else {
      localStorage.removeItem('roymen_token');
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('roymen_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('roymen_user');
    }
  }, [user]);

  // Dynamically load products from full stack server API
  const refreshProducts = async () => {
    setProductsLoading(true);
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const liveProducts = await res.json();
        if (liveProducts && liveProducts.length > 0) {
          setProducts(liveProducts);
        }
      }
    } catch (err) {
      console.log("LOG: [ROYMEN] Failed loading products from Express API. Using local catalogs fallback...");
    } finally {
      setProductsLoading(false);
    }
  };

  // Sync user profile state at launch using session bearer
  const verifyMe = async (authToken: string) => {
    try {
      const res = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        // session expired
        setToken(null);
        setUser(null);
      }
    } catch (err) {
      console.log("LOG: [ROYMEN] Auth sync is pending backend start.");
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    refreshProducts();
    if (token) {
      verifyMe(token);
    } else {
      setAuthLoading(false);
    }
  }, [token]);

  // Toast controls
  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    addToast(
      darkMode ? 'Light mode enabled' : 'Dark mode enabled',
      'info'
    );
  };

  const setLanguage = (lang: 'en' | 'bn') => {
    setLanguageState(lang);
    addToast(
      lang === 'en' ? 'Language set to English' : 'ভাষা পরিবর্তন করা হয়েছে বাংলায়',
      'info'
    );
  };

  const setCurrency = (cur: 'BDT' | 'USD') => {
    setCurrencyState(cur);
    addToast(`Currency switched to ${cur}`, 'info');
  };

  const getTranslatedText = (enText: string, bnText: string) => {
    return language === 'en' ? enText : bnText;
  };

  // Cart operations
  const addToCart = (product: Product, size: string, color: string, qty: number = 1) => {
    if (!product.inStock) {
      addToast(
        getTranslatedText('This item is currently out of stock', 'এই পণ্যটি এখন স্টকে নেই'),
        'error'
      );
      return;
    }

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      );

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      } else {
        return [...prevCart, { product, selectedSize: size, selectedColor: color, quantity: qty }];
      }
    });

    addToast(
      getTranslatedText(
        `Added "${product.name}" (${size}/${color}) to bag.`,
        `"${product.name}" (${size}/${color}) কার্টে যোগ করা হয়েছে।`
      ),
      'success'
    );
  };

  const removeFromCart = (productId: string, size: string, color: string) => {
    setCart((prev) =>
      prev.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.selectedSize === size &&
            item.selectedColor === color
          )
      )
    );
  };

  const updateCartQuantity = (
    productId: string,
    size: string,
    color: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, color);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.product.id === productId &&
        item.selectedSize === size &&
        item.selectedColor === color
          ? { ...item, quantity }
          : item
      )
    );
  };

  const toggleWishlist = (product: Product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      addToast(
        getTranslatedText(
          `Removed "${product.name}" from your wishlist`,
          `আপনার উইশলিস্ট থেকে "${product.name}" মাইনাস করা হয়েছে`
        ),
        'info'
      );
    } else {
      setWishlist((prev) => [...prev, product]);
      addToast(
        getTranslatedText(
          `Added "${product.name}" to your wishlist`,
          `আপনার উইশলিস্টে "${product.name}" যোগ করা হয়েছে`
        ),
        'success'
      );
    }
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.id === productId);
  };

  const clearCart = () => {
    setCart([]);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  // -------------------------------------------------------------
  // Full-Stack Auth Functions implementation
  // -------------------------------------------------------------
  
  // Register Account
  const registerUser = async (name: string, email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        addToast(getTranslatedText("Sartorial profile registered!", "অ্যাকাউন্ট সফলভাবে নিবন্ধন করা হয়েছে!"), "success");
        return true;
      } else {
        addToast(data.message || getTranslatedText("Failed to register profile", "নিবন্ধন ব্যর্থ হয়েছে"), "error");
        return false;
      }
    } catch (err) {
      addToast(getTranslatedText("Server is unreachable. Retrying.", "সার্ভার কানেকশন ত্রুটি"), "error");
      return false;
    }
  };

  // Login Account
  const loginUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setUser(data.user);
        addToast(getTranslatedText(`Welcome back, ${data.user.name}!`, `স্বাগতম, ${data.user.name}!`), "success");
        return true;
      } else {
        addToast(data.message || getTranslatedText("Invalid email or password", "ইমেইল বা পাসওয়ার্ড ভুল"), "error");
        return false;
      }
    } catch (err) {
      addToast(getTranslatedText("Server connection failed.", "সার্ভার কানেকশন ত্রুটি"), "error");
      return false;
    }
  };

  // Sign out User
  const logoutUser = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('roymen_token');
    localStorage.removeItem('roymen_user');
    addToast(getTranslatedText("Logged out of session.", "সেশন থেকে লগআউট করা হয়েছে।"), "info");
  };

  // Create address records in db
  const addUserAddress = async (addr: UserAddress): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch('/api/auth/address', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(addr)
      });
      const data = await res.json();
      if (res.ok) {
        if (user) {
          setUser({ ...user, addresses: data.addresses });
        }
        addToast(getTranslatedText("Delivery coordinates stored!", "ঠিকানা সফলভাবে সংরক্ষণ করা হয়েছে"), "success");
        return true;
      } else {
        addToast(data.message || getTranslatedText("Failed saving address coordinates.", "ঠিকানা সংরক্ষণ করতে ব্যর্থ হয়েছে"), "error");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // -------------------------------------------------------------
  // Order & Payment submissions
  // -------------------------------------------------------------
  
  // Create Order in backend
  const placeOrder = async (billing: UserAddress, payMethod?: string, customTimeline?: string): Promise<any | null> => {
    const subtotal = cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
    const promoItem = localStorage.getItem('roymen_campaign_promo');
    let discountPercent = 0;
    if (promoItem) discountPercent = Number(promoItem);
    
    const discount = Math.round(subtotal * (discountPercent / 100));
    const deliveryFee = subtotal >= 5000 || subtotal === 0 ? 0 : (billing.district === 'Dhaka' ? 80 : 150);
    const total = subtotal + deliveryFee - discount;
    const timeline = customTimeline || (billing.district === 'Dhaka' ? '24 - 48 Hours' : '3 - 5 Days');

    const placementData = {
      userId: user?.id || null,
      billingDetails: billing,
      items: cart.map(item => ({
        productId: item.product.id,
        name: item.product.name,
        price: item.product.price,
        image: item.product.images[0],
        selectedSize: item.selectedSize,
        selectedColor: item.selectedColor,
        quantity: item.quantity
      })),
      subtotal,
      discount,
      deliveryFee,
      total,
      timeline,
      paymentMethod: payMethod || 'cod'
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(placementData)
      });
      const data = await res.json();
      if (res.ok) {
        clearCart();
        return data;
      } else {
        addToast(data.message || "Failed submitting order registry.", "error");
        return null;
      }
    } catch (err) {
      addToast("Failed deploying request logs.", "error");
      return null;
    }
  };

  // Submit manual transaction records for Nagad / bKash
  const submitPaymentReceipt = async (
    orderId: string,
    payMethod: 'bkash' | 'nagad',
    txid: string,
    sender: string,
    amount: number
  ): Promise<boolean> => {
    try {
      const res = await fetch(`/api/orders/${orderId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paymentMethod: payMethod,
          transactionId: txid,
          senderNumber: sender,
          paidAmount: amount
        })
      });
      const data = await res.json();
      if (res.ok) {
        addToast(getTranslatedText("Manual deposit TxID logged. Awaiting admin audit...", "ডিপোজিট কোড ট্র্যাকিংয়ে সেভ করা হয়েছে। অনুগ্রহ করে অপেক্ষা করুন"), "success");
        return true;
      } else {
        addToast(data.message || "Unmapped billing verification request.", "error");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // Fetch single order details for general tracker
  const trackOrder = async (orderId: string): Promise<any | null> => {
    try {
      const res = await fetch(`/api/orders/${orderId}`);
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.log("LOG: [ROYMEN] Failed tracking order coordinate.");
    }
    return null;
  };

  // Retrieve matching purchase histories for customer screen
  const getMyOrders = async (): Promise<any[]> => {
    if (!token) return [];
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.log("Failed downloading order items.");
    }
    return [];
  };

  // Post dynamic product reviews via backend
  const postProductReview = async (productId: string, rating: number, comment: string): Promise<boolean> => {
    if (!token) {
      addToast(getTranslatedText("Please login to post reviews.", "রিভিউ পোস্ট করতে লগইন করুন"), "error");
      return false;
    }
    try {
      const res = await fetch(`/api/products/${productId}/review`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ rating, comment, userName: user?.name })
      });
      if (res.ok) {
        addToast(getTranslatedText("Review registered. Thank you!", "রিভিউ দেওয়ার জন্য অসংখ্য ধন্যবাদ!"), "success");
        await refreshProducts(); // live reload specs
        return true;
      } else {
        const d = await res.json();
        addToast(d.message || "Review submission unsuccessful.", "error");
        return false;
      }
    } catch (err) {
      return false;
    }
  };

  // -------------------------------------------------------------
  // Administrative Operations
  // -------------------------------------------------------------
  const getAllOrders = async (): Promise<any[]> => {
    if (!token || user?.role !== 'admin') return [];
    try {
      const res = await fetch('/api/orders', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.log("Failed loading admin ledger.");
    }
    return [];
  };

  const verifyPaymentAdmin = async (orderId: string, approve: boolean): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/orders/${orderId}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ approve })
      });
      if (res.ok) {
        addToast(
          approve ? getTranslatedText("Deposit successfully verified & approved!", "পেমেন্ট সফলভাবে এপ্রুভ হয়েছে") : getTranslatedText("Payment logs rejected.", "পেমেন্ট প্রত্যাখ্যাত হয়েছে"),
          "success"
        );
        return true;
      }
    } catch (err) {
      console.log("Error verifying manual codes.");
    }
    return false;
  };

  const updateOrderStatusAdmin = async (orderId: string, newStatus: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/orders/${orderId}/status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ orderStatus: newStatus })
      });
      if (res.ok) {
        addToast(getTranslatedText(`Shipment timeline transitioned to: ${newStatus}`, `অর্ডারের অগ্রগতি পরিবর্তন হয়েছে: ${newStatus}`), "success");
        return true;
      }
    } catch (err) {
      console.log("Error saving shipment lifecycle progress.");
    }
    return false;
  };

  const createNewProductAdmin = async (prodData: Partial<Product>): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(prodData)
      });
      if (res.ok) {
        addToast(getTranslatedText("New catalog attire published!", "নতুন পোশাক কালেকশনে যোগ করা হয়েছে।"), "success");
        await refreshProducts();
        return true;
      }
    } catch (err) {
      console.log("Failed adding wardrobe row.");
    }
    return false;
  };

  const updateProductAdmin = async (productId: string, prodData: Partial<Product>): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(prodData)
      });
      if (res.ok) {
        addToast(getTranslatedText("Atelier attire layout customized!", "পোশাক সেটিংস সফলভাবে সেভ হয়েছে!"), "success");
        await refreshProducts();
        return true;
      }
    } catch (err) {
      console.log("Failed saving modifications.");
    }
    return false;
  };

  const deleteProductAdmin = async (productId: string): Promise<boolean> => {
    if (!token) return false;
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        addToast(getTranslatedText("Apparel deleted from collection.", "পোশাকটি সফলভাবে ডিলিট করা হয়েছে"), "success");
        await refreshProducts();
        return true;
      }
    } catch (err) {
      console.log("Failed deleting item.");
    }
    return false;
  };

  const getAdminAnalytics = async (): Promise<any | null> => {
    if (!token) return null;
    try {
      const res = await fetch('/api/admin/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.log("Failed collecting cockpit report arrays.");
    }
    return null;
  };

  const getAdminEmailLogs = async (): Promise<any[]> => {
    if (!token) return [];
    try {
      const res = await fetch('/api/admin/emails', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        return await res.json();
      }
    } catch (err) {
      console.log("Failed fetching dynamic email logs.");
    }
    return [];
  };

  return (
    <ShopContext.Provider
      value={{
        // Existing fields
        cart,
        wishlist,
        toasts,
        currency,
        language,
        getTranslatedText,
        darkMode,
        searchQuery,
        setSearchQuery,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        toggleWishlist,
        isInWishlist,
        addToast,
        removeToast,
        toggleDarkMode,
        setLanguage,
        setCurrency,
        clearCart,
        cartCount,

        // Full-Stack Auth & Live Product values
        token,
        user,
        authLoading,
        products,
        productsLoading,
        registerUser,
        loginUser,
        logoutUser,
        addUserAddress,
        refreshProducts,

        // Manual Payment Transactions & Orders
        placeOrder,
        submitPaymentReceipt,
        trackOrder,
        getMyOrders,
        postProductReview,

        // Admin Dash cockpit integrations
        getAllOrders,
        verifyPaymentAdmin,
        updateOrderStatusAdmin,
        createNewProductAdmin,
        updateProductAdmin,
        deleteProductAdmin,
        getAdminAnalytics,
        getAdminEmailLogs
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
