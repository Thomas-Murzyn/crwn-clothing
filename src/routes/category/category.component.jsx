import { CategoryContainer, CategoryTitle } from "./category.styles.js";
import { CategoriesContext } from "../../contexts/categories.context";
import { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";

function Category() {
  const { categories } = useContext(CategoriesContext);

  const { category } = useParams();
  const [products, setProducts] = useState(categories[category]);

  useEffect(() => {
    setProducts(categories[category]);
  }, [categories, category]);

  return (
    <>
      <CategoryTitle>{category}</CategoryTitle>
      <CategoryContainer>
        {products &&
          products.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
      </CategoryContainer>
    </>
  );
}

export default Category;
