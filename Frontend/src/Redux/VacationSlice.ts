import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { VacationModel } from "../Models/VacationModel";

//first of all we build Reducers:

const initialVacation: VacationModel[] = [];
//Init vacation for the first time: 
function initVacationReducer(_currentState: VacationModel[], action: PayloadAction<VacationModel[]>): VacationModel[] {
    return action.payload;
};

//add new product
function addVacationReducer(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    return [...currentState, action.payload];
};

function updateVacationReducer(currentState: VacationModel[], action: PayloadAction<VacationModel>): VacationModel[] {
    const newState = [...currentState];
    const vacationToUpdate: VacationModel = action.payload;
    const index = newState.findIndex(p => p._id === vacationToUpdate._id)
    newState[index] = vacationToUpdate;
    return newState;
};

//Delete existing product 
function deleteVacationReducer(currentState: VacationModel[], action: PayloadAction<string>): VacationModel[] {
    const newState = [...currentState];
    const vacationIdToDelete = action.payload;
    const indexToDelete = newState.findIndex(v => v._id === vacationIdToDelete);
    newState.splice(indexToDelete, 1);

    //return the newState, Redux will replace currentState with the newState and will report the changes to all components.
    return newState;
};

function likeVacationReducer(currentState: VacationModel[], action: PayloadAction<{ vacationId: string; userId: string; liked: boolean }>): VacationModel[] {

    const { vacationId, userId, liked } = action.payload;
    const vacation = currentState.find(v => v._id === vacationId);
    if (!vacation) return;
    if (liked) {
        if (!vacation.userLikes.includes(userId)) vacation.userLikes.push(userId);
    } else {
        vacation.userLikes = vacation.userLikes.filter(id => id !== userId);
    }
};

//Creating the slice:

export const vacationSlice = createSlice({

    name: "vacationSlice", //The name of the slice 
    initialState: initialVacation, //initial value for product array 
    reducers: {
        initVacation: initVacationReducer,
        addVacation: addVacationReducer,
        updateVacation: updateVacationReducer,
        deleteVacation: deleteVacationReducer,
        likeVacation: likeVacationReducer
    },
});

export const { initVacation, addVacation, updateVacation, deleteVacation, likeVacation } = vacationSlice.actions;
export const vacationReducer = vacationSlice.reducer;