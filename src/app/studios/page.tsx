'use client';

import React, { useEffect, useState, useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { Studio, StudioCategory } from '../../types';
import { apiGetStudios } from '../../lib/api';
import StudioCard from '../../components/StudioCard';
import {
  Search,
  Filter,
  SlidersHorizontal,
  ArrowUpDown,
  RotateCcw,
  Sparkles,
  Camera,
  Film,
  Mic,
  Headphones,
  Palette,
  X,
} from 'lucide-react';

const CATEGORIES: Array<{ label: string; value: string }> = [
  { label: 'All Categories', value: 'All' },
  { label: 'Photo Studio', value: 'Photo Studio' },
  { label: 'Film Stage', value: 'Film Stage' },
  { label: 'Podcast Lounge', value: 'Podcast Lounge' },
  { label: 'Music Suite', value: 'Music Suite' },
  { label: 'Art Workshop', value: 'Art Workshop' },
];

function StudiosContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [studios, setStudios] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('rating');
  const [priceRange, setPriceRange] = useState<number>(300);

  // Sync category if query param changes
  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) {
      setSelectedCategory(cat);
    }
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;
    async function fetchStudios() {
      try {
        setLoading(true);
        const res = await apiGetStudios({
          category: selectedCategory !== 'All' ? selectedCategory : undefined,
          search: searchQuery.trim() || undefined,
          maxPrice: priceRange,
          sort: sortBy,
        });
        if (isMounted && res.success && res.studios) {
          setStudios(res.studios);
        }
      } catch (err) {
        console.error('Error loading studios:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    const timer = setTimeout(() => {
      fetchStudios();
    }, 250);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [selectedCategory, searchQuery, sortBy, priceRange]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSortBy('rating');
    setPriceRange(300);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
      
      {/* Page Title & Subtitle */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5" />
          Production Workspaces Directory
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          Explore Creative Studios
        </h1>
        <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 max-w-2xl">
          Discover verified cyc walls, cinema sound stages, podcast rooms, music production suites, and artist lofts with real-time slot booking.
        </p>
      </div>

      {/* Filter Bar Controls */}
      <div className="p-4 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-4 items-center">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by studio name, location, or equipment (e.g. Cyc wall, Shure)..."
              className="w-full px-4 py-3 pl-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-sm text-zinc-900 dark:text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
            <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3.5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Sort By Selector */}
          <div className="md:col-span-4 relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-800/60 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 appearance-none cursor-pointer"
            >
              <option value="rating">Sort: Highest Rated & Popular</option>
              <option value="price_asc">Sort: Price (Low to High)</option>
              <option value="price_desc">Sort: Price (High to Low)</option>
              <option value="capacity">Sort: Largest Capacity</option>
            </select>
            <ArrowUpDown className="w-4 h-4 text-zinc-400 absolute right-4 top-3.5 pointer-events-none" />
          </div>

          {/* Price Range Slider */}
          <div className="md:col-span-3 flex flex-col gap-1">
            <div className="flex items-center justify-between text-xs font-bold text-zinc-700 dark:text-zinc-300">
              <span>Max Rate:</span>
              <span className="text-orange-500 font-extrabold font-mono">${priceRange}/hr</span>
            </div>
            <input
              type="range"
              min="50"
              max="300"
              step="10"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              className="w-full accent-orange-500 cursor-pointer h-2 bg-zinc-200 dark:bg-zinc-700 rounded-lg"
            />
          </div>
        </div>

        {/* Category Pills Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat.value;
            return (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all whitespace-nowrap flex-shrink-0 ${
                  active
                    ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                    : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                }`}
              >
                {cat.label}
              </button>
            );
          })}

          {/* Reset Filters */}
          {(searchQuery || selectedCategory !== 'All' || sortBy !== 'rating' || priceRange < 300) && (
            <button
              onClick={resetFilters}
              className="px-3 py-2 rounded-xl text-xs font-semibold text-rose-500 hover:bg-rose-500/10 transition-colors flex items-center gap-1.5 flex-shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header Count */}
      <div className="flex items-center justify-between text-sm text-zinc-500 dark:text-zinc-400 px-1">
        <span>
          Showing <strong className="text-zinc-900 dark:text-white font-mono">{studios.length}</strong> available creative spaces
        </span>
        {selectedCategory !== 'All' && (
          <span className="text-xs font-bold text-orange-500">Filtered by: {selectedCategory}</span>
        )}
      </div>

      {/* Skeleton Loading State */}
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

      {/* Empty State */}
      {!loading && studios.length === 0 && (
        <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="w-16 h-16 rounded-3xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
            <Search className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-black text-zinc-900 dark:text-white">
            No Creative Studios Found
          </h3>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            We couldn't find any studios matching your current search parameters. Try adjusting your category or resetting the price filter.
          </p>
          <button
            onClick={resetFilters}
            className="px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors inline-flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </button>
        </div>
      )}

      {/* Studios Grid */}
      {!loading && studios.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studios.map((studio) => (
            <StudioCard key={studio._id} studio={studio} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function ExploreStudiosPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-20 text-center text-zinc-400">
          <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p>Loading Creative Studios...</p>
        </div>
      }
    >
      <StudiosContent />
    </Suspense>
  );
}
