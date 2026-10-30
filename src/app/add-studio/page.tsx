'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import ProtectedRoute from '../../components/ProtectedRoute';
import { useAuth } from '../../context/AuthContext';
import { apiCreateStudio } from '../../lib/api';
import { StudioCategory } from '../../types';
import {
  PlusCircle,
  Building2,
  DollarSign,
  Shield,
  Users,
  MapPin,
  Image as ImageIcon,
  Check,
  Tag,
  FileText,
  UserCheck,
  ArrowRight,
  ExternalLink,
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

export default function AddStudioPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<StudioCategory>('Photo Studio');
  const [hourlyRate, setHourlyRate] = useState<number>(95);
  const [securityDeposit, setSecurityDeposit] = useState<number>(150);
  const [maxCapacity, setMaxCapacity] = useState<number>(15);
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  const [amenities, setAmenities] = useState<string[]>([
    'Cyclorama Wall',
    '1Gbps Fiber Wi-Fi',
    'Hair & Makeup Vanity',
  ]);
  const [customAmenity, setCustomAmenity] = useState('');
  const [overview, setOverview] = useState('');
  const [loading, setLoading] = useState(false);

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
      toast.error('Please complete all mandatory fields: Title, Location, Image, and Overview.');
      return;
    }

    try {
      setLoading(true);
      const res = await apiCreateStudio({
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

      // Requirement: Upon submission, save data in MongoDB studios collection, show a success toast, and redirect to /my-listings.
      toast.success(res.message || 'Studio listing published successfully!');
      router.push('/my-listings');
    } catch (err: any) {
      toast.error(err.message || 'Failed to create studio listing.');
    } finally {
      setLoading(false);
    }
  };

  const samplePhoto = () => {
    setImage('https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1200&q=80');
    toast.info('Filled sample studio image URL');
  };

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8">
        
        {/* Header Title */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            <PlusCircle className="w-3.5 h-3.5" />
            Host Workspace Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            List a New Production Studio
          </h1>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Showcase your daylight loft, sound stage, podcast booth, or music suite to thousands of verified creative directors and producers.
          </p>
        </div>

        {/* Studio Form */}
        <form onSubmit={handleSubmit} className="space-y-8 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 sm:p-10 rounded-3xl shadow-xl">
          
          {/* Section 1: Basic Information */}
          <div className="space-y-5">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-orange-500" />
              1. Workspace Details
            </h2>

            {/* Studio Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Studio Title / Stage Name *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Apex Daylight Cyc Wall Loft"
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Category & Capacity Grid */}
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

            {/* Location */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                Location & Neighborhood Address *
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. 450 Broadway, SoHo Creative District, New York, NY"
                  required
                  className="w-full px-4 py-3 pl-10 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <MapPin className="w-4 h-4 text-zinc-400 absolute left-3.5 top-3.5" />
              </div>
            </div>
          </div>

          {/* Section 2: Pricing & Deposit */}
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

          {/* Section 3: Visuals & ImgBB Integration */}
          <div className="space-y-5">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <ImageIcon className="w-5 h-5 text-orange-500" />
              3. Visuals & Image Upload
            </h2>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-300">
                  High-Resolution Studio Image URL *
                </label>
                <div className="flex items-center gap-3">
                  <a
                    href="https://imgbb.com/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-bold text-orange-500 hover:underline inline-flex items-center gap-1"
                  >
                    Upload to ImgBB <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={samplePhoto}
                    className="text-xs text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 underline"
                  >
                    Use Sample URL
                  </button>
                </div>
              </div>

              <input
                type="url"
                value={image}
                onChange={(e) => setImage(e.target.value)}
                placeholder="https://images.unsplash.com/... or https://i.ibb.co/..."
                required
                className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />

              {image && (
                <div className="mt-3 relative aspect-[16/9] max-h-56 rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-zinc-800">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <span className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded text-[11px] text-white">
                    Live Photo Preview
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Section 4: Amenities Tags */}
          <div className="space-y-4">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <Tag className="w-5 h-5 text-orange-500" />
              4. Equipment & Amenities Checklist
            </h2>

            <p className="text-xs text-zinc-500">
              Select all available amenities to help creators evaluate technical capability:
            </p>

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

            {/* Add Custom Tag */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={customAmenity}
                onChange={(e) => setCustomAmenity(e.target.value)}
                placeholder="Add custom amenity (e.g. Smoke Machine, Teleprompter)..."
                className="flex-grow px-4 py-2.5 rounded-xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                type="button"
                onClick={addCustomAmenity}
                className="px-4 py-2.5 rounded-xl bg-zinc-800 text-white font-bold text-xs hover:bg-zinc-700 transition-colors"
              >
                Add Tag
              </button>
            </div>
          </div>

          {/* Section 5: Detailed Overview */}
          <div className="space-y-3">
            <h2 className="text-lg font-extrabold text-zinc-900 dark:text-white border-b border-zinc-100 dark:border-zinc-800 pb-3 flex items-center gap-2">
              <FileText className="w-5 h-5 text-orange-500" />
              5. Detailed Overview *
            </h2>

            <textarea
              value={overview}
              onChange={(e) => setOverview(e.target.value)}
              rows={5}
              placeholder="Provide in-depth dimensions, ceiling height, natural light direction, power circuits, load-in accessibility, and house rules..."
              required
              className="w-full px-4 py-3 rounded-2xl border border-zinc-300 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Section 6: Read-Only User Email & Name (Requirement) */}
          <div className="space-y-3 p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-200 dark:border-zinc-700/60">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500">
              <UserCheck className="w-4 h-4 text-orange-500" />
              Host Verification Info (Read-Only)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[11px] text-zinc-400">Host Full Name:</span>
                <input
                  type="text"
                  value={user?.name || ''}
                  readOnly
                  disabled
                  className="w-full mt-1 px-3.5 py-2 rounded-xl bg-zinc-200/60 dark:bg-zinc-900 border border-zinc-300 dark:border-zinc-700 text-xs font-bold text-zinc-700 dark:text-zinc-300 cursor-not-allowed"
                />
              </div>
              <div>
                <span className="text-[11px] text-zinc-400">Host Email Address:</span>
                <input
                  type="email"
                  value={user?.email || ''}
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
            disabled={loading}
            className="w-full py-4 px-6 rounded-2xl text-base font-extrabold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-xl shadow-orange-500/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                Publish Studio Listing to Marketplace
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
