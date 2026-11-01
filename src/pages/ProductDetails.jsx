
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "./CartContext";

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();

  const product = location.state?.product;
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();
  

  const price = Number(product.price) || 199;

  const handleAddToCart = () => {
  addToCart({
    ...product,
    price,
    quantity,
  });

  setMessage("Added to Cart Successfully!");


};

  const buyNow = () => {
    const checkoutItem = {
      ...product,
      price,
      quantity
    };

    localStorage.setItem(
      "checkoutItem",
      JSON.stringify(checkoutItem)
    );

    navigate("/checkout");
  };

  return (
    <div className="amazon-product-page">

    
      <div className="amazon-product-layout">


        <div className="amazon-image-section">
          <div className="main-product-image">
            <img
              src={product.image}
              alt={product.name}
            />
          </div>
        </div>

      
        <div className="amazon-product-info">

          <h1>{product.name}</h1>

          <p className="visit-store">Visit the Store</p>

          <div className="rating">
            <span>★★★★☆</span>
            <span> 4.0 | Customer Reviews</span>
          </div>

          <div className="choice-label">
            Amazon's Choice
          </div>

          <hr />

          <p className="deal-label">Limited time deal</p>

          <div className="price-details">
            <span className="discount-price">
              ₹{price.toLocaleString("en-IN")}
            </span>
            <span className="old-price">₹{(price * 2).toLocaleString("en-IN")}</span>
          </div>

          <p className="delivery-info">
            🚚 FREE delivery
          </p>

          <h3>About this item</h3>

          <ul className="product-highlights">
            <li>{product.name} - Quality product for everyday use.</li>
            <li>Designed for convenience and easy usage.</li>
            <li>Suitable for your daily needs.</li>
            <li>Explore the product and enjoy shopping.</li>
          </ul>

          <hr />

          <h3>Product Information</h3>

          <table className="specification-table">
            <tbody>
              <tr>
                <td>Brand</td>
                <td>{product.brand || "Generic"}</td>
              </tr>
              <tr>
                <td>Product Name</td>
                <td>{product.name}</td>
              </tr>
              <tr>
                <td>Availability</td>
                <td>In Stock</td>
              </tr>
              <tr>
                <td>Delivery</td>
                <td>Free Delivery</td>
              </tr>
            </tbody>
          </table>

        </div>

        
        <div className="amazon-buy-box">

          <h2>
            ₹{price.toLocaleString("en-IN")}
          </h2>

          <p>🚚 FREE delivery</p>

          <p className="stock-status">In Stock</p>

          <label htmlFor="quantity">Quantity:</label>

          <select
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>

         <button
  className="amazon-add-cart"
  onClick={handleAddToCart}
>
  🛒 Add to Cart
</button>

          <button
            className="amazon-buy-now"
            onClick={buyNow}
          >
            ⚡ Buy Now
          </button>

          {message && (
            <p className="cart-success">{message}</p>
          )}

          <hr />

          <p className="secure-text">🔒 Secure transaction</p>

          <p>Ships from: Amazon</p>
          <p>Sold by: Amazon Retail</p>

        </div>

      </div>

      <div className="frequently-bought">
        <h2>Frequently bought together</h2>
        <p>Explore more products from our store.</p>
      </div>

    </div>
  );
}

export default ProductDetails;
