"use client";

import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {

  const [cartItems, setCartItems] = useState([]);

  //  Load cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cloudcart-cart");

    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

  //  Save cart to localStorage
  useEffect(() => {
    localStorage.setItem(
      "cloudcart-cart",
      JSON.stringify(cartItems)
    );
  }, [cartItems]);

  //  Add to cart
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

  //  Remove item
  const removeFromCart = (id) => {
    setCartItems(prev =>
      prev.filter(item => item.id !== id)
    );
  };

  //  Increase quantity
  const increaseQuantity = (id) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  //  Decrease quantity
  const decreaseQuantity = (id) => {
    setCartItems(prev =>
      prev
        .map(item =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
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
        setCartItems, //  IMPORTANT (for checkout)
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}