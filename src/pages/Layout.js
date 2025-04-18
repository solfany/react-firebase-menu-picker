// src/components/Layout.js
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import "../styles/layout/_layout.scss";
// import Container from "../components/container/Container";
import DefaultContainer from "../components/container/DefaultContainer/DefaultContainer"
const Layout = ({ children }) => {
  const location = useLocation();
  return (
    <div className="app-container">
      <Header />
      <main>
        <DefaultContainer>
          {children}
        </DefaultContainer>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
