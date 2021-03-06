import axios from "axios";
import { returnErrors } from "./errorRedux";

// cart types
export const GET_CART = "GET_CART";
export const ADD_TO_CART = "ADD_TO_CART";
export const ITEMS_LOADING = "ITEMS_LOADING";
export const DELETE_FROM_CART = "DELETE_FROM_CART";

// cart actions
export const getCart = (id) => (dispatch) => {
  dispatch(setItemsLoading());
  axios
    .get(`/api/cart/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_CART,
        payload: res.data,
      });
    })
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const itemsToDB = (id, productId, name) => (dispatch) => {
  axios
    .post(`/api/cart/${id}`, { productId, name })
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

export const deleteFromCart = (userId, itemId) => (dispatch) => {
  axios
    .delete(`/api/cart/${userId}/${itemId}`)
    .then((res) =>
      dispatch({
        type: DELETE_FROM_CART,
        payload: res.data,
      })
      
    )
    .catch((err) =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );

};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING,
  };
};

// cart reducers
const initialState = {
  cart: [],
  loading: true,
};

export const itemReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CART:
      return {
        ...state,
        items: action.payload,
        loading: false,
      };

    case ADD_TO_CART:
      return {
        ...state,
        items: action.payload,
      };

    case DELETE_FROM_CART:
      return {
        ...state,
        items: action.payload,
      };

    case ITEMS_LOADING:
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};
