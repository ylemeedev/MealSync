import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchMe, updateMe } from "../api/user.api";
import { UserState } from "../types/user.types";

export const useMe = (options = {}) => {
    return useQuery({
        queryKey: ["me"],
        queryFn: fetchMe,
        ...options,
    });
};

export const useUpdateMe = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (form: UserState) => updateMe(form),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
        },
    });
};
