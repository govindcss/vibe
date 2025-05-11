
import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning'; // Or your defined types
  duration?: number;
  title?: string;
}

interface ToastContextType {
  toasts: ToastMessage[];
  showToast: (toast: Omit<ToastMessage, 'id'>) => void;
  hideToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

let toastCount = 0;

export const ToastProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = useCallback((toastDetails: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${toastCount++}`;
    setToasts(prevToasts => [...prevToasts, { ...toastDetails, id }]);
    
    // Auto-dismiss
    const duration = toastDetails.duration || 3000;
    setTimeout(() => {
      hideToast(id);
    }, duration);

  }, []);

  const hideToast = useCallback((id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, showToast, hideToast }}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
