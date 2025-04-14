import React from 'react';
import '../../styles/section/_section.scss';

const FlexSection = ({ children, className = '' }) => {
  return <div className={`flex-section ${className}`}>{children}</div>;
};

export default FlexSection;
