// components/button/GoBackButton.jsx
import React from 'react';
import styles from './GoBackButton.module.scss';
import { IoIosArrowBack } from "react-icons/io";

const GoBackButton = ({ children, ...props }) => {
  return (
    <button className={styles['go-back-button']} {...props}>
      <span className={styles['back-arrow']}>
        <IoIosArrowBack size={30} />
      </span>
      <span className={styles['button-text']}>
        {children}
      </span>
    </button>
  );
};

export default GoBackButton;
