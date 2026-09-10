"use client";

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ShoppingCart, Check } from 'lucide-react';
import { Product } from '@/data/dummyData';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore(state => state.addItem);
  const [isAdded, setIsAdded] = useState(false);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      ...product,
      cartItemId: `${product.id}-${product.variants[0].id}-${Date.now()}`,
      quantity: 1,
      selectedVariant: product.variants[0]
    });
    
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <motion.div 
        whileHover={{ y: -4 }}
        className="group relative bg-[#1E1E1E] border border-gray-800 hover:border-gray-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col"
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          {product.isNewArrival && (
            <span className="bg-[#FFC107] text-black text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wide">
              New
            </span>
          )}
          {product.isFeatured && (
            <span className="bg-gray-800 text-white border border-gray-700 text-[10px] font-bold uppercase px-2.5 py-1 rounded-full tracking-wide">
              Featured
            </span>
          )}
        </div>

        {/* Image */}
        <div className="relative aspect-square overflow-hidden bg-[#111111] flex items-center justify-center p-8 border-b border-gray-800">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-2">
            <div className="text-gray-400 font-bold uppercase tracking-wider text-[10px]">
              {product.brand}
            </div>
            <div className="flex items-center gap-1 bg-[#111111] px-2 py-0.5 rounded-full border border-gray-800">
              <Star className="w-3 h-3 fill-[#FFC107] text-[#FFC107]" />
              <span className="text-gray-300 text-xs font-medium">{product.rating}</span>
            </div>
          </div>
          
          <h3 className="text-white font-bold text-base mb-3 line-clamp-2 leading-tight group-hover:text-[#FFC107] transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto pt-4 border-t border-gray-800 flex items-center justify-between">
            <div className="text-xl font-extrabold text-white">
              ${product.variants[0].price.toFixed(2)}
            </div>
          </div>
          
          {/* Quick Add Button */}
          <div className="mt-4">
            <button 
              onClick={handleQuickAdd}
              className={`w-full font-bold uppercase tracking-wider py-2.5 px-4 flex items-center justify-center gap-2 transition-all duration-300 rounded-lg shadow-sm ${
                isAdded 
                  ? 'bg-green-500 text-black' 
                  : 'bg-[#FFC107] hover:bg-[#ffca28] text-black'
              }`}
            >
              <AnimatePresence mode="wait">
                {isAdded ? (
                  <motion.div
                    key="added"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Check className="w-4 h-4" />
                    ADDED
                  </motion.div>
                ) : (
                  <motion.div
                    key="add"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    ADD TO CART
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
