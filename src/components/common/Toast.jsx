/**
 * Tech Bazar - Toast Notification System
 */

import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useCartWishlist } from '../../context/CartWishlistContext.jsx';

export default function Toast() {
  const { toasts, removeToast } = useCartWishlist();

  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let borderClass = 'border-amber-500/30';
        let iconColor = 'text-amber-400';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          borderClass = 'border-rose-500/30';
          iconColor = 'text-rose-400';
        } else if (toast.type === 'info') {
          Icon = Info;
          borderClass = 'border-neutral-500/30';
          iconColor = 'text-neutral-300';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-start gap-3 p-3.5 bg-neutral-900/95 backdrop-blur-md text-neutral-100 rounded-lg border ${borderClass} shadow-xl shadow-black/40 text-sm animate-in fade-in slide-in-from-top-2 duration-200`}
          >
            <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${iconColor}`} />
            <div className="flex-1 text-xs leading-relaxed font-medium">
              {toast.message}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-neutral-400 hover:text-white transition-colors p-0.5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
