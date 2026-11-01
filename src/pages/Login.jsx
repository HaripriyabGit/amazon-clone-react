
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleContinue = (e) => {
    e.preventDefault();

    const value = emailOrPhone.trim();

    if (!value) {
      setError("Please enter your email or mobile number.");
      return;
    }

    
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    const isPhone = /^[6-9]\d{9}$/.test(value);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or 10-digit mobile number.");
      return;
    }

    setError("");

    
   const userData = {
  name: "Haripriya",
  emailOrPhone: value,
};

localStorage.setItem("user", JSON.stringify(userData));

window.dispatchEvent(new Event("userLoggedIn"));

navigate("/");
  };

  return (
    <div className="login-page">
      <div className="login-logo">
        <img
          src="/login_images.png"
          alt="Amazon Logo"
        />
      </div>

      <div className="login-card">
        <h1>
          Sign in or create
          <br />
          account
        </h1>

        <form onSubmit={handleContinue}>
          <label htmlFor="email">
            Enter mobile number or email
          </label>

          <input
            type="text"
            id="email"
            value={emailOrPhone}
            onChange={(e) => {
              setEmailOrPhone(e.target.value);
              setError("");
            }}
            placeholder="Email or mobile number"
          />

          {error && (
            <p className="login-error" role="alert">
              {error}
            </p>
          )}

          <button type="submit" className="continue-btn">
            Continue
          </button>
        </form>

        <p className="terms">
          By continuing, you agree to Amazon's
          <a href="#"> Conditions of Use</a> and
          <a href="#"> Privacy Notice</a>.
        </p>

        <hr />

        <h3>Buying for work?</h3>

        <a href="#" className="business-link">
          Create a free business account
        </a>
      </div>

      <footer className="login-footer">
        <div className="footer-links">
          <a href="#">Conditions of Use</a>
          <a href="#">Privacy Notice</a>
          <a href="#">Help</a>
        </div>

        <p>
          © 1996–2026, Amazon.com, Inc. or its affiliates
        </p>
      </footer>
    </div>
  );
}

export default Login;
