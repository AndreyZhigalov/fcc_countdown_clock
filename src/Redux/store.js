import { configureStore } from "@reduxjs/toolkit";
import clockSlice from "./clockSlice";

const store = configureStore({
    reducer: {
        clockSlice
    }
})

export default store