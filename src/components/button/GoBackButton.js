// components/button/GoBackButton.jsx
import React from 'react';
import './GoBackButton.scss';
import { IoIosArrowBack } from "react-icons/io";

const GoBackButton = ({ children, className = '', ...props }) => {
  return (
    <button className={`go-back-button ${className}`} {...props}>
      <span className="back-arrow"><IoIosArrowBack size={30}/></span>
      <span className="button-text">{children}</span>
    </button>
  );
};

export default GoBackButton;