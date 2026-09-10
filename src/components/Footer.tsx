import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-[#111111] text-gray-300 border-t border-gray-800 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Company */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Company</h4>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">Home</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">About</Link></li>
              <li><Link href="/shop" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">Products</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">Contact</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Contact</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">Customer Service</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">Contact Info</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">Privacy Policy</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-[#FFC107] transition-colors text-sm">Terms Info</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-6">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe to our newsletter to get updates on our latest offers!</p>
            <form className="flex mb-6 max-w-md">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-[#1E1E1E] border border-gray-800 text-white px-4 py-2 w-full focus:outline-none focus:border-[#FFC107] rounded-l-md"
              />
              <button 
                type="submit" 
                className="bg-[#FFC107] hover:bg-[#ffca28] text-black font-bold px-4 py-2 rounded-r-md transition-colors whitespace-nowrap"
              >
                Sign Up
              </button>
            </form>
            
            <div className="flex items-center gap-4">
              <a href="#" className="w-8 h-8 rounded-full bg-[#1E1E1E] flex items-center justify-center text-gray-400 hover:text-[#FFC107] hover:bg-gray-800 transition-all font-bold text-[10px]">
                FB
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1E1E1E] flex items-center justify-center text-gray-400 hover:text-[#FFC107] hover:bg-gray-800 transition-all font-bold text-[10px]">
                TW
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1E1E1E] flex items-center justify-center text-gray-400 hover:text-[#FFC107] hover:bg-gray-800 transition-all font-bold text-[10px]">
                IG
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-[#1E1E1E] flex items-center justify-center text-gray-400 hover:text-[#FFC107] hover:bg-gray-800 transition-all font-bold text-[10px]">
                YT
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between text-xs text-gray-500">
          <p>Copyright © 2024 Touch Power Tools | All rights reserved.</p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
