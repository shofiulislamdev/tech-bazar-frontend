/**
 * Tech Bazar - Detailed Product Modal
 * Dual-theme (Day & Night) mode support.
 */

import React, { useState } from 'react';
import { 
  X, 
  ShoppingBag, 
  Heart, 
  Star, 
  ShieldCheck, 
  Truck, 
  RotateCcw, 
  Check, 
  Zap 
} from 'lucide-react';
import { formatPrice, getDiscountedPrice } from '../../data/initialData.js';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';

export default function ProductDetailModal({ product, onClose, onBuyNow }) {
  const [quantity, setQuantity] = useState(1);
  const { addToCart, toggleWishlist, isInWishlist } = useCartWishlist();

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);
  const discountedPrice = getDiscountedPrice(product.price, product.discountPercent);
  const savings = product.price - discountedPrice;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    if (onBuyNow) onBuyNow();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200 text-neutral-900 dark:text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-neutral-100 dark:bg-neutral-800/80 hover:bg-neutral-200 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 sm:p-8">
          
          {/* Left: Product Image & Badges */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square w-full rounded-xl bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-6 flex items-center justify-center overflow-hidden">
              {product.discountPercent > 0 && (
                <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded-md bg-amber-500 text-neutral-950 font-black font-mono text-xs shadow-md">
                  SAVE {product.discountPercent}%
                </div>
              )}

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain object-center"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Quick trust strip */}
            <div className="grid grid-cols-3 gap-2 text-center text-[11px] text-neutral-600 dark:text-neutral-400">
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-850 flex flex-col items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>Genuine Warranty</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-850 flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-orange-500 dark:text-orange-400" />
                <span>Express Courier</span>
              </div>
              <div className="p-2.5 rounded-lg bg-neutral-50 dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-850 flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                <span>7-Day Return</span>
              </div>
            </div>
          </div>

          {/* Right: Info & Specs */}
          <div className="flex flex-col justify-between">
            <div>
              {/* Category & Brand */}
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-600 dark:text-amber-400 mb-2 font-semibold">
                <span>{product.brand}</span>
                <span>/</span>
                <span className="text-neutral-500 dark:text-neutral-400">{product.category}</span>
              </div>

              {/* Title */}
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white leading-snug mb-3">
                {product.name}
              </h2>

              {/* Rating & Stock */}
              <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 pb-4 border-b border-neutral-200 dark:border-neutral-800 mb-4">
                <div className="flex items-center text-amber-500 dark:text-amber-400">
                  <Star className="w-4 h-4 fill-amber-500 dark:fill-amber-400" />
                  <span className="ml-1 font-bold text-neutral-900 dark:text-white font-mono">{product.rating}</span>
                  <span className="text-neutral-400 dark:text-neutral-500 ml-1">({product.reviewsCount} reviews)</span>
                </div>
                <span>·</span>
                <span className={`font-mono font-medium ${product.stock > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                  {product.stock > 0 ? `In Stock (${product.stock} units)` : 'Out of Stock'}
                </span>
              </div>

              {/* Pricing Box */}
              <div className="bg-neutral-50 dark:bg-neutral-950/80 p-4 rounded-xl border border-neutral-200 dark:border-neutral-800/80 mb-5">
                <div className="flex items-baseline gap-3 mb-1">
                  <span className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono tracking-tight">
                    {formatPrice(discountedPrice)}
                  </span>
                  {product.discountPercent > 0 && (
                    <span className="text-sm text-neutral-400 dark:text-neutral-500 line-through font-mono">
                      {formatPrice(product.price)}
                    </span>
                  )}
                </div>
                {savings > 0 && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                    You save {formatPrice(savings)} ({product.discountPercent}% OFF instant discount)
                  </p>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed mb-5">
                {product.description}
              </p>

              {/* Hardware Specifications Table */}
              {product.specs && (
                <div className="mb-6">
                  <h4 className="text-xs font-mono font-bold uppercase text-neutral-500 dark:text-neutral-400 mb-2.5">
                    Technical Specifications
                  </h4>
                  <div className="bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden text-xs">
                    {Object.entries(product.specs).map(([key, val], idx) => (
                      <div
                        key={key}
                        className={`flex py-2 px-3 border-b border-neutral-200 dark:border-neutral-850 last:border-b-0 ${
                          idx % 2 === 0 ? 'bg-neutral-100/60 dark:bg-neutral-900/40' : ''
                        }`}
                      >
                        <span className="w-1/3 text-neutral-500 dark:text-neutral-400 font-medium font-mono text-[11px]">
                          {key}
                        </span>
                        <span className="w-2/3 text-neutral-800 dark:text-neutral-200 font-semibold">
                          {val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Purchase Bar */}
            <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Stepper */}
                <div className="flex items-center bg-neutral-100 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg p-1 text-sm">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-8 h-8 rounded flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 font-bold"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-neutral-900 dark:text-white">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 rounded flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 font-bold"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  className="flex-1 py-3 px-4 bg-neutral-900 dark:bg-neutral-800 hover:bg-neutral-800 dark:hover:bg-neutral-750 text-white rounded-lg text-xs sm:text-sm font-bold border border-neutral-800 dark:border-neutral-700 flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <ShoppingBag className="w-4 h-4 text-amber-400" />
                  <span>Add To Cart</span>
                </button>

                {/* Wishlist Toggle */}
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-lg border transition-colors ${
                    inWishlist
                      ? 'bg-rose-500/10 border-rose-500 text-rose-500'
                      : 'bg-neutral-100 dark:bg-neutral-950 border-neutral-300 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                  }`}
                  title={inWishlist ? 'In Wishlist' : 'Add to Wishlist'}
                >
                  <Heart className={`w-5 h-5 ${inWishlist ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Direct Buy Now Button */}
              <button
                onClick={handleBuyNow}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs sm:text-sm rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
              >
                <Zap className="w-4 h-4 fill-neutral-950" />
                <span>Instant Checkout / Buy Now</span>
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
