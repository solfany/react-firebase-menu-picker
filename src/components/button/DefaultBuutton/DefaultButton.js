import React from 'react';
import "../../../styles/components/button/_button.scss";

const DefaultButton = ({ children, className = '', isSelected = false, ...props }) => {
  const classes = [
    'default-button',
    isSelected ? 'selected' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
};

export default DefaultButton;
