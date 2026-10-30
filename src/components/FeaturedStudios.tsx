'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Studio } from '../types';
import { apiGetStudios } from '../lib/api';
import StudioCard from './StudioCard';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function FeaturedStudios() {
  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        setLoading(true);
        // Requirement: Fetch dynamically from MongoDB, displaying 6 top-rated spaces using .limit(6)
        const res = await apiGetStudios({ limit: 6, sort: 'rating' });
        if (isMounted) {
          if (res.success && res.studios) {
            setStudios(res.studios);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err.message || 'Failed to load featured studios.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadFeatured();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              Dynamic MongoDB Featured Spaces
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Featured Creative Workspaces
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
              Handpicked top-rated production studios and creator facilities ready for instant reservation.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors"
          >
            Browse All {studios.length > 0 ? `(${studios.length}+)` : ''} Studios
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div
                key={n}
                className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm animate-pulse flex flex-col h-[400px]"
              >
                <div className="aspect-[16/10] bg-zinc-200 dark:bg-zinc-800 w-full" />
                <div className="p-5 space-y-3 flex-grow flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="h-5 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-3/4" />
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/2" />
                    <div className="h-3 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-full" />
                  </div>
                  <div className="h-9 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div className="p-8 rounded-3xl bg-rose-500/10 border border-rose-500/20 text-center">
            <p className="text-rose-600 dark:text-rose-400 font-semibold mb-2">{error}</p>
            <p className="text-xs text-zinc-500">Ensure the backend server is running on port 5000.</p>
          </div>
        )}

        {/* Studios Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studios.map((studio) => (
              <StudioCard key={studio._id} studio={studio} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
