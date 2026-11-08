/**
 * Tech Bazar - Main Application Root
 * React + Tailwind CSS with JavaScript (No TypeScript)
 * Full routing between HOME, ALL DEVICES, ABOUT US, and CONTACT pages.
 */

import React, { useState, useMemo } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartWishlistProvider, useCartWishlist } from './context/CartWishlistContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Footer from './components/layout/Footer.jsx';
import HeroSlider from './components/home/HeroSlider.jsx';
import CategoryBar from './components/home/CategoryBar.jsx';
import ProductCard from './components/products/ProductCard.jsx';
import ProductFilter from './components/products/ProductFilter.jsx';
import ProductDetailModal from './components/products/ProductDetailModal.jsx';
import CartDrawer from './components/cart/CartDrawer.jsx';
import WishlistDrawer from './components/cart/WishlistDrawer.jsx';
import CheckoutModal from './components/checkout/CheckoutModal.jsx';
import AuthModal from './components/auth/AuthModal.jsx';
import AdminPanel from './components/admin/AdminPanel.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import Toast from './components/common/Toast.jsx';

import {
  getStoredProducts,
  saveStoredProducts,
  getStoredSlides,
  saveStoredSlides,
  getStoredOrders,
  saveStoredOrders,
  getStoredUsers,
  saveStoredUsers,
  getDiscountedPrice,
} from './data/initialData.js';

function StorefrontContent() {
  // Page Views: 'home' | 'devices' | 'about' | 'contact' | 'admin'
  const [currentView, setCurrentView] = useState('home');

  // Persistent States
  const [products, setProducts] = useState(getStoredProducts);
  const [slides, setSlides] = useState(getStoredSlides);
  const [orders, setOrders] = useState(getStoredOrders);
  const [users, setUsers] = useState(getStoredUsers);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState(300000);
  const [discountOnly, setDiscountOnly] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');

  const {
    selectedProductModal,
    setSelectedProductModal,
    isCheckoutOpen,
    setIsCheckoutOpen,
  } = useCartWishlist();

  // Handlers to update persistent stores
  const handleUpdateProducts = (newProducts) => {
    setProducts(newProducts);
    saveStoredProducts(newProducts);
  };

  const handleUpdateSlides = (newSlides) => {
    setSlides(newSlides);
    saveStoredSlides(newSlides);
  };

  const handleUpdateOrders = (newOrders) => {
    setOrders(newOrders);
    saveStoredOrders(newOrders);
  };

  const handleUpdateUsers = (newUsers) => {
    setUsers(newUsers);
    saveStoredUsers(newUsers);
  };

  const handleResetFilters = () => {
    setSelectedCategory('all');
    setSearchQuery('');
    setPriceRange(300000);
    setDiscountOnly(false);
    setInStockOnly(false);
    setSortBy('featured');
  };

  // Navigation Handlers
  const handleNavigateHome = () => {
    setCurrentView('home');
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAllDevices = () => {
    setCurrentView('devices');
    setSelectedCategory('all');
    setSearchQuery('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateAbout = () => {
    setCurrentView('about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateContact = () => {
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category check
        if (selectedCategory !== 'all' && product.category !== selectedCategory) {
          return false;
        }

        // Search check
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchCategory = product.category.toLowerCase().includes(query);
          const matchBrand = (product.brand || '').toLowerCase().includes(query);
          if (!matchName && !matchCategory && !matchBrand) return false;
        }

        // Price check
        const effectivePrice = getDiscountedPrice(product.price, product.discountPercent);
        if (effectivePrice > priceRange) {
          return false;
        }

        // Discount Only check
        if (discountOnly && (!product.discountPercent || product.discountPercent <= 0)) {
          return false;
        }

        // In Stock check
        if (inStockOnly && product.stock <= 0) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        const priceA = getDiscountedPrice(a.price, a.discountPercent);
        const priceB = getDiscountedPrice(b.price, b.discountPercent);

        if (sortBy === 'price-low') return priceA - priceB;
        if (sortBy === 'price-high') return priceB - priceA;
        if (sortBy === 'discount') return (b.discountPercent || 0) - (a.discountPercent || 0);
        if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
        return 0;
      });
  }, [products, selectedCategory, searchQuery, priceRange, discountOnly, inStockOnly, sortBy]);

  // If Admin panel is active
  if (currentView === 'admin') {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200">
        <Toast />
        <AdminPanel
          products={products}
          onUpdateProducts={handleUpdateProducts}
          slides={slides}
          onUpdateSlides={handleUpdateSlides}
          orders={orders}
          onUpdateOrders={handleUpdateOrders}
          users={users}
          onUpdateUsers={handleUpdateUsers}
          onBackToStore={() => setCurrentView('home')}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 flex flex-col selection:bg-amber-500 selection:text-neutral-950 transition-colors duration-200">
      <Toast />

      {/* Top Navigation with Active Highlight */}
      <Navbar
        currentView={currentView}
        setCurrentView={setCurrentView}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        onNavigateHome={handleNavigateHome}
        onNavigateAllDevices={handleNavigateAllDevices}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
      />

      <main className="flex-1 pb-16">
        {/* 1. ABOUT US PAGE */}
        {currentView === 'about' && (
          <AboutPage
            onNavigateAllDevices={handleNavigateAllDevices}
            onNavigateContact={handleNavigateContact}
          />
        )}

        {/* 2. CONTACT US PAGE */}
        {currentView === 'contact' && (
          <ContactPage />
        )}

        {/* 3. HOME & ALL DEVICES PAGES */}
        {(currentView === 'home' || currentView === 'devices') && (
          <>
            {/* Show Banner Slider only on HOME (when not in search) */}
            {currentView === 'home' && !searchQuery && (
              <HeroSlider
                slides={slides}
                onSelectCategory={(cat) => {
                  setSelectedCategory(cat);
                  const el = document.getElementById('products-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              />
            )}

            {/* Hardware Category Bar */}
            <CategoryBar
              selectedCategory={selectedCategory}
              onSelectCategory={(cat) => setSelectedCategory(cat)}
            />

            {/* Catalog Section */}
            <div id="products-section" className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 scroll-mt-20">
              {/* Header for All Devices view */}
              {currentView === 'devices' && (
                <div className="mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                  <h1 className="text-2xl font-black text-neutral-900 dark:text-white">
                    All Hardware & Tech Devices
                  </h1>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                    Explore our comprehensive inventory of monitors, processors, GPUs, smartphones, RAM and storage.
                  </p>
                </div>
              )}

              {/* Filters & Sorting */}
              <ProductFilter
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                discountOnly={discountOnly}
                setDiscountOnly={setDiscountOnly}
                inStockOnly={inStockOnly}
                setInStockOnly={setInStockOnly}
                sortBy={sortBy}
                setSortBy={setSortBy}
                onResetFilters={handleResetFilters}
                totalResults={filteredProducts.length}
              />

              {/* Product Grid */}
              {filteredProducts.length === 0 ? (
                <div className="bg-white dark:bg-neutral-950/60 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-12 text-center my-6 shadow-xs">
                  <div className="w-16 h-16 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 flex items-center justify-center text-amber-500 dark:text-amber-400 mx-auto mb-4 text-2xl">
                    🔍
                  </div>
                  <h3 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">No matching tech devices found</h3>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-md mx-auto mb-6">
                    Try loosening your filters, adjusting the max price slider, or resetting your search term.
                  </p>
                  <button
                    onClick={handleResetFilters}
                    className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors shadow-sm"
                  >
                    Reset All Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map((product) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onOpenDetails={(p) => setSelectedProductModal(p)}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectCategory={(cat) => {
          setSelectedCategory(cat);
          setCurrentView('devices');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateHome={handleNavigateHome}
        onNavigateAllDevices={handleNavigateAllDevices}
        onNavigateAbout={handleNavigateAbout}
        onNavigateContact={handleNavigateContact}
      />

      {/* Global Modals & Drawers */}
      <CartDrawer onProceedToCheckout={() => setIsCheckoutOpen(true)} />
      <WishlistDrawer />
      <ProductDetailModal
        product={selectedProductModal}
        onClose={() => setSelectedProductModal(null)}
        onBuyNow={() => {
          setSelectedProductModal(null);
          setIsCheckoutOpen(true);
        }}
      />
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <CartWishlistProvider>
          <StorefrontContent />
        </CartWishlistProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
