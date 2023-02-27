import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const tempEvent = {
    _id: new Date().getTime(),
    title: 'Cumpleaños del jefe',
    notes: 'Hay que comprar el pastel',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Gabriel'
    }
  }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [
            tempEvent
        ],
        activeEvent: null
    },
    reducers: {
        onSetActiveEvent: (state, {payload}) => {
            state.activeEvent = payload;
        },
        onAddNewEvent: (state, {payload}) => {//el payload es la nueva información
            state.events.push(payload); //Gracias al toolkit puedo utilizar el push
            //Una vez grabo los cambios debe limpiarse el activeEvent y debe cerrarse el modal
            state.activeEvent = null;
        },
        onUpDateEvent: (state, {payload}) => {
            //Si quiero actualizar un evento significa que ya tiene un id, por tanto debo identificarlo
            state.events = state.events.map(event =>{
                if (event._id === payload._id) {
                    return payload;
                }
                return event;
            })
        },
        onDeleteEvent: (state) => {
            //Solo se debe activar si hay un evento seleccionado
            if (state.activeEvent) {
                //Para eliminar el evento filtro a través del id
                state.events = state.events.filter(event => event._id !== state.activeEvent._id);
                state.activeEvent = null;
            }   
        },
    }
});

export const { onSetActiveEvent, onUpDateEvent, onAddNewEvent, onDeleteEvent } = calendarSlice.actions;