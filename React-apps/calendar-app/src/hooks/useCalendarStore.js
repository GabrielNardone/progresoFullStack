import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeleteEvent, onSetActiveEvent, onUpDateEvent } from "../store";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector(state => state.calendar);

    const setActiveEvent = (calendarEvent) => {
        dispatch(onSetActiveEvent(calendarEvent));
        
    }

    const savingEvent = (calendarEvent) => {
        //Actualizar
        if (calendarEvent._id) {
            dispatch(onUpDateEvent({ ...calendarEvent }));
            
        }
        //Crear 
        else {
            dispatch(onAddNewEvent({ ...calendarEvent, _id: new Date().getTime() }));
            
        }
    }

    const deleteEvent = () => {
        dispatch(onDeleteEvent());
    }

    return {
        events,
        activeEvent,
        //Necesito mostrar el botón de delete de manera condicional, por tanto regreso una propiedad que verifique si el activeEvent es null o no
        hasEventSelected: !!activeEvent,

        setActiveEvent,
        savingEvent,
        deleteEvent,

    }
}
