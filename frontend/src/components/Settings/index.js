import React, { useState, useEffect } from "react";
import Table from "../../CoreComponent/TableComponent";


const ParentComponent = () => {
  // Static data for the table (mock data)
  const mockData = [
    { id: 1, name: "John Doe", age: 30, email: "john.doe@example.com" },
    { id: 2, name: "Jane Smith", age: 25, email: "jane.smith@example.com" },
    { id: 3, name: "Bob Johnson", age: 40, email: "bob.johnson@example.com" },
    { id: 4, name: "Alice Brown", age: 35, email: "alice.brown@example.com" },
    { id: 5, name: "Charlie Davis", age: 50, email: "charlie.davis@example.com" },
    { id: 6, name: "Eve White", age: 28, email: "eve.white@example.com" },
    { id: 7, name: "Frank Black", age: 60, email: "frank.black@example.com" },
    { id: 8, name: "Grace Green", age: 32, email: "grace.green@example.com" },
    { id: 9, name: "Harry Blue", age: 45, email: "harry.blue@example.com" },
    { id: 10, name: "Ivy Pink", age: 38, email: "ivy.pink@example.com" },
    { id: 11, name: "Jack Purple", age: 55, email: "jack.purple@example.com" },
    { id: 12, name: "Kim Yellow", age: 60, email: "kim.yellow@example.com" },
  ];

  // Columns definition
  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "age", label: "Age" },
    { key: "email", label: "Email" },
  ];

  // Pagination state
  const [pagination, setPagination] = useState({
    currentPage: 1,
    perPage: 5,
    totalElements:30,
  });

  const handleSort = (key, direction) => {
    console.log(`Sorted by ${key} in ${direction} order`);
  };

  return (
    <div className="app-container">
      <h1>Table with Pagination</h1>
      <Table
        data={mockData}
        columns={columns}
        onSort={handleSort}
        pagination={pagination}
        setPagination={setPagination}
      />
    </div>
  );
};





const SettingsPage = () => {
  const [language, setLanguage] = useState(
    localStorage.getItem("language") || "en"
  );
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

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
      <ParentComponent />
      <div className="settings-card">
        <h1 className="settings-title">Settings</h1>
        <div className="settings-content">
          <div className="language-settings">
            <span className="setting-label">Language</span>
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
          <div className="theme-settings">
            <span className="setting-label">Theme</span>
            <div className="button-group">
              <button
                onClick={toggleTheme}
                className={`theme-btn ${theme === "light" ? "light" : "dark"}`}
              >
                {theme === "light" ? "Light Mode" : "Dark Mode"}
              </button>
            </div>
          </div>
        </div>
        <div className="save-settings">
          <button onClick={() => alert("Settings Saved!")} className="save-btn">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
