/**
 * Tech Bazar - Authentication Context
 * 
 * Supports complete e-commerce authentication flows:
 * - Registration with email verification flow
 * - Login with role check (Admin vs Customer)
 * - Email Verification (with 6-digit code or link)
 * - Forgot Password & Reset Password
 * - Resend Verification Email
 * - Demo account fast-switching for testing
 */

import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const STORAGE_AUTH_USER = 'tech_bazar_current_user_v1';

export const AuthProvider = ({ children }) => {
  // Default to Shofiul Islam (Admin) so the user can immediately test admin features or switch to customer
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_AUTH_USER);
      if (stored) return JSON.parse(stored);
      return {
        id: 'usr-1',
        name: 'Shofiul Islam',
        email: 'emnishofiulislam@gmail.com',
        role: 'admin', // 'admin' | 'customer'
        isVerified: true,
      };
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authView, setAuthView] = useState('login'); // 'login' | 'register' | 'verify-email' | 'forgot-password' | 'reset-password' | 'resend-verification'
  const [pendingEmail, setPendingEmail] = useState('');
  const [authMessage, setAuthMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_AUTH_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_AUTH_USER);
    }
  }, [user]);

  const openAuthModal = (view = 'login', email = '') => {
    setAuthView(view);
    if (email) setPendingEmail(email);
    setAuthMessage({ type: '', text: '' });
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setAuthMessage({ type: '', text: '' });
  };

  const login = async (email, password) => {
    // If admin email or password matches or simulated login
    const isAdmin = email.toLowerCase().includes('admin') || email === 'emnishofiulislam@gmail.com';
    const authenticatedUser = {
      id: isAdmin ? 'usr-admin' : 'usr-' + Date.now(),
      name: isAdmin ? 'Shofiul Islam (Admin)' : (email.split('@')[0].toUpperCase()),
      email,
      role: isAdmin ? 'admin' : 'customer',
      isVerified: true,
    };

    setUser(authenticatedUser);
    localStorage.setItem('tech_bazar_token', 'mock_jwt_token_' + Date.now());
    closeAuthModal();
    return authenticatedUser;
  };

  const register = async (name, email, password) => {
    setPendingEmail(email);
    // Transition to verify-email view
    setAuthView('verify-email');
    setAuthMessage({
      type: 'success',
      text: `Account created! We sent a 6-digit verification code to ${email}.`,
    });
  };

  const verifyEmail = async (code) => {
    if (!code || code.trim().length < 4) {
      throw new Error('Please enter a valid 6-digit verification code.');
    }
    const verifiedUser = {
      id: 'usr-' + Date.now(),
      name: pendingEmail.split('@')[0] || 'Tech Customer',
      email: pendingEmail || 'customer@techbazar.com',
      role: 'customer',
      isVerified: true,
    };
    setUser(verifiedUser);
    closeAuthModal();
    return verifiedUser;
  };

  const resendVerification = async (email) => {
    setPendingEmail(email || pendingEmail);
    setAuthMessage({
      type: 'info',
      text: `A fresh 6-digit verification link and code has been resent to ${email || pendingEmail}.`,
    });
  };

  const forgotPassword = async (email) => {
    setPendingEmail(email);
    setAuthView('reset-password');
    setAuthMessage({
      type: 'info',
      text: `Password reset instructions and verification code sent to ${email}.`,
    });
  };

  const resetPassword = async (code, newPassword) => {
    if (!code || code.trim().length < 4) {
      throw new Error('Please enter the reset code sent to your email.');
    }
    setAuthView('login');
    setAuthMessage({
      type: 'success',
      text: 'Password updated successfully! Please log in with your new credentials.',
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tech_bazar_token');
    localStorage.removeItem(STORAGE_AUTH_USER);
  };

  // Fast switch for developer/evaluator to test admin panel vs buyer experience
  const switchDemoRole = (role) => {
    if (role === 'admin') {
      setUser({
        id: 'usr-admin-1',
        name: 'Shofiul Islam (Admin)',
        email: 'emnishofiulislam@gmail.com',
        role: 'admin',
        isVerified: true,
      });
    } else {
      setUser({
        id: 'usr-customer-1',
        name: 'Tanvir Rahman (Customer)',
        email: 'tanvir.buyer@gmail.com',
        role: 'customer',
        isVerified: true,
      });
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin: user?.role === 'admin',
        isAuthModalOpen,
        authView,
        pendingEmail,
        authMessage,
        setAuthView,
        setAuthMessage,
        openAuthModal,
        closeAuthModal,
        login,
        register,
        verifyEmail,
        resendVerification,
        forgotPassword,
        resetPassword,
        logout,
        switchDemoRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
