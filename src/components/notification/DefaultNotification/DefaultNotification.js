import React from 'react';
import styles from './DefaultNotification.module.scss';
import classNames from 'classnames';
import { FiInfo, FiAlertCircle, FiXCircle, FiUser, FiCheckCircle, FiClock, FiMinusCircle } from 'react-icons/fi';
import { HiOutlineSpeakerphone } from "react-icons/hi";

const ICONS = {
  info: <FiInfo />,
  warning: <FiMinusCircle  />,
  success: <FiCheckCircle />,
  error: <FiXCircle />,
  person: <FiUser />,
  time: <FiClock />,
  speaker: <HiOutlineSpeakerphone />,
};

const DefaultNotification = ({
  children,
  type = 'info', // 'info' | 'warning' | 'success' | 'error' | 'person' | 'time' 
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
