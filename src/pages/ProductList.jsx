
import React, { useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { cards } from "../data/products";
import "./ProductList.css";
import { useCart } from "./CartContext";

function ProductList() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("default");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [search, setSearch] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [freeShippingOnly, setFreeShippingOnly] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  const currentCategory = cards.find(
    (card) => String(card.id) === String(id)
  );

  const products = useMemo(() => {
    return (currentCategory?.products || []).map((product, index) => ({
      ...product,
      id: `${id}-${product.id ?? index}`,
      price: product.price ?? null,
      originalPrice: product.originalPrice ?? null,
      rating: product.rating ?? null,
      reviewCount: product.reviewCount ?? null,
      bought: product.bought ?? "",
      features: product.features ?? "",
      delivery: product.delivery ?? "",
      discount: product.discount ?? null,
      freeShipping: product.freeShipping ?? false,
    }));
  }, [currentCategory, id]);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesSearch = (product.name || "")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPrice =
        product.price == null || product.price <= maxPrice;

      const matchesRating =
        minRating === 0 ||
        (product.rating != null && product.rating >= minRating);

      const matchesShipping =
        !freeShippingOnly || product.freeShipping === true;

      return (
        matchesSearch &&
        matchesPrice &&
        matchesRating &&
        matchesShipping
      );
    });

    if (sortBy === "low") {
      result.sort((a, b) => {
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return a.price - b.price;
      });
    }

    if (sortBy === "high") {
      result.sort((a, b) => {
        if (a.price == null) return 1;
        if (b.price == null) return -1;
        return b.price - a.price;
      });
    }

    if (sortBy === "rating") {
      result.sort(
        (a, b) => (b.rating ?? -1) - (a.rating ?? -1)
      );
    }

    return result;
  }, [
    products,
    search,
    maxPrice,
    minRating,
    sortBy,
    freeShippingOnly,
  ]);

  const toggleCompare = (productId) => {
    setSelectedProducts((previous) => {
      if (previous.includes(productId)) {
        return previous.filter((item) => item !== productId);
      }

      if (previous.length >= 3) {
        return previous;
      }

      return [...previous, productId];
    });
  };

  const clearFilters = () => {
    setMaxPrice(50000);
    setMinRating(0);
    setSortBy("default");
    setSearch("");
    setFreeShippingOnly(false);
  };

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  const handleAddToCart = (product) => {
    addToCart(product);
    setCartMessage(`${product.name} added to cart!`);

   
    window.setTimeout(() => {
      setCartMessage("");
    }, 2000);
  };

  const handleCompare = () => {
    if (selectedProducts.length < 2) return;

    const selected = products.filter((product) =>
      selectedProducts.includes(product.id)
    );

    sessionStorage.setItem(
      "compareProducts",
      JSON.stringify(selected)
    );

    navigate("/compare");
  };

  if (!currentCategory) {
    return (
      <div className="pl-not-found">
        <h2>Category not found</h2>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="amazon-product-page">
    
      <nav className="pl-category-nav">
        <strong>Shop by Category</strong>

        {cards.slice(0, 8).map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={
              String(category.id) === String(id) ? "active" : ""
            }
          >
            {category.title}
          </Link>
        ))}
      </nav>

      <div className="pl-results-bar">
        <span>{filteredProducts.length} results</span>

        <label>
          Sort by:{" "}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Featured</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
            <option value="rating">Customer Rating</option>
          </select>
        </label>
      </div>

      <div className="pl-main-layout">
       
        <aside className="pl-sidebar">
          <h4>Deals &amp; Discounts</h4>
          <p>Explore products</p>
          <p>Special offers</p>

          <hr />

          <h4>Eligible for Free Shipping</h4>

          <label className="pl-filter-option">
            <input
              type="checkbox"
              checked={freeShippingOnly}
              onChange={(e) =>
                setFreeShippingOnly(e.target.checked)
              }
            />
            Free Shipping
          </label>

          <hr />

          <h4>Search Products</h4>

          <input
            className="pl-search"
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <hr />

          <h4>Price</h4>

          <label>
            Maximum: ₹{maxPrice.toLocaleString("en-IN")}
          </label>

          <input
            className="pl-price-range"
            type="range"
            min="100"
            max="50000"
            step="500"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />

          <hr />

          <h4>Customer Reviews</h4>

          {[4, 3, 2, 1].map((rating) => (
            <label className="pl-filter-option" key={rating}>
              <input
                type="radio"
                name="rating"
                checked={minRating === rating}
                onChange={() => setMinRating(rating)}
              />

              <span className="pl-stars">
                {"★".repeat(rating)}
                {"☆".repeat(5 - rating)}
              </span>

              {" "}&amp; Up
            </label>
          ))}

          <button
            type="button"
            className="pl-clear-button"
            onClick={clearFilters}
          >
            Clear Filters
          </button>
        </aside>

        <main className="pl-product-results">
          <h2 className="pl-heading">{currentCategory.title}</h2>
          <h3 className="pl-results-heading">Results</h3>

          <div className="pl-product-grid">
            {filteredProducts.map((product) => (
              <article className="pl-product-card" key={product.id}>
                <label className="pl-compare">
                  <input
                    type="checkbox"
                    checked={selectedProducts.includes(product.id)}
                    onChange={() => toggleCompare(product.id)}
                    disabled={
                      selectedProducts.length >= 3 &&
                      !selectedProducts.includes(product.id)
                    }
                  />
                  Compare
                </label>

                <div className="pl-image-container">
                  <img
                    src={product.image}
                    alt={product.name}
                    onError={(e) => {
                      e.currentTarget.style.visibility = "hidden";
                    }}
                  />
                </div>

                <h4 className="pl-product-name">{product.name}</h4>

             
                <div className="pl-rating">
                  {product.rating != null ? (
                    <>
                      <span className="pl-stars">
                        {"★".repeat(
                          Math.max(
                            0,
                            Math.min(5, Math.round(product.rating))
                          )
                        )}
                      </span>{" "}
                      {product.rating}/5

                      {product.reviewCount != null && (
                        <span>
                          {" "}(
                          {product.reviewCount.toLocaleString("en-IN")})
                        </span>
                      )}
                    </>
                  ) : (
                    <span className="pl-unavailable">
                      No ratings yet
                    </span>
                  )}
                </div>

                {product.bought && (
                  <p className="pl-bought">{product.bought}</p>
                )}

           
                <div className="pl-price">
                  {product.price != null ? (
                    formatPrice(product.price)
                  ) : (
                    <span className="pl-unavailable">
                      Price not added
                    </span>
                  )}
                </div>

                
                {product.originalPrice != null && (
                  <p className="pl-original-price">
                    M.R.P.:{" "}
                    <s>{formatPrice(product.originalPrice)}</s>

                    {product.discount != null && (
                      <span className="pl-discount">
                        {" "}{product.discount}% off
                      </span>
                    )}
                  </p>
                )}

                {product.features && (
                  <p className="pl-features">{product.features}</p>
                )}

                <p className="pl-delivery">
                  {product.delivery || "Delivery details not added"}
                </p>

                <button
                  type="button"
                  className="pl-add-cart"
                  onClick={() => handleAddToCart(product)}
                >
                  Add to Cart
                </button>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="pl-empty">
              No products found. Try changing your filters.
            </p>
          )}
        </main>
      </div>

    
      {cartMessage && (
        <div className="pl-cart-notice" role="status">
          {cartMessage}
        </div>
      )}

   
      {selectedProducts.length > 0 && (
        <div className="pl-compare-bar">
          <span>
            {selectedProducts.length} of 3 products selected
          </span>

          <button
            type="button"
            disabled={selectedProducts.length < 2}
            onClick={handleCompare}
          >
            Compare Products
          </button>

          <button
            type="button"
            onClick={() => setSelectedProducts([])}
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default ProductList;
