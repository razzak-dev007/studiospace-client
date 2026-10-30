'use client';

import React from 'react';
import Link from 'next/link';
import { Camera, Film, Mic, Headphones, Palette, ArrowRight } from 'lucide-react';

interface CategoryItem {
  id: string;
  name: string;
  queryValue: string;
  countDesc: string;
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  description: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'photo',
    name: 'Photo Studios',
    queryValue: 'Photo Studio',
    countDesc: '18+ Cyc Lofts',
    icon: Camera,
    image: 'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=600&q=80',
    description: 'Daylight lofts, curved cyclorama walls & high-output strobes.',
  },
  {
    id: 'film',
    name: 'Sound Stages',
    queryValue: 'Film Stage',
    countDesc: '12+ Production Bays',
    icon: Film,
    image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=600&q=80',
    description: 'Acoustic treatment, chromakey green screens & camlock power.',
  },
  {
    id: 'podcast',
    name: 'Podcast Rooms',
    queryValue: 'Podcast Lounge',
    countDesc: '24+ Vodcast Lounges',
    icon: Mic,
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=600&q=80',
    description: 'Multi-camera 4K setups with Shure SM7B broadcast microphones.',
  },
  {
    id: 'music',
    name: 'Music Suites',
    queryValue: 'Music Suite',
    countDesc: '15+ Audio Sanctuaries',
    icon: Headphones,
    image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=600&q=80',
    description: 'Dolby Atmos monitoring, analog tape machines & vocal booths.',
  },
  {
    id: 'art',
    name: 'Art Workshops',
    queryValue: 'Art Workshop',
    countDesc: '10+ Maker Spaces',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&w=600&q=80',
    description: 'Ceramic kilns, timber workbenches & expansive natural skylights.',
  },
];

export default function CategoryShowcase() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider mb-2">
              Curated Workspace Categories
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Browse by Studio Specialty
            </h2>
            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mt-1 max-w-xl">
              Choose your creative medium to find purpose-built environments tailored to your equipment and workflow.
            </p>
          </div>

          <Link
            href="/studios"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-orange-600 dark:text-orange-400 hover:text-orange-500 transition-colors"
          >
            Explore All Categories
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => {
            const IconComponent = cat.icon;
            return (
              <Link
                key={cat.id}
                href={`/studios?category=${encodeURIComponent(cat.queryValue)}`}
                className="group relative flex flex-col h-72 rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-md hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-500/50 transition-all duration-300"
              >
                {/* Background Image */}
                <div
                  className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-700"
                  style={{ backgroundImage: `url(${cat.image})` }}
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-zinc-950/20" />

                {/* Content */}
                <div className="relative z-10 p-5 h-full flex flex-col justify-between text-white">
                  {/* Top: Icon & Count */}
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-orange-500 transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold text-zinc-300 bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                      {cat.countDesc}
                    </span>
                  </div>

                  {/* Bottom: Title & Description */}
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-lg text-white group-hover:text-orange-400 transition-colors flex items-center justify-between">
                      <span>{cat.name}</span>
                      <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform -translate-x-2 group-hover:translate-x-0 transition-all text-orange-400" />
                    </h3>
                    <p className="text-xs text-zinc-300 line-clamp-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
