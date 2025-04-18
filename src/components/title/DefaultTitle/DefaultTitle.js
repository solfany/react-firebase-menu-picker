import React from 'react';
import styles from './DefaultTitle.module.scss';

const Title = ({ children, variant = 'default', icon }) => {
  return (
    <h2 className={`${styles['app-title']} ${styles[`app-title--${variant}`]}`}>
      {icon && <span className={styles['app-title__icon']}>{icon}</span>}
      <span className={styles['app-title__text']}>{children}</span>
    </h2>
  );
};

export default Title;
