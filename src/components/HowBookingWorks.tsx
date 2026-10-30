'use client';

import React from 'react';
import { Search, Calendar, Zap, Sparkles } from 'lucide-react';

const STEPS = [
  {
    step: '01',
    title: 'Discover Spaces',
    description:
      'Filter by category, ceiling height, lighting gear, and acoustic treatment to pinpoint the ideal creative set for your project.',
    icon: Search,
    accent: 'from-orange-500 to-amber-500',
  },
  {
    step: '02',
    title: 'Select Shoot Hours',
    description:
      'Inspect dynamic real-time slot availability. Select your production start and wrap times with guaranteed double-booking collision prevention.',
    icon: Calendar,
    accent: 'from-amber-500 to-rose-500',
  },
  {
    step: '03',
    title: 'Book Instantly',
    description:
      'Lock in your studio reservation with transparent pricing and comprehensive host protection. Instant status confirmation and receipt dispatch.',
    icon: Zap,
    accent: 'from-rose-500 to-purple-500',
  },
  {
    step: '04',
    title: 'Create & Produce',
    description:
      'Arrive on set with access codes in hand. Unpack equipment, collaborate with your crew, and bring your visionary projects to life.',
    icon: Sparkles,
    accent: 'from-purple-500 to-indigo-500',
  },
];

export default function HowBookingWorks() {
  return (
    <section id="how-it-works" className="py-20 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-950/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/10 text-orange-600 dark:text-orange-400 text-xs font-bold uppercase tracking-wider">
            Streamlined Creator Workflow
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-zinc-900 dark:text-white tracking-tight">
            How Booking Works
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            From initial discovery to call sheet wrap, reserving high-end creative facilities takes just four straightforward steps.
          </p>
        </div>

        {/* 4-Step Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {STEPS.map((item, index) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="relative flex flex-col p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-lg transition-all duration-300 group"
              >
                {/* Step Number Top Pill */}
                <div className="flex items-center justify-between mb-6">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${item.accent} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform`}
                  >
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="text-2xl font-black text-zinc-300 dark:text-zinc-700 font-mono">
                    {item.step}
                  </span>
                </div>

                {/* Step Content */}
                <h3 className="font-extrabold text-lg text-zinc-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed flex-grow">
                  {item.description}
                </p>

                {/* Progress bar line for visual flow */}
                <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                  <span className="text-[11px] font-bold text-orange-500 uppercase tracking-wider">
                    Step {index + 1} of 4
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
