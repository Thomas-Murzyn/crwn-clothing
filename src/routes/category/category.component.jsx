import { CategoryContainer, CategoryTitle } from "./category.styles.js";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/product-card/product-card.component";
import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCatgoriesIsLoading,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spiner.component.jsx";

function Category() {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCatgoriesIsLoading);
  const { category } = useParams();
  const [products, setProducts] = useState(categoriesMap[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]);
  }, [categoriesMap, category]);

  return (
    <>
      <CategoryTitle>{category}</CategoryTitle>
      {!isLoading ? (
        <CategoryContainer>
          {products &&
            products.map((product) => {
              return <ProductCard key={product.id} product={product} />;
            })}
        </CategoryContainer>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default Category;
