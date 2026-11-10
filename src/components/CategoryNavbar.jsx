import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { categoryPath, navCategories } from "../data/catalog";
import { readUser } from "../utils/session";

function CategoryNavbar() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [userName, setUserName] = useState("sign in");
  const location = useLocation();
  const isHomePage = location.pathname === "/";


  useEffect(() => {
    const openMenu = () => setIsSidebarOpen(true);
    const syncUser = () => {
      try {
        const user = readUser();
        setUserName(user?.name || user?.emailOrPhone || "sign in");
      } catch {
        setUserName("sign in");
      }
    };

    syncUser();
    window.addEventListener("openAmazonMenu", openMenu);
    window.addEventListener("userLoggedIn", syncUser);
    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("openAmazonMenu", openMenu);
      window.removeEventListener("userLoggedIn", syncUser);
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  const openCategory = (categoryId) => {
    setIsSidebarOpen(false);
    navigate(categoryPath(categoryId));
  };

  return (
    <>
      <nav className="category-navbar">
  {/* Desktop Navigation */}
  <div className="category-container desktop-category-nav">
    <button
      type="button"
      className="nav-item menu-item"
      onClick={() => setIsSidebarOpen(true)}
    >
      <strong>☰ All</strong>
    </button>

    {navCategories.map((item) => (
      <button
        type="button"
        className="nav-item"
        key={item.categoryId}
        onClick={() => openCategory(item.categoryId)}
      >
        {item.label}
      </button>
    ))}
  </div>

  {/* Mobile Home Navigation */}
  {isHomePage && (
    <div className="mobile-home-nav">
      <button onClick={() => setIsSidebarOpen(true)}>
        Shop By <br /> Category
      </button>
     &nbsp;&nbsp;&nbsp;
      <button onClick={() => openCategory("")}>
        Deals 
      </button> &nbsp;&nbsp;&nbsp;

      <button onClick={() => navigate("")}>
        Sell
      </button>
    </div>
  )}
</nav>

      {isSidebarOpen && (
        <div className="sidebar-wrapper">
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>

          <div className="amazon-sidebar">
            <div className="sidebar-header">
              <button
                type="button"
                className="sidebar-user"
                onClick={() => {
                  setIsSidebarOpen(false);
                  navigate(userName === "sign in" ? "/login" : "/account");
                }}
              >
                <span className="user-icon">👤</span>
                <strong>Hello, {userName}</strong>
              </button>

              <button
                type="button"
                className="sidebar-close"
                onClick={() => setIsSidebarOpen(false)}
              >
                ×
              </button>
            </div>

            <div className="sidebar-content">
              <div className="sidebar-section">
                <h3>Trending</h3>
                <button type="button" className="sidebar-link" onClick={() => openCategory("bestsellers-products")}>
                  Bestsellers
                </button>
                <button type="button" className="sidebar-link" onClick={() => openCategory("sales-products")}>
                  New Releases
                </button>
              </div>

              <div className="sidebar-section">
                <h3>Digital Content and Devices</h3>
                {[
                  ["Echo & Alexa", "smart-home"],
                  ["Fire TV", "home-entertainment"],
                  ["Headphones", "headphone-products"],
                  ["Cameras", "cameras"],
                  ["Computers", "Premium-products"],
                  ["Mobiles", "mobile-products"],
                ].map(([label, categoryId]) => (
                  <button
                    type="button"
                    className="sidebar-link arrow"
                    key={categoryId}
                    onClick={() => openCategory(categoryId)}
                  >
                    <span>{label}</span>
                    <span>›</span>
                  </button>
                ))}
              </div>

              <div className="sidebar-section">
                <h3>Shop by Department</h3>
                {navCategories.map((item) => (
                  <button
                    type="button"
                    className="sidebar-link arrow"
                    key={item.categoryId}
                    onClick={() => openCategory(item.categoryId)}
                  >
                    <span>{item.label}</span>
                    <span>›</span>
                  </button>
                ))}
              </div>

              <div className="sidebar-section">
                <h3>Help & Settings</h3>
                <button
                  type="button"
                  className="sidebar-link arrow"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("/account");
                  }}
                >
                  <span>Your Account</span>
                  <span>›</span>
                </button>
                <button
                  type="button"
                  className="sidebar-link arrow"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("/orders");
                  }}
                >
                  <span>Customer Service</span>
                  <span>›</span>
                </button>
                <button
                  type="button"
                  className="sidebar-link arrow"
                  onClick={() => {
                    setIsSidebarOpen(false);
                    navigate("/login");
                  }}
                >
                  <span>Sign in</span>
                  <span>›</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CategoryNavbar;
