/**
 * Tech Bazar - Dedicated About Us Page
 * Professional hardware retailer story, official brand partnerships, and showroom details.
 */

import React from 'react';
import { 
  ShieldCheck, 
  Award, 
  Users, 
  MapPin, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Cpu, 
  Headphones, 
  ArrowRight,
  Sparkles,
  Zap
} from 'lucide-react';

export default function AboutPage({ onNavigateAllDevices, onNavigateContact }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-200">
      
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400 font-mono mb-6">
        <span>Tech Bazar</span>
        <span>/</span>
        <span className="text-amber-600 dark:text-amber-400 font-bold uppercase">About Us</span>
      </nav>

      {/* Hero Banner Section */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-950 to-neutral-900 border border-neutral-200 dark:border-neutral-800 p-8 sm:p-14 text-white shadow-xl mb-12">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-mono font-bold uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pioneering Genuine Tech Retail Since 2016</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight mb-4 text-balance">
            Empowering Builders, Creators & Enthusiasts Across Bangladesh
          </h1>

          <p className="text-sm sm:text-base text-neutral-300 leading-relaxed mb-8 max-w-2xl">
            Tech Bazar was founded with one unwavering mission: to provide 100% authentic tech devices, cutting-edge PC hardware, and official manufacturer warranty without compromise.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateAllDevices}
              className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs sm:text-sm rounded-xl shadow-lg shadow-amber-500/25 flex items-center gap-2 transition-all"
            >
              <span>Explore All Hardware</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateContact}
              className="px-6 py-3 bg-neutral-800/80 hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm rounded-xl border border-neutral-700 transition-colors"
            >
              <span>Contact Support</span>
            </button>
          </div>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      </div>

      {/* Quantitative Stats Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs text-center">
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400 font-mono mb-1">
            50,000+
          </div>
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Custom PCs Built</p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Gaming & workstations</span>
        </div>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs text-center">
          <div className="text-3xl font-black text-orange-600 dark:text-orange-400 font-mono mb-1">
            100%
          </div>
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Genuine Hardware</p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Zero grey market stock</span>
        </div>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs text-center">
          <div className="text-3xl font-black text-yellow-600 dark:text-yellow-400 font-mono mb-1">
            64
          </div>
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Districts Covered</p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Fast nationwide courier</span>
        </div>

        <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs text-center">
          <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400 font-mono mb-1">
            99.6%
          </div>
          <p className="text-xs font-semibold text-neutral-800 dark:text-neutral-200">Customer Satisfaction</p>
          <span className="text-[11px] text-neutral-500 dark:text-neutral-400">Verified buyers</span>
        </div>
      </div>

      {/* Why Tech Bazar (Core Guarantees) */}
      <div className="mb-16">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
            Our Standard of Excellence
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white mt-1">
            Why Professionals Choose Tech Bazar
          </h2>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-2">
            Every component we sell is backed by direct authorized warranties and tested for optimum thermals and frame-pacing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Direct Brand Warranty
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                We only stock official retail products covered by genuine manufacturer warranty centers in Dhaka and Chattogram. Hassle-free RMA replacement on manufacturing defects.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
              Official Serial Tracking
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 text-orange-500 flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Shockproof Nationwide Shipping
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Every delicate OLED panel, GPU, and processor is packed in multi-layered electrostatic foam and rigid courier boxing. Guaranteed safe arrival or immediate replacement.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-orange-600 dark:text-orange-400 font-semibold">
              24-48h Delivery Window
            </div>
          </div>

          <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-xs flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 flex items-center justify-center mb-4">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 dark:text-white mb-2">
                Rigorous Component Compatibility
              </h3>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
                Our in-house engineers verify VRM clearances, BIOS versions, power budget headroom, and PCIe lane allocation before fulfilling orders to eliminate bottlenecking.
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-neutral-100 dark:border-neutral-800 text-[11px] font-mono text-yellow-600 dark:text-yellow-400 font-semibold">
              Certified Hardware Technicians
            </div>
          </div>
        </div>
      </div>

      {/* Official Brand Partners */}
      <div className="p-8 bg-white dark:bg-neutral-900/60 border border-neutral-200 dark:border-neutral-800 rounded-3xl mb-16 shadow-xs">
        <div className="text-center mb-6">
          <span className="text-xs font-mono uppercase text-neutral-500 dark:text-neutral-400 font-semibold tracking-wider">
            Authorized Partner Portfolio
          </span>
          <h3 className="text-lg font-bold text-neutral-900 dark:text-white mt-1">
            Global Tech Brands We Distribute
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 font-mono text-xs font-bold text-neutral-600 dark:text-neutral-300">
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">ASUS ROG</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">AMD RYZEN</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">NVIDIA GEFORCE</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">SAMSUNG</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">INTEL</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">CORSAIR</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">APPLE</span>
          <span className="px-4 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">LOGITECH G</span>
        </div>
      </div>

      {/* Flagship Showroom & Experience Center Card */}
      <div className="bg-gradient-to-r from-amber-500/10 via-orange-500/5 to-transparent border border-amber-500/30 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-amber-600 dark:text-amber-400 uppercase mb-2">
            <MapPin className="w-4 h-4" />
            <span>Visit Our Physical Experience Center</span>
          </div>
          <h3 className="text-2xl font-black text-neutral-900 dark:text-white mb-2">
            Multiplan Center Showroom, Dhaka
          </h3>
          <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 max-w-xl leading-relaxed mb-4">
            Test ultrawide OLED monitors in person, try mechanical switch actuation, and consult with our certified build specialists before purchasing.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-600 dark:text-neutral-400">
            <span>Level 4, Suite 412, New Elephant Road, Dhaka</span>
            <span>·</span>
            <span>Open Every Day: 10:00 AM - 9:00 PM</span>
          </div>
        </div>

        <button
          onClick={onNavigateContact}
          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shrink-0"
        >
          View Map & Contact Details
        </button>
      </div>

    </div>
  );
}
