import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import useLanguage from '../../localization'; // Import from localization.js

import "./style.scss";

const Navbar = () => {
  const { currentLanguage, setCurrentLanguage } = useLanguage(); // Access language state and set function

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage); // Update language state from localStorage on mount
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, [setCurrentLanguage]);

  const changeLanguage = (lang) => {
    setCurrentLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", lang); // Store the selected language in localStorage
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light sticky-top navbar-container">
      <div className="container">
        <NavLink className="navbar-brand fw-bold fs-2" to="/">
          Osama Coins
        </NavLink>

        <div className="d-flex gap-2">
          <button
            onClick={() => changeLanguage("ar")}
            className={`btn ${currentLanguage === "ar" ? "btn-primary" : "btn-outline-primary"}`}
          >
            العربية
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`btn ${currentLanguage === "en" ? "btn-primary" : "btn-outline-primary"}`}
          >
            English
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
