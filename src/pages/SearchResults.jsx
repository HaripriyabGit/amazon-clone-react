
import React, { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./SearchResults.css";
import { productPath, searchProducts } from "../data/catalog";
import { useCart } from "./CartContext";
import ProductImage from "../components/ProductImage";

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [sortBy, setSortBy] = useState("featured");
  const [notice, setNotice] = useState("");
  const [maxPrice, setMaxPrice] = useState(80000);
  const [minRating, setMinRating] = useState(0);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);

  const query = searchParams.get("q") || "";

  const category = (searchParams.get("category") || "All Categories")
    .replace(/\s+/g, " ")
    .trim();

  const results = useMemo(() => {
    return searchProducts({ query, category, sortBy }).filter((product) => {
      const matchesPrice = Number(product.price) <= maxPrice;
      const matchesRating =
        minRating === 0 || Number(product.rating) >= minRating;
      const matchesShipping =
        !freeShippingOnly || product.freeShipping;

      return matchesPrice && matchesRating && matchesShipping;
    });
  }, [query, category, sortBy, maxPrice, minRating, freeShippingOnly]);

  const openProduct = (product) => {
    navigate(productPath(product.id), {
      state: { product },
    });
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotice(`${product.name} added to cart`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const clearFilters = () => {
    setMaxPrice(80000);
    setMinRating(0);
    setFreeShippingOnly(false);
    setSortBy("featured");
  };

  return (
    <div className="search-results-page">

      {/* TOP TOOLBAR */}
      <div className="search-toolbar">
        <div>
          <h2>Results</h2>

          <p>
            {query ? (
              <>
                Results for <strong>"{query}"</strong>
              </>
            ) : (
              "Browse products"
            )}

            {category !== "All Categories" && (
              <> in <strong>{category}</strong></>
            )}
          </p>

          <p className="results-count">
            {results.length} results
          </p>
        </div>

        <label className="search-sort">
          Sort by:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="featured">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </label>
      </div>

      {notice && (
        <p className="search-notice">{notice}</p>
      )}

      <div className="search-layout">

        {/* LEFT FILTER SIDEBAR */}
        <aside className="search-filters">

          <h3>Filters</h3>

          <div className="filter-group">
            <h4>Department</h4>

            <p>Electronics</p>
            <p>Computers & Accessories</p>
            <p>Home & Kitchen</p>
            <p>Mobiles & Accessories</p>
          </div>

          <div className="filter-group">
            <h4>Customer Reviews</h4>

            {[4, 3, 2, 1].map((rating) => (
              <label className="search-check" key={rating}>
                <input
                  type="radio"
                  name="search-rating"
                  checked={minRating === rating}
                  onChange={() => setMinRating(rating)}
                />

                <span className="filter-stars">
                  {"★".repeat(rating)}
                  {"☆".repeat(5 - rating)}
                </span>

                <span>& Up</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h4>Price</h4>

            <p>
              Under ₹{maxPrice.toLocaleString("en-IN")}
            </p>

            <input
              className="price-range"
              type="range"
              min="0"
              max="80000"
              step="500"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />

            <div className="price-range-labels">
              <span>₹0</span>
              <span>₹80,000+</span>
            </div>
          </div>

          <div className="filter-group">
            <h4>Delivery</h4>

            <label className="search-check">
              <input
                type="checkbox"
                checked={freeShippingOnly}
                onChange={(e) =>
                  setFreeShippingOnly(e.target.checked)
                }
              />

              Free shipping
            </label>
          </div>

          <button
            type="button"
            className="search-clear"
            onClick={clearFilters}
          >
            Clear filters
          </button>

        </aside>

        {/* RIGHT PRODUCT LIST */}
        <div className="search-results-content">

          {results.length > 0 ? (
            <div className="search-product-list">

              {results.map((product) => (
                <article
                  className="search-product-row"
                  key={product.id}
                >

                  {/* PRODUCT IMAGE */}
                  <button
                    type="button"
                    className="search-image-area"
                    onClick={() => openProduct(product)}
                  >
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                    />
                  </button>

                  {/* PRODUCT DETAILS */}
                  <div className="search-product-details">

                    <button
                      type="button"
                      className="search-product-title"
                      onClick={() => openProduct(product)}
                    >
                      {product.name}
                    </button>

                    <p className="search-brand">
                      {product.brand || "Amazon"}
                      {product.department
                        ? ` · ${product.department}`
                        : ""}
                    </p>

                    <div className="search-rating">
                      <span>
                        {"★".repeat(
                          Math.max(
                            0,
                            Math.min(
                              5,
                              Math.round(Number(product.rating) || 0)
                            )
                          )
                        )}
                        {"☆".repeat(
                          5 -
                            Math.max(
                              0,
                              Math.min(
                                5,
                                Math.round(Number(product.rating) || 0)
                              )
                            )
                        )}
                      </span>

                      <strong>
                        {Number(product.rating || 0).toFixed(1)}
                      </strong>
                    </div>

                    <div className="search-price">
                      <span className="search-rupee">₹</span>
                      {Number(product.price || 0).toLocaleString("en-IN")}
                    </div>

                    {product.originalPrice && (
                      <p className="search-original-price">
                        M.R.P.:{" "}
                        <del>
                          ₹{Number(product.originalPrice).toLocaleString("en-IN")}
                        </del>

                        {product.discount > 0 && (
                          <span> ({product.discount}% off)</span>
                        )}
                      </p>
                    )}

                    <p className="search-delivery">
                      FREE delivery on eligible orders
                    </p>

                    {product.freeShipping && (
                      <p className="search-free-delivery">
                        <i className="bi bi-truck" />
                        FREE Delivery
                      </p>
                    )}

                    <p className="search-stock">
                      In Stock
                    </p>

                    <div className="search-actions">

                      {/* <button
                        type="button"
                        className="search-view-button"
                        onClick={() => openProduct(product)}
                      >
                        View Details
                      </button> */}

                      <button
                        type="button"
                        className="search-add-button"
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </button>

                    </div>

                  </div>

                </article>
              ))}

            </div>
          ) : (
            <div className="no-results">
              <h3>No products found</h3>
              <p>
                Try another name, brand, or category.
              </p>

              <button
                className="search-clear"
                onClick={clearFilters}
              >
                Clear filters
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

export default SearchResults;
