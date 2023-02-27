import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { AppRouter } from "./routes"
import { store } from "./store/store"

export const CalendarApp = () => {
  return (
    // Colocamos el store en este punto alto de la aplicación para que haya acceso a él desde cualquier parte.
    // En vez de mostrar la aplicación CalendarApp directamente devolvemos el router, esto es, la ruta, que nos lleva la app Para usar el router-dom debemos colocar la etiqueta BrowserRouter en algún punto alto de nuestra aplicación.
    <Provider store={store}> 
      <BrowserRouter> 
        <AppRouter />
      </BrowserRouter>
    </Provider>
  )
}
