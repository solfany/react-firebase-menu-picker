import React from 'react';
import '../../styles/components/title/_Title.scss';

const Title = ({ children, variant = 'default', icon }) => {
  return (
    <h2 className={`app-title app-title--${variant}`}>
      {icon && <span className="app-title__icon">{icon}</span>}
      <span className="app-title__text">{children}</span>
    </h2>
  );
};

export default Title;