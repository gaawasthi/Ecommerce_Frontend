import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  authReducer from '../features/auth/authSlice'
import  adminReducer from '../features/adminAnalytics/AdminSlice'
const reducers = combineReducers({
    auth :authReducer,
    admin :adminReducer
})

export const store = configureStore({
    reducer :reducers
})

export default store