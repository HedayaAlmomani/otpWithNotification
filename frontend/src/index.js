import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "./style.scss";
import {
  Home,
  Product,
  Products,
  AboutPage,
  ContactPage,
  Cart,
  Login,
  Checkout,
  PageNotFound,
  Navbar,
} from "./pages";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import { Toaster } from "react-hot-toast";
import Loader from "./CoreComponent/Loader";
import SideMenu from "./CoreComponent/SideMenu";
import MySideMenu from "./components/MySideMenu";
import NotificationComponent from "./components/NotificationComponent";
import SettingsPage from "./components/Settings";
import ViewAllUsers from "./components/AdminComponents/ViewAllUsers";
import UserForm from "./components/UserComponents/UserForm";
import UserProfile from "./components/UserComponents/UserProfile";
import RealTimeNotifications from "./components/NotificationComponent";
import NotificationBox from "./components/NotificationBox";
import { AuthProvider } from "./common/authContext";

const App = () => {
  const [showLoader, setShowLoader] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleShowLoader = () => setShowLoader(true);
    const handleHideLoader = () => setShowLoader(false);

    window.addEventListener("showLoader", handleShowLoader);
    window.addEventListener("hideLoader", handleHideLoader);

    return () => {
      window.removeEventListener("showLoader", handleShowLoader);
      window.removeEventListener("hideLoader", handleHideLoader);
    };
  }, []);

  return (
    <div>
      <div className="app-container">
        {location.pathname !== "/login" && <MySideMenu />}
        <div className="main-content">
          {/* <RealTimeNotifications/> */}
          {/* <NotificationBox/> */}
          {location.pathname !== "/login" && <Navbar />}
          <Loader show={showLoader} />
          <ScrollToTop>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* <Route path="/product" element={<Products />} />
              <Route path="/product/:id" element={<Product />} /> */}
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/user-form" element={<UserForm />} />
              <Route path="/user-profile" element={<UserProfile />} />
              {/* <Route path="/checkout" element={<Checkout />} /> */}

              <Route path="/admin">
                <Route path="users" element={<ViewAllUsers />} />
              </Route>

              <Route path="*" element={<PageNotFound />} />
              <Route path="/product/*" element={<PageNotFound />} />
            </Routes>
          </ScrollToTop>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

const Root = () => (
  <BrowserRouter>
    <AuthProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthProvider>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
