import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/components/header/_header.scss";
import CustomLink from "../customLink/CustomLink";
import DiningAdminModal from "../modal/DiningAdminModal/DiningAdminModal.js";
import {
  FiMapPin,
  FiSettings,
  FiHome,
  FiBarChart2,
  FiAlertTriangle,
} from "react-icons/fi";
import ErrorReportModal from "../modal/ErrorReportModal/ErrorReportModal.js";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const openErrorModal = (e) => {
    e.preventDefault();
    setIsErrorModalOpen(true);
  };

  const closeErrorModal = () => {
    setIsErrorModalOpen(false);
  };

  return (
    <header
      className={`lunch-header ${isScrolled ? "lunch-header--scrolled" : ""}`}
    >
      <div className="lunch-header__container">
        <h1 className="lunch-header__title">
          <span className="lunch-header__title-text"><span className="lunch-header__title-text-primary">NP</span>icker</span>
          <span className="lunch-header__title-highlight">점심메뉴 서비스</span>
        </h1>

        <nav className="lunch-header__nav">
          <CustomLink
            to="/"
            className={`lunch-header__link ${
              location.pathname === "/" ? "active" : ""
            }`}
          >
            <FiHome className="lunch-header__icon" />홈
          </CustomLink>
          <CustomLink
            to="/result"
            className={`lunch-header__link ${
              location.pathname === "/result" ? "active" : ""
            }`}
          >
            <FiBarChart2 className="lunch-header__icon" />
            통계 보기
          </CustomLink>

          {/* CustomLink 대신 일반 버튼으로 변경 */}
          <button
            onClick={openModal}
            className={`lunch-header__link lunch-header__link--admin ${
              isModalOpen ? "active" : ""
            }`}
          >
            <FiSettings className="lunch-header__icon" />
            설정
          </button>
          <DiningAdminModal isOpen={isModalOpen} onClose={closeModal} />
          <button
            onClick={openErrorModal}
            className="lunch-header__link lunch-header__link--error"
          >
            <FiAlertTriangle className="lunch-header__icon" />
            오류 신고하기
          </button>
          <ErrorReportModal
            isOpen={isErrorModalOpen}
            onClose={closeErrorModal}
          />
        </nav>
      </div>
      <div className="lunch-header__backdrop" />
    </header>
  );
};

export default Header;
