/**
 * Tech Bazar - Cart & Wishlist Context
 * 
 * Manages shopping cart, coupons, wishlist state, drawer toggles,
 * and toast notification alerts.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDiscountedPrice } from '../data/initialData.js';

const CartWishlistContext = createContext(null);

const STORAGE_CART = 'tech_bazar_cart_v1';
const STORAGE_WISHLIST = 'tech_bazar_wishlist_v1';

export const CartWishlistProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CART);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_WISHLIST);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductModal, setSelectedProductModal] = useState(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState(null); // { code: 'TECHBAZAR10', discountType: 'percent', value: 10 }
  const [couponError, setCouponError] = useState('');

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CART, JSON.stringify(cart));
    } catch (e) {}
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_WISHLIST, JSON.stringify(wishlist));
    } catch (e) {}
  }, [wishlist]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random().toString(36).substring(2, 5);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    const unitPrice = getDiscountedPrice(product.price, product.discountPercent);

    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + quantity;
        if (newQty > product.stock) {
          showToast(`Only ${product.stock} units available in stock.`, 'info');
          updated[existingIndex].quantity = product.stock;
        } else {
          updated[existingIndex].quantity = newQty;
          showToast(`Updated quantity for ${product.name.slice(0, 24)}...`);
        }
        return updated;
      } else {
        showToast(`Added to cart: ${product.name.slice(0, 24)}...`);
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            originalPrice: product.price,
            price: unitPrice,
            discountPercent: product.discountPercent || 0,
            image: product.image,
            category: product.category,
            brand: product.brand,
            stock: product.stock,
            quantity: Math.min(quantity, product.stock),
          },
        ];
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.min(newQuantity, item.stock) }
          : item
      )
    );
  };

  const removeFromCart = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
    showToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  // Wishlist actions
  const toggleWishlist = (product) => {
    const exists = wishlist.some((item) => item.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((item) => item.id !== product.id));
      showToast('Removed from wishlist', 'info');
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast('Added to wishlist');
    }
  };

  const isInWishlist = (productId) => {
    return wishlist.some((item) => item.id === productId);
  };

  const moveWishlistToCart = (product) => {
    addToCart(product, 1);
    setWishlist((prev) => prev.filter((item) => item.id !== product.id));
    showToast('Moved to cart!');
  };

  // Coupons
  const applyCoupon = (code) => {
    setCouponError('');
    const clean = code.trim().toUpperCase();
    if (!clean) {
      setCouponError('Please enter a coupon code');
      return false;
    }

    if (clean === 'TECHBAZAR10') {
      setAppliedCoupon({ code: clean, discountType: 'percent', value: 10, label: '10% OFF' });
      showToast('Promo code TECHBAZAR10 applied: 10% discount!');
      return true;
    } else if (clean === 'BAZAR500') {
      setAppliedCoupon({ code: clean, discountType: 'fixed', value: 500, label: '৳500 OFF' });
      showToast('Promo code BAZAR500 applied: ৳500 discount!');
      return true;
    } else {
      setCouponError('Invalid or expired coupon. Try TECHBAZAR10 or BAZAR500');
      return false;
    }
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError('');
    showToast('Coupon removed', 'info');
  };

  // Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  let couponDiscountAmount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percent') {
      couponDiscountAmount = Math.round(cartSubtotal * (appliedCoupon.value / 100));
    } else if (appliedCoupon.discountType === 'fixed') {
      couponDiscountAmount = Math.min(appliedCoupon.value, cartSubtotal);
    }
  }

  // Free delivery for orders >= 5000 BDT
  const deliveryFee = cart.length === 0 ? 0 : cartSubtotal >= 5000 ? 0 : 120;
  const grandTotal = Math.max(0, cartSubtotal - couponDiscountAmount + deliveryFee);
  const totalCartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartWishlistContext.Provider
      value={{
        cart,
        wishlist,
        isCartOpen,
        setIsCartOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductModal,
        setSelectedProductModal,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        toggleWishlist,
        isInWishlist,
        moveWishlistToCart,
        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        couponDiscountAmount,
        deliveryFee,
        grandTotal,
        totalCartItemsCount,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
};

export const useCartWishlist = () => {
  const context = useContext(CartWishlistContext);
  if (!context) {
    throw new Error('useCartWishlist must be used within a CartWishlistProvider');
  }
  return context;
};
