"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Search, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const pathname = usePathname();
  const cartCount = useCartStore((state) => state.getCartCount());
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartPopping, setIsCartPopping] = useState(false);

  useEffect(() => {
    if (cartCount > 0) {
      setIsCartPopping(true);
      const timer = setTimeout(() => setIsCartPopping(false), 300);
      return () => clearTimeout(timer);
    }
  }, [cartCount]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'SHOP', href: '/shop' },
    { name: 'CORDLESS', href: '/shop?category=cordless' },
    { name: 'SAWS', href: '/shop?category=saws' },
    { name: 'BLOG', href: '/blog' },
    { name: 'ABOUT', href: '/about' },
    { name: 'CONTACT', href: '/contact' },
  ];

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
        isScrolled ? 'bg-[#111111]/95 backdrop-blur-md border-gray-800' : 'bg-[#111111] border-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl md:text-2xl tracking-tight shrink-0">
          <div className="w-8 h-8 rounded-full border-2 border-[#FFC107] flex items-center justify-center">
             {/* Gear icon approximation */}
             <div className="w-4 h-4 bg-[#FFC107] rounded-sm transform rotate-45"></div>
          </div>
          <span>TOUCH<br/><span className="text-gray-400 text-sm font-normal uppercase tracking-wider -mt-1 block">Power Tools</span></span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 h-full">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs xl:text-sm font-bold tracking-wider transition-colors py-2 ${
                pathname === link.href ? 'text-[#FFC107]' : 'text-gray-300 hover:text-[#FFC107]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Icons */}
        <div className="flex items-center gap-4 lg:gap-6">
          <button className="text-gray-300 hover:text-[#FFC107] transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <Link 
            href="/account"
            className="text-gray-300 hover:text-[#FFC107] transition-colors hidden sm:block"
          >
            <User className="w-5 h-5" />
          </Link>
          <Link href="/cart">
            <motion.div 
              animate={isCartPopping ? { scale: [1, 1.2, 1] } : { scale: 1 }}
              transition={{ duration: 0.3 }}
              className="relative text-[#FFC107] hover:text-[#ffca28] transition-colors flex items-center gap-1 group cursor-pointer"
            >
              <ShoppingCart className="w-5 h-5" />
              <AnimatePresence>
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-[#FFC107] text-black text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full transition-transform absolute -top-2 -right-2"
                >
                  {cartCount}
                </motion.span>
              </AnimatePresence>
            </motion.div>
          </Link>
        </div>
      </div>

      {/* Mobile Options Row */}
      <div className="lg:hidden w-full border-t border-gray-800 bg-[#111111] overflow-x-auto scrollbar-hide py-3">
        <nav className="flex items-center px-4 min-w-max gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`text-xs font-bold tracking-wider transition-colors py-1 ${
                pathname === link.href ? 'text-[#FFC107]' : 'text-gray-300 hover:text-[#FFC107]'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
