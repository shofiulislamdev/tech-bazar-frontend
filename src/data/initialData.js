/**
 * Tech Bazar - Initial Dataset & LocalStorage Persistence Manager
 * 
 * Supports full CRUD operations locally, allowing immediate frontend testing.
 * Changes made in the Admin panel persist in the browser until reset.
 */

export const INITIAL_CATEGORIES = [
  { id: 'all', name: 'All Devices', icon: 'Cpu' },
  { id: 'monitor', name: 'Monitors', icon: 'Monitor' },
  { id: 'cpu', name: 'Processors (CPU)', icon: 'Cpu' },
  { id: 'ram', name: 'Memory (RAM)', icon: 'MemoryStick' },
  { id: 'phone', name: 'Smartphones', icon: 'Smartphone' },
  { id: 'gpu', name: 'Graphics Cards', icon: 'Layers' },
  { id: 'storage', name: 'Storage & SSDs', icon: 'HardDrive' },
  { id: 'laptop', name: 'Laptops', icon: 'Laptop' },
  { id: 'accessories', name: 'Peripherals', icon: 'Headphones' },
];

export const INITIAL_HERO_SLIDES = [
  {
    id: 'slide-1',
    title: 'Next-Gen Battle Station & Ultrawide Displays',
    subtitle: 'Experience true immersion with 240Hz OLED panels and liquid-cooled computing power.',
    tag: 'MEGA TECH DEALS',
    discount: 'Up to 25% OFF',
    buttonText: 'Shop Gaming Setups',
    categoryTarget: 'monitor',
    image: '/src/assets/images/hero_gaming_setup_1794072647637.jpg',
  },
  {
    id: 'slide-2',
    title: 'Flagship Smartphones & Titanium Hardware',
    subtitle: 'Latest generation smartphones with periscope zoom and pro-grade neural audio gear.',
    tag: 'NEW ARRIVALS 2026',
    discount: 'Special 15% Cashback',
    buttonText: 'Explore Smartphones',
    categoryTarget: 'phone',
    image: '/src/assets/images/hero_flagship_smartphones_1794072646069.jpg',
  },
  {
    id: 'slide-3',
    title: 'High-Performance PC Hardware & PCIe Gen 5',
    subtitle: 'Unleash unprecedented rendering and frame rates with cutting-edge GPUs and DDR5 RAM.',
    tag: 'HARDWARE MASTERY',
    discount: 'Save up to ৳12,000',
    buttonText: 'Upgrade Components',
    categoryTarget: 'gpu',
    image: '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg',
  },
];

export const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'ASUS ROG Swift OLED PG27AQDM 27" 240Hz 0.03ms Gaming Monitor',
    category: 'monitor',
    brand: 'ASUS',
    price: 98000,
    discountPercent: 12, // 12% off
    rating: 4.9,
    reviewsCount: 42,
    stock: 14,
    isFeatured: true,
    image: '/src/assets/images/hero_gaming_setup_1794072647637.jpg',
    description: '27-inch QHD (2560 x 1440) OLED gaming monitor with 240Hz refresh rate and 0.03ms response time for immersive, competitive gaming with uniform brightness technology.',
    specs: {
      Resolution: '2560 x 1440 (QHD)',
      'Refresh Rate': '240Hz',
      'Panel Type': 'OLED',
      'Response Time': '0.03ms',
      Ports: '2x HDMI 2.0, 1x DisplayPort 1.4, 2x USB 3.2',
      Warranty: '3 Years Official ASUS Warranty',
    },
  },
  {
    id: 'prod-2',
    name: 'AMD Ryzen 7 7800X3D Gaming Processor (8 Cores, 16 Threads)',
    category: 'cpu',
    brand: 'AMD',
    price: 49500,
    discountPercent: 8,
    rating: 5.0,
    reviewsCount: 88,
    stock: 22,
    isFeatured: true,
    image: '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg',
    description: 'The definitive gaming processor featuring AMD 3D V-Cache technology. 8 cores, 16 threads, up to 5.0GHz boost with 96MB L3 cache for hyper-responsive frame pacing.',
    specs: {
      Socket: 'AM5',
      Cores: '8 Cores / 16 Threads',
      'Base Clock': '4.2 GHz',
      'Boost Clock': '5.0 GHz',
      'L3 Cache': '96 MB 3D V-Cache',
      TDP: '120W',
      Warranty: '3 Years Warranty',
    },
  },
  {
    id: 'prod-3',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL30 RAM',
    category: 'ram',
    brand: 'Corsair',
    price: 15800,
    discountPercent: 15,
    rating: 4.8,
    reviewsCount: 31,
    stock: 35,
    isFeatured: true,
    image: '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg',
    description: 'Optimized for Intel and AMD motherboards, offering cutting-edge DDR5 frequencies, compact design, and dynamic ten-zone RGB lighting with iCUE control.',
    specs: {
      Capacity: '32GB (2 x 16GB)',
      Speed: 'DDR5 6000MHz',
      Latency: 'CL30-36-36-76',
      Voltage: '1.40V',
      Lighting: 'Dynamic Ten-Zone RGB',
      Warranty: 'Lifetime Limited',
    },
  },
  {
    id: 'prod-4',
    name: 'Samsung Galaxy S24 Ultra 5G (12GB RAM, 256GB Storage)',
    category: 'phone',
    brand: 'Samsung',
    price: 145000,
    discountPercent: 10,
    rating: 4.9,
    reviewsCount: 65,
    stock: 9,
    isFeatured: true,
    image: '/src/assets/images/hero_flagship_smartphones_1794072646069.jpg',
    description: 'Galaxy AI is here. Titanium exterior, 6.8" Flat Dynamic AMOLED 2X 120Hz display, 200MP Quad Telephoto optical camera system, and embedded S-Pen.',
    specs: {
      Display: '6.8-inch Dynamic AMOLED 2X, 120Hz',
      Processor: 'Snapdragon 8 Gen 3 for Galaxy',
      Camera: '200MP + 50MP + 12MP + 10MP Quad',
      Battery: '5000mAh with 45W Fast Charging',
      Build: 'Grade 2 Titanium Frame + Gorilla Armor',
      Warranty: '1 Year Official Samsung Bangladesh',
    },
  },
  {
    id: 'prod-5',
    name: 'ZOTAC Gaming GeForce RTX 4070 Super Trinity Black Edition 12GB',
    category: 'gpu',
    brand: 'NVIDIA / ZOTAC',
    price: 88500,
    discountPercent: 14,
    rating: 4.9,
    reviewsCount: 54,
    stock: 8,
    isFeatured: true,
    image: '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg',
    description: 'Powered by the ultra-efficient NVIDIA Ada Lovelace architecture, DLSS 3, and advanced IceStorm 2.0 triple-fan cooling system for 1440p ultra gaming.',
    specs: {
      VRAM: '12GB GDDR6X (192-bit)',
      'CUDA Cores': '7168',
      'Boost Clock': '2475 MHz',
      Cooling: 'IceStorm 2.0 Triple Fan',
      Power: '220W (1x 16-pin connector)',
      Warranty: '3+2 Years Manufacturer Warranty',
    },
  },
  {
    id: 'prod-6',
    name: 'Samsung 990 PRO 2TB PCIe 4.0 NVMe M.2 SSD with Heatsink',
    category: 'storage',
    brand: 'Samsung',
    price: 24500,
    discountPercent: 18,
    rating: 5.0,
    reviewsCount: 77,
    stock: 25,
    isFeatured: false,
    image: '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg',
    description: 'Reach near max performance with read speeds up to 7,450 MB/s and write speeds up to 6,900 MB/s. Built-in sleek heatsink compatible with PC and PS5.',
    specs: {
      Capacity: '2TB',
      Interface: 'PCIe Gen 4.0 x4, NVMe 2.0',
      'Sequential Read': 'Up to 7,450 MB/s',
      'Sequential Write': 'Up to 6,900 MB/s',
      Endurance: '1200 TBW',
      Warranty: '5 Years Official Warranty',
    },
  },
  {
    id: 'prod-7',
    name: 'Apple MacBook Pro 14" M3 Pro (18GB Unified Memory, 512GB SSD)',
    category: 'laptop',
    brand: 'Apple',
    price: 265000,
    discountPercent: 7,
    rating: 4.9,
    reviewsCount: 29,
    stock: 6,
    isFeatured: true,
    image: '/src/assets/images/hero_flagship_smartphones_1794072646069.jpg',
    description: 'Space Black finish. Liquid Retina XDR display with ProMotion 120Hz, up to 18 hours of battery life, and high-performance hardware-accelerated ray tracing.',
    specs: {
      Chip: 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      Memory: '18GB Unified Memory',
      Storage: '512GB Fast SSD',
      Display: '14.2" Liquid Retina XDR, 3024x1964',
      Ports: '3x Thunderbolt 4, HDMI, SDXC, MagSafe 3',
      Warranty: '1 Year Apple International',
    },
  },
  {
    id: 'prod-8',
    name: 'Logitech MX Master 3S Wireless Performance Mouse',
    category: 'accessories',
    brand: 'Logitech',
    price: 11200,
    discountPercent: 20,
    rating: 4.8,
    reviewsCount: 110,
    stock: 40,
    isFeatured: false,
    image: '/src/assets/images/hero_gaming_setup_1794072647637.jpg',
    description: 'Quiet clicks and 8K DPI track-on-glass sensor. MagSpeed electromagnetic scroll wheel spins 1,000 lines per second with tactile precision.',
    specs: {
      Sensor: 'Darkfield 8000 DPI (Tracks on glass)',
      Battery: 'Up to 70 days on full charge',
      Connectivity: 'Bluetooth LE + Logi Bolt USB Receiver',
      Weight: '141 g',
      Warranty: '1 Year Official Warranty',
    },
  },
  {
    id: 'prod-9',
    name: 'LG UltraGear 34" Curved WQHD 160Hz HDR10 Nano IPS Monitor',
    category: 'monitor',
    brand: 'LG',
    price: 74000,
    discountPercent: 16,
    rating: 4.7,
    reviewsCount: 38,
    stock: 11,
    isFeatured: false,
    image: '/src/assets/images/hero_gaming_setup_1794072647637.jpg',
    description: '34-inch 21:9 UltraWide QHD (3440 x 1440) Curved display with Nano IPS 1ms, 160Hz overclocked refresh rate, NVIDIA G-SYNC Compatible.',
    specs: {
      Resolution: '3440 x 1440 (UltraWide QHD)',
      'Aspect Ratio': '21:9 Curved (1900R)',
      'Refresh Rate': '160Hz (Overclock)',
      Color: 'DCI-P3 98% with HDR10',
      Warranty: '3 Years LG Warranty',
    },
  },
  {
    id: 'prod-10',
    name: 'Intel Core i7-14700K 20-Core Raptor Lake-S Refresh Processor',
    category: 'cpu',
    brand: 'Intel',
    price: 48000,
    discountPercent: 11,
    rating: 4.8,
    reviewsCount: 46,
    stock: 18,
    isFeatured: false,
    image: '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg',
    description: '20 Cores (8 Performance-cores + 12 Efficient-cores) and 28 threads. Max turbo frequency up to 5.6 GHz for intensive streaming and multithreaded creativity.',
    specs: {
      Socket: 'LGA1700',
      Cores: '20 Cores (8P + 12E) / 28 Threads',
      'Max Turbo Frequency': '5.6 GHz',
      'Smart Cache': '33 MB Intel Smart Cache',
      TDP: '125W Base / 253W Turbo',
      Warranty: '3 Years Warranty',
    },
  },
  {
    id: 'prod-11',
    name: 'G.Skill Trident Z5 RGB 32GB (2x16GB) DDR5 6400MHz Metallic Silver',
    category: 'ram',
    brand: 'G.Skill',
    price: 17200,
    discountPercent: 15,
    rating: 4.9,
    reviewsCount: 22,
    stock: 19,
    isFeatured: false,
    image: '/src/assets/images/hero_pc_hardware_components_1794072645798.jpg',
    description: 'Engineered for ultra-high performance on DDR5 platforms. Sleek futuristic aluminum heatspreader with customizable RGB light bar.',
    specs: {
      Capacity: '32GB (2x16GB)',
      Speed: 'DDR5 6400MHz (PC5-51200)',
      Latency: 'CL32-39-39-102',
      'Profile Support': 'Intel XMP 3.0 Ready',
      Warranty: 'Lifetime Limited Warranty',
    },
  },
  {
    id: 'prod-12',
    name: 'Google Pixel 9 Pro 5G (16GB RAM, 128GB Obsidian)',
    category: 'phone',
    brand: 'Google',
    price: 118000,
    discountPercent: 9,
    rating: 4.8,
    reviewsCount: 34,
    stock: 12,
    isFeatured: false,
    image: '/src/assets/images/hero_flagship_smartphones_1794072646069.jpg',
    description: 'The best of Google AI. Google Tensor G4 with 16GB of RAM, Super Actua display, 50MP triple pro camera with 30x Super Res Zoom and 7 years of OS updates.',
    specs: {
      Display: '6.3-inch Super Actua LTPO OLED 120Hz',
      Chipset: 'Google Tensor G4 with Titan M2',
      RAM: '16GB LPDDR5X',
      OS: 'Android 15 (7 Years of Pixel Drops)',
      Warranty: '1 Year Warranty',
    },
  },
];

export const INITIAL_ORDERS = [
  {
    id: 'TB-92841',
    customer: {
      name: 'Tanvir Hossain',
      email: 'tanvir.dev@gmail.com',
      phone: '+880 1711-234567',
      address: 'House 42, Road 11, Banani, Dhaka-1213',
    },
    items: [
      { id: 'prod-2', name: 'AMD Ryzen 7 7800X3D Processor', price: 45540, quantity: 1 },
      { id: 'prod-3', name: 'Corsair Vengeance RGB 32GB DDR5', price: 13430, quantity: 2 },
    ],
    subtotal: 72400,
    discount: 2400,
    deliveryFee: 0,
    total: 70000,
    status: 'Delivered', // Pending, Processing, Shipped, Delivered, Cancelled
    paymentMethod: 'Cash on Delivery',
    date: '2026-11-05',
  },
  {
    id: 'TB-92842',
    customer: {
      name: 'Sadia Sultana',
      email: 'sadia.tech@yahoo.com',
      phone: '+880 1822-987654',
      address: 'Sector 4, Uttara, Dhaka',
    },
    items: [
      { id: 'prod-1', name: 'ASUS ROG Swift OLED 27" 240Hz Monitor', price: 86240, quantity: 1 },
    ],
    subtotal: 86240,
    discount: 4000,
    deliveryFee: 0,
    total: 82240,
    status: 'Processing',
    paymentMethod: 'bKash Online',
    date: '2026-11-06',
  },
  {
    id: 'TB-92843',
    customer: {
      name: 'Rahim Chowdhury',
      email: 'rahim.ctg@gmail.com',
      phone: '+880 1933-445566',
      address: 'GEC Circle, Nasirabad, Chattogram',
    },
    items: [
      { id: 'prod-6', name: 'Samsung 990 PRO 2TB NVMe M.2 SSD', price: 20090, quantity: 1 },
      { id: 'prod-8', name: 'Logitech MX Master 3S Mouse', price: 8960, quantity: 1 },
    ],
    subtotal: 29050,
    discount: 1000,
    deliveryFee: 120,
    total: 28170,
    status: 'Pending',
    paymentMethod: 'Nagad',
    date: '2026-11-07',
  },
];

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'Shofiul Islam (Admin)',
    email: 'emnishofiulislam@gmail.com',
    role: 'admin',
    isVerified: true,
    joinedDate: '2026-01-10',
    status: 'Active',
  },
  {
    id: 'usr-2',
    name: 'Abrar Hasan',
    email: 'abrar.hasan@gmail.com',
    role: 'customer',
    isVerified: true,
    joinedDate: '2026-02-14',
    status: 'Active',
  },
  {
    id: 'usr-3',
    name: 'Nusrat Jahan',
    email: 'nusrat.jahan@hotmail.com',
    role: 'customer',
    isVerified: false,
    joinedDate: '2026-03-22',
    status: 'Active',
  },
];

// Local storage helper functions
const STORAGE_KEYS = {
  PRODUCTS: 'tech_bazar_products_v1',
  SLIDES: 'tech_bazar_slides_v1',
  ORDERS: 'tech_bazar_orders_v1',
  USERS: 'tech_bazar_users_v1',
};

export const getStoredProducts = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
      return INITIAL_PRODUCTS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_PRODUCTS;
  }
};

export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Failed to save products to localStorage', e);
  }
};

export const getStoredSlides = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.SLIDES);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(INITIAL_HERO_SLIDES));
      return INITIAL_HERO_SLIDES;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_HERO_SLIDES;
  }
};

export const saveStoredSlides = (slides) => {
  try {
    localStorage.setItem(STORAGE_KEYS.SLIDES, JSON.stringify(slides));
  } catch (e) {
    console.error('Failed to save slides to localStorage', e);
  }
};

export const getStoredOrders = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
      return INITIAL_ORDERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_ORDERS;
  }
};

export const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Failed to save orders to localStorage', e);
  }
};

export const getStoredUsers = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.USERS);
    if (!raw) {
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(INITIAL_USERS));
      return INITIAL_USERS;
    }
    return JSON.parse(raw);
  } catch (e) {
    return INITIAL_USERS;
  }
};

export const saveStoredUsers = (users) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save users to localStorage', e);
  }
};

// Format currency in BDT ৳ with comma separation
export const formatPrice = (amount) => {
  if (amount == null) return '৳0';
  return '৳' + Number(amount).toLocaleString('en-BD');
};

// Calculate discounted price
export const getDiscountedPrice = (price, discountPercent = 0) => {
  if (!discountPercent || discountPercent <= 0) return price;
  return Math.round(price - (price * (discountPercent / 100)));
};
