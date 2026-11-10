import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { cards, categoryPath, productPath } from "../data/catalog";
import ProductImage from "../components/ProductImage";

const banners = [
  {
    type: "image",
    src: "/images/banner1.jpg",
  },
  {
    type: "video",
    src: "/videos/banner1.mp4",
  },
  {
    type: "image",
    src: "/images/banner2.jpg",
  },

  {
    type: "image",
    src: "/images/banner3.jpg",
  },
   {
    type: "image",
    src: "/images/banner4.jpg",
  },
   {
    type: "image",
    src: "/images/banner5.jpg",
  },

  {
    type: "image",
    src: "/images/banner6.jpg",
  },
  {
    type: "image",
    src: "/images/banner7.jpg",
  },
  {
    type: "image",
    src: "/images/banner8.jpg",
  },
  {
    type: "image",
    src: "/images/banner9.jpg",
  },
  {
    type: "image",
    src: "/images/banner10.jpg",
  },

];
function Home() {
  const navigate = useNavigate();
  const trackRef = useRef(null);

  const scrollBanners = (direction) => {
    trackRef.current?.scrollBy({
      left: direction * Math.max(trackRef.current.clientWidth * 0.8, 280),
      behavior: "smooth",
    });
  };

  return (
    <div className="home-page">
      
      <div className="banner-carousel">
        <button
  className="banner-prev"
  onClick={() => {
    const track = document.querySelector(".banner-track");

    track.scrollBy({
      left: -300,
      behavior: "smooth",
    });
  }}
>
  ❮
</button>

       <div className="banner-track">

    {banners.map((banner, index) => (
      <div
        className="banner-card"
        key={index}
       
      >

        {banner.type === "image" ? (
          <img
            src={banner.src}
            alt={`Banner ${index + 1}`}
          />
        ) : (
          <video
            src={banner.src}
            autoPlay
            muted
            loop
            playsInline
          />
        )}

      </div>
    ))}

  </div>



        

        <button
          className="banner-next"
          onClick={() => {
            const track =
              document.querySelector(".banner-track");

            track.scrollBy({
              left: 300,
              behavior: "smooth",
            });
          }}
        >
          ❯
        </button>

      </div>

      <div className="product-card-section">
        {cards.map((card) => (
          <div className="home-product-card" key={card.id}>
            <div className="card-title">
              <h2>{card.title}</h2>
              <button
                type="button"
                className="card-arrow"
                onClick={() => navigate(categoryPath(card.id))}
              >
                See all
              </button>
            </div>

            <div className="product-grid">
              {card.products.map((product) => (
                <button
                  type="button"
                  className="product-item"
                  key={product.id}
                  onClick={() =>
                    navigate(productPath(product.id), {
                      state: { product },
                    })
                  }
                >
                  <ProductImage src={product.image} alt={product.name} />
                  <p>{product.name}</p>
                  {/* <small>₹{Number(product.price).toLocaleString("en-IN")}</small> */}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
