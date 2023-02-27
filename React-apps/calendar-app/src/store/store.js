import { configureStore } from "@reduxjs/toolkit";
import { calendarSlice } from "./calendar/calendarSlice";
import { uiSlice } from "./ui/uiSlice";


//Hay que colocar el store en el punto más alto de la app
export const store = configureStore({
    reducer: {
        calendar: calendarSlice.reducer,
        ui: uiSlice.reducer, //importamos el reducer del uiSlice, no directamente el slice
    },
    //Esto es para que no revise si puede serializar las fechas que enviamos y que no tire error
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})