
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Wishlist.css";
import { useCart } from "./CartContext";
import { productPath } from "../data/catalog";
import ProductImage from "../components/ProductImage";
import { readJson } from "../utils/session";

function Wishlist() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState("lists");
  const [showForm, setShowForm] = useState(false);
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState(() => readJson(localStorage, "wishlists", []));
  const [savedItems, setSavedItems] = useState(() =>
    readJson(localStorage, "wishlistItems", [])
  );

  useEffect(() => {
    const syncItems = () => {
      setSavedItems(readJson(localStorage, "wishlistItems", []));
      setLists(readJson(localStorage, "wishlists", []));
    };

    window.addEventListener("wishlistUpdated", syncItems);
    window.addEventListener("storage", syncItems);
    return () => {
      window.removeEventListener("wishlistUpdated", syncItems);
      window.removeEventListener("storage", syncItems);
    };
  }, []);
  const [message, setMessage] = useState("");

  const createList = (e) => {
    e.preventDefault();

    const name = listName.trim();

    if (!name) {
      setMessage("Please enter a list name.");
      return;
    }

    setLists((previous) => {
      const next = [...previous, name];
      localStorage.setItem("wishlists", JSON.stringify(next));
      return next;
    });
    setListName("");
    setShowForm(false);
    setActiveTab("lists");
    setMessage(`"${name}" created successfully!`);
  };

  return (
    <div className="wishlist-page">
      <main className="wishlist-main">
        <div className="wishlist-tabs">
          <button
            className={activeTab === "lists" ? "active" : ""}
            onClick={() => setActiveTab("lists")}
          >
            Your Lists
          </button>

          <button
            className={activeTab === "friends" ? "active" : ""}
            onClick={() => setActiveTab("friends")}
          >
            Your Friends
          </button>
        </div>

        {activeTab === "lists" ? (
          <>
            <section className="wishlist-banner">
              <div className="wishlist-banner-overlay">
                <h1>Lists</h1>
                <p>for all your shopping needs</p>

                <button onClick={() => setShowForm(true)}>
                  Create a List
                </button>
              </div>
            </section>

            {message && (
              <p className="wishlist-message" role="status">
                {message}
                <button onClick={() => setMessage("")}>×</button>
              </p>
            )}

            {showForm && (
              <div className="wishlist-modal">
                <form onSubmit={createList}>
                  <h2>Create a List</h2>

                  <label htmlFor="wishlist-name">List name</label>

                  <input
                    id="wishlist-name"
                    type="text"
                    placeholder="Enter your list name"
                    value={listName}
                    onChange={(e) => setListName(e.target.value)}
                    autoFocus
                  />

                  <div className="wishlist-form-actions">
                    <button
                      type="button"
                      className="wishlist-cancel"
                      onClick={() => {
                        setShowForm(false);
                        setMessage("");
                      }}
                    >
                      Cancel
                    </button>

                    <button type="submit" className="wishlist-create">
                      Create List
                    </button>
                  </div>
                </form>
              </div>
            )}

            <section className="wishlist-benefits">
              <div className="wishlist-benefit">
                <i className="bi bi-journal-check"></i>
                <div>
                  <h3>Save time</h3>
                  <p>
                    Add your items and ideas in one convenient location.
                  </p>
                </div>
              </div>

              <div className="wishlist-benefit">
                <i className="bi bi-gift"></i>
                <div>
                  <h3>Give great gifts</h3>
                  <p>
                    Remember your friends' lists and share yours.
                  </p>
                </div>
              </div>

              <div className="wishlist-benefit">
                <i className="bi bi-bar-chart"></i>
                <div>
                  <h3>Check price changes</h3>
                  <p>
                    Check when items from your lists drop in price.
                  </p>
                </div>
              </div>
            </section>

            <section className="wishlist-saved-lists">
              {lists.map((list, index) => (
                <p key={`${list}-${index}`}>{list}</p>
              ))}
            </section>

            {savedItems.length > 0 && (
              <section className="wishlist-items">
                <h2>Saved items</h2>
                <div className="wishlist-item-grid">
                  {savedItems.map((item) => (
                    <div className="wishlist-saved-card" key={item.id}>
                      <Link to={productPath(item.id)}>
                        <ProductImage src={item.image} alt={item.name} />
                        <span>{item.name}</span>
                        <strong>₹{Number(item.price || 0).toLocaleString("en-IN")}</strong>
                      </Link>
                      <div className="wishlist-saved-actions">
                        <button
                          type="button"
                          onClick={() => {
                            addToCart(item);
                            setMessage(`${item.name} added to cart`);
                          }}
                        >
                          Add to Cart
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            const next = savedItems.filter(
                              (saved) => String(saved.id) !== String(item.id)
                            );
                            setSavedItems(next);
                            localStorage.setItem("wishlistItems", JSON.stringify(next));
                          }}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="wishlist-friends">
            <h1>Your Friends</h1>
            <p>
              Your friends' shared lists will appear here when available.
            </p>
          </section>
        )}
      </main>

      <section className="wishlist-history">
        <h2>
          Your browsing history{" "}
          <Link to="/">View or edit your browsing history</Link>
        </h2>

        <div className="wishlist-history-items">
          <Link to="/" title="Continue shopping">
            <i className="bi bi-bag"></i>
          </Link>

          <Link to="/" title="Browse products">
            <i className="bi bi-box-seam"></i>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Wishlist;
