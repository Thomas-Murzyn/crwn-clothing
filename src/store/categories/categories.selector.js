import { createSelector } from "reselect";

const selectCategoryReducer = (state) => {
  return state.categories;
};

const memoizedCategories = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => {
    return categoriesSlice.categories;
  }
);

export const selectCategories = createSelector(
  [memoizedCategories],
  (categories) => {
    return categories.reduce((accumulator, category) => {
      const { title, items } = category;
      accumulator[title.toLowerCase()] = items;
      return accumulator;
    }, {});
  }
);

export const selectCatgoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
