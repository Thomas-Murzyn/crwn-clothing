import {
  ShoppingIcon,
  CartIconContainer,
  CountItem,
} from "./cart-icon.styles.js";
import { CartContext } from "../../contexts/cart.context";

import { useContext } from "react";

function CartIcon() {
  const { isCartOpen, setIsCartOpen, cartCount } = useContext(CartContext);

  const toggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartIconContainer onClick={toggle}>
      <ShoppingIcon />
      <CountItem>{cartCount}</CountItem>
    </CartIconContainer>
  );
}

export default CartIcon;
