/**
 * Tech Bazar - Contact Us Modal
 * Provides interactive customer inquiry form, hotlines, and service location.
 */

import React, { useState } from 'react';
import { 
  X, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2 
} from 'lucide-react';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';

export default function ContactModal({ isOpen, onClose }) {
  const { showToast } = useCartWishlist();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order & Delivery Inquiry',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Thank you! Your inquiry has been dispatched to our support team.');
    }, 600);
  };

  const handleReset = () => {
    setIsSent(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Order & Delivery Inquiry',
      message: '',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 my-8 text-neutral-900 dark:text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {isSent ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-black text-neutral-900 dark:text-white">Message Received</h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm mx-auto mt-1 mb-6">
              Thank you, <strong className="text-neutral-900 dark:text-white">{formData.name}</strong>. A technical representative will respond to <strong className="text-neutral-900 dark:text-white">{formData.email}</strong> within 2 hours.
            </p>
            <button
              onClick={handleReset}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Customer Care & Technical Help</span>
              </div>
              <h2 className="text-2xl font-black text-neutral-900 dark:text-white">Contact Tech Bazar</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Have a question regarding custom PC components, shipping, or warranty claims? Reach out below.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Contact Info Column */}
              <div className="md:col-span-1 space-y-4 text-xs">
                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 font-semibold mb-1">
                    <Phone className="w-4 h-4" />
                    <span>Customer Hotline</span>
                  </div>
                  <p className="text-neutral-800 dark:text-neutral-200 font-mono font-bold">+880 1711-234567</p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">9:00 AM - 10:00 PM (Daily)</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-semibold mb-1">
                    <Mail className="w-4 h-4" />
                    <span>Support Email</span>
                  </div>
                  <p className="text-neutral-800 dark:text-neutral-200 font-mono">support@techbazar.com</p>
                  <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">Quick email replies</p>
                </div>

                <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800">
                  <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-semibold mb-1">
                    <MapPin className="w-4 h-4" />
                    <span>Store & Claim Center</span>
                  </div>
                  <p className="text-[11px] text-neutral-700 dark:text-neutral-300">
                    Suite 412, Level 4, Multiplan Center, New Elephant Road, Dhaka-1205.
                  </p>
                </div>
              </div>

              {/* Inquiry Form */}
              <form onSubmit={handleSubmit} className="md:col-span-2 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Shofiul Islam"
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="017xxxxxxxx"
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@gmail.com"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Subject / Department
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Order & Delivery Inquiry">Order & Delivery Inquiry</option>
                    <option value="Official Warranty Claim">Official Warranty Claim</option>
                    <option value="Custom PC Build Advice">Custom PC Build Advice</option>
                    <option value="Corporate / Bulk Quotation">Corporate / Bulk Quotation</option>
                    <option value="Other Assistance">Other Assistance</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Message Details *
                  </label>
                  <textarea
                    required
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about the issue or component you are looking for..."
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{isSubmitting ? 'Sending Message...' : 'Send Inquiry'}</span>
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
