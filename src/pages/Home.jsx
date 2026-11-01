import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import { cards } from "../data/products";

function Home() {
  const navigate = useNavigate();

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
// const cards = [
//     {
//       id: "smart-home",
//       title: "Voice control your smart home",

//       products: [
//         {
//           id: "echo-spot",
//           image: "/images/echo1.jpg",
//           name: "Echo Spot with Alexa",
//         },
//         {
//           id: "echo-dot-max",
//           image: "/images/echo2.jpg",
//           name: "Echo Dot Max with Alexa",
//         },
//         {
//           id: "echo-studio",
//           image: "/images/echo3.jpg",
//           name: "Echo Studio with Alexa",
//         },
//         {
//           id: "echo-dot",
//           image: "/images/echo4.jpg",
//           name: "Echo Dot with Alexa",
//         },
//       ],
//     },


    

//     {
//       id: "daily-needs",
//       title: "Daily needs | Starting ₹199",

//       products: [
//         {
//           id: "cleaning-products",
//           image: "/images/product1.jpg",
//           name: "Under ₹499 | Cleaning",
//         },
//         {
//           id: "oil-products",
//           image: "/images/product2.jpg",
//           name: "Starting ₹199 | Oil",
//         },
//         {
//           id: "tea-products",
//           image: "/images/product3.jpg",
//           name: "Under ₹299 | Tea",
//         },
//         {
//           id: "baby-products",
//           image: "/images/product4.jpg",
//           name: "Under ₹499 | Baby",
//         },
//       ],
//     },

//     {
//       id: "home-entertainment",
//       title: "Home entertainment smart solutions",

//       products: [
//         {
//           id: "samsung-tv",
//           image: "/images/tv1.jpg",
//           name: "Samsung Ultra HD Smart TV",
//         },
//         {
//           id: "fire-tv-stick",
//           image: "/images/tv2.jpg",
//           name: "Fire TV Stick HD",
//         },
//         {
//           id: "xiaomi-tv",
//           image: "/images/tv3.jpg",
//           name: "Xiaomi QLED Ultra",
//         },
//         {
//           id: "fire-tv-cube",
//           image: "/images/tv4.jpg",
//           name: "Fire TV Cube",
//         },
//       ],
//     },

//     {
//       id: "home-improvements",
//       title: "Up to 80% off on Home improvements",

//       products: [
//         {
//           id: "electrical-accessories",
//           image: "/images/home1.jpg",
//           name: "Electrical & accessories",
//         },
//         {
//           id: "ladders",
//           image: "/images/home2.jpg",
//           name: "Ladders | Up to 50% off",
//         },
//         {
//           id: "security-cameras",
//           image: "/images/home3.jpg",
//           name: "Security cameras",
//         },
//         {
//           id: "business-products",
//           image: "/images/home4.jpg",
//           name: "For business purchases",
//         },
//       ],
//     },

//  {
//       id: "home-products",
//       title: "Under ₹499| Best of home products",

//       products: [
//         {
//           id: "clock-products",
//           image: "/images/home11.jpg",
//           name: "Wall clocks",
//         },
//         {
//           id: "pillow-products",
//           image: "/images/home12.jpg",
//           name: "Pillows",
//         },
//         {
//           id: "candle-products",
//           image: "/images/home13.jpg",
//           name: "Candles",
//         },
//         {
//           id: "Floor-products",
//           image: "/images/home14.jpg",
//           name: "Floor mats",
//         },
//       ],
//     },
// // updates from here
// {
//       id: "alexa-products",
//       title: "Party ready with Alexa",

//       products: [
//         {
//           id: "fire-products",
//           image: "/images/alexa1.jpg",
//           name: "Fire TV Stick 4K Select",
//         },
//         {
//           id: "plug-products",
//           image: "/images/alexa2.jpg",
//           name: "Smart Plug",
//         },
//         {
//           id: "samsung-products",
//           image: "/images/alexa3.jpg",
//           name: "Samsung Ultra HD S…",
//         },
//         {
//           id: "echospot-products",
//           image: "/images/alexa4.jpg",
//           name: "Echo Spot with Alexa",
//         },
//       ],
//     },
//     {
//       id: "dress-products",
//       title: "Under ₹499| Top offers on top",

//       products: [
//         {
//           id: "kurta-products",
//           image: "/images/dress1.jpg",
//           name: "Kurtas & sets",
//         },
//         {
//           id: "jumpsuits-products",
//           image: "/images/dress2.jpg",
//           name: "Dresses & jumpsuits",
//         },
//         {
//           id: "T-shirt-products",
//           image: "/images/dress3.jpg",
//           name: "T-shirts & polos",
//         },
//         {
//           id: "Formalwear-products",
//           image: "/images/dress4.jpg",
//           name: "Formalwear",
//         },
//       ],
//     },
//     {
//       id: "wholesale-products",
//       title: "Buy office electronics at wholesale prices + 10% cash…",

//       products: [
//         {
//           id: "tv-products",
//           image: "/images/whole1.jpg",
//           name: "Up to 50% off on D…",
//         },
//         {
//           id: "tv1-products",
//           image: "/images/whole2.jpg",
//           name: "Up to 40% off on La…",
//         },
//         {
//           id: "tv2-products",
//           image: "/images/whole3.jpg",
//           name: "Up to 60% off on Pr…",
//         },
//         {
//           id: "tv4-products",
//           image: "/images/whole4.jpg",
//           name: "For Business purchases",
//         },
//       ],
//     },
//     {
//       id: "pet-products",
//       title: "Starting ₹199 | Shop for pet care",

//       products: [
//         {
//           id: "dog-products",
//           image: "/images/pet1.jpg",
//           name: "Dog products",
//         },
//         {
//           id: "cat-products",
//           image: "/images/pet2.jpg",
//           name: "Cat Products",
//         },
//         {
//           id: "birds-products",
//           image: "/images/pet3.jpg",
//           name: "Birds Products",
//         },
//         {
//           id: "Aquatic-products",
//           image: "/images/pet4.jpg",
//           name: "Aquatic products",
//         },
//       ],
//     },
//     {
//       id: "Amazon-products",
//       title: "Lowest prices on Amazon + Extra 15% cashback",

//       products: [
//         {
//           id: "organizers-products",
//           image: "https://m.media-amazon.com/images/I/51ZZ-d1dQ1L._SR210,210_.jpg",
//           name: "Closet organizers",
//         },
//         {
//           id: "decor-products",
//           image: "https://m.media-amazon.com/images/I/61kveNIbwVL._SR210,210_.jpg",
//           name: "Home decor",
//         },
//         {
//           id: "Bedsheets-products",
//           image: "https://m.media-amazon.com/images/I/51iqcNBBgqL._SR210,210_.jpg",
//           name: "Bedsheets & pillows",
//         },
//         {
//           id: "Shop-products",
//           image: "https://m.media-amazon.com/images/I/51g40PkHJWL._SR210,210_.jpg",
//           name: "Shop all Bazaar",
//         },
//       ],
//     },
//     {
//       id: "fruits-products",
//       title: "Starting ₹199 | Dry fruits & seeds",

//       products: [
//         {
//           id: "almonds-products",
//           image: "https://m.media-amazon.com/images/I/41ZzHo5qMTL._SR210,210_.jpg",
//           name: "Almonds",
//         },
//         {
//           id: "dates-products",
//           image: "https://m.media-amazon.com/images/I/41pJQ50IbQL._SR210,210_.jpg",
//           name: "Dates",
//         },
//         {
//           id: "cashew-products",
//           image: "https://m.media-amazon.com/images/I/41GdPKqo9dL._SR210,210_.jpg",
//           name: "Cashew",
//         },
//         {
//           id: "chia-products",
//           image: "https://m.media-amazon.com/images/I/413sFj4y34L._SR210,210_.jpg",
//           name: "Chia Seeds",
//         },
//       ],
//     },
//     {
//       id: "Printers-products",
//       title: "Up to 60% off | Bestselling Printers & routers",

//       products: [
//         {
//           id: "Printers-products",
//           image: "https://m.media-amazon.com/images/I/31eQ79Fgv2L._SR210,210_.jpg",
//           name: "Printers for occasion…",
//         },
//         {
//           id: "tank-products",
//           image: "https://m.media-amazon.com/images/I/3172Gnb6U4L._SR210,210_.jpg",
//           name: "All-in-One ink tank…",
//         },
//         {
//           id: "WIFI-products",
//           image: "https://m.media-amazon.com/images/I/31cg9qeLY2L._SR210,210_.jpg",
//           name: "WiFi Adapters",
//         },
//         {
//           id: "Routers-products",
//           image: "https://m.media-amazon.com/images/I/61WRwTFAmIL._SR210,210_.jpg",
//           name: "Routers for daily str…",
//         },
//       ],
//     },

//     {
//       id: "homes-products",
//       title: "Starting ₹169 | Must-have home buys",

//       products: [
//         {
//           id: "bed-products",
//           image: "https://m.media-amazon.com/images/I/718ZbriDFnL._SR210,210_.jpg",
//           name: "Min. 50% off | Hom…",
//         },
//         {
//           id: "teddy-products",
//           image: "https://m.media-amazon.com/images/I/41xoeDT+jUL._SR210,210_.jpg",
//           name: "Min. 50% off | Hom…",
//         },
//         {
//           id: "light-products",
//           image: "https://m.media-amazon.com/images/I/71AiK-6DX3L._SR210,210_.jpg",
//           name: "Starting ₹199 | Ligh…",
//         },
//         {
//           id: "show-products",
//           image: "https://m.media-amazon.com/images/I/61xB64fZVZL._SR210,210_.jpg",
//           name: "Starting ₹199 | Hom…",
//         },
//       ],
//     },
//     {
//       id: "Premium-products",
//       title: "Premium accessories from the top brands",

//       products: [
//         {
//           id: "Logitech-products",
//           image: "https://m.media-amazon.com/images/I/61JH3MatphL._SR210,210_.png",
//           name: "Logitech | Starting ₹…",
//         },
//         {
//           id: "HP-products",
//           image: "https://m.media-amazon.com/images/I/614vmf5cyaL._SR210,210_.png",
//           name: "HP | Starting ₹269",
//         },
//         {
//           id: "Asus-products",
//           image: "https://m.media-amazon.com/images/I/61gu4eZ0itL._SR210,210_.png",
//           name: "Asus | Starting ₹599",
//         },
//         {
//           id: "dell-products",
//           image: "https://m.media-amazon.com/images/I/61OqxbjMgSL._SR210,210_.png",
//           name: "Dell | Starting ₹259",
//         },
//       ],
//     },
//     {
//       id: "outdoor-products",
//       title: "Starting ₹199 | Unlock outdoor adventure",

//       products: [
//         {
//           id: "guns-products",
//           image: "https://m.media-amazon.com/images/I/41nJM4Eg6EL._SR210,210_.jpg",
//           name: "Blasters & toy guns",
//         },
//         {
//           id: "ride-ons-products",
//           image: "https://m.media-amazon.com/images/I/41QvBU7pwqL._SR210,210_.jpg",
//           name: "Electric ride-ons",
//         },
//         {
//           id: "Bikes-products",
//           image: "https://m.media-amazon.com/images/I/41h+cW0CuzL._SR210,210_.jpg",
//           name: "Bikes, tricycles & more",
//         },
//         {
//           id: "Slides",
//           image: "https://m.media-amazon.com/images/I/41NpAZkZScL._SR210,210_.jpg",
//           name: "Slides",
//         },
//       ],
//     },
//     {
//       id: "headphone-products",
//       title: "Starting ₹149 | Your favourite headphone brands",

//       products: [
//         {
//           id: "boAt-products",
//           image: "https://m.media-amazon.com/images/I/41ci+TBZEyL._SR210,210_.jpg",
//           name: "boAt",
//         },
//         {
//           id: "Boult-products",
//           image: "https://m.media-amazon.com/images/I/41NDRBS0O-L._SR210,210_.jpg",
//           name: "Boult",
//         },
//         {
//           id: "Noise-products",
//           image: "https://m.media-amazon.com/images/I/417MWJkBADL._SR210,210_.jpg",
//           name: "Noise",
//         },
//         {
//           id: "Zebronics-products",
//           image: "https://m.media-amazon.com/images/I/4106ulTUHfL._SR210,210_.jpg",
//           name: "Zebronics",
//         },
//       ],
//     },

//   //  change

//   {
//       id: "cameras",
//       title: "Business pricing on cameras + GST credit",

//       products: [
//         {
//           id: "Mirrorless cameras",
//           image: "https://m.media-amazon.com/images/I/41UDJ4RRRsL._SR210,210_.jpg",
//           name: "Mirrorless",
//         },
//         {
//           id: "Dash_cameras",
//           image: "https://m.media-amazon.com/images/I/51twMQ3C+NL._SR210,210_.jpg",
//           name: "Dash cameras",
//         },
//         {
//           id: "Action_cameras",
//           image: "https://m.media-amazon.com/images/I/41Vor4qJAML._SR210,210_.jpg",
//           name: "Action cameras",
//         },
//         {
//           id: "Register",
//           image: "https://m.media-amazon.com/images/I/41gL4iq0kpL._SR210,210_.jpg",
//           name: "Register for business…",
//         },
//       ],
//     },
// {
//       id: "Books",
//       title: "Up to 50% off | Books for upcoming exams",

//       products: [
//         {
//           id: "JEE_Main+Adv",
//           image: "https://m.media-amazon.com/images/I/71qhpqJRsrL._SR210,210_.png",
//           name: "JEE Main+Adv",
//         },
//         {
//           id: "NEET_AIIMS",
//           image: "https://m.media-amazon.com/images/I/71PgKRbaCDL._SR210,210_.png",
//           name: "NEET+AIIMS",
//         },
//         {
//           id: "UGC_NET_CTET",
//           image: "https://m.media-amazon.com/images/I/71n8bs-O48L._SR210,210_.png",
//           name: "UGC NET/CTET",
//         },
//         {
//           id: "UPSC",
//           image: "https://m.media-amazon.com/images/I/71vJ6eqwvuL._SR210,210_.png",
//           name: "UPSC",
//         },
//       ],
//     },
// {
//       id: "brand-dress-products",
//       title: "Under ₹399 | Lowest ever prices on top brands",

//       products: [
//         {
//           id: "Dress",
//           image: "https://m.media-amazon.com/images/I/81-vCebHDVL._SR210,210_.png",
//           name: "Dresses",
//         },
//         {
//           id: "Kurta",
//           image: "https://m.media-amazon.com/images/I/81yMh8NJBBL._SR210,210_.png",
//           name: "Kurta Set",
//         },
//         {
//           id: "T-Shirt",
//           image: "https://m.media-amazon.com/images/I/81O4hAys2aL._SR210,210_.png",
//           name: "T-Shirts",
//         },
//         {
//           id: "Shirt-products",
//           image: "https://m.media-amazon.com/images/I/911jCp0bZaL._SR210,210_.png",
//           name: "Shirts",
//         },
//       ],
//     },
// {
//       id: "Kides_books",
//       title: "Gift for kids under budget",

//       products: [
//         {
//           id: "Sticker-products",
//           image: "https://m.media-amazon.com/images/I/815eK+jijyL._SR210,210_.png",
//           name: "Sticker books ",
//         },
//         {
//           id: "Activity-products",
//           image: "https://m.media-amazon.com/images/I/81idsdrX+WL._SR210,210_.png",
//           name: "Activity books",
//         },
//         {
//           id: "STEM-products",
//           image: "https://m.media-amazon.com/images/I/81DfrhsYU9L._SR210,210_.png",
//           name: "STEM books",
//         },
//         {
//           id: "Earlylearning-products",
//           image: "https://m.media-amazon.com/images/I/71tqilh62qL._SR210,210_.png",
//           name: "Early learning",
//         },
//       ],
//     },
// {
//       id: "remote_control",
//       title: "Starting ₹121 | Deals on remote control cars & more",

//       products: [
//         {
//           id: "Remote_control_cars",
//           image: "https://m.media-amazon.com/images/I/81uXJWHZwKL._SR210,210_.png",
//           name: "Remote control cars",
//         },
//         {
//           id: "Toy_airplanes",
//           image: "https://m.media-amazon.com/images/I/81cQ5T3kWeL._SR210,210_.png",
//           name: "Toy airplanes",
//         },
//         {
//           id: "Toy_buses",
//           image: "https://m.media-amazon.com/images/I/81ROsRQ8hmL._SR210,210_.png",
//           name: "Toy buses",
//         },
//         {
//           id: "Motor_vehicle",
//           image: "https://m.media-amazon.com/images/I/81mrmILOpXL._SR210,210_.png",
//           name: "Motor vehicle playsets",
//         },
//       ],
//     },
// {
//       id: "footwear-products",
//       title: "Under ₹599 | Deals on footwear",

//       products: [
//         {
//           id: "men-footwear",
//           image: "https://m.media-amazon.com/images/I/81lQVxp2t9L._SR210,210_.png",
//           name: "Men's clogs & sandals",
//         },
//         {
//           id: "sneakers-footwear",
//           image: "https://m.media-amazon.com/images/I/71YPhqq2A4L._SR210,210_.png",
//           name: "Men's trendy sneakers",
//         },
//         {
//           id: "trendy-footwear",
//           image: "https://m.media-amazon.com/images/I/81PItFrrCkL._SR210,210_.png",
//           name: "Women's trendy san",
//         },
//         {
//           id: "Women-footwear",
//           image: "https://m.media-amazon.com/images/I/81P5HnCYlZL._SR210,210_.png",
//           name: "Women's chic sneakers",
//         },
//       ],
//     },
// {
//       id: "mobile-products",
//       title: "Top deals on mobile accessories",

//       products: [
//         {
//           id: "OnePlus-products",
//           image: "https://m.media-amazon.com/images/I/61Hzjp9YINL._SR210,210_.png",
//           name: "OnePlus TWS",
//         },
//         {
//           id: "Realme-products",
//           image: "https://m.media-amazon.com/images/I/61Hzjp9YINL._SR210,210_.png",
//           name: "Realme TWS",
//         },
//         {
//           id: "OnePlus-products",
//           image: "https://m.media-amazon.com/images/I/61cxmDEW6uL._SR210,210_.png",
//           name: "OnePlus Neckband",
//         },
//         {
//           id: "Urbn-products",
//           image: "https://m.media-amazon.com/images/I/61-v4Zv4FjL._SR210,210_.png",
//           name: "Urbn Power Bank",
//         },
//       ],
//     },
// {
//       id: "Grocery-products",
//       title: "Grocery essentials | Amazon Fresh",

//       products: [
//         {
//           id: "Cooking-products",
//           image: "https://m.media-amazon.com/images/I/71dY3N9o-IL._SR210,210_.png",
//           name: "Cooking essentials",
//         },
//         {
//           id: "Household-products",
//           image: "https://m.media-amazon.com/images/I/71Wt+gTxG9L._SR210,210_.png",
//           name: "Household cleaners",
//         },
//         {
//           id: "Baby-products",
//           image: "https://m.media-amazon.com/images/I/71lL058LBAL._SR210,210_.png",
//           name: "Baby care",
//         },
//         {
//           id: "Visitthestore-products",
//           image: "https://m.media-amazon.com/images/I/51MhEwgBoXL._SR210,210_.png",
//           name: "Visit the store",
//         },
//       ],
//     },
// {
//       id: "Festive -products",
//       title: "Enjoy Prime Festive offers",

//       products: [
//         {
//           id: "Prime-products",
//           image: "https://m.media-amazon.com/images/I/51M4rNHqFeL._SR210,210_.png",
//           name: "Join Prime now",
//         },
//         {
//           id: "Smart_TVs-products",
//           image: "https://m.media-amazon.com/images/I/712RtesDOBL._SR210,210_.png",
//           name: "Smart TVs",
//         },
//         {
//           id: "Beauty-products",
//           image: "https://m.media-amazon.com/images/I/61iB7uOqe+L._SR210,210_.png",
//           name: "Beauty",
//         },
//         {
//           id: "Echos-products",
//           image: "https://m.media-amazon.com/images/I/61WMOgbmIOL._SR210,210_.png",
//           name: "Echo Show 8",
//         },
//       ],
//     },
// {
//       id: "vehicle-products",
//       title: "Budget friendly vehicle essentials",

//       products: [
//         {
//           id: "Helmet-products",
//           image: "https://m.media-amazon.com/images/I/813S9AC1g9L._SR210,210_.png",
//           name: "Starting ₹199 | Hel…",
//         },
//         {
//           id: "car_fresher-products",
//           image: "https://m.media-amazon.com/images/I/813yVi6WPrL._SR210,210_.png",
//           name: "Starting ₹99 | Car fr…",
//         },
//         {
//           id: "car_cover-products",
//           image: "https://m.media-amazon.com/images/I/819xo8GM-QL._SR210,210_.png",
//           name: "Starting ₹99 | Car &…",
//         },
//         {
//           id: "tools-products",
//           image: "https://m.media-amazon.com/images/I/81SifBDQIlL._SR210,210_.png",
//           name: "Starting ₹99 | Vehic…",
//         },
//       ],
//     },

// {
//       id: "budget-home-products",
//       title: "Under ₹499 | Budget friendly home essentials",

//       products: [
//         {
//           id: "furnishing-products",
//           image: "https://m.media-amazon.com/images/I/51U3Q8meETL._SR210,210_.jpg",
//           name: "Home furnishing",
//         },
//         {
//           id: "décor-products",
//           image: "https://m.media-amazon.com/images/I/51EiLlNljoL._SR210,210_.jpg",
//           name: "Home décor",
//         },
//         {
//           id: "Lighting-products",
//           image: "https://m.media-amazon.com/images/I/41uTFFxQXZL._SR210,210_.jpg",
//           name: "Lighting essentials",
//         },
//         {
//           id: "organisers-products",
//           image: "https://m.media-amazon.com/images/I/418YFReH5qL._SR210,210_.jpg",
//           name: "Storage & organisers",
//         },
//       ],
//     },
// {
//       id: "Projectors-products",
//       title: "Up to 70% off | Deals on Projectors",

//       products: [
//         {
//           id: "WZATCO-products",
//           image: "https://m.media-amazon.com/images/I/31AS+iWS+kL._SR210,210_.jpg",
//           name: "WZATCO Yuva Proje…",
//         },
//         {
//           id: "boAt_Cinehead-products",
//           image: "https://m.media-amazon.com/images/I/315FgJhPuWL._SR210,210_.jpg",
//           name: "boAt Cinehead Proj…",
//         },
//         {
//           id: "GoUltra-products",
//           image: "https://m.media-amazon.com/images/I/31DM3TtVoKL._SR210,210_.jpg",
//           name: "WZATCO Go Ultra|…",
//         },
//         {
//           id: "Lumio-products",
//           image: "https://m.media-amazon.com/images/I/31kyHJLMegL._SR210,210_.jpg",
//           name: "Lumio Arc 5 Project…",
//         },
//       ],
//     },
// {
//       id: "Emerging_brands-products",
//       title: "Get festive ready from Emerging brands",

//       products: [
//         {
//           id: "Diyas-products",
//           image: "https://m.media-amazon.com/images/I/81uQw9hSvlL._SR210,210_.png",
//           name: "Starting ₹84 | Diyas…",
//         },
//         {
//           id: "laghaka-products",
//           image: "https://m.media-amazon.com/images/I/81Vk-o8e5GL._SR210,210_.png",
//           name: "Starting ₹299 | Eth…",
//         },
//         {
//           id: "shirtss-products",
//           image: "https://m.media-amazon.com/images/I/81Upr-0KLKL._SR210,210_.png",
//           name: "Starting ₹219 | War…",
//         },
//         {
//           id: "fruits-products",
//           image: "https://m.media-amazon.com/images/I/81WoFc6nUpL._SR210,210_.png",
//           name: "Starting ₹199 | Kitc…",
//         },
//       ],
//     },
// {
//       id: "sales-products",
//       title: "Win big this Great Indian Festival | Rewards worth 20…",

//       products: [
//         {
//           id: "Samsungs-products",
//           image: "https://m.media-amazon.com/images/I/61btLibd5AL._SR210,210_.png",
//           name: "Win Samsung Galax…",
//         },
//         {
//           id: "Spin-products",
//           image: "https://m.media-amazon.com/images/I/71Df06MTG0L._SR210,210_.png",
//           name: "Spin & win up to ₹5…",
//         },
//         {
//           id: "Unlock-products",
//           image: "https://m.media-amazon.com/images/I/71HzKSwHfmL._SR210,210_.png",
//           name: "Unlock flat ₹125 back",
//         },
//         {
//           id: "games-products",
//           image: "https://m.media-amazon.com/images/I/61FBwk0S+WL._SR210,210_.png",
//           name: "Play more games",
//         },
//       ],
//     },
// {
//       id: "vegetables-products",
//       title: "Fruits & vegetables | Amazon Fresh",

//       products: [
//         {
//           id: "Fresh_fruits-products",
//           image: "https://m.media-amazon.com/images/I/81dKE2+KO0L._SR210,210_.png",
//           name: "Fresh fruits",
//         },
//         {
//           id: "Fresh_vegetables-products",
//           image: "https://m.media-amazon.com/images/I/81gkKEkg-SL._SR210,210_.png",
//           name: "Fresh vegetables",
//         },
//         {
//           id: "Season-products",
//           image: "https://m.media-amazon.com/images/I/81IB5f4+6XL._SR210,210_.png",
//           name: "Season's special",
//         },
//         {
//           id: "Fresh-products",
//           image: "https://m.media-amazon.com/images/I/51p5UzV4ZtL._SR210,210_.png",
//           name: "Visit the store",
//         },
//       ],
//     },
// {
//       id: "Groceries-products",
//       title: "Groceries delivered in minutes",

//       products: [
//         {
//           id: "Cheese-products",
//           image: "https://m.media-amazon.com/images/I/711yl+AGVbL._SR210,210_.png",
//           name: "Cheese & slices",
//         },
//         {
//           id: "Paneer-products",
//           image: "https://m.media-amazon.com/images/I/711qxiDlicL._SR210,210_.png",
//           name: "Paneer",
//         },
//         {
//           id: "milk-products",
//           image: "https://m.media-amazon.com/images/I/71X7JRJjS8L._SR210,210_.png",
//           name: "Fresh milk",
//         },
//         {
//           id: "store-products",
//           image: "https://m.media-amazon.com/images/I/71Oi-Rh1ryL._SR210,210_.png",
//           name: "Visit the store",
//         },
//       ],
//     },
// {
//       id: "bestsellers-products",
//       title: "Deals on bestsellers, new launches & more",

//       products: [
//         {
//           id: "Thriller-products",
//           image: "https://m.media-amazon.com/images/I/71NqBqbExFL._SR210,210_.png",
//           name: "Starting ₹99 | Thrill…",
//         },
//         {
//           id: "self-products",
//           image: "https://m.media-amazon.com/images/I/713+iyGXBKL._SR210,210_.png",
//           name: "Starting ₹149 | Self…",
//         },
//         {
//           id: "Business-products",
//           image: "https://m.media-amazon.com/images/I/719GS8cRtVL._SR210,210_.png",
//           name: "Min 35% off | Busin…",
//         },
//         {
//           id: "Lite-products",
//           image: "https://m.media-amazon.com/images/I/71qQW9Q0EcL._SR210,210_.png",
//           name: "Up to 70% off | Lite…",
//         },
//       ],
//     },
// {
//       id: "Pocket-products",
//       title: "Under ₹499 | Pocket friendly home essentials",

//       products: [
//         {
//           id: "furnishing-products",
//           image: "https://m.media-amazon.com/images/I/51DEaCdt2RL._SR210,210_.jpg",
//           name: "Home furnishing",
//         },
//         {
//           id: "décor-products",
//           image: "https://m.media-amazon.com/images/I/41dwsQqXCrL._SR210,210_.jpg",
//           name: "Home décor",
//         },
//         {
//           id: "Lightings-products",
//           image: "https://m.media-amazon.com/images/I/41PPsSoz-4L._SR210,210_.jpg",
//           name: "Lighting essentials",
//         },
//         {
//           id: "Storage-products",
//           image: "https://m.media-amazon.com/images/I/51RPCY0wmDL._SR210,210_.jpg",
//           name: "Storage & organisers",
//         },
//       ],
//     },
// {
//       id: "Electronics-products",
//       title: "Bulk discounts on Electronics + GST credit",

//       products: [
//         {
//           id: "watch-products",
//           image: "https://m.media-amazon.com/images/I/41YijofYzZL._SR210,210_.jpg",
//           name: "Up to 60% off | We…",
//         },
//         {
//           id: "audio-products",
//           image: "https://m.media-amazon.com/images/I/51R9wssIxDL._SR210,210_.jpg",
//           name: "Up to 50% off | Aud…",
//         },
//         {
//           id: "pc-products",
//           image: "https://m.media-amazon.com/images/I/51tWjkyu72L._SR210,210_.jpg",
//           name: "Up to 60% off | PC…",
//         },
//         {
//           id: "discount-products",
//           image: "https://m.media-amazon.com/images/I/41gL4iq0kpL._SR210,210_.jpg",
//           name: "Register for busines…",
//         },
//       ],
//     },
// {
//       id: "GST-products",
//       title: "Business pricing + GST credit",

//       products: [
//         {
//           id: "moto-products",
//           image: "https://m.media-amazon.com/images/I/41ekSOkNFGL._SR210,210_.jpg",
//           name: "Up to 85% off | Mo…",
//         },
//         {
//           id: "kitch-products",
//           image: "https://m.media-amazon.com/images/I/41xl99OQ8GL._SR210,210_.jpg",
//           name: "Up to 50% off | Kitc…",
//         },
//         {
//           id: "upc-products",
//           image: "https://m.media-amazon.com/images/I/41Yj8SoP1TL._SR210,210_.jpg",
//           name: "Up to 60% off | PC…",
//         },
//         {
//           id: "buy-products",
//           image: "https://m.media-amazon.com/images/I/41gL4iq0kpL._SR210,210_.jpg",
//           name: "Buy for business",
//         },
//       ],
//     },
// {
//       id: "home_essentials-products",
//       title: "Deals on home essentials",

//       products: [
//         {
//           id: "Bathroom-products",
//           image: "https://m.media-amazon.com/images/I/81tfQB4O+7L._SR210,210_.png",
//           name: "Bathroom accessories",
//         },
//         {
//           id: "Cleaning-products",
//           image: "https://m.media-amazon.com/images/I/71R20r-tlaL._SR210,210_.png",
//           name: "Cleaning supplies",
//         },
//         {
//           id: "Wallpapers-products",
//           image: "https://m.media-amazon.com/images/I/819THFfMEcL._SR210,210_.png",
//           name: "Wallpapers",
//         },
//         {
//           id: "Electricals-products",
//           image: "https://m.media-amazon.com/images/I/61KEHmeHE1L._SR210,210_.png",
//           name: "Electricals",
//         },
//       ],
//     },
// {
//       id: "Hisense-products",
//       title: "Min 30% off on Hisense and Toshiba TVs",

//       products: [
//         {
//           id: "Toshiba-products",
//           image: "https://m.media-amazon.com/images/I/31CCRbsHEbL._SR210,210_.jpg",
//           name: "Toshiba 50'' UHD TV…",
//         },
//         {
//           id: "Hisenses-products",
//           image: "https://m.media-amazon.com/images/I/31amutXg53L._SR210,210_.jpg",
//           name: "Hisense 55'' UHD TV…",
//         },
//         {
//           id: "Hisense_55-products",
//           image: "https://m.media-amazon.com/images/I/41aimrJdHPL._SR210,210_.jpg",
//           name: "Hisense 55'' QLED T…",
//         },
//         {
//           id: "Hisense_43-products",
//           image: "https://m.media-amazon.com/images/I/31V9TpdPGrL._SR210,210_.jpg",
//           name: "Hisense 43'' UHD TV…",
//         },
//       ],
//     },
// {
//       id: "makeup-products",
//       title: "Deals on beauty & makeup",

//       products: [
//         {
//           id: "cleanser-products",
//           image: "https://m.media-amazon.com/images/I/613Z1Ry-acL._SR210,210_.png",
//           name: "Starting ₹99 | Clean…",
//         },
//         {
//           id: "facescanada-products",
//           image: "https://m.media-amazon.com/images/I/61xFml2t3rL._SR210,210_.png",
//           name: "Under ₹499 | Face…",
//         },
//         {
//           id: "sunscream-products",
//           image: "https://m.media-amazon.com/images/I/6112o+MFgWL._SR210,210_.png",
//           name: "Under ₹499 | Sunscr…",
//         },
//         {
//           id: "perfume-products",
//           image: "https://m.media-amazon.com/images/I/61DyLdWb66L._SR210,210_.png",
//           name: "Starting ₹99 | Deos…",
//         },
//       ],
//     },
// {
//       id: "Fitness-products",
//       title: "Fitness & sports essentials",

//       products: [
//         {
//           id: "sports-products",
//           image: "https://m.media-amazon.com/images/I/71b+dCA5N2L._SR210,210_.png",
//           name: "Starting ₹179 | Fitn…",
//         },
//         {
//           id: "rack-products",
//           image: "https://m.media-amazon.com/images/I/81rPZiINBcL._SR210,210_.png",
//           name: "Starting ₹189 | Rac…",
//         },
//         {
//           id: "dubbel-products",
//           image: "https://m.media-amazon.com/images/I/81bykuqG0HL._SR210,210_.png",
//           name: "Starting ₹189 | Du…",
//         },
//         {
//           id: "football-products",
//           image: "https://m.media-amazon.com/images/I/81aTMK7UGtL._SR210,210_.png",
//           name: "Starting ₹129 | Foot…",
//         },
//       ],
//     },




//   ];


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

          <div
            className="home-product-card"
            key={card.id}
            onClick={() =>
              navigate(`/category/${card.id}`)
            }
          >

          

            <div className="card-title">

              <h2>
                {card.title}
              </h2>

              <span
                className="card-arrow"
                onClick={(e) => {
                  e.stopPropagation();

                  navigate(
                    `/category/${card.id}`
                  );
                }}
              >
                ›
              </span>

            </div>


      

            <div className="product-grid">

              {card.products.map((product) => (

                <div
                  className="product-item"
                  key={product.id}

                 onClick={(e) => {
  e.stopPropagation();

  navigate(`/product/${encodeURIComponent(product.id)}`, {
    state: {
      product: {
        ...product,
        cartKey: `${card.id}-${product.id}`,
      },
    },
  });
}}
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