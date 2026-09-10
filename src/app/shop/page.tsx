"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Filter, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PRODUCTS, CATEGORIES } from '@/data/dummyData';
import ProductCard from '@/components/ProductCard';

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const queryParam = searchParams.get('q');
  
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || 'all');
  const [priceRange, setPriceRange] = useState<number>(500);

  useEffect(() => {
    setSelectedCategory(categoryParam || 'all');
  }, [categoryParam]);

  const filteredProducts = PRODUCTS.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (p.price > priceRange) return false;
    if (queryParam && !p.name.toLowerCase().includes(queryParam.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      
      {/* Header */}
      <div className="mb-10">
        <div className="text-gray-400 text-sm mb-2">Home / Shop</div>
        <h1 className="text-3xl font-bold text-white tracking-wider mb-2">
          Shop
        </h1>
        <p className="text-gray-500 font-medium text-sm">Showing {filteredProducts.length} results</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Mobile Filter Toggle */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="lg:hidden flex items-center justify-center gap-2 bg-[#1E1E1E] border border-gray-800 text-white py-3 px-4 font-bold rounded-sm shadow-sm uppercase tracking-wider text-sm"
        >
          <Filter className="w-5 h-5 text-[#FFC107]" />
          {isFilterOpen ? 'Hide Filters' : 'Show Filters'}
        </button>

        {/* Sidebar Filters */}
        <aside className={`lg:w-1/4 flex-shrink-0 ${isFilterOpen ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-[#111111] border-none p-0 sticky top-24">
            
            {/* Category Filter */}
            <div className="mb-8 border-b border-gray-800 pb-6">
              <h3 className="text-white font-bold mb-4 capitalize flex justify-between items-center cursor-pointer">
                Category <ChevronDown className="w-4 h-4 text-gray-400" />
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="accent-[#FFC107] w-4 h-4 bg-[#1E1E1E] border-gray-700"
                  />
                  <span className="text-gray-400 group-hover:text-white transition-colors text-sm">All</span>
                </label>
                {CATEGORIES.map(cat => (
                  <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="radio" 
                      name="category"
                      checked={selectedCategory === cat.slug}
                      onChange={() => setSelectedCategory(cat.slug)}
                      className="accent-[#FFC107] w-4 h-4 bg-[#1E1E1E] border-gray-700"
                    />
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm">{cat.name}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-8 border-b border-gray-800 pb-6">
              <h3 className="text-white font-bold mb-4 capitalize flex justify-between items-center cursor-pointer">
                Brand <ChevronDown className="w-4 h-4 text-gray-400" />
              </h3>
              <div className="space-y-3">
                {['DeWalt', 'Makita', 'Bosch', 'Ryobi', 'Milwaukee'].map(brand => (
                  <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                    <input 
                      type="checkbox"
                      className="accent-[#FFC107] w-4 h-4 bg-[#1E1E1E] border-gray-700 rounded-sm"
                    />
                    <span className="text-gray-400 group-hover:text-white transition-colors text-sm">{brand}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-8">
              <h3 className="text-white font-bold mb-4 capitalize flex justify-between items-center cursor-pointer">
                Max Price: ${priceRange} <ChevronDown className="w-4 h-4 text-gray-400" />
              </h3>
              <input 
                type="range" 
                min="0" 
                max="500" 
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="w-full accent-[#FFC107] bg-gray-800 h-1 appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-gray-500 text-xs mt-2">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>

          </div>
        </aside>

        {/* Product Grid */}
        <div className="lg:w-3/4 overflow-hidden">
          <AnimatePresence mode="wait">
            {filteredProducts.length === 0 ? (
              <motion.div 
                key="empty"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-[#1E1E1E] border border-gray-800 rounded-lg p-16 text-center"
              >
                <h3 className="text-2xl font-bold text-white mb-2">No tools found</h3>
                <p className="text-gray-400">Try adjusting your filters to find what you're looking for.</p>
              </motion.div>
            ) : (
              <motion.div 
                key={selectedCategory + (queryParam || '') + priceRange}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-8 text-white">Loading shop...</div>}>
      <ShopContent />
    </Suspense>
  );
}
