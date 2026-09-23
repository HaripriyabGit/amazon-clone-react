import React from "react";
 import "./Login.css";

function Login() {
  return (
    <div className="login-page">

  
      <div className="login-logo">
        <img src="./login_images.png" className="login-logo" />
        
      </div>

  
      <div className="login-card">

        <h1>Sign in or create<br />account</h1>

        <label htmlFor="email">
          Enter mobile number or email
        </label>

        <input
          type="text"
          id="email"
        />

        <button className="continue-btn">
          Continue
        </button>

        <p className="terms">
          By continuing, you agree to Amazon's
          <a href="#"> Conditions of Use</a>
         { " "}and
         
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