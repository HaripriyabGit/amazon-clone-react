import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function CategoryNavbar() {
   const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <nav className="category-navbar">

        <div className="category-container">

         
          <div
            className="nav-item menu-item"
            onClick={() => setIsSidebarOpen(true)}
          >
            <strong>☰ All</strong>
          </div>

          <div className="nav-item">
            Amazon Pay
          </div>

          <div className="nav-item">
            Mobiles
          </div>

          <div className="nav-item">
            Today's Deals
          </div>

          <div className="nav-item">
            Coupons
          </div>

          <div className="nav-item">
            Flights
          </div>

          <div className="nav-item">
            Electronics
          </div>

          <div className="nav-item">
            Video Games
          </div>

          <div className="nav-item">
            Computers
          </div>

          <div className="nav-item">
            New Releases
          </div>

          <div className="nav-item">
            Bestsellers
          </div>

          <div className="nav-item">
            Baby
          </div>

          <div className="nav-item">
            Fashion
          </div>

          <div className="nav-item">
            Home & Kitchen
          </div>

        </div>

      </nav>


     

      {isSidebarOpen && (

        <div className="sidebar-wrapper">

        
          <div
            className="sidebar-overlay"
            onClick={() => setIsSidebarOpen(false)}
          ></div>


         
          <div className="amazon-sidebar">

           
            <div className="sidebar-header">

              <div className="sidebar-user">
                <span className="user-icon">
                  👤
                </span>

                <strong>
                  Hello, sign in
                </strong>
              </div>


              <button
                className="sidebar-close"
                onClick={() => setIsSidebarOpen(false)}
              >
                ×
              </button>

            </div>


           

            <div className="sidebar-content">

             

              <div className="sidebar-section">

                <h3>
                  Trending
                </h3>

                <div className="sidebar-link">
                  Bestsellers
                </div>

                <div className="sidebar-link">
                  New Releases
                </div>

              </div>


             

              <div className="sidebar-section">

                <h3>
                  Digital Content and Devices
                </h3>

                <div className="sidebar-link arrow">
                  <span>Echo & Alexa</span>
                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
                  <span>Fire TV</span>
                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
                  <span>Kindle E-Readers & eBooks</span>
                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
                  <span>Audible Audiobooks</span>
                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
                  <span>Amazon Prime Video</span>
                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
                  <span>Amazon Music</span>
                  <span>›</span>
                </div>

              </div>


           

               <div className="sidebar-section">

                <h3>
                 Programs & Features
                </h3>

                <div className="sidebar-link arrow">
                
                  Gift Cards & Mobile Recharges



                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
                 Amazon Launchpad
                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
                 Amazon Business
                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
               Handloom and Handicrafts
                  <span>›</span>
                </div>

              </div>
              <div className="sidebar-section">

                <h3>
                 Help & Settings



                </h3>

                <div className="sidebar-link arrow">
                
              Your Account



                  <span>›</span>
                </div>

                <div className="sidebar-link arrow">
              Customer Service
                  <span>›</span>
                </div>
                <div className="sidebar-link arrow">
                    <div
      className=""
      onClick={() => navigate("/login")}
    >
      Sign in
    </div>
                  <span>›</span>
                </div>
         

            </div>

            </div>

          </div>

        </div>

      )}

    </>
  );
}

export default CategoryNavbar;