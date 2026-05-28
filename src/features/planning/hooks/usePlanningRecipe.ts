import { useQuery } from "@tanstack/react-query";
import { fetchPlanningRecipe } from "../api/planningRecipe.api";

export const usePlanningRecipe = (planningId: number, options = {}) => {
    return useQuery({
        queryKey: ["planningRecipe", planningId],
        queryFn: () => fetchPlanningRecipe(planningId),
        ...options,
    });
};