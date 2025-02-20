import React from "react";
import SideMenu from "../../CoreComponent/SideMenu";
import {
  FaHome,
  FaInfoCircle,
  FaPhone,
  FaSignInAlt,
  FaTools,
  FaCog, 
} from "react-icons/fa";
import "./style.scss";

const MySideMenu = () => {
  const menuItems = [
    {
      label: "Home",
      icon: <FaHome />,
      path: "/",
    },
    {
      label: "About",
      icon: <FaInfoCircle />,
      path: "/about",
    },
    {
      label: "Contact",
      icon: <FaPhone />,
      path: "/contact",
    },
    {
      label: "Authentication",
      icon: <FaSignInAlt />,
      children: [{ label: "Login", path: "/login" }],
    },
    {
      label: "Admin",
      icon: <FaTools />,
      children: [],
    },
    {
      label: "Settings",
      icon: <FaCog />, 
      children: [{ label: "Settings", path: "/settings" }],

    },
  ];

  return <SideMenu menuItems={menuItems} />;
};

export default MySideMenu;
