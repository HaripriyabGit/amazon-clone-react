
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../pages/CartContext";

function Header() {
  const navigate = useNavigate();
  const { cartCount } = useCart();

  const [languageOpen, setLanguageOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All Categories");

  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    const updateUser = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || null);
      } catch {
        setUser(null);
      }
    };

    window.addEventListener("userLoggedIn", updateUser);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("userLoggedIn", updateUser);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchText.trim();

    if (!query) return;

    navigate(
      `/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setAccountOpen(false);
    navigate("/");
  };

  const accountLinks = [
    { name: "Your Account", path: "/account" },
    { name: "Your Orders", path: "/orders" },
    { name: "Your Wish List", path: "/wishlist" },
    { name: "Keep shopping for", path: "" },
    { name: "Your Recommendations", path: "" },
    { name: "Returns", path: "/orders" },
    { name: "Your Prime Membership", path: "" },
    { name: "Your Prime Video", path: "" },
    { name: "Your Subscribe & Save Items", path: "" },
    { name: "Memberships & Subscriptions", path: "" },
    { name: "Your Seller Account", path: "" },
    { name: "Manage Your Content and Devices", path: "" },
    { name: "Your Music Library", path: "" },
    { name: "Register for a free Business Account", path: "" },
  ];

  return (
    <header className="amazon-header">
      <div className="header-container">

    
        <div className="header-items">
          <Link to="/" className="amazon-logo">
            <img
              src="/amazon-logo-main.png"
              className="header-logo"
              alt="Amazon"
            />
          </Link>
        </div>

       
        <div className="header-items">
          <div className="location-box">
            <small>Delivering to Kottayam 686019</small>
            <strong>
              <i className="bi bi-geo-alt"></i>
              Update location
            </strong>
          </div>
        </div>

    
        <form className="search-box" onSubmit={handleSearch}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Select product category"
          >
            {[
              "All Categories",
              "Alexa Skills",
              "Amazon Devices",
              "Amazon Fashion",
              "Amazon Fresh",
              "Appliances",
              "Apps & Games",
              "Baby",
              "Beauty",
              "Books",
              "Clothing & Accessories",
              "Computers & Accessories",
              "Deals",
              "Electronics",
              "Furniture",
              "Garden & Outdoors",
              "Grocery & Gourmet Foods",
              "Health & Personal Care",
              "Home & Kitchen",
              "Jewellery",
              "Luggage & Bags",
              "Office Products",
              "Pet Supplies",
              "Shoes & Handbags",
              "Sports, Fitness & Outdoors",
              "Tools & Home Improvement",
              "Toys & Games",
              "Video Games",
              "Watches",
            ].map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <input
            type="search"
            placeholder="Search Amazon.in"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            aria-label="Search products"
          />

          <button type="submit" className="search-btn" aria-label="Search">
            <i className="bi bi-search"></i>
          </button>
        </form>

    
        <div
          className="header-items language-box"
          onMouseEnter={() => setLanguageOpen(true)}
          onMouseLeave={() => setLanguageOpen(false)}
        >
          <span className="india-flag">🇮🇳</span>
          <strong>EN</strong>
          <span className="language-arrow">▾</span>

          {languageOpen && (
            <div className="language-popup">
              <h3>
                Change Language
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Learn more
                </a>
              </h3>

              {[
                ["English - EN", "en"],
                ["हिन्दी - HI", "hi"],
                ["தமிழ் - TA", "ta"],
                ["తెలుగు - TE", "te"],
                ["ಕನ್ನಡ - KN", "kn"],
                ["മലയാളം - ML", "ml"],
                ["বাংলা - BN", "bn"],
                ["मराठी - MR", "mr"],
              ].map(([label, value], index) => (
                <label className="language-option" key={value}>
                  <input
                    type="radio"
                    name="language"
                    value={value}
                    defaultChecked={index === 0}
                  />
                  <span>{label}</span>
                </label>
              ))}

              <hr />

              <div className="shopping-country">
                <span>🇮🇳</span>
                <span>You are shopping on Amazon.in</span>
              </div>

              <a
                href="#"
                className="change-country"
                onClick={(e) => e.preventDefault()}
              >
                Change country/region.
              </a>
            </div>
          )}
        </div>

   
        <div
          className="header-items account-wrapper"
          onMouseEnter={() => setAccountOpen(true)}
          onMouseLeave={() => setAccountOpen(false)}
        >
          <div className="account">
          <small>
  Hello, {user ? (user.name || user.emailOrPhone) : "sign in"}
</small>
            <strong>Account & Lists ▾</strong>
          </div>

          {accountOpen && (
            <div className="account-popup">

             
              {!user && (
                <>
                  <button
                    className="popup-signin"
                    onClick={() => {
                      setAccountOpen(false);
                      navigate("/login");
                    }}
                  >
                    Sign in
                  </button>

                  <p className="new-customer">
                    New customer?{" "}
                    <Link
                      to="/login"
                      onClick={() => setAccountOpen(false)}
                    >
                      Start here.
                    </Link>
                  </p>

                  <hr />
                </>
              )}

              <div className="popup-content">

           
                <div className="popup-column">
                  <h3>Your Lists</h3>

                  {[
                    "Shopping List",
                    "Create a Wish List",
                    "Wish from Any Website",
                    "Baby Wishlist",
                    "Discover Your Style",
                    "Explore Showroom",
                  ].map((item) => (
                    <a
                      href="#"
                      key={item}
                      onClick={(e) => e.preventDefault()}
                    >
                      {item}
                    </a>
                  ))}
                </div>

                <div className="popup-column">
                  <h3>Your Account</h3>

                  {accountLinks.map((item) => (
                    <Link
                      to={item.path || "#"}
                      key={item.name}
                      onClick={() => setAccountOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}

               
                 {user && (
  <>
    <hr />
    <a
      href="#"
      className="signout-link"
      onClick={(e) => {
        e.preventDefault();
        handleLogout();
      }}
    >
      Sign Out
    </a>
  </>
)}
                </div>

              </div>
            </div>
          )}
        </div>

      
        <div className="header-items">
          <Link to="/orders" className="header-link">
            <small>Returns</small>
            <strong>&amp; Orders</strong>
          </Link>
        </div>

     
        <div className="header-items cart-wrapper">
          <Link to="/cart" className="cart-box">
            <span className="cart-icon-container">
              <i className="bi bi-cart3"></i>

              {cartCount > 0 && (
                <span className="cart-count">
                  {cartCount}
                </span>
              )}
            </span>

            <strong>Cart</strong>
          </Link>
        </div>

      </div>
    </header>
  );
}

export default Header;
