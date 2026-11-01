
import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import Header from "./components/Header";
import CategoryNavbar from "./components/CategoryNavbar";

import Home from "./pages/Home";

import Login from "./pages/Login";
import Footer from "./components/Footer";
import ProductList from "./pages/ProductList";
import Compare from "./pages/Compare";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";

import { CartProvider } from "./pages/CartContext";
import Account from "./pages/Account";
import Orders from "./pages/Orders";

import Wishlist from "./pages/Wishlist";
import Checkout from "./pages/Checkout";
import ProductDetails from "./pages/ProductDetails";

function AppContent() {
  const location = useLocation();

  const isLoginPage = location.pathname === "/login";

  return (
    <>
      {!isLoginPage && <Header />}

      {!isLoginPage && <CategoryNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/category/:id"
          element={<ProductList />}
        />

        <Route
          path="/compare"
          element={<Compare />}
        />

        <Route
          path="/cart"
          element={<Cart />}
        />

        
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />
        <Route path="/account" element={<Account />} />
        <Route path="/orders" element={<Orders />} />
       
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route
  path="/product/:id"
  element={<ProductDetails />}
/>
      </Routes>

      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
