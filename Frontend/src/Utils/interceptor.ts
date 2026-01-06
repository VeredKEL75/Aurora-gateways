import axios, { type InternalAxiosRequestConfig } from "axios";

class Interceptor {
    public create(): void {
        axios.interceptors.request.use((request: InternalAxiosRequestConfig) => {
            const token = localStorage.getItem("token")
            if (token) {
                request.headers.Authorization = "Bearer " + token;
            }
            return request;
        });
    }
};

export const interceptor = new Interceptor();
