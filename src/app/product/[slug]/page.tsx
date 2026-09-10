"use client";

import { useState, use, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Star, ShieldCheck, Truck, ArrowLeft, Plus, Minus, ShoppingCart, Zap, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PRODUCTS } from '@/data/dummyData';
import { useCartStore } from '@/store/useCartStore';
import { useRecentStore } from '@/store/useRecentStore';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = PRODUCTS.find(p => p.slug === resolvedParams.slug);
  
  if (!product) {
    return notFound();
  }

  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [showStickyBar, setShowStickyBar] = useState(false);
  
  const addItem = useCartStore(state => state.addItem);
  const addRecentItem = useRecentStore(state => state.addRecentItem);
  const recentItems = useRecentStore(state => state.recentItems);
  const [isAdded, setIsAdded] = useState(false);

  useEffect(() => {
    addRecentItem(product);
  }, [product, addRecentItem]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = (e: React.MouseEvent) => {
    addItem({
      ...product,
      cartItemId: `${product.id}-${selectedVariant.id}-${Date.now()}`,
      quantity,
      selectedVariant
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const filteredRecent = recentItems.filter(p => p.id !== product.id);

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <Link href="/shop" className="inline-flex items-center gap-2 text-gray-500 hover:text-[#FFC107] transition-colors text-sm font-bold uppercase tracking-wider mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 mb-24">
          
          {/* Images */}
          <div className="bg-[#1E1E1E] rounded-sm overflow-hidden border border-gray-800 shadow-sm aspect-square flex items-center justify-center p-12">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain drop-shadow-sm"
            />
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="text-gray-400 font-bold uppercase tracking-wider text-sm mb-2">
              {product.brand}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-wider mb-4 leading-tight uppercase">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-800">
              <div className="flex items-center gap-1">
                <div className="flex text-[#FFC107]">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-600'}`} />
                  ))}
                </div>
                <span className="text-gray-300 font-bold ml-2">{product.rating}</span>
              </div>
              <span className="text-gray-600">|</span>
              <span className="text-gray-400 underline cursor-pointer hover:text-[#FFC107] transition-colors">{product.reviews} Reviews</span>
            </div>

            {/* Price */}
            <div className="mb-8">
              <span className="text-4xl font-bold text-[#FFC107]">${selectedVariant.price.toFixed(2)}</span>
            </div>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {product.description}
            </p>

            {/* Variants */}
            {product.variants.length > 1 && (
              <div className="mb-8">
                <h3 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Select Option</h3>
                <div className="grid grid-cols-2 gap-4">
                  {product.variants.map(variant => (
                    <button
                      key={variant.id}
                      onClick={() => setSelectedVariant(variant)}
                      className={`border py-3 px-4 font-bold uppercase tracking-wider text-sm rounded-sm transition-all ${
                        selectedVariant.id === variant.id 
                          ? 'border-[#FFC107] text-[#FFC107] bg-[#FFC107]/10' 
                          : 'border-gray-800 text-gray-400 hover:border-gray-700 hover:bg-[#1E1E1E] bg-[#111111]'
                      }`}
                    >
                      {variant.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <div className="flex items-center bg-[#111111] border border-gray-800 rounded-sm h-14 shadow-sm overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-5 text-gray-400 hover:text-white hover:bg-[#1E1E1E] transition-colors h-full flex items-center justify-center border-r border-gray-800"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-16 text-center text-white font-bold">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-5 text-gray-400 hover:text-white hover:bg-[#1E1E1E] transition-colors h-full flex items-center justify-center border-l border-gray-800"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button 
                onClick={handleAddToCart}
                className={`flex-1 font-bold uppercase tracking-wider h-14 flex items-center justify-center gap-3 transition-all duration-300 rounded-sm shadow-sm ${
                  isAdded 
                    ? 'bg-green-500 text-black shadow-green-500/20' 
                    : 'bg-[#FFC107] hover:bg-[#ffca28] text-black shadow-[#FFC107]/20'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isAdded ? (
                    <motion.div
                      key="added"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <Check className="w-5 h-5" />
                      ADDED TO CART
                    </motion.div>
                  ) : (
                    <motion.div
                      key="add"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="flex items-center gap-2"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      ADD TO CART
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-gray-800">
              <div className="flex items-start gap-3">
                <div className="bg-[#1E1E1E] border border-gray-800 p-2 rounded-sm text-[#FFC107] mt-1">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">3-Year Warranty</h4>
                  <p className="text-gray-400 text-sm mt-1 leading-snug">Guaranteed reliability</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-[#1E1E1E] border border-gray-800 p-2 rounded-sm text-[#FFC107] mt-1">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">Free Shipping</h4>
                  <p className="text-gray-400 text-sm mt-1 leading-snug">On orders over $99</p>
                </div>
              </div>
              {product.powerType === 'Cordless' && (
                <div className="flex items-start gap-3 sm:col-span-2">
                  <div className="bg-[#1E1E1E] border border-gray-800 p-2 rounded-sm text-[#FFC107] mt-1">
                    <Zap className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">Cordless Freedom</h4>
                    <p className="text-gray-400 text-sm mt-1 leading-snug">Compatible with all 20V Max Touch Power Tools batteries.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Recently Viewed Carousel */}
        {filteredRecent.length > 0 && (
          <div className="mt-20 pt-16 border-t border-gray-800">
            <h2 className="text-2xl font-bold text-white tracking-wider uppercase mb-8">Recently Viewed</h2>
            <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide snap-x">
              {filteredRecent.map((p) => (
                <div key={p.id} className="min-w-[280px] w-[280px] sm:min-w-[320px] sm:w-[320px] shrink-0 snap-start">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Sticky Add to Cart Bar */}
      <AnimatePresence>
        {showStickyBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 w-full bg-[#111111]/95 backdrop-blur-md border-t border-gray-800 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] z-40 p-4"
          >
            <div className="container mx-auto flex items-center justify-between gap-4">
              <div className="hidden sm:flex items-center gap-4">
                <div className="w-14 h-14 bg-[#1E1E1E] border border-gray-800 rounded-sm overflow-hidden flex items-center justify-center p-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm line-clamp-1 uppercase">{product.name}</h3>
                  <div className="text-[#FFC107] font-bold">${selectedVariant.price.toFixed(2)}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <button 
                  onClick={handleAddToCart}
                  className={`w-full sm:w-56 font-bold uppercase tracking-wider h-12 flex items-center justify-center gap-2 transition-all duration-300 rounded-sm shadow-sm ${
                    isAdded 
                      ? 'bg-green-500 text-black' 
                      : 'bg-[#FFC107] hover:bg-[#ffca28] text-black'
                  }`}
                >
                  <AnimatePresence mode="wait">
                    {isAdded ? (
                      <motion.div key="added" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <Check className="w-4 h-4" /> ADDED
                      </motion.div>
                    ) : (
                      <motion.div key="add" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-2">
                        <ShoppingCart className="w-4 h-4" /> ADD TO CART
                      </motion.div>
                    )}
                  </AnimatePresence>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
