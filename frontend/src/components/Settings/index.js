import React, { useState, useEffect } from "react";
import useLanguage from "../../localization/index";
import "./style.scss";
const SettingsPage = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { t } = useLanguage();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const changeLanguage = (lang) => setLanguage(lang);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <div className="settings-container">
      <div className="settings-card">
        <h1 className="settings-title">{t("Language")}</h1>
        <div className="settings-content">
          <div className="language-settings">
            {/* <span className="setting-label">Language</span> */}
            <div className="button-group">
              <button
                onClick={() =>{ changeLanguage("en")

                  window.location.reload(); 

                }}
                className={`language-btn ${language === "en" ? "active" : ""}`}
              >
                English
              </button>
              <button
                onClick={() =>{ changeLanguage("ar")

                  window.location.reload(); 

                }}
                className={`language-btn ${language === "ar" ? "active" : ""}`}
              >
                العربية
              </button>
            </div>
          </div>
          {/* <div className="theme-settings">
            <span className="setting-label">Theme</span>
            <div className="button-group">
              <button
                onClick={toggleTheme}
                className={`theme-btn ${theme === "light" ? "light" : "dark"}`}
              >
                {theme === "light" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div> */}
        </div>
        {/* <div className="save-settings">
          <button onClick={() => alert("Settings Saved!")} className="save-btn">
            Save Settings
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default SettingsPage;
