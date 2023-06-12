import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = {
    filterValue:'',
};

const filterSlice = createSlice({
    name: "filters",
    initialState: filterInitialState,
    reducers: {
        setFilter (state, action) {
               state.filterValue = action.payload; 
            },
        },
    });

export const { setFilter } = filterSlice.actions;
export const filterReducer = filterSlice.reducer;