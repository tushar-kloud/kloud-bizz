import {combineReducers} from 'redux'
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import { userLoginReducer } from './reducers/userReducers';
import secureLocalStorage from 'react-secure-storage';

const reducers = combineReducers({
    userLogin:userLoginReducer
})

const userInfoFromStorage = secureLocalStorage.getItem("userInfo")
  ? JSON.parse(secureLocalStorage.getItem("userInfo"))
  : [];

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const store = configureStore({
    reducer: reducers,
    preloadedState: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true
})

export default store;