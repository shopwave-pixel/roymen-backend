import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useShop } from '../context/ShopContext';
import {
  Search,
  Truck,
  CreditCard,
  FileCheck2,
  Clock,
  Compass,
  CheckCircle,
  AlertCircle,
  HelpCircle,
  ShoppingBag,
  MapPin,
  Calendar
} from 'lucide-react';

export const OrderTracking: React.FC = () => {
  const { trackOrder, getTranslatedText } = useShop();
  const [searchParams] = useSearchParams();
  const [orderQuery, setOrderQuery] = useState('');
  const [order, setOrder] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [attempted, setAttempted] = useState(false);

  // Stepper statuses setup
  const STATUSES = [
    'Pending Payment',
    'Verification Pending',
    'Payment Approved',
    'Processing',
    'Shipped',
    'Delivered'
  ];

  const getStatusIndex = (status: string) => {
    // If Status is payment rejected, consider it index -1
    return STATUSES.indexOf(status);
  };

  const handleSearch = async (queryId: string) => {
    if (!queryId) return;
    setLoading(true);
    setAttempted(true);
    const data = await trackOrder(queryId.trim());
    setOrder(data);
    setLoading(false);
  };

  // Pre-load tracker coordinates if orderId is provided in URL queries
  useEffect(() => {
    const urlId = searchParams.get('orderId');
    if (urlId) {
      setOrderQuery(urlId);
      handleSearch(urlId);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(orderQuery);
  };

  return (
    <div className="bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 min-h-screen py-20 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto space-y-10">
        
        {/* Tracker title headers */}
        <div className="text-center space-y-2">
          <span className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-600 dark:text-yellow-500 block">
            ROYMEN TRAVEL CHANNELS
          </span>
          <h1 className="text-3xl font-black uppercase tracking-wider text-black dark:text-white">
            {getTranslatedText("REAL-TIME ORDER TRACKING", "অর্ডার লাইভ ট্র্যাকিং")}
          </h1>
          <p className="text-xs text-zinc-500 font-semibold max-w-md mx-auto leading-relaxed">
            {getTranslatedText(
              "Type your unique ROYMEN Booking receipt code below to check verification status and shipment logistics dispatch.",
              "আপনার কার্ট অর্ডার রশিদ আইডি টাইপ করে শিপিং ট্র্যাকিং এবং পেমেন্ট রুল্স ভেরিফিকেশন দেখে নিন।"
            )}
          </p>
        </div>

        {/* Query Input field */}
        <form onSubmit={handleSubmit} className="relative max-w-lg mx-auto">
          <input
            type="text"
            value={orderQuery}
            onChange={(e) => setOrderQuery(e.target.value)}
            placeholder="e.g. RM-582103"
            className="w-full py-4 pl-5 pr-14 bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full focus:outline-none focus:ring-1 focus:ring-yellow-600 focus:border-yellow-600 font-bold tracking-wider text-sm shadow-xl shadow-zinc-100/50 dark:shadow-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="absolute inset-y-1.5 right-1.5 px-5 bg-black hover:bg-zinc-900 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-white rounded-full transition-all flex items-center justify-center space-x-1"
          >
            {loading ? (
              <Clock size={16} className="animate-spin" />
            ) : (
              <>
                <Search size={14} />
                <span className="text-[10px] font-black uppercase tracking-widest">{getTranslatedText("FIND", "সার্চ")}</span>
              </>
            )}
          </button>
        </form>

        {/* SEARCH TARGET FOUND RESULTS */}
        {order ? (
          <div className="space-y-8 bg-zinc-50 dark:bg-zinc-900/20 rounded-2xl border border-zinc-200 dark:border-zinc-850 p-6 sm:p-8 shadow-2xl relative overflow-hidden transition-all duration-300">
            
            {/* Visual Gold highlighter band */}
            <div className="absolute top-0 right-0 left-0 h-1.5 bg-yellow-500"></div>

            {/* Receipt Summary Row */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 block uppercase font-mono">ORDER BOOK REF ID</span>
                <strong className="text-sm font-black text-black dark:text-white font-mono">{order.orderId}</strong>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 block uppercase font-mono">DISPATCHING GATEWAY</span>
                <strong className="text-sm font-black text-black dark:text-white uppercase">
                  {order.paymentMethod === 'pay_dc' 
                    ? getTranslatedText("Pay DC (Advance Charge)", "অগ্রিম ডেলিভারি চার্জ পেমেন্ট") 
                    : `${order.paymentMethod.toUpperCase()} Delivery`}
                </strong>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] text-zinc-400 block uppercase font-mono">ESTIMATED TIMELINE</span>
                <strong className="text-sm font-black text-yellow-600 dark:text-yellow-500 uppercase flex items-center">
                  <Calendar size={13} className="mr-1 inline" /> {order.timeline}
                </strong>
              </div>
            </div>

            {/* IF ORDER STATE IS PAYMENT REJECTED */}
            {order.orderStatus === 'Payment Rejected' && (
              <div className="p-4 bg-red-100 text-red-800 dark:bg-red-950/20 dark:text-red-400 rounded-xl space-y-1.5 flex items-start gap-3">
                <AlertCircle className="shrink-0 mt-0.5" size={18} />
                <div className="text-xs font-semibold leading-relaxed">
                  <p className="font-extrabold uppercase tracking-wide">STATUS EXCEPTION: TRANSACTION DEPOSIT REJECTED</p>
                  <p>{getTranslatedText("Our accounts department could not verify the Transaction ID code you submitted. Please go to your personal Dashboard controls to submit the code again, or reach out to support.", "আপনার দেওয়া ডিপোজিট ট্রানজেকশন ক্লিয়ার করা সম্ভব হয়নি। অনুগ্রহ করে ড্যাশবোর্ডে গিয়ে সঠিক ট্রানজেকশন কোড দিন অথবা কন্টাক্ট করুন।")}</p>
                </div>
              </div>
            )}

            {/* VERIFY TIMELINE STEPPING PROCESS BAR */}
            {order.orderStatus !== 'Payment Rejected' && (
              <div className="space-y-6 py-4">
                <h3 className="text-[11px] font-black uppercase text-zinc-400 tracking-[0.2em]">
                  Fulfillment Status Flow Progress
                </h3>
                
                {/* Stepper list */}
                <div className="relative">
                  
                  {/* Stepper vertical line on background */}
                  <div className="absolute top-2 bottom-2 left-4 w-0.5 bg-zinc-200 dark:bg-zinc-800"></div>

                  <div className="space-y-6 relative">
                    {STATUSES.map((st, i) => {
                      const activeIndex = getStatusIndex(order.orderStatus);
                      const isCompleted = i <= activeIndex;
                      const isCurrent = i === activeIndex;

                      return (
                        <div key={st} className="flex items-start space-x-4 pl-0.5">
                          
                          {/* Dot item indicator */}
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 border-2 z-10 font-bold font-mono text-xs ${
                            isCompleted
                              ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white animate-pulse'
                              : 'bg-white text-zinc-300 dark:bg-zinc-950 border-zinc-200 dark:border-zinc-800 text-zinc-400'
                          }`}>
                            {i + 1}
                          </div>

                          {/* Detail text */}
                          <div className="pt-0.5 text-xs font-semibold">
                            <span className={`uppercase font-black text-[11px] tracking-wider block ${
                              isCurrent ? 'text-yellow-600 dark:text-yellow-500' : (isCompleted ? 'text-black dark:text-white' : 'text-zinc-400')
                            }`}>
                              {st}
                            </span>
                            <span className="text-[10px] text-zinc-400 block font-medium mt-0.5">
                              {st === 'Pending Payment' && getTranslatedText("Order placed. Submit money bKash/Nagad send-money receipts.", "অর্ডার রিসিভ করা হয়েছে")}
                              {st === 'Verification Pending' && getTranslatedText("Manuel payment transaction ID validation in progress by admins.", "অ্যাডমিন পেমেন্ট কোড যাচাই করছেন")}
                              {st === 'Payment Approved' && getTranslatedText("Account cleared and transaction code successfully authorized.", "পেমেন্ট সফলভাবে এপ্রুভ করা হয়েছে")}
                              {st === 'Processing' && getTranslatedText("Apparel fabrics is currently being tailored, and double-stitched.", "পোশাকটি টেইলারিং ও প্যাকেজিং করা হচ্ছে")}
                              {st === 'Shipped' && getTranslatedText("Assigned to local Dhaka Courier channels or express dispatch.", "ডিউটি কুরিয়ার ডেলিভারিতে হস্তান্তর করা হয়েছে")}
                              {st === 'Delivered' && getTranslatedText("Garment received gracefully directly at customer doorstep.", "পণ্যটি গ্রাহক হাতে বুঝে পেয়েছেন")}
                            </span>
                          </div>

                        </div>
                      );
                    })}
                  </div>

                </div>
              </div>
            )}

            {/* List packages matching receipt checkout */}
            <div className="space-y-4 pt-6 border-t border-zinc-200 dark:border-zinc-800">
              <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-wider">
                ITEMIZED ORDER RECEIPT
              </h4>
              <div className="space-y-2.5">
                {order.items.map((item: any, i: number) => (
                  <div key={i} className="flex justify-between items-center text-xs font-semibold font-mono text-zinc-500">
                    <span className="text-zinc-900 dark:text-zinc-100 font-sans font-bold">
                      {item.name} ({item.selectedSize} | {item.selectedColor}) <span className="font-normal text-zinc-405 font-mono">x{item.quantity}</span>
                    </span>
                    <span>৳{(item.price * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
                
                <div className="border-t border-dashed pt-2 flex justify-between items-center text-xs font-bold text-black dark:text-white">
                  <span>{getTranslatedText("Total Billing Due:", "সর্বমোট পরিশোধিত মূল্য:")}</span>
                  <span className="font-mono text-sm font-black text-yellow-600 dark:text-yellow-500">৳{order.total.toLocaleString()}</span>
                </div>

                {order.paymentMethod === 'pay_dc' && (
                  <div className="mt-3 p-3 bg-yellow-500/5 border border-yellow-500/20 rounded text-[11px] space-y-1 text-zinc-650 dark:text-zinc-350 font-semibold leading-relaxed">
                    <div className="flex justify-between font-bold text-yellow-600 dark:text-yellow-455">
                      <span>{getTranslatedText("Advance Delivery Charge (DC) Paid:", "পরিশোধিত অগ্রিম ডেলিভারি চার্জ:")}</span>
                      <span className="font-mono">৳{order.deliveryFee}</span>
                    </div>
                    <div className="flex justify-between font-bold text-zinc-900 dark:text-white pt-1 border-t border-dashed border-zinc-200 dark:border-zinc-800">
                      <span>{getTranslatedText("Remaining Pay Cash on Delivery (COD):", "বাকি ক্যাশ অন ডেলিভারি (পণ্য পাওয়ার পর পরিশোধযোগ্য):")}</span>
                      <span className="font-mono">৳{(order.total - order.deliveryFee).toLocaleString()}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Shipping address details info */}
            <div className="p-4 bg-zinc-100/50 dark:bg-zinc-900/50 rounded-xl space-y-1.5 text-xs text-zinc-550 leading-relaxed font-semibold">
              <p className="font-extrabold uppercase text-black dark:text-white text-[10px] inline-flex items-center">
                <MapPin size={12} className="mr-1" />
                <span>DELIVERY DISPATCH COORDINATES:</span>
              </p>
              <p className="font-bold text-zinc-700 dark:text-zinc-300">Recipient Name: {order.billingDetails.name}</p>
              <p>📍 Location Address: {order.billingDetails.address}, <strong className="text-zinc-900 dark:text-zinc-100">{order.billingDetails.district} (Bangladesh)</strong></p>
              <p>📞 Phone Coordinate: +88{order.billingDetails.phone}</p>
            </div>

          </div>
        ) : (
          attempted && !loading && (
            <div className="py-12 text-center rounded-2xl border border-dashed text-xs text-zinc-400 font-semibold space-y-3">
              <AlertCircle size={32} className="mx-auto text-yellow-600" />
              <p>{getTranslatedText("Order ID not found. Verify your booking coupon print.", "এই অর্ডার আইডি ট্রেড করা যায়নি। পুনরায় কোড চেক করে লিখুন।")}</p>
            </div>
          )
        )}

      </div>
    </div>
  );
};
