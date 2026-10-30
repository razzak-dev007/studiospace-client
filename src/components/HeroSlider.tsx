'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Sparkles, Compass, PlusCircle, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  badge: string;
  headline: string;
  subtext: string;
  image: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText: string;
  secondaryCtaLink: string;
  tag: string;
}

const SLIDES: Slide[] = [
  {
    id: 1,
    badge: 'High-Performance Creator Marketplace',
    headline: 'Rent Extraordinary Creative Studios On-Demand',
    subtext:
      'Discover and reserve daylight cyclorama walls, soundproof audio suites, and cinema stages directly from vetted industry hosts. Transparent hourly rates with zero hidden fees.',
    image:
      'https://images.unsplash.com/photo-1527011046414-4781f1f94f8c?auto=format&fit=crop&w=1920&q=85',
    primaryCtaText: 'Explore Studios',
    primaryCtaLink: '/studios',
    secondaryCtaText: 'Host Your Space',
    secondaryCtaLink: '/add-studio',
    tag: 'Photography • Daylight Cyc Walls',
  },
  {
    id: 2,
    badge: 'Production-Ready Infrastructure',
    headline: 'Produce Cinema-Grade Visuals in Certified Sound Stages',
    subtext:
      'Equipped with 30ft chromakey green screens, 600A Camlock power grids, and silent HVAC air systems. Step into production environments calibrated for commercial films and music videos.',
    image:
      'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=1920&q=85',
    primaryCtaText: 'Discover Film Stages',
    primaryCtaLink: '/studios?category=Film+Stage',
    secondaryCtaText: 'Host Your Space',
    secondaryCtaLink: '/add-studio',
    tag: 'Film & VFX • ARRI Skypanel Grids',
  },
  {
    id: 3,
    badge: 'Pristine Acoustics & Dolby Atmos',
    headline: 'Record Broadcast Podcasts & Spatial Audio Without Compromise',
    subtext:
      'From 4K multi-camera vodcast sets with Shure SM7B microphones to Dolby Atmos 7.1.4 spatial mixing suites and rare analog vinyl beat labs.',
    image:
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=1920&q=85',
    primaryCtaText: 'Browse Audio Suites',
    primaryCtaLink: '/studios?category=Music+Suite',
    secondaryCtaText: 'Host Your Space',
    secondaryCtaLink: '/add-studio',
    tag: 'Music Suites • Podcast Lounges',
  },
];

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  // Autoplay timer (5 seconds)
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  return (
    <div
      className="relative w-full overflow-hidden rounded-3xl bg-zinc-950 border border-zinc-200/50 dark:border-zinc-800 shadow-2xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="StudioSpace Featured Showcase Slider"
    >
      {/* Slide Visuals */}
      <div className="relative min-h-[520px] md:min-h-[580px] lg:min-h-[640px] flex items-center">
        {SLIDES.map((slide, index) => {
          const isActive = index === current;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              {/* Background Image with Dark Vignette Gradient */}
              <div
                className="absolute inset-0 bg-cover bg-center transform transition-transform duration-7000 ease-out scale-105"
                style={{
                  backgroundImage: `url(${slide.image})`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />

              {/* Slide Content */}
              <div className="relative z-20 h-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col justify-center py-16">
                <div className="max-w-2xl space-y-6">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-400 text-xs font-bold tracking-wide backdrop-blur-md">
                    <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                    <span>{slide.badge}</span>
                  </div>

                  {/* Headline */}
                  <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white leading-[1.1]">
                    {slide.headline}
                  </h1>

                  {/* Subtext */}
                  <p className="text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl">
                    {slide.subtext}
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-wrap items-center gap-3.5 pt-2">
                    <Link
                      href={slide.primaryCtaLink}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500 hover:from-orange-600 hover:to-rose-600 shadow-lg shadow-orange-500/25 transition-all hover:scale-[1.02]"
                    >
                      <Compass className="w-4 h-4" />
                      {slide.primaryCtaText}
                      <ArrowRight className="w-4 h-4" />
                    </Link>

                    <Link
                      href={slide.secondaryCtaLink}
                      className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-bold text-zinc-200 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all hover:scale-[1.02]"
                    >
                      <PlusCircle className="w-4 h-4" />
                      {slide.secondaryCtaText}
                    </Link>
                  </div>

                  {/* Category Pill Tag */}
                  <div className="pt-2">
                    <span className="text-xs font-semibold text-zinc-400 tracking-wider uppercase">
                      {slide.tag}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Arrow Controls */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-zinc-900/60 hover:bg-zinc-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 focus:outline-none"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-zinc-900/60 hover:bg-zinc-900/90 text-white border border-white/20 backdrop-blur-md flex items-center justify-center transition-all hover:scale-110 focus:outline-none"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Indicator Dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`transition-all duration-300 rounded-full ${
              idx === current
                ? 'w-8 h-2.5 bg-orange-500'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
