import { combineReducers, configureStore } from "@reduxjs/toolkit";
// combineReducers: 여러 리듀서를 하나로 합쳐주는 함수
// configureStore: 스토어를 생성하는 함수
import authReduser from "./slices/authSlices";
import apiReducer from "./slices/apiSlice";
import modalReducer from "./slices/modalSlice";

const store = configureStore({
  reducer: combineReducers({
    auth: authReduser, //값은 만드는 이름
    apis: apiReducer,
    modal: modalReducer,
  }),
});

export default store;
