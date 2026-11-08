/**
 * Tech Bazar - Category Navigation & Quick Filter
 * Light & Dark (Day / Night) mode aware.
 */

import React, { useRef, useState, useEffect } from 'react';
import {
  Monitor,
  Cpu,
  MemoryStick,
  Smartphone,
  Layers,
  HardDrive,
  Laptop,
  Headphones,
  Grid,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/initialData.js';

const ICON_MAP = {
  Cpu: Cpu,
  Monitor: Monitor,
  MemoryStick: MemoryStick,
  Smartphone: Smartphone,
  Layers: Layers,
  HardDrive: HardDrive,
  Laptop: Laptop,
  Headphones: Headphones,
};

export default function CategoryBar({ selectedCategory, onSelectCategory }) {
  const scrollRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isMouseDown, setIsMouseDown] = useState(false);

  // Drag-to-scroll tracking refs
  const startXRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);

  // Check scroll boundary to toggle arrows
  const checkScrollBounds = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 4);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    checkScrollBounds();
    el.addEventListener('scroll', checkScrollBounds, { passive: true });
    window.addEventListener('resize', checkScrollBounds);

    // Mouse wheel horizontal scroll support
    const handleWheel = (e) => {
      // If user scrolls vertically over the bar, convert to horizontal scroll
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        if (
          (e.deltaY > 0 && el.scrollLeft < el.scrollWidth - el.clientWidth) ||
          (e.deltaY < 0 && el.scrollLeft > 0)
        ) {
          e.preventDefault();
          el.scrollLeft += e.deltaY * 0.9;
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      el.removeEventListener('scroll', checkScrollBounds);
      window.removeEventListener('resize', checkScrollBounds);
      el.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Smooth scroll with arrows
  const scrollByAmount = (offset) => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
  };

  // Mouse drag handlers
  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsMouseDown(true);
    isDraggingRef.current = false;
    startXRef.current = e.pageX - scrollRef.current.offsetLeft;
    scrollLeftRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startXRef.current) * 1.5;
    if (Math.abs(walk) > 5) {
      isDraggingRef.current = true;
    }
    scrollRef.current.scrollLeft = scrollLeftRef.current - walk;
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8 select-none">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
          Browse By Hardware Category
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold hidden sm:inline">
            Showing authentic warranty gear
          </span>
          {/* Desktop Arrow Controls */}
          <div className="hidden sm:flex items-center gap-1 ml-2">
            <button
              onClick={() => scrollByAmount(-260)}
              disabled={!canScrollLeft}
              className={`p-1.5 rounded-lg border transition-all ${canScrollLeft
                  ? 'border-neutral-300 dark:border-neutral-700 hover:border-amber-500 text-neutral-700 dark:text-neutral-200 hover:text-amber-500 bg-white dark:bg-neutral-800 shadow-xs cursor-pointer'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 bg-neutral-50 dark:bg-neutral-900/40 cursor-not-allowed opacity-50'
                }`}
              title="Scroll Categories Left"
              aria-label="Scroll Categories Left"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => scrollByAmount(260)}
              disabled={!canScrollRight}
              className={`p-1.5 rounded-lg border transition-all ${canScrollRight
                  ? 'border-neutral-300 dark:border-neutral-700 hover:border-amber-500 text-neutral-700 dark:text-neutral-200 hover:text-amber-500 bg-white dark:bg-neutral-800 shadow-xs cursor-pointer'
                  : 'border-neutral-200 dark:border-neutral-800 text-neutral-300 dark:text-neutral-700 bg-neutral-50 dark:bg-neutral-900/40 cursor-not-allowed opacity-50'
                }`}
              title="Scroll Categories Right"
              aria-label="Scroll Categories Right"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Categories Scrollable Strip with Mouse Drag & Wheel Support */}
      <div className="relative group">
        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className={`flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none scroll-smooth ${isMouseDown ? 'cursor-grabbing select-none' : 'cursor-grab'
            }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {INITIAL_CATEGORIES.map((cat) => {
            const Icon = ICON_MAP[cat.icon] || Grid;
            const isSelected = selectedCategory === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  // Only select if it was a genuine click, not a drag release
                  if (!isDraggingRef.current) {
                    onSelectCategory(cat.id);
                  }
                }}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap shrink-0 transition-all select-none ${isSelected
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                    : 'bg-white dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-850 hover:text-neutral-950 dark:hover:text-white shadow-xs'
                  }`}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-neutral-950' : 'text-amber-500 dark:text-amber-400'}`} />
                <span>{cat.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
