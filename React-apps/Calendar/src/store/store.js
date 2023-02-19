import { configureStore } from "@reduxjs/toolkit";
import { uiSlice } from "./ui/uiSlice";


//Hay que colocar el store en el punto más alto de la app
export const store = configureStore({
    reducer: {
        ui: uiSlice.reducer, //importamos el reducer del uiSlice, no directamente el slice
    }
})