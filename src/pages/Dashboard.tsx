import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  MapPin,
  ShoppingBag,
  History,
  Lock,
  Plus,
  Compass,
  ArrowRight,
  ShieldAlert,
  Clock,
  Briefcase,
  CheckCircle,
  XCircle,
  HelpCircle,
  CreditCard
} from 'lucide-react';

export const Dashboard: React.FC = () => {
  const {
    user,
    token,
    logoutUser,
    getTranslatedText,
    addUserAddress,
    getMyOrders,
    submitPaymentReceipt,
    addToast
  } = useShop();

  const navigate = useNavigate();

  // Redirect to login if user session is void
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');
  const [orders, setOrders] = useState<any[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  // Address Form States
  const [newAddrName, setNewAddrName] = useState('');
  const [newAddrPhone, setNewAddrPhone] = useState('');
  const [newAddrText, setNewAddrText] = useState('');
  const [newAddrDistrict, setNewAddrDistrict] = useState('Dhaka');

  // Manual payment state triggers
  const [selectedOrderToPay, setSelectedOrderToPay] = useState<any | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'nagad'>('bkash');
  const [txid, setTxid] = useState('');
  const [senderNo, setSenderNo] = useState('');
  const [paidAmt, setPaidAmt] = useState('');
  const [submittingPayment, setSubmittingPayment] = useState(false);

  useEffect(() => {
    if (selectedOrderToPay) {
      if (selectedOrderToPay.paymentMethod === 'pay_dc') {
        setPaidAmt(String(selectedOrderToPay.deliveryFee));
      } else {
        setPaidAmt(String(selectedOrderToPay.total));
      }
    } else {
      setPaidAmt('');
    }
  }, [selectedOrderToPay]);

  // Fetch orders from database
  const loadOrders = async () => {
    if (!token) return;
    setLoadingOrders(true);
    const data = await getMyOrders();
    setOrders(data);
    setLoadingOrders(false);
  };

  useEffect(() => {
    if (token) {
      loadOrders();
    }
  }, [token]);

  const handleAddAddress = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddrName || !newAddrPhone || !newAddrText) {
      addToast(getTranslatedText("Specify name, mobile and street details", "নাম, মোবাইল নম্বর এবং ঠিকানা পূরণ করুন"), "error");
      return;
    }

    const success = await addUserAddress({
      name: newAddrName,
      phone: newAddrPhone,
      address: newAddrText,
      district: newAddrDistrict
    });

    if (success) {
      setNewAddrName('');
      setNewAddrPhone('');
      setNewAddrText('');
    }
  };

  const handleVerifySubmission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!txid || !senderNo || !paidAmt || !selectedOrderToPay) {
      addToast(getTranslatedText("Submit complete TrxID and deposit coordinates", "ট্রানজেকশন আইডি এবং বিকাশ/নগদ নম্বর প্রদান করুন"), "error");
      return;
    }

    setSubmittingPayment(true);
    const success = await submitPaymentReceipt(
      selectedOrderToPay.orderId || selectedOrderToPay.id,
      paymentMethod,
      txid.trim().toUpperCase(),
      senderNo.trim(),
      Number(paidAmt)
    );
    setSubmittingPayment(false);

    if (success) {
      setSelectedOrderToPay(null);
      setTxid('');
      setSenderNo('');
      setPaidAmt('');
      loadOrders(); // reload with updated Verification level status
    }
  };

  if (!user) {
    return (
      <div className="bg-white dark:bg-zinc-950 min-h-screen py-20 text-center text-zinc-400">
        <Clock className="animate-spin mx-auto mb-2" />
        <span>Syncing server credentials...</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-100 min-h-screen pb-20 transition-colors duration-300">
      
      {/* Banner styling with premium golden highlight */}
      <div className="bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-150 dark:border-zinc-850 py-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-yellow-500"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-yellow-500/10 text-yellow-600 dark:text-yellow-500 rounded-full text-[10px] font-black uppercase tracking-wider">
              <span>✦ {user.role === 'admin' ? "ADMIN PRIVILEGES ACTIVE" : "SARTORIAL LEDGER"}</span>
            </div>
            <h1 className="text-3xl font-black uppercase tracking-wider text-black dark:text-white">
              {user.name}
            </h1>
            <p className="text-xs font-mono text-zinc-400">EMAIL: {user.email}</p>
          </div>

          <div className="flex space-x-3">
            {user.role === 'admin' && (
              <Link
                to="/admin-dashboard"
                className="px-6 py-3 bg-yellow-600 hover:bg-yellow-700 text-white font-black text-xs uppercase tracking-widest rounded transition-all shadow-xl shadow-yellow-600/10"
              >
                {getTranslatedText("Admin Cockpit", "অ্যাডমিন প্যানেল")}
              </Link>
            )}
            <button
              onClick={logoutUser}
              className="px-6 py-3 bg-black text-white hover:bg-zinc-850 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-black uppercase tracking-widest rounded"
            >
              {getTranslatedText("Sign Out", "লগআউট")}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Navigation drawer links sidebar (col: 3) */}
          <aside className="lg:col-span-3 space-y-2 border border-zinc-150 dark:border-zinc-850 p-4 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/30">
            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-black uppercase tracking-wider text-left transition-all ${
                activeTab === 'orders'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <ShoppingBag size={14} />
              <span>{getTranslatedText("Sartorial Orders", "আপনার অর্ডারসমূহ")}</span>
            </button>

            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-black uppercase tracking-wider text-left transition-all ${
                activeTab === 'profile'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <User size={14} />
              <span>{getTranslatedText("Tailor Profile", "প্রোফাইল সেটিং")}</span>
            </button>

            <button
              onClick={() => setActiveTab('addresses')}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded text-xs font-black uppercase tracking-wider text-left transition-all ${
                activeTab === 'addresses'
                  ? 'bg-black text-white dark:bg-white dark:text-black'
                  : 'hover:bg-zinc-100 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400'
              }`}
            >
              <MapPin size={14} />
              <span>{getTranslatedText("Dispatch Addresses", "ডেলিভারি ঠিকানা সমূহ")}</span>
            </button>

            <div className="border-t border-zinc-200 dark:border-zinc-800 my-4 pt-4 text-center">
              <Link to="/shop" className="text-xs text-yellow-600 dark:text-yellow-500 hover:underline inline-flex items-center font-bold uppercase tracking-widest">
                <span>{getTranslatedText("Catalog Closet", "শপ গ্যালারি")}</span>
                <ArrowRight size={12} className="ml-1" />
              </Link>
            </div>
          </aside>

          {/* Active segments container (col: 9) */}
          <main className="lg:col-span-9 space-y-6">
            
            {/* 1. ORDERS WORKFLOW TAB */}
            {activeTab === 'orders' && (
              <div className="space-y-6">
                
                <h2 className="text-xl font-black uppercase tracking-widest text-black dark:text-white pb-3 border-b border-zinc-100 dark:border-zinc-900">
                  {getTranslatedText("Order Purchase Histories", "আপনার অর্ডারের বিবরণ ও ট্র্যাকিং")}
                </h2>

                {loadingOrders ? (
                  <div className="py-20 text-center font-mono text-zinc-500">
                    Downloading purchase archives...
                  </div>
                ) : orders.length === 0 ? (
                  <div className="py-16 text-center border border-dashed rounded-xl border-zinc-200 dark:border-zinc-850 space-y-4">
                    <History size={48} className="mx-auto text-zinc-300 stroke-1" />
                    <p className="text-xs text-zinc-400 italic">
                      {getTranslatedText("No purchases logged. Elevate your closet list today.", "আপনার কোন অর্ডার করার রেকর্ড নেই")}
                    </p>
                    <Link to="/shop" className="inline-block px-6 py-2.5 bg-black hover:bg-zinc-900 text-white dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest rounded">
                      {getTranslatedText("Browse Menswear", "নতুন ড্রেস শপ করুন")}
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((o) => (
                      <div key={o.id || o.orderId} className="border border-zinc-150 dark:border-zinc-850 bg-zinc-50/30 dark:bg-zinc-900/10 rounded-xl p-5 space-y-4 transition-all">
                        
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-zinc-150 dark:border-zinc-850 text-xs">
                          <div>
                            <p className="font-black text-black dark:text-white uppercase tracking-wider">
                              {getTranslatedText("ORDER REF ID:", "অর্ডার আইডি:")} <span className="font-mono text-yellow-600 dark:text-yellow-500">{o.orderId}</span>
                            </p>
                            <p className="text-[10px] text-zinc-400 font-medium mt-0.5">PLACED: {new Date(o.createdAt).toLocaleString()}</p>
                          </div>
                          
                          <div className="flex items-center space-x-2 shrink-0">
                            <span className="text-[11px] font-extrabold uppercase text-zinc-400 shrink-0">STATUS:</span>
                            <span className={`px-2.5 py-1 rounded text-[10px] font-black uppercase tracking-widest ${
                              o.orderStatus === 'Pending Payment' ? 'bg-orange-100 text-orange-700 dark:bg-orange-950/20 dark:text-orange-400' :
                              o.orderStatus === 'Verification Pending' ? 'bg-blue-100 text-blue-750 dark:bg-blue-950/30 dark:text-blue-400' :
                              o.orderStatus === 'Payment Approved' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/20 dark:text-emerald-400' :
                              o.orderStatus === 'Processing' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/20 dark:text-indigo-400' :
                              o.orderStatus === 'Shipped' ? 'bg-purple-100 text-purple-750 dark:bg-purple-950/20 dark:text-purple-400' :
                              o.orderStatus === 'Delivered' ? 'bg-green-100 text-green-800 dark:bg-green-950/25 dark:text-green-400' :
                              'bg-zinc-100 text-zinc-700 dark:bg-zinc-850 dark:text-zinc-350'
                            }`}>
                              {o.orderStatus}
                            </span>
                          </div>
                        </div>

                        {/* Order Items List */}
                        <div className="space-y-3.5">
                          {o.items.map((item: any, i: number) => (
                            <div key={i} className="flex justify-between items-center text-xs">
                              <div className="flex items-center space-x-3.5">
                                <img src={item.image || null} alt="" className="w-10 aspect-[3/4] object-cover rounded bg-zinc-100 dark:bg-zinc-950" />
                                <div>
                                  <p className="font-bold text-zinc-900 dark:text-zinc-100 line-clamp-1">{item.name}</p>
                                  <p className="text-[10px] text-zinc-400 font-mono mt-0.5">{item.selectedSize} | {item.selectedColor} (x{item.quantity})</p>
                                </div>
                              </div>
                              <span className="font-mono font-bold">৳{(item.price * item.quantity).toLocaleString()}</span>
                            </div>
                          ))}
                        </div>

                        {/* Totals Recaps & Trigger for manual deposit verification codes */}
                        <div className="border-t border-zinc-150 dark:border-zinc-850 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                          <div className="text-xs font-semibold space-y-0.5">
                            <div>
                              {getTranslatedText("Total Billing:", "টোটাল বিল:")} <strong className="text-zinc-900 dark:text-white font-mono text-sm font-black">৳{o.total.toLocaleString()}</strong>
                            </div>
                            {o.paymentMethod === 'pay_dc' && (
                              <div className="text-[10px] text-yellow-600 dark:text-yellow-500 font-bold uppercase tracking-wide">
                                {getTranslatedText(`[Pay DC Method: ৳${o.deliveryFee} advance delivery charge, ৳${o.total - o.deliveryFee} cash on delivery]`, `[অগ্রিম কুরিয়ার চার্জ পেমেন্ট: ৳${o.deliveryFee} এবং বাকি ৳${o.total - o.deliveryFee} ক্যাশ অন ডেলিভারি]`)}
                              </div>
                            )}
                          </div>

                          <div className="flex space-x-2.5 w-full sm:w-auto justify-end">
                            {/* IF Pending payment, display Deposit submitting interface */}
                            {o.orderStatus === 'Pending Payment' && (
                              <button
                                onClick={() => setSelectedOrderToPay(o)}
                                className="px-4 py-2 text-[10px] bg-yellow-600 hover:bg-yellow-700 text-white font-black uppercase tracking-widest rounded flex items-center space-x-1.5"
                              >
                                <CreditCard size={12} />
                                <span>
                                  {o.paymentMethod === 'pay_dc' 
                                    ? getTranslatedText("Submit Advance Delivery Charge", "ডেলিভারি চার্জের টাকা সাবমিট করুন")
                                    : getTranslatedText("Submit bKash / Nagad TxID", "পেমেন্ট ট্রানজেকশন দিন")
                                  }
                                </span>
                              </button>
                            )}
                            <Link
                              to={`/order-tracking?orderId=${o.orderId}`}
                              className="px-4 py-2 border border-zinc-200 dark:border-zinc-800 text-[10px] text-zinc-600 hover:text-black dark:text-zinc-400 dark:hover:text-white font-black uppercase tracking-wider rounded"
                            >
                              {getTranslatedText("Track Order Dispatch", "অর্ডার লাইভ ট্র্যাকিং")}
                            </Link>
                          </div>
                        </div>

                        {/* Nested Payment Logs Details if they exist */}
                        {o.paymentInfo && (
                          <div className="mt-3 p-3 bg-zinc-100 dark:bg-zinc-900/50 rounded-lg text-[11px] text-zinc-500 font-semibold space-y-1">
                            <p className="font-extrabold text-zinc-700 dark:text-zinc-350 uppercase tracking-widest text-[9px] text-yellow-600 dark:text-yellow-500">
                              💰 DEPOSIT DETAILS SENT FOR MANUAL VERIFICATION:
                            </p>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono">
                              <div><span className="text-[10px] uppercase text-zinc-400 block">METHOD</span> <span className="font-black text-black dark:text-white">{o.paymentInfo.paymentMethod.toUpperCase()}</span></div>
                              <div><span className="text-[10px] uppercase text-zinc-400 block">SENDER MOBILE</span> <span className="font-semibold text-black dark:text-white">{o.paymentInfo.senderNumber}</span></div>
                              <div><span className="text-[10px] uppercase text-zinc-400 block">TRXID LOG CODE</span> <span className="font-black text-yellow-600">{o.paymentInfo.transactionId}</span></div>
                              <div><span className="text-[10px] uppercase text-zinc-400 block">VERIFIED STATUS</span> <span className="font-black text-black dark:text-white">{o.paymentInfo.paymentStatus}</span></div>
                            </div>
                          </div>
                        )}

                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 2. PROFILE TAB */}
            {activeTab === 'profile' && (
              <div className="bg-zinc-50 dark:bg-zinc-900/20 p-6 sm:p-8 border border-zinc-150 dark:border-zinc-850 rounded-xl space-y-6">
                <h2 className="text-xl font-black uppercase tracking-widest text-black dark:text-white">
                  {getTranslatedText("Sartorial Profile Ledger", "গ্রাহকের ব্যক্তিগত তথ্য")}
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-zinc-500 font-semibold">
                  <div className="space-y-1 bg-white dark:bg-zinc-950 p-4 border rounded-lg">
                    <span className="text-[10px] text-zinc-400 block uppercase tracking-wide">Client Registered Name:</span>
                    <strong className="text-sm font-black text-black dark:text-white">{user.name}</strong>
                  </div>

                  <div className="space-y-1 bg-white dark:bg-zinc-950 p-4 border rounded-lg">
                    <span className="text-[10px] text-zinc-400 block uppercase tracking-wide">Email Coordinates:</span>
                    <strong className="text-sm font-black text-black dark:text-white">{user.email}</strong>
                  </div>

                  <div className="space-y-1 bg-white dark:bg-zinc-950 p-4 border rounded-lg">
                    <span className="text-[10px] text-zinc-400 block uppercase tracking-wide">Registry Clearance:</span>
                    <strong className="text-sm font-black text-black dark:text-white uppercase text-yellow-600">{user.role} Privilege</strong>
                  </div>

                  <div className="space-y-1 bg-white dark:bg-zinc-950 p-4 border rounded-lg">
                    <span className="text-[10px] text-zinc-400 block uppercase tracking-wide">Nation Shipping Gate:</span>
                    <strong className="text-sm font-black text-black dark:text-white uppercase font-mono">Bangladesh (৳ BDT)</strong>
                  </div>
                </div>
              </div>
            )}

            {/* 3. ADDRESS TAB */}
            {activeTab === 'addresses' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* Lists saved address elements */}
                <div className="space-y-4">
                  <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white pb-2 border-b">
                    {getTranslatedText("Saved Shipping Coordinates", "সংরক্ষিত ঠিকানা সমূহ")}
                  </h3>

                  {!user.addresses || user.addresses.length === 0 ? (
                    <p className="text-xs text-zinc-400 italic">
                      {getTranslatedText("No dispatch locations archived yet. Add one to speed up checkouts.", "কোন সংরক্ষিত ঠিকানা পাওয়া যায়নি")}
                    </p>
                  ) : (
                    <div className="space-y-3">
                      {user.addresses.map((a, i) => (
                        <div key={i} className="p-4 border rounded-lg bg-zinc-50 dark:bg-zinc-900/30 text-xs text-zinc-650 leading-relaxed space-y-1.5 font-medium relative overflow-hidden">
                          <p className="font-extrabold text-black dark:text-white uppercase tracking-wider">{a.name}</p>
                          <p>📍 {a.address}, <strong className="text-black dark:text-white font-bold">{a.district}</strong></p>
                          <p>📞 Phone: {a.phone}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Form to submit and create a new address record */}
                <div className="bg-zinc-50 dark:bg-zinc-900/30 border border-zinc-150 dark:border-zinc-850 rounded-xl p-5 space-y-4 font-semibold text-xs text-zinc-600">
                  <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
                    {getTranslatedText("Archive New Dispatch Coordinates", "নতুন শিপিং ঠিকানা যোগ করুন")}
                  </h3>

                  <form onSubmit={handleAddAddress} className="space-y-4 text-xs font-semibold">
                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 block">Recipient Name:</label>
                      <input
                        type="text" required value={newAddrName} onChange={(e) => setNewAddrName(e.target.value)}
                        placeholder="e.g. Istiaque Kabir"
                        className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 block">Bangladeshi Mobile Phone:</label>
                      <input
                        type="tel" required value={newAddrPhone} onChange={(e) => setNewAddrPhone(e.target.value)}
                        placeholder="017xxxxxxxx"
                        className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-bold"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 block">Home District Selection :</label>
                      <select
                        value={newAddrDistrict} onChange={(e) => setNewAddrDistrict(e.target.value)}
                        className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-bold"
                      >
                        {["Dhaka", "Chittagong", "Sylhet", "Khulna", "Rajshahi", "Barisal", "Rangpur", "Mymensingh"].map(d => (
                          <option key={d} value={d}>{d}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] uppercase text-zinc-400 block">Full Street Address:</label>
                      <textarea
                        required rows={2} value={newAddrText} onChange={(e) => setNewAddrText(e.target.value)}
                        placeholder="House, Sector, Road, Locality..."
                        className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest rounded"
                    >
                      {getTranslatedText("ARCHIVE COORDINATES", "সংরক্ষণ করুন")}
                    </button>
                  </form>
                </div>

              </div>
            )}

          </main>

        </div>
      </div>

      {/* POPUP OVERLAY PANEL: Submission portal for Nagad or bKash MANUAL DEPOSITS verification logs */}
      {selectedOrderToPay && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-white max-w-md w-full rounded-2xl border border-zinc-300 dark:border-zinc-800 shadow-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden animate-[slide-in_0.3s_ease]">
            
            {/* Trim gold accent */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-yellow-500"></div>

            <div className="flex justify-between items-center pb-2 border-b border-zinc-200 dark:border-zinc-800">
              <h3 className="text-sm font-black uppercase tracking-widest text-black dark:text-white">
                {getTranslatedText("Manual Deposit Submission", "ক্যাশ পেমেন্ট ভেরিফিকেশন")}
              </h3>
              <button
                onClick={() => setSelectedOrderToPay(null)}
                className="text-zinc-400 hover:text-zinc-650 font-bold text-xs"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-zinc-100 dark:bg-zinc-900 rounded-lg text-xs leading-relaxed text-zinc-550 dark:text-zinc-350 font-semibold">
              <p>
                {selectedOrderToPay.paymentMethod === 'pay_dc' ? (
                  getTranslatedText(
                    "Advance Delivery Charge transfers must be processed through 'Send Money' matching courier fee to our recipient contact: +880 1721 922927 (Nagad/bKash). Proceed to submit deposit coordinates:",
                    "ডেলিভারি চার্জের অগ্রিম টাকা আমাদের বিকাশ/নগদ নাম্বারে পাঠান: +880 1721 922927। পেমেন্ট করা হয়ে গেলে অনুগ্রহ করে নিচের বক্সে ট্রানজেকশন তথ্য সাবমিট করুন:"
                  )
                ) : (
                  getTranslatedText(
                    "Transfers must be processed through 'Cash Out' or 'Send Money' matching total value to our recipient contact: +880 1721 922927 (Nagad/bKash). Proceed to submit deposit coordinates:",
                    "আমাদের অফিশিয়াল সেন্ডমানি নাম্বারে মূল্য পরিশোধ করুন: +880 1721 922927। পেমেন্ট করা হয়ে গেলে অনুগ্রহ করে নিচের বক্সে ট্রানজেকশন তথ্য সাবমিট করুন:"
                  )
                )}
              </p>
              <p className="mt-2 text-yellow-600 dark:text-yellow-500 font-extrabold uppercase">
                {selectedOrderToPay.paymentMethod === 'pay_dc' ? (
                  getTranslatedText(`Advance Delivery Charge: BDT ৳${selectedOrderToPay.deliveryFee.toLocaleString()} (Remaining checkout COD matches BDT ৳${(selectedOrderToPay.total - selectedOrderToPay.deliveryFee).toLocaleString()})`, `অগ্রিম ডেলিভারি চার্জ: BDT ৳${selectedOrderToPay.deliveryFee.toLocaleString()} (বাকি ৳${(selectedOrderToPay.total - selectedOrderToPay.deliveryFee).toLocaleString()} ক্যাশ অন ডেলিভারি)`)
                ) : (
                  getTranslatedText(`Billing Amount due: BDT ৳${selectedOrderToPay.total.toLocaleString()}`, `পরিশোধযোগ্য সর্বমোট বিল: BDT ৳${selectedOrderToPay.total.toLocaleString()}`)
                )}
              </p>
            </div>

            <form onSubmit={handleVerifySubmission} className="space-y-4 text-xs font-semibold">
              
              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 block pb-1">Payment Wallet Gateway Operator :</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('bkash')}
                    className={`py-2 px-3 border text-xs font-extrabold rounded uppercase tracking-wider text-center ${
                      paymentMethod === 'bkash' ? 'border-pink-500 text-pink-600 bg-pink-500/5' : 'border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    bKash Wallet
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('nagad')}
                    className={`py-2 px-3 border text-xs font-extrabold rounded uppercase tracking-wider text-center ${
                      paymentMethod === 'nagad' ? 'border-orange-500 text-orange-600 bg-orange-500/5' : 'border-zinc-200 dark:border-zinc-800'
                    }`}
                  >
                    Nagad Wallet
                  </button>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 block">Sender Mobile Phone Number used for deposit *</label>
                <input
                  type="text" required value={senderNo} onChange={(e) => setSenderNo(e.target.value)}
                  placeholder="e.g. 01721xxxxxx"
                  className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 block">Transaction ID (TXID) code from receipt *</label>
                <input
                  type="text" required value={txid} onChange={(e) => setTxid(e.target.value)}
                  placeholder="e.g. K9C2D2E4"
                  className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-bold font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] uppercase text-zinc-400 block">Paid Amount (৳ BDT) *</label>
                <input
                  type="number" required value={paidAmt} onChange={(e) => setPaidAmt(e.target.value)}
                  placeholder={String(selectedOrderToPay.total)}
                  className="w-full p-2.5 bg-white dark:bg-zinc-950 border border-zinc-200 rounded text-zinc-950 dark:text-white font-mono font-bold"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderToPay(null)}
                  className="w-1/2 py-3 bg-zinc-100 hover:bg-zinc-200 text-zinc-800 dark:bg-zinc-900 dark:text-white dark:hover:bg-zinc-800 text-[10px] font-black uppercase tracking-widest rounded"
                >
                  {getTranslatedText("CANCEL", "বাতিল")}
                </button>
                <button
                  type="submit"
                  disabled={submittingPayment}
                  className="w-1/2 py-3 bg-black text-white hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-[10px] font-black uppercase tracking-widest rounded"
                >
                  {submittingPayment ? getTranslatedText("SENDING...", "পাঠানো হচ্ছে...") : getTranslatedText("SUBMIT PROOF", "সাবমিট করুন")}
                </button>
              </div>

            </form>

          </div>
        </div>
      )}

    </div>
  );
};
