/**
 * Tech Bazar - Authentication Suite Modal
 * Day & Night mode compliant.
 */

import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  ArrowRight, 
  RotateCcw, 
  KeyRound, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';

export default function AuthModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authView,
    setAuthView,
    pendingEmail,
    authMessage,
    login,
    register,
    verifyEmail,
    forgotPassword,
    resetPassword,
    resendVerification,
    switchDemoRole,
  } = useAuth();

  const { showToast } = useCartWishlist();

  // Form states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [localError, setLocalError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);
    try {
      await login(email, password);
      showToast('Welcome back! Signed in successfully.');
    } catch (err) {
      setLocalError(err.message || 'Login failed. Please check credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('Passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await register(name, email, password);
      showToast(`Verification code sent to ${email}`);
    } catch (err) {
      setLocalError(err.message || 'Registration failed.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyEmailSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);
    try {
      await verifyEmail(verificationCode);
      showToast('Email verified successfully! Welcome to Tech Bazar.');
    } catch (err) {
      setLocalError(err.message || 'Invalid verification code.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    setIsLoading(true);
    try {
      await forgotPassword(email);
      showToast('Password reset code dispatched to your email.');
    } catch (err) {
      setLocalError(err.message || 'Failed to process password request.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPasswordSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    if (password !== confirmPassword) {
      setLocalError('New passwords do not match.');
      return;
    }
    setIsLoading(true);
    try {
      await resetPassword(verificationCode, password);
      showToast('Password reset successfully! Please sign in.');
    } catch (err) {
      setLocalError(err.message || 'Failed to reset password.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (resendCooldown > 0) return;
    try {
      await resendVerification(pendingEmail || email);
      showToast('Verification code resent successfully.');
      setResendCooldown(45);
      const timer = setInterval(() => {
        setResendCooldown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      setLocalError('Could not resend email. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-md bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-2xl p-6 sm:p-7 animate-in fade-in zoom-in-95 duration-200 text-neutral-900 dark:text-neutral-100">
        
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4 p-2 text-neutral-400 hover:text-neutral-900 dark:hover:text-white rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Global Feedback Message */}
        {authMessage.text && (
          <div className="mb-4 p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-xs text-amber-700 dark:text-amber-300 flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-amber-500" />
            <span>{authMessage.text}</span>
          </div>
        )}

        {localError && (
          <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-xs text-rose-600 dark:text-rose-300 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />
            <span>{localError}</span>
          </div>
        )}

        {/* 1. LOGIN VIEW */}
        {authView === 'login' && (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
                Account Sign In
              </span>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">Welcome Back to Tech Bazar</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Access your orders, wishlist, and warranty records</p>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. emnishofiulislam@gmail.com"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setAuthView('forgot-password')}
                    className="text-[11px] text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs rounded-lg shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Signing In...' : 'Sign In to Account'}
              </button>
            </form>

            {/* Quick Demo Logins */}
            <div className="mt-4 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-center">
              <span className="text-[11px] font-mono text-neutral-500 uppercase block mb-2">
                1-Click Fast Login (Testing):
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    switchDemoRole('admin');
                    closeAuthModal();
                    showToast('Logged in as Super Admin');
                  }}
                  className="flex-1 py-1.5 px-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-amber-500/40 text-amber-700 dark:text-amber-300 rounded text-[11px] font-semibold"
                >
                  Admin Login
                </button>
                <button
                  type="button"
                  onClick={() => {
                    switchDemoRole('customer');
                    closeAuthModal();
                    showToast('Logged in as Customer');
                  }}
                  className="flex-1 py-1.5 px-2 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-750 border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 rounded text-[11px] font-semibold"
                >
                  Customer Login
                </button>
              </div>
            </div>

            <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthView('register')}
                className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
              >
                Register Here
              </button>
            </div>
          </div>
        )}

        {/* 2. REGISTER VIEW */}
        {authView === 'register' && (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
                New Customer
              </span>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">Create Tech Bazar Account</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Sign up to buy genuine hardware with official warranty</p>
            </div>

            <form onSubmit={handleRegisterSubmit} className="space-y-3">
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Tanvir Hossain"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="tanvir@example.com"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat password"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs rounded-lg shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? 'Creating Account...' : 'Register & Verify Email'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* 3. VERIFY EMAIL VIEW */}
        {authView === 'verify-email' && (
          <div>
            <div className="text-center mb-5">
              <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center mx-auto mb-3">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-black text-neutral-900 dark:text-white">Verify Your Email Address</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-xs mx-auto">
                We've sent a 6-digit confirmation code to{' '}
                <strong className="text-neutral-900 dark:text-white font-mono">{pendingEmail || email || 'your email'}</strong>
              </p>
            </div>

            <form onSubmit={handleVerifyEmailSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold text-center block mb-2">
                  Enter 6-Digit OTP / Code
                </label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="e.g. 748291"
                  className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-700 rounded-xl py-3 text-center text-lg font-mono tracking-widest text-neutral-900 dark:text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs rounded-lg shadow-md shadow-amber-500/20 transition-all"
              >
                {isLoading ? 'Verifying...' : 'Confirm Verification Code'}
              </button>
            </form>

            {/* Resend Verification Action */}
            <div className="mt-5 pt-4 border-t border-neutral-200 dark:border-neutral-800 text-center">
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-2">Didn't receive the email?</p>
              <button
                type="button"
                onClick={handleResendCode}
                disabled={resendCooldown > 0}
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline font-medium disabled:opacity-50 inline-flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>
                  {resendCooldown > 0
                    ? `Resend available in ${resendCooldown}s`
                    : 'Resend Verification Email'}
                </span>
              </button>
            </div>
          </div>
        )}

        {/* 4. FORGOT PASSWORD VIEW */}
        {authView === 'forgot-password' && (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
                Password Recovery
              </span>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">Forgot Your Password?</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Enter your registered email and we'll send you a password reset code.
              </p>
            </div>

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Registered Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your-email@gmail.com"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
              Remember your password?{' '}
              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
              >
                Return to Login
              </button>
            </div>
          </div>
        )}

        {/* 5. RESET PASSWORD VIEW */}
        {authView === 'reset-password' && (
          <div>
            <div className="mb-5">
              <span className="text-[11px] font-mono uppercase text-amber-600 dark:text-amber-400 font-bold tracking-wider">
                Set New Password
              </span>
              <h2 className="text-xl font-black text-neutral-900 dark:text-white mt-0.5">Reset Your Password</h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">
                Enter the code sent to your email along with your new password.
              </p>
            </div>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-3.5">
              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Reset Verification Code
                </label>
                <div className="relative">
                  <KeyRound className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    required
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    placeholder="e.g. 592819"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white font-mono placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-500 dark:text-neutral-400 uppercase font-semibold block mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-300 dark:border-neutral-800 rounded-lg pl-9 pr-3 py-2 text-xs text-neutral-900 dark:text-white placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-neutral-950 font-black text-xs rounded-lg shadow-md transition-all flex items-center justify-center gap-2"
              >
                {isLoading ? 'Updating...' : 'Save New Password & Sign In'}
              </button>
            </form>

            <div className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-400">
              <button
                type="button"
                onClick={() => setAuthView('login')}
                className="text-amber-600 dark:text-amber-400 font-semibold hover:underline"
              >
                Back to Login
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
