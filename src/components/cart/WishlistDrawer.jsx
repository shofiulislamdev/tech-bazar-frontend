/**
 * Tech Bazar - Saved Wishlist Drawer
 * Day & Night mode compliant.
 */

import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { formatPrice, getDiscountedPrice } from '../../data/initialData.js';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';

export default function WishlistDrawer() {
  const {
    wishlist,
    isWishlistOpen,
    setIsWishlistOpen,
    toggleWishlist,
    moveWishlistToCart,
  } = useCartWishlist();

  if (!isWishlistOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-250 text-neutral-900 dark:text-neutral-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500">
              <Heart className="w-5 h-5 fill-rose-500" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">Your Saved Wishlist</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {wishlist.length} {wishlist.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Wishlist Items */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {wishlist.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">Your wishlist is empty</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mb-6">
                Click the heart icon on any device to save it for later review or price drops.
              </p>
              <button
                onClick={() => setIsWishlistOpen(false)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
              >
                Explore Hardware
              </button>
            </div>
          ) : (
            wishlist.map((item) => {
              const discountedPrice = getDiscountedPrice(item.price, item.discountPercent);

              return (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200 dark:border-neutral-800/90 items-center shadow-xs"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400/90 uppercase block font-semibold truncate">
                      {item.brand || item.category}
                    </span>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate mb-1">
                      {item.name}
                    </h4>
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white">
                        {formatPrice(discountedPrice)}
                      </span>
                      {item.discountPercent > 0 && (
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 line-through font-mono">
                          {formatPrice(item.price)}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => moveWishlistToCart(item)}
                      className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 hover:bg-amber-400 text-neutral-950 text-xs font-bold rounded-md transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3 h-3" />
                      <span>Move to Cart</span>
                    </button>
                  </div>

                  <button
                    onClick={() => toggleWishlist(item)}
                    className="p-2 text-neutral-400 hover:text-rose-500 transition-colors"
                    title="Remove from wishlist"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
