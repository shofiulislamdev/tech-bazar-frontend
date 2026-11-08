/**
 * Tech Bazar - Interactive Hero Banner Slider
 * Light & Dark mode compliant.
 */

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, ShieldCheck, Zap, Truck } from 'lucide-react';

export default function HeroSlider({ slides, onSelectCategory }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-play slider (every 5.5s)
  useEffect(() => {
    if (isPaused || !slides || slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 5500);

    return () => clearInterval(interval);
  }, [isPaused, slides]);

  if (!slides || slides.length === 0) return null;

  const currentSlide = slides[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
  };

  return (
    <div
      className="relative max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-3 sm:pt-4 pb-6 sm:pb-8"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slide Container */}
      <div className="relative rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl h-[380px] sm:h-[440px] md:h-[480px]">
        {/* Background Image with warm amber/dark gradient scrim */}
        <div className="absolute inset-0">
          <img
            src={currentSlide.image}
            alt={currentSlide.title}
            className="w-full h-full object-cover object-center transition-all duration-700 transform scale-100"
            referrerPolicy="no-referrer"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
            }}
          />
          {/* Scrim overlay for high legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950/95 via-neutral-950/75 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/30" />
        </div>

        {/* Slide Content */}
        <div className="relative z-10 h-full flex flex-col justify-center max-w-2xl px-6 sm:px-12 lg:px-16">
          {/* Quiet Tag & Discount */}
          <div className="flex items-center gap-3 text-xs mb-3">
            <span className="font-mono uppercase tracking-wider text-amber-400 font-bold">
              {currentSlide.tag || 'FEATURED OFFER'}
            </span>
            <span className="text-neutral-500 font-bold">/</span>
            <span className="bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30 font-mono">
              {currentSlide.discount}
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight mb-4 text-balance">
            {currentSlide.title}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 mb-6 line-clamp-2 sm:line-clamp-none max-w-xl">
            {currentSlide.subtitle}
          </p>

          {/* CTA Action */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => onSelectCategory(currentSlide.categoryTarget || 'all')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold text-sm rounded-lg shadow-lg shadow-amber-500/25 transition-all group"
            >
              <span>{currentSlide.buttonText || 'Shop Collection'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <span className="text-xs text-neutral-400 hidden sm:inline-block">
              Warranty & Express Dispatch
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-700/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-neutral-900/70 hover:bg-neutral-900 border border-neutral-700/60 text-white flex items-center justify-center backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicator Dots */}
        <div className="absolute bottom-5 left-6 sm:left-12 z-20 flex items-center gap-2">
          {slides.map((slide, idx) => (
            <button
              key={slide.id || idx}
              onClick={() => setCurrentSlideIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 transition-all rounded-full ${currentSlideIndex === idx
                  ? 'w-8 bg-amber-400'
                  : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                }`}
            />
          ))}
        </div>
      </div>

      {/* Trust Badges Strip (Day & Night styled) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
        <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-500 dark:text-amber-400 shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">100% Genuine Tech</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Direct authorized brand distribution</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-500 dark:text-orange-400 shrink-0">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Fast Nationwide Delivery</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Free delivery on orders over ৳5,000</p>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-semibold text-neutral-900 dark:text-white">Official Warranty</h4>
            <p className="text-[11px] text-neutral-500 dark:text-neutral-400">Hassle-free replacement policy</p>
          </div>
        </div>
      </div>
    </div>
  );
}
