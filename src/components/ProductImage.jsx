import { useEffect, useState } from "react";
import "./ProductImage.css";

const FALLBACK = "/images/image-unavailable.png";

function ProductImage({ src, alt, className }) {
  const [current, setCurrent] = useState(src || FALLBACK);

  useEffect(() => {
    setCurrent(src || FALLBACK);
  }, [src]);

  return (
    <img
      className={className}
      src={current}
      alt={alt || "Product image"}
      loading="lazy"
      decoding="async"
      draggable="false"
      onError={() => {
        if (current !== FALLBACK) {
          setCurrent(FALLBACK);
        }
      }}
    />
  );
}

export default ProductImage;