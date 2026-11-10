import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./ProductDetails.css";
import { useCart } from "./CartContext";
import {
  categoryPath,
  findProduct,
  productPath,
  relatedProducts,
} from "../data/catalog";
import ProductImage from "../components/ProductImage";
import { readDeliveryLocation } from "../utils/session";

const currency = (value) =>
  `₹${(Number(value) || 0).toLocaleString("en-IN")}`;

function ProductDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  // Always resolve from the route ID first so directly opening a product URL
  // and navigating between related products both load the correct product.
  const product = useMemo(
    () => findProduct(id) || location.state?.product || null,
    [id, location.state]
  );

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [deliveryPlace] = useState(readDeliveryLocation);

  const images = useMemo(() => {
    if (!product) return [];
    const available = [
      ...(Array.isArray(product.images) ? product.images : []),
      product.image,
    ].filter(Boolean);
    return [...new Set(available)];
  }, [product]);

  useEffect(() => {
    setSelectedImage(images[0] || "");
    setQuantity(1);
    setMessage("");
    setShowImageViewer(false);
  }, [product?.id, images]);

  useEffect(() => {
    if (!showImageViewer) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setShowImageViewer(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [showImageViewer]);

  if (!product) {
    return (
      <div className="product-not-found">
        <h2>Product not found</h2>
        <p>This product may have been moved or is no longer available.</p>
        <button onClick={() => navigate("/")}>Continue Shopping</button>
      </div>
    );
  }

  const price = Number(product.price) || 199;
  const originalPrice = Number(product.originalPrice) || 0;
  const discount =
    Number(product.discount) ||
    (originalPrice > price
      ? Math.round(((originalPrice - price) / originalPrice) * 100)
      : 0);
  const rating = Math.min(5, Math.max(0, Number(product.rating) || 4));
  const highlights = Array.isArray(product.highlights)
    ? product.highlights
    : product.description
      ? [product.description]
      : [`${product.name} is designed for everyday use.`];
  const specifications = product.specifications
    ? Array.isArray(product.specifications)
      ? product.specifications
      : Object.entries(product.specifications).map(([label, value]) => ({
          label,
          value,
        }))
    : [
        { label: "Brand", value: product.brand || "Generic" },
        { label: "Model name", value: product.name },
        { label: "Department", value: product.department || product.category || "General" },
        { label: "Availability", value: product.availability || "In Stock" },
        { label: "Seller", value: product.seller || "Amazon Retail" },
      ];
  const offers = Array.isArray(product.offers) ? product.offers : [];

  const handleAddToCart = () => {
    addToCart({ ...product, price, quantity });
    setMessage("Added to Cart Successfully!");
  };

  const buyNow = () => {
    sessionStorage.setItem(
      "buyNowItem",
      JSON.stringify({ ...product, price, quantity })
    );
    localStorage.removeItem("checkoutItem");
    navigate("/checkout");
  };

  const handleWishlist = () => {
    let saved = [];
    try {
      saved = JSON.parse(localStorage.getItem("wishlistItems") || "[]");
      if (!Array.isArray(saved)) saved = [];
    } catch {
      saved = [];
    }
    const alreadySaved = saved.some(
      (item) => String(item.id) === String(product.id)
    );
    if (!alreadySaved) {
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify([
          {
            id: product.id,
            name: product.name,
            image: product.image,
            price,
            brand: product.brand,
          },
          ...saved,
        ])
      );
    }
    window.dispatchEvent(new Event("wishlistUpdated"));
    setMessage(
      alreadySaved ? "Already in your wish list" : "Saved to your wish list"
    );
  };

  const related = relatedProducts(product, 4);

  return (
    <main className="amazon-product-page">
      <nav className="product-breadcrumb" aria-label="Breadcrumb">
        <button onClick={() => navigate("/")}>Home</button>
        <span>›</span>
        <button
          onClick={() =>
            product.categoryId && navigate(categoryPath(product.categoryId))
          }
        >
          {product.categoryTitle || product.category || "Products"}
        </button>
        <span>›</span>
        <span className="breadcrumb-current">{product.name}</span>
      </nav>

      <div className="amazon-product-layout">
        {/* LEFT: PRODUCT IMAGE GALLERY */}
        <section className="amazon-image-section" aria-label="Product images">
          <button
            type="button"
            className="main-product-image"
            onClick={() => setShowImageViewer(true)}
            aria-label="Open full product image"
          >
            <ProductImage
              src={selectedImage || product.image}
              alt={product.name}
            />
          </button>
          <button
            type="button"
            className="full-view-link"
            onClick={() => setShowImageViewer(true)}
          >
            Click to see full view
          </button>
          {images.length > 1 && (
            <div className="product-thumbnails" aria-label="Choose product image">
              {images.map((image, index) => (
                <button
                  type="button"
                  key={`${image}-${index}`}
                  className={`thumbnail ${selectedImage === image ? "active" : ""}`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`Show product image ${index + 1}`}
                  aria-pressed={selectedImage === image}
                >
                  <ProductImage src={image} alt={`${product.name} view ${index + 1}`} />
                </button>
              ))}
            </div>
          )}
        </section>

        {/* CENTER: PRODUCT INFORMATION */}
        <section className="amazon-product-info">
          <h1>{product.name}</h1>
          <button type="button" className="visit-store" onClick={() => product.categoryId && navigate(categoryPath(product.categoryId))}>
            Visit the {product.brand || "Store"}
          </button>

          <div className="rating-row">
            <span className="rating-number">{rating.toFixed(1)}</span>
            <span className="rating-stars" aria-label={`${rating} out of 5 stars`}>
              {"★".repeat(Math.round(rating))}
              {"☆".repeat(5 - Math.round(rating))}
            </span>
            <a href="#customer-reviews" className="rating-link">
              {Number(product.reviewCount || 0).toLocaleString("en-IN")} ratings
            </a>
          </div>

          {product.bestSeller && <div className="best-seller-label">#1 Best Seller</div>}
          {product.amazonChoice && <div className="choice-label">Amazon&apos;s Choice</div>}
          <p className="bought-info">{product.bought || "Popular choice among customers"}</p>

          <hr />

          {discount > 0 && <div className="deal-label">Limited time deal</div>}
          <div className="price-details">
            {discount > 0 && <span className="discount-percent">-{discount}%</span>}
            <span className="discount-price">{currency(price)}</span>
          </div>
          {originalPrice > price && (
            <p className="mrp">
              M.R.P.: <del>{currency(originalPrice)}</del>
              <span className="saved-price"> You save {currency(originalPrice - price)}</span>
            </p>
          )}
          <p className="tax-info">Inclusive of all taxes</p>

          <section className="available-offers">
            <h3>Available offers</h3>
            {offers.length > 0 ? (
              <div className="offer-list">
                {offers.map((offer, index) => (
                  <article className="offer-item" key={`${offer.title || offer}-${index}`}>
                    <strong>{offer.title || "Offer"}</strong>
                    <span>{offer.description || offer}</span>
                  </article>
                ))}
              </div>
            ) : (
              <p className="no-offers">No additional offers are listed for this product.</p>
            )}
          </section>

          <div className="delivery-benefits">
            <div><i className="bi bi-truck" /><span>Free Delivery</span></div>
            <div><i className="bi bi-arrow-repeat" /><span>Easy Returns</span></div>
            <div><i className="bi bi-shield-check" /><span>Secure Payment</span></div>
            <div><i className="bi bi-box-seam" /><span>Amazon Delivered</span></div>
          </div>

          <section className="product-specifications">
            <h2>Product information</h2>
            <table className="specification-table">
              <tbody>
                {specifications.map((spec, index) => (
                  <tr key={`${spec.label || spec.name}-${index}`}>
                    <th>{spec.label || spec.name}</th>
                    <td>{spec.value ?? spec.description ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          <hr />
          <section className="about-product">
            <h2>About this item</h2>
            <ul className="product-highlights">
              {highlights.map((item, index) => <li key={index}>{item}</li>)}
            </ul>
          </section>

          <section id="customer-reviews" className="customer-reviews">
            <h2>Customer reviews</h2>
            <div className="review-summary">
              <span className="review-score">{rating.toFixed(1)} out of 5</span>
              <span className="rating-stars">{"★".repeat(Math.round(rating))}{"☆".repeat(5 - Math.round(rating))}</span>
              <span>{Number(product.reviewCount || 0).toLocaleString("en-IN")} global ratings</span>
            </div>
            <p>Customer review details will appear here when reviews are added to the product data.</p>
          </section>
        </section>

        {/* RIGHT: BUYING OPTIONS */}
        <aside className="amazon-buy-box">
          <div className="prime-panel">
            <strong><span>prime</span> delivery</strong>
            <p>Fast, free delivery on eligible orders.</p>
          </div>
          <div className="buy-box-price">{currency(price)}</div>
          <p className="buy-box-tax">Inclusive of all taxes</p>
          <p className="buy-box-delivery">
            {product.delivery || "FREE delivery"} <strong>on your first eligible order.</strong>
          </p>
          <p className="delivery-location">
            <i className="bi bi-geo-alt" /> Delivering to {deliveryPlace.city} {deliveryPlace.pincode}
          </p>
          <p className="stock-status">{product.availability || "In Stock"}</p>

          <label htmlFor="product-quantity">Quantity:</label>
          <select
            id="product-quantity"
            value={quantity}
            onChange={(event) => {
              setQuantity(Number(event.target.value));
              setMessage("");
            }}
          >
            {[1, 2, 3, 4, 5].map((number) => (
              <option key={number} value={number}>{number}</option>
            ))}
          </select>

          <button type="button" className="amazon-add-cart" onClick={handleAddToCart}>
            Add to Cart
          </button>
          <button type="button" className="amazon-buy-now" onClick={buyNow}>
            Buy Now
          </button>
          {message && <p className="cart-success" role="status">{message}</p>}

          <div className="secure-text"><i className="bi bi-lock-fill" /> Secure transaction</div>
          <div className="seller-details">
            <p>Ships from <strong>{product.shippedBy || "Amazon"}</strong></p>
            <p>Sold by <strong>{product.seller || "Amazon Retail"}</strong></p>
            <p>Payment <strong>Secure transaction</strong></p>
          </div>
          <button type="button" className="add-wishlist" onClick={handleWishlist}>
            Add to Wish List
          </button>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="frequently-bought">
          <h2>Similar products</h2>
          <div className="related-grid">
            {related.map((item) => (
              <button
                key={item.routeId || item.id}
                type="button"
                className="related-card"
                onClick={() => navigate(productPath(item.routeId || item.id))}
              >
                <ProductImage src={item.image} alt={item.name} />
                <span>{item.name}</span>
                <strong>{currency(item.price)}</strong>
                <span className="related-rating">{"★".repeat(Math.round(item.rating || 4))} ({Number(item.reviewCount || 0).toLocaleString("en-IN")})</span>
              </button>
            ))}
          </div>
        </section>
      )}

      {showImageViewer && (
        <div
          className="product-image-viewer"
          role="dialog"
          aria-modal="true"
          aria-label="Full product image"
          onClick={() => setShowImageViewer(false)}
        >
          <button
            type="button"
            className="image-viewer-close"
            aria-label="Close image viewer"
            onClick={() => setShowImageViewer(false)}
          >
            ×
          </button>
          <div className="image-viewer-content" onClick={(event) => event.stopPropagation()}>
            <ProductImage src={selectedImage || product.image} alt={product.name} />
            <p>{product.name}</p>
          </div>
        </div>
      )}
    </main>
  );
}

export default ProductDetails;
