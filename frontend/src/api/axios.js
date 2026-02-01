import axios from "axios";
import { store } from "../app/store";
import { loginSuccess, logout } from "../features/auth/authSlice";

const api = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true, // required for refresh token
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });

    failedQueue = [];
};

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        // If 401 and not already retried
        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                    failedQueue.push({ resolve, reject });
                }).then((token) =>{
                    originalRequest.headers.Authorization = 'Bearer ' + token;
                    return api(originalRequest);
                }).catch((err) => Promise.reject(err));
            }
            isRefreshing = true;

            try {
                const res = await api.post('/auth/refresh');
                const newAccessToken = res.data.accessToken;
                store.dispatch(loginSuccess(newAccessToken));
                processQueue(null, newAccessToken);
                originalRequest.headers.Authorization = 'Bearer ' + newAccessToken;
                return api(originalRequest);
            } catch (refreshError) {
                processQueue(refreshError, null);
                store.dispatch(logout());
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
        return Promise.reject(error);
    }
);

export default api;