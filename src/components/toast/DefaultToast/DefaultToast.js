// src/components/toast/DefaultToast.jsx
import React, { useEffect } from "react";
import { useToastContext } from "../../../context/ToastProvider";
import {
  FiInfo,
  FiCheckCircle,
  FiAlertTriangle,
  FiXCircle,
} from "react-icons/fi";
import styles from "./DefaultToast.module.scss";

const iconMap = {
  info: <FiInfo />,
  success: <FiCheckCircle />,
  warning: <FiAlertTriangle />,
  error: <FiXCircle />,
};

const DefaultToast = () => {
  const { toast, hideToast } = useToastContext();
  const { message, visible, duration, type = "info" } = toast;

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
    <div className={`${styles["toast-notification"]} ${styles[type]}`}>
      <div className={styles["toast-icon"]}>{iconMap[type]}</div>
      <div className={styles["toast-message"]}>{message}</div>
    </div>
  );
};

export default DefaultToast;
