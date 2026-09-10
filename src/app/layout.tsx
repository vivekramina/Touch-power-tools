import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AIAssistantWidget from '@/components/AIAssistantWidget';

export const metadata: Metadata = {
  title: 'Touch Power Tools | Professional Power Tools',
  description: 'High-end eCommerce store for professional power tools, blades, and accessories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col bg-[#111111] text-gray-100 selection:bg-brand-primary selection:text-black">
        <Navbar />
        <main className="flex-grow pt-24 pb-16">
          {children}
        </main>
        <AIAssistantWidget />
        <Footer />
      </body>
    </html>
  );
}
