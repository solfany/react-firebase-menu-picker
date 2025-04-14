// src/components/Header.jsx
import React from 'react';
import '../../styles/components/header/_header.scss';
import CustomLink from "../customLink/CustomLink";
import DefaultButton from '../button/DefaultButton';

const Header = () => {
  return (
    <header className="lunch-header">
      <h1 className="lunch-title">오늘의 메뉴를 골라보세요!</h1>
      <DefaultButton>
        <CustomLink to="/">
          menu picker
        </CustomLink>
      </DefaultButton>
      <DefaultButton>
        <CustomLink to="/stats">
          통계 보기
        </CustomLink>
      </DefaultButton>
    </header>
  );
};

export default Header;
