import React, { useState, useEffect, useRef } from "react";
import { NavLink } from "react-router-dom";
import {
  FaChevronUp,
  FaChevronDown,
  FaBars,
  FaAngleDoubleLeft,
} from "react-icons/fa";
import "./style.scss";

function SideMenu({ menuItems }) {
  const [activeMenu, setActiveMenu] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);  

  const toggleMenu = (index) => {
    setActiveMenu((prev) => (prev === index ? null : index));
  };

  const toggleMobileMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setActiveMenu(null); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
        <FaBars />
      </button>

      <div
        ref={menuRef} 
        className={`side-menu ${isMenuOpen ? "open-menu" : "close-my-menu"}`}
      >
        <div className="menu-header">
          <img
            className="new-logo"
            src="https://img.freepik.com/free-photo/sliced-whole-oranges_144627-3973.jpg"
            alt="Logo"
            height="50"
          />
          <button className="close-menu" onClick={toggleMobileMenu}>
            {isMenuOpen ? <FaAngleDoubleLeft /> : <FaBars />}
          </button>
        </div>
        <ul className="menu-list">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`menu-item ${activeMenu === index ? "expanded" : ""}`}
            >
              <div className="menu-title" onClick={() => toggleMenu(index)}>
                <div>
                  <span className="icon">{item?.icon}</span>
                  <span className="label">{item?.label}</span>
                </div>
                {item?.children && item?.children?.length > 0 && (
                  <span className="arrow">
                    {activeMenu === index ? <FaChevronUp /> : <FaChevronDown />}
                  </span>
                )}
              </div>
              {item?.children && item?.children.length > 0 && (
                <div
                  className={`submenu ${activeMenu === index ? "open" : ""}`}
                >
                  {item?.children?.map((child, childIndex) => (
                    <div key={childIndex} className="submenu-item">
                      <NavLink to={child?.path}>{child?.label}</NavLink>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default SideMenu;
