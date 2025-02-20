const currentLanguage = localStorage.getItem("language") || "en";

const localization = {
  ar: require("./ar.json"),
  en: require("./en.json"),
};

export const t = (key) => localization[currentLanguage]?.[key] || key;
