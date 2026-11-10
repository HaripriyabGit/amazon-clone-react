import { cards as sourceCards } from "./products";

const categoryMeta = {
  "smart-home": { department: "Amazon Devices", brand: "Amazon" },
  "daily-needs": { department: "Grocery & Gourmet Foods" },
  "home-entertainment": { department: "Electronics" },
  "home-improvements": { department: "Tools & Home Improvement" },
  "home-products": { department: "Home & Kitchen" },
  "alexa-products": { department: "Amazon Devices", brand: "Amazon" },
  "dress-products": { department: "Clothing & Accessories" },
  "wholesale-products": { department: "Electronics" },
  "pet-products": { department: "Pet Supplies" },
  "Amazon-products": { department: "Home & Kitchen" },
  "fruits-products": { department: "Grocery & Gourmet Foods" },
  "Printers-products": { department: "Computers & Accessories" },
  "homes-products": { department: "Home & Kitchen" },
  "Premium-products": { department: "Computers & Accessories" },
  "outdoor-products": { department: "Sports, Fitness & Outdoors" },
  "headphone-products": { department: "Electronics" },
  "cameras": { department: "Electronics" },
  "Books": { department: "Books" },
  "brand-dress-products": { department: "Amazon Fashion" },
  "Kides_books": { department: "Toys & Games" },
  "remote_control": { department: "Toys & Games" },
  "footwear-products": { department: "Shoes & Handbags" },
  "mobile-products": { department: "Mobiles" },
  "Grocery-products": { department: "Amazon Fresh" },
  "Festive -products": { department: "Deals" },
  "vehicle-products": { department: "Car & Motorbike" },
  "budget-home-products": { department: "Home & Kitchen" },
  "Projectors-products": { department: "Electronics" },
  "Emerging_brands-products": { department: "Amazon Fashion" },
  "sales-products": { department: "Deals" },
  "vegetables-products": { department: "Amazon Fresh" },
  "Groceries-products": { department: "Grocery & Gourmet Foods" },
  "bestsellers-products": { department: "Deals" },
  "Pocket-products": { department: "Home & Kitchen" },
  "Electronics-products": { department: "Electronics" },
  "GST-products": { department: "Office Products" },
  "home_essentials-products": { department: "Home & Kitchen" },
  "Hisense-products": { department: "Electronics", brand: "Hisense" },
  "makeup-products": { department: "Beauty" },
  "Fitness-products": { department: "Sports, Fitness & Outdoors" },
};

const priceBands = {
  "Amazon Devices": [1999, 14999],
  "Grocery & Gourmet Foods": [99, 899],
  "Amazon Fresh": [39, 499],
  Electronics: [799, 54999],
  "Home & Kitchen": [199, 6999],
  "Tools & Home Improvement": [249, 8999],
  "Clothing & Accessories": [299, 2499],
  "Amazon Fashion": [349, 3499],
  "Pet Supplies": [149, 2499],
  "Computers & Accessories": [499, 12999],
  "Sports, Fitness & Outdoors": [199, 5999],
  Books: [149, 999],
  "Toys & Games": [199, 3499],
  "Shoes & Handbags": [399, 3999],
  Mobiles: [199, 2999],
  Deals: [299, 9999],
  Beauty: [149, 1799],
  "Office Products": [199, 5999],
  "Car & Motorbike": [199, 4999],
};

const departmentAliases = {
  "Alexa Skills": ["Amazon Devices"],
  Appliances: ["Electronics", "Home & Kitchen"],
  Baby: ["Toys & Games", "Grocery & Gourmet Foods"],
  "Health & Personal Care": ["Beauty"],
  Jewellery: ["Amazon Fashion"],
  "Luggage & Bags": ["Amazon Fashion", "Clothing & Accessories"],
  "Garden & Outdoors": ["Sports, Fitness & Outdoors", "Home & Kitchen"],
  "Video Games": ["Toys & Games"],
  Watches: ["Amazon Fashion"],
  "Apps & Games": ["Toys & Games"],
  Furniture: ["Home & Kitchen"],
};

const realisticNames = {
  "cleaning-products": "Harpic Disinfectant Bathroom Cleaner, Lemon, 1 L",
  "oil-products": "Fortune Sunlite Refined Sunflower Oil, 1 L",
  "tea-products": "Tata Tea Gold, 500 g",
  "baby-products": "Himalaya Baby Lotion, 400 ml",
  "electrical-accessories": "Anchor 6A Electrical Switch and Socket Set",
  ladders: "Bathla 5-Step Aluminium Ladder",
  "security-cameras": "TP-Link Tapo Indoor Security Camera",
  "business-products": "Amazon Basics Office Stationery Combo",
  "clock-products": "Ajanta Analog Wall Clock, 28 cm",
  "pillow-products": "SleepyCat Orthopaedic Memory Foam Pillow",
  "candle-products": "Iris Scented Soy Candle, Lavender",
  "Floor-products": "Saral Home Cotton Floor Mat, 50 x 80 cm",
  "fire-products": "Amazon Fire TV Stick with Alexa Voice Remote",
  "plug-products": "Amazon Smart Plug, Works with Alexa",
  "samsung-products": "Samsung 32-inch HD Ready LED Smart TV",
  "echospot-products": "Echo Spot Smart Alarm Clock with Alexa",
  "kurta-products": "Anouk Women Cotton Printed Kurta",
  "jumpsuits-products": "Max Women Solid Jumpsuit",
  "T-shirt-products": "Symbol Men Cotton Crew T-Shirt",
  "Formalwear-products": "Peter England Men Slim Fit Formal Shirt",
  "dog-products": "Pedigree Adult Dry Dog Food, Chicken, 3 kg",
  "cat-products": "Whiskas Adult Dry Cat Food, Ocean Fish, 1.2 kg",
  "birds-products": "Boltz Bird Food Mix with Seeds, 1 kg",
  "Aquatic-products": "Taiyo Fish Food, 100 g",
  "organizers-products": "Amazon Basics Foldable Fabric Storage Organizer",
  "decor-products": "ExclusiveLane Ceramic Table Decor Set",
  "Bedsheets-products": "Story@Home Cotton Double Bedsheet with 2 Pillow Covers",
  "Shop-products": "Home Centre Cotton Cushion Cover, Set of 2",
  "almonds-products": "Happilo California Almonds, 500 g",
  "dates-products": "Lion Arabian Dates, 500 g",
  "cashew-products": "Tulsi Cashews, Whole, 500 g",
  "chia-products": "True Elements Raw Chia Seeds, 500 g",
  "Printers-products": "HP DeskJet Ink Advantage All-in-One Printer",
  "tank-products": "Epson EcoTank Colour Ink Tank Printer",
  "WIFI-products": "TP-Link AC1200 Wi-Fi Router",
  "Routers-products": "D-Link Dual Band Wi-Fi 6 Router",
  "bed-products": "Wakefit Orthopedic Coir Mattress, Queen",
  "teddy-products": "Archies Soft Teddy Bear, 30 cm",
  "light-products": "Philips 9W LED Bulb, Pack of 4",
  "show-products": "Milton Stainless Steel Water Bottle, 1 L",
  "Logitech-products": "Logitech M221 Wireless Mouse",
  "HP-products": "HP 15s Laptop Backpack, Water Resistant",
  "Asus-products": "ASUS VivoBook 14 Laptop Sleeve",
  "dell-products": "Dell KB216 Wired Keyboard",
  "guns-products": "Nerf Elite Blaster Toy",
  "ride-ons-products": "Toyzone Kids Ride-On Car with Remote",
  "Bikes-products": "Hero Blast 16-inch Kids Bicycle",
  Slides: "Funskool Outdoor Garden Slide",
  "boAt-products": "boAt Rockerz 450 Bluetooth Headphones",
  "Boult-products": "Boult Audio Z40 True Wireless Earbuds",
  "Noise-products": "Noise Buds VS104 TWS Earbuds",
  "Zebronics-products": "Zebronics Zeb-Thunder Wired Headphones",
  "Mirrorless cameras": "Canon EOS M50 Mark II Mirrorless Camera",
  Dash_cameras: "Qubo Car Dash Camera, Full HD",
  Action_cameras: "GoPro HERO Action Camera",
  Register: "Amazon Business Seller Registration Kit",
  Dress: "Biba Women Anarkali Dress",
  Kurta: "W for Woman Cotton Kurta",
  "T-Shirt": "Allen Solly Men Polo T-Shirt",
  "Shirt-products": "Van Heusen Men Formal Shirt",
  "Sticker-products": "Sticker Bazaar Kids Activity Sticker Book",
  "Activity-products": "Skillmatics Art Activity Kit",
  "STEM-products": "Smartivity STEM Building Kit",
  "Earlylearning-products": "Funskool Early Learning Flash Cards",
  "echo-spot": "Echo Spot Smart Display with Alexa",
  "echo-dot-max": "Echo Dot Max Smart Speaker with Alexa",
  "echo-studio": "Echo Studio Premium Smart Speaker",
  "echo-dot": "Echo Dot 5th Gen Smart Speaker",
  "samsung-tv": "Samsung 43-inch Crystal UHD 4K Smart TV",
  "fire-tv-stick": "Amazon Fire TV Stick HD with Alexa Voice Remote",
  "xiaomi-tv": "Xiaomi 55-inch QLED Ultra HD Smart TV",
  "fire-tv-cube": "Amazon Fire TV Cube Streaming Media Player",
  "tv-products": "Dell 24-inch Full HD Office Monitor",
  "tv1-products": "Lenovo IdeaPad 3 Laptop, 8 GB RAM",
  "tv2-products": "HP LaserJet Pro Printer, Wi-Fi",
  "tv4-products": "Amazon Basics Business Keyboard and Mouse",
  "Helmet-products": "Steelbird Helmet with Clear Visor",
  "car_fresher-products": "Areon Car Air Freshener, Ocean",
  "car_cover-products": "Amazon Basics Waterproof Car Cover",
  "tools-products": "Bosch 46-piece Vehicle Tool Kit",
  "WZATCO-products": "WZATCO Yuva Portable Projector",
  "boAt_Cinehead-products": "boAt Cinehead Full HD Projector",
  "GoUltra-products": "WZATCO Go Ultra Smart Projector",
  "Lumio-products": "Lumio Arc 5 Home Projector",
  "Diyas-products": "CraftVatika Brass Diya Set of 6",
  "laghaka-products": "Biba Women Ethnic Kurta Set",
  "shirtss-products": "Allen Solly Men Casual Shirt",
  "fruits-products": "Pigeon Non-stick Cookware Set",
  "Samsungs-products": "Samsung Galaxy M15 5G Smartphone",
  "Spin-products": "Amazon Festival Spin and Win Voucher",
  "Unlock-products": "Amazon Pay Gift Card, ₹125",
  "games-products": "Skillmatics Board Game Combo",
  "Thriller-products": "The Silent Patient Paperback",
  "self-products": "Atomic Habits by James Clear",
  "Business-products": "The Lean Startup Paperback",
  "Lite-products": "Amazon Kindle Paperwhite",
  "watch-products": "Noise ColorFit Pro 4 Smartwatch",
  "audio-products": "JBL Tune 510BT Headphones",
  "pc-products": "Logitech MK270 Wireless Keyboard Mouse",
  "discount-products": "Amazon Business Registration Guide",
  "moto-products": "Motorola G64 5G Smartphone",
  "kitch-products": "Prestige Popular Pressure Cooker, 5 L",
  "upc-products": "HP 15s Laptop, Intel Core i3",
  "buy-products": "Amazon Business Starter Kit",
  "Toshiba-products": "Toshiba 50-inch 4K Ultra HD Smart TV",
  "Hisenses-products": "Hisense 55-inch 4K Ultra HD Smart TV",
  "Hisense_55-products": "Hisense 55-inch QLED 4K Smart TV",
  "Hisense_43-products": "Hisense 43-inch 4K Ultra HD Smart TV",
  "cleanser-products": "Mamaearth Ubtan Face Cleanser, 100 ml",
  "facescanada-products": "Faces Canada Ultime Pro Makeup Kit",
  "sunscream-products": "Minimalist SPF 50 Sunscreen, 50 g",
  "perfume-products": "Nivea Men Deodorant, 150 ml",
  "sports-products": "Boldfit Yoga Mat, 6 mm",
  "rack-products": "Amazon Basics Dumbbell Rack",
  "dubbel-products": "Kore PVC Dumbbells, 5 kg Pair",
  "football-products": "Nivia Storm Football, Size 5",
  "JEE_Main+Adv": "Arihant JEE Main and Advanced Mathematics",
  "NEET_AIIMS": "MTG NEET Biology Guide",
  "UGC_NET_CTET": "Arihant UGC NET Paper 1 Guide",
  UPSC: "Spectrum Modern India for UPSC",
  "OnePlus-products": "OnePlus Nord Buds 2 True Wireless Earbuds",
  "Realme-products": "realme Buds T300 Wireless Earbuds",
  "Urbn-products": "URBN 20000 mAh Power Bank",
};

const brandHints = [
  ["samsung", "Samsung"],
  ["xiaomi", "Xiaomi"],
  ["logitech", "Logitech"],
  ["boat", "boAt"],
  ["boult", "Boult"],
  ["noise", "Noise"],
  ["zebronics", "Zebronics"],
  ["hisense", "Hisense"],
  ["toshiba", "Toshiba"],
  ["hp", "HP"],
  ["asus", "ASUS"],
  ["dell", "Dell"],
  ["canon", "Canon"],
  ["echo", "Amazon"],
  ["fire", "Amazon"],
  ["alexa", "Amazon"],
];

const localImageFallbacks = {
  "/images/echo1.jpg":
    "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1600&q=90",
  "/images/echo2.jpg":
    "https://images.unsplash.com/photo-1589003077984-894e133dabab?auto=format&fit=crop&w=1600&q=90",
  "/images/echo3.jpg":
    "https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=1600&q=90",
  "/images/echo4.jpg":
    "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&w=1600&q=90",
  "/images/product1.jpg":
    "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=1600&q=90",
  "/images/product2.jpg":
    "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?auto=format&fit=crop&w=1600&q=90",
  "/images/product3.jpg":
    "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?auto=format&fit=crop&w=1600&q=90",
  "/images/product4.jpg":
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?auto=format&fit=crop&w=1600&q=90",
  "/images/tv1.jpg":
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1600&q=90",
  "/images/tv2.jpg":
    "https://images.unsplash.com/photo-1593784991095-a4c3f5593b1d?auto=format&fit=crop&w=1600&q=90",
  "/images/tv3.jpg":
    "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1600&q=90",
  "/images/tv4.jpg":
    "https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1600&q=90",
  "/images/home1.jpg":
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=90",
  "/images/home2.jpg":
    "https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=1600&q=90",
  "/images/home3.jpg":
    "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1600&q=90",
  "/images/home4.jpg":
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1600&q=90",
  "/images/home11.jpg":
    "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1600&q=90",
  "/images/home12.jpg":
    "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=1600&q=90",
  "/images/home13.jpg":
    "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=1600&q=90",
  "/images/home14.jpg":
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1600&q=90",
  "/images/alexa1.jpg":
    "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?auto=format&fit=crop&w=1600&q=90",
  "/images/alexa2.jpg":
    "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=1600&q=90",
  "/images/alexa3.jpg":
    "https://images.unsplash.com/photo-1461151304267-38535e780c79?auto=format&fit=crop&w=1600&q=90",
  "/images/alexa4.jpg":
    "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&w=1600&q=90",
  "/images/dress1.jpg":
    "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=1600&q=90",
  "/images/dress2.jpg":
    "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=1600&q=90",
  "/images/dress3.jpg":
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1600&q=90",
  "/images/dress4.jpg":
    "https://images.unsplash.com/photo-1594938291221-94f18cbb5660?auto=format&fit=crop&w=1600&q=90",
  "/images/whole1.jpg":
    "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1600&q=90",
  "/images/whole2.jpg":
    "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=1600&q=90",
  "/images/whole3.jpg":
    "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=1600&q=90",
  "/images/whole4.jpg":
    "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=1600&q=90",
  "/images/pet1.jpg":
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=1600&q=90",
  "/images/pet2.jpg":
    "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=1600&q=90",
  "/images/pet3.jpg":
    "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=1600&q=90",
  "/images/pet4.jpg":
    "https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=1600&q=90",
};

function resolveImage(image) {
  if (typeof image !== "string") return image;

  // Amazon image resolution
  if (image.includes("m.media-amazon.com")) {
    return image.replace(
      /\._SR\d+,\d+_/,
      "._SL1500_"
    );
  }

  // Unsplash high resolution
  if (localImageFallbacks[image]) {
    return localImageFallbacks[image].replace(
      /w=\d+&q=\d+/,
      "w=1600&q=90"
    );
  }

  return image;
}
function hashId(value) {
  let hash = 0;
  const text = String(value);

  for (let index = 0; index < text.length; index += 1) {
    hash = (hash * 33 + text.charCodeAt(index)) >>> 0;
  }

  return hash;
}

function titleFromId(id) {
  return String(id)
    .replace(/products/gi, "")
    .replace(/[-_]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function displayName(product) {
  if (realisticNames[product.id]) return realisticNames[product.id];

  const name = String(product.name || "").trim();
  const looksLikeDeal = /₹|under |starting |up to |min \d/i.test(name);

  if (!looksLikeDeal && name.length > 6 && !name.endsWith("…")) {
    return name;
  }

  return titleFromId(product.id) || name;
}

function brandFor(product, meta) {
  if (meta.brand) return meta.brand;
  if (product.brand && product.brand !== "Generic") return product.brand;

  const haystack = `${product.id} ${product.name}`.toLowerCase();
  const match = brandHints.find(([hint]) => haystack.includes(hint));
  return match ? match[1] : "Amazon Brand";
}

const categoryBands = {
  "smart-home": [2499, 14999],
  "alexa-products": [999, 7999],
  "headphone-products": [499, 3999],
  "mobile-products": [199, 2499],
  "home-entertainment": [3999, 54999],
  "Hisense-products": [14999, 54999],
  "Projectors-products": [4999, 29999],
  cameras: [2999, 45999],
  "makeup-products": [149, 1499],
  "footwear-products": [399, 3499],
  Books: [149, 899],
  "Kides_books": [149, 999],
  "fruits-products": [99, 799],
  "Grocery-products": [39, 499],
  "Groceries-products": [49, 699],
  "vegetables-products": [29, 299],
};

function priceFor(routeId, department, categoryId) {
  const [min, max] =
    categoryBands[categoryId] || priceBands[department] || [199, 4999];
  const span = Math.max(10, max - min);
  const raw = min + (hashId(routeId) % span);
  const rounded = Math.round(raw / 10) * 10;
  return Math.max(min, rounded) - 1;
}

export const cards = sourceCards.map((category) => {
  const meta = categoryMeta[category.id] || {
    department: "Home & Kitchen",
  };

  return {
    ...category,
    department: meta.department,
    products: category.products.map((product) => {
      const routeId = `${category.id}--${product.id}`;
      const price = priceFor(routeId, meta.department, category.id);
      const discount = 10 + (hashId(routeId) % 41);
      const originalPrice = Math.round(price / (1 - discount / 100));
      const rating = Number((3.8 + (hashId(routeId) % 12) / 10).toFixed(1));
      const reviewCount = 80 + (hashId(`${routeId}-reviews`) % 9000);
      const name = displayName(product);
      const highlights = [
        `${name} from ${brandFor(product, meta)}.`,
        product.features && product.features !== category.title
          ? product.features
          : "Packed for everyday use with a 1-year limited warranty.",
        "Eligible for easy returns within 7 days of delivery.",
        meta.department === "Amazon Fresh" ||
        meta.department === "Grocery & Gourmet Foods"
          ? "Pantry packaging. Check the expiry date on delivery."
          : "Ships from Amazon fulfilment with secure packaging.",
      ];

      return {
        ...product,
        id: routeId,
        routeId,
        sourceId: product.id,
        image: resolveImage(product.image),
        name,
        categoryId: category.id,
        category: meta.department,
        categoryTitle: category.title,
        department: meta.department,
        brand: brandFor(product, meta),
        price,
        originalPrice,
        discount,
        rating: Math.min(rating, 5),
        reviewCount,
        bought: `${100 + (hashId(routeId) % 4000)}+ bought in past month`,
        description: `${name}. ${category.title}.`,
        features: highlights[0],
        highlights,
        delivery: price >= 499 ? "FREE delivery" : "Delivery charge ₹40",
        freeShipping: price >= 499,
        availability: "In Stock",
        seller: "Amazon Retail",
      };
    }),
  };
});

export const allProducts = cards.flatMap((category) => category.products);

export function findProduct(id) {
  if (!id) return null;

  const decoded = decodeURIComponent(String(id));

  return (
    allProducts.find(
      (product) =>
        product.routeId === decoded ||
        product.id === decoded ||
        product.sourceId === decoded ||
        `${product.categoryId}-${product.sourceId}` === decoded
    ) || null
  );
}

export function matchesDepartment(product, category) {
  const selected = String(category || "All Categories")
    .replace(/\s+/g, " ")
    .trim();

  if (!selected || selected === "All Categories") return true;
  if (product.department === selected) return true;
  if (product.categoryTitle === selected) return true;

  return (departmentAliases[selected] || []).includes(product.department);
}

export function searchProducts({
  query = "",
  category = "All Categories",
  sortBy = "featured",
} = {}) {
  const text = query.trim().toLowerCase();
  const tokens = text.split(/\s+/).filter(Boolean);

  let results = allProducts.filter((product) => {
    const haystack = [
      product.name,
      product.brand,
      product.department,
      product.categoryTitle,
      product.sourceId,
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery =
      tokens.length === 0 || tokens.every((token) => haystack.includes(token));
    return matchesQuery && matchesDepartment(product, category);
  });

  if (sortBy === "low") {
    results = [...results].sort((a, b) => a.price - b.price);
  } else if (sortBy === "high") {
    results = [...results].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    results = [...results].sort((a, b) => b.rating - a.rating);
  }

  return results;
}

export function relatedProducts(product, limit = 4) {
  if (!product) return [];

  return allProducts
    .filter(
      (item) =>
        item.categoryId === product.categoryId && item.routeId !== product.routeId
    )
    .slice(0, limit);
}

export function categoryPath(id) {
  return `/category/${encodeURIComponent(id)}`;
}

export function productPath(id) {
  return `/product/${encodeURIComponent(id)}`;
}

export const navCategories = [
  { label: "Echo & Alexa", categoryId: "smart-home" },
  { label: "Mobiles", categoryId: "mobile-products" },
  { label: "Today's Deals", categoryId: "sales-products" },
  { label: "Electronics", categoryId: "Electronics-products" },
  { label: "Computers", categoryId: "Premium-products" },
  { label: "Fashion", categoryId: "dress-products" },
  { label: "Home & Kitchen", categoryId: "home-products" },
  { label: "Grocery", categoryId: "Grocery-products" },
  { label: "Beauty", categoryId: "makeup-products" },
  { label: "Books", categoryId: "Books" },
  { label: "Toys", categoryId: "remote_control" },
  { label: "Pet Supplies", categoryId: "pet-products" },
  { label: "Sports", categoryId: "Fitness-products" },
  { label: "Bestsellers", categoryId: "bestsellers-products" },
];
