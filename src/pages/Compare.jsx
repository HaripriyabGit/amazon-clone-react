
import React from "react";
import { useNavigate } from "react-router-dom";
import { cards } from "../data/products";
import "./Compare.css";
import { useCart } from "./CartContext";

function Compare() {
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const selectedProducts = JSON.parse(
    sessionStorage.getItem("compareProducts") || "[]"
  );

  const allProducts = cards.flatMap((category) =>
    category.products.map((product) => ({
      ...product,
      category: category.title,
    }))
  );

  const products = selectedProducts
    .map((selected) => {
      // Use the complete product object if available
      if (selected && selected.name) {
        return selected;
      }

      const selectedId =
        typeof selected === "object" ? selected.id : selected;

      return allProducts.find(
        (product) => String(product.id) === String(selectedId)
      );
    })
    .filter(Boolean);

  // Weighted Product Scoring System
  const getProductScores = (productList) => {
    const validProducts = productList.filter(
      (product) =>
        typeof product.price === "number" &&
        product.price > 0 &&
        typeof product.rating === "number" &&
        product.rating >= 0 &&
        product.rating <= 5 &&
        typeof product.reviewCount === "number" &&
        product.reviewCount >= 0 &&
        typeof product.discount === "number" &&
        product.discount >= 0 &&
        product.discount <= 100
    );

    if (validProducts.length === 0) {
      return [];
    }

    const prices = validProducts.map((p) => p.price);
    const reviews = validProducts.map((p) => p.reviewCount);
    const discounts = validProducts.map((p) => p.discount);

    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const maxReviews = Math.max(...reviews);
    const maxDiscount = Math.max(...discounts);

    return validProducts
      .map((product) => {
        // Rating: 40%
        const ratingScore = (product.rating / 5) * 100;

        // Price: 30% (lower price gets a higher score)
        const priceScore =
          maxPrice === minPrice
            ? 100
            : ((maxPrice - product.price) /
                (maxPrice - minPrice)) *
              100;

        // Reviews: 20%
        const reviewScore =
          maxReviews === 0
            ? 0
            : (product.reviewCount / maxReviews) * 100;

        // Discount: 10%
        const discountScore =
          maxDiscount === 0
            ? 0
            : (product.discount / maxDiscount) * 100;

        const finalScore =
          ratingScore * 0.4 +
          priceScore * 0.3 +
          reviewScore * 0.2 +
          discountScore * 0.1;

        return {
          ...product,
          ratingScore: Number(ratingScore.toFixed(2)),
          priceScore: Number(priceScore.toFixed(2)),
          reviewScore: Number(reviewScore.toFixed(2)),
          discountScore: Number(discountScore.toFixed(2)),
          finalScore: Number(finalScore.toFixed(2)),
        };
      })
      .sort((a, b) => b.finalScore - a.finalScore);
  };

  const rankedProducts = getProductScores(products);
  const bestProduct = rankedProducts[0] ?? null;

  const getRankedProduct = (product) =>
    rankedProducts.find((item) => item.id === product.id);

  const removeProduct = (id) => {
    const updatedProducts = selectedProducts.filter(
      (product) => String(product.id) !== String(id)
    );

    sessionStorage.setItem(
      "compareProducts",
      JSON.stringify(updatedProducts)
    );

    window.location.reload();
  };

  const formatPrice = (price) =>
    typeof price === "number"
      ? `₹${price.toLocaleString("en-IN")}`
      : "Price unavailable";

  if (products.length === 0) {
    return (
      <div className="compare-empty">
        <h2>No products selected for comparison</h2>
        <p>Choose products from the product listing page.</p>
        <button onClick={() => navigate(-1)}>
          Back to Products
        </button>
      </div>
    );
  }

  return (

    <div className="compare-page">
      <h2>Compare Products</h2>
      <div className="compare-table-wrapper">
        <table className="compare-table">
          <thead>
            <tr>
              <th>Product Details</th>

              {products.map((product) => {
                const rankedProduct = getRankedProduct(product);

                return (
                  <th key={product.id}>
                    <button
                      className="compare-remove"
                      onClick={() => removeProduct(product.id)}
                    >
                      Remove ×
                    </button>

                    <img
                      className="compare-product-image"
                      src={product.image}
                      alt={product.name}
                    />

                    <p className="compare-product-name">
                      {product.name}
                    </p>

                    {rankedProduct &&
                      bestProduct?.id === rankedProduct.id && (
                        <strong className="best-choice-badge">
                          🏆 Best Choice
                        </strong>
                      )}
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody>
            {/* Overall Score */}
            <tr>
              <td>
                <strong>Overall Score</strong>
              </td>

              {products.map((product) => {
                const rankedProduct = getRankedProduct(product);

                return (
                  <td key={product.id}>
                    {rankedProduct
                      ? `${rankedProduct.finalScore}/100`
                      : "Unavailable"}
                  </td>
                );
              })}
            </tr>

            {/* Individual Scores */}
            <tr>
              <td>Rating Score (40%)</td>
              {products.map((product) => (
                <td key={product.id}>
                  {getRankedProduct(product)?.ratingScore ?? "N/A"}
                </td>
              ))}
            </tr>

            <tr>
              <td>Price Score (30%)</td>
              {products.map((product) => (
                <td key={product.id}>
                  {getRankedProduct(product)?.priceScore ?? "N/A"}
                </td>
              ))}
            </tr>

            <tr>
              <td>Reviews Score (20%)</td>
              {products.map((product) => (
                <td key={product.id}>
                  {getRankedProduct(product)?.reviewScore ?? "N/A"}
                </td>
              ))}
            </tr>

            <tr>
              <td>Discount Score (10%)</td>
              {products.map((product) => (
                <td key={product.id}>
                  {getRankedProduct(product)?.discountScore ?? "N/A"}
                </td>
              ))}
            </tr>

            {/* Price */}
            <tr>
              <td>Price</td>
              {products.map((product) => (
                <td key={product.id}>
                  <strong>{formatPrice(product.price)}</strong>
                </td>
              ))}
            </tr>

            {/* Original Price */}
            <tr>
              <td>Original Price</td>
              {products.map((product) => (
                <td key={product.id}>
                  {formatPrice(product.originalPrice)}
                </td>
              ))}
            </tr>

            {/* Discount */}
            <tr>
              <td>Discount</td>
              {products.map((product) => (
                <td key={product.id}>
                  {product.discount != null
                    ? `${product.discount}% off`
                    : "Not available"}
                </td>
              ))}
            </tr>

            {/* Rating */}
            <tr>
              <td>Rating</td>
              {products.map((product) => (
                <td key={product.id}>
                  ⭐ {product.rating ?? "Not available"}
                </td>
              ))}
            </tr>

            {/* Reviews */}
            <tr>
              <td>Reviews</td>
              {products.map((product) => (
                <td key={product.id}>
                  {product.reviewCount != null
                    ? product.reviewCount.toLocaleString("en-IN")
                    : "Not available"}
                </td>
              ))}
            </tr>

            {/* Features */}
            <tr>
              <td>Features</td>
              {products.map((product) => (
                <td key={product.id}>
                  {product.features || "Not available"}
                </td>
              ))}
            </tr>

            {/* Delivery */}
            <tr>
              <td>Delivery</td>
              {products.map((product) => (
                <td key={product.id}>
                  {product.delivery || "Not available"}
                </td>
              ))}
            </tr>

            {/* Add to Cart */}
            <tr>
              <td>Action</td>
              {products.map((product) => (
                <td key={product.id}>
                  <button
  className="compare-cart-button"
  onClick={() => addToCart(product)}
>
  Add to Cart
</button>
                </td>
              ))}
            </tr>
          </tbody>
        </table>


        
      </div>

      <p className="compare-subtitle">
        Compare price, rating, reviews, discount and features.
      </p>
       
      {/* Scoring Information */}
      <div className="scoring-info">
        <h3>How do we choose the Best Product?</h3>
        <p>⭐ Rating: 40% | 💰 Price: 30%</p>
        <p>📝 Reviews: 20% | 🏷️ Discount: 10%</p>
      </div>

      {/* Best Product Recommendation */}
      {bestProduct && (
        <div className="winner-card best-overall">
          <span className="winner-icon">🏆</span>

          <h3>Best Overall Product</h3>

          <img
            src={bestProduct.image}
            alt={bestProduct.name}
          />

          <h4>{bestProduct.name}</h4>

          <p>
            Price: {formatPrice(bestProduct.price)}
          </p>

          <p>Rating: ⭐ {bestProduct.rating}/5</p>

          <p>
            Reviews: {bestProduct.reviewCount.toLocaleString("en-IN")}
          </p>

          <p>Discount: {bestProduct.discount}% off</p>

          <h3>Score: {bestProduct.finalScore}/100</h3>

          <strong>🏆 Best Choice</strong>
        </div>
      )}

      {!bestProduct && (
        <p className="scoring-warning">
          A Best Choice cannot be calculated because one or more
          required product details are missing.
        </p>
      )}

      {/* Comparison Table */}
      
      <button
        className="compare-back-button"
        onClick={() => navigate(-1)}
      >
        Continue Shopping
      </button>
    </div>

    
  );
}

export default Compare;
