

import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDateModalOpen: false
    },
    reducers: {
        // cuando la persona quiere abrir el modal se dispara
       onOpenDateModal: (state) =>{
        state.isDateModalOpen= true;
       },
       onCloseDateModal: (state) =>{
        state.isDateModalOpen= false;
       }
    }
});

export const { onOpenDateModal, onCloseDateModal } = uiSlice.actions;