import React from 'react';
import styles from './DefaultNotification.module.scss';
import classNames from 'classnames';
import { FiInfo, FiAlertCircle, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const ICONS = {
  info: <FiInfo />,
  warning: <FiAlertCircle />,
  success: <FiCheckCircle />,
  error: <FiXCircle />,
};

const DefaultNotification = ({
  children,
  type = 'info', // 'info' | 'warning' | 'success' | 'error'
  className = '',
}) => {
  return (
    <div className={classNames(styles.notification, styles[type], className)}>
      <div className={styles.icon}>{ICONS[type]}</div>
      <div className={styles.body}>{children}</div>
    </div>
  );
};

export default DefaultNotification;
