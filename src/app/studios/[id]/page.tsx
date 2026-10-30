'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Studio } from '../../../types';
import { apiGetStudioById, apiCreateBooking, apiToggleWishlist } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import {
  Star,
  MapPin,
  Users,
  ShieldCheck,
  Calendar,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Heart,
  CheckCircle,
  AlertCircle,
  X,
  ArrowRight,
  DollarSign,
  MessageSquare,
  Building,
} from 'lucide-react';
import { toast } from 'sonner';
import confetti from 'canvas-confetti';

export default function StudioDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const [studio, setStudio] = useState<Studio | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Gallery Active Image Index
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Booking Modal State
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingDate, setBookingDate] = useState('');
  const [minDate, setMinDate] = useState('');
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('14:00');
  const [creatorNotes, setCreatorNotes] = useState('');
  const [bookingLoading, setBookingLoading] = useState(false);
  const [bookingConflictError, setBookingConflictError] = useState<string | null>(null);

  // Wishlist state
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    let isMounted = true;
    async function loadStudio() {
      try {
        setLoading(true);
        const res = await apiGetStudioById(studioId);
        if (isMounted && res.success && res.studio) {
          setStudio(res.studio);
        }
      } catch (err: any) {
        if (isMounted) setError(err.message || 'Failed to load studio details.');
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    loadStudio();

    // Default booking date to tomorrow
    const today = new Date();
    setMinDate(today.toISOString().split('T')[0]);
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    setBookingDate(tomorrow.toISOString().split('T')[0]);

    return () => {
      isMounted = false;
    };
  }, [studioId]);

  // Calculate live hours and estimated cost
  const durationHours = (() => {
    try {
      const [sh, sm] = startTime.split(':').map(Number);
      const [eh, em] = endTime.split(':').map(Number);
      const diff = (eh * 60 + em) - (sh * 60 + sm);
      return diff > 0 ? Math.round((diff / 60) * 10) / 10 : 0;
    } catch {
      return 0;
    }
  })();

  const estimatedTotal = studio ? Math.round(durationHours * studio.hourlyRate) : 0;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingConflictError(null);

    if (!isAuthenticated) {
      toast.info('Please log in before reserving this studio space.');
      router.push(`/login?redirect=/studios/${studioId}`);
      return;
    }

    if (durationHours <= 0) {
      setBookingConflictError('End time must be after start time.');
      toast.error('End time must be after start time.');
      return;
    }

    try {
      setBookingLoading(true);
      // Challenge 2 Double-Booking Check happens on server
      const res = await apiCreateBooking({
        studioId,
        bookingDate,
        startTime,
        endTime,
        creatorNotes,
      });

      // Confetti effect on success
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {}

      toast.success(res.message || 'Workspace reservation submitted successfully!');
      setBookingModalOpen(false);
      router.push('/my-bookings');
    } catch (err: any) {
      const msg = err.message || 'Failed to complete booking.';
      setBookingConflictError(msg);
      toast.error(msg);
    } finally {
      setBookingLoading(false);
    }
  };

  const handleWishlistToggle = async () => {
    if (!isAuthenticated) {
      toast.info('Please log in to save spaces.');
      return;
    }
    try {
      const res = await apiToggleWishlist(studioId);
      setIsSaved(!isSaved);
      toast.success(res.message);
    } catch (err: any) {
      toast.error(err.message || 'Wishlist error.');
    }
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-1/3" />
          <div className="h-[480px] bg-zinc-200 dark:bg-zinc-800 rounded-3xl w-full" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="h-6 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/4" />
              <div className="h-24 bg-zinc-200 dark:bg-zinc-800 rounded-xl w-full" />
            </div>
            <div className="h-64 bg-zinc-200 dark:bg-zinc-800 rounded-3xl w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (error || !studio) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-500/10 text-rose-500 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">Studio Not Found</h2>
        <p className="text-sm text-zinc-500">{error || 'The studio you requested does not exist.'}</p>
        <Link
          href="/studios"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-orange-500 text-white font-bold text-xs"
        >
          <ChevronLeft className="w-4 h-4" />
          Return to Explore Studios
        </Link>
      </div>
    );
  }

  const galleryImages = studio.gallery && studio.gallery.length > 0 ? studio.gallery : [studio.image];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10">
      
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-semibold text-zinc-500">
          <Link href="/" className="hover:text-orange-500">Home</Link>
          <span>/</span>
          <Link href="/studios" className="hover:text-orange-500">Studios</Link>
          <span>/</span>
          <span className="text-zinc-900 dark:text-zinc-200 truncate max-w-[200px] sm:max-w-none">
            {studio.title}
          </span>
        </div>

        <button
          onClick={handleWishlistToggle}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-xs font-bold transition-all ${
            isSaved
              ? 'bg-rose-500/10 border-rose-500 text-rose-500'
              : 'border-zinc-300 dark:border-zinc-700 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
          }`}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          {isSaved ? 'Saved to Wishlist' : 'Save Studio'}
        </button>
      </div>

      {/* Main Studio Title & Key Info */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2.5">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20">
            {studio.category}
          </span>
          <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-current" />
            <span>{studio.rating ? Number(studio.rating).toFixed(1) : '5.0'}</span>
            <span className="text-zinc-400">({studio.reviewCount || 1} verified reviews)</span>
          </div>
          <span className="text-xs text-zinc-400">•</span>
          <div className="flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>{studio.location}</span>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-zinc-900 dark:text-white tracking-tight">
          {studio.title}
        </h1>
      </div>

      {/* Gallery Carousel Showcase */}
      <div className="space-y-3">
        <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-zinc-900 shadow-xl border border-zinc-200 dark:border-zinc-800">
          <img
            src={galleryImages[activeImageIdx]}
            alt={studio.title}
            className="w-full h-full object-cover transition-opacity duration-300"
          />

          {galleryImages.length > 1 && (
            <>
              <button
                onClick={() =>
                  setActiveImageIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
                }
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/80"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setActiveImageIdx((prev) => (prev + 1) % galleryImages.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center backdrop-blur-md hover:bg-black/80"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}

          <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white">
            Photo {activeImageIdx + 1} of {galleryImages.length}
          </div>
        </div>

        {/* Thumbnail Selector */}
        {galleryImages.length > 1 && (
          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImageIdx(idx)}
                className={`relative w-24 h-16 rounded-xl overflow-hidden flex-shrink-0 border-2 transition-all ${
                  activeImageIdx === idx
                    ? 'border-orange-500 scale-105 shadow-md'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Content Layout: Specifications & Booking Box */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (8 cols): Specifications, Overview, Amenities, Reviews */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Key Specs Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
            <div>
              <p className="text-xs text-zinc-500">Hourly Rate</p>
              <p className="text-lg font-black text-orange-500 font-mono">${studio.hourlyRate}/hr</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Security Deposit</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white font-mono">${studio.securityDeposit || 0}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Max Capacity</p>
              <p className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-1">
                <Users className="w-4 h-4 text-orange-500" />
                {studio.maxCapacity} people
              </p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Category</p>
              <p className="text-sm font-bold text-zinc-900 dark:text-white truncate">{studio.category}</p>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-3">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">Workspace Overview</h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed whitespace-pre-line">
              {studio.overview}
            </p>
          </div>

          {/* Amenities List */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">Included Amenities & Equipment</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {studio.amenities &&
                studio.amenities.map((amenity, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-sm font-medium text-zinc-800 dark:text-zinc-200"
                  >
                    <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span>{amenity}</span>
                  </div>
                ))}
            </div>
          </div>

          {/* Host Details */}
          <div className="p-6 rounded-3xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 flex items-center gap-5">
            <div className="w-16 h-16 rounded-full overflow-hidden bg-orange-500/10 border-2 border-orange-500/30 flex-shrink-0">
              <img
                src={studio.ownerPhoto || `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(studio.ownerEmail)}`}
                alt={studio.ownerName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="space-y-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-orange-500">
                Verified Studio Host
              </span>
              <h3 className="text-lg font-extrabold text-zinc-900 dark:text-white">{studio.ownerName}</h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Host Contact: <span className="font-mono">{studio.ownerEmail}</span>
              </p>
            </div>
          </div>

          {/* Verified Creator Reviews */}
          <div className="space-y-4">
            <h2 className="text-xl font-extrabold text-zinc-900 dark:text-white">Creator Reviews & Feedback</h2>
            <div className="space-y-3">
              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">Jordan Blake</span>
                    <span className="text-xs text-zinc-400">• Commercial Director</span>
                  </div>
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> 5.0
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                  "Incredible space! The natural daylight was consistent for all 6 hours of our fashion lookbook shoot. The Profoto strobes were spotless, and host communication was instantaneous."
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-zinc-900 dark:text-white">Elena Rostova</span>
                    <span className="text-xs text-zinc-400">• Podcast Producer</span>
                  </div>
                  <div className="flex items-center text-amber-500 text-xs font-bold">
                    <Star className="w-3.5 h-3.5 fill-current" /> 4.9
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300">
                  "Acoustic isolation exceeded our expectations. Zero bleed from outside street traffic. Seamless Wi-Fi allowed direct cloud backups of our multi-cam footage."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Sticky Booking CTA Card */}
        <div className="lg:col-span-4">
          <div className="sticky top-24 p-6 sm:p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl space-y-6">
            
            <div className="flex items-baseline justify-between border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="text-3xl font-black text-orange-500 font-mono">${studio.hourlyRate}</span>
                <span className="text-xs text-zinc-500 font-medium"> / hour</span>
              </div>
              <div className="flex items-center gap-1 text-xs font-bold text-amber-500">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{studio.rating ? Number(studio.rating).toFixed(1) : '5.0'}</span>
              </div>
            </div>

            <div className="space-y-3 text-xs text-zinc-600 dark:text-zinc-300">
              <div className="flex justify-between">
                <span>Security Deposit</span>
                <span className="font-bold font-mono text-zinc-900 dark:text-white">${studio.securityDeposit || 0}</span>
              </div>
              <div className="flex justify-between">
                <span>Minimum Duration</span>
                <span className="font-bold text-zinc-900 dark:text-white">1 Hour</span>
              </div>
              <div className="flex justify-between">
                <span>Cancellation</span>
                <span className="text-emerald-500 font-bold">Free up to 24h prior</span>
              </div>
            </div>

            {/* Launch Booking Modal Button (Requirement: "Book Workspace Now" button launching booking modal) */}
            <button
              onClick={() => setBookingModalOpen(true)}
              className="w-full py-4 px-6 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              Book Workspace Now
            </button>

            <div className="pt-2 text-[11px] text-zinc-400 text-center space-y-1">
              <p>Protected by StudioSpace Host & Creator Guarantee.</p>
              <p>Real-time MongoDB conflict prevention active.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Custom Modal Dialog */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full space-y-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-150">
            
            {/* Close Button */}
            <button
              onClick={() => {
                setBookingModalOpen(false);
                setBookingConflictError(null);
              }}
              className="absolute top-5 right-5 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">
                Workspace Reservation
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-zinc-900 dark:text-white">
                Book {studio.title}
              </h2>
            </div>

            {/* Conflict Error Message (Challenge 2 Overlap Feedback) */}
            {bookingConflictError && (
              <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-xs text-rose-600 dark:text-rose-400 flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Slot Collision Detected</p>
                  <p>{bookingConflictError}</p>
                </div>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              
              {/* Date */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Production Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                    min={minDate || undefined}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Calendar className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                </div>
              </div>

              {/* Time Slots */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    Start Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Clock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                    End Time
                  </label>
                  <div className="relative">
                    <input
                      type="time"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                      className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                    <Clock className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                  </div>
                </div>
              </div>

              {/* Creator Production Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Creator Production Notes
                </label>
                <textarea
                  value={creatorNotes}
                  onChange={(e) => setCreatorNotes(e.target.value)}
                  placeholder="Detail crew size, specific lighting gear required, or arrival questions..."
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
                />
              </div>

              {/* Price Calculation Summary */}
              <div className="p-4 rounded-2xl bg-zinc-100 dark:bg-zinc-800 space-y-2 text-xs">
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Calculated Duration:</span>
                  <span className="font-bold text-zinc-900 dark:text-white font-mono">{durationHours} Hours</span>
                </div>
                <div className="flex justify-between text-zinc-600 dark:text-zinc-400">
                  <span>Hourly Rate:</span>
                  <span className="font-bold font-mono text-zinc-900 dark:text-white">${studio.hourlyRate}/hr</span>
                </div>
                <div className="border-t border-zinc-200 dark:border-zinc-700 pt-2 flex justify-between text-sm font-extrabold text-zinc-900 dark:text-white">
                  <span>Estimated Total:</span>
                  <span className="text-orange-500 font-mono text-base">${estimatedTotal}</span>
                </div>
              </div>

              {/* Confirm Reservation Button */}
              <button
                type="submit"
                disabled={bookingLoading || durationHours <= 0}
                className="w-full py-3.5 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-lg shadow-orange-500/25 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {bookingLoading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    Confirm & Reserve Slot (${estimatedTotal})
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
