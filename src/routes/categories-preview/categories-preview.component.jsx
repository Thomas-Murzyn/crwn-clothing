import { useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import CategoryPreview from "../../components/category-preview/category-preview.component";

function CategoriesPreview() {
  const { categories } = useContext(CategoriesContext);

  return (
    <>
      {Object.keys(categories).map((category) => {
        const products = categories[category];
        return (
          <CategoryPreview
            key={category}
            title={category}
            products={products}
          />
        );
      })}
    </>
  );
}

export default CategoriesPreview;
