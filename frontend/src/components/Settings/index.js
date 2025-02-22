import React, { useState, useEffect } from "react";
import useLanguage from "../../localization/index";
import "./style.scss";

const SettingsPage = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
    window.location.reload(); // لتحديث الترجمة مباشرة
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h1 className="settings-title">{t("Settings")}</h1>

        {/* إعدادات اللغة */}
        <div className="settings-content">
          <div className="language-settings">
            <h3>{t("Language")}</h3>
            <div className="button-group">
              <button
                onClick={() => changeLanguage("en")}
                className={`language-btn ${language === "en" ? "active" : ""}`}
              >
                English
              </button>
              <button
                onClick={() => changeLanguage("ar")}
                className={`language-btn ${language === "ar" ? "active" : ""}`}
              >
                العربية
              </button>
            </div>
          </div>

          {/* إعدادات الوضع المظلم */}
          <div className="theme-settings">
            <h3>{t("Theme")}</h3>
            <div className="button-group">
              <button
                onClick={toggleTheme}
                className={`theme-btn ${theme === "light" ? "active" : ""}`}
              >
                ☀️ Light Mode
              </button>
              <button
                onClick={toggleTheme}
                className={`theme-btn ${theme === "dark" ? "active" : ""}`}
              >
                🌙 Dark Mode
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
