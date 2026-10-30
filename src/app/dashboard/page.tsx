'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { apiGetMyListings, apiGetMyBookings, apiGetWishlist } from '../../lib/api';
import {
  Sparkles,
  LayoutGrid,
  CalendarCheck2,
  Heart,
  PlusCircle,
  Compass,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldCheck,
  Star,
} from 'lucide-react';

export default function DashboardPage() {
  const { user } = useAuth();
  const [listingCount, setListingCount] = useState(0);
  const [bookingCount, setBookingCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        setLoading(true);
        const [listingsRes, bookingsRes, wishlistRes] = await Promise.allSettled([
          apiGetMyListings(),
          apiGetMyBookings(),
          apiGetWishlist(),
        ]);

        if (listingsRes.status === 'fulfilled' && listingsRes.value.success) {
          setListingCount(listingsRes.value.count || 0);
        }
        if (bookingsRes.status === 'fulfilled' && bookingsRes.value.success) {
          setBookingCount(bookingsRes.value.count || 0);
        }
        if (wishlistRes.status === 'fulfilled' && wishlistRes.value.success) {
          setWishlistCount(wishlistRes.value.studioIds?.length || 0);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
        
        {/* Welcome Header */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-zinc-900 via-zinc-950 to-zinc-900 border border-zinc-800 text-white shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              Creator Command Center
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">
              Welcome back, {user?.name || 'Creator'}!
            </h1>
            <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
              Manage your production workspaces, review incoming shoot reservations, and inspect dynamic availability across the marketplace.
            </p>
          </div>
        </div>

        {/* 4 Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">My Listings</p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white font-mono">
                {loading ? '...' : listingCount}
              </p>
              <Link href="/my-listings" className="text-xs text-orange-500 font-bold hover:underline inline-flex items-center gap-1">
                View listings <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center">
              <LayoutGrid className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Reservations</p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white font-mono">
                {loading ? '...' : bookingCount}
              </p>
              <Link href="/my-bookings" className="text-xs text-orange-500 font-bold hover:underline inline-flex items-center gap-1">
                View bookings <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <CalendarCheck2 className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Saved Spaces</p>
              <p className="text-3xl font-black text-zinc-900 dark:text-white font-mono">
                {loading ? '...' : wishlistCount}
              </p>
              <Link href="/studios" className="text-xs text-orange-500 font-bold hover:underline inline-flex items-center gap-1">
                Explore studios <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
              <Heart className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-wider text-zinc-500">Trust Score</p>
              <p className="text-3xl font-black text-emerald-500 font-mono">
                100%
              </p>
              <span className="text-xs text-zinc-400">Verified Host & Creator</span>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
          </div>
        </div>

        {/* Quick Launchpad Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Link
            href="/add-studio"
            className="p-6 rounded-3xl bg-orange-500 hover:bg-orange-600 text-white shadow-xl shadow-orange-500/20 transition-all hover:scale-[1.02] flex items-center justify-between"
          >
            <div>
              <h3 className="font-extrabold text-lg">List a New Studio</h3>
              <p className="text-xs text-orange-100 mt-1">Add cyc wall, stage, or booth</p>
            </div>
            <PlusCircle className="w-7 h-7" />
          </Link>

          <Link
            href="/studios"
            className="p-6 rounded-3xl bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white transition-all hover:scale-[1.02] flex items-center justify-between border border-zinc-700"
          >
            <div>
              <h3 className="font-extrabold text-lg">Explore All Workspaces</h3>
              <p className="text-xs text-zinc-400 mt-1">Book photo lofts & audio suites</p>
            </div>
            <Compass className="w-7 h-7 text-orange-500" />
          </Link>

          <Link
            href="/my-bookings"
            className="p-6 rounded-3xl bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white transition-all hover:scale-[1.02] flex items-center justify-between border border-zinc-700"
          >
            <div>
              <h3 className="font-extrabold text-lg">My Reserved Slots</h3>
              <p className="text-xs text-zinc-400 mt-1">Download invoices & manage</p>
            </div>
            <CalendarCheck2 className="w-7 h-7 text-amber-500" />
          </Link>
        </div>
      </div>
    </ProtectedRoute>
  );
}
