"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  //  Load cart from localStorage when app starts
  useEffect(() => {
    const storedCart = localStorage.getItem("cloudcart-cart");

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  //  Save cart to localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem(
      "cloudcart-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {

  setCartItems(prevItems => {

    const existing = prevItems.find(item => item.id === product.id);

    if (existing) {
      return prevItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    }

    return [
      ...prevItems,
      { ...product, quantity }
    ];

  });

};

  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  const increaseQuantity = (id) => {
  setCartItems((prev) =>
    prev.map((item) =>
      item.id === id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (id) => {
  setCartItems((prev) =>
    prev
      .map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

  return (
    <CartContext.Provider
  value={{
    cartItems,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  }}
>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
