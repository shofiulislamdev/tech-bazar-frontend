/**
 * Tech Bazar - Checkout Modal
 * Day & Night mode compliant.
 */

import React, { useState } from 'react';
import { 
  X, 
  ShieldCheck, 
  CreditCard, 
  Smartphone, 
  Banknote, 
  CheckCircle2, 
  ArrowRight, 
  Truck 
} from 'lucide-react';
import { formatPrice, saveStoredOrders, getStoredOrders } from '../../data/initialData.js';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function CheckoutModal({ isOpen, onClose }) {
  const { cart, cartSubtotal, couponDiscountAmount, deliveryFee, grandTotal, clearCart, showToast } = useCartWishlist();
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    city: 'Dhaka',
    address: '',
    paymentMethod: 'Cash on Delivery',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState(null);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone || !formData.address) {
      alert('Please fill out all required shipping fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'TB-' + Math.floor(10000 + Math.random() * 90000);
      const newOrder = {
        id: orderId,
        customer: {
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          address: `${formData.address}, ${formData.city}`,
        },
        items: cart.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
        subtotal: cartSubtotal,
        discount: couponDiscountAmount,
        deliveryFee: deliveryFee,
        total: grandTotal,
        status: 'Processing',
        paymentMethod: formData.paymentMethod,
        date: new Date().toISOString().split('T')[0],
      };

      const existingOrders = getStoredOrders();
      saveStoredOrders([newOrder, ...existingOrders]);

      setCompletedOrder(newOrder);
      clearCart();
      setIsSubmitting(false);
      showToast(`Order #${orderId} placed successfully!`);
    }, 800);
  };

  const handleFinish = () => {
    setCompletedOrder(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 my-8 text-neutral-900 dark:text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={handleFinish}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {completedOrder ? (
          /* Order Placed Success View */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
              Order Confirmed
            </span>
            <h2 className="text-2xl font-black text-neutral-900 dark:text-white mt-1 mb-2">
              Thank You For Your Order!
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
              Your hardware order has been registered. Our fulfillment team is verifying and preparing your shipment.
            </p>

            <div className="bg-neutral-50 dark:bg-neutral-950/80 rounded-xl border border-neutral-200 dark:border-neutral-800 p-4 text-left max-w-md mx-auto mb-6 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Order ID:</span>
                <span className="font-mono font-bold text-neutral-900 dark:text-white">{completedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Payment Method:</span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">{completedOrder.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Recipient:</span>
                <span className="text-neutral-800 dark:text-neutral-200">{completedOrder.customer.name} ({completedOrder.customer.phone})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 dark:text-neutral-400">Shipping To:</span>
                <span className="text-neutral-800 dark:text-neutral-200 truncate max-w-[200px]">{completedOrder.customer.address}</span>
              </div>
              <div className="flex justify-between border-t border-neutral-200 dark:border-neutral-800 pt-2 text-sm font-bold">
                <span className="text-neutral-900 dark:text-white">Amount Due:</span>
                <span className="text-amber-600 dark:text-amber-400 font-mono">{formatPrice(completedOrder.total)}</span>
              </div>
            </div>

            <button
              onClick={handleFinish}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg shadow-lg shadow-amber-500/20 transition-all"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          /* Checkout Form */
          <div>
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono text-amber-600 dark:text-amber-400 font-semibold mb-1">
                <ShieldCheck className="w-4 h-4" />
                <span>SSL Secured Checkout</span>
              </div>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white">Shipping & Payment Details</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Enter your delivery address and choose a payment method</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Shofiul Islam"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. 01711234567"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Division / City *
                  </label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Dhaka">Dhaka</option>
                    <option value="Chattogram">Chattogram</option>
                    <option value="Sylhet">Sylhet</option>
                    <option value="Rajshahi">Rajshahi</option>
                    <option value="Khulna">Khulna</option>
                    <option value="Barishal">Barishal</option>
                    <option value="Rangpur">Rangpur</option>
                    <option value="Mymensingh">Mymensingh</option>
                  </select>
                </div>

                <div className="sm:col-span-1">
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Courier Speed
                  </label>
                  <div className="flex items-center gap-2 p-2 bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-lg text-xs text-neutral-700 dark:text-neutral-300">
                    <Truck className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                    <span>24-48h Delivery</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Full Street Address *
                </label>
                <textarea
                  required
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House number, road number, area, landmark..."
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Payment Methods */}
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-2">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                  {[
                    { id: 'Cash on Delivery', label: 'Cash on Delivery', icon: Banknote },
                    { id: 'bKash Online', label: 'bKash', icon: Smartphone },
                    { id: 'Nagad', label: 'Nagad', icon: Smartphone },
                    { id: 'Debit / Credit Card', label: 'Card Payment', icon: CreditCard },
                  ].map((method) => {
                    const Icon = method.icon;
                    const isSelected = formData.paymentMethod === method.id;

                    return (
                      <button
                        type="button"
                        key={method.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: method.id })}
                        className={`p-3 rounded-xl border text-xs font-semibold flex flex-col items-center gap-1.5 transition-all ${
                          isSelected
                            ? 'bg-amber-500/15 border-amber-500 text-amber-700 dark:text-amber-300 shadow-sm'
                            : 'bg-neutral-50 dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] text-center">{method.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Order Final Summary */}
              <div className="bg-neutral-50 dark:bg-neutral-950/70 p-3.5 rounded-xl border border-neutral-200 dark:border-neutral-800 text-xs space-y-1.5">
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Subtotal ({cart.length} items):</span>
                  <span className="font-mono text-neutral-900 dark:text-white">{formatPrice(cartSubtotal)}</span>
                </div>
                {couponDiscountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                    <span>Discount:</span>
                    <span className="font-mono">-{formatPrice(couponDiscountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-neutral-600 dark:text-neutral-400">
                  <span>Shipping:</span>
                  <span className="font-mono">{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-neutral-900 dark:text-white pt-2 border-t border-neutral-200 dark:border-neutral-800">
                  <span>Payable Total:</span>
                  <span className="text-amber-600 dark:text-amber-400 font-mono text-base">{formatPrice(grandTotal)}</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 disabled:opacity-50 text-neutral-950 font-black text-sm rounded-lg shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all"
              >
                {isSubmitting ? (
                  <span>Processing Order...</span>
                ) : (
                  <>
                    <span>Confirm & Place Order ({formatPrice(grandTotal)})</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
