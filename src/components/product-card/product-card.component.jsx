import {
  ProductCardContainer,
  Price,
  Name,
  Footer,
} from "./product-card.styles.js";

import { useDispatch } from "react-redux";
import { addItemToCart } from "../../store/cart/cart.action";
import { useSelector } from "react-redux";
import { selectCartItems } from "../../store/cart/cart.selector.js";

import Button from "../button/button.component";

function ProductCard({ product }) {
  const cartItems = useSelector(selectCartItems);

  const dispatch = useDispatch();
  const { name, imageUrl, price } = product;

  const handleClick = () => {
    dispatch(addItemToCart(cartItems, product));
  };

  return (
    <ProductCardContainer>
      <img src={imageUrl} alt={`${name}`} />
      <Footer>
        <Name>{name}</Name>
        <Price>{price}</Price>
      </Footer>
      <Button onClick={handleClick} buttonType={"inverted"}>
        Add to cart
      </Button>
    </ProductCardContainer>
  );
}

export default ProductCard;
