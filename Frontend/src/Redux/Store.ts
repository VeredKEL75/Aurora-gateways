import { configureStore } from "@reduxjs/toolkit"
import { UserModel } from "../Models/UserModel"
import { VacationModel } from "../Models/VacationModel"
import { userSlice } from "./UserSlice"
import { vacationSlice } from "./VacationSlice"

//What is in the global state
export type AppState = {
    vacations: VacationModel[],
    user: UserModel | null
}

//Creating the global state object (the store)
export const store = configureStore<AppState>({
    reducer: {
        vacations: vacationSlice.reducer,
        user: userSlice.reducer
    }
});

