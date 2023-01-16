import { createContext, useEffect, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

import { getCategoriesAndDocuments } from "../utils/firebase.utils";

export const CategoriesContext = createContext({
  categories: [],
});

const ACTION_TYPES = {
  SET_CATEGORIES: "SET_CATEGORIES",
};

const INITIAL_STATE = {
  categories: {},
};

const categoriesReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_CATEGORIES:
      return {
        ...state,
        categories: payload,
      };
    default:
      throw new Error(`Unhandled type ${type} in userReducer`);
  }
};

const CategoriesProvider = ({ children }) => {
  const [{ categories }, dispatch] = useReducer(
    categoriesReducer,
    INITIAL_STATE
  );

  const updateCategories = (categoryMap) => {
    dispatch(createAction(ACTION_TYPES.SET_CATEGORIES, categoryMap));
  };

  useEffect(() => {
    const getCategories = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      updateCategories(categoryMap);
    };
    getCategories();
  }, []);

  const value = { categories };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};

export default CategoriesProvider;
