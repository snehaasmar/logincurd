import { configureStore } from "@reduxjs/toolkit";
import studentSlice from "./Slices/studentSlice";

export const store = configureStore({
    reducer:{
        studentKey:studentSlice
    }
})