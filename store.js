import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./src/reducers/authReducer";
import { cartReducer } from "./src/reducers/cartReducer";
export const store =configureStore({
    reducer:{authReducer,cartReducer}
});
