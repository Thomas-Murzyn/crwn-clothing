import {
  CheckoutItemContainer,
  ImageContainer,
  Arrow,
  BaseSpan,
  Quantity,
  RemoveButton,
  Value,
} from "./checkout-item.styles.js";
import { CartContext } from "../../contexts/cart.context";

import { useContext } from "react";

function CheckoutItem({ item }) {
  const { removeItemFromCart, addItemToCart, removeQuantityToCart } =
    useContext(CartContext);
  const { imageUrl, name, quantity, id, price } = item;

  const removeItem = () => {
    removeItemFromCart({ ...item });
  };

  const addQuantity = () => {
    addItemToCart({ ...item });
  };

  const removeQuantity = () => {
    removeQuantityToCart({ ...item });
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
