import React from "react";


function Header() {
 
  return (
 
     
      <header className="amazon-header">
        <div className="header-container">

          <div className="header-items">
          <a href="/" className=" amazon-logo">
           <img src="./amazon-logo-main.png" className="header-logo" />
          </a>
       </div>
       <div className="header-items">
        
          <div className="location-box">
            <small>Delivering to Kottayam 686019</small>
          
            <strong>    <i className="bi bi-geo-alt"></i>Update location</strong>
          </div>
        </div>
       
          <div className="search-box">
            <select>
        <option selected="selected" >All Categories</option>
        <option >Alexa Skills</option>
        <option >Amazon Devices</option>
        <option >Amazon Fashion</option>
        <option >Amazon Fresh</option>
        <option >Amazon Fresh Meat</option>
        <option >Amazon Pharmacy</option>
        <option >Appliances</option>
        <option >Apps &amp; Games</option>
        <option >Audible Audiobooks</option>
        <option >Baby</option>
        <option >Beauty</option>
        <option >Books</option>
        <option >Car &amp; Motorbike</option>
        <option >Clothing &amp; Accessories</option>
        <option >Collectibles</option>
        <option >Computers &amp; Accessories</option>
        <option >Deals</option>
        <option >Electronics</option>
        <option >Furniture</option>
        <option >Garden &amp; Outdoors</option>
        <option >Gift Cards</option>
        <option >Grocery &amp; Gourmet Foods</option>
        <option >Health &amp; Personal Care</option>
        <option >Home &amp; Kitchen</option>
        <option >Industrial &amp; Scientific</option>
        <option>Jewellery</option>
        <option >Kindle Store</option>
        <option >Luggage &amp; Bags</option>
        <option >Luxury Beauty</option>
        <option >Movies &amp; TV Shows</option>
        <option >MP3 Music</option>
        <option >Music</option>
        <option >Musical Instruments</option>
        <option >Office Products</option>
        <option >Pet Supplies</option>
        <option >Prime Video</option>
        <option >Shoes &amp; Handbags</option>
        <option >Software</option>
        <option >Sports, Fitness &amp; Outdoors</option>
        <option >Subscribe &amp; Save</option>
        <option >Tools &amp; Home Improvement</option>
        <option >Toys &amp; Games</option>
        <option >Under ₹500</option>
        <option >Video Games</option>
        <option >Watches</option>
            </select>

            <input
              type="text"
              placeholder="Search Amazon.in"
            />

            <button className="search-btn">
            <i className="bi bi-search"></i>
            </button>
          </div>

        
          <div className="header-items language-box">
            🇮🇳 <strong>EN</strong> 
          </div>

  <div className="header-items account-wrapper">

  <div className="account">
    <small>Hello, sign in</small>
    <strong>Account & Lists ▾</strong>
  </div>

  <div className="account-popup">

    <button className="popup-signin">
      Sign in
    </button>

    <p className="new-customer">
      New customer?
      <a href="#"> Start here.</a>
    </p>

    <hr />

    <div className="popup-content">

   
      <div className="popup-column">
        <h3>Your Lists</h3>

        <a href="#">Create a Wish List</a>
        <a href="#">Wish from Any Website</a>
        <a href="#">Baby Wishlist</a>
        <a href="#">Discover Your Style</a>
        <a href="#">Explore Showroom</a>
      </div>

      <div className="popup-column">
        <h3>Your Account</h3>

        <a href="#">Your Account</a>
        <a href="#">Your Orders</a>
        <a href="#">Your Wish List</a>
        <a href="#">Keep shopping for</a>
        <a href="#">Your Recommendations</a>
        <a href="#">Your Prime Membership</a>
        <a href="#">Your Prime Video</a>
        <a href="#">Your Subscribe & Save Items</a>
        <a href="#">Memberships & Subscriptions</a>
        <a href="#">Your Seller Account</a>
        <a href="#">Manage Your Content and Devices</a>
        <a href="#">Your Music Library</a>
        <a href="#">Register for a free Business Account</a>
      </div>

    </div>

  </div>

</div>


         <div className="header-items">
          <a href="" className="header-link">
            <small>Returns</small>
            <strong>& Orders</strong>
          </a>
          </div>
       <div className="header-items">
          <a href="" className="cart-box">
            
            <strong><i className="bi bi-cart3"></i>Cart</strong>
          </a>
  </div>
        </div>
      </header>
 
  );
}

export default Header;