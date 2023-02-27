//Custom hook que me va a permitir manejar y hacer dispatch de acciones y todo lo que está relacionado al Ui en el Store, pro ejemplo el Modal

import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onOpenDateModal } from "../store";

export const useUiStore = () => {

    const dispatch = useDispatch();
    //Con el use selector yo tengo acceso al state en el store
    //por tanto desde acá voy a manejar si el modal está abierto o no, true or false
    const {isDateModalOpen} = useSelector(state => state.ui);

    //Mediante este método abro el modal con el doble click
    const openDateModal = () =>{
        //¿cómo hago para llegar al store y decirle que ejecute el onOpenDateModal? con el useDispatch que permite hacer el dispatch de una acción.
        //Mando a llamar el dispatch de la acción onOpenDateModal que se encuentra en el store.
        dispatch(onOpenDateModal())
    }

    const closeDateModal = () => {
        dispatch(onCloseDateModal())
    }

    return{
        //*properties
        isDateModalOpen,

        //*methods
        openDateModal,
        closeDateModal,
    }
}