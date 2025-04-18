// src/components/loading/LoadingSpinner.jsx
import React from 'react';
import styles from './LoadingSpinner.module.scss';

const LoadingSpinner = ({ size = 48 }) => {
  return (
    <div className={styles['loading-wrapper']}>
      <div
        className={styles['spinner']}
        style={{ width: size, height: size }}
      ></div>
    </div>
  );
};

export default LoadingSpinner;
