
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";
import "./Checkout.css";

const readJSON = (key, fallback) => {
  try {
    const data = JSON.parse(localStorage.getItem(key) || "null");
    return data ?? fallback;
  } catch {
    return fallback;
  }
};

const emptyAddress = {
  country: "India",
  name: "",
  mobile: "",
  pincode: "",
  house: "",
  area: "",
  landmark: "",
  city: "",
  state: "",
  isDefault: false,
  instructions: "",
};
const money = (amount) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function Checkout() {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  // BUY NOW ITEM
  const directCheckoutItem = (() => {
    try {
      return JSON.parse(
        sessionStorage.getItem("buyNowItem") ||
          localStorage.getItem("checkoutItem") ||
          "null"
      );
    } catch {
      return null;
    }
  })();

  const checkoutItems = directCheckoutItem
    ? [directCheckoutItem]
    : cartItems;

  const checkoutTotal = checkoutItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Math.max(1, Number(item.quantity || 1)),
    0
  );

  // ADDRESS LIST
  const [addressList, setAddressList] = useState(() => {
    const addresses = readJSON("savedAddresses", []);
    return Array.isArray(addresses) ? addresses : [];
  });

  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const addresses = readJSON("savedAddresses", []);
    const list = Array.isArray(addresses) ? addresses : [];

    return (
      list.find((item) => item.default)?.id ||
      list[0]?.id ||
      ""
    );
  });

  const selectedAddress = addressList.find(
    (item) => String(item.id) === String(selectedAddressId)
  );

  // CHECKOUT STEPS
  const [activeSection, setActiveSection] = useState("address");
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);

  // ADDRESS FORM
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [address, setAddress] = useState({ ...emptyAddress });
  const [showInstructions, setShowInstructions] = useState(false);

  // PAYMENT
  const [payment, setPayment] = useState("");
  const [bank, setBank] = useState("");

  // COUPON
  const [showCoupon, setShowCoupon] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [couponMessage, setCouponMessage] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);

  // GENERAL
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const deliveryFee =
    checkoutTotal > 499 || checkoutTotal === 0 ? 0 : 40;

  const marketplaceFee = checkoutItems.length > 0 ? 5 : 0;
  const codFee = payment === "Cash on Delivery" ? 7 : 0;
  const discount = couponApplied ? 50 : 0;

  const orderTotal = Math.max(
    0,
    checkoutTotal +
      deliveryFee +
      marketplaceFee +
      codFee -
      discount
  );

  // ADDRESS INPUT
  const handleAddressChange = (e) => {
    setAddress((previous) => ({
      ...previous,
      [e.target.name]: e.target.value,
    }));
  };

  // OPEN NEW ADDRESS FORM
  const openNewAddressForm = () => {
    setAddress({ ...emptyAddress });
    setEditingAddressId(null);
    setError("");
    setShowAddressForm(true);
  };

  // EDIT ADDRESS
const editAddress = (item) => {
  setAddress({
    country: item.country || "India",
    name: item.name || "",
    mobile: item.mobile || "",
    pincode: item.pincode || "",
    house: item.house || "",
    area: item.area || "",
    landmark: item.landmark || "",
    city: item.city || "",
    state: item.state || "",
    isDefault: item.default || false,
    instructions: item.instructions || "",
  });

  setEditingAddressId(item.id);
  setError("");
  setShowInstructions(!!item.instructions);
  setShowAddressForm(true);
};
  // SAVE ADDRESS
  const saveAddress = (e) => {
  e.preventDefault();

  if (!/^[6-9]\d{9}$/.test(address.mobile)) {
    setError("Please enter a valid 10-digit mobile number.");
    return;
  }

  if (!/^\d{6}$/.test(address.pincode)) {
    setError("Please enter a valid 6-digit PIN code.");
    return;
  }

  let updatedAddresses;

  if (editingAddressId) {
    updatedAddresses = addressList.map((item) => {
      if (String(item.id) === String(editingAddressId)) {
        return {
          ...item,
          ...address,
          default: address.isDefault,
        };
      }

      return address.isDefault
        ? { ...item, default: false }
        : item;
    });
  } else {
    const newAddress = {
      ...address,
      id: `addr-${Date.now()}`,
      default: address.isDefault,
    };

    updatedAddresses = [
      ...addressList.map((item) =>
        address.isDefault
          ? { ...item, default: false }
          : item
      ),
      newAddress,
    ];

    setSelectedAddressId(newAddress.id);
  }

  if (address.isDefault && editingAddressId) {
    const updatedDefault = updatedAddresses.find(
      (item) => String(item.id) === String(editingAddressId)
    );

    if (updatedDefault) {
      setSelectedAddressId(updatedDefault.id);
    }
  }

  setAddressList(updatedAddresses);

  localStorage.setItem(
    "savedAddresses",
    JSON.stringify(updatedAddresses)
  );

  setShowAddressForm(false);
  setEditingAddressId(null);
  setShowInstructions(false);
  setError("");
};
  // CONFIRM DELIVERY ADDRESS
  const confirmAddress = () => {
    if (!selectedAddress) {
      setError("Please select a delivery address.");
      return;
    }

    setAddressConfirmed(true);
    setPaymentConfirmed(false);
    setActiveSection("payment");
    setError("");
  };

  // CHANGE ADDRESS
  const changeAddress = () => {
    setAddressConfirmed(false);
    setPaymentConfirmed(false);
    setActiveSection("address");
    setError("");
  };

  // PAYMENT SELECTION
  const handlePaymentChange = (value) => {
    setPayment(value);
    setBank("");
    setError("");
  };

  // CONFIRM PAYMENT
  const confirmPayment = () => {
    if (!payment) {
      setError("Please select a payment method.");
      return;
    }

    if (payment === "Net Banking" && !bank) {
      setError("Please select your bank.");
      return;
    }

    setPaymentConfirmed(true);
    setActiveSection("review");
    setError("");
  };

  // CHANGE PAYMENT
  const changePayment = () => {
    setPaymentConfirmed(false);
    setActiveSection("payment");
    setError("");
  };

  // COUPON
  const applyCoupon = () => {
    if (coupon.trim().toUpperCase() === "SAVE50") {
      setCouponApplied(true);
      setCouponMessage("Coupon applied successfully!");
    } else {
      setCouponApplied(false);
      setCouponMessage("Invalid coupon code.");
    }
  };

  // PLACE ORDER
  const placeOrder = () => {
    if (checkoutItems.length === 0) {
      navigate("/cart");
      return;
    }

    if (!selectedAddress || !addressConfirmed) {
      setActiveSection("address");
      setError("Please confirm your delivery address.");
      return;
    }

    if (!paymentConfirmed || !payment) {
      setActiveSection("payment");
      setError("Please select and confirm your payment method.");
      return;
    }

    if (payment === "Net Banking" && !bank) {
      setActiveSection("payment");
      setError("Please select your bank.");
      return;
    }

    const newOrder = {
      id: `ORD${Date.now()}`,
      date: new Date().toISOString(),
      items: checkoutItems.map((item) => ({ ...item })),
      address: { ...selectedAddress },
      payment,
      bank: payment === "Net Banking" ? bank : "",
      cartTotal: checkoutTotal,
      deliveryFee,
      marketplaceFee,
      codFee,
      discount,
      orderTotal,
      status: "Placed",
    };

    const existingOrders = readJSON("orders", []);
    const safeOrders = Array.isArray(existingOrders)
      ? existingOrders
      : [];

    localStorage.setItem(
      "orders",
      JSON.stringify([newOrder, ...safeOrders])
    );

    if (directCheckoutItem) {
      sessionStorage.removeItem("buyNowItem");
      localStorage.removeItem("checkoutItem");
    } else {
      clearCart();
    }

    setMessage(newOrder.id);
  };

  // SUCCESS PAGE
  if (message) {
    return (
      <div className="checkout-page">
        <header className="checkout-header">
          <button
            className="checkout-logo"
            onClick={() => navigate("/")}
          >
            amazon<span>.in</span>
          </button>

          <span className="checkout-secure">
            <i className="bi bi-lock-fill" />
            Secure checkout
          </span>
        </header>

        <div className="checkout-success">
          <div className="checkout-success-icon">✓</div>

          <h2>Order placed successfully!</h2>

          <p>Your order has been saved in this demo store.</p>

          <p>
            Order ID: <strong>{message}</strong>
          </p>

          <p className="checkout-demo-warning">
            This is a frontend demonstration. No real payment
            has been processed.
          </p>

          <button
            className="checkout-yellow-button"
            onClick={() => navigate("/orders")}
          >
            View Your Orders
          </button>

          <button
            className="checkout-secondary-button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">

      {/* HEADER */}
     {/* HEADER */}
<header className="checkout-header">

  <button
    className="checkout-logo"
    onClick={() => navigate("/")}
  >
    amazon<span>.in</span>
  </button>

  <div className="checkout-header-title">
    Secure checkout
    <i className="bi bi-chevron-down"></i>
  </div>

  <button
    className="checkout-cart-link"
    onClick={() => navigate("/cart")}
  >
    <i className="bi bi-cart-check"></i>
    <span>Cart</span>
  </button>

</header>

      {checkoutItems.length === 0 ? (
        <div className="checkout-empty">
          <h2>Your cart is empty</h2>

          <p>Add products before proceeding to checkout.</p>

          <button
            className="checkout-yellow-button"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <main className="checkout-layout">

          <div className="checkout-main-column">

            {/* STEP 1: DELIVERY ADDRESS */}
            <section className="checkout-panel address-panel">

              {addressConfirmed ? (
                <>
                  <div className="address-heading">
                    <div>
                      <h3>
                        Delivering to {selectedAddress?.name}
                      </h3>

                      <p>
                        {selectedAddress?.house},{" "}
                        {selectedAddress?.area},{" "}
                        {selectedAddress?.city},{" "}
                        {selectedAddress?.state},{" "}
                        {selectedAddress?.pincode}, India
                      </p>

                      <p>
                        Phone number: {selectedAddress?.mobile}
                      </p>
                    </div>

                    <button
                      className="checkout-link"
                      onClick={changeAddress}
                    >
                      Change
                    </button>
                  </div>

                  <p className="checkout-step-complete">
                    <i className="bi bi-check-circle-fill" />
                    Delivery address confirmed
                  </p>
                </>
              ) : (
                <>
                  <h3>Select a delivery address</h3>

                  <hr />

                  {addressList.length > 0 ? (
                    <>
                      <h4>
                        Delivery addresses ({addressList.length})
                      </h4>

                      {addressList.map((item) => (
                        <div
                          className={`address-selection-item ${
                            String(selectedAddressId) ===
                            String(item.id)
                              ? "address-active"
                              : ""
                          }`}
                          key={item.id}
                        >
                          <input
                            type="radio"
                            name="deliveryAddress"
                            checked={
                              String(selectedAddressId) ===
                              String(item.id)
                            }
                            onChange={() =>
                              setSelectedAddressId(item.id)
                            }
                          />

                          <div className="address-selection-details">
                            <strong>{item.name}</strong>

                            <p>
                              {item.house}, {item.area},{" "}
                              {item.city}, {item.state},{" "}
                              {item.pincode}, India
                            </p>

                            <p>
                              Phone number: {item.mobile}
                            </p>

                            <div className="address-action-links">
                              <button
                                type="button"
                                onClick={() => editAddress(item)}
                              >
                                Edit address
                              </button>

                              <span>|</span>

                              <button type="button">
                                Add delivery instructions
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <button
                        type="button"
                        className="checkout-link add-new-address-link"
                        onClick={openNewAddressForm}
                      >
                        Add a new delivery address
                      </button>
                    </>
                  ) : (
                    <div className="no-address-section">
                      <p>
                        You don't have any saved delivery addresses.
                      </p>

                      <button
                        className="checkout-yellow-button"
                        onClick={openNewAddressForm}
                      >
                        Add a new delivery address
                      </button>
                    </div>
                  )}

                  {addressList.length > 0 && (
                    <button
                      className="checkout-yellow-button deliver-address-button"
                      onClick={confirmAddress}
                    >
                      Deliver to this address
                    </button>
                  )}

                  {error && activeSection === "address" && (
                    <p className="checkout-error" role="alert">
                      {error}
                    </p>
                  )}
                </>
              )}
            </section>

            {/* GIFT CARD / COUPON */}
            {/* <section className="checkout-panel coupon-panel">
              <button
                className="coupon-toggle"
                onClick={() => setShowCoupon(!showCoupon)}
              >
                <span>
                  Use a gift card, voucher or promo code
                </span>

                <span>{showCoupon ? "Hide" : "Change"}</span>
              </button>

              {showCoupon && (
                <div className="coupon-row">
                  <input
                    type="text"
                    placeholder="Enter Code"
                    value={coupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setCouponMessage("");
                    }}
                  />

                  <button onClick={applyCoupon}>
                    Apply
                  </button>
                </div>
              )}

              {couponMessage && (
                <p
                  className={
                    couponApplied
                      ? "coupon-success"
                      : "coupon-error"
                  }
                >
                  {couponMessage}
                </p>
              )}
            </section> */}

            {/* STEP 2: PAYMENT */}
            <section
              className={`checkout-panel payment-panel ${
                !addressConfirmed ? "checkout-step-locked" : ""
              }`}
            >
              <div className="checkout-section-heading">
                <h3>Payment method</h3>

                {paymentConfirmed && (
                  <button
                    className="checkout-link"
                    onClick={changePayment}
                  >
                    Change
                  </button>
                )}
              </div>

              {!addressConfirmed ? (
                <p className="checkout-locked-message">
                  Select and confirm your delivery address to continue.
                </p>
              ) : paymentConfirmed ? (
                <div className="confirmed-payment">
                  <p>
                    <i className="bi bi-check-circle-fill" />
                    Selected payment method: <strong>{payment}</strong>
                  </p>

                  {payment === "Net Banking" && (
                    <p>Bank: {bank}</p>
                  )}
                </div>
              ) : (
                <>
                  <div className="payment-method-box">

                    <h4>Your available balance</h4>

                    <label className="payment-option balance-option">
                      <input type="radio" disabled />

                      <span>
                        Amazon Pay Balance{" "}
                        <strong>₹0.00</strong> Unavailable
                      </span>
                    </label>

                    <p className="payment-info">
                      <i className="bi bi-info-circle-fill" />
                      Insufficient balance.{" "}
                      <a href="#payment-options">
                        Add money &amp; get rewarded
                      </a>
                    </p>

                    <div className="payment-divider">
                      <h4>Another payment method</h4>
                    </div>

                    <div id="payment-options">

                      {/* CREDIT / DEBIT CARD */}
                      <label
                        className={`payment-option ${
                          payment === "Credit or Debit Card"
                            ? "payment-selected"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="Credit or Debit Card"
                          checked={payment === "Credit or Debit Card"}
                          onChange={(e) =>
                            handlePaymentChange(e.target.value)
                          }
                        />

                        <span className="payment-option-content">
                          <strong>Credit or debit card</strong>

                          <span className="card-logos">
                            <span className="visa-logo">VISA</span>
                            <span className="mastercard-logo">●●</span>
                            <span className="rupay-logo">RuPay</span>
                            <span className="card-logo-small">AMEX</span>
                          </span>
                        </span>
                      </label>

                      {/* NET BANKING */}
                      <label
                        className={`payment-option ${
                          payment === "Net Banking"
                            ? "payment-selected"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="Net Banking"
                          checked={payment === "Net Banking"}
                          onChange={(e) =>
                            handlePaymentChange(e.target.value)
                          }
                        />

                        <span className="payment-option-content">
                          <strong>Net Banking</strong>

                          {payment === "Net Banking" && (
                            <select
                              className="bank-select"
                              value={bank}
                              onChange={(e) =>
                                setBank(e.target.value)
                              }
                            >
                              <option value="">
                                Choose an Option
                              </option>

                              <option value="SBI">
                                State Bank of India
                              </option>

                              <option value="HDFC">
                                HDFC Bank
                              </option>

                              <option value="ICICI">
                                ICICI Bank
                              </option>

                              <option value="Axis">
                                Axis Bank
                              </option>

                              <option value="Federal">
                                Federal Bank
                              </option>
                            </select>
                          )}
                        </span>
                      </label>

                      {/* UPI */}
                      <label
                        className={`payment-option ${
                          payment === "UPI"
                            ? "payment-selected"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="UPI"
                          checked={payment === "UPI"}
                          onChange={(e) =>
                            handlePaymentChange(e.target.value)
                          }
                        />

                        <span className="payment-option-content">
                          <strong>
                            Scan and Pay with{" "}
                            <span className="upi-logo">UPI</span>
                          </strong>

                          {payment === "UPI" && (
                            <small>
                              You will need to scan the QR code on the
                              payment page to complete the payment.
                            </small>
                          )}
                        </span>
                      </label>

                      {/* EMI */}
                      <label className="payment-option disabled-payment">
                        <input type="radio" disabled />

                        <span>
                          EMI Unavailable{" "}
                          <a href="#payment-options">Why?</a>
                        </span>
                      </label>

                      {/* CASH ON DELIVERY */}
                      <label
                        className={`payment-option cod-option ${
                          payment === "Cash on Delivery"
                            ? "payment-selected"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value="Cash on Delivery"
                          checked={payment === "Cash on Delivery"}
                          onChange={(e) =>
                            handlePaymentChange(e.target.value)
                          }
                        />

                        <span className="payment-option-content">
                          <strong>
                            Cash on Delivery/Pay on Delivery
                          </strong>

                          <small>
                            Cash, UPI and Cards accepted.{" "}
                            <a href="#payment-options">Know more.</a>
                          </small>

                          <small>
                            <i className="bi bi-info-circle-fill" />
                            A convenience fee of ₹7 will apply.
                          </small>
                        </span>
                      </label>
                    </div>
                  </div>

                  <button
                    className="checkout-yellow-button payment-confirm-button"
                    onClick={confirmPayment}
                    disabled={
                      !payment ||
                      (payment === "Net Banking" && !bank)
                    }
                  >
                    Use this payment method
                  </button>

                  {error && activeSection === "payment" && (
                    <p className="checkout-error" role="alert">
                      {error}
                    </p>
                  )}
                </>
              )}
            </section>

            {/* STEP 3: REVIEW ITEMS */}
            <section
              className={`checkout-panel review-panel ${
                !paymentConfirmed ? "checkout-step-locked" : ""
              }`}
            >
              <div className="review-heading">
                <h3>Review items and shipping</h3>

                {paymentConfirmed && (
                  <button
                    className="checkout-link"
                    onClick={changePayment}
                  >
                    Change payment
                  </button>
                )}
              </div>

              {!paymentConfirmed ? (
                <p className="checkout-locked-message">
                  Confirm your payment method to review your order.
                </p>
              ) : (
                <>
                  <h4>
                    Arriving by{" "}
                    {new Date(
                      Date.now() + 6 * 86400000
                    ).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </h4>

                  {checkoutItems.map((item, index) => (
                    <article
                      className="checkout-product"
                      key={`${item.id || item.name}-${index}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                      />

                      <div className="checkout-product-details">
                        <strong>{item.title || item.name}</strong>

                        <p className="checkout-product-stock">
                          In Stock
                        </p>

                        <p>
                          Quantity: {item.quantity || 1}
                        </p>

                        <strong>
                          {money(
                            Number(item.price || 0) *
                              Number(item.quantity || 1)
                          )}
                        </strong>
                      </div>
                    </article>
                  ))}

                  <button
                    className="checkout-yellow-button place-order-button"
                    onClick={placeOrder}
                  >
                    Place your order
                  </button>

                  <p className="checkout-demo-note">
                    This is an Amazon Clone frontend demonstration.
                    No real payment will be processed.
                  </p>
                </>
              )}
            </section>

            {/* HELP */}
            <div className="checkout-help">
              <p>
                Need help? Check your order details before placing
                your order.
              </p>

              <p>
                When you place your order, you agree to the demo
                store's order terms. No real payment is processed.
              </p>

              <button onClick={() => navigate("/cart")}>
                Back to cart
              </button>
            </div>
          </div>

          {/* RIGHT ORDER SUMMARY */}
          <aside className="checkout-summary">

            {activeSection === "address" ? (
              <button
                className="checkout-yellow-button summary-place-order"
                disabled={!selectedAddress}
                onClick={confirmAddress}
              >
                Deliver to this address
              </button>
            ) : activeSection === "payment" ? (
              <button
                className="checkout-yellow-button summary-place-order"
                disabled={
                  !payment ||
                  (payment === "Net Banking" && !bank)
                }
                onClick={confirmPayment}
              >
                Use this payment method
              </button>
            ) : (
              <button
                className="checkout-yellow-button summary-place-order"
                onClick={placeOrder}
              >
                Place your order
              </button>
            )}

            <hr />

            <h3>Order Summary</h3>

            <div className="summary-row">
              <span>Items:</span>
              <span>{money(checkoutTotal)}</span>
            </div>

            <div className="summary-row">
              <span>Delivery:</span>
              <span>
                {deliveryFee === 0 ? "FREE" : money(deliveryFee)}
              </span>
            </div>

            <div className="summary-row">
              <span>Marketplace Fee:</span>
              <span>{money(marketplaceFee)}</span>
            </div>

            {codFee > 0 && (
              <div className="summary-row">
                <span>Cash/Pay on Delivery fee:</span>
                <span>{money(codFee)}</span>
              </div>
            )}

            {couponApplied && (
              <div className="summary-row summary-discount">
                <span>Coupon discount:</span>
                <span>-{money(discount)}</span>
              </div>
            )}

            <hr />

            <div className="summary-total">
              <strong>Order Total:</strong>
              <strong>{money(orderTotal)}</strong>
            </div>

            {payment && (
              <p className="summary-payment-info">
                Payment method: {payment}
              </p>
            )}

            <p className="summary-secure">
              <i className="bi bi-lock-fill" />
              Secure transaction
            </p>
          </aside>
        </main>
      )}

      {/* ADDRESS MODAL */}
    {/* AMAZON STYLE ADDRESS MODAL */}

{showAddressForm && (
  <div
    className="address-modal-overlay"
    onClick={() => setShowAddressForm(false)}
  >
    <div
      className="address-modal"
      onClick={(e) => e.stopPropagation()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="address-modal-title"
    >

      {/* MODAL HEADER */}

      <div className="address-modal-header">
        <h3 id="address-modal-title">
          {editingAddressId ? "Edit an address" : "Add an address"}
        </h3>

        <button
          type="button"
          className="address-modal-close"
          onClick={() => setShowAddressForm(false)}
        >
          ×
        </button>
      </div>

      {/* FORM */}

      <form
        className="address-form"
        onSubmit={saveAddress}
      >

        <h2>Enter a new delivery address</h2>

        {/* AUTOFILL INFO */}

        <div className="autofill-box">
          <span>
            Save time. Autofill your current location.
          </span>

          <button
            type="button"
            onClick={() =>
              setError("Please enter your delivery address manually.")
            }
          >
            Autofill
          </button>
        </div>

        {/* COUNTRY */}

        <label>
          Country/Region

          <select
            name="country"
            value={address.country}
            onChange={handleAddressChange}
            required
          >
            <option value="India">India</option>
          </select>
        </label>

        {/* FULL NAME */}

        <label>
          Full name (First and Last name)

          <input
            type="text"
            name="name"
            value={address.name}
            onChange={handleAddressChange}
            required
            placeholder=""
          />
        </label>

        {/* MOBILE */}

        <label>
          Mobile number

          <input
            type="tel"
            name="mobile"
            value={address.mobile}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                mobile: e.target.value.replace(/\D/g, "").slice(0, 10),
              }))
            }
            maxLength={10}
            inputMode="numeric"
            required
          />

          <small>May be used to assist delivery</small>
        </label>

        {/* PINCODE */}

        <label>
          Pincode

          <input
            type="text"
            name="pincode"
            value={address.pincode}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                pincode: e.target.value.replace(/\D/g, "").slice(0, 6),
              }))
            }
            maxLength={6}
            inputMode="numeric"
            placeholder="6 digits [0-9] PIN code"
            required
          />
        </label>

        {/* HOUSE */}

        <label>
          Flat, House no., Building, Company, Apartment

          <input
            type="text"
            name="house"
            value={address.house}
            onChange={handleAddressChange}
            required
          />
        </label>

        {/* AREA */}

        <label>
          Area, Street, Sector, Village

          <input
            type="text"
            name="area"
            value={address.area}
            onChange={handleAddressChange}
            required
          />
        </label>

        {/* LANDMARK */}

        <label>
          Landmark

          <input
            type="text"
            name="landmark"
            value={address.landmark}
            onChange={handleAddressChange}
            placeholder="E.g. near Apollo hospital"
          />
        </label>

        {/* CITY + STATE */}

        <div className="city-state-row">

          <label>
            Town/City

            <input
              type="text"
              name="city"
              value={address.city}
              onChange={handleAddressChange}
              required
            />
          </label>

          <label>
            State

            <select
              name="state"
              value={address.state}
              onChange={handleAddressChange}
              required
            >
              <option value="">Choose a state</option>
              {[
                "Andhra Pradesh",
                "Arunachal Pradesh",
                "Assam",
                "Bihar",
                "Chhattisgarh",
                "Goa",
                "Gujarat",
                "Haryana",
                "Himachal Pradesh",
                "Jharkhand",
                "Karnataka",
                "Kerala",
                "Madhya Pradesh",
                "Maharashtra",
                "Manipur",
                "Meghalaya",
                "Mizoram",
                "Nagaland",
                "Odisha",
                "Punjab",
                "Rajasthan",
                "Sikkim",
                "Tamil Nadu",
                "Telangana",
                "Tripura",
                "Uttar Pradesh",
                "Uttarakhand",
                "West Bengal",
              ].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </label>

        </div>

        {/* DEFAULT ADDRESS */}

        <label className="default-address-option">
          <input
            type="checkbox"
            checked={address.isDefault}
            onChange={(e) =>
              setAddress((prev) => ({
                ...prev,
                isDefault: e.target.checked,
              }))
            }
          />

          Make this my default address
        </label>

        {/* DELIVERY INSTRUCTIONS */}

        <div className="delivery-instructions">

          <span>Delivery instructions (optional)</span>

          <button
            type="button"
            className="instructions-toggle"
            onClick={() =>
              setShowInstructions(!showInstructions)
            }
          >
            Add preferences, notes, access codes and more
            <i
              className={`bi ${
                showInstructions
                  ? "bi-chevron-up"
                  : "bi-chevron-down"
              }`}
            />
          </button>

          {showInstructions && (
            <textarea
              name="instructions"
              value={address.instructions}
              onChange={handleAddressChange}
              placeholder="Add delivery instructions..."
              rows={3}
            />
          )}

        </div>

        {/* ERROR */}

        {error && (
          <p className="checkout-error" role="alert">
            {error}
          </p>
        )}

        {/* SUBMIT */}

        <div className="address-modal-actions">

          <button
            type="submit"
            className="use-address-button"
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
