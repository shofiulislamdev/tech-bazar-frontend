/**
 * Tech Bazar - Simple Clean Footer
 * Day & Night mode compliant with navigation link routing.
 */

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Headphones, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer({ onSelectCategory, onNavigateAbout, onNavigateContact, onNavigateAllDevices }) {
  return (
    <footer className="bg-neutral-100 dark:bg-neutral-950 border-t border-neutral-200 dark:border-neutral-800 text-neutral-600 dark:text-neutral-400 text-xs transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-md">
                <span className="font-black text-neutral-950 text-base">TB</span>
              </div>
              <span className="text-lg font-extrabold text-neutral-900 dark:text-white">
                Tech<span className="text-amber-500 dark:text-amber-400">Bazar</span>
              </span>
            </div>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed">
              Your trusted destination for official hardware, monitors, processors, flagship smartphones, and premium components with manufacturer warranty.
            </p>
            <div className="text-[11px] font-mono text-neutral-500 pt-1">
              Multiplan Center, Dhaka · Nationwide Courier
            </div>
          </div>

          {/* Quick Hardware Categories */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-neutral-900 dark:text-white mb-3 tracking-wider">
              Popular Categories
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onSelectCategory('monitor')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Gaming & OLED Monitors
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('cpu')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Processors (AMD & Intel)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('gpu')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  GeForce RTX Graphics Cards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectCategory('phone')}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Flagship Smartphones
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateAllDevices}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors font-bold text-amber-600 dark:text-amber-400"
                >
                  View All Hardware Devices →
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Care & Page Links */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-neutral-900 dark:text-white mb-3 tracking-wider">
              Company & Help
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onNavigateAbout}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  About Our Organization
                </button>
              </li>
              <li>
                <button
                  onClick={onNavigateContact}
                  className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                >
                  Contact Support & Hotline
                </button>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <Phone className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>+880 1711-234567 (9 AM - 10 PM)</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                <span>support@techbazar.com</span>
              </li>
            </ul>
          </div>

          {/* Payment & Security */}
          <div>
            <h4 className="text-xs font-mono uppercase font-bold text-neutral-900 dark:text-white mb-3 tracking-wider">
              Secure Payment Methods
            </h4>
            <p className="text-xs text-neutral-600 dark:text-neutral-400 mb-3">
              We support Cash on Delivery nationwide, as well as instant digital transactions:
            </p>
            <div className="flex flex-wrap gap-2 text-[11px] font-mono">
              <span className="px-2 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-neutral-800 dark:text-neutral-300 shadow-xs">
                Cash on Delivery
              </span>
              <span className="px-2 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-amber-600 dark:text-amber-400 font-bold shadow-xs">
                bKash
              </span>
              <span className="px-2 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-orange-600 dark:text-orange-400 font-bold shadow-xs">
                Nagad
              </span>
              <span className="px-2 py-1 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded text-neutral-800 dark:text-neutral-300 shadow-xs">
                Visa / MasterCard
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-neutral-200 dark:border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-500 text-[11px]">
          <p>© {new Date().getFullYear()} Tech Bazar. Built with React & Tailwind CSS. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button onClick={onNavigateAbout} className="hover:text-amber-500">About Us</button>
            <span>·</span>
            <button onClick={onNavigateContact} className="hover:text-amber-500">Contact Us</button>
            <span>·</span>
            <span>Official Warranty</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
