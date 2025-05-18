import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "../../styles/components/header/_header.scss";
import CustomLink from "../customLink/CustomLink";
import DiningAdminModal from "../modal/DiningAdminModal/DiningAdminModal.js";
import ErrorReportModal from "../modal/ErrorReportModal/ErrorReportModal.js";
// import eggBaconIcon from "../../assets/images/egg_bacon.png";
import foodfriedeggIcon from "../../assets/images/foodfriedegg.png";
import {
  FiSettings,
  FiHome,
  FiBarChart2,
  FiAlertTriangle,
} from "react-icons/fi";

const Header = ({ menuOpen, setMenuOpen }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const openModal = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const openErrorModal = (e) => {
    e.preventDefault();
    setIsErrorModalOpen(true);
  };

  return (
    <header
      className={`lunch-header ${isScrolled ? "lunch-header--scrolled" : ""}`}
    >
      <div className="lunch-header__container">
        <CustomLink to="/" onClick={closeMenu}>
          <span className="lunch-header__title-text">
            <span className="lunch-header__title-text-primary">NP</span>
            icker &nbsp;
            <span className="lunch-header__title-text-primary">
              점심메뉴 투표
            </span>
            {/* <img
            src={foodfriedeggIcon}
            alt="로고"
            className="lunch-header__icon-img"
          /> */}
          </span>
        </CustomLink>
        <button
          className={`lunch-header__menu-toggle ${menuOpen ? "active" : ""}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <nav className={`lunch-header__nav ${menuOpen ? "open" : ""}`}>
          <CustomLink
            to="/result"
            className={`lunch-header__link ${
              location.pathname === "/result" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <FiBarChart2 className="lunch-header__icon" />
            통계 보기
          </CustomLink>
          <button
            onClick={(e) => {
              openModal(e);
              closeMenu();
            }}
            className="lunch-header__link lunch-header__link--admin"
          >
            <FiSettings className="lunch-header__icon" />
            설정
          </button>
          <button
            onClick={(e) => {
              openErrorModal(e);
              closeMenu();
            }}
            className="lunch-header__link lunch-header__link--error"
          >
            <FiAlertTriangle className="lunch-header__icon" />
            오류 신고하기
          </button>
          <CustomLink
            to="/update-version-doc"
            className={`lunch-header__link ${
              location.pathname === "/update-version-doc" ? "active" : ""
            }`}
            onClick={closeMenu}
          >
            <FiBarChart2 className="lunch-header__icon" />
            업데이트 내역
          </CustomLink>
        </nav>

        <DiningAdminModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
        <ErrorReportModal
          isOpen={isErrorModalOpen}
          onClose={() => setIsErrorModalOpen(false)}
        />
      </div>
    </header>
  );
};

export default Header;
