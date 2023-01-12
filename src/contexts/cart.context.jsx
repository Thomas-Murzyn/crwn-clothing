import { createContext, useState, useEffect } from "react";

const findItem = (items, product) => {
  return items.findIndex((item) => item.id === product.id);
};

const addCartItem = (cartItems, productToAdd) => {
  const newCartItems = [...cartItems];
  const itemFound = findItem(newCartItems, productToAdd);

  if (itemFound !== -1) {
    newCartItems[itemFound].quantity = newCartItems[itemFound].quantity + 1;
    return newCartItems;
  }

  newCartItems.push({ ...productToAdd, quantity: 1 });
  return newCartItems;
};

const removeCartItem = (cartItems, productToRemove) => {
  const newCartItems = [...cartItems];
  const itemFound = findItem(newCartItems, productToRemove);

  if (itemFound !== -1) {
    newCartItems.splice(itemFound, 1);
    return newCartItems;
  }

  return;
};

const removeQuantity = (cartItems, productToRemove) => {
  const newCartItems = [...cartItems];
  const itemFound = findItem(newCartItems, productToRemove);

  if (itemFound !== -1) {
    newCartItems[itemFound].quantity = newCartItems[itemFound].quantity - 1;
    if (newCartItems[itemFound].quantity === 0) {
      newCartItems.splice(itemFound, 1);
      return newCartItems;
    }
    return newCartItems;
  }

  return;
};

export const CartContext = createContext({
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  total: 0,
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  removeQuantityToCart: () => null,
});

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  const addItemToCart = (productToAdd) => {
    setCartItems(addCartItem(cartItems, productToAdd));
  };

  const removeItemFromCart = (productToRemove) => {
    setCartItems(removeCartItem(cartItems, productToRemove));
  };

  const removeQuantityToCart = (product) => {
    setCartItems(removeQuantity(cartItems, product));
  };

  useEffect(() => {
    setCartCount(cartItems.reduce((a, b) => a + b.quantity, 0));
  }, [cartItems]);

  useEffect(() => {
    setTotal(cartItems.reduce((a, b) => a + b.quantity * b.price, 0));
  }, [cartItems]);

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    removeQuantityToCart,
    total,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
