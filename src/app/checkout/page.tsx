"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Lock, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CheckoutPage() {
  const { items, getCartTotal, clearCart } = useCartStore();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const subtotal = getCartTotal();
  const shipping = subtotal > 99 ? 0 : 15;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    clearCart();
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto px-4 py-20 max-w-3xl text-center">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-[#1E1E1E] border border-gray-800 p-16 rounded-sm shadow-sm flex flex-col items-center"
        >
          <CheckCircle2 className="w-24 h-24 text-[#FFC107] mb-8" />
          <h1 className="text-4xl font-bold text-white tracking-wider mb-4 uppercase">
            Order Confirmed
          </h1>
          <p className="text-gray-400 mb-10 max-w-md font-medium text-lg leading-relaxed">
            Thank you for your purchase. Your professional gear is being prepped and will ship shortly.
          </p>
          <Link 
            href="/shop"
            className="bg-[#FFC107] hover:bg-[#ffca28] text-black font-bold uppercase py-4 px-10 rounded-sm transition-colors shadow-sm"
          >
            Continue Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
        <Link href="/shop" className="text-[#FFC107] hover:underline font-bold">Go to Shop</Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <Link href="/cart" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FFC107] transition-colors text-sm font-bold uppercase tracking-wider mb-8">
        <ArrowLeft className="w-4 h-4" /> Back to Cart
      </Link>

      <h1 className="text-3xl font-bold text-white tracking-wider mb-10 border-b border-gray-800 pb-4 uppercase">
        Checkout
      </h1>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Checkout Form */}
        <div className="lg:w-2/3">
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-6">
            
            <div className="bg-[#1E1E1E] border border-gray-800 rounded-sm overflow-hidden">
              <div className="bg-[#111111] p-4 border-b border-gray-800 flex items-center gap-3">
                <Lock className="w-5 h-5 text-[#FFC107]" />
                <h2 className="text-lg font-bold text-white uppercase tracking-wider">
                  Shipping
                </h2>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">First Name</label>
                  <input required type="text" className="w-full bg-[#111111] border border-gray-800 focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] outline-none text-white p-3 rounded-sm transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Last Name</label>
                  <input required type="text" className="w-full bg-[#111111] border border-gray-800 focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] outline-none text-white p-3 rounded-sm transition-all" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Street Address</label>
                  <input required type="text" className="w-full bg-[#111111] border border-gray-800 focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] outline-none text-white p-3 rounded-sm transition-all" />
                </div>
              </div>
            </div>

            <div className="bg-[#1E1E1E] border border-gray-800 rounded-sm overflow-hidden opacity-50">
              <div className="bg-[#111111] p-4 border-b border-gray-800 flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-gray-500"></div>
                <h2 className="text-lg font-bold text-gray-400 uppercase tracking-wider">
                  Payment
                </h2>
              </div>
              <div className="p-6">
                <p className="text-sm text-gray-500 italic">Please fill out shipping details first to unlock payment.</p>
              </div>
            </div>
            
          </form>
        </div>

        {/* Order Summary Sidebar */}
        <div className="lg:w-1/3">
          <div className="bg-[#1E1E1E] border border-gray-800 rounded-sm p-6 sticky top-24">
             <div className="flex justify-center mb-6">
               <div className="w-12 h-12 bg-[#111111] rounded-full flex items-center justify-center border border-gray-800">
                 <Lock className="w-5 h-5 text-[#FFC107]" />
               </div>
             </div>

            <div className="space-y-4 mb-6 text-sm">
              <div className="flex justify-between text-gray-400">
                <span>Summary</span>
                <span className="text-white">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Shipping payment</span>
                <span className="text-white">{shipping === 0 ? '$0.00' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Tax/Vat</span>
                <span className="text-white">${tax.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between text-xl font-bold text-white border-t border-gray-800 pt-6 mb-6">
              <span>Total Boxes</span>
              <span className="text-white">
                ${total.toFixed(2)}
              </span>
            </div>
            
            <button 
              type="submit"
              form="checkout-form"
              className="w-full bg-[#FFC107] hover:bg-[#ffca28] text-black font-bold uppercase tracking-wider py-3 px-6 rounded-sm transition-colors shadow-sm"
            >
              PLACE ORDER
            </button>

            <div className="mt-4 text-center text-gray-500 text-xs">
              Please review checkout.
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
