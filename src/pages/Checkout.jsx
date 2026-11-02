
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Checkout.css";

function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Check whether user came through Buy Now
  const directCheckoutItem = JSON.parse(
    localStorage.getItem("checkoutItem") || "null"
  );

  // Buy Now: show only selected product
  // Cart Checkout: show all cart products
  const checkoutItems = directCheckoutItem
    ? [directCheckoutItem]
    : cartItems;

  // Calculate total based on checkout products
  const checkoutTotal = checkoutItems.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 1),
    0
  );

  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    pincode: "",
    house: "",
    area: "",
    city: "",
    state: "",
  });

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [savedAddress, setSavedAddress] = useState(null);
  const [payment, setPayment] = useState("Cash on Delivery");
  const [message, setMessage] = useState("");

  // Calculate charges
  const deliveryFee = checkoutTotal > 499 ? 0 : 40;
  const marketplaceFee = checkoutItems.length > 0 ? 5 : 0;
  const orderTotal = checkoutTotal + deliveryFee + marketplaceFee;

  // Handle address input
  const handleAddressChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // Save delivery address
  const saveAddress = (e) => {
    e.preventDefault();

    if (!/^[0-9]{10}$/.test(address.mobile)) {
      alert("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (!/^[0-9]{6}$/.test(address.pincode)) {
      alert("Please enter a valid 6-digit PIN code.");
      return;
    }

    setSavedAddress({ ...address });
    setShowAddressForm(false);
  };

  // Place order
  const placeOrder = () => {
    if (checkoutItems.length === 0) {
      alert("Your cart is empty!");
      navigate("/cart");
      return;
    }

    if (!savedAddress) {
      alert("Please add your delivery address first.");
      setShowAddressForm(true);
      return;
    }

    // Create order
    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      items: checkoutItems.map((item) => ({ ...item })),
      address: { ...savedAddress },
      payment: payment,
      cartTotal: checkoutTotal,
      deliveryFee: deliveryFee,
      marketplaceFee: marketplaceFee,
      orderTotal: orderTotal,
      status: "Placed",
    };

    // Get existing orders
    const existingOrders = JSON.parse(
      localStorage.getItem("orders") || "[]"
    );

    // Save new order
    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...existingOrders])
    );

    // Remove Buy Now item or clear cart
    if (directCheckoutItem) {
      localStorage.removeItem("checkoutItem");
    } else {
      clearCart();
    }

    // Show success message
    setMessage("Order placed successfully!");
  };

  return (
    <div className="checkout-page">

      {/* Header */}
      <header className="checkout-header">
        <button
          className="checkout-logo"
          onClick={() => navigate("/")}
        >
          amazon<span>.in</span>
        </button>

        <h2>Secure checkout 🔒</h2>

        <button
          className="checkout-cart-link"
          onClick={() => navigate("/cart")}
        >
          🛒 Cart
        </button>
      </header>

      {message ? (
        <div className="checkout-success">
          <h2>✓ {message}</h2>
          <p>Thank you for shopping with us!</p>

          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>

          <button onClick={() => navigate("/orders")}>
            View Your Orders
          </button>
        </div>
      ) : (
        <main className="checkout-layout">

          {/* Left Section */}
          <section className="checkout-left">

            {/* Address */}
            <div className="checkout-section">
              <h3>1. Add delivery address</h3>
              <p>Enter your address to see delivery options.</p>

              {savedAddress && (
                <div className="saved-address">
                  <strong>{savedAddress.name}</strong>
                  <p>{savedAddress.mobile}</p>
                  <p>
                    {savedAddress.house}, {savedAddress.area}
                  </p>
                  <p>
                    {savedAddress.city}, {savedAddress.state} -{" "}
                    {savedAddress.pincode}
                  </p>

                  <button
                    className="checkout-text-button"
                    onClick={() => setShowAddressForm(true)}
                  >
                    Edit address
                  </button>
                </div>
              )}

              {!savedAddress && (
                <button
                  className="checkout-yellow-button"
                  onClick={() => setShowAddressForm(true)}
                >
                  Add a new delivery address
                </button>
              )}
            </div>

            {/* Payment */}
            <div className="checkout-section">
              <h3>2. Payment method</h3>

              <div className="payment-options">
                {[
                  "Cash on Delivery",
                  "UPI",
                  "Credit or Debit Card",
                ].map((method) => (
                  <label key={method} className="payment-option">
                    <input
                      type="radio"
                      name="payment"
                      value={method}
                      checked={payment === method}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>

            {/* Products */}
            <div className="checkout-section">
              <h3>3. Review items and shipping</h3>

              {checkoutItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                checkoutItems.map((item, index) => (
                  <div
                    className="checkout-product"
                    key={item.id || index}
                  >
                    <img
                      src={item.image}
                      alt={item.title || item.name}
                    />

                    <div>
                      <strong>
                        {item.title || item.name}
                      </strong>

                      <p>
                        Quantity: {item.quantity || 1}
                      </p>

                      <strong>
                        ₹
                        {(
                          Number(item.price || 0) *
                          Number(item.quantity || 1)
                        ).toLocaleString("en-IN")}
                      </strong>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Help */}
            <div className="checkout-help">
              <p>
                Need help? Review your order details before placing
                your order.
              </p>

              <p>
                This Amazon Clone is a frontend demonstration.
                It does not create a real order or process payments.
              </p>

              <button onClick={() => navigate("/cart")}>
                Back to cart
              </button>
            </div>

          </section>

          {/* Order Summary */}
          <aside className="checkout-summary">

            <button
              className="checkout-yellow-button summary-place-order"
              onClick={placeOrder}
              disabled={checkoutItems.length === 0}
            >
              Proceed to Buy
            </button>

            <hr />

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items:</span>
              <span>
                ₹{checkoutTotal.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="summary-row">
              <span>Delivery:</span>
              <span>
                {deliveryFee === 0 ? "FREE" : `₹${deliveryFee}`}
              </span>
            </div>

            <div className="summary-row">
              <span>Marketplace Fee:</span>
              <span>₹{marketplaceFee}</span>
            </div>

            <hr />

            <div className="summary-total">
              <strong>Order Total:</strong>
              <strong>
                ₹{orderTotal.toLocaleString("en-IN")}
              </strong>
            </div>

            <p className="checkout-note">
              {payment === "Cash on Delivery"
                ? "Payment method: Cash on Delivery"
                : `Selected payment: ${payment} (demo only)`}
            </p>

          </aside>
        </main>
      )}

      {/* Address Modal */}
      {showAddressForm && (
        <div
          className="address-modal-overlay"
          onClick={() => setShowAddressForm(false)}
        >
          <div
            className="address-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="address-modal-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="address-modal-header">
              <h2 id="address-modal-title">
                Add a new delivery address
              </h2>

              <button
                type="button"
                className="address-modal-close"
                aria-label="Close address form"
                onClick={() => setShowAddressForm(false)}
              >
                ×
              </button>
            </div>

            <form className="address-form" onSubmit={saveAddress}>

              <label>Full name</label>
              <input
                name="name"
                value={address.name}
                onChange={handleAddressChange}
                required
                placeholder="Enter full name"
              />

              <label>Mobile number</label>
              <input
                name="mobile"
                value={address.mobile}
                onChange={handleAddressChange}
                required
                maxLength={10}
                inputMode="numeric"
                placeholder="10-digit mobile number"
              />

              <label>PIN code</label>
              <input
                name="pincode"
                value={address.pincode}
                onChange={handleAddressChange}
                required
                maxLength={6}
                inputMode="numeric"
                placeholder="6-digit PIN code"
              />

              <label>Flat, house number, building</label>
              <input
                name="house"
                value={address.house}
                onChange={handleAddressChange}
                required
                placeholder="House / Flat number"
              />

              <label>Area, street, village</label>
              <input
                name="area"
                value={address.area}
                onChange={handleAddressChange}
                required
                placeholder="Street or area"
              />

              <label>Town / City</label>
              <input
                name="city"
                value={address.city}
                onChange={handleAddressChange}
                required
                placeholder="Enter city"
              />

              <label>State</label>
              <input
                name="state"
                value={address.state}
                onChange={handleAddressChange}
                required
                placeholder="Enter state"
              />

              <div className="address-modal-actions">
                <button
                  type="button"
                  className="checkout-cancel-button"
                  onClick={() => setShowAddressForm(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="checkout-yellow-button"
                >
                  Use this address
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}

export default Checkout;
