import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./articlesSlice";
import categoriesReducer from "./categoriesSlice";
import paginationReducer from "./paginationSlice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    categories: categoriesReducer,
    pagination: paginationReducer,
  },
});
