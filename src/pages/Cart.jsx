
import React, { useState } from "react";
import { Link ,useNavigate} from "react-router-dom";
import { useCart } from "./CartContext";

import "./Cart.css";

function Cart() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
  } = useCart();
const navigate = useNavigate();

  const [savedItems, setSavedItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("savedCartItems") || "[]");
    } catch {
      return [];
    }
  });

  const [activeTab, setActiveTab] = useState("cart");

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  const saveItems = (items) => {
    setSavedItems(items);
    localStorage.setItem("savedCartItems", JSON.stringify(items));
  };

  const saveForLater = (item) => {
    const alreadySaved = savedItems.some(
      (saved) => String(saved.id) === String(item.id)
    );

    if (!alreadySaved) {
      saveItems([...savedItems, item]);
    }

    removeFromCart(item.id);
  };

  const moveToCart = (item) => {
    addToCart(item);

    saveItems(
      savedItems.filter(
        (saved) => String(saved.id) !== String(item.id)
      )
    );
  };

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * (item.quantity || 1),
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + (item.quantity || 1),
    0
  );

  return (
    <div className="cart-page">
      <div className="cart-main">
        <section className="cart-left">
          <div className="cart-heading">
            <h1>
              {activeTab === "cart"
                ? "Shopping Cart"
                : "Saved for later"}
            </h1>

            {activeTab === "cart" && cartItems.length > 0 && (
              <button
                className="cart-text-button"
                onClick={clearCart}
              >
                Clear cart
              </button>
            )}
          </div>

          <div className="cart-tabs">
            <button
              className={activeTab === "cart" ? "active" : ""}
              onClick={() => setActiveTab("cart")}
            >
              Shopping Cart ({totalItems})
            </button>

            <button
              className={activeTab === "saved" ? "active" : ""}
              onClick={() => setActiveTab("saved")}
            >
              Saved for Later ({savedItems.length})
            </button>
          </div>

          {activeTab === "cart" && (
            <>
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <div className="cart-empty-icon">🛒</div>
                  <div>
                    <h2>Your Amazon Cart is empty</h2>
                    <p>
                      Your shopping cart is waiting for your
                      favourite products.
                    </p>
                    <Link to="/" className="cart-shop-button">
                      Continue shopping
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="cart-items">
                  <p className="cart-price-label">Price</p>

                  {cartItems.map((item) => (
                    <article className="cart-item" key={item.id}>
                      <div className="cart-item-image">
                        <img
                          src={item.image}
                          alt={item.name}
                          onError={(e) => {
                            e.currentTarget.style.visibility = "hidden";
                          }}
                        />
                      </div>

                      <div className="cart-item-details">
                        <Link
                          to={`/product/${item.id}`}
                          className="cart-item-name"
                        >
                          {item.name}
                        </Link>

                        <p className="cart-stock">In Stock</p>

                        {item.freeShipping && (
                          <p className="cart-delivery">
                            Eligible for Free Shipping
                          </p>
                        )}

                        {item.features && (
                          <p className="cart-features">
                            {item.features}
                          </p>
                        )}

                        <div className="cart-quantity">
                          <button
                            aria-label="Decrease quantity"
                            disabled={(item.quantity || 1) <= 1}
                            onClick={() =>
                              updateQuantity(item.id, -1)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity || 1}</span>

                          <button
                            aria-label="Increase quantity"
                            onClick={() =>
                              updateQuantity(item.id, 1)
                            }
                          >
                            +
                          </button>
                        </div>

                        <div className="cart-item-actions">
                          <button
                            onClick={() => removeFromCart(item.id)}
                          >
                            Delete
                          </button>

                          <span>|</span>

                          <button
                            onClick={() => saveForLater(item)}
                          >
                            Save for later
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-price">
                        {formatPrice(
                          (Number(item.price) || 0) *
                            (item.quantity || 1)
                        )}
                      </div>
                    </article>
                  ))}

                  <div className="cart-subtotal">
                    Subtotal ({totalItems} items):{" "}
                    <strong>{formatPrice(subtotal)}</strong>
                  </div>
                </div>
              )}
            </>
          )}

          {activeTab === "saved" && (
            <div className="saved-items">
              {savedItems.length === 0 ? (
                <div className="cart-empty">
                  <div>
                    <h2>No saved items</h2>
                    <p>
                      Products you save for later will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                savedItems.map((item) => (
                  <article className="cart-item" key={item.id}>
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>

                    <div className="cart-item-details">
                      <h3 className="cart-item-name">{item.name}</h3>

                      <p className="cart-stock">Saved for later</p>

                      <div className="cart-item-actions">
                        <button onClick={() => moveToCart(item)}>
                          Add to Cart
                        </button>

                        <span>|</span>

                        <button
                          onClick={() =>
                            saveItems(
                              savedItems.filter(
                                (saved) =>
                                  String(saved.id) !== String(item.id)
                              )
                            )
                          }
                        >
                          Delete
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price">
                      {formatPrice(item.price)}
                    </div>
                  </article>
                ))
              )}
            </div>
          )}
        </section>

        <aside className="cart-right">
          <div className="cart-summary">
            <p className="cart-free-delivery">
              {cartItems.length > 0
                ? "✓ Your order is eligible for delivery."
                : "Add items to your cart to see your order total."}
            </p>

            <h3>
              Subtotal ({totalItems} items):{" "}
              <strong>{formatPrice(cartTotal ?? subtotal)}</strong>
            </h3>

            {cartItems.length > 0 && (
              <>
                <label className="cart-gift-option">
                  <input type="checkbox" />
                  This order contains a gift
                </label>

                <button
  className="cart-checkout-button"
  onClick={() => navigate("/checkout")}
>
  Proceed to Buy
</button>
              </>
            )}
          </div>

          <div className="cart-recommendations">
            <h3>Keep shopping for</h3>
            <p>Discover more products for your needs.</p>

            <Link to="/" className="cart-recommend-link">
              Explore products →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Cart;
