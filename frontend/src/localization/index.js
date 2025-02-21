// localization.js
import { useState, useEffect } from "react";

const localization = {
  ar: require("./ar.json"),
  en: require("./en.json"),
};

const useLanguage = () => {
  const [currentLanguage, setCurrentLanguage] = useState(localStorage.getItem("language") || "en");

  useEffect(() => {
    localStorage.setItem("language", currentLanguage);
    document.documentElement.lang = currentLanguage;
    document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
  }, [currentLanguage]);

  const t = (key) => localization[currentLanguage]?.[key] || key;

  return { currentLanguage, t, setCurrentLanguage };
};

export default useLanguage;
