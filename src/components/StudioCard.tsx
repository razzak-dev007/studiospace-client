'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Studio } from '../types';
import { useAuth } from '../context/AuthContext';
import { apiToggleWishlist } from '../lib/api';
import { Star, MapPin, Heart, Users, ArrowUpRight } from 'lucide-react';
import { toast } from 'sonner';

interface StudioCardProps {
  studio: Studio;
  isFavorited?: boolean;
  onWishlistToggle?: (studioId: string, newState: boolean) => void;
}

export default function StudioCard({ studio, isFavorited = false, onWishlistToggle }: StudioCardProps) {
  const { isAuthenticated } = useAuth();
  const [favorited, setFavorited] = useState(isFavorited);
  const [loadingFav, setLoadingFav] = useState(false);

  const handleFavoriteClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isAuthenticated) {
      toast.info('Please log in to save studios to your wishlist.');
      return;
    }

    try {
      setLoadingFav(true);
      const nextFav = !favorited;
      setFavorited(nextFav);
      const res = await apiToggleWishlist(studio._id);
      toast.success(res.message);
      if (onWishlistToggle) {
        onWishlistToggle(studio._id, nextFav);
      }
    } catch (err: any) {
      setFavorited(!favorited); // rollback
      toast.error(err.message || 'Could not update wishlist.');
    } finally {
      setLoadingFav(false);
    }
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case 'Photo Studio':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      case 'Film Stage':
        return 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20';
      case 'Podcast Lounge':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Music Suite':
        return 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20';
      case 'Art Workshop':
        return 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20';
      default:
        return 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20';
    }
  };

  return (
    <div className="group flex flex-col h-full bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 rounded-3xl overflow-hidden hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-500/30 transition-all duration-300">
      
      {/* Studio Image & Badges */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <img
          src={studio.image}
          alt={studio.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Category Badge */}
        <div className="absolute top-3.5 left-3.5">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold tracking-wide border backdrop-blur-md ${getCategoryColor(
              studio.category
            )}`}
          >
            {studio.category}
          </span>
        </div>

        {/* Wishlist Heart Button (Optional Requirement) */}
        <button
          onClick={handleFavoriteClick}
          disabled={loadingFav}
          aria-label={favorited ? 'Remove from saved wishlist' : 'Save to wishlist'}
          className={`absolute top-3.5 right-3.5 w-9 h-9 rounded-full backdrop-blur-md flex items-center justify-center transition-all ${
            favorited
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
              : 'bg-black/40 hover:bg-black/60 text-white'
          }`}
        >
          <Heart className={`w-4.5 h-4.5 ${favorited ? 'fill-current' : ''}`} />
        </button>

        {/* Price Tag Overlay */}
        <div className="absolute bottom-3.5 left-3.5 bg-zinc-950/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white">
          <div className="flex items-baseline gap-1">
            <span className="text-base font-extrabold text-orange-400">${studio.hourlyRate}</span>
            <span className="text-xs text-zinc-300">/ hr</span>
          </div>
        </div>

        {/* Capacity badge */}
        <div className="absolute bottom-3.5 right-3.5 bg-zinc-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[11px] text-zinc-300 flex items-center gap-1.5">
          <Users className="w-3.5 h-3.5 text-zinc-400" />
          <span>Max {studio.maxCapacity}</span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="flex flex-col flex-grow p-5 space-y-3">
        {/* Title & Rating */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-bold text-lg text-zinc-900 dark:text-white line-clamp-1 group-hover:text-orange-500 transition-colors">
            {studio.title}
          </h3>
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold flex-shrink-0">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{studio.rating ? Number(studio.rating).toFixed(1) : '5.0'}</span>
          </div>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
          <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
          <span className="truncate">{studio.location}</span>
        </div>

        {/* Overview snippet */}
        <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed flex-grow">
          {studio.overview}
        </p>

        {/* Amenities Highlights */}
        {studio.amenities && studio.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pt-1">
            {studio.amenities.slice(0, 3).map((amenity, idx) => (
              <span
                key={idx}
                className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 truncate max-w-[150px]"
              >
                {amenity}
              </span>
            ))}
            {studio.amenities.length > 3 && (
              <span className="px-1.5 py-0.5 rounded-md text-[10px] font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-400">
                +{studio.amenities.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Card Footer / View Details Button */}
        <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          <span className="text-xs font-medium text-zinc-400">
            Host: <span className="text-zinc-700 dark:text-zinc-300 font-semibold">{studio.ownerName}</span>
          </span>

          <Link
            href={`/studios/${studio._id}`}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-zinc-900 dark:bg-orange-500 hover:bg-orange-600 dark:hover:bg-orange-600 transition-colors shadow-sm"
          >
            View Details
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
