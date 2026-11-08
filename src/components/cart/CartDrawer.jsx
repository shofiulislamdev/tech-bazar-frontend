/**
 * Tech Bazar - Shopping Cart Drawer
 * Day & Night mode compliant.
 */

import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  ShoppingBag, 
  ArrowRight, 
  Tag, 
  Check, 
  AlertCircle 
} from 'lucide-react';
import { formatPrice } from '../../data/initialData.js';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';

export default function CartDrawer({ onProceedToCheckout }) {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartSubtotal,
    appliedCoupon,
    couponDiscountAmount,
    couponError,
    applyCoupon,
    removeCoupon,
    deliveryFee,
    grandTotal,
    totalCartItemsCount,
  } = useCartWishlist();

  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (applyCoupon(couponInput)) {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-xs">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 border-l border-neutral-200 dark:border-neutral-800 h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-250 text-neutral-900 dark:text-neutral-100">
        
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-500 dark:text-amber-400">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-neutral-900 dark:text-white">Your Shopping Cart</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                {totalCartItemsCount} {totalCartItemsCount === 1 ? 'item' : 'items'} selected
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12">
              <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center text-neutral-400 dark:text-neutral-500 mb-4">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-1">Your cart is empty</h3>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-xs mb-6">
                Explore our catalog of high-performance tech devices, monitors, processors, and upgrade your setup.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
              >
                Browse Products
              </button>
            </div>
          ) : (
            <>
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 bg-neutral-50 dark:bg-neutral-950/60 rounded-xl border border-neutral-200 dark:border-neutral-800/90 items-center shadow-xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shrink-0"
                    referrerPolicy="no-referrer"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] font-mono text-amber-600 dark:text-amber-400/90 uppercase block font-semibold truncate">
                      {item.brand || item.category}
                    </span>
                    <h4 className="text-xs font-semibold text-neutral-900 dark:text-white truncate mb-1">
                      {item.name}
                    </h4>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs font-bold font-mono text-neutral-900 dark:text-white">
                        {formatPrice(item.price)}
                      </span>
                      {item.originalPrice > item.price && (
                        <span className="text-[10px] text-neutral-400 dark:text-neutral-500 line-through font-mono">
                          {formatPrice(item.originalPrice)}
                        </span>
                      )}
                    </div>

                    {/* Stepper */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-750 rounded-md text-xs">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 py-0.5 font-mono text-neutral-900 dark:text-white text-[11px] font-bold">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[10px] text-neutral-500 dark:text-neutral-400 font-mono">
                        Subtotal: {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-neutral-400 hover:text-rose-500 transition-colors"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  onClick={clearCart}
                  className="text-[11px] text-neutral-500 hover:text-rose-500 transition-colors"
                >
                  Clear all items
                </button>
              </div>
            </>
          )}
        </div>

        {/* Footer & Checkout Breakdown */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-neutral-200 dark:border-neutral-800 bg-neutral-50/90 dark:bg-neutral-950/70 space-y-3">
            {/* Promo Code Input */}
            <div>
              {appliedCoupon ? (
                <div className="flex items-center justify-between p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-lg text-xs">
                  <div className="flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span className="font-mono font-bold text-amber-700 dark:text-amber-300">
                      {appliedCoupon.code} ({appliedCoupon.label})
                    </span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-[11px] text-neutral-500 dark:text-neutral-400 hover:text-rose-500 underline"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="Coupon code (e.g. TECHBAZAR10)"
                    className="flex-1 bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 rounded-lg px-3 py-1.5 text-xs text-neutral-900 dark:text-white uppercase placeholder-neutral-400 dark:placeholder-neutral-500 font-mono focus:outline-none focus:border-amber-500"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-amber-600 dark:text-amber-400 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-bold transition-colors"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-500 dark:text-rose-400 flex items-center gap-1 mt-1">
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </p>
              )}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-neutral-600 dark:text-neutral-300 pt-2 border-t border-neutral-200 dark:border-neutral-850">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono text-neutral-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
              </div>
              {couponDiscountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-{formatPrice(couponDiscountAmount)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Nationwide Delivery</span>
                <span className="font-mono">
                  {deliveryFee === 0 ? (
                    <span className="text-emerald-600 dark:text-emerald-400 font-medium">FREE</span>
                  ) : (
                    formatPrice(deliveryFee)
                  )}
                </span>
              </div>
              <div className="flex justify-between text-base font-black text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-800">
                <span>Total Amount</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono">{formatPrice(grandTotal)}</span>
              </div>
            </div>

            {/* Checkout Action */}
            <button
              onClick={() => {
                setIsCartOpen(false);
                if (onProceedToCheckout) onProceedToCheckout();
              }}
              className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-sm rounded-lg shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-all"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
