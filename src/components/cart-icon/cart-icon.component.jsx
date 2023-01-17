import {
  ShoppingIcon,
  CartIconContainer,
  CountItem,
} from "./cart-icon.styles.js";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import {
  selectCartCount,
  selectIsCartOpen,
} from "../../store/cart/cart.selector.js";

function CartIcon() {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggle = () => {
    dispatch(setIsCartOpen(!isCartOpen));
  };

  return (
    <CartIconContainer onClick={toggle}>
      <ShoppingIcon />
      <CountItem>{cartCount}</CountItem>
    </CartIconContainer>
  );
}

export default CartIcon;
