"use client";

import { useState } from 'react';
import { User, Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AccountPage() {
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Mock ${isLogin ? 'Login' : 'Sign Up'} successful! (This is just a frontend demo)`);
  };

  return (
    <div className="container mx-auto px-4 py-16 flex items-center justify-center min-h-[70vh]">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-[#1E1E1E] border border-gray-800 rounded-sm p-8 shadow-sm"
      >
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#111111] border border-gray-800 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-[#FFC107]" />
          </div>
          <h1 className="text-3xl font-bold text-white tracking-wider uppercase">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-gray-400 mt-2 text-sm">
            {isLogin 
              ? 'Enter your details to access your pro gear account.' 
              : 'Join Touch Power Tools for exclusive pro deals.'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
                <input 
                  required 
                  type="text" 
                  className="w-full bg-[#111111] border border-gray-800 focus:border-[#FFC107] outline-none text-white p-3 pl-10 rounded-sm transition-all focus:ring-1 focus:ring-[#FFC107]" 
                  placeholder="John Doe" 
                />
              </div>
            </div>
          )}
          
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input 
                required 
                type="email" 
                className="w-full bg-[#111111] border border-gray-800 focus:border-[#FFC107] outline-none text-white p-3 pl-10 rounded-sm transition-all focus:ring-1 focus:ring-[#FFC107]" 
                placeholder="pro@example.com" 
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Password</label>
              {isLogin && <a href="#" className="text-xs font-bold text-[#FFC107] hover:text-[#ffca28] transition-colors">Forgot password?</a>}
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input 
                required 
                type="password" 
                className="w-full bg-[#111111] border border-gray-800 focus:border-[#FFC107] outline-none text-white p-3 pl-10 rounded-sm transition-all focus:ring-1 focus:ring-[#FFC107]" 
                placeholder="••••••••" 
              />
            </div>
          </div>

          <button 
            type="submit"
            className="w-full bg-[#FFC107] hover:bg-[#ffca28] text-black font-bold uppercase tracking-wider py-4 rounded-sm transition-colors flex items-center justify-center gap-2 mt-4 shadow-sm"
          >
            {isLogin ? (
              <><LogIn className="w-5 h-5" /> Sign In</>
            ) : (
              <><UserPlus className="w-5 h-5" /> Sign Up</>
            )}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={() => setIsLogin(!isLogin)}
              className="text-[#FFC107] font-bold hover:text-[#ffca28] uppercase tracking-wider ml-1"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
        
      </motion.div>
    </div>
  );
}
