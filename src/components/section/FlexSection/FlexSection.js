// src/components/section/FlexSection/FlexSection.jsx
import React from 'react';
import styles from './FlexSection.module.scss';

const FlexSection = ({ children }) => {
  return <div className={styles['flex-section']}>{children}</div>;
};

export default FlexSection;
