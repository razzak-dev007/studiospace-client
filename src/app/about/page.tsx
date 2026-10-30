import React from 'react';
import Link from 'next/link';
import { Aperture, Sparkles, Heart, Users, ShieldCheck, Compass } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* Hero */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Aperture className="w-3.5 h-3.5" />
          Our Mission & Vision
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Democratizing Access to World-Class Creative Studios
        </h1>
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
          StudioSpace was engineered to eliminate gatekeeping in creative production. We connect indie creators and production studios through a high-performance peer-to-peer ecosystem.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
            <Sparkles className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Unmatched Transparency</h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            No surprise cleaning fees or undisclosed gear surcharges. Every listing features verified equipment inventories and all-inclusive hourly rates.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Built-in Host Protection</h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Backed by $1M general liability coverage and automated security deposit escrow to keep studio gear and property safe.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
            <Heart className="w-6 h-6 stroke-[2]" />
          </div>
          <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white">Community First</h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            From grassroots podcasters to commercial film directors, we empower independent voices to shoot on studio-grade stages.
          </p>
        </div>
      </div>

      {/* Team CTA */}
      <div className="p-8 sm:p-12 rounded-3xl bg-zinc-900 dark:bg-zinc-800 text-white text-center space-y-5 border border-zinc-700">
        <h2 className="text-2xl sm:text-3xl font-black">Ready to produce your next creative project?</h2>
        <p className="text-sm text-zinc-400 max-w-lg mx-auto">
          Explore photography daylight lofts, cinema sound stages, podcast rooms, and Dolby Atmos audio suites in your city.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/studios"
            className="px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            Explore Available Studios
          </Link>
          <Link
            href="/add-studio"
            className="px-6 py-3.5 rounded-xl border border-zinc-600 hover:bg-zinc-700 text-white font-bold text-xs transition-colors"
          >
            Host a Creative Workspace
          </Link>
        </div>
      </div>
    </div>
  );
}
