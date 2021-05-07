import {
  ADD_TO_CART,
  CART_ERROR,
  GET_CART,
  CART_REQUEST,
  CART_SAVE_SHIPPING_ADDRESS,
  ADDRESS_REQUEST,
  GET_ADDRESS,
  REMOVE_CART_PRODUCT,
  EMPTY_CART,
  NOT_ADDED,
} from "../types";
import axios from "axios";

export const getCart = () => async (dispatch) => {
  dispatch({
    type: CART_REQUEST,
  });
  try {
    const res = await axios.get("/cart");
    dispatch({
      type: GET_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: err.response.data,
    });
  }
};

export const addToCart = (id, qty) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(`/cart/${id}`, { qty: qty }, config);
    dispatch({
      type: ADD_TO_CART,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: err.response.data,
    });
  }
};

export const getAddress = () => async (dispatch) => {
  dispatch({
    type: ADDRESS_REQUEST,
  });
  try {
    const res = await axios.get("/cart/address");
    dispatch({
      type: GET_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: err.response.data,
    });
  }
};

export const saveShippingAddress = (address) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post("/cart/addAddress", address, config);
    dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: err.response.data,
    });
  }
};

export const removeFromCart = (id) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.post(`cart/delete/${id}`, {}, config);
    dispatch({
      type: REMOVE_CART_PRODUCT,
      payload: id,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: err.response.data,
    });
  }
};

export const emptyCart = () => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    await axios.put(`cart/delete`, {}, config);
    dispatch({
      type: EMPTY_CART,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: err.response.data,
    });
  }
};
export const NotAdded = () => async (dispatch) => {
  try {
    dispatch({
      type: NOT_ADDED,
    });
  } catch (err) {
    dispatch({
      type: CART_ERROR,
      payload: err.response.data,
    });
  }
};
