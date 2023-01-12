import { CartItemContainer, ItemDetail, Name } from "./cart-item.styles.js";

function CartItem({ cartItem }) {
  const { name, quantity, price, imageUrl } = cartItem;
  return (
    <CartItemContainer>
      <img src={imageUrl} alt={`${name}`} />
      <ItemDetail>
        <Name>{name}</Name>
        <span>
          {quantity} X ${price}
        </span>
      </ItemDetail>
    </CartItemContainer>
  );
}

export default CartItem;
