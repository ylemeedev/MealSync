import { useQuery } from "@tanstack/react-query";
import { fetchPlannings } from "../api/planning.api";

export const usePlannings = (options = {}) => {
    return useQuery({
        queryKey: ["plannings"],
        queryFn: () => fetchPlannings(),
        select: (res) => res.member,
        ...options,
    });
};
