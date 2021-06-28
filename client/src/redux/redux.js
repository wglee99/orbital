const ADD_TO_CART = "ADD_TO_CART";
const REMOVE_FROM_CART = "REMOVE_FROM_CART";

// actions
export const addToCart = (itemID, itemName) => async (dispatch, getState) => {
  dispatch({
    type: ADD_TO_CART,
    payload: {
      id: itemID,
      name: itemName,
    },
  });

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (itemID) => (dispatch, getState) => {
  dispatch({
    type: REMOVE_FROM_CART,
    payload: itemID
    });
  

  localStorage.setItem("cart", JSON.stringify(getState().cart.cartItems));
};

// reducers
const initialState = {
  cartItems: [],
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.id === item.id);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.itemID === existItem.id ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }
    case REMOVE_FROM_CART:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.id !== action.payload),
      };

    default:
      return state;
  }
};
