import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../styles/layout/_layout.scss";
import DefaultContainer from "../components/container/DefaultContainer/DefaultContainer";

const Layout = ({ children }) => {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [menuOpen]);

  return (
    <div className="app-container">
      <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      {menuOpen && (
        <div
          className="global-menu-overlay"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}

      <main>
        <DefaultContainer>{children}</DefaultContainer>
      </main>

      <Footer />
    </div>
  );
};

export default Layout;
