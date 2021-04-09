import { createStore, combineReducers, applyMiddleware } from "redux";
import { User } from "./auth/authReducer";
import { ProductList, ProductDetails } from "./product/productReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      user: User,
      productList: ProductList,
      productDetails: ProductDetails,
    }),
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  return store;
};
