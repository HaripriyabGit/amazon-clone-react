import React from "react";


function Header() {
 
  return (
 
     
      <header className="amazon-header">
        <div className="header-container">

        
          <a href="/" className="header-items amazon-logo">
           <img src="./amazon-logo-main.png" className="header-logo" />
          </a>

       
          <div className="header-items location-box">
            <small>Delivering to Kottayam 686019</small>
            <strong>Update location</strong>
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

            <button></button>
          </div>

        
          <div className="header-items language-box">
            🇮🇳 <strong>EN</strong> 
          </div>

        
    

  <div className="header-items account">
    <small>Hello, sign in</small>
    <strong>Account & Lists </strong>
  </div>




         
          <a href="" className=" header-items header-link">
            <small>Returns</small>
            <strong>& Orders</strong>
          </a>
          
       
          <a href="" className="header-items cart-box">
            
            <strong>Cart</strong>
          </a>

        </div>
      </header>
 
  );
}

export default Header;