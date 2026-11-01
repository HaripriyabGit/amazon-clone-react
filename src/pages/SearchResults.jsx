
import React from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import "./SearchResults.css";

const products = [
  {
    id: "echo-spot",
    name: "Echo Spot with Alexa",
    image: "/images/echo1.jpg",
    category: "Amazon Devices",
  },
  {
    id: "echo-dot-max",
    name: "Echo Dot Max with Alexa",
    image: "/images/echo2.jpg",
    category: "Amazon Devices",
  },
  {
    id: "echo-studio",
    name: "Echo Studio with Alexa",
    image: "/images/echo3.jpg",
    category: "Amazon Devices",
  },
  {
    id: "echo-dot",
    name: "Echo Dot with Alexa",
    image: "/images/echo4.jpg",
    category: "Amazon Devices",
  },
];

function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const query = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All Categories";

  const results = products.filter((product) => {
    const matchesQuery =
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.id.toLowerCase().includes(query.toLowerCase());

    const matchesCategory =
      category === "All Categories" ||
      category === "Alexa Skills" ||
      category === "Amazon Devices";

    return matchesQuery && matchesCategory;
  });

  return (
    <div className="search-results-page">
      <h2>Search results</h2>

      <p>
        Results for <strong>"{query}"</strong>
      </p>

      <p className="results-count">
        {results.length} results
      </p>

      {results.length > 0 ? (
        <div className="search-product-grid">
          {results.map((product) => (
            <div
              className="search-product-card"
              key={product.id}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <img src={product.image} alt={product.name} />

              <h3>{product.name}</h3>

              <p>{product.category}</p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                     navigate(`/product/${encodeURIComponent(product.id)}`, {
        state: { product },
      });
                }}
              >
                View Product
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-results">
          <h3>No products found</h3>
          <p>Try searching with a different product name.</p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;
