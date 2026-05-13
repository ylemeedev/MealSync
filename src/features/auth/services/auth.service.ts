import * as Keychain from "react-native-keychain";
import { navigationRef } from "../../../../App";

let authToken: string | null = null;

/**
 * Charger token au démarrage
 */
export const loadToken = async () => {
    const credentials = await Keychain.getGenericPassword();

    if (!credentials) {
        authToken = null;
        return null;
    }

    authToken = credentials.password;

    return authToken;
};

/**
 * access token
 */
export const getToken = async () => {
    const credentials = await Keychain.getGenericPassword();

    return credentials ? credentials.password : null;
};

/**
 * login / refresh access token
 */
export const setToken = async (token: string) => {
    authToken = token;

    await Keychain.setGenericPassword("access_token", token);
};

/**
 * refresh token storage
 */
export const setRefreshToken = async (refreshToken: string) => {
    await Keychain.setInternetCredentials(
        "refresh_token",
        "refresh",
        refreshToken,
    );
};

export const getRefreshToken = async () => {
    const creds = await Keychain.getInternetCredentials("refresh_token");

    if (!creds) return null;

    return creds.password;
};

/**
 * logout
 */
export const logout = async (redirectToAuth: boolean = true) => {
    authToken = null;

    await Keychain.resetGenericPassword();
    await Keychain.resetInternetCredentials({
        server: "refresh_token",
    });

    if (navigationRef.isReady() && redirectToAuth) {
        navigationRef.reset({
            index: 0,
            routes: [{ name: "Auth" }],
        });
    }
};
