import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../../styles/components/header/_header.scss';
import CustomLink from "../customLink/CustomLink";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`lunch-header ${isScrolled ? 'lunch-header--scrolled' : ''}`}>
      <div className="lunch-header__container">
        <h1 className="lunch-header__title">
          <span className="lunch-header__title-text">오늘의 메뉴를</span>
          <span className="lunch-header__title-highlight">골라보세요!</span>
        </h1>

        <nav className="lunch-header__nav">
          <CustomLink
            to="/"
            className={`lunch-header__link ${location.pathname === '/' ? 'active' : ''}`}
          >
            Menu Picker
          </CustomLink>

          <CustomLink
            to="/stats"
            className={`lunch-header__link ${location.pathname === '/stats' ? 'active' : ''}`}
          >
            통계 보기
          </CustomLink>
        </nav>
      </div>
      <div className="lunch-header__backdrop" />
    </header>
  );
};

export default Header;
