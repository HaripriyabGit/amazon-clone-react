import React, { useState } from "react";
import "./Footer.css";

function Footer() {
   const [languageOpen, setLanguageOpen] = useState(false);
  return (
    <footer className="footer">

   
      <div className="footer-top">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Back to top
        </button>
      </div>


     
      <div className="footer-main">

    
        <div className="footer-column">
          <h3>Get to Know Us</h3>

          <a href="#">About Amazon</a>
          <a href="#">Careers</a>
          <a href="#">Press Releases</a>
          <a href="#">Amazon Science</a>
        </div>


      
        <div className="footer-column">
          <h3>Connect with Us</h3>

          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>


       
        <div className="footer-column">
          <h3>Make Money with Us</h3>

          <a href="#">Sell on Amazon</a>
          <a href="#">Sell under Amazon Accelerator</a>
          <a href="#">Protect and Build Your Brand</a>
          <a href="#">Amazon Global Selling</a>
          <a href="#">Supply to Amazon</a>
          <a href="#">Become an Affiliate</a>
          <a href="#">Fulfilment by Amazon</a>
          <a href="#">Advertise Your Products</a>
          <a href="#">Amazon Pay on Merchants</a>
        </div>


        <div className="footer-column">
          <h3>Let Us Help You</h3>

          <a href="#">Your Account</a>
          <a href="#">Returns Centre</a>
          <a href="#">Recalls and Product Safety Alerts</a>
          <a href="#">100% Purchase Protection</a>
          <a href="#">Amazon App Download</a>
          <a href="#">Help</a>
        </div>

      </div>


    
      <div className="footer-language">

        <img
         src="/amazon-logo.png"
              className="footer-logo"
              alt="Amazon"
        />
    

<div className="footer-buttons">

 
  <div className="footer-dropdown">

    <button
      className="footer-select"
      onClick={() => setLanguageOpen(!languageOpen)}
    >
      🌐 &nbsp; English
     
    </button>


    {languageOpen && (

      <div className="language-dropdown">

        <h5>Change Language <a href="">Learn more</a></h5>
           <hr />

        <label>
          <input
            type="radio"
            name="language"
            defaultChecked
          />
          English - EN
        </label>

        <label>
          <input
            type="radio"
            name="language"
          />
          हिन्दी - HI
        </label>

        <label>
          <input
            type="radio"
            name="language"
          />
          தமிழ் - TA
        </label>

        <label>
          <input
            type="radio"
            name="language"
          />
          తెలుగు - TE
        </label>

        <label>
          <input
            type="radio"
            name="language"
          />
          ಕನ್ನಡ - KN
        </label>

        <label>
          <input
            type="radio"
            name="language"
          />
          മലയാളം - ML
        </label>

        <label>
          <input
            type="radio"
            name="language"
          />
          বাংলা - BN
        </label>

        <label>
          <input
            type="radio"
            name="language"
          />
          मराठी - MR
        </label>

     

       

        

      </div>

    )}

  </div>



  <button className="footer-select">
    🇮🇳 &nbsp; India
  </button>

</div>

      </div>


      <div className="footer-global">

        <div className="global-column">

          <a href="#">
            AbeBooks
            <span>Books, art<br />& collectibles</span>
          </a>

          <a href="#">
            Shopbop
            <span>Designer<br />Fashion Brands</span>
          </a>

        </div>


        <div className="global-column">

          <a href="#">
            Amazon Web Services
            <span>Scalable Cloud<br />Computing Services</span>
          </a>

          <a href="#">
            Amazon Business
            <span>Everything For<br />Your Business</span>
          </a>

        </div>


        <div className="global-column">

          <a href="#">
            Audible
            <span>Download<br />Audio Books</span>
          </a>

          <a href="#">
            Amazon Music
            <span>Stream millions of<br />songs</span>
          </a>

        </div>


        <div className="global-column">

          <a href="#">
            IMDb
            <span>Movies, TV<br />& Celebrities</span>
          </a>

        </div>

      </div>



      <div className="footer-bottom">

        <div className="footer-bottom-links">

          <a href="#">Conditions of Use & Sale</a>

          <a href="#">Privacy Notice</a>

          <a href="#">Interest-Based Ads</a>

        </div>

        <p>
          © 1996-2026, Amazon.com, Inc. or its affiliates
        </p>

      </div>

    </footer>
  );
}

export default Footer;