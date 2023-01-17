import {
  CartDropDownContainer,
  CartItemContainer,
  EmptyMessage,
} from "./cart-dropdown.styles.js";
import Button from "../button/button.component";
import CartItem from "../cart-item/cart-item.component";

import { useNavigate } from "react-router-dom";
import { selectCartItems } from "../../store/cart/cart.selector.js";
import { useSelector } from "react-redux";

function CartDropDown() {
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();

  const goToCheckout = () => {
    navigate("/checkout");
  };

  return (
    <CartDropDownContainer>
      <CartItemContainer>
        {cartItems.length ? (
          cartItems.map((item) => {
            return <CartItem key={item.id} cartItem={item} />;
          })
        ) : (
          <EmptyMessage>Your cart is empty</EmptyMessage>
        )}
      </CartItemContainer>
      <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
    </CartDropDownContainer>
  );
}

export default CartDropDown;
