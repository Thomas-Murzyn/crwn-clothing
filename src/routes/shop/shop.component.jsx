import { Routes, Route } from "react-router-dom";
import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchCategoriesStart } from "../../store/categories/categories.action";

function Shop() {
  const dispatch = useDispatch();

  useEffect(() => {
    const getCategories = async () => {
      dispatch(fetchCategoriesStart());
    };
    getCategories();
    // eslint-disable-next-line
  }, []);
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
}

export default Shop;
