import axios from "axios";
import { returnErrors } from "./errorRedux";

// cart types
export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";

// cart actions
export const getCart = (id) => (dispatch) => {
  axios
    .get(`/api/cart/${id}`)
    .then((res) =>
      dispatch({
        type: GET_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const addCartToDB = (id, items) => (dispatch) => {
  axios
    .post(`/api/cart/${id}`, { items })
    .then((res) =>
      dispatch({
        type: ADD_TO_CART,
        payload: res.data,
      })
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

// cart reducers
const initialState = {
  cart: null,
  loading: false,
};

export const cartToDBReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        cart: action.payload,
        loading: false,
      };

    case ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };

    default:
      return state;
  }
};
