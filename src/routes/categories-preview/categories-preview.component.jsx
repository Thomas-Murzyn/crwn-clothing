import { useSelector } from "react-redux";
import { selectCategories } from "../../store/categories/categories.selector";

import CategoryPreview from "../../components/category-preview/category-preview.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategories);

  return (
    <>
      {Object.keys(categoriesMap).map((category) => {
        const products = categoriesMap[category];
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
