/**
 * Tech Bazar - Header & Navigation Bar
 * Features dynamic active state highlighting in orange for HOME, ALL DEVICES, ABOUT US, and CONTACT.
 */

import React, { useState } from 'react';
import {
  ShoppingBag,
  Heart,
  User,
  Search,
  LayoutDashboard,
  Store,
  Menu,
  X,
  Sparkles,
  LogOut,
  ShieldCheck,
  Check,
  Sun,
  Moon,
  Home,
  Layers,
  Info,
  PhoneCall
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';
import { formatPrice } from '../../data/initialData.js';

export default function Navbar({
  currentView,
  setCurrentView,
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  onNavigateHome,
  onNavigateAllDevices,
  onNavigateAbout,
  onNavigateContact,
}) {
  const { user, isAdmin, openAuthModal, logout, switchDemoRole } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const {
    totalCartItemsCount,
    cartSubtotal,
    setIsCartOpen,
    wishlist,
    setIsWishlistOpen
  } = useCartWishlist();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);

  // Active status helpers
  const isHomeActive = currentView === 'home';
  const isDevicesActive = currentView === 'devices';
  const isAboutActive = currentView === 'about';
  const isContactActive = currentView === 'contact';

  const handleHomeClick = () => {
    onNavigateHome();
    setIsMobileMenuOpen(false);
  };

  const handleAllDevicesClick = () => {
    onNavigateAllDevices();
    setIsMobileMenuOpen(false);
  };

  const handleAboutClick = () => {
    onNavigateAbout();
    setIsMobileMenuOpen(false);
  };

  const handleContactClick = () => {
    onNavigateContact();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200">
      {/* Top micro-announcement banner */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-orange-500 text-neutral-950 px-4 py-1.5 text-xs font-semibold flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <Sparkles className="w-3.5 h-3.5 shrink-0" />
          <span>Flash Tech Fest: Flat 10% OFF with code <strong className="font-mono bg-neutral-950/20 px-1.5 py-0.5 rounded">TECHBAZAR10</strong> · Free Shipping over ৳5,000</span>
        </div>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 md:gap-4 h-16">

          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center shrink-0">
            <button
              onClick={handleHomeClick}
              className="group flex items-center gap-2.5 text-left focus:outline-none"
            >
              <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
                <span className="font-black text-neutral-950 text-base sm:text-lg tracking-tighter">TB</span>
              </div>
              <div>
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white flex items-center gap-1">
                  Tech<span className="text-amber-500 dark:text-amber-400">Bazar</span>
                </span>
                <span className="hidden sm:block text-[9px] text-neutral-500 dark:text-neutral-400 uppercase tracking-widest font-mono -mt-1">
                  Official Hardware Store
                </span>
              </div>
            </button>
          </div>

          {/* Zone 2: Navigation Links (HOME, ALL DEVICES, ABOUT US, CONTACT) with Orange Active Highlight */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6 flex-1 justify-center min-w-0 px-2">
            <nav className="flex items-center gap-4 xl:gap-6 text-xs tracking-wider shrink-0">
              {/* HOME LINK */}
              <button
                onClick={handleHomeClick}
                className={`relative py-1.5 transition-all font-bold whitespace-nowrap shrink-0 ${isHomeActive
                    ? 'text-amber-500 dark:text-amber-400 font-black'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400'
                  }`}
              >
                <span>HOME</span>
                {isHomeActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                )}
              </button>

              {/* ALL DEVICES LINK */}
              <button
                onClick={handleAllDevicesClick}
                className={`relative py-1.5 transition-all font-bold whitespace-nowrap shrink-0 ${isDevicesActive
                    ? 'text-amber-500 dark:text-amber-400 font-black'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400'
                  }`}
              >
                <span>ALL DEVICES</span>
                {isDevicesActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                )}
              </button>

              {/* ABOUT US LINK */}
              <button
                onClick={handleAboutClick}
                className={`relative py-1.5 transition-all font-bold whitespace-nowrap shrink-0 ${isAboutActive
                    ? 'text-amber-500 dark:text-amber-400 font-black'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400'
                  }`}
              >
                <span>ABOUT US</span>
                {isAboutActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                )}
              </button>

              {/* CONTACT LINK */}
              <button
                onClick={handleContactClick}
                className={`relative py-1.5 transition-all font-bold whitespace-nowrap shrink-0 ${isContactActive
                    ? 'text-amber-500 dark:text-amber-400 font-black'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-amber-500 dark:hover:text-amber-400'
                  }`}
              >
                <span>CONTACT</span>
                {isContactActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                )}
              </button>
            </nav>

            {/* Quick Search Bar */}
            <div className="relative w-36 xl:w-52 shrink-0">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Quick search..."
                className="w-full bg-neutral-100 dark:bg-neutral-800/80 border border-neutral-300 dark:border-neutral-700/80 rounded-lg pl-8 pr-6 py-1.5 text-xs text-neutral-900 dark:text-neutral-200 placeholder-neutral-500 focus:outline-none focus:border-amber-500 dark:focus:border-amber-400 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-[11px]"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Zone 3: Actions & Auth / Admin switch */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            {/* Day / Night Mood Toggle Button */}
            <button
              onClick={toggleTheme}
              aria-label={isDark ? 'Switch to Day Mood (Light)' : 'Switch to Night Mood (Dark)'}
              className="p-2 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:text-amber-500 dark:hover:text-amber-400 hover:border-amber-400 transition-colors"
              title={isDark ? 'Day Mood (Light)' : 'Night Mood (Dark)'}
            >
              {isDark ? (
                <Sun className="w-4 h-4 text-amber-400 fill-amber-400/20" />
              ) : (
                <Moon className="w-4 h-4 text-amber-600 fill-amber-500/20" />
              )}
            </button>

            {/* Admin Panel Toggle Button */}
            {isAdmin && (
              <button
                onClick={() => setCurrentView(currentView === 'admin' ? 'home' : 'admin')}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-lg border transition-all ${currentView === 'admin'
                    ? 'bg-amber-500 text-neutral-950 border-amber-400 shadow-md shadow-amber-500/25'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-amber-600 dark:text-amber-400 border-amber-500/30 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                title={currentView === 'admin' ? 'Storefront' : 'Admin Panel'}
              >
                {currentView === 'admin' ? (
                  <>
                    <Store className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Store</span>
                  </>
                ) : (
                  <>
                    <LayoutDashboard className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Admin</span>
                  </>
                )}
              </button>
            )}

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors"
              title="View Wishlist"
            >
              <Heart className="w-4.5 h-4.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-neutral-950 text-[10px] font-bold rounded-full flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-neutral-300 dark:border-neutral-700 rounded-lg text-neutral-800 dark:text-neutral-200 transition-all group"
              title="Shopping Cart"
            >
              <div className="relative">
                <ShoppingBag className="w-4.5 h-4.5 text-amber-500 dark:text-amber-400 group-hover:scale-105 transition-transform" />
                {totalCartItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 w-4 h-4 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                    {totalCartItemsCount}
                  </span>
                )}
              </div>
              <span className="hidden xl:inline-block font-mono text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {formatPrice(cartSubtotal)}
              </span>
            </button>

            {/* User Account / Profile Menu */}
            <div className="relative">
              {user ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                    className="flex items-center gap-2 p-1 pl-1.5 pr-2.5 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg hover:border-amber-400 dark:hover:border-amber-500 transition-colors"
                  >
                    <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-xs font-bold text-neutral-950 shrink-0">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-medium text-neutral-800 dark:text-neutral-200 max-w-[85px] sm:max-w-[105px] truncate">
                      {user.name}
                    </span>
                  </button>

                  {/* Dropdown Menu */}
                  {isUserDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                      <div className="px-3 py-2 border-b border-neutral-200 dark:border-neutral-800 mb-1">
                        <p className="text-xs font-semibold text-neutral-900 dark:text-white truncate">{user.name}</p>
                        <p className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate">{user.email}</p>
                        <div className="mt-1 flex items-center gap-1.5">
                          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 uppercase font-semibold">
                            {user.role}
                          </span>
                          {user.isVerified && (
                            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                              <ShieldCheck className="w-3 h-3" /> Verified
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Demo Role Switcher */}
                      <div className="px-2 py-1.5 bg-neutral-100 dark:bg-neutral-800/50 rounded-lg mb-1">
                        <span className="text-[10px] uppercase font-mono text-neutral-500 dark:text-neutral-400 block mb-1">
                          Role Switch (Test):
                        </span>
                        <div className="flex gap-1">
                          <button
                            onClick={() => {
                              switchDemoRole('admin');
                              setIsUserDropdownOpen(false);
                            }}
                            className={`flex-1 text-[11px] py-1 rounded font-medium flex items-center justify-center gap-1 ${user.role === 'admin'
                                ? 'bg-amber-500 text-neutral-950 font-bold'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                              }`}
                          >
                            {user.role === 'admin' && <Check className="w-3 h-3" />}
                            Admin
                          </button>
                          <button
                            onClick={() => {
                              switchDemoRole('customer');
                              setCurrentView('home');
                              setIsUserDropdownOpen(false);
                            }}
                            className={`flex-1 text-[11px] py-1 rounded font-medium flex items-center justify-center gap-1 ${user.role === 'customer'
                                ? 'bg-amber-500 text-neutral-950 font-bold'
                                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
                              }`}
                          >
                            {user.role === 'customer' && <Check className="w-3 h-3" />}
                            Customer
                          </button>
                        </div>
                      </div>

                      {isAdmin && (
                        <button
                          onClick={() => {
                            setCurrentView(currentView === 'admin' ? 'home' : 'admin');
                            setIsUserDropdownOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 text-xs text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg transition-colors text-left"
                        >
                          <LayoutDashboard className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                          <span>{currentView === 'admin' ? 'Go to Storefront' : 'Open Admin Panel'}</span>
                        </button>
                      )}

                      <button
                        onClick={() => {
                          logout();
                          setIsUserDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-xs text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 rounded-lg transition-colors text-left mt-1"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => openAuthModal('login')}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold bg-amber-500 hover:bg-amber-400 text-neutral-950 rounded-lg shadow-sm transition-colors"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Login / Register</span>
                </button>
              )}
            </div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu with HOME, ALL DEVICES, ABOUT US, CONTACT (with Orange Active State) */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-neutral-200 dark:border-neutral-800 space-y-3">
            <nav className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              <button
                onClick={handleHomeClick}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${isHomeActive
                    ? 'bg-amber-500/15 border border-amber-500 text-amber-600 dark:text-amber-400 font-black'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                <Home className="w-4 h-4 text-amber-500" />
                <span>HOME</span>
              </button>

              <button
                onClick={handleAllDevicesClick}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${isDevicesActive
                    ? 'bg-amber-500/15 border border-amber-500 text-amber-600 dark:text-amber-400 font-black'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                <Layers className="w-4 h-4 text-amber-500" />
                <span>ALL DEVICES</span>
              </button>

              <button
                onClick={handleAboutClick}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${isAboutActive
                    ? 'bg-amber-500/15 border border-amber-500 text-amber-600 dark:text-amber-400 font-black'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                <Info className="w-4 h-4 text-amber-500" />
                <span>ABOUT US</span>
              </button>

              <button
                onClick={handleContactClick}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-bold transition-all ${isContactActive
                    ? 'bg-amber-500/15 border border-amber-500 text-amber-600 dark:text-amber-400 font-black'
                    : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700'
                  }`}
              >
                <PhoneCall className="w-4 h-4 text-amber-500" />
                <span>CONTACT</span>
              </button>
            </nav>

            {/* Mobile Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search tech devices..."
                className="w-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-neutral-200"
              />
            </div>

            <div className="flex items-center justify-between gap-2">
              <button
                onClick={toggleTheme}
                className="flex-1 py-2 bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 text-neutral-800 dark:text-neutral-200"
              >
                {isDark ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" />
                    <span>Switch to Day Mood</span>
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-amber-600" />
                    <span>Switch to Night Mood</span>
                  </>
                )}
              </button>
              {isAdmin && (
                <button
                  onClick={() => {
                    setCurrentView(currentView === 'admin' ? 'home' : 'admin');
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex-1 py-2 bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/30 rounded-lg text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span>{currentView === 'admin' ? 'Storefront' : 'Admin Panel'}</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
