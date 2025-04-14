import React from 'react';
import './DefaultButton.scss';

const DefaultButton = ({ children, className = '', ...props }) => {
  return (
    <button className={`default-button ${className}`} {...props}>
      {children}
    </button>
  );
};

export default DefaultButton;
