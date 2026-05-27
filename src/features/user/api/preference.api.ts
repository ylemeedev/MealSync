import { api } from "../../../shared/api/axios";
import { HydraResponse } from "../../../shared/types/types";
import { Preference } from "../types/user.types";

export const fetchPreferences = async (): Promise<HydraResponse<Preference>> => {
    const { data } = await api.get("/preferences");
    return data;
};

export const updatePreferences = async (preferences: number[]) => {
    const { data } = await api.patch(
        "/update_preferences",
        {
            preferences: preferences,
        },
        {
            headers: {
                "Content-Type": "application/merge-patch+json",
            },
        },
    );

    return data;
};
