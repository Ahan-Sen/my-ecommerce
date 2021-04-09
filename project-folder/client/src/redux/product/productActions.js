import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "../types";
import axios from "axios";

export const listProducts = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_LIST_REQUEST,
  });
  try {
    const res = await axios.get("/products");
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: err.response.data });
  }
};

export const detailsProduct = (productId) => async (dispatch) => {
  dispatch({ type: PRODUCT_DETAILS_REQUEST, payload: productId });
  try {
    const res = await axios.get(`/products/${productId}`);
    dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: res.data });
  } catch (err) {
    dispatch({
      type: PRODUCT_DETAILS_FAIL,
      payload: err.response.data,
    });
  }
};
