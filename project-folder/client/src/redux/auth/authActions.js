import React from "react";
import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  SET_ERROR,
  AUTH_ERROR,
  LOGOUT,
  SET_USER,
  CLEAR_ERRORS,
} from "../types";
import setToken from "../../utils/setToken";

export const getUser = () => async (dispatch) => {
  if (localStorage.token) {
    setToken(localStorage.token);
  }
  try {
    const res = await axios.get("https://data-ecommerce.herokuapp.com/auth");
    dispatch({
      type: SET_USER,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
      payload: err.response,
    });
  }
};

//Register User

export const registerUser = (userData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "https://data-ecommerce.herokuapp.com/register",
      userData,
      config
    );
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: REGISTER_FAIL,
      payload: err.response.data,
    });
  }
};

//Login User

export const loginUser = (userData) => async (dispatch) => {
  const config = {
    header: {
      "Content-Type": "application/json",
    },
  };
  try {
    const res = await axios.post(
      "https://data-ecommerce.herokuapp.com/auth",
      userData,
      config
    );
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: LOGIN_FAIL,
      payload: err.response.data,
    });
  }
};

export const setError = (err) => async (dispatch) => {
  dispatch({
    type: SET_ERROR,
    payload: err,
  });
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};

export const clearError = () => async (dispatch) => {
  dispatch({
    type: CLEAR_ERRORS,
  });
};
