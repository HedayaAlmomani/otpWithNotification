import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "./style.scss";

const Navbar = () => {
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") || "en";
    setLanguage(savedLanguage);
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === "ar" ? "rtl" : "ltr";
  }, []);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", lang);
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
            className={`btn ${language === "ar" ? "btn-primary" : "btn-outline-primary"}`}
          >
            العربية
          </button>
          <button
            onClick={() => changeLanguage("en")}
            className={`btn ${language === "en" ? "btn-primary" : "btn-outline-primary"}`}
          >
            English
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
