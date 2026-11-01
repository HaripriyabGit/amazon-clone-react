
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      return JSON.parse(
        localStorage.getItem("amazonCart") || "[]"
      );
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(
      "amazonCart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product) => {
    setCartItems((previous) => {
      const existing = previous.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existing) {
        return previous.map((item) =>
          String(item.id) === String(product.id)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((previous) =>
      previous.filter((item) => String(item.id) !== String(id))
    );
  };

  const updateQuantity = (id, change) => {
    setCartItems((previous) =>
      previous.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: Math.max(1, item.quantity + change),
            }
          : item
      )
    );
  };

  const clearCart = () => setCartItems([]);

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const cartTotal = cartItems.reduce(
    (total, item) =>
      total + (Number(item.price) || 0) * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
