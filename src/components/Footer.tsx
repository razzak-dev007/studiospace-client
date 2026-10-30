'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Aperture, Send, Heart, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      toast.error('Please provide a valid email address.');
      return;
    }
    toast.success('Thank you for subscribing to StudioSpace Creator Dispatch!');
    setEmail('');
  };

  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#070a11] text-zinc-600 dark:text-zinc-400 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-500 via-amber-500 to-rose-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Aperture className="w-5 h-5 stroke-[2.2]" />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-zinc-900 dark:text-white">
                Studio<span className="text-orange-500">Space</span>
              </span>
            </Link>

            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm leading-relaxed">
              The premier peer-to-peer workspace marketplace empowering filmmakers, photographers, audio engineers, and digital creators to discover, book, and host production studios with seamless transparency.
            </p>

            {/* Social Links featuring the new X logo */}
            <div className="flex items-center gap-3 pt-2">
              {/* New X Logo (NOT Twitter bird per strict instruction) */}
              <a
                href="https://x.com"
                target="_blank"
                rel="noreferrer"
                aria-label="X (formerly Twitter)"
                className="w-9 h-9 rounded-lg bg-zinc-200 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:text-black dark:hover:text-white transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="w-9 h-9 rounded-lg bg-zinc-200 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:text-rose-500 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="YouTube"
                className="w-9 h-9 rounded-lg bg-zinc-200 dark:bg-zinc-800/80 hover:bg-zinc-300 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-800 dark:text-zinc-200 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Platform Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-orange-500 transition-colors">
                  Home Overview
                </Link>
              </li>
              <li>
                <Link href="/studios" className="hover:text-orange-500 transition-colors">
                  Explore Creative Studios
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-orange-500 transition-colors">
                  How Booking Works
                </Link>
              </li>
              <li>
                <Link href="/add-studio" className="hover:text-orange-500 transition-colors">
                  Host Your Creative Space
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-orange-500 transition-colors">
                  About StudioSpace
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Categories */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/studios?category=Photo+Studio" className="hover:text-orange-500 transition-colors">
                  Photo Cyc Walls & Lofts
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Film+Stage" className="hover:text-orange-500 transition-colors">
                  Cinema & Sound Stages
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Podcast+Lounge" className="hover:text-orange-500 transition-colors">
                  Podcast & Vodcast Lounges
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Music+Suite" className="hover:text-orange-500 transition-colors">
                  Dolby Atmos Music Suites
                </Link>
              </li>
              <li>
                <Link href="/studios?category=Art+Workshop" className="hover:text-orange-500 transition-colors">
                  Ceramic & Art Workshops
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-white">
              Creator Dispatch
            </h4>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Get weekly production tips, newly listed spaces, and exclusive studio discounts directly to your inbox.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="creator@studiospace.io"
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-xs text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="absolute right-1 top-1 bottom-1 px-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg flex items-center justify-center transition-colors"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="mt-12 pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© 2026 StudioSpace Platform Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/trust" className="hover:text-zinc-900 dark:hover:text-white transition-colors">
              Host Guarantee
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
