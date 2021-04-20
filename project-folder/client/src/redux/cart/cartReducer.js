import {
  ADD_TO_CART,
  CART_ERROR,
  GET_CART,
  CART_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS,
  ADDRESS_REQUEST,
  GET_ADDRESS,
} from "../types";
export const Cart = (
  state = {
    cart: [],
    address: null,
    loading: false,
    errors: null,
  },
  action
) => {
  switch (action.type) {
    case CART_REQUEST:
      return { ...state, loading: true };
    case ADDRESS_REQUEST:
      return { ...state, loading: true };
    case GET_CART:
      return { ...state, loading: false, cart: action.payload };
    case ADD_TO_CART:
      const item = action.payload;
      const existItem = state.cart.find((x) => x._id === item._id);
      if (existItem) {
        return {
          ...state,
          cart: state.cart.map((x) => (x._id === existItem._id ? item : x)),
        };
      } else {
        return { ...state, cart: [...state.cart, item] };
      }

    case GET_ADDRESS:
      return {
        ...state,
        loading: false,
        address: action.payload,
      };
    case CART_SAVE_SHIPPING_ADDRESS:
      return { ...state, address: action.payload };

    case CART_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
