import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_FAIL,
  MY_ORDERS_SUCCESS,
  ORDER_CREATE_RESET,
} from "../types";

export const Order = (
  state = {
    order: null,
    success: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case ORDER_CREATE_SUCCESS:
      return { ...state, success: true, order: action.payload };

    case ORDER_CREATE_RESET:
      return { ...state, success: false, order: null };
    case ORDER_CREATE_FAIL:

    default:
      return state;
  }
};

export const OrderDetails = (
  state = { order: {}, loading: true, paySuccess: false },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        order: action.payload,
        paySuccess: false,
      };
    case ORDER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
        paySuccess: false,
      };

    case ORDER_PAY_REQUEST:
      return { ...state, paymentInitiate: true };
    case ORDER_PAY_SUCCESS:
      return {
        ...state,
        paymentInitiate: false,
        order: action.payload,
        paySuccess: true,
      };
    case ORDER_PAY_FAIL:
      return { ...state, paymentInitiate: false, error: action.payload };
    default:
      return state;
  }
};

export const MyOrders = (
  state = {
    order: [],
    loading: false,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case MY_ORDERS_REQUEST:
      return { ...state, loading: true };
    case MY_ORDERS_SUCCESS:
      return { ...state, loading: false, order: action.payload };
    case MY_ORDERS_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
