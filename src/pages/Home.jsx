import React from "react";
import "./Home.css";

function Home() {
  const banners = [
    "/images/banner1.jpg",
    "/images/banner2.jpg",
    "/images/banner3.jpg",
    "/images/banner4.jpg",
    "/images/banner5.jpg",
    "/images/banner6.jpg",
  ];

  const cards = [
    {
      title: "Voice control your smart home",
      products: [
        {
          image: "/images/echo1.jpg",
          name: "Echo Spot with Alexa"
        },
        {
          image: "/images/echo2.jpg",
          name: "Echo Dot Max with Alexa"
        },
        {
          image: "/images/echo3.jpg",
          name: "Echo Studio with Alexa"
        },
        {
          image: "/images/echo4.jpg",
          name: "Echo Dot with Alexa"
        }
      ]
    },

    {
      title: "Daily needs | Starting ₹199",
      products: [
        {
          image: "/images/product1.jpg",
          name: "Under ₹499 | Cleaning"
        },
        {
          image: "/images/product2.jpg",
          name: "Starting ₹199 | Oil"
        },
        {
          image: "/images/product3.jpg",
          name: "Under ₹299 | Tea"
        },
        {
          image: "/images/product4.jpg",
          name: "Under ₹499 | Baby"
        }
      ]
    },

    {
      title: "Home entertainment smart solutions",
      products: [
        {
          image: "/images/tv1.jpg",
          name: "Samsung Ultra HD Smart TV"
        },
        {
          image: "/images/tv2.jpg",
          name: "Fire TV Stick HD"
        },
        {
          image: "/images/tv3.jpg",
          name: "Xiaomi QLED Ultra"
        },
        {
          image: "/images/tv4.jpg",
          name: "Fire TV Cube"
        }
      ]
    },

    {
      title: "Up to 80% off on Home improvements",
      products: [
        {
          image: "/images/home1.jpg",
          name: "Electrical & accessories"
        },
        {
          image: "/images/home2.jpg",
          name: "Ladders | Up to 50% off"
        },
        {
          image: "/images/home3.jpg",
          name: "Security cameras"
        },
        {
          image: "/images/home4.jpg",
          name: "For business purchases"
        }
      ]
    }
  ];


  return (
    <div className="home-page">

      <div className="banner-carousel">

        <div className="banner-track">

          {banners.map((image, index) => (
            <div className="banner-card" key={index}>
              <img
                src={image}
                alt={`Banner ${index + 1}`}
              />
            </div>
          ))}

        </div>

        <button className="banner-next">
          ❯
        </button>

      </div>
     

       <div className="product-card-section">

        {cards.map((card, index) => (

          <div className="home-product-card" key={index}>

         

            <div className="card-title">
              <h2>{card.title}</h2>

              <span className="card-arrow">
                ›
              </span>
            </div>


        

            <div className="product-grid">

              {card.products.map((product, productIndex) => (

                <div
                  className="product-item"
                  key={productIndex}
                >

                  <img
                    src={product.image}
                    alt={product.name}
                  />

                  <p>
                    {product.name}
                  </p>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>


    </div>
  );
}

export default Home;