/**
 * Tech Bazar - About Us Modal
 * Showcases the story, mission, authorized distribution, and store facilities.
 */

import React from 'react';
import { X, ShieldCheck, Award, Users, MapPin, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200 my-8 text-neutral-900 dark:text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold mb-1">
            <Award className="w-4 h-4" />
            <span>Authorized Hardware Retailer</span>
          </div>
          <h2 className="text-2xl font-black text-neutral-900 dark:text-white">About Tech Bazar</h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
            Empowering tech enthusiasts, PC builders, and professionals across Bangladesh since 2016.
          </p>
        </div>

        {/* Content */}
        <div className="space-y-5 text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
          <p>
            Welcome to <strong className="text-neutral-900 dark:text-white">Tech Bazar</strong> — your trusted online and in-store destination for 100% authentic tech devices, enthusiast PC components, high-refresh OLED gaming monitors, and flagship smartphones.
          </p>
          <p>
            Founded with a commitment to eliminate counterfeit hardware and grey-market risks, we partner directly with certified regional distributors of global leaders including <strong className="text-neutral-900 dark:text-white">ASUS ROG, AMD, NVIDIA, Samsung, Corsair, Intel, and Apple</strong>.
          </p>

          {/* Value Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Official Brand Warranty</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Direct warranty claims backed by official brand service centers in Dhaka and Chattogram.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
              <Truck className="w-5 h-5 text-orange-500 dark:text-orange-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Express Delivery</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Safe bubble-wrapped courier dispatch within 24-48 hours across all 64 districts.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
              <Users className="w-5 h-5 text-yellow-600 dark:text-yellow-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Expert Consultation</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Assistance with custom PC building, bottleneck analysis, and component compatibility.
                </p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-neutral-50 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 flex items-start gap-3">
              <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-neutral-900 dark:text-white">Physical Experience Center</h4>
                <p className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-0.5">
                  Level 4, Multiplan Center, New Elephant Road, Dhaka-1205.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-[11px] border-t border-neutral-200 dark:border-neutral-800">
            <span>Trade License: TRAD/DNCC/092817/2026</span>
            <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
              <CheckCircle2 className="w-3.5 h-3.5" /> ISO 9001:2015 Quality Verified
            </span>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
          >
            Close Overview
          </button>
        </div>
      </div>
    </div>
  );
}
