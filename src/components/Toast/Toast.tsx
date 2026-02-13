import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Toast.css';
import { AlertCircle, CheckCircle2, Info, TriangleAlert } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastProps {
  message: string;
  type?: ToastType;
  duration?: number;
  closable?: boolean;
  onClose?: () => void;
  show?: boolean;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  closable = true,
  onClose,
  show = true,
}) => {
  const [visible, setVisible] = useState(show);

  useEffect(() => {
    setVisible(show);
  }, [show]);

  useEffect(() => {
    if (visible && duration > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [visible, duration]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  const getIcon = () => {
    const iconSize = 20;
    const strokeWidth = 2.5;

    switch (type) {
      case 'success':
        return <CheckCircle2 size={iconSize} strokeWidth={strokeWidth} />;
      case 'error':
        return <AlertCircle size={iconSize} strokeWidth={strokeWidth} />;
      case 'warning':
        return <TriangleAlert size={iconSize} strokeWidth={strokeWidth} />;
      case 'info':
      default:
        return <Info size={iconSize} strokeWidth={strokeWidth} />;
    }
  };
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className={`toast toast--${type}`}
          initial={{ opacity: 0, y: 50, scale: 0.3 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        >
          <div className="toast-icon">{getIcon()}</div>
          <div className="toast-content">
            <p className="toast-message">{message}</p>
          </div>
          {closable && (
            <button onClick={handleClose} className="toast-close" aria-label="Close notification">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
          {duration > 0 && (
            <motion.div
              className="toast-progress"
              initial={{ scaleX: 1 }}
              animate={{ scaleX: 0 }}
              transition={{ duration: duration / 1000, ease: 'linear' }}
            />
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};


export interface ToastContainerProps {
  children: React.ReactNode;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  children,
  position = 'bottom-right',
}) => {
  return <div className={`toast-container toast-container--${position}`}>{children}</div>;
};
