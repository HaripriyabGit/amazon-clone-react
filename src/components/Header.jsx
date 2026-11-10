
import React, { useState, useEffect } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { useCart } from "../pages/CartContext";
import {
  clearUser,
  readDeliveryLocation,
  readJson,
  readLanguage,
  readUser,
  saveDeliveryLocation,
  saveLanguage,
} from "../utils/session";

const languages = [
  ["English - EN", "en"],
  ["हिन्दी - HI", "hi"],
  ["தமிழ் - TA", "ta"],
  ["తెలుగు - TE", "te"],
  ["ಕನ್ನಡ - KN", "kn"],
  ["മലയാളം - ML", "ml"],
  ["বাংলা - BN", "bn"],
  ["मराठी - MR", "mr"],
];

function Header() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { cartCount } = useCart();

  const [languageOpen, setLanguageOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [suggestOpen, setSuggestOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState("All ");
  const [language, setLanguage] = useState(readLanguage);
  const [location, setLocation] = useState(readDeliveryLocation);
  const [pinDraft, setPinDraft] = useState(location.pincode);
  const [cityDraft, setCityDraft] = useState(location.city);
  const [recentSearches, setRecentSearches] = useState(() =>
    readJson(localStorage, "recentSearches", [])
  );

  const [user, setUser] = useState(readUser);

  useEffect(() => {
    const updateUser = () => setUser(readUser());
    const updateLanguage = () => setLanguage(readLanguage());
    const updateLocation = () => setLocation(readDeliveryLocation());

    window.addEventListener("userLoggedIn", updateUser);
    window.addEventListener("languageChanged", updateLanguage);
    window.addEventListener("locationChanged", updateLocation);
    window.addEventListener("storage", updateUser);

    return () => {
      window.removeEventListener("userLoggedIn", updateUser);
      window.removeEventListener("languageChanged", updateLanguage);
      window.removeEventListener("locationChanged", updateLocation);
      window.removeEventListener("storage", updateUser);
    };
  }, []);

  useEffect(() => {
    setSearchText(searchParams.get("q") || "");
    const category = searchParams.get("category");
    if (category) setSelectedCategory(category);
  }, [searchParams]);

  const handleSearch = (event) => {
    event.preventDefault();

    const query = searchText.trim();

    if (!query && selectedCategory === "All Categories") return;

    if (query) {
      const next = [query, ...recentSearches.filter((item) => item !== query)].slice(0, 6);
      setRecentSearches(next);
      localStorage.setItem("recentSearches", JSON.stringify(next));
    }

    setSuggestOpen(false);
    navigate(
      `/search?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`
    );
  };

  const handleLogout = () => {
    clearUser();
    setUser(null);
    setAccountOpen(false);
    navigate("/");
  };

  const saveLocation = (event) => {
    event.preventDefault();
    if (!/^\d{6}$/.test(pinDraft.trim())) return;

    const next = {
      city: cityDraft.trim() || "India",
      pincode: pinDraft.trim(),
    };
    saveDeliveryLocation(next);
    setLocation(next);
    setLocationOpen(false);
  };

  const accountLinks = [
    { name: "Your Account", path: "/account" },
    { name: "Your Orders", path: "/orders" },
    { name: "Your Wish List", path: "/wishlist" },
    { name: "Keep shopping for", path: "/" },
    { name: "Your Recommendations", path: "" },
    { name: "Returns", path: "" },
    { name: "Your Addresses", path: "" },
    { name: "Payment Options", path: "" },
    { name: "Your Subscribe & Save Items", path: "" },
    { name: "Memberships & Subscriptions", path: "" },
    { name: "Your Seller Account", path: "" },
    { name: "Manage Your Content and Devices", path: "" },
    { name: "Contact Us", path: "" },
    { name: "Register for a free Business Account", path: "" },
  ];

  return (
    <header className="amazon-header">
      <div className="header-container">

    
       <div className="header-items logo-wrapper">
  <button
    type="button"
    className="mobile-menu-btn"
    aria-label="Open menu"
    onClick={() => window.dispatchEvent(new Event("openAmazonMenu"))}
  >
    <i className="bi bi-list"></i>
  </button>

  <Link to="/" className="amazon-logo">
    <img
      src="/amazon-logo.png"
      className="header-logo"
      alt="Amazon"
    />
  </Link>
</div>

       
        <div className="header-items">
          <div className="location-box">
            <button
              type="button"
              className="location-box"
              onClick={() => setLocationOpen((open) => !open)}
            >
              <small>
                Delivering to {location.city} {location.pincode}
              </small>
              <strong>
                <i className="bi bi-geo-alt"></i>
                Update location
              </strong>
            </button>

            {locationOpen && (
              <form className="location-panel" onSubmit={saveLocation}>
                <label>
                  City
                  <input
                    value={cityDraft}
                    onChange={(event) => setCityDraft(event.target.value)}
                  />
                </label>
                <label>
                  PIN code
                  <input
                    value={pinDraft}
                    inputMode="numeric"
                    maxLength={6}
                    onChange={(event) => setPinDraft(event.target.value)}
                  />
                </label>
                <button type="submit">Apply</button>
                <button
                  type="button"
                  className="location-cancel"
                  onClick={() => setLocationOpen(false)}
                >
                  Cancel
                </button>
              </form>
            )}
          </div>
        </div>

    
        <form className="search-box" onSubmit={handleSearch}>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            aria-label="Select product category"
          style={{
  width: `${Math.min(
    Math.max(selectedCategory.length * 7 + 35, 55),
    200
  )}px`
}}>
            {[
              "All",
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
            onFocus={() => setSuggestOpen(true)}
            onBlur={() => window.setTimeout(() => setSuggestOpen(false), 150)}
            aria-label="Search products"
          />

          <button type="submit" className="search-btn" aria-label="Search">
            <i className="bi bi-search"></i>
          </button>

          {suggestOpen && recentSearches.length > 0 && (
            <div className="search-suggest">
              {recentSearches.map((item) => (
                <button
                  type="button"
                  key={item}
                  onMouseDown={(event) => {
                    event.preventDefault();
                    setSearchText(item);
                    setSuggestOpen(false);
                    navigate(
                      `/search?q=${encodeURIComponent(item)}&category=${encodeURIComponent(selectedCategory)}`
                    );
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </form>

    
        <div
          className="header-items language-box"
          onMouseEnter={() => setLanguageOpen(true)}
          onMouseLeave={() => setLanguageOpen(false)}
        >
          <span className="india-flag">🇮🇳</span>
          <strong>{language.toUpperCase()}</strong>
          <span className="language-arrow">▾</span>

          {languageOpen && (
            <div className="language-popup">
              <h3>
                Change Language
                <a href="#" onClick={(e) => e.preventDefault()}>
                  Learn more
                </a>
              </h3>

              {languages.map(([label, value]) => (
                <label className="language-option" key={value}>
                  <input
                    type="radio"
                    name="header-language"
                    value={value}
                    checked={language === value}
                    onChange={() => {
                      setLanguage(value);
                      saveLanguage(value);
                    }}
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
  <div className="desktop-account">
    <small>
      Hello, {user ? (user.name || user.emailOrPhone) : "sign in"}
    </small> <br></br>
    <strong>Account & Lists ▾</strong>
  </div>

  <Link to={user ? "/account" : "/login"} className="mobile-signin">
    <span> {user ? (user.name || user.emailOrPhone) : "sign in"}</span>
    <i className="bi bi-person"></i>
  </Link>
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
                    <Link
                      to="/wishlist"
                      key={item}
                      onClick={() => setAccountOpen(false)}
                    >
                      {item}
                    </Link>
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

      <span className="cart-count">
        {cartCount}
      </span>
    </span>

    <strong>Cart</strong>

  </Link>
</div>
      </div>
    </header>
  );
}

export default Header;
