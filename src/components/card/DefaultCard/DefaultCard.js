import React from 'react';
import "../../../styles/components/card/_card.scss"
const Card = ({ children, className = '' }) => {
  return (
    <div className={`card ${className}`}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );
};

export default Card;
