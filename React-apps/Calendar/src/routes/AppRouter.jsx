import { Routes, Route } from "react-router-dom";
import { LoginPage } from "../auth";
import { CalendarPage } from "../calendar";

export const AppRouter = () => {


    /*Vamos a neceistar algún tipo de validación
    y para eso creamos una constate que establezca un status:
    auth o not-auth que muestre las rutas según 
    un condicional*/
    const authStatus = 'authenticated'

    return (

        // Vamos a utilizar la funcionalidad del app-router-dom que instalamos
        // para mostrar una pagina u otra de manera condicional
        // se utiliza la etiqueda Routes y Route

        <Routes>

            {
                (authStatus === 'not-authenticated') ?
                // Cualquier ruta que entre al / va a estar mostrando el elemento de nuestro LoginPage 
                <Route path="/auth/*" element={<LoginPage />} /> :
                // path= "/*" significa cualquier ruta que no sea "/auth/*" 
                <Route path="/*" element={<CalendarPage />} />
            }

            {/* Para cualquier ruta desconocida, cuando no estamos autenticados, utilizamos el Navigate para redireccionar al login */}
            <Route path="/*" element={<LoginPage />} />


        </Routes>

    );
}
