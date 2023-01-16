import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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
  cartTotal: 0,
  setIsCartOpen: () => null,
  addItemToCart: () => null,
  removeItemFromCart: () => null,
  removeQuantityToCart: () => null,
});

const INITIAL_STATE = {
  cartItems: [],
  isCartOpen: false,
  cartCount: 0,
  cartTotal: 0,
};

export const CART_ACTION_TYPES = {
  SET_CART_ITEM: "SET_CART_ITEM",
  TOGGLE_CART_OPEN: "TOGGLE_CART_OPEN",
};

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_ACTION_TYPES.SET_CART_ITEM:
      return {
        ...state,
        ...payload,
      };

    case CART_ACTION_TYPES.TOGGLE_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const CartProvider = ({ children }) => {
  const [{ cartItems, isCartOpen, cartCount, cartTotal }, dispatch] =
    useReducer(cartReducer, INITIAL_STATE);

  const updateCartItemReducer = (newCartItems) => {
    const newCartCount = newCartItems.reduce(
      (total, item) => total + item.quantity,
      0
    );
    const newCartTotal = newCartItems.reduce(
      (total, item) => total + item.quantity * item.price,
      0
    );

    dispatch(
      createAction(CART_ACTION_TYPES.SET_CART_ITEM, {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal,
      })
    );
  };

  const setIsCartOpen = (bool) => {
    dispatch(createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool));
  };

  const removeItemFromCart = (product) => {
    const newCartItems = removeCartItem(cartItems, product);
    updateCartItemReducer(newCartItems);
  };

  const addItemToCart = (product) => {
    const newCartItems = addCartItem(cartItems, product);
    updateCartItemReducer(newCartItems);
  };

  const removeQuantityToCart = (product) => {
    const newCartItems = removeQuantity(cartItems, product);
    updateCartItemReducer(newCartItems);
  };

  const value = {
    cartItems,
    isCartOpen,
    setIsCartOpen,
    cartCount,
    cartTotal,
    removeItemFromCart,
    addItemToCart,
    removeQuantityToCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartProvider;
