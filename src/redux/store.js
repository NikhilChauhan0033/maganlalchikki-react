import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./apiSlice"; // Import API slice
import productReduer from "./productsSlice"  // Import the products slice

const store = configureStore({
  reducer: {
    api: apiReducer, // Register API reducer
    products: productReduer, // Register the products reducer

  },
});

export default store;
