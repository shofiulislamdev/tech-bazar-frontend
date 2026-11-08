/**
 * Tech Bazar - Category Navigation & Quick Filter
 * Light & Dark (Day / Night) mode aware.
 */

import React from 'react';
import { 
  Monitor, 
  Cpu, 
  MemoryStick, 
  Smartphone, 
  Layers, 
  HardDrive, 
  Laptop, 
  Headphones, 
  Grid 
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
  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 mb-6 sm:mb-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 font-mono">
          Browse By Hardware Category
        </h2>
        <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold hidden sm:inline">
          Showing authentic warranty gear
        </span>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {INITIAL_CATEGORIES.map((cat) => {
          const Icon = ICON_MAP[cat.icon] || Grid;
          const isSelected = selectedCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border text-xs font-semibold whitespace-nowrap shrink-0 transition-all ${
                isSelected
                  ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/20 font-bold'
                  : 'bg-white dark:bg-neutral-900/80 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-850 hover:text-neutral-950 dark:hover:text-white shadow-xs'
              }`}
            >
              <Icon className={`w-4 h-4 ${isSelected ? 'text-neutral-950' : 'text-amber-500 dark:text-amber-400'}`} />
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
