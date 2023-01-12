import {
  ProductCardContainer,
  Price,
  Name,
  Footer,
} from "./product-card.styles.js";
import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";

import Button from "../button/button.component";

function ProductCard({ product }) {
  const { name, imageUrl, price } = product;
  const { addItemToCart } = useContext(CartContext);

  const handleClick = () => {
    addItemToCart({ ...product });
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
