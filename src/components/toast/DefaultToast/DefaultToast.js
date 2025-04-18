// src/components/toast/DefaultToast.jsx
import React, { useEffect } from 'react';
import { useToastContext } from '../../../context/ToastProvider';
import styles from './DefaultToast.module.scss';

const DefaultToast = () => {
  const { toast, hideToast } = useToastContext();
  const { message, visible, duration } = toast;

  useEffect(() => {
    if (visible) {
      const timer = setTimeout(() => {
        hideToast();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [visible, duration, hideToast]);

  if (!visible || !message) return null;

  return (
    <div className={styles['toast-notification']}>
      <div className={styles['toast-message']}>{message}</div>
    </div>
  );
};

export default DefaultToast;
