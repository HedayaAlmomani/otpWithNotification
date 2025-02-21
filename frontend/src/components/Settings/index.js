import React, { useState, useEffect } from "react";
// import "./style.scss";
import Table from "../../CoreComponent/TableComponent";


const ParentComponent = () => {
  // Static data with 15 columns
  const staticData = [
    { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", age: 30, country: "USA", city: "New York", status: "Active", salary: 1000, department: "HR", joinDate: "2022-01-01", phone: "123-456-7890", gender: "Male", birthday: "1990-05-15", address: "1234 Elm Street" },
    { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", age: 28, country: "Canada", city: "Toronto", status: "Inactive", salary: 900, department: "IT", joinDate: "2021-06-15", phone: "234-567-8901", gender: "Female", birthday: "1993-08-25", address: "5678 Maple Ave" },
    { id: 3, name: "Alice Johnson", email: "alice@example.com", role: "Editor", age: 35, country: "UK", city: "London", status: "Active", salary: 1200, department: "Finance", joinDate: "2020-03-10", phone: "345-678-9012", gender: "Female", birthday: "1988-02-12", address: "4321 Oak Road" },
    { id: 4, name: "Bob Brown", email: "bob@example.com", role: "User", age: 40, country: "Australia", city: "Sydney", status: "Active", salary: 1100, department: "Marketing", joinDate: "2019-09-30", phone: "456-789-0123", gender: "Male", birthday: "1983-11-20", address: "9876 Pine Street" },
    // Add more data here...
  ];

  // Define the columns with 15 columns
  const columns = [
    { key: "id", label: "ID", fixed: true }, // Fixed column
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "age", label: "Age" },
    { key: "country", label: "Country" },
    { key: "city", label: "City" },
    { key: "status", label: "Status" },
    { key: "salary", label: "Salary" },
    { key: "department", label: "Department" },
    { key: "joinDate", label: "Join Date" },
    { key: "phone", label: "Phone" },
    { key: "gender", label: "Gender" },
    { key: "birthday", label: "Birthday" },
    { key: "address", label: "Address" },
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "age", label: "Age" },
    { key: "country", label: "Country" },
    { key: "city", label: "City" },
    { key: "status", label: "Status" },
    { key: "salary", label: "Salary" },
    { key: "department", label: "Department" },
    { key: "joinDate", label: "Join Date" },
    { key: "phone", label: "Phone" },
    { key: "gender", label: "Gender" },
    { key: "birthday", label: "Birthday" },
    { key: "address", label: "Address" },
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "age", label: "Age" },
    { key: "country", label: "Country" },
    { key: "city", label: "City" },
    { key: "status", label: "Status" },
    { key: "salary", label: "Salary" },
    { key: "department", label: "Department" },
    { key: "joinDate", label: "Join Date" },
    { key: "phone", label: "Phone" },
    { key: "gender", label: "Gender" },
    { key: "birthday", label: "Birthday" },
    { key: "address", label: "Address" },
  ];

  // Sorting configuration (initially based on 'id' and ascending order)
  const [sortConfig, setSortConfig] = useState({ key: "id", direction: "asc" });
  const [data, setData] = useState(staticData);

  // Sorting function to handle the sort logic
  const handleSortChange = (sortField, sortType) => {
    setSortConfig({ key: sortField, direction: sortType });

    // Sort the data based on the sort configuration
    const sortedData = [...data].sort((a, b) => {
      if (a[sortField] < b[sortField]) return sortType === "asc" ? -1 : 1;
      if (a[sortField] > b[sortField]) return sortType === "asc" ? 1 : -1;
      return 0;
    });

    setData(sortedData); // Update the state with the sorted data
  };

  return (
    <div>
      <h1>Static Data Table with Sorting</h1>
      <Table
        data={data}           // Pass the data (static in this case)
        columns={columns}     // Pass the columns configuration
        onSort={handleSortChange} // Callback to handle sorting logic
      />
    </div>
  );
};




const SettingsPage = () => {
  const [language, setLanguage] = useState(localStorage.getItem("language") || "en");
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
        <ParentComponent/>
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
          <button
            onClick={() => alert("Settings Saved!")}
            className="save-btn"
          >
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
