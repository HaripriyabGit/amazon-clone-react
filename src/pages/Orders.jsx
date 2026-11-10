
import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Orders.css";
import { useCart } from "./CartContext";
import { productPath } from "../data/catalog";
import { readJson } from "../utils/session";

function Orders() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("Orders");
  const [dateFilter, setDateFilter] = useState("last30");
  const [search, setSearch] = useState("");

  // Load orders from localStorage
  const [orders, setOrders] = useState(() =>
    readJson(localStorage, "orders", [])
  );

  // Cancel order
  const cancelOrder = (orderId) => {
    const confirmCancel = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmCancel) return;

    const updatedOrders = orders.map((order) =>
      order.id === orderId
        ? { ...order, status: "Cancelled" }
        : order
    );

    // Update state
    setOrders(updatedOrders);

    // Update localStorage
    localStorage.setItem(
      "orders",
      JSON.stringify(updatedOrders)
    );

    alert("Your order has been cancelled successfully!");
  };

  const filteredOrders = orders.filter((order) => {
    const orderDate = new Date(order.date);
    const today = new Date();

    // Search filter
    const matchesSearch =
      order.id.toLowerCase().includes(search.toLowerCase()) ||
      order.items.some((item) =>
        (item.title || item.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

    // Date filter
    let matchesDate = true;

    if (dateFilter === "last30") {
      const last30Days = new Date();
      last30Days.setDate(today.getDate() - 30);
      matchesDate = orderDate >= last30Days && orderDate <= today;
    } else if (dateFilter === "last3") {
      const last3Months = new Date();
      last3Months.setMonth(today.getMonth() - 3);
      matchesDate = orderDate >= last3Months && orderDate <= today;
    } else if (dateFilter === "2026" || dateFilter === "2025") {
      matchesDate =
        orderDate.getFullYear() === Number(dateFilter);
    }

    // Tab filter
    let matchesTab = true;

    if (activeTab === "Not Yet Shipped") {
      matchesTab =
        order.status !== "Shipped" &&
        order.status !== "Delivered" &&
        order.status !== "Cancelled";
    }

    return matchesSearch && matchesDate && matchesTab;
  });

  const buyAgainItems = useMemo(() => {
    const seen = new Set();
    return orders
      .filter((order) => order.status !== "Cancelled")
      .flatMap((order) => order.items || [])
      .filter((item) => {
        const key = String(item.id);
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
  }, [orders]);

  const tabs = ["Orders", "Buy Again", "Not Yet Shipped"];

  return (
    <div className="orders-page">
      <div className="orders-container">

        <div className="orders-breadcrumb">
          <Link to="/account">Your Account</Link>
          <span>›</span>
          <span>Your Orders</span>
        </div>

        <div className="orders-header">
          <h1>Your Orders</h1>

          <form
            className="orders-search"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="search"
              placeholder="⌕ Search all orders"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button type="submit">Search Orders</button>
          </form>
        </div>

        <div className="orders-tabs">
          {tabs.map((tab) => (
            <button
              type="button"
              key={tab}
              className={activeTab === tab ? "active" : ""}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="orders-filter">
          <strong>
            {filteredOrders.length} orders placed in
          </strong>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            aria-label="Filter orders by date"
          >
            <option value="last30">last 30 days</option>
            <option value="last3">past 3 months</option>
            <option value="2026">2026</option>
            <option value="2025">2025</option>
            <option value="all">all orders</option>
          </select>
        </div>

        {activeTab === "Buy Again" ? (
          buyAgainItems.length === 0 ? (
            <div className="orders-empty">
              <p>You have no previously purchased items to buy again.</p>
              <Link to="/">View products and start shopping</Link>
            </div>
          ) : (
            <div className="orders-list">
              {buyAgainItems.map((item) => (
                <div className="order-card" key={item.id}>
                  <div className="order-card-body">
                    <div className="ordered-product">
                      <img src={item.image} alt={item.name || item.title} />
                      <div className="ordered-product-details">
                        <Link to={productPath(item.id)}>
                          <strong>{item.name || item.title}</strong>
                        </Link>
                        <p>
                          ₹{Number(item.price || 0).toLocaleString("en-IN")}
                        </p>
                        <button
                          type="button"
                          className="buy-again-button"
                          onClick={() => addToCart({ ...item, quantity: 1 })}
                        >
                          Buy again
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : filteredOrders.length === 0 ? (
          <div className="orders-empty">
            {search.trim() ? (
              <p>No orders found matching "{search}".</p>
            ) : (
              <>
                <p>
                  {activeTab === "Not Yet Shipped"
                    ? "You have no orders that are yet to be shipped."
                    : activeTab === "Buy Again"
                    ? "You have no previously purchased items to buy again."
                    : "Looks like you have not placed an order in this period."}
                </p>

                <Link to="/">
                  View products and start shopping
                </Link>
              </>
            )}
          </div>
        ) : (
          <div className="orders-list">
            {filteredOrders.map((order) => (
              <div className="order-card" key={order.id}>

                <div className="order-card-header">
                  <div>
                    <strong>ORDER PLACED</strong>
                    <p>
                      {new Date(order.date).toLocaleDateString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <strong>ORDER TOTAL</strong>
                    <p>
                      ₹{Number(order.orderTotal).toLocaleString("en-IN")}
                    </p>
                  </div>

                  <div>
                    <strong>ORDER ID</strong>
                    <p>{order.id}</p>
                  </div>
                </div>

                <div className="order-card-body">

                  <h3 className={
                    order.status === "Cancelled"
                      ? "cancelled-status"
                      : ""
                  }>
                    Order Status: {order.status}
                  </h3>

                  {order.items.map((item, index) => (
                    <div
                      className="ordered-product"
                      key={`${order.id}-${item.id}-${index}`}
                    >
                      <img
                        src={item.image}
                        alt={item.title || item.name}
                      />

                      <div className="ordered-product-details">
                        <strong>
                          {item.title || item.name}
                        </strong>

                        <p>Quantity: {item.quantity || 1}</p>

                        <p>
                          Price: ₹
                          {(
                            Number(item.price) *
                            Number(item.quantity || 1)
                          ).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  ))}

                  <div className="order-delivery-details">
                    <strong>Delivery Address</strong>

                    <p>{order.address?.name}</p>
                    <p>{order.address?.mobile}</p>

                    <p>
                      {order.address.house}, {order.address.area}
                    </p>

                    <p>
                      {order.address.city}, {order.address.state} -{" "}
                      {order.address.pincode}
                    </p>

                    <p>Payment: {order.payment}</p>
                  </div>

                  {/* Cancel Order Button */}
                  {order.status !== "Cancelled" &&
                    order.status !== "Shipped" &&
                    order.status !== "Delivered" && (
                      <button
                        type="button"
                        className="cancel-order-button"
                        onClick={() => cancelOrder(order.id)}
                      >
                        Cancel Order
                      </button>
                    )}

                  {order.status === "Cancelled" && (
                    <p className="order-cancelled-message">
                      This order has been cancelled.
                    </p>
                  )}

                </div>
              </div>
            ))}
          </div>
        )}

        <section className="orders-history">
          <h2>
            Your browsing history{" "}
            <Link to="/">View or edit your browsing history</Link>
          </h2>

          <div className="orders-history-items">
            <Link to="/" title="Continue shopping">
              <div className="history-placeholder">
                <i className="bi bi-bag"></i>
              </div>
            </Link>

            <Link to="/" title="Browse products">
              <div className="history-placeholder">
                <i className="bi bi-box-seam"></i>
              </div>
            </Link>
          </div>
        </section>

      </div>
    </div>
  );
}

export default Orders;
