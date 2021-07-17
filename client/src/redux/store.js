import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// Reducers
import { cartReducer } from "./redux";
import { cartToDBReducer } from "./cartRedux";
import { authReducer } from "./authRedux";
import { errorReducer } from "./errorRedux";


const reducer = combineReducers({
  cart: cartReducer,
  auth: authReducer,
  cartToDB: cartToDBReducer,
  error: errorReducer
  });

const middleware = [thunk];

// const cartItemsInLocalStorage = localStorage.getItem("cart")
//   ? JSON.parse(localStorage.getItem("cart"))
//   : [];

// const initialState = {
//   cart: {
//     cartItems: cartItemsInLocalStorage,
    
//   },
// };

const initialState = [];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
