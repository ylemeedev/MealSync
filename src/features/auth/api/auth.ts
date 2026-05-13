import { api } from "../../../shared/api/axios";

/**
 * Login user
 */
export const loginApi = async (email: string, password: string) => {
    try {
        const res = await api.post("/login", { email, password });
        return res.data;
    } catch (error) {
        throw error;
    }
};
