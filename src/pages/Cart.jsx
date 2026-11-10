
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import { productPath } from "../data/catalog";
import ProductImage from "../components/ProductImage";
import { readDeliveryLocation } from "../utils/session";
import "./Cart.css";

const readJSON = (key, fallback = []) => {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "null");
    return Array.isArray(data) ? data : fallback;
  } catch {
    return fallback;
  }
};

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
  const deliveryPlace = readDeliveryLocation();

  const [savedItems, setSavedItems] = useState(() =>
    readJSON("savedCartItems")
  );

  const [recentItems] = useState(() =>
    readJSON("recentlyViewed")
  );

  const [activeTab, setActiveTab] = useState("buyAgain");

  const [selectedItems, setSelectedItems] = useState(() =>
    cartItems.map((item) => String(item.id))
  );

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const totalItems = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 1),
    0
  );

  const selectedProducts = cartItems.filter((item) =>
    selectedItems.includes(String(item.id))
  );

  const selectedTotal = selectedProducts.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const allSelected =
    cartItems.length > 0 &&
    cartItems.every((item) =>
      selectedItems.includes(String(item.id))
    );

  const saveItems = (items) => {
    setSavedItems(items);
    localStorage.setItem("savedCartItems", JSON.stringify(items));
  };

  const toggleSelectAll = () => {
    setSelectedItems(
      allSelected
        ? []
        : cartItems.map((item) => String(item.id))
    );
  };

  const toggleItem = (id) => {
    const key = String(id);

    setSelectedItems((previous) =>
      previous.includes(key)
        ? previous.filter((itemId) => itemId !== key)
        : [...previous, key]
    );
  };

  const saveForLater = (item) => {
    const alreadySaved = savedItems.some(
      (saved) => String(saved.id) === String(item.id)
    );

    if (!alreadySaved) {
      saveItems([...savedItems, item]);
    }

    removeFromCart(item.id);
    setSelectedItems((previous) =>
      previous.filter((id) => id !== String(item.id))
    );
  };

  const moveToCart = (item) => {
    addToCart(item);

    saveItems(
      savedItems.filter(
        (saved) => String(saved.id) !== String(item.id)
      )
    );
  };

  const deleteSavedItem = (id) => {
    saveItems(
      savedItems.filter(
        (item) => String(item.id) !== String(id)
      )
    );
  };

  const proceedToBuy = () => {
    if (selectedProducts.length === 0) return;

    localStorage.removeItem("checkoutItem");
    sessionStorage.removeItem("buyNowItem");

    localStorage.setItem(
      "selectedCheckoutItems",
      JSON.stringify(selectedProducts)
    );

    navigate("/checkout");
  };
  const [showMobileDetails, setShowMobileDetails] = useState(false);

  return (
    <div className="cart-page">
      
      <div className="cart-layout">

        {/* LEFT SECTION */}
        <main className="cart-left-column">

          {/* SHOPPING CART */}
          <section className="cart-shopping-section">

            <div className="cart-heading">
              <h1>Shopping Cart</h1>

              {cartItems.length > 0 && (
                <button
                  className="cart-clear-button"
                  onClick={clearCart}
                >
                  Delete all items
                </button>
              )}
            </div>
            {/* MOBILE FIXED CHECKOUT BAR */}

{cartItems.length > 0 && (
  <div className="mobile-checkout-bar">

    <button
      className="mobile-proceed-button"
      disabled={selectedProducts.length === 0}
      onClick={proceedToBuy}
    >
      Proceed to Buy ({selectedProducts.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
      )} item{selectedProducts.reduce(
        (total, item) => total + Number(item.quantity || 1),
        0
      ) !== 1 ? "s" : ""})
    </button>

  </div>
)}
            {/* MOBILE CART SUMMARY */}

<div className="mobile-cart-summary">

  <h3>
    Total{" "}
    <strong>{formatPrice(selectedTotal)}</strong>
    <button type="button" onClick={() => setShowMobileDetails(!showMobileDetails)}>
      View details
    </button>
  </h3>

  <p className="mobile-free-delivery">
    <i className="bi bi-check-circle-fill"></i>
    Your order qualifies for FREE Delivery.
    <span> Select this option at checkout.</span>
    <a href="/checkout"> Details</a>
  </p>

  <div className="mobile-cashback">
    <i className="bi bi-check-circle-fill"></i>
    <div>
      <strong>₹25 cashback unlocked!</strong>
      <small>Pay with Amazon Pay UPI</small>
    </div>
    <span>›</span>
  </div>

  {showMobileDetails && (
    <div className="mobile-price-details">
      <p>
        Items ({selectedProducts.length} products)
        <strong>{formatPrice(selectedTotal)}</strong>
      </p>
      <p>
        Delivery
        <strong>FREE</strong>
      </p>
    </div>
  )}

</div>

            {cartItems.length > 0 && (
              <div className="cart-select-all">
                <label>
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleSelectAll}
                  />
                  {allSelected ? "Deselect all items" : "Select all items"}
                </label>
              </div>
            )}

            {cartItems.length === 0 ? (
              <div className="cart-empty">
              

                <div>
                  <h2>Your Amazon Cart is empty</h2>
                  <p>
                    Your shopping cart is waiting for your favourite
                    products.Your shopping cart is waiting. Give it purpose – fill it with groceries, clothing, household supplies, electronics and more.
Continue shopping on the Amazon.in homepage, learn about today's deals, or visit your Wish List.
                  </p >

                  
                </div>
              </div>
            ) : (
              <div className="cart-items">

                <div className="cart-price-heading">Price</div>

                {cartItems.map((item) => (
                  <article className="cart-item" key={item.id}>

                    <div className="cart-item-checkbox">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(String(item.id))}
                        onChange={() => toggleItem(item.id)}
                        aria-label={`Select ${item.name}`}
                      />
                    </div>

                    <Link
                      to={productPath(item.id)}
                      className="cart-item-image"
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                      />
                    </Link>

                    <div className="cart-item-details">

                      <Link
                        to={productPath(item.id)}
                        className="cart-item-name"
                      >
                        {item.name}
                      </Link>

                      <p className="cart-stock">In stock</p>

                      <p className="cart-delivery">
                        FREE delivery available
                      </p>

                      <p className="cart-fulfilled">
                        <i className="bi bi-check-square-fill" />
                        Fulfilled by Amazon
                      </p>

                      {item.features && (
                        <p className="cart-features">
                          {item.features}
                        </p>
                      )}

                      <p className="cart-item-variant">
                        {item.brand && (
                          <>Brand: {item.brand} &nbsp; </>
                        )}
                      </p>

                      <div className="cart-quantity">
                        <button
                          disabled={Number(item.quantity || 1) <= 1}
                          onClick={() => updateQuantity(item.id, -1)}
                          aria-label="Decrease quantity"
                        >
                          −
                        </button>

                        <span>{item.quantity || 1}</span>

                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          aria-label="Increase quantity"
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

                        <span>|</span>

                        <button
                          onClick={() => {
                            navigator.clipboard?.writeText(
                              window.location.origin +
                              productPath(item.id)
                            );
                          }}
                        >
                          Share
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price">
                      <strong>
                        {formatPrice(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        )}
                      </strong>

                      {item.discount > 0 && (
                        <p className="cart-discount">
                          {item.discount}% off
                        </p>
                      )}
                    </div>

                  </article>
                ))}

                <div className="cart-subtotal">
                  Subtotal ({totalItems} items):{" "}
                  <strong>{formatPrice(cartTotal ?? selectedTotal)}</strong>
                </div>
              </div>
            )}
          </section>

          {/* YOUR ITEMS */}
          <section className="cart-your-items">

            <h2>Your Items</h2>

            <div className="cart-tabs">
              <button
                className={activeTab === "saved" ? "active" : ""}
                onClick={() => setActiveTab("saved")}
              >
                Saved for later
                {savedItems.length > 0 && ` (${savedItems.length})`}
              </button>

              <button
                className={activeTab === "buyAgain" ? "active" : ""}
                onClick={() => setActiveTab("buyAgain")}
              >
                Buy it again
              </button>
            </div>

            {/* SAVED ITEMS */}
            {activeTab === "saved" && (
              <div className="cart-lower-items">

                {savedItems.length === 0 ? (
                  <p className="cart-no-items">
                    No items saved for later
                  </p>
                ) : (
                  savedItems.map((item) => (
                    <article
                      className="cart-lower-product"
                      key={item.id}
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <Link to={productPath(item.id)}>
                          {item.name}
                        </Link>

                        <strong>{formatPrice(item.price)}</strong>

                        <div className="cart-item-actions">
                          <button onClick={() => moveToCart(item)}>
                            Add to Cart
                          </button>

                          <span>|</span>

                          <button
                            onClick={() => deleteSavedItem(item.id)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </article>
                  ))
                )}

              </div>
            )}

            {/* BUY AGAIN */}
            {activeTab === "buyAgain" && (
              <div className="cart-lower-items">

                {recentItems.length === 0 ? (
                  <p className="cart-no-items">
                    No items
                  </p>
                ) : (
                  recentItems.map((item) => (
                    <article
                      className="cart-lower-product"
                      key={item.id}
                    >
                      <ProductImage
                        src={item.image}
                        alt={item.name}
                      />

                      <div>
                        <Link to={productPath(item.id)}>
                          {item.name}
                        </Link>

                        <strong>{formatPrice(item.price)}</strong>

                        <button
                          className="cart-small-yellow-button"
                          onClick={() => addToCart(item)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </article>
                  ))
                )}

              </div>
            )}
          </section>

          <p className="cart-disclaimer">
           The price and availability of items at Amazon.in are subject to change. The shopping cart is a temporary place to store a list of your items and reflects each item's most recent price.

Do you have a gift card or promotional code? We'll ask you to enter your claim code when it's time to pay.
          </p>

        </main>

        {/* RIGHT SECTION */}
        <aside className="cart-right-column">

          {/* ORDER SUMMARY */}
          <section className="cart-summary">

            <p className="cart-free-delivery">
              <i className="bi bi-check-circle-fill" />
              {cartItems.length > 0
                ? "Your order qualifies for FREE Delivery."
                : "Add items to your cart to see your order total."}
            </p>

            {cartItems.length > 0 && (
              <>
                <h3>
                  Subtotal ({selectedProducts.reduce(
                    (total, item) =>
                      total + Number(item.quantity || 1),
                    0
                  )} items):{" "}
                  <strong>{formatPrice(selectedTotal)}</strong>
                </h3>

                <label className="cart-gift-option">
                  <input type="checkbox" />
                  This order contains a gift
                </label>

                <button
                  className="cart-checkout-button"
                  disabled={selectedProducts.length === 0}
                  onClick={proceedToBuy}
                >
                  Proceed to Buy
                </button>
              </>
            )}
          </section>

          {/* RECENTLY VIEWED */}
          <section className="cart-recommendations">
            <h3>Your recently viewed items</h3>

            {recentItems.length === 0 ? (
              <p className="cart-no-recent">
                Products you view will appear here.
              </p>
            ) : (
              recentItems.slice(0, 5).map((item) => (
                <article
                  className="cart-recent-item"
                  key={item.id}
                >
                  <Link
                    to={productPath(item.id)}
                    className="cart-recent-image"
                  >
                    <ProductImage
                      src={item.image}
                      alt={item.name}
                    />
                  </Link>

                  <div className="cart-recent-details">
                    <Link
                      to={productPath(item.id)}
                      className="cart-recent-name"
                    >
                      {item.name}
                    </Link>

                    <p className="cart-recent-rating">
                      ★★★★★
                    </p>

                    <strong>{formatPrice(item.price)}</strong>

                    <p className="cart-recent-delivery">
                      FREE Delivery by Amazon
                    </p>

                    <button
                      className="cart-small-yellow-button"
                      onClick={() => addToCart(item)}
                    >
                      Add to cart
                    </button>
                  </div>
                </article>
              ))
            )}
          </section>

        </aside>
      </div>
    </div>
  );
}

export default Cart;
