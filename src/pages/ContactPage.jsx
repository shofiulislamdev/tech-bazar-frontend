/**
 * Tech Bazar - Dedicated Contact Us Page
 * Direct inquiry form, customer helpline, service hours, RMA claim desk, and FAQs.
 */

import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  CheckCircle2, 
  ShieldCheck, 
  HelpCircle,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { useCartWishlist } from '../context/CartWishlistContext.jsx';

export default function ContactPage() {
  const { showToast } = useCartWishlist();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Order Status & Tracking',
    priority: 'Normal',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill out all required fields.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      showToast('Thank you! Your ticket has been dispatched to our engineering team.');
    }, 700);
  };

  const handleReset = () => {
    setIsSent(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: 'Order Status & Tracking',
      priority: 'Normal',
      message: '',
    });
  };

  const FAQS = [
    {
      q: 'How does Tech Bazar handle official brand warranty claims?',
      a: 'All our components come with authentic manufacturer serials. For any hardware issue, you can drop by our Multiplan Center claim desk or send the item via courier. We process RMA verification within 3 to 7 business days directly with the authorized distributor.'
    },
    {
      q: 'Do you offer Cash on Delivery (COD) outside Dhaka?',
      a: 'Yes, we provide nationwide Cash on Delivery across all 64 districts via express insured courier. Orders over ৳5,000 enjoy 100% free delivery.'
    },
    {
      q: 'Can Tech Bazar assemble and stress-test my custom PC build before delivery?',
      a: 'Absolutely! Our certified technicians will assemble your components, ensure cable management, update the motherboard BIOS to the latest stable release, and run a 30-minute Cinebench and FurMark stress test before packing.'
    },
    {
      q: 'What is the return policy if a component arrives damaged?',
      a: 'We offer an instant 7-day replacement guarantee. If a product arrives broken or physically damaged during transit, notify us within 24 hours of delivery with photos/unboxing video, and we will issue an immediate replacement.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-6">
        <span>Tech Bazar</span>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">Contact & Support</span>
      </nav>

      {/* Header */}
      <div className="mb-10 max-w-3xl">
        <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
          Direct Customer Service
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white mt-1 mb-3">
          We're Here to Help You Build & Upgrade
        </h1>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed">
          Whether you need a custom PC quotation, help selecting compatible RAM and power supplies, or assistance with an existing order, our technical team is ready to assist.
        </p>
      </div>

      {/* Main Grid: Info + Inquiry Form */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Left Column: Contact Cards */}
        <div className="space-y-4">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-semibold">
                  Helpline & WhatsApp
                </h3>
                <p className="text-base font-bold text-neutral-900 dark:text-white font-mono">
                  +880 1711-234567
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Direct technical consultation available everyday from 9:00 AM to 10:00 PM.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-semibold">
                  Official Email
                </h3>
                <p className="text-sm font-bold text-neutral-900 dark:text-white font-mono">
                  support@techbazar.com
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              For corporate proposals, bulk institutional quotes, and RMA status tracking.
            </p>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 flex items-center justify-center shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-semibold">
                  Showroom & Service Desk
                </h3>
                <p className="text-xs font-bold text-neutral-900 dark:text-white leading-snug">
                  Suite 412, Level 4, Multiplan Center
                </p>
              </div>
            </div>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              New Elephant Road, Dhaka-1205, Bangladesh.
            </p>
            <div className="mt-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Visiting Hours: 10:00 AM - 9:00 PM</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Form */}
        <div className="lg:col-span-2">
          <div className="p-6 sm:p-8 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs">
            {isSent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">
                  Inquiry Dispatched Successfully!
                </h2>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
                  Thank you, <strong className="text-neutral-900 dark:text-white">{formData.name}</strong>. Ticket #{Math.floor(100000 + Math.random() * 900000)} has been opened. Our support desk will reply to <strong className="text-neutral-900 dark:text-white">{formData.email}</strong> shortly.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-xl shadow-md transition-all"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-black text-neutral-900 dark:text-white">
                    Send Us a Direct Message
                  </h2>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Fill out the form below and an engineer will get back to you within 2 hours.
                  </p>
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
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Shofiul Islam"
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
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
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="yourname@gmail.com"
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                        Topic of Inquiry
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                      >
                        <option value="Order Status & Tracking">Order Status & Tracking</option>
                        <option value="Official Brand Warranty & RMA">Official Brand Warranty & RMA</option>
                        <option value="Custom Gaming PC Build Consultation">Custom Gaming PC Build Consultation</option>
                        <option value="Corporate / Institutional Quotation">Corporate / Institutional Quotation</option>
                        <option value="General Questions">General Questions</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                      Message Details *
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please specify part numbers, order IDs, or technical questions..."
                      className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/25 transition-all flex items-center justify-center gap-2 mt-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Sending Inquiry...' : 'Submit Message'}</span>
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="p-8 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl shadow-xs">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = expandedFaq === index;
            return (
              <div
                key={index}
                className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800/80 rounded-xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setExpandedFaq(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-neutral-900 dark:text-white hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-500 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-neutral-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed border-t border-neutral-200 dark:border-neutral-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
