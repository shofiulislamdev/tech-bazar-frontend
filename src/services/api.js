/**
 * Tech Bazar - Frontend API Client (Axios Service)
 * 
 * Ready for MERN Stack Backend integration.
 * To connect your Express/Node.js backend:
 * 1. Set VITE_API_URL in your .env file (e.g., http://localhost:5000/api)
 * 2. Set USE_LIVE_BACKEND = true below or configure through environment variables.
 */

import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token to headers
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('tech_bazar_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for centralized error handling
apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      // Auto logout or redirect if token expired
      console.warn('Unauthorized or token expired');
    }
    return Promise.reject(error.response?.data || error);
  }
);

// Toggle between live backend and local storage simulation
export const IS_MOCK_MODE = true;

/**
 * Products API Endpoints
 */
export const productAPI = {
  // GET /api/products
  getAll: async (params = {}) => {
    if (!IS_MOCK_MODE) {
      return apiClient.get('/products', { params });
    }
    // Mock simulation handled via initialData store in components
    return null;
  },

  // GET /api/products/:id
  getById: async (id) => {
    if (!IS_MOCK_MODE) {
      return apiClient.get(`/products/${id}`);
    }
    return null;
  },

  // POST /api/products (Admin only, supports multipart/form-data for image upload)
  create: async (productData) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/products', productData);
    }
    return productData;
  },

  // PUT /api/products/:id
  update: async (id, productData) => {
    if (!IS_MOCK_MODE) {
      return apiClient.put(`/products/${id}`, productData);
    }
    return productData;
  },

  // DELETE /api/products/:id
  delete: async (id) => {
    if (!IS_MOCK_MODE) {
      return apiClient.delete(`/products/${id}`);
    }
    return { success: true, id };
  },
};

/**
 * Authentication & User API Endpoints
 */
export const authAPI = {
  // POST /api/auth/register
  register: async (userData) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/auth/register', userData);
    }
    return { success: true, message: 'Verification email sent' };
  },

  // POST /api/auth/login
  login: async (credentials) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/auth/login', credentials);
    }
    return null;
  },

  // POST /api/auth/verify-email
  verifyEmail: async (data) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/auth/verify-email', data);
    }
    return { success: true, message: 'Email verified successfully' };
  },

  // POST /api/auth/forgot-password
  forgotPassword: async (email) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/auth/forgot-password', { email });
    }
    return { success: true, message: 'Reset code dispatched to email' };
  },

  // POST /api/auth/reset-password
  resetPassword: async (data) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/auth/reset-password', data);
    }
    return { success: true, message: 'Password has been reset successfully' };
  },

  // POST /api/auth/resend-verification
  resendVerification: async (email) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/auth/resend-verification', { email });
    }
    return { success: true, message: 'Verification code resent' };
  },
};

/**
 * Orders API Endpoints
 */
export const orderAPI = {
  // GET /api/orders
  getAll: async () => {
    if (!IS_MOCK_MODE) {
      return apiClient.get('/orders');
    }
    return null;
  },

  // POST /api/orders
  create: async (orderData) => {
    if (!IS_MOCK_MODE) {
      return apiClient.post('/orders', orderData);
    }
    return orderData;
  },

  // PATCH /api/orders/:id/status
  updateStatus: async (orderId, status) => {
    if (!IS_MOCK_MODE) {
      return apiClient.patch(`/orders/${orderId}/status`, { status });
    }
    return { success: true, orderId, status };
  },
};
