import { CART_ACTION_TYPES } from "./cart.type";
import { createAction } from "../../utils/reducer/reducer.utils";

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

export const setIsCartOpen = (bool) => {
  return createAction(CART_ACTION_TYPES.TOGGLE_CART_OPEN, bool);
};

export const removeItemFromCart = (cartItems, product) => {
  const newCartItems = removeCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};

export const addItemToCart = (cartItems, product) => {
  const newCartItems = addCartItem(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};

export const clearCart = () => {
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, []);
};

export const removeQuantityToCart = (cartItems, product) => {
  const newCartItems = removeQuantity(cartItems, product);
  return createAction(CART_ACTION_TYPES.SET_CART_ITEM, newCartItems);
};
