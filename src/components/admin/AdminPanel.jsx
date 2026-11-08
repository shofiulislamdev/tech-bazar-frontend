/**
 * Tech Bazar - Full Admin Panel
 * Day & Night mode compliant.
 * Includes Dashboard, Products (with PC Image Upload & Discounts), 
 * Hero Banner Slides Manager (with PC Image Upload), Orders, and Users.
 */

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  Sliders, 
  Plus, 
  Edit3, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  CheckCircle2, 
  AlertTriangle, 
  Search, 
  Filter, 
  Eye, 
  Save, 
  X,
  Sun,
  Moon
} from 'lucide-react';
import { 
  formatPrice, 
  getDiscountedPrice, 
  INITIAL_CATEGORIES 
} from '../../data/initialData.js';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';
import { useTheme } from '../../context/ThemeContext.jsx';

export default function AdminPanel({
  products,
  onUpdateProducts,
  slides,
  onUpdateSlides,
  orders,
  onUpdateOrders,
  users,
  onUpdateUsers,
  onBackToStore,
}) {
  const { showToast } = useCartWishlist();
  const { theme, toggleTheme, isDark } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  // Products Tab states
  const [productSearch, setProductSearch] = useState('');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState(null);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'monitor',
    brand: '',
    price: '',
    discountPercent: 0,
    stock: '',
    image: '',
    description: '',
    specs: {
      KeyFeature: '',
      Warranty: '2 Years Official Warranty',
    },
  });

  // Slides Tab states
  const [isSlideModalOpen, setIsSlideModalOpen] = useState(false);
  const [editingSlideId, setEditingSlideId] = useState(null);
  const [slideForm, setSlideForm] = useState({
    title: '',
    subtitle: '',
    tag: 'LIMITED TECH DEAL',
    discount: 'Up to 20% OFF',
    buttonText: 'Shop Now',
    categoryTarget: 'monitor',
    image: '',
  });

  // Orders Tab filters
  const [orderStatusFilter, setOrderStatusFilter] = useState('all');

  // KPI calculations
  const totalRevenue = orders.reduce((sum, ord) => sum + (ord.status !== 'Cancelled' ? ord.total : 0), 0);
  const totalOrdersCount = orders.length;
  const lowStockProducts = products.filter((p) => p.stock < 10);

  // Handlers for Products
  const handleOpenAddProduct = () => {
    setEditingProductId(null);
    setProductForm({
      name: '',
      category: 'monitor',
      brand: '',
      price: '',
      discountPercent: 0,
      stock: '15',
      image: '',
      description: '',
      specs: {
        KeyFeature: '',
        Warranty: '2 Years Official Warranty',
      },
    });
    setIsProductModalOpen(true);
  };

  const handleOpenEditProduct = (prod) => {
    setEditingProductId(prod.id);
    setProductForm({
      name: prod.name,
      category: prod.category,
      brand: prod.brand,
      price: prod.price,
      discountPercent: prod.discountPercent || 0,
      stock: prod.stock,
      image: prod.image,
      description: prod.description || '',
      specs: prod.specs || { Warranty: '2 Years' },
    });
    setIsProductModalOpen(true);
  };

  const handleProductImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, WEBP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setProductForm((prev) => ({
        ...prev,
        image: uploadEvent.target.result,
      }));
      showToast('Image loaded from your PC successfully!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) {
      alert('Product name and price are required.');
      return;
    }

    const priceNum = Number(productForm.price);
    const discountNum = Number(productForm.discountPercent) || 0;
    const stockNum = Number(productForm.stock) || 10;
    const fallbackImage = productForm.image || '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg';

    if (editingProductId) {
      const updated = products.map((p) =>
        p.id === editingProductId
          ? {
              ...p,
              name: productForm.name,
              category: productForm.category,
              brand: productForm.brand || 'TechBazar',
              price: priceNum,
              discountPercent: discountNum,
              stock: stockNum,
              image: fallbackImage,
              description: productForm.description,
              specs: productForm.specs,
            }
          : p
      );
      onUpdateProducts(updated);
      showToast('Product updated successfully!');
    } else {
      const newProduct = {
        id: 'prod-' + Date.now(),
        name: productForm.name,
        category: productForm.category,
        brand: productForm.brand || 'TechBazar',
        price: priceNum,
        discountPercent: discountNum,
        stock: stockNum,
        rating: 5.0,
        reviewsCount: 1,
        isFeatured: false,
        image: fallbackImage,
        description: productForm.description || `${productForm.name} - high performance hardware with official warranty.`,
        specs: productForm.specs,
      };
      onUpdateProducts([newProduct, ...products]);
      showToast('New product added to catalog!');
    }

    setIsProductModalOpen(false);
  };

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const filtered = products.filter((p) => p.id !== id);
      onUpdateProducts(filtered);
      showToast('Product deleted from inventory', 'info');
    }
  };

  // Handlers for Slides
  const handleOpenEditSlide = (slide) => {
    setEditingSlideId(slide.id);
    setSlideForm({
      title: slide.title,
      subtitle: slide.subtitle,
      tag: slide.tag || 'TECH OFFER',
      discount: slide.discount || '',
      buttonText: slide.buttonText || 'Shop Now',
      categoryTarget: slide.categoryTarget || 'all',
      image: slide.image,
    });
    setIsSlideModalOpen(true);
  };

  const handleSlideImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      setSlideForm((prev) => ({
        ...prev,
        image: uploadEvent.target.result,
      }));
      showToast('Slide banner loaded from your PC!');
    };
    reader.readAsDataURL(file);
  };

  const handleSaveSlide = (e) => {
    e.preventDefault();
    if (!slideForm.title || !slideForm.image) {
      alert('Slide title and banner image are required.');
      return;
    }

    if (editingSlideId) {
      const updated = slides.map((s) =>
        s.id === editingSlideId ? { ...s, ...slideForm } : s
      );
      onUpdateSlides(updated);
      showToast('Hero banner slide updated successfully!');
    } else {
      const newSlide = {
        id: 'slide-' + Date.now(),
        ...slideForm,
      };
      onUpdateSlides([...slides, newSlide]);
      showToast('New banner slide added!');
    }
    setIsSlideModalOpen(false);
  };

  const handleOrderStatusChange = (orderId, newStatus) => {
    const updated = orders.map((o) =>
      o.id === orderId ? { ...o, status: newStatus } : o
    );
    onUpdateOrders(updated);
    showToast(`Order #${orderId} marked as ${newStatus}`);
  };

  const handleToggleUserRole = (userId) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        const newRole = u.role === 'admin' ? 'customer' : 'admin';
        return { ...u, role: newRole };
      }
      return u;
    });
    onUpdateUsers(updated);
    showToast('User role updated!');
  };

  const handleToggleUserStatus = (userId) => {
    const updated = users.map((u) => {
      if (u.id === userId) {
        const newStatus = u.status === 'Active' ? 'Suspended' : 'Active';
        return { ...u, status: newStatus };
      }
      return u;
    });
    onUpdateUsers(updated);
    showToast('User status modified!');
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 flex flex-col transition-colors duration-200">
      {/* Top Admin Header Bar */}
      <header className="bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToStore}
            className="flex items-center gap-2 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <span>Storefront</span>
          </button>
          <div className="h-4 w-px bg-neutral-300 dark:bg-neutral-700" />
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-base tracking-tight text-neutral-900 dark:text-white">
              Tech<span className="text-amber-500 dark:text-amber-400">Bazar</span>
            </span>
            <span className="bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30 text-[10px] font-mono px-2 py-0.5 rounded font-bold uppercase">
              Management Portal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Day / Night Mood Toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-medium text-neutral-800 dark:text-neutral-200 hover:border-amber-400"
            title={isDark ? 'Switch to Day Mood' : 'Switch to Night Mood'}
          >
            {isDark ? (
              <>
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="hidden sm:inline">Day Mood</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-600" />
                <span className="hidden sm:inline">Night Mood</span>
              </>
            )}
          </button>

          <span className="hidden sm:inline-block text-xs text-neutral-500 dark:text-neutral-400">
            Admin <strong className="text-neutral-900 dark:text-white">Shofiul Islam</strong>
          </span>
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 flex items-center justify-center font-bold text-neutral-950 text-xs">
            A
          </div>
        </div>
      </header>

      {/* Main Admin Layout with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 bg-white/80 dark:bg-neutral-900/60 border-r border-neutral-200 dark:border-neutral-800 p-4 shrink-0">
          <div className="space-y-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab('products')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'products'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Package className="w-4 h-4" />
                <span>Products & Stock</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === 'products' ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
              }`}>
                {products.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('slides')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'slides'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Sliders className="w-4 h-4" />
                <span>Banner Slides</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === 'slides' ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
              }`}>
                {slides.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('orders')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'orders'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-4 h-4" />
                <span>Customer Orders</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === 'orders' ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
              }`}>
                {orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                activeTab === 'users'
                  ? 'bg-amber-500 text-neutral-950 font-bold shadow-md shadow-amber-500/20'
                  : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Users & Roles</span>
              </div>
              <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                activeTab === 'users' ? 'bg-neutral-950/20 text-neutral-950' : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-500 dark:text-neutral-400'
              }`}>
                {users.length}
              </span>
            </button>
          </div>

          <div className="mt-8 p-3 rounded-xl bg-neutral-100 dark:bg-neutral-950/70 border border-neutral-200 dark:border-neutral-800 text-[11px] text-neutral-600 dark:text-neutral-400">
            <span className="font-mono text-amber-600 dark:text-amber-400 uppercase font-semibold block mb-1">
              Backend Connection
            </span>
            <span>
              All state changes are stored persistently in the browser. When you connect Express & MongoDB, these CRUD calls will invoke your Axios endpoints directly.
            </span>
          </div>
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          
          {/* 1. DASHBOARD VIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Store Analytics & Overview</h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Real-time metrics, order fulfillments, and hardware sales</p>
              </div>

              {/* KPI Cards Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                    <span>Total Sales Revenue</span>
                    <DollarSign className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-2xl font-black text-neutral-900 dark:text-white font-mono">
                    {formatPrice(totalRevenue)}
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" /> +18.4% from last month
                  </span>
                </div>

                <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                    <span>Total Orders Placed</span>
                    <ShoppingBag className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-neutral-900 dark:text-white font-mono">
                    {totalOrdersCount}
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-1 block">
                    All fulfillment channels
                  </span>
                </div>

                <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                    <span>Active Hardware Products</span>
                    <Package className="w-4 h-4 text-orange-500" />
                  </div>
                  <div className="text-2xl font-black text-neutral-900 dark:text-white font-mono">
                    {products.length}
                  </div>
                  <span className="text-[11px] text-neutral-500 dark:text-neutral-400 font-mono mt-1 block">
                    Across 8 tech categories
                  </span>
                </div>

                <div className="p-4 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl shadow-xs">
                  <div className="flex items-center justify-between text-neutral-500 dark:text-neutral-400 text-xs mb-2">
                    <span>Registered Accounts</span>
                    <Users className="w-4 h-4 text-amber-500" />
                  </div>
                  <div className="text-2xl font-black text-neutral-900 dark:text-white font-mono">
                    {users.length}
                  </div>
                  <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-mono mt-1 block">
                    Verified customers
                  </span>
                </div>
              </div>

              {/* Low stock warning strip */}
              {lowStockProducts.length > 0 && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-800 dark:text-amber-300">
                        {lowStockProducts.length} Items Require Restocking
                      </h4>
                      <p className="text-[11px] text-neutral-600 dark:text-neutral-400">
                        Units like {lowStockProducts.map(p => p.name.split(' ')[0]).slice(0, 3).join(', ')} are running under 10 stock.
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => setActiveTab('products')}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg transition-colors whitespace-nowrap shadow-sm"
                  >
                    Manage Stock
                  </button>
                </div>
              )}

              {/* Recent Orders Overview */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-neutral-900 dark:text-white">Recent Customer Orders</h3>
                  <button
                    onClick={() => setActiveTab('orders')}
                    className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-semibold"
                  >
                    View All Orders →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono bg-neutral-50 dark:bg-neutral-950/60">
                        <th className="py-2.5 px-3">Order ID</th>
                        <th className="py-2.5 px-3">Customer</th>
                        <th className="py-2.5 px-3">Date</th>
                        <th className="py-2.5 px-3">Items</th>
                        <th className="py-2.5 px-3">Total Amount</th>
                        <th className="py-2.5 px-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-850">
                      {orders.slice(0, 4).map((ord) => (
                        <tr key={ord.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                          <td className="py-3 px-3 font-mono font-bold text-neutral-900 dark:text-white">{ord.id}</td>
                          <td className="py-3 px-3 text-neutral-800 dark:text-neutral-200">
                            <div>{ord.customer.name}</div>
                            <div className="text-[10px] text-neutral-400 dark:text-neutral-500">{ord.customer.phone}</div>
                          </td>
                          <td className="py-3 px-3 font-mono text-neutral-500 dark:text-neutral-400">{ord.date}</td>
                          <td className="py-3 px-3 text-neutral-700 dark:text-neutral-300">
                            {ord.items.length} {ord.items.length === 1 ? 'item' : 'items'}
                          </td>
                          <td className="py-3 px-3 font-mono font-bold text-amber-600 dark:text-amber-400">
                            {formatPrice(ord.total)}
                          </td>
                          <td className="py-3 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                              ord.status === 'Delivered'
                                ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20'
                                : ord.status === 'Processing'
                                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20'
                                : ord.status === 'Cancelled'
                                ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
                                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                            }`}>
                              {ord.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 2. PRODUCTS MANAGEMENT VIEW */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Product Catalog & Inventory</h1>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Add new hardware, adjust discounts, and upload product photos directly from this PC
                  </p>
                </div>

                <button
                  onClick={handleOpenAddProduct}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold text-xs rounded-lg shadow-md transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product (Upload from PC)</span>
                </button>
              </div>

              {/* Search in products */}
              <div className="relative max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Filter inventory by name or category..."
                  className="w-full bg-white dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-10 pr-4 py-2 text-xs text-neutral-900 dark:text-neutral-200 placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Products Table */}
              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono bg-neutral-50 dark:bg-neutral-950/60">
                        <th className="py-3 px-4">Product Details</th>
                        <th className="py-3 px-4">Category</th>
                        <th className="py-3 px-4">Base Price</th>
                        <th className="py-3 px-4">Discount</th>
                        <th className="py-3 px-4">Final Price</th>
                        <th className="py-3 px-4">Stock</th>
                        <th className="py-3 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-200 dark:divide-neutral-850">
                      {products
                        .filter((p) =>
                          p.name.toLowerCase().includes(productSearch.toLowerCase()) ||
                          p.category.toLowerCase().includes(productSearch.toLowerCase())
                        )
                        .map((prod) => {
                          const finalPrice = getDiscountedPrice(prod.price, prod.discountPercent);

                          return (
                            <tr key={prod.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                              <td className="py-3 px-4">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={prod.image}
                                    alt={prod.name}
                                    className="w-12 h-12 object-cover rounded-lg bg-neutral-100 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 shrink-0"
                                    referrerPolicy="no-referrer"
                                  />
                                  <div className="min-w-0 max-w-xs">
                                    <h4 className="font-semibold text-neutral-900 dark:text-white truncate">{prod.name}</h4>
                                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-mono uppercase font-semibold">{prod.brand}</span>
                                  </div>
                                </div>
                              </td>

                              <td className="py-3 px-4 font-mono capitalize text-neutral-700 dark:text-neutral-300">
                                {prod.category}
                              </td>

                              <td className="py-3 px-4 font-mono text-neutral-500 dark:text-neutral-400">
                                {formatPrice(prod.price)}
                              </td>

                              <td className="py-3 px-4 font-mono">
                                {prod.discountPercent > 0 ? (
                                  <span className="bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                    {prod.discountPercent}% OFF
                                  </span>
                                ) : (
                                  <span className="text-neutral-400 dark:text-neutral-500">None</span>
                                )}
                              </td>

                              <td className="py-3 px-4 font-mono font-bold text-neutral-900 dark:text-white">
                                {formatPrice(finalPrice)}
                              </td>

                              <td className="py-3 px-4 font-mono">
                                <span className={prod.stock < 5 ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-emerald-600 dark:text-emerald-400'}>
                                  {prod.stock} units
                                </span>
                              </td>

                              <td className="py-3 px-4 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => handleOpenEditProduct(prod)}
                                    className="p-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white rounded-lg transition-colors"
                                    title="Edit Product & Discount"
                                  >
                                    <Edit3 className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => handleDeleteProduct(prod.id)}
                                    className="p-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-500/20 text-neutral-500 dark:text-neutral-400 hover:text-rose-600 dark:hover:text-rose-400 rounded-lg transition-colors"
                                    title="Delete"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 3. HERO SLIDES MANAGER VIEW */}
          {activeTab === 'slides' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Hero Banner Carousel Manager</h1>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    Customize promotional slides, text, discounts, and upload banner photos directly from this PC
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingSlideId(null);
                    setSlideForm({
                      title: '',
                      subtitle: '',
                      tag: 'NEW LAUNCH',
                      discount: 'Up to 20% OFF',
                      buttonText: 'Shop Now',
                      categoryTarget: 'monitor',
                      image: '',
                    });
                    setIsSlideModalOpen(true);
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-bold text-xs rounded-lg shadow-md transition-all self-start sm:self-auto"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Slide</span>
                </button>
              </div>

              {/* Slides Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {slides.map((slide, idx) => (
                  <div
                    key={slide.id || idx}
                    className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-xs flex flex-col"
                  >
                    <div className="relative aspect-video w-full bg-neutral-950 overflow-hidden">
                      <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-neutral-950/80 backdrop-blur-sm px-2 py-0.5 rounded text-[10px] font-mono text-amber-400 font-bold border border-neutral-800">
                        Slide #{idx + 1}
                      </div>
                      <div className="absolute bottom-3 left-3 bg-amber-500 text-neutral-950 font-bold font-mono px-2 py-0.5 rounded text-[11px]">
                        {slide.discount}
                      </div>
                    </div>

                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        <span className="text-[10px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                          {slide.tag}
                        </span>
                        <h3 className="text-sm font-bold text-neutral-900 dark:text-white mt-1 mb-1">{slide.title}</h3>
                        <p className="text-xs text-neutral-500 dark:text-neutral-400 line-clamp-2 mb-3">{slide.subtitle}</p>
                      </div>

                      <div className="pt-3 border-t border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
                        <span className="text-[11px] text-neutral-400 dark:text-neutral-500 font-mono">
                          Target: {slide.categoryTarget}
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleOpenEditSlide(slide)}
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-200 text-xs font-semibold rounded-lg transition-colors border border-neutral-300 dark:border-neutral-700"
                          >
                            <Edit3 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                            <span>Change Image & Text</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. ORDERS VIEW */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Customer Orders & Deliveries</h1>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">View orders, customer shipping addresses, and update fulfillment statuses</p>
                </div>

                <div className="flex gap-1.5 bg-white dark:bg-neutral-900 p-1 rounded-lg border border-neutral-200 dark:border-neutral-800 text-xs shadow-xs">
                  {['all', 'Pending', 'Processing', 'Delivered', 'Cancelled'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                        orderStatusFilter === st
                          ? 'bg-amber-500 text-neutral-950 font-bold'
                          : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-950 dark:hover:text-white'
                      }`}
                    >
                      {st === 'all' ? 'All Orders' : st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders List */}
              <div className="space-y-4">
                {orders
                  .filter((o) => orderStatusFilter === 'all' || o.status === orderStatusFilter)
                  .map((ord) => (
                    <div
                      key={ord.id}
                      className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-5 shadow-xs"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-neutral-200 dark:border-neutral-800">
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-neutral-900 dark:text-white text-sm">{ord.id}</span>
                          <span className="text-xs text-neutral-500 dark:text-neutral-400 font-mono">Date: {ord.date}</span>
                          <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">Payment: {ord.paymentMethod}</span>
                        </div>

                        {/* Status dropdown */}
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-neutral-500 dark:text-neutral-400">Status:</span>
                          <select
                            value={ord.status}
                            onChange={(e) => handleOrderStatusChange(ord.id, e.target.value)}
                            className="bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-lg px-2.5 py-1 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 font-mono font-bold"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-3 text-xs">
                        <div>
                          <span className="font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold text-[10px] block mb-1">
                            Customer Details & Address:
                          </span>
                          <p className="text-neutral-900 dark:text-white font-medium">{ord.customer.name}</p>
                          <p className="text-neutral-600 dark:text-neutral-300 font-mono">{ord.customer.phone} · {ord.customer.email}</p>
                          <p className="text-neutral-500 dark:text-neutral-400 mt-1">{ord.customer.address}</p>
                        </div>

                        <div>
                          <span className="font-mono text-neutral-500 dark:text-neutral-400 uppercase font-bold text-[10px] block mb-1">
                            Ordered Hardware Items:
                          </span>
                          <ul className="space-y-1">
                            {ord.items.map((it, idx) => (
                              <li key={idx} className="flex justify-between text-neutral-800 dark:text-neutral-200">
                                <span className="truncate max-w-[220px]">
                                  {it.quantity}x {it.name}
                                </span>
                                <span className="font-mono text-amber-600 dark:text-amber-400">
                                  {formatPrice(it.price * it.quantity)}
                                </span>
                              </li>
                            ))}
                          </ul>

                          <div className="pt-2 border-t border-neutral-200 dark:border-neutral-800 flex justify-between font-bold text-neutral-900 dark:text-white mt-2">
                            <span>Total Payable:</span>
                            <span className="text-amber-600 dark:text-amber-400 font-mono text-sm">{formatPrice(ord.total)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* 5. USERS VIEW */}
          {activeTab === 'users' && (
            <div className="space-y-6">
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-neutral-900 dark:text-white">Registered Users & Permissions</h1>
                <p className="text-xs text-neutral-500 dark:text-neutral-400">Manage user roles (Admin / Customer) and account active statuses</p>
              </div>

              <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl overflow-hidden shadow-xs">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 dark:border-neutral-800 text-neutral-500 dark:text-neutral-400 font-mono bg-neutral-50 dark:bg-neutral-950/60">
                      <th className="py-3 px-4">User</th>
                      <th className="py-3 px-4">Email</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Email Verified</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-200 dark:divide-neutral-850">
                    {users.map((u) => (
                      <tr key={u.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/40">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center font-bold text-neutral-950 text-[11px]">
                              {u.name ? u.name[0] : 'U'}
                            </div>
                            <span className="font-semibold text-neutral-900 dark:text-white">{u.name}</span>
                          </div>
                        </td>

                        <td className="py-3 px-4 font-mono text-neutral-700 dark:text-neutral-300">{u.email}</td>

                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase ${
                            u.role === 'admin'
                              ? 'bg-amber-500/20 text-amber-700 dark:text-amber-400 border border-amber-500/30'
                              : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300'
                          }`}>
                            {u.role}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          {u.isVerified ? (
                            <span className="text-emerald-600 dark:text-emerald-400 font-mono flex items-center gap-1">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                            </span>
                          ) : (
                            <span className="text-amber-600 dark:text-amber-400 font-mono">Unverified</span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                            u.status === 'Active' ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10' : 'text-rose-600 dark:text-rose-400 bg-rose-500/10'
                          }`}>
                            {u.status}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleToggleUserRole(u.id)}
                              className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 text-[11px] rounded border border-neutral-300 dark:border-neutral-700"
                            >
                              Toggle Role ({u.role === 'admin' ? 'Make Customer' : 'Make Admin'})
                            </button>
                            <button
                              onClick={() => handleToggleUserStatus(u.id)}
                              className="px-2.5 py-1 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 text-[11px] rounded border border-neutral-300 dark:border-neutral-700"
                            >
                              {u.status === 'Active' ? 'Suspend' : 'Activate'}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* MODAL: ADD / EDIT PRODUCT */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 my-8 text-neutral-900 dark:text-neutral-100">
            <button
              onClick={() => setIsProductModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                {editingProductId ? 'Update Existing Hardware' : 'New Hardware Creation'}
              </span>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">
                {editingProductId ? 'Edit Product & Discount' : 'Add Product with PC Image Upload'}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Set price, discount percentage, stock, and upload product photos directly from this PC.
              </p>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Product Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    placeholder="e.g. ASUS ROG Swift OLED PG27AQDM"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Category *
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500 capitalize"
                  >
                    {INITIAL_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Brand Name
                  </label>
                  <input
                    type="text"
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    placeholder="e.g. AMD / ASUS / Apple"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Base Price (৳) *
                  </label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: e.target.value })}
                    placeholder="e.g. 52000"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Discount (%)
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="90"
                    value={productForm.discountPercent}
                    onChange={(e) => setProductForm({ ...productForm, discountPercent: e.target.value })}
                    placeholder="e.g. 15"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-amber-600 dark:text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {productForm.price > 0 && productForm.discountPercent > 0 && (
                <div className="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-800 dark:text-amber-300 flex items-center justify-between font-mono">
                  <span>Payable Price after {productForm.discountPercent}% Discount:</span>
                  <span className="font-bold text-sm text-amber-600 dark:text-amber-400">
                    {formatPrice(getDiscountedPrice(productForm.price, productForm.discountPercent))}
                  </span>
                </div>
              )}

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Available Stock
                </label>
                <input
                  type="number"
                  min="0"
                  value={productForm.stock}
                  onChange={(e) => setProductForm({ ...productForm, stock: e.target.value })}
                  placeholder="e.g. 20"
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* THIS PC IMAGE UPLOAD AREA */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <label className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase font-bold block mb-2">
                  Product Image (Upload From This PC)
                </label>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <div className="w-24 h-24 rounded-lg bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-750 flex items-center justify-center overflow-hidden shrink-0">
                    {productForm.image ? (
                      <img
                        src={productForm.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <ImageIcon className="w-8 h-8 text-neutral-400 dark:text-neutral-600" />
                    )}
                  </div>

                  <div className="flex-1 w-full space-y-2">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 transition-colors">
                      <Upload className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                      <span>Choose File from This PC</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProductImageUpload}
                        className="hidden"
                      />
                    </label>
                    <p className="text-[11px] text-neutral-500">
                      Select JPG, PNG or WEBP from your local computer. It will load instantly.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Product Description
                </label>
                <textarea
                  rows={2}
                  value={productForm.description}
                  onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                  placeholder="Detailed specifications, features, performance specs..."
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black rounded-lg text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>{editingProductId ? 'Update Product' : 'Save New Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT HERO BANNER SLIDE */}
      {isSlideModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 my-8 text-neutral-900 dark:text-neutral-100">
            <button
              onClick={() => setIsSlideModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-5">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold">
                Banner Carousel Manager
              </span>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">
                {editingSlideId ? 'Change Banner Slide Image & Text' : 'Create New Banner Slide'}
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Upload a new banner wallpaper directly from this PC or customize headlines.
              </p>
            </div>

            <form onSubmit={handleSaveSlide} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Main Headline Title *
                </label>
                <input
                  type="text"
                  required
                  value={slideForm.title}
                  onChange={(e) => setSlideForm({ ...slideForm, title: e.target.value })}
                  placeholder="e.g. Next-Gen Curved Monitors 240Hz"
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Subheading Description
                </label>
                <input
                  type="text"
                  value={slideForm.subtitle}
                  onChange={(e) => setSlideForm({ ...slideForm, subtitle: e.target.value })}
                  placeholder="e.g. Experience unmatched depth and color with OLED technology"
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Tag Line
                  </label>
                  <input
                    type="text"
                    value={slideForm.tag}
                    onChange={(e) => setSlideForm({ ...slideForm, tag: e.target.value })}
                    placeholder="e.g. MEGA DEAL"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                    Discount Badge
                  </label>
                  <input
                    type="text"
                    value={slideForm.discount}
                    onChange={(e) => setSlideForm({ ...slideForm, discount: e.target.value })}
                    placeholder="e.g. Up to 25% OFF"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg px-3 py-2 text-xs text-amber-600 dark:text-amber-400 font-mono font-bold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* UPLOAD SLIDE IMAGE FROM THIS PC */}
              <div className="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                <label className="text-[11px] font-mono text-amber-600 dark:text-amber-400 uppercase font-bold block mb-2">
                  Banner Slide Image (Upload From This PC)
                </label>

                <div className="relative aspect-[16/7] w-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-750 rounded-lg overflow-hidden mb-3">
                  {slideForm.image ? (
                    <img
                      src={slideForm.image}
                      alt="Slide preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="h-full flex items-center justify-center text-neutral-400 dark:text-neutral-500 text-xs">
                      No banner image selected
                    </div>
                  )}
                </div>

                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-900 dark:text-white rounded-lg text-xs font-semibold border border-neutral-300 dark:border-neutral-700 transition-colors">
                  <Upload className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>Choose Banner Image from This PC</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleSlideImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-neutral-200 dark:border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsSlideModalOpen(false)}
                  className="px-4 py-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 text-neutral-700 dark:text-neutral-300 rounded-lg text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black rounded-lg text-xs shadow-md transition-all flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Slide</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
