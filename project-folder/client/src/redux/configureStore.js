import { createStore, combineReducers, applyMiddleware } from "redux";
import { User } from "./auth/authReducer";
import { ProductList, ProductDetails } from "./product/productReducer";
import { Cart } from "./cart/cartReducer";
import { Order, MyOrders, OrderDetails } from "./order/orderReducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      user: User,
      productList: ProductList,
      productDetails: ProductDetails,
      cart: Cart,
      order: Order,
      myOrders: MyOrders,
      orderDetails: OrderDetails,
    }),
    composeWithDevTools(applyMiddleware(thunk, logger))
  );

  return store;
};
