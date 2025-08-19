import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
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
    <>
      <main>
        <DefaultContainer>{children}</DefaultContainer>
      </main>
    </>
  );
};

export default Layout;
