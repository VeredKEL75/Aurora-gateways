import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import type { UserModel } from "../Models/UserModel";
import { store } from "../Redux/Store";
import { userSlice } from "../Redux/UserSlice";
import { jwtDecode } from "jwt-decode";
import { CredentialsModel } from "../Models/CredentialsModel";

class UserService {

    // On service initialization, check for token in localStorage and set user in Redux store if found
    public constructor() {
        const token = localStorage.getItem("token");
        if (token) {
            const dbUser = jwtDecode<{ user: UserModel }>(token).user;

            store.dispatch(userSlice.actions.loginUser(dbUser));

        }
    };

    // Register a new user, save token, and update Redux store

    public async register(user: UserModel): Promise<void> {
        const response = await axios.post<string>(appConfig.registerUrl, user);

        const token: string = response.data;

        const dbUser = jwtDecode<{ user: UserModel }>(token).user;

        store.dispatch(userSlice.actions.loginUser(dbUser));

        localStorage.setItem("token", token);

    };

    // Login user, save token, and update Redux store

    public async login(credentials: CredentialsModel): Promise<void> {
        const response = await axios.post<string>(appConfig.loginUrl, credentials);

        const token: string = response.data;

        const dbUser = jwtDecode<{ user: UserModel }>(token).user;

        store.dispatch(userSlice.actions.loginUser(dbUser));

        localStorage.setItem("token", token);

    };

    // Logout user and remove token from localStorage

    public logout(): void {
        store.dispatch(userSlice.actions.logoutUser());

        localStorage.removeItem("token");

    };
}
export const userService = new UserService(); 