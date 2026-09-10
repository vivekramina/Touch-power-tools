"use client";

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PRODUCTS } from '@/data/dummyData';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = PRODUCTS.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="flex flex-col gap-16 md:gap-24 mb-20">
      
      {/* HERO SECTION */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Background Image / Overlay */}
        <div className="absolute inset-0 z-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src="https://images.unsplash.com/photo-1504148455328-c376907d081c?q=80&w=2000" 
            alt="Hero Background"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/80 to-transparent" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-4 leading-tight">
              EMPOWER YOUR <br /> PROJECTS
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-medium">
              Premium Power Tools
            </p>
            <div className="flex">
              <Link 
                href="/shop"
                className="bg-[#FFC107] hover:bg-[#ffca28] text-black font-bold uppercase tracking-wider py-4 px-10 rounded-sm transition-colors flex items-center justify-center shadow-lg"
              >
                SHOP NOW
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="container mx-auto px-4 mt-8">
        <div className="flex items-end justify-between mb-8 border-b border-gray-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-wider uppercase">Featured Products</h2>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
             <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* CATEGORIES GRID */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/shop?category=drills" className="relative h-64 md:h-80 group overflow-hidden rounded-sm bg-[#1E1E1E]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&q=80" alt="Drills" className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 p-8 flex items-end">
              <h3 className="text-3xl font-bold text-white tracking-wide">Drills</h3>
            </div>
          </Link>
          <Link href="/shop?category=saws" className="relative h-64 md:h-80 group overflow-hidden rounded-sm bg-[#1E1E1E]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="https://images.unsplash.com/photo-1572981779307-38b8cabb2407?w=800&q=80" alt="Saws" className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
            <div className="absolute inset-0 p-8 flex items-end">
              <h3 className="text-3xl font-bold text-white tracking-wide">Saws</h3>
            </div>
          </Link>
          <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/blog" className="relative h-64 group overflow-hidden rounded-sm bg-[#1E1E1E]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.unsplash.com/photo-1581147036324-c10a30b4279b?w=800&q=80" alt="Blog" className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
              <div className="absolute inset-0 p-8 flex items-end">
                <h3 className="text-3xl font-bold text-white tracking-wide">Blog</h3>
              </div>
            </Link>
            <Link href="/shop" className="relative h-64 group overflow-hidden rounded-sm bg-[#1E1E1E] flex items-center justify-center border-2 border-dashed border-gray-800 hover:border-[#FFC107] transition-colors">
              <h3 className="text-2xl font-bold text-gray-400 group-hover:text-[#FFC107] transition-colors tracking-wide">View All Categories</h3>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
