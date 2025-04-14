// src/components/ui/CustomLink/CustomLink.js
import React from "react";
import { useNavigate } from "react-router-dom";

const CustomLink = ({ to, children, className = "", onClick }) => {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    if (onClick) onClick();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

export default CustomLink;
