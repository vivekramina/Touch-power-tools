"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, MessageSquare } from 'lucide-react';

export default function AIAssistantWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-end justify-end flex-col gap-4">
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="w-80 h-96 bg-[#1E1E1E] border border-gray-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#FFC107] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2 text-black font-bold">
                <Bot className="w-5 h-5" />
                <span>AI ASSISTANT (Beta)</span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-black/80 hover:text-black transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            {/* Messages Area */}
            <div className="flex-grow p-4 bg-[#111111] overflow-y-auto">
              <div className="bg-[#1E1E1E] border border-gray-800 p-3 rounded-lg rounded-tl-none inline-block max-w-[85%] text-sm text-gray-200">
                Hi there! I'm the Touch Power Tools AI Assistant. How can I help you find the right tool for your project today?
              </div>
            </div>

            {/* Input Area */}
            <div className="p-3 bg-[#1E1E1E] border-t border-gray-800">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask a question..." 
                  className="w-full bg-[#111111] text-white border border-gray-800 rounded-full py-2 px-4 pr-10 text-sm focus:outline-none focus:border-[#FFC107] focus:ring-1 focus:ring-[#FFC107] transition-all"
                />
                <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[#FFC107] hover:text-[#ffca28]">
                  <MessageSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.div
        className="flex items-center gap-3"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {!isOpen && (
          <div className="bg-[#FFC107] text-black font-bold text-sm py-2 px-4 rounded-full shadow-lg cursor-pointer flex items-center gap-2" onClick={() => setIsOpen(true)}>
            AI ASSISTANT (Beta) <Bot className="w-4 h-4" />
          </div>
        )}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
            isOpen ? 'bg-gray-800 text-white hover:bg-gray-700' : 'bg-[#FFC107] text-black hover:bg-[#ffca28]'
          }`}
        >
          {isOpen ? <X className="w-6 h-6" /> : <Bot className="w-6 h-6" />}
        </button>
      </motion.div>
    </div>
  );
}
