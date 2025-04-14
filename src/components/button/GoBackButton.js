// components/button/GoBackButton.jsx
import React from 'react';
import './GoBackButton.scss';

const GoBackButton = ({ children, className = '', ...props }) => {
  return (
    <button className={`go-back-button ${className}`} {...props}>
      <span className="back-arrow">←</span>
      <span className="button-text">{children}</span>
    </button>
  );
};

export default GoBackButton;