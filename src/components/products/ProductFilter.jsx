/**
 * Tech Bazar - Product Filters & Sort Controls
 * Supports Day (Light) and Night (Dark) mode.
 */

import React from 'react';
import { SlidersHorizontal, ArrowUpDown, X, Tag, CheckSquare, Square } from 'lucide-react';
import { INITIAL_CATEGORIES } from '../../data/initialData.js';

export default function ProductFilter({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  discountOnly,
  setDiscountOnly,
  inStockOnly,
  setInStockOnly,
  sortBy,
  setSortBy,
  onResetFilters,
  totalResults,
}) {
  const isFiltered = 
    selectedCategory !== 'all' || 
    discountOnly || 
    inStockOnly || 
    priceRange < 300000;

  return (
    <div className="bg-white dark:bg-neutral-900/70 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-400">
            <SlidersHorizontal className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-neutral-900 dark:text-white flex items-center gap-2">
              Filter Hardware Catalog
              <span className="text-xs font-mono font-normal text-neutral-500 dark:text-neutral-400">
                ({totalResults} items available)
              </span>
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Narrow down by price, discounts, and brand availability
            </p>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <ArrowUpDown className="w-4 h-4 text-neutral-400" />
          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-neutral-50 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-amber-500 font-medium"
          >
            <option value="featured">Featured Picks</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="discount">Biggest Discount (%)</option>
            <option value="rating">Top Customer Rated</option>
          </select>
        </div>
      </div>

      {/* Filter Control Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 pt-4">
        {/* Category selector */}
        <div>
          <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider block mb-1.5 font-semibold">
            Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-neutral-50 dark:bg-neutral-800/90 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-neutral-200 focus:outline-none focus:border-amber-500"
          >
            {INITIAL_CATEGORIES.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Max Price Range */}
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-wider font-semibold">
              Max Price:
            </label>
            <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
              ৳{Number(priceRange).toLocaleString()}
            </span>
          </div>
          <input
            type="range"
            min="10000"
            max="300000"
            step="5000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full accent-amber-500 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 font-mono mt-1">
            <span>৳10k</span>
            <span>৳150k</span>
            <span>৳300k</span>
          </div>
        </div>

        {/* Toggles: Discount & Stock */}
        <div className="flex flex-col justify-center gap-2">
          <button
            onClick={() => setDiscountOnly(!discountOnly)}
            className="flex items-center gap-2 text-xs text-left cursor-pointer group"
          >
            {discountOnly ? (
              <CheckSquare className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0 group-hover:text-neutral-600 dark:group-hover:text-neutral-400" />
            )}
            <span className={discountOnly ? 'text-amber-600 dark:text-amber-300 font-semibold' : 'text-neutral-700 dark:text-neutral-300'}>
              Special Deals Only
            </span>
          </button>

          <button
            onClick={() => setInStockOnly(!inStockOnly)}
            className="flex items-center gap-2 text-xs text-left cursor-pointer group"
          >
            {inStockOnly ? (
              <CheckSquare className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0" />
            ) : (
              <Square className="w-4 h-4 text-neutral-400 dark:text-neutral-500 shrink-0 group-hover:text-neutral-600 dark:group-hover:text-neutral-400" />
            )}
            <span className={inStockOnly ? 'text-amber-600 dark:text-amber-300 font-semibold' : 'text-neutral-700 dark:text-neutral-300'}>
              In-Stock Units Only
            </span>
          </button>
        </div>

        {/* Reset Filter Action */}
        <div className="flex items-end">
          {isFiltered ? (
            <button
              onClick={onResetFilters}
              className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-300 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold transition-colors"
            >
              <X className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
              <span>Reset All Filters</span>
            </button>
          ) : (
            <div className="text-[11px] text-neutral-400 dark:text-neutral-500 italic pb-2">
              Viewing all catalog items
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
