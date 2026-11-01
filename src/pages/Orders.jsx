
import React, { useState } from "react";
import { Link,useNavigate  } from "react-router-dom";
import "./Orders.css";

function Orders() {
const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Orders");
  const [dateFilter, setDateFilter] = useState("last30");
  const [search, setSearch] = useState("");

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
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <input
              type="search"
              placeholder="⌕  Search all orders"
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
  onClick={() => {
    setActiveTab(tab);
    
  }}
>
  {tab}
</button>
          ))}
        </div>


        <div className="orders-filter">
          <strong>0 orders placed in</strong>

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

    
        <div className="orders-empty">
          {search.trim() ? (
            <p>
              No orders found matching "{search}".
            </p>
          ) : activeTab === "Orders" ? (
            <>
              <p>
                Looks like you have not placed an order in the last 30 days.
              </p>
              <Link to="/">View products and start shopping</Link>
            </>
          ) : activeTab === "Buy Again" ? (
            <p>You have no previously purchased items to buy again.</p>
          ) : (
            <p>You have no orders that are yet to be shipped.</p>
          )}
        </div>

     
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
