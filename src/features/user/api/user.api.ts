import { api } from "../../../shared/api/axios";
import { PayloadUpdateMe } from "../types/user.types";

/**
 * Data user en cours
 */
export const fetchMe = async () => {
    const { data } = await api.get("/me");
    return data;
};

/**
 * Mise à jour user
 */
export const updateMe = async (payload: PayloadUpdateMe) => {
    const { data } = await api.patch("/update_me", payload, {
        headers: {
            "Content-Type": "application/merge-patch+json",
        },
    });

    return data;
};
