import { addHours } from "date-fns";
import { useCalendarStore, useUiStore } from "../../hooks"

export const FabAddNew = () => {

    // Cuando hago click en el botón quiero abrir el modal
    const { openDateModal } = useUiStore();
    const { setActiveEvent } = useCalendarStore();

    const handleClickNew = () => {
        // Hay que asegurarse de que el modal esté vacio para la nueva nota
        setActiveEvent({
            // No tiene id porque es una nueva, si tiene id está actualizando una existente
            title: '',
            notes: '',
            start: new Date(),
            end: addHours(new Date(), 2), //Necesario volver a importar
            bgColor: '#fafafa',
            user: {
                _id: '123',
                name: 'Gabriel'
            }
        })

        openDateModal();
    }

    return (
        <button
            className=" btn btn-primary fab"
            onClick={handleClickNew}
        >
            <i className="fas fa-plus"></i>
        </button>
    )
}
