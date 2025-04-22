import React from 'react';
import { FiHome, FiMapPin } from 'react-icons/fi';
import '../../styles/components/diningToggle/_diningToggle.scss';

const DiningModeToggle = ({ diningMode, setDiningMode }) => {
  return (
    <div className="dining-toggle">
      <button 
        className={`dining-toggle__button ${diningMode === 'internal' ? 'active' : ''}`}
        onClick={() => setDiningMode('internal')}
      >
        <FiHome className="dining-toggle__icon" />
        <span className="dining-toggle__text">사내 식당</span>
      </button>
      
      <button 
        className={`dining-toggle__button ${diningMode === 'external' ? 'active' : ''}`}
        onClick={() => setDiningMode('external')}
      >
        <FiMapPin className="dining-toggle__icon" />
        <span className="dining-toggle__text">외식</span>
      </button>
    </div>
  );
};

export default DiningModeToggle;