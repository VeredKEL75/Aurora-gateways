import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";

// Reducer for logging in a user: sets the state to the provided user object
function loginUserReducer(_currentState: UserModel, action: PayloadAction<UserModel>): UserModel {
    const initialUser: UserModel = action.payload;
    const newState: UserModel = initialUser;
    return newState;
}
// Reducer for logging out a user: sets the state to null
function logoutUserReducer(_currentState: UserModel, _action: PayloadAction): UserModel {
    return null!;
}

// Initial state is null, meaning no user is logged in by default
const initialState = null as UserModel | null;

// Create the user slice with login and logout reducers
export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        loginUser: loginUserReducer,
        logoutUser: logoutUserReducer
    }
});

export const { loginUser, logoutUser } = userSlice.actions;
