/**
 * Tech Bazar - Product Card Component
 * Clean e-commerce card with dual-theme (Day / Night) mode support.
 */

import React from 'react';
import { Heart, ShoppingBag, Star, Eye } from 'lucide-react';
import { formatPrice, getDiscountedPrice } from '../../data/initialData.js';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';

export default function ProductCard({ product, onOpenDetails }) {
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();
  const inWishlist = isInWishlist(product.id);

  const discountedPrice = getDiscountedPrice(product.price, product.discountPercent);
  const hasDiscount = product.discountPercent && product.discountPercent > 0;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-neutral-900/90 rounded-2xl border border-neutral-200 dark:border-neutral-800/90 hover:border-neutral-300 dark:hover:border-neutral-700/80 hover:shadow-xl dark:hover:shadow-black/50 transition-all duration-200 overflow-hidden shadow-xs">
      
      {/* Visual Slot */}
      <div className="relative aspect-[4/3] w-full bg-neutral-100 dark:bg-neutral-950 overflow-hidden flex items-center justify-center p-4">
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 z-10 px-2 py-0.5 rounded bg-amber-500 text-neutral-950 font-bold font-mono text-[11px] shadow-sm">
            -{product.discountPercent}% OFF
          </div>
        )}

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all ${
            inWishlist
              ? 'bg-rose-500 text-white shadow-md shadow-rose-500/25'
              : 'bg-white/90 dark:bg-neutral-900/80 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 border border-neutral-200 dark:border-neutral-700/60 shadow-xs'
          }`}
          title={inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
        >
          <Heart className={`w-4 h-4 ${inWishlist ? 'fill-white' : ''}`} />
        </button>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover object-center rounded-lg group-hover:scale-105 transition-transform duration-300"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />

        {/* Quick View Button on Hover */}
        <button
          onClick={() => onOpenDetails(product)}
          className="absolute bottom-3 inset-x-3 py-2 bg-white/95 dark:bg-neutral-900/90 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-900 dark:text-white text-xs font-semibold rounded-lg opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-md flex items-center justify-center gap-1.5 border border-neutral-300 dark:border-neutral-700/80 shadow-md"
        >
          <Eye className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
          <span>Quick View Specs</span>
        </button>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex flex-col flex-1 justify-between">
        <div>
          {/* Brand & Category Kicker */}
          <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mb-1.5 font-mono">
            <span className="uppercase tracking-wider text-[11px] text-amber-600 dark:text-amber-500/90 font-semibold">
              {product.brand}
            </span>
            <span className="capitalize text-neutral-400 dark:text-neutral-500">
              {product.category}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => onOpenDetails(product)}
            className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2 cursor-pointer leading-snug mb-2"
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-3">
            <div className="flex items-center text-amber-500 dark:text-amber-400">
              <Star className="w-3.5 h-3.5 fill-amber-500 dark:fill-amber-400" />
              <span className="ml-1 font-semibold text-neutral-900 dark:text-white font-mono">{product.rating}</span>
            </div>
            <span className="text-neutral-400 dark:text-neutral-600">·</span>
            <span className="text-[11px] text-neutral-500">({product.reviewsCount} reviews)</span>
          </div>
        </div>

        {/* Price & Add to Cart Footer */}
        <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800/80 flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-base font-extrabold text-neutral-900 dark:text-white font-mono tracking-tight">
                {formatPrice(discountedPrice)}
              </span>
              {hasDiscount && (
                <span className="text-xs text-neutral-400 dark:text-neutral-500 line-through font-mono">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>
            <span className={`text-[10px] font-mono block ${product.stock < 5 ? 'text-amber-600 dark:text-amber-400 font-semibold' : 'text-emerald-600 dark:text-emerald-400'}`}>
              {product.stock < 5 ? `Low Stock (${product.stock} left)` : 'In Stock'}
            </span>
          </div>

          <button
            onClick={() => addToCart(product, 1)}
            className="flex items-center gap-1.5 px-3 py-2 bg-amber-500 hover:bg-amber-400 active:scale-95 text-neutral-950 rounded-lg text-xs font-bold transition-all shadow-md shadow-amber-500/20 whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
