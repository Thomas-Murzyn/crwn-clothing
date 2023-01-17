import {
  CheckoutItemContainer,
  ImageContainer,
  Arrow,
  BaseSpan,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles.js";
import {
  removeItemFromCart,
  addItemToCart,
  removeQuantityToCart,
} from "../../store/cart/cart.action";
import { useDispatch, useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";

function CheckoutItem({ item }) {
  const { imageUrl, name, quantity, id, price } = item;
  const cartItems = useSelector(selectCartItems);
  const dispatch = useDispatch();

  const removeItem = () => {
    dispatch(removeItemFromCart(cartItems, item));
  };

  const addQuantity = () => {
    dispatch(addItemToCart(cartItems, item));
  };

  const removeQuantity = () => {
    dispatch(removeQuantityToCart(cartItems, item));
  };

  return (
    <CheckoutItemContainer key={id}>
      <ImageContainer>
        <img src={imageUrl} alt={name} />
      </ImageContainer>

      <BaseSpan>{name}</BaseSpan>
      <Quantity quantity>
        <Arrow onClick={removeQuantity}>&#10094;</Arrow>
        <Value value>{quantity}</Value>
        <Arrow onClick={addQuantity}>&#10095;</Arrow>
      </Quantity>
      <BaseSpan price>{price * quantity}</BaseSpan>
      <RemoveButton removeButton onClick={removeItem}>
        &#10005;
      </RemoveButton>
    </CheckoutItemContainer>
  );
}

export default CheckoutItem;
