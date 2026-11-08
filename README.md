# Tech Bazar - E-Commerce Frontend

A modern, high-performance Tech Hardware & Electronics E-Commerce storefront and management portal built with **React**, **Tailwind CSS**, and modern JavaScript. Designed to connect seamlessly with an Express.js and MongoDB (MERN Stack) backend via Axios.

---

## 🌟 Key Features

### 🛒 Storefront & Customer Experience
- **Interactive Banner Carousel (Hero Slider)**: Auto-play promotional slides with pause-on-hover, navigation arrows, discount tags, and direct collection links.
- **Hardware Catalog & Categorization**:
  - Monitors (OLED, Curved, High-Refresh)
  - Processors (AMD Ryzen & Intel Core)
  - Memory (RGB DDR5)
  - Smartphones (Flagship series)
  - Graphics Cards (NVIDIA GeForce RTX)
  - Storage (NVMe M.2 SSDs)
  - Laptops & Peripherals
- **Live Search & Multi-Criteria Filtering**:
  - Instant text search across product names, brands, and categories
  - Price range slider (Min to Max)
  - "Special Deals / Discounts Only" filter
  - "In-Stock Units Only" filter
  - Sort by: Featured, Price Low to High, Price High to Low, Highest Discount (%), and Top Customer Rated
- **Cart & Wishlist System**:
  - Slide-over Cart Drawer with real-time quantity modifiers (+ / -)
  - Coupon Code system (e.g., `TECHBAZAR10` for 10% off, `BAZAR500` for ৳500 off)
  - Automatic nationwide delivery fee calculation (Free delivery on orders over ৳5,000)
  - Saved Wishlist Drawer with one-click "Move to Cart"
- **Professional Checkout Flow**:
  - Multi-step customer shipping information form
  - Payment options: Cash on Delivery (COD), bKash, Nagad, and Credit/Debit Card
  - Instant order generation with unique Tracking ID and receipt summary
- **Day Mood & Night Mood (Light / Dark Theme)**:
  - Toggle between clean crisp Day Mode and sleek dark graphite Night Mode
  - Persistent theme selection stored in browser `localStorage`
- **Dedicated Multi-Page Experience**:
  - `HOME`: Main campaign banner, category quick links, and featured gear
  - `ALL DEVICES`: Focused hardware catalog view with active orange highlight
  - `ABOUT US`: Organization story, authorized brand warranties, and physical showroom details
  - `CONTACT`: Direct inquiry ticket submission, hotline numbers, service location, and FAQs

---

### 🛡️ Complete Authentication Suite
- **Sign In (Login)**: Secure authentication with role-based dashboard access
- **Registration**: Customer registration triggering verification workflow
- **Email Verification**: 6-digit OTP verification code screen
- **Forgot Password**: Password reset dispatch
- **Reset Password**: Verification code and new password confirmation
- **Resend Verification**: Timer countdown rate-limiting and instant resend
- **1-Click Demo Switcher**: Instant toggle between Super Admin and Customer for fast testing

---

### ⚙️ Full-Featured Admin Panel
- **Dashboard Overview**: Key metrics (Total Sales Revenue, Total Orders, Active Inventory, Registered Users), recent order list, and low-stock alerts.
- **Product Management**:
  - Create new hardware products with custom specifications and discount percentages
  - **Upload product image directly from your local PC** (`<input type="file">` via FileReader)
  - Edit pricing, discounts, and inventory counts on the fly
  - Delete items with confirmation
- **Banner Slider Manager**:
  - Change hero banner images directly by uploading from your computer
  - Update banner headlines, promotional subtitles, and discount badges
- **Customer Orders**:
  - View full recipient shipping addresses, contact numbers, and ordered items
  - Update order fulfillment statuses: `Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`
- **Users & Permissions**:
  - Manage user roles (`Admin` / `Customer`)
  - Inspect email verification status and toggle account states (`Active` / `Suspended`)

---

## 🛠️ Tech Stack

- **Frontend Framework**: React 19 (JavaScript / JSX)
- **Styling**: Tailwind CSS v4 with custom dark mode variants
- **Icons**: Lucide React
- **API Client**: Axios (pre-configured with JWT Bearer interceptors in `src/services/api.js`)
- **State & Persistence**: React Context API + LocalStorage fallback engine

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install the dependencies:

```bash
git clone https://github.com/your-username/tech-bazar-frontend.git
cd tech-bazar-frontend
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the root directory (based on `.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Server
```bash
npm run dev
```

The application will start on **http://localhost:5173**.

### 4. Build for Production
```bash
npm run build
```

The production-ready assets will be created in the `dist` folder.

---

## 🔌 Connecting Your MERN Backend

This frontend is designed for seamless integration with an Express.js & MongoDB backend:

1. Open `src/services/api.js`.
2. Set `IS_MOCK_MODE = false` once your Node.js/Express server is running.
3. The endpoints automatically follow standard REST conventions:
   - `POST /api/auth/login`
   - `POST /api/auth/register`
   - `POST /api/auth/verify-email`
   - `GET /api/products`
   - `POST /api/products` (Admin)
   - `GET /api/orders`
   - `POST /api/orders`
4. Authorization tokens are automatically attached to outgoing requests via the Axios request interceptor:
   ```javascript
   Authorization: Bearer <token>
   ```

---

## 📄 License

This project is licensed under the Apache-2.0 License.
