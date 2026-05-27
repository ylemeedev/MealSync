import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchPreferences, updatePreferences } from "../api/preference.api";

export const usePreference = () => {
    return useQuery({
        queryKey: ["preferences"],
        queryFn: fetchPreferences,
        select: (res) => res.member,
    });
};

export const useUpdatePreferences = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (preferences: number[]) => updatePreferences(preferences),
        onError: (error) => {
            console.log("🚀 ~ useSavePreferences ~ error:", error);
        },
        onSuccess() {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};
