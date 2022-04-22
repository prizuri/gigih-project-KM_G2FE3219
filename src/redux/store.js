import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./create-slice";
import tokenReducer from "./token-slice"

export default configureStore({
  reducer: {
    user: userReducer,
    token: tokenReducer
  }
});
