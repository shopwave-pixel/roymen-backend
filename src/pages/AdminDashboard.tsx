import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  ShoppingBag,
  Users,
  TrendingUp,
  Package,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  Clock,
  LayoutGrid,
  Percent,
  CheckSquare,
  AlertCircle,
  Truck,
  HeartHandshake,
  UploadCloud,
  Image as ImageIcon,
  Mail
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    user,
    token,
    products,
    getTranslatedText,
    getAllOrders,
    getAdminAnalytics,
    verifyPaymentAdmin,
    updateOrderStatusAdmin,
    createNewProductAdmin,
    updateProductAdmin,
    deleteProductAdmin,
    getAdminEmailLogs,
    addToast
  } = useShop();

  const navigate = useNavigate();

  // Redirect if unauthorized 
  useEffect(() => {
    if (!token) {
      navigate('/login');
    } else if (user && user.role !== 'admin') {
      addToast(getTranslatedText("Administrator privileges required.", "অ্যাডমিন রুলস কোড প্রয়োজন"), "error");
      navigate('/dashboard');
    }
  }, [token, user, navigate]);

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'emails'>('analytics');
  
  // States loaded from dynamic endpoints
  const [analytics, setAnalytics] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [emailLogs, setEmailLogs] = useState<any[]>([]);
  const [loadingAnalytics, setLoadingAnalytics] = useState(true);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [loadingEmails, setLoadingEmails] = useState(false);

  // Dynamic Product Form Dialog states
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any | null>(null);
  const [prodName, setProdName] = useState('');
  const [prodPrice, setProdPrice] = useState('');
  const [prodOriginalPrice, setProdOriginalPrice] = useState('');
  const [prodCategory, setProdCategory] = useState('T-Shirts');
  const [prodDesc, setProdDesc] = useState('');
  const [prodImage, setProdImage] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      addToast(getTranslatedText("Please upload only image files.", "অনুগ্রহ করে শুধু ইমেজ ফাইল আপলোড করুন"), "error");
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      addToast(getTranslatedText("File is too large. Max 5MB allowed.", "ফাইলটি অনেক বড়। সর্বোচ্চ ৫ মেগাবাইট অনুমোদিত"), "error");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        setProdImage(reader.result);
        addToast(getTranslatedText("Apparel image loaded successfully!", "পোশাকের ছবি সফলভাবে আপলোড হয়েছে!"), "success");
      }
    };
    reader.onerror = () => {
      addToast(getTranslatedText("Error reading files.", "ফাইলটি ওপেন করতে সমস্যা হয়েছে"), "error");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };
  const [prodSizes, setProdSizes] = useState<string[]>(['S', 'M', 'L', 'XL']);
  const [prodColors, setProdColors] = useState<string[]>(['Stealth Black']);

  // Load Admin metrics & sales entries from server API
  const loadAnalytics = async () => {
    setLoadingAnalytics(true);
    const data = await getAdminAnalytics();
    if (data) setAnalytics(data);
    setLoadingAnalytics(false);
  };

  const loadOrders = async () => {
    setLoadingOrders(true);
    const data = await getAllOrders();
    setOrders(data);
    setLoadingOrders(false);
  };

  const loadEmails = async () => {
    setLoadingEmails(true);
    const data = await getAdminEmailLogs();
    setEmailLogs(data);
    setLoadingEmails(false);
  };

  useEffect(() => {
    if (token && user?.role === 'admin') {
      loadAnalytics();
      loadOrders();
      loadEmails();
    }
  }, [token, user]);

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prodName || !prodPrice || !prodDesc || !prodImage) {
      addToast(getTranslatedText("Complete name, pricing, description, and photo url", "সকল তথ্য পূরণ করুন"), "error");
      return;
    }

    const payload = {
      name: prodName,
      price: Number(prodPrice),
      originalPrice: prodOriginalPrice ? Number(prodOriginalPrice) : undefined,
      category: prodCategory,
      description: prodDesc,
      images: [prodImage],
      sizes: prodSizes,
      colors: prodColors,
      inStock: true
    };

    let success = false;
    if (editingProduct) {
      success = await updateProductAdmin(editingProduct.id, payload);
    } else {
      success = await createNewProductAdmin(payload);
    }

    if (success) {
      setIsProductModalOpen(false);
      setEditingProduct(null);
      // Reset state form fields
      setProdName('');
      setProdPrice('');
      setProdOriginalPrice('');
      setProdDesc('');
      setProdImage('');
    }
  };

  const triggerEditProduct = (p: any) => {
    setEditingProduct(p);
    setProdName(p.name);
    setProdPrice(String(p.price));
    setProdOriginalPrice(String(p.originalPrice || ''));
    setProdCategory(p.category);
    setProdDesc(p.description);
    setProdImage(p.images[0] || '');
    setProdSizes(p.sizes || ['S', 'M', 'L']);
    setProdColors(p.colors || ['Stealth Black']);
    setIsProductModalOpen(true);
  };

  // Status Logistics management helper calls
  const handleVerifyPayment = async (orderId: string, approve: boolean) => {
    const ok = await verifyPaymentAdmin(orderId, approve);
    if (ok) {
      loadOrders(); // reload
      loadAnalytics();
    }
  };

  const handleUpdateStatus = async (orderId: string, status: string) => {
    const ok = await updateOrderStatusAdmin(orderId, status);
    if (ok) {
      loadOrders(); // reload
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="py-20 text-center font-bold text-zinc-400">
        Redirecting to authorized login desk...
      </div>
    );
  }

  // Aggregate Category calculations fallback if server results are zero
  const metrics = analytics?.metrics || {
    totalOrders: orders.length,
    activeProducts: products.length,
    totalCustomers: 2,
    approvedRevenue: orders
      .filter(o => o.orderStatus === 'Payment Approved' || o.orderStatus === 'Processing' || o.orderStatus === 'Shipped' || o.orderStatus === 'Delivered')
      .reduce((sum, o) => sum + o.total, 0),
    pendingVerifications: orders.filter(o => o.orderStatus === 'Verification Pending').length
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 min-h-screen pb-24 transition-colors duration-300">
      
      {/* Sleek golden corporate administrative banner */}
      <div className="bg-black text-white py-12 relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 w-2 bg-yellow-500"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-wider">
              <span>✦ BRAND CONSOLE</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-widest text-white">
              ROYMEN ADMIN COCKPIT
            </h1>
            <p className="text-xs font-semibold text-yellow-500 leading-relaxed font-mono">
              MANAGING PRESET CHANNELS OF MENSWEAR IN BANGLADESH.
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 border border-yellow-600 hover:bg-yellow-600/10 text-yellow-500 text-xs font-black uppercase tracking-widest rounded transition-all"
          >
            {getTranslatedText("Back User Desk", "গ্রাহক ড্যাশবোর্ড")}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation rail for administrative tabs */}
          <nav className="lg:col-span-3 space-y-2 border border-zinc-150 dark:border-zinc-850 p-4 rounded-xl bg-zinc-50 dark:bg-zinc-900/30">
            {[
              { id: 'analytics', label: 'Operational Analytics', icon: TrendUpIcon },
              { id: 'products', label: 'Wardrobe Catalog', icon: PackIcon },
              { id: 'orders', label: 'Fulfillment & Payments', icon: ShopBagIcon },
              { id: 'emails', label: 'Email Notifications', icon: Mail }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-black uppercase tracking-wider text-left transition-all ${
                  activeTab === tab.id
                    ? 'bg-black text-white dark:bg-white dark:text-black'
                    : 'hover:bg-zinc-150 dark:hover:bg-zinc-800 text-zinc-500 dark:text-zinc-400'
                }`}
              >
                <tab.icon size={14} />
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>

          <main className="lg:col-span-9 space-y-8">
            
            {/* TAB 1: OPERATIONAL COCKPIT ANALYTICS */}
            {activeTab === 'analytics' && (
              <div className="space-y-8">
                
                <h2 className="text-xl font-black uppercase tracking-widest pb-3 border-b text-black dark:text-white">
                  {getTranslatedText("Cockpit Management Reports", "ব্যবসায়িক ওভারভিউ ও অ্যানালিটিক্স")}
                </h2>

                {loadingAnalytics ? (
                  <div className="py-20 text-center font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                    Aggregating operational totals...
                  </div>
                ) : (
                  <>
                    {/* Bento grid metric blocks */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                      
                      <div className="bg-zinc-50 dark:bg-zinc-900/40 border p-5 rounded-xl space-y-2">
                        <div className="flex justify-between text-zinc-400">
                          <span className="text-[10px] font-bold tracking-wider uppercase">Approved Cash Flow</span>
                          <TrendingUp size={16} className="text-yellow-500" />
                        </div>
                        <p className="text-2xl font-black font-mono text-black dark:text-white">
                          ৳{metrics.approvedRevenue.toLocaleString()}
                        </p>
                        <span className="text-[10px] text-zinc-400 font-medium block">Approved transaction receipts</span>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-900/40 border p-5 rounded-xl space-y-2">
                        <div className="flex justify-between text-zinc-400">
                          <span className="text-[10px] font-bold tracking-wider uppercase">Fulfillment Audits</span>
                          <AlertCircle size={16} className="text-yellow-600" />
                        </div>
                        <p className="text-2xl font-black font-mono text-black dark:text-white">
                          {metrics.pendingVerifications}
                        </p>
                        <span className="text-[10px] text-zinc-400 font-medium block">Awaiting payment verification</span>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-900/40 border p-5 rounded-xl space-y-2">
                        <div className="flex justify-between text-zinc-400">
                          <span className="text-[10px] font-bold tracking-wider uppercase">Apparel Designs</span>
                          <Package size={16} className="text-black dark:text-white" />
                        </div>
                        <p className="text-2xl font-black font-mono text-black dark:text-white">
                          {metrics.activeProducts}
                        </p>
                        <span className="text-[10px] text-zinc-400 font-medium block">Live active listings</span>
                      </div>

                      <div className="bg-zinc-50 dark:bg-zinc-900/40 border p-5 rounded-xl space-y-2">
                        <div className="flex justify-between text-zinc-400">
                          <span className="text-[10px] font-bold tracking-wider uppercase">Approved Orders</span>
                          <ShoppingBag size={16} className="text-black dark:text-white" />
                        </div>
                        <p className="text-2xl font-black font-mono text-black dark:text-white">
                          {metrics.totalOrders}
                        </p>
                        <span className="text-[10px] text-zinc-400 font-medium block">Life cycle coordinates</span>
                      </div>

                    </div>

                    {/* Simple Category distributions */}
                    <div className="p-6 border rounded-xl bg-zinc-50/50 dark:bg-zinc-900/20 space-y-4">
                      <h3 className="text-xs font-black uppercase tracking-wider text-black dark:text-white">
                        Bangladesh Distribution Category Spread
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                        {analytics?.categoryPopularity?.map((c: any) => (
                          <div key={c.name} className="bg-white dark:bg-zinc-950 p-3 rounded border text-center font-semibold text-xs text-zinc-500">
                            <span className="block text-[10px] uppercase text-zinc-400">{c.name}</span>
                            <strong className="text-sm font-black text-black dark:text-white font-mono mt-0.5 inline-block">{c.value} items</strong>
                          </div>
                        )) || (
                          <p className="text-xs text-zinc-400 italic">No distribution analytics logs active.</p>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* TAB 2: WARDROBE CATALOG DYNAMIC DIRECTORY */}
            {activeTab === 'products' && (
              <div className="space-y-6">
                
                <div className="flex items-center justify-between pb-3 border-b text-black dark:text-white">
                  <h2 className="text-xl font-black uppercase tracking-widest">
                    {getTranslatedText("Wardrobe Collection Directory", "পোশাক সামগ্রী নিয়ন্ত্রণ প্যানেল")}
                  </h2>
                  <button
                    onClick={() => { setEditingProduct(null); setIsProductModalOpen(true); }}
                    className="px-4 py-2 bg-black hover:bg-zinc-850 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-widest rounded flex items-center space-x-1.5"
                  >
                    <Plus size={14} />
                    <span>{getTranslatedText("Add Apparel design", "নতুন পোশাক")}</span>
                  </button>
                </div>

                {/* Wardrobe listing Table */}
                <div className="border border-zinc-150 dark:border-zinc-850 rounded-xl overflow-hidden bg-zinc-50/20">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-zinc-100 dark:bg-zinc-900 border-b text-zinc-500 font-extrabold text-[10px] uppercase tracking-wider">
                          <th className="p-4">SKU / ID</th>
                          <th className="p-4">Fabric Style / Apparel Name</th>
                          <th className="p-4">Sartorial Category</th>
                          <th className="p-4">Price (৳ BDT)</th>
                          <th className="p-4 text-center">In Stock?</th>
                          <th className="p-4 text-center">Modify</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-200 dark:divide-zinc-800 text-zinc-650 font-semibold">
                        {products.map(p => (
                          <tr key={p.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/50">
                            <td className="p-4 font-mono font-bold text-yellow-600 dark:text-yellow-500">{p.sku || p.id}</td>
                            <td className="p-4">
                              <div className="flex items-center space-x-3">
                                <img src={p.images[0] || null} alt="" className="w-8 aspect-[3/4] object-cover rounded bg-zinc-100" />
                                <span className="font-bold text-black dark:text-white line-clamp-1">{p.name}</span>
                              </div>
                            </td>
                            <td className="p-4 text-zinc-500 uppercase">{p.category}</td>
                            <td className="p-4 font-mono font-bold text-black dark:text-white">৳{p.price.toLocaleString()}</td>
                            <td className="p-4 text-center">
                              <span className={`inline-block px-2 py-0.5 text-[9px] font-black uppercase rounded ${
                                p.inStock ? 'bg-green-100 text-green-700 dark:bg-green-950/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-950/20 dark:text-red-400'
                              }`}>
                                {p.inStock ? 'Yes' : 'No'}
                              </span>
                            </td>
                            <td className="p-4">
                              <div className="flex items-center justify-center space-x-2">
                                <button
                                  onClick={() => triggerEditProduct(p)}
                                  className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-850 rounded text-blue-600 hover:text-blue-800 transition-all"
                                  title="Edit apparel specs"
                                >
                                  <Edit2 size={13} />
                                </button>
                                <button
                                  onClick={() => deleteProductAdmin(p.id)}
                                  className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-850 rounded text-red-600 hover:text-red-850 transition-all"
                                  title="Delete alignment"
                                >
                                  <Trash2 size={13} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}

            {/* TAB 3: PAYMENT VERIFICATION & LOGISTICS WORKFLOW */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                
                <h2 className="text-xl font-black uppercase tracking-widest pb-3 border-b text-black dark:text-white">
                  {getTranslatedText("Fulfillment Logistics Registry & Audits", "ডেলিভারি নিয়ন্ত্রণ ও পেমেন্ট ভেরিফিকেশন")}
                </h2>

                {loadingOrders ? (
                  <div className="py-20 text-center font-mono text-zinc-500">
                    Downloading purchase ledger logs...
                  </div>
                ) : orders.length === 0 ? (
                  <p className="text-xs text-zinc-400 italic">No logistics orders generated yet.</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map(o => (
                      <div key={o.id || o.orderId} className="border border-zinc-200 dark:border-zinc-800 p-5 rounded-xl space-y-4 bg-zinc-50/20 hover:border-yellow-500/20 transition-all">
                        
                        {/* Summary coordinate row */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs pb-3 border-b border-zinc-150 dark:border-zinc-800">
                          <div>
                            <p className="font-mono text-zinc-400 uppercase text-[10px]">ORDER REF STRING</p>
                            <span className="font-mono font-black text-black dark:text-white">{o.orderId}</span>
                          </div>

                          <div>
                            <p className="font-mono text-zinc-400 uppercase text-[10px]">RECIPIENT COORDINATE</p>
                            <span className="font-bold text-black dark:text-white capitalize">{o.billingDetails.name} (+88{o.billingDetails.phone})</span>
                          </div>

                          <div>
                            <p className="font-mono text-zinc-400 uppercase text-[10px]">TOTAL INVOICE BILLING</p>
                            <span className="font-mono font-black text-yellow-600 dark:text-yellow-500">৳{o.total.toLocaleString()}</span>
                          </div>

                          <div>
                            <p className="font-mono text-zinc-400 uppercase text-[10px]">LOGISTICS STATE</p>
                            <select
                              value={o.orderStatus}
                              onChange={(e) => handleUpdateStatus(o.id || o.orderId, e.target.value)}
                              className="px-2.5 py-1 bg-white dark:bg-zinc-950 font-bold border rounded text-[10px] font-black tracking-widest uppercase text-yellow-600 focus:outline-none"
                            >
                              {['Pending Payment', 'Verification Pending', 'Payment Approved', 'Processing', 'Shipped', 'Delivered', 'Payment Rejected'].map(st => (
                                <option key={st} value={st}>{st}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        {/* Visual check on manual deposit Transaction proof codes requested * */}
                        {o.paymentInfo && (
                          <div className="p-4 bg-zinc-100/70 dark:bg-zinc-900/40 rounded-xl space-y-3 border border-zinc-200/40">
                            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-yellow-600 dark:text-yellow-500 shrink-0 flex items-center">
                              <HeartHandshake className="mr-1" size={14} />
                              <span>
                                {o.paymentMethod === 'pay_dc' 
                                  ? "ADVANCE DELIVERY CHARGE DEPOSIT AUDIT VERIFICATION REQUESTED:" 
                                  : "MANUAL DEPOSIT VERIFICATION AUDIT REQUEST SENT:"}
                              </span>
                            </p>

                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                              <div>
                                <span className="text-[10px] uppercase text-zinc-400 block font-mono">GATE OPERATOR</span>
                                <strong className="text-black dark:text-white text-[13px] tracking-wider uppercase font-black text-pink-600">{o.paymentInfo.paymentMethod.toUpperCase()} WALLET</strong>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase text-zinc-400 block font-mono">SENDER MOBILE</span>
                                <strong className="text-black dark:text-white font-mono text-[13px]">{o.paymentInfo.senderNumber}</strong>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase text-zinc-400 block font-mono">SUBMITTED TRXID CODE</span>
                                <strong className="text-yellow-600 font-mono text-[13px] tracking-widest font-black underline">{o.paymentInfo.transactionId}</strong>
                              </div>
                              <div>
                                <span className="text-[10px] uppercase text-zinc-400 block font-mono">PAID VALUE AT ENTRY</span>
                                <strong className="text-black dark:text-white font-mono text-[13px]">৳{Number(o.paymentInfo.paidAmount).toLocaleString()}</strong>
                                {o.paymentMethod === 'pay_dc' && (
                                  <span className="text-[9px] block text-yellow-600 dark:text-yellow-500 font-extrabold font-sans">
                                    (DC FEE INVOICED: ৳{o.deliveryFee})
                                  </span>
                                )}
                              </div>
                            </div>

                            {/* Verification workflow accept/deny buttons */}
                            {o.paymentInfo.paymentStatus === 'Pending Verification' && (
                              <div className="flex gap-2.5 pt-2.5 border-t border-dashed justify-end">
                                <button
                                  onClick={() => handleVerifyPayment(o.id || o.orderId, false)}
                                  className="px-3.5 py-1.5 bg-red-100 hover:bg-red-200 dark:bg-red-950/20 text-red-700 dark:text-red-400 text-[10px] font-black uppercase tracking-wider rounded inline-flex items-center space-x-1"
                                >
                                  <X size={12} />
                                  <span>REJECT DEPOSIT TRXID</span>
                                </button>
                                <button
                                  onClick={() => handleVerifyPayment(o.id || o.orderId, true)}
                                  className="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 dark:bg-emerald-950/30 text-emerald-800 dark:text-emerald-400 text-[10px] font-black uppercase tracking-wider rounded inline-flex items-center space-x-1"
                                >
                                  <Check size={12} />
                                  <span>APPROVE DEPOSIT</span>
                                </button>
                              </div>
                            )}

                            {o.paymentInfo.paymentStatus !== 'Pending Verification' && (
                              <div className="text-[10px] text-zinc-400 font-medium pt-1 font-mono uppercase tracking-wider">
                                Reviewed By: {o.paymentInfo.verifiedBy} | Time: {new Date(o.paymentInfo.verifiedAt).toLocaleString()} | Verdict Status: <strong className="text-black dark:text-white font-extrabold">{o.paymentInfo.paymentStatus}</strong>
                              </div>
                            )}
                          </div>
                        )}

                        {/* List items requested in Order checkout */}
                        <div className="pl-4 border-l-2 border-zinc-200 dark:border-zinc-800 py-1 text-xs space-y-1.5">
                          {o.items.map((item: any, idx: number) => (
                            <p key={idx} className="font-semibold">
                              • <strong className="font-black text-zinc-800 dark:text-zinc-200">{item.name}</strong> ({item.selectedSize} | {item.selectedColor}) x <span className="font-black font-mono">{item.quantity}</span>
                            </p>
                          ))}
                        </div>

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: AUTOMATIC EMAIL NOTIFICATION HISTORY */}
            {activeTab === 'emails' && (
              <div className="space-y-6 animate-fade-in">
                
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-3 border-b gap-4">
                  <div>
                    <h2 className="text-xl font-black uppercase tracking-widest text-black dark:text-white">
                      Auto-Email Notifications Desk
                    </h2>
                    <p className="text-xs text-zinc-500 font-mono mt-1">
                      Real-time customer automatic invoice delivery tracking.
                    </p>
                  </div>
                  <button
                    onClick={loadEmails}
                    disabled={loadingEmails}
                    className="px-4 py-2 bg-zinc-900 border border-zinc-850 hover:bg-zinc-800 text-white dark:bg-zinc-50 dark:text-black dark:border-white text-[10px] font-black uppercase tracking-[0.14em] rounded transition-all disabled:opacity-50"
                  >
                    {loadingEmails ? "Refreshing Logs..." : "Force Refresh Logs"}
                  </button>
                </div>

                {loadingEmails ? (
                  <div className="py-20 text-center font-mono text-zinc-500 bg-zinc-50 dark:bg-zinc-900 rounded-xl">
                    Syncing notification pipelines...
                  </div>
                ) : emailLogs.length === 0 ? (
                  <div className="border border-dashed border-zinc-200 dark:border-zinc-800 p-12 text-center rounded-xl space-y-4 bg-zinc-50/10">
                    <div className="mx-auto w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400">
                      <Mail size={22} />
                    </div>
                    <div className="space-y-1">
                      <p className="text-xs font-bold text-zinc-800 dark:text-zinc-200">
                        No automatic emails sent yet.
                      </p>
                      <p className="text-[10px] text-zinc-400 max-w-sm mx-auto leading-relaxed">
                        Order confirmation invoices are automatically sent to customer email on checkout. Complete an order to generate logs!
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-4 flex gap-3 text-xs text-emerald-800 dark:text-emerald-450 items-start">
                      <AlertCircle className="shrink-0 mt-0.5" size={16} />
                      <div>
                        <strong>Nodemailer Sandbox test previews active:</strong> Clicking the preview link below will open a spectacular live customer email rendering showing products, sizes, pricing metadata, and responsive luxury invoice branding!
                      </div>
                    </div>

                    <div className="border border-zinc-150 dark:border-zinc-850 rounded-xl overflow-hidden bg-white dark:bg-zinc-950">
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                          <thead>
                            <tr className="bg-zinc-50 dark:bg-zinc-900 text-[10px] uppercase font-black tracking-wider text-zinc-500 border-b border-zinc-150 dark:border-zinc-850">
                              <th className="py-3.5 px-4 font-mono">Recipient Customer</th>
                              <th className="py-3.5 px-4 font-mono">Invoice Subject</th>
                              <th className="py-3.5 px-4 font-mono">Timestamp</th>
                              <th className="py-3.5 px-4 font-mono">Action</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-zinc-150 dark:divide-zinc-850 text-xs font-semibold">
                            {emailLogs.map((log: any) => (
                              <tr key={log.id} className="hover:bg-zinc-50/50 dark:hover:bg-zinc-900/10 transition-colors">
                                <td className="py-4 px-4 font-mono">
                                  <div className="font-bold text-zinc-900 dark:text-white">{log.to}</div>
                                  <div className="text-[10px] text-zinc-400">Order ID: {log.orderId}</div>
                                </td>
                                <td className="py-4 px-4">
                                  <div className="text-zinc-800 dark:text-zinc-200">{log.subject}</div>
                                  <span className={`inline-block mt-1 px-1.5 py-0.5 text-[9px] uppercase font-bold tracking-wide rounded ${
                                    log.status === 'simulated' ? 'bg-yellow-500/10 text-yellow-600' : log.status === 'sent' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'
                                  }`}>
                                    {log.status === 'simulated' ? 'Dynamic Sandbox Test' : log.status === 'sent' ? 'SMTP Live Delivered' : 'Failed Send'}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-zinc-405 font-mono text-[10px]">
                                  {new Date(log.sentAt).toLocaleString()}
                                </td>
                                <td className="py-4 px-4">
                                  {log.previewUrl ? (
                                    <a
                                      href={log.previewUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-yellow-500 hover:bg-yellow-600 text-black font-mono text-[9px] font-black uppercase tracking-wider rounded transition-all"
                                    >
                                      <span>Click to Preview Web Mail</span>
                                    </a>
                                  ) : (
                                    <span className="text-[10px] text-zinc-400 italic font-mono">SMTP Direct Delivery</span>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

          </main>

        </div>
      </div>

      {/* DETAILED DYNAMIC DIALOG MODAL: Create or Edit Wardrobe catalog details */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-950 max-w-lg w-full rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:border-yellow-500/20 shadow-2xl p-6 sm:p-8 space-y-5 relative overflow-hidden animate-[slate-in_0.3s_ease]">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>

            <div className="flex justify-between items-center pb-2 border-b">
              <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
                {editingProduct ? getTranslatedText("Edit Wardrobe specifications", "পোশাক সামগ্রী এডিট করুন") : getTranslatedText("Publish new Wardrobe design", "নতুন পোশাক কালেকশনে অ্যাড করুন")}
              </h3>
              <button
                onClick={() => setIsProductModalOpen(false)}
                className="text-zinc-400 hover:text-black hover:bg-zinc-100 rounded p-1"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs font-semibold">
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 block">Garment Model name:</label>
                <input
                  type="text" required value={prodName} onChange={(e) => setProdName(e.target.value)}
                  placeholder="e.g. Classic Crimson Oxford Shirt"
                  className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 block">Sale Price (৳ BDT) *</label>
                  <input
                    type="number" required value={prodPrice} onChange={(e) => setProdPrice(e.target.value)}
                    placeholder="1850"
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded font-mono font-bold text-zinc-950 dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 block">Strike original price (Optional ৳ BDT)</label>
                  <input
                    type="number" value={prodOriginalPrice} onChange={(e) => setProdOriginalPrice(e.target.value)}
                    placeholder="2450"
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded font-mono text-zinc-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 block">Sartorial Category:</label>
                  <select
                    value={prodCategory} onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-bold"
                  >
                    {["T-Shirts", "Polo Shirts", "Casual Shirts", "Formal Shirts", "Jeans", "Trousers", "Panjabi", "Hoodies", "Jackets", "Footwear", "Accessories"].map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] uppercase text-zinc-400 block font-mono">In Stock Status:</label>
                  <div className="flex items-center h-[38px] px-3 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded">
                    <input
                      type="checkbox"
                      id="in-stock-checkbox"
                      defaultChecked={true}
                      className="w-4 h-4 text-yellow-500 border-zinc-300 rounded focus:ring-yellow-500"
                    />
                    <label htmlFor="in-stock-checkbox" className="ml-2 text-xs text-zinc-650 dark:text-zinc-350 select-none cursor-pointer">
                      Garment design active in stock
                    </label>
                  </div>
                </div>
              </div>

              {/* Enhanced Product Image Upload Zone */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase text-zinc-400 block font-bold font-mono">
                  Product Image / Apparel Photo:
                </label>

                {/* Drag and Drop Container */}
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`relative border-2 border-dashed rounded-xl p-6 transition-all duration-200 text-center cursor-pointer ${
                    isDragging
                      ? 'border-yellow-500 bg-yellow-50/10'
                      : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-700 bg-zinc-50/50 dark:bg-zinc-900/10'
                  }`}
                  onClick={() => document.getElementById('product-file-input')?.click()}
                >
                  <input
                    type="file"
                    id="product-file-input"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {prodImage ? (
                    <div className="flex flex-col sm:flex-row items-center gap-4 text-left" onClick={(e) => e.stopPropagation()}>
                      <img
                        src={prodImage}
                        alt="Garment Preview"
                        className="w-24 h-32 object-cover rounded shadow border dark:border-zinc-800 shrink-0"
                      />
                      <div className="flex-1 space-y-2">
                        <p className="text-xs text-zinc-500 dark:text-zinc-400 font-bold">
                          Apparel picture loaded successfully ({prodImage.startsWith('data:') ? 'Base64 Local Data' : 'Remote Image URL'})
                        </p>
                        <button
                          type="button"
                          onClick={() => setProdImage('')}
                          className="px-3 py-1.5 bg-red-100 dark:bg-red-950/20 text-red-700 dark:text-red-400 hover:bg-red-200 rounded text-[10px] font-black uppercase tracking-wider inline-flex items-center space-x-1"
                        >
                          <Trash2 size={12} />
                          <span>Remove Picture</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-4 space-y-2">
                      <div className="p-3 bg-zinc-100 dark:bg-zinc-850 rounded-full text-zinc-400 dark:text-zinc-650">
                        <UploadCloud size={24} />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                          {getTranslatedText("Drag & drop design file, or click to browse", "ছবি ড্র্যাগ করে এখানে ছাড়ুন, অথবা ক্লিক করে ফাইল সিলেক্ট করুন")}
                        </p>
                        <p className="text-[10px] text-zinc-400">
                          Formats: JPG, PNG, WEBP (Max 5MB)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* URL Input Backup for precise control */}
                <div className="space-y-1 pt-1.5 border-t border-dashed border-zinc-100 dark:border-zinc-900">
                  <div className="flex justify-between items-center">
                    <span className="text-[9px] uppercase text-zinc-400 font-semibold">Or use direct image address:</span>
                    {prodImage && (
                      <span className="text-[9px] text-zinc-400 max-w-[200px] truncate font-mono">
                        {prodImage.startsWith('data:') ? '[Base64 Binary Content]' : prodImage}
                      </span>
                    )}
                  </div>
                  <input
                    type="text"
                    value={prodImage.startsWith('data:') ? '' : prodImage}
                    onChange={(e) => setProdImage(e.target.value)}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded font-bold text-zinc-950 dark:text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 block">Sartorial Description details:</label>
                <textarea
                  required value={prodDesc} onChange={(e) => setProdDesc(e.target.value)}
                  placeholder="Tailored detailing, Mercerized cotton styling..."
                  className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white"
                  rows={2}
                />
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="w-1/2 py-3 bg-zinc-150 text-zinc-800 dark:bg-zinc-900 dark:text-white text-[10px] font-black uppercase tracking-widest rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest rounded"
                >
                  {editingProduct ? getTranslatedText("SAVE DESIGN", "সংরক্ষণ করুন") : getTranslatedText("PUBLISH DESIGN", "আপলোড সম্পন্ন করুন")}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
};

// Layout Icons mapping placeholders
const TrendUpIcon: React.FC<any> = (props) => <TrendingUp {...props} />;
const PackIcon: React.FC<any> = (props) => <Package {...props} />;
const ShopBagIcon: React.FC<any> = (props) => <ShoppingBag {...props} />;
