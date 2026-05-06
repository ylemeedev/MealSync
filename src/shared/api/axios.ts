import axios from "axios";
import Config from "react-native-config";
import * as Keychain from "react-native-keychain";
import { logout, setToken } from "../../features/auth/services/auth.service";

export const api = axios.create({
    baseURL: Config.API_URL,
});

/* -----------------------------------------------------
    =   REQUEST INTERCEPTOR
----------------------------------------------------- */
api.interceptors.request.use(async (config) => {
    const credentials = await Keychain.getGenericPassword();

    if (credentials && typeof credentials !== "boolean") {
        const token = credentials.password;

        config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
});

/* -----------------------------------------------------
    =   RESPONSE INTERCEPTOR (REFRESH TOKEN)
----------------------------------------------------- */
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !originalRequest.url?.includes("/token/refresh")
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = await Keychain.getInternetCredentials(
                    "refresh_token",
                );

                if (!refreshToken) {
                    return Promise.reject(error);
                }

                const res = await axios.post(
                    `${Config.API_URL}/token/refresh`,
                    {
                        refresh_token: refreshToken.password,
                    },
                );

                const newAccessToken = res.data.token;

                // sauvegarde storage
                await Keychain.setGenericPassword(
                    "access_token",
                    newAccessToken,
                );

                // mise à jour mémoire
                setToken(newAccessToken);

                // retry request
                originalRequest.headers = {
                    ...originalRequest.headers,
                    Authorization: `Bearer ${newAccessToken}`,
                };

                return api.request(originalRequest);
            } catch (refreshError) {
                await logout();
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    },
);
