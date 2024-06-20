import React from "react";
import styles from "./Button.module.css";

const Button = ({ children, onClick, classes }) => {
  return (
    <button className={`${styles.btn} ${styles[classes]}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
