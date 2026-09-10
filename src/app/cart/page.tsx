"use client";

import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getCartTotal } = useCartStore();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-gray-400 text-sm mb-2">Home / Cart</div>
      <h1 className="text-3xl font-bold text-white tracking-wider mb-10 border-b border-gray-800 pb-4">
        CART
      </h1>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-[#1E1E1E] border border-gray-800 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-gray-400 mb-8 max-w-md mx-auto">
            Looks like you haven't added any professional gear to your cart yet. Let's fix that.
          </p>
          <Link 
            href="/shop"
            className="inline-block bg-[#FFC107] hover:bg-[#ffca28] text-black font-bold uppercase py-3 px-8 rounded-sm transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Cart Items */}
          <div className="lg:w-2/3 flex flex-col gap-6">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.cartItemId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col sm:flex-row gap-6 bg-[#111111] border-b border-gray-800 pb-6 items-center sm:items-stretch"
                >
                  <div className="w-24 h-24 bg-[#1E1E1E] flex-shrink-0 flex items-center justify-center p-2 rounded-sm border border-gray-800">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-contain"
                    />
                  </div>
                  
                  <div className="flex flex-col flex-grow justify-between w-full">
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-gray-400 font-bold text-xs uppercase mb-1">{item.brand}</div>
                        <h3 className="text-white font-bold text-lg leading-tight mb-1">{item.name}</h3>
                        <div className="text-gray-500 text-sm">Variant: {item.selectedVariant.name}</div>
                      </div>
                      <button 
                        onClick={() => removeItem(item.cartItemId)}
                        className="text-gray-500 hover:text-red-500 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4 sm:mt-0">
                      <div className="flex items-center bg-[#1E1E1E] border border-gray-800 rounded-sm overflow-hidden">
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <div className="w-10 h-8 flex items-center justify-center text-white font-bold text-sm bg-[#111111] border-x border-gray-800">
                          {item.quantity}
                        </div>
                        <button 
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="text-xl font-bold text-white">
                        ${(item.selectedVariant.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#1E1E1E] border border-gray-800 rounded-sm p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white tracking-wider mb-6 pb-4 border-b border-gray-800 uppercase">
                Order Summary
              </h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white">${getCartTotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Shipping</span>
                  <span className="text-white">{getCartTotal() > 99 ? 'Free' : '$15.00'}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Estimated Tax</span>
                  <span className="text-white">${(getCartTotal() * 0.08).toFixed(2)}</span>
                </div>
              </div>
              
              <div className="flex justify-between text-xl font-bold text-white border-t border-gray-800 pt-6 mb-8">
                <span>Total</span>
                <span className="text-[#FFC107]">
                  ${(getCartTotal() + (getCartTotal() > 99 ? 0 : 15) + (getCartTotal() * 0.08)).toFixed(2)}
                </span>
              </div>
              
              <Link 
                href="/checkout"
                className="w-full bg-[#FFC107] hover:bg-[#ffca28] text-black font-bold uppercase tracking-wider py-3 px-6 rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                PROCEED TO CHECKOUT
              </Link>
            </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
