'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import { Studio } from '../../types';
import { apiGetMyListings, apiDeleteStudio } from '../../lib/api';
import {
  LayoutGrid,
  PlusCircle,
  Edit3,
  Trash2,
  ExternalLink,
  MapPin,
  Star,
  Users,
  AlertTriangle,
  X,
  Sparkles,
} from 'lucide-react';
import { toast } from 'sonner';

export default function MyListingsPage() {
  const [listings, setListings] = useState<Studio[]>([]);
  const [loading, setLoading] = useState(true);

  // Delete Confirmation Modal State (Requirement: Custom confirmation modal)
  const [deleteTarget, setDeleteTarget] = useState<Studio | null>(null);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const res = await apiGetMyListings();
      if (res.success && res.listings) {
        setListings(res.listings);
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to load your listings.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      setDeleteLoading(true);
      const res = await apiDeleteStudio(deleteTarget._id);
      // Requirement: Show confirmation modal before deleting the document from MongoDB with a success toast.
      toast.success(res.message || 'Studio listing deleted successfully.');
      setListings((prev) => prev.filter((item) => item._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err.message || 'Failed to delete studio listing.');
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
              <LayoutGrid className="w-3.5 h-3.5" />
              Host Management
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
              My Studio Listings
            </h1>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              Manage, update, and inspect your creative workspaces listed across the StudioSpace marketplace.
            </p>
          </div>

          <Link
            href="/add-studio"
            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-lg shadow-orange-500/20 transition-all self-start sm:self-auto"
          >
            <PlusCircle className="w-4 h-4" />
            Add New Studio
          </Link>
        </div>

        {/* Loading Skeletons */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="h-28 rounded-3xl bg-zinc-200 dark:bg-zinc-800 animate-pulse w-full"
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && listings.length === 0 && (
          <div className="p-12 sm:p-16 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-center max-w-lg mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-3xl bg-orange-500/10 text-orange-500 flex items-center justify-center mx-auto">
              <LayoutGrid className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-zinc-900 dark:text-white">
              No Studio Listings Yet
            </h3>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              You haven't listed any creative workspaces yet. Host your photo studio, podcast room, or sound stage and start earning.
            </p>
            <Link
              href="/add-studio"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              List Your First Workspace
            </Link>
          </div>
        )}

        {/* Listings Table / Card Grid */}
        {!loading && listings.length > 0 && (
          <div className="space-y-4">
            {listings.map((item) => (
              <div
                key={item._id}
                className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:border-orange-500/30 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                {/* Left: Thumbnail & Details */}
                <div className="flex items-center gap-5">
                  <div className="relative w-28 h-20 rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-800 flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-bold bg-black/60 text-white backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-extrabold text-base sm:text-lg text-zinc-900 dark:text-white line-clamp-1">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{item.rating ? Number(item.rating).toFixed(1) : '5.0'}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-orange-500" />
                        <span className="truncate max-w-[220px]">{item.location}</span>
                      </span>
                      <span>•</span>
                      <span className="font-mono font-bold text-orange-500">
                        ${item.hourlyRate}/hr
                      </span>
                      <span>•</span>
                      <span>Deposit: ${item.securityDeposit || 0}</span>
                      <span>•</span>
                      <span>Max {item.maxCapacity} creators</span>
                    </div>
                  </div>
                </div>

                {/* Right: Actions */}
                <div className="flex items-center gap-2.5 self-end md:self-center">
                  <Link
                    href={`/studios/${item._id}`}
                    target="_blank"
                    className="p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                    title="Preview Live Listing"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </Link>

                  <Link
                    href={`/studios/edit/${item._id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-bold transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-orange-500" />
                    Update
                  </Link>

                  <button
                    onClick={() => setDeleteTarget(item)}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-600 dark:text-rose-400 text-xs font-bold transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Custom Delete Confirmation Modal (Requirement: Custom modal dialog) */}
        {deleteTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-150">
            <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-md w-full space-y-5 shadow-2xl relative">
              <button
                onClick={() => setDeleteTarget(null)}
                className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 stroke-[2.2]" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-zinc-900 dark:text-white">
                  Delete Studio Listing?
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1 leading-relaxed">
                  Are you sure you want to permanently remove <strong>{deleteTarget.title}</strong> from StudioSpace? This document will be completely deleted from MongoDB and cannot be undone.
                </p>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setDeleteTarget(null)}
                  disabled={deleteLoading}
                  className="w-1/2 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={confirmDelete}
                  disabled={deleteLoading}
                  className="w-1/2 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-md transition-colors disabled:opacity-50 flex items-center justify-center gap-1.5"
                >
                  {deleteLoading ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="w-3.5 h-3.5" />
                      Confirm Delete
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
