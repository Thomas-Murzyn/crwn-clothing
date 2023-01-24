import { useSelector } from "react-redux";
import {
  selectCategories,
  selectCatgoriesIsLoading,
} from "../../store/categories/categories.selector";
import Spinner from "../../components/spinner/spiner.component";

import CategoryPreview from "../../components/category-preview/category-preview.component";

function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategories);
  const isLoading = useSelector(selectCatgoriesIsLoading);

  return (
    <>
      {!isLoading ? (
        Object.keys(categoriesMap).map((category) => {
          const products = categoriesMap[category];
          return (
            <CategoryPreview
              key={category}
              title={category}
              products={products}
            />
          );
        })
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default CategoriesPreview;
