import React from 'react';
import SmartDine from '../../Component/SmartDine';
import { Facebook, Youtube, Twitter } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative text-white py-12 px-6 md:px-20 mt-10 overflow-hidden">
     
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 opacity-90 -z-10 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/geometry2.png')] bg-repeat opacity-10 -z-5"></div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10 relative z-10">
        
        <aside>
          <h1 className="text-4xl font-extrabold [text-shadow:3px_3px_0px_#00000040] mb-3">
            🍴 SmartDine
          </h1>
          <p className="text-sm text-white/90 leading-relaxed">
            “Taste with Emotion” — where every meal tells a story.  
            Bringing love, flavor, and freshness straight to your plate since 2018.
          </p>
          <p className="mt-4 text-white/80 text-sm">
             SmartDine Ltd.  
            All rights reserved.
          </p>
        </aside>

        <nav>
          <h6 className="text-2xl font-semibold mb-3 underline decoration-white/40">
            Quick Links
          </h6>
          <ul className="space-y-2 text-white/90">
            <li><a href="/" className="hover:text-yellow-200 transition">Home</a></li>
            <li><a href="/about" className="hover:text-yellow-200 transition">About Us</a></li>
            <li><a href="/see-menu" className="hover:text-yellow-200 transition">Menu</a></li>
            <li><a href="/about" className="hover:text-yellow-200 transition">Contact</a></li>
          </ul>
        </nav>

        <div>
          <h6 className="text-2xl font-semibold mb-3 underline decoration-white/40">
            Follow Us
          </h6>
          <p className="text-white/90 mb-3">
            Stay connected with SmartDine on your favorite platforms 🍕
          </p>
          <div className="flex gap-5 mt-3">
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
              <Twitter size={28} className="text-white hover:text-yellow-200" />
            </a>
            <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
              <Youtube size={28} className="text-white hover:text-yellow-200" />
            </a>
            <a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:scale-110 transition-transform">
              <Facebook size={28} className="text-white hover:text-yellow-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
