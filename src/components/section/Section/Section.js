// src/components/ui/Section.jsx
import React from "react";
import styles from './Section.module.scss';

const Section = ({ children, className = "" }) => {
  return (
    <section className={`${styles.section} ${className}`}>
      {children}
    </section>
  );
};

export default Section;
