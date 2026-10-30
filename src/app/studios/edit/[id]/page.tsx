'use client';

import React, { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../../../components/ProtectedRoute';
import { Studio, StudioCategory } from '../../../../types';
import { apiGetStudioById, apiUpdateStudio } from '../../../../lib/api';
import {
  Edit3,
  Building2,
  DollarSign,
  Users,
  MapPin,
  Image as ImageIcon,
  Check,
  Tag,
  FileText,
  UserCheck,
  ArrowRight,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';
import { toast } from 'sonner';

const POPULAR_AMENITIES = [
  'Cyclorama Wall',
  'Profoto Strobes',
  'Green Screen',
  'ARRI Skypanels',
  'Shure SM7B Mics',
  'Dolby Atmos Monitoring',
  'Soundproof Treatment',
  '1Gbps Fiber Wi-Fi',
  'Hair & Makeup Vanity',
  'Freight Elevator',
  'Blackout Shades',
  'Garment Steamer',
  'Espresso & Kitchenette',
  'Pottery Wheels',
  'Camlock 3-Phase Power',
  'Client Lounge',
];

const CATEGORIES: StudioCategory[] = [
  'Photo Studio',
  'Film Stage',
  'Podcast Lounge',
  'Music Suite',
  'Art Workshop',
  'Dance Studio',
];

export default function EditStudioPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const studioId = resolvedParams.id;

  const router = useRouter();

  const [initialLoading, setInitialLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StudioCategory>('Photo Studio');
  const [hourlyRate, setHourlyRate] = useState<number>(95);
  const [securityDeposit, setSecurityDeposit] = useState<number>(150);
  const [maxCapacity, setMaxCapacity] = useState<number>(15);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [amenities, setAmenities] = useState<string[]>([]);
  const [customAmenity, setCustomAmenity] = useState('');
  const [overview, setOverview] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');

  useEffect(() => {
    let isMounted = true;
    async function loadExisting() {
      try {
        setInitialLoading(true);
        const res = await apiGetStudioById(studioId);
        if (isMounted && res.success && res.studio) {
          const s = res.studio;
          setTitle(s.title || '');
          setCategory(s.category || 'Photo Studio');
          setHourlyRate(s.hourlyRate || 95);
          setSecurityDeposit(s.securityDeposit || 0);
          setMaxCapacity(s.maxCapacity || 10);
          setLocation(s.location || '');
          setImage(s.image || '');
          setAmenities(s.amenities || []);
          setOverview(s.overview || '');
          setOwnerName(s.ownerName || '');
          setOwnerEmail(s.ownerEmail || '');
        }
      } catch (err: any) {
        toast.error(err.message || 'Could not load existing listing data.');
      } finally {
        if (isMounted) setInitialLoading(false);
      }
    }

    loadExisting();
    return () => {
      isMounted = false;
    };
  }, [studioId]);

  const toggleAmenity = (item: string) => {
    if (amenities.includes(item)) {
      setAmenities(amenities.filter((a) => a !== item));
    } else {
      setAmenities([...amenities, item]);
    }
  };

  const addCustomAmenity = (e: React.FormEvent) => {
    e.preventDefault();
    if (customAmenity.trim() && !amenities.includes(customAmenity.trim())) {
      setAmenities([...amenities, customAmenity.trim()]);
      setCustomAmenity('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !location.trim() || !image.trim() || !overview.trim()) {
      toast.error('Please complete all mandatory fields.');
      return;
    }

    try {
      setSubmitting(true);
      // Requirement: On submit, update MongoDB via PUT/PATCH and show a success toast before redirecting to /my-listings.
      const res = await apiUpdateStudio(studioId, {
        title: title.trim(),
        category,
        hourlyRate: Number(hourlyRate),
        securityDeposit: Number(securityDeposit),
        maxCapacity: Number(maxCapacity),
        location: location.trim(),
        image: image.trim(),
        gallery: [image.trim()],
        amenities,
        overview: overview.trim(),
      });

      toast.success(res.message || 'Studio listing updated successfully!');
      router.push('/my-listings');
    } catch (err: any) {
      toast.error(err.message || 'Failed to update studio listing.');
    } finally {
      setSubmitting(false);
    }
  };

  if (initialLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center text-zinc-400">
        <div className="w-10 h-10 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p>Loading Listing Details for Editing...</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Navigation Breadcrumb */}
        <button
          onClick={() => router.back()}
          className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-orange-500 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Listings
        </button>

        {/* Header Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <Edit3 className="w-3.5 h-3.5" />
            Workspace Editor
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            Update Studio Listing
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Modify specifications, update gear availability, or adjust hourly pricing for <strong>{title}</strong>.
          </p>
        </div>

        {/* Pre-filled Form */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-xl">
          
          {/* Workspace Details */}
          <div className="space-y-5">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-500" />
              1. Workspace Details
            </h2>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Studio Title / Stage Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Studio Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as StudioCategory)}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Maximum Capacity (People) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="200"
                    value={maxCapacity}
                    onChange={(e) => setMaxCapacity(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-medium text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <Users className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Location Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Rates */}
          <div className="space-y-5">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-orange-500" />
              2. Rates & Security Deposit
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Hourly Rate ($ / hr) *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="10"
                    step="5"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    required
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-mono text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="absolute left-4 top-3.5 text-zinc-400 font-bold">$</span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  Security Deposit ($)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={securityDeposit}
                    onChange={(e) => setSecurityDeposit(Number(e.target.value))}
                    className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm font-mono text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                  <span className="absolute left-4 top-3.5 text-zinc-400 font-bold">$</span>
                </div>
              </div>
            </div>
          </div>

          {/* Visuals */}
          <div className="space-y-5">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-500" />
              3. Visuals & Image URL
            </h2>

            <div className="space-y-2">
              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              {image && (
                <div className="mt-3 relative aspect-[16/9] max-h-56 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
            </div>
          </div>

          {/* Amenities */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <Tag className="w-5 h-5 text-orange-500" />
              4. Amenities Checklist
            </h2>

            <div className="flex flex-wrap gap-2">
              {POPULAR_AMENITIES.map((item) => {
                const selected = amenities.includes(item);
                return (
                  <button
                    type="button"
                    key={item}
                    onClick={() => toggleAmenity(item)}
                    className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      selected
                        ? 'bg-orange-500 text-white shadow-sm'
                        : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
                    }`}
                  >
                    {selected ? <Check className="w-3.5 h-3.5" /> : null}
                    {item}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                placeholder="Add another amenity..."
                className="flex-grow px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-white font-bold text-xs"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              5. Detailed Overview *
            </h2>

            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={5}
              required
              className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Read-Only Host Info (Requirement: Read-only host info) */}
          <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <UserCheck className="w-4 h-4 text-orange-500" />
              Listing Host Information (Read-Only)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] text-zinc-400">Host Name:</span>
                <input
                  type="text"
                  value={ownerName}
                  readOnly
                  disabled
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-not-allowed"
                />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400">Host Email:</span>
                <input
                  type="email"
                  value={ownerEmail}
                  readOnly
                  disabled
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-mono font-bold text-zinc-700 dark:text-zinc-300 cursor-not-allowed"
                />
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-4 px-6 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Save Updates to MongoDB
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
