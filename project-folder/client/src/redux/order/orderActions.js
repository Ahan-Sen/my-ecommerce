import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_RESET,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_PAY_REQUEST,
  ORDER_PAY_FAIL,
  ORDER_PAY_SUCCESS,
  MY_ORDERS_REQUEST,
  MY_ORDERS_FAIL,
  MY_ORDERS_SUCCESS,
} from "../types";
import axios from "axios";

export const detailsOrder = (orderId) => async (dispatch) => {
  dispatch({ type: ORDER_DETAILS_REQUEST });
  try {
    const res = await axios.get(`/order/${orderId}`);
    dispatch({ type: ORDER_DETAILS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload: err.response.data,
    });
  }
};

export const myOrders = () => async (dispatch) => {
  dispatch({ type: MY_ORDERS_REQUEST });
  try {
    const res = await axios.get("/order/myorders");
    dispatch({ type: MY_ORDERS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: err.response.data,
    });
  }
};

export const orderReset = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_CREATE_RESET });
  } catch (err) {
    dispatch({
      type: MY_ORDERS_FAIL,
      payload: err.response.data,
    });
  }
};

export const createOrder = (order) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/order", order, config);
    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload: err.response.data,
    });
  }
};

export const paymentInitiated = () => async (dispatch) => {
  try {
    dispatch({ type: ORDER_PAY_REQUEST });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: err.response.data,
    });
  }
};

export const payOrder = (orderId) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.put(`/order/${orderId}/pay`, {}, config);
    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload: err.response,
    });
  }
};
