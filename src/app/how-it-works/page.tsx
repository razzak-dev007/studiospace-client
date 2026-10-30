import React from 'react';
import Link from 'next/link';
import HowBookingWorks from '../../components/HowBookingWorks';
import HostGuarantee from '../../components/HostGuarantee';
import { Compass, PlusCircle, CheckCircle2 } from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="py-12 space-y-12">
      <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
        <span className="text-xs font-bold uppercase tracking-widest text-orange-500 bg-orange-500/10 px-3 py-1 rounded-full">
          Platform Architecture & Guidelines
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          How StudioSpace Works
        </h1>
        <p className="text-base text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Whether you are an independent creator staging an album visual or an established production facility hosting client shoots, StudioSpace streamlines scheduling, liability coverage, and escrow payments.
        </p>
      </div>

      <HowBookingWorks />

      {/* For Hosts vs Creators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">For Creators & Crews</span>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Seamless Production Booking</h2>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Search by specialty equipment: Cyc walls, ARRI Skypanels, Shure SM7B mics, or pottery wheels.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Double-booking collision prevention guarantees your reserved time is 100% exclusive.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Downloadable official PDF receipts for your accounting and production tax credits.</span>
              </li>
            </ul>
            <Link
              href="/studios"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-orange-500 text-white font-bold text-xs shadow-md"
            >
              <Compass className="w-4 h-4" />
              Explore Spaces Now
            </Link>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-5">
            <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">For Studio Hosts</span>
            <h2 className="text-2xl font-black text-zinc-900 dark:text-white">Monetize Down-Time & Off-Hours</h2>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-300">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Keep 100% control over hourly rates, security deposits, and capacity limits.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>$1,000,000 comprehensive general liability shield included on every session.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-orange-500 mt-0.5 flex-shrink-0" />
                <span>Direct payout transfers with automated escrow deposit release after wrap.</span>
              </li>
            </ul>
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-bold text-xs shadow-md"
            >
              <PlusCircle className="w-4 h-4" />
              Host Your Space
            </Link>
          </div>
        </div>
      </section>

      <HostGuarantee />
    </div>
  );
}
