 
import React, { useReducer } from "react";
import { USER_LOGGIN_KEY } from "../utils/constants";
 
export const initialState = {
  user: null,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      console.log("actions : ", action)
      return {
        ...initialState,
        user: action.user, 
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: null, 
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};