import React from 'react';
import Link from 'next/link';
import { Aperture, Home, Compass, Film, Camera } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 sm:p-12 rounded-3xl shadow-2xl">
        
        {/* Creative Studio 404 Illustration / Icon Group */}
        <div className="relative w-28 h-28 mx-auto flex items-center justify-center">
          <div className="absolute inset-0 rounded-3xl bg-orange-500/10 dark:bg-orange-500/20 animate-pulse" />
          <div className="relative z-10 w-20 h-20 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-500/25">
            <Aperture className="w-10 h-10 stroke-[2.2] animate-spin-slow" />
          </div>
          <div className="absolute -top-1 -right-1 w-8 h-8 rounded-full bg-zinc-900 text-orange-400 border border-orange-500/30 flex items-center justify-center">
            <Camera className="w-4 h-4" />
          </div>
          <div className="absolute -bottom-1 -left-1 w-8 h-8 rounded-full bg-zinc-900 text-rose-400 border border-rose-500/30 flex items-center justify-center">
            <Film className="w-4 h-4" />
          </div>
        </div>

        {/* 404 Heading */}
        <div className="space-y-2">
          <span className="text-4xl sm:text-5xl font-black font-mono text-orange-500">404</span>
          <h1 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">
            Studio Set Not Found
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            The creative production bay or studio route you're looking for has wrapped production, moved to a different sound stage, or does not exist.
          </p>
        </div>

        {/* Action Buttons (Requirement: direct "Return to Home" button) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <Link
            href="/"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/20 transition-all inline-flex items-center justify-center gap-2"
          >
            <Home className="w-4 h-4" />
            Return to Home
          </Link>

          <Link
            href="/studios"
            className="w-full sm:w-auto px-6 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-bold text-xs transition-colors inline-flex items-center justify-center gap-2"
          >
            <Compass className="w-4 h-4" />
            Explore Studios
          </Link>
        </div>
      </div>
    </div>
  );
}
